import {
  assertAlmostEquals,
  assertEquals,
} from "https://deno.land/std@0.204.0/assert/mod.ts";

import { instantiate } from "../lib/rs_lib.generated.js";
import { DayCount } from "./type.ts";
import { getSamples } from "./bench.ts";
import { XIRR as XIRR_Deno } from "./finance.ts";

const TOLERANCE = 0.01;

const {
  XIRR,
  DaysBetween,
} = await instantiate();

const samples = await getSamples();

Deno.test("Deno XIRR", () => {
  const a = XIRR_Deno(
    [new Date(2010, 1, 1), new Date(2011, 1, 1)],
    [-1000, 900],
    0,
  );

  assertAlmostEquals(a, -0.10, TOLERANCE);
});

Deno.test("Rust vs Deno", () => {
  samples.forEach((item) => {
    const d = XIRR_Deno(item.dates, item.payments, 0);
    const r = XIRR(item.dates, item.payments, 0, DayCount.ACT_365F);
    if (!(d == Infinity || d == -Infinity || isNaN(r) || isNaN(d))) {
      assertAlmostEquals(d, r, TOLERANCE, item.name);
    }
  });
});

Deno.test("DaysBetween", () => {
  const a = DaysBetween(
    new Date(2015, 11, 1),
    new Date(2016, 7, 1),
    DayCount.ACT_360,
  );
  assertEquals(a, 243);
});

Deno.test("should compute XIRR", () => {
  let a = XIRR(
    [new Date(2015, 11, 1), new Date(2016, 7, 1), new Date(2016, 7, 19)],
    [-1000, -100, 1200],
    0.1,
    DayCount.ACT_365F,
  );

  assertAlmostEquals(a, 0.12449, TOLERANCE);

  a = XIRR(
    [new Date(2010, 1, 1), new Date(2011, 1, 1)],
    [-1000, 900],
    0,
    DayCount.ACT_365F,
  );

  assertAlmostEquals(a, -0.10, TOLERANCE);

  a = XIRR(
    [
      new Date("2010-01-01"),
      new Date("2010-04-01"),
      new Date("2010-07-01"),
      new Date("2010-10-01"),
      new Date("2011-01-01"),
    ],
    [-1000, -1000, -1000, -1000, 4300],
    0,
    DayCount.ACT_365F,
  );

  assertAlmostEquals(a, 0.1212676, TOLERANCE);
});

// Start Date, End Date, 30/360 US, 30E/360, 30E360 ISDA, Actual
const XLERATOR_DB_DATA = [
  ["2007-01-15", "2007-01-30", 15, 15, 15, 15],
  ["2007-01-15", "2007-02-15", 30, 30, 30, 31],
  ["2007-01-15", "2007-07-15", 180, 180, 180, 181],
  ["2007-09-30", "2008-03-31", 180, 180, 180, 183],
  ["2007-09-30", "2007-10-31", 30, 30, 30, 31],
  ["2007-09-30", "2008-09-30", 360, 360, 360, 366],
  ["2007-01-15", "2007-01-31", 16, 15, 15, 16],
  ["2007-01-31", "2007-02-28", 28, 28, 30, 28],
  ["2007-02-28", "2007-03-31", 30, 32, 30, 31],
  ["2006-08-31", "2007-02-28", 178, 178, 180, 181],
  ["2007-02-28", "2007-08-31", 180, 182, 180, 184],
  ["2007-02-14", "2007-02-28", 14, 14, 16, 14],
  ["2007-02-26", "2008-02-29", 363, 363, 364, 368],
  ["2008-02-29", "2009-02-28", 360, 359, 360, 365],
  ["2008-02-29", "2008-03-30", 30, 31, 30, 30],
  ["2008-02-29", "2008-03-31", 30, 31, 30, 31],
  ["2007-02-28", "2007-03-05", 5, 7, 5, 5],
  ["2007-10-31", "2007-11-28", 28, 28, 28, 28],
  ["2007-08-31", "2008-02-29", 179, 179, 180, 182],
  ["2008-02-29", "2008-08-31", 180, 181, 180, 184],
  ["2008-08-31", "2009-02-28", 178, 178, 180, 181],
  ["2009-02-28", "2009-08-31", 180, 182, 180, 184],
];

Deno.test("should compute DaysBetween", () => {
  for (const item of XLERATOR_DB_DATA) {
    const d1 = new Date(item[0]);
    const d2 = new Date(item[1]);
    assertEquals(DaysBetween(d1, d2, DayCount.THIRTY_U_360), item[2]);
    assertEquals(DaysBetween(d1, d2, DayCount.THIRTY_E_360), item[3]);
    assertEquals(DaysBetween(d1, d2, DayCount.ACT_365F), item[5]);
  }
});
