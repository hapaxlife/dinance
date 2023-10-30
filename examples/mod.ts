import { instantiate } from "../lib/rs_lib.generated.js";
import { DayCount } from "./type.ts";

const {
  XIRR,
  DaysBetween,
  YearFraction,
} = await instantiate();

import { getSamples } from "./bench.ts";
import { XIRR as XIRR_Deno } from "./finance.ts";

const samples = await getSamples();

samples.forEach((item) => {
    const d = XIRR_Deno(item.dates, item.payments, 0);
    const r = XIRR(item.dates, item.payments, 0, DayCount.ACT_365F);
    console.log(item.name, (d-r).toFixed(2));
  })

try {

  console.log(
    DaysBetween(new Date(2015, 11, 1), new Date(2016, 7, 1), DayCount.ACT_360),
  );
  console.log(
    YearFraction(new Date(2015, 11, 1), new Date(2016, 7, 1), DayCount.ACT_360),
  );

  console.log(
    XIRR(
    [new Date(2015, 11, 1), new Date(2016, 7, 1), new Date(2016, 7, 19)],
    [-1000, -100, 1200],
    0.3,
    DayCount.ACT_360
  ))
  //=> 14.11
} catch (e) {
  console.log(e);
}

