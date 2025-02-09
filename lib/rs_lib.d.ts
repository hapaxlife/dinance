// @generated file from wasmbuild -- do not edit
// deno-lint-ignore-file
// deno-fmt-ignore-file

/**
 * Number of days between two date following day convention
 *
 * # Examples
 *
 * ```
 * DaysBetween(new Date(2015, 11, 1), new Date(2016, 7, 1), DayCount.ACT_360)
 *
 * ```
 */
export function DaysBetween(d1: Date, d2: Date, day_count: string): number;
/**
 * Fraction of year between two date following day convention
 *
 * # Examples
 *
 * ```
 * DaysBetween(new Date(2015, 11, 1), new Date(2016, 7, 1), DayCount.ACT_360)
 *
 * ```
 */
export function YearFraction(d1: Date, d2: Date, day_count: string): number;
/**
 * Internal Rate of Return
 *
 * Compute the internal rate of return on a schedule of cash flows that are not necessarily periodic.
 * like XIRR() function in Microsoft Excel
 *
 * # Examples
 *
 * ```
 *  XIRR(
 *  [new Date(2015, 11, 1), new Date(2016, 7, 1), new Date(2016, 7, 19)],
 *  [-1000, -100, 1200],
 *  0.3,
 *  DayCount.ACT_360
 *  )
 *
 * ```
 */
export function XIRR(
  dates: Array<any>,
  amounts: Array<any>,
  guess: number,
  day_count: string,
): number;
/**
 * Present Value of a single cashflow
 *
 * # Examples
 *
 * ```
 * PV(5 / 100, 100, 5)
 *
 * ```
 */
export function PV(rate: number, cf1: number, num_of_period: number): number;
