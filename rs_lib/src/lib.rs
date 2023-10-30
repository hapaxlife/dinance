use wasm_bindgen::prelude::*;

pub mod core;
pub use core::{days_between, xirr, xnpv, year_fraction, DateLike, DayCount};
use std::str::FromStr;

use js_sys::Array;

/// Number of days between two date following day convention
///
/// # Examples
///
/// ```
/// DaysBetween(new Date(2015, 11, 1), new Date(2016, 7, 1), DayCount.ACT_360)
///
/// ```
#[wasm_bindgen(js_name = DaysBetween)]
pub fn days_between_deno(
  d1: js_sys::Date,
  d2: js_sys::Date,
  day_count: String,
) -> Result<i32, js_sys::Error> {
  let day_count = DayCount::from_str(&day_count);
  let dl1 = DateLike::from(d1);
  let dl2 = DateLike::from(d2);

  match day_count {
    Ok(v) => Ok(days_between(dl1, dl2, v)),
    Err(e) => Err(js_sys::Error::new(e)),
  }
}

/// Fraction of year between two date following day convention
///
/// # Examples
///
/// ```
/// DaysBetween(new Date(2015, 11, 1), new Date(2016, 7, 1), DayCount.ACT_360)
///
/// ```
#[wasm_bindgen(js_name = YearFraction)]
pub fn year_fraction_deno(
  d1: js_sys::Date,
  d2: js_sys::Date,
  day_count: String,
) -> Result<f64, js_sys::Error> {
  let day_count = DayCount::from_str(&day_count);
  let dl1 = DateLike::from(d1);
  let dl2 = DateLike::from(d2);

  match day_count {
    Ok(v) => Ok(year_fraction(dl1, dl2, v)),
    Err(e) => Err(js_sys::Error::new(e)),
  }
}

/// Internal Rate of Return
/// 
/// Compute the internal rate of return on a schedule of cash flows that are not necessarily periodic.
/// like XIRR() function in Microsoft Excel
/// 
/// # Examples
///
/// ```
///  XIRR(
///  [new Date(2015, 11, 1), new Date(2016, 7, 1), new Date(2016, 7, 19)],
///  [-1000, -100, 1200],
///  0.3,
///  DayCount.ACT_360
///  )
///
/// ```
#[wasm_bindgen(js_name = XIRR)]
pub fn xirr_deno(
  dates: Array,
  amounts: Array,
  guess: f64,
  day_count: String,
) -> Result<f64, js_sys::Error> {
  let day_count_v = DayCount::from_str(&day_count);
  if day_count_v.is_err() {
    let msg = String::from("Daycount is unknown : ") + &day_count;
    return Err(js_sys::Error::new(&msg));
  }

  let mut dates_like: Vec<DateLike> = vec![];
  for item in dates.iter() {
    let d = js_sys::Date::from(item);
    dates_like.push(DateLike::from(d))
  }

  let mut amounts_like: Vec<f64> = vec![];
  for item in amounts.iter() {
    amounts_like.push(item.as_f64().unwrap())
  }

  let result = xirr(
    &dates_like,
    &amounts_like,
    Some(guess),
    Some(day_count_v.unwrap()),
  );
  match result {
    Ok(v) => Ok(v),
    Err(e) => Err(js_sys::Error::new(&e.to_string())),
  }
}

/// Present Value of a single cashflow
///
/// # Examples
///
/// ```
/// PV(5 / 100, 100, 5)
///
/// ```
#[wasm_bindgen(js_name = PV)]
pub fn pv_deno(rate: f64, cf1: f64, num_of_period: i32) -> f64 {
  return cf1 / (1. + rate).powf(num_of_period.into());
}

/* Code for test and example

#[wasm_bindgen(js_name = DateArrayToString)]
pub fn date_array_to_string(arr: Array) -> JsString {
    let mut result = JsString::from("");
    for date_value in arr.values() {
        let d: Date = date_value.expect("Some error occured.").into();
        result = result.concat(&d.to_string());
    }

    result
}

#[wasm_bindgen]
pub fn add_wasm_by_example_to_string(input_string: String) -> String {
  let result = format!("{} {}", input_string, "Wasm by Example");
  return result.into();
}

*/
