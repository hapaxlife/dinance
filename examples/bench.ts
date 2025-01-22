import { PV as PV_Deno, XIRR as XIRR_Deno } from "./finance.ts";

import { parse } from "jsr:@std/csv";
import * as path from "jsr:@std/path";

import { instantiate } from "../lib/rs_lib.generated.js";
import { DayCount } from "./type.ts";

const {
  XIRR,
  PV,
} = await instantiate();

/**
 * Load sample dates and payments in the samples directory
 * @returns Array of { name, dates, payments }
 */
export const getSamples = async () => {
  const cashFlow = [];

  const repertoire = path.join(Deno.cwd(), "examples", "samples");
  for await (const dirEntry of Deno.readDir(repertoire)) {
    if (dirEntry.isFile) {
      const file = path.join(repertoire, dirEntry.name);
      const text = await Deno.readTextFile(file);
      const f0 = parse(text, {
        skipFirstRow: false,
      });

      const name = dirEntry.name;
      const dates = f0.map((x) => x[0]).map((x) => new Date(x));
      const payments = f0.map((x) => x[1]).map((x) => parseFloat(x));
      cashFlow.push({ name, dates, payments });
    }
  }
  return cashFlow;
};

const samples = await getSamples();

Deno.bench("Deno PV", () => {
  PV_Deno(5 / 100, 100, 5);
});

Deno.bench("Rust PV", () => {
  PV(5 / 100, 100, 5);
});

Deno.bench("Deno XIRR", () => {
  samples.forEach((item) => XIRR_Deno(item.dates, item.payments, 0.1));
});

Deno.bench("Rust XIRR", () => {
  samples.forEach((item) =>
    XIRR(item.dates, item.payments, 0.1, DayCount.ACT_365F)
  );
});
