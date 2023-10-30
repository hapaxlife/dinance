// for test
// from  https://github.com/ebradyjobory/finance.js

const PRECISION = 5;

/**
 * Present Value
 * @param rate rate type 0.1 for 10%
 * @param cf1 single cashflow
 * @param numOfPeriod number of period
 * @returns Present Value
 */
export function PV(rate: number, cf1: number, numOfPeriod = 1) {
  return cf1 / Math.pow(1 + rate, numOfPeriod);
}

/**
 * XIRR - IRR for irregular intervals
 * Daycount is ACT/365
 * @param dts Array of date
 * @param cfs Array of cashflow
 * @param guess First guess for the IRR
 * @returns IRR ex : 0.1 for 10%
 */
export function XIRR(dts: Date[], cfs: number[], guess = 0.05) {
  if (cfs.length != dts.length) {
    throw new Error("Number of cash flows and dates should match");
  }

  let positive, negative;
  Array.prototype.slice.call(cfs).forEach(function (value) {
    if (value > 0) positive = true;
    if (value < 0) negative = true;
  });

  if (!positive || !negative) {
    throw new Error(
      "XIRR requires at least one positive value and one negative value",
    );
  }

  let limit = 100; //loop limit
  let guess_last;
  const durs: number[] = [];

  durs.push(0);

  //Create Array of durations from First date
  for (let i = 1; i < dts.length; i++) {
    durs.push(durYear(dts[0], dts[i]));
  }

  do {
    guess_last = guess;
    guess = guess_last - sumEq(cfs, durs, guess_last);
    limit--;
  } while (
    guess_last.toFixed(PRECISION) != guess.toFixed(PRECISION) && limit > 0
  );

  return guess_last.toFixed(PRECISION) != guess.toFixed(PRECISION)
    ? new Error(
      "XIRR / no solution",
    )
    : guess;
}

/**
 * Duration in years between two dates
 * Daycount is ACT/365
 * @param first first date
 * @param last last date
 * @returns duration in years
 */
function durYear(first: Date, last: Date) {
  return (Math.abs(last.getTime() - first.getTime()) /
    (1000 * 3600 * 24 * 365));
}

/**
 * For solving XIRR
 * @param cfs
 * @param durs
 * @param guess
 * @returns Sum of f(x)/f'(x)
 */
function sumEq(cfs: number[], durs: number[], guess: number) {
  let sum_fx = 0;
  let sum_fdx = 0;
  for (let i = 0; i < cfs.length; i++) {
    sum_fx = sum_fx + (cfs[i] / Math.pow(1 + guess, durs[i]));
  }
  for (let i = 0; i < cfs.length; i++) {
    sum_fdx = sum_fdx + (-cfs[i] * durs[i] * Math.pow(1 + guess, -1 - durs[i]));
  }
  return sum_fx / sum_fdx;
}
