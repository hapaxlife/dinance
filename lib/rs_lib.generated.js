// @generated file from wasmbuild -- do not edit
// deno-lint-ignore-file
// deno-fmt-ignore-file
// source-hash: 417749d9bc9a02af2ec94d9b6b9142eac8c88fc7
let wasm;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) {
  return heap[idx];
}

let heap_next = heap.length;

function dropObject(idx) {
  if (idx < 132) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}

function isLikeNone(x) {
  return x === undefined || x === null;
}

let cachedFloat64Memory0 = null;

function getFloat64Memory0() {
  if (cachedFloat64Memory0 === null || cachedFloat64Memory0.byteLength === 0) {
    cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
  }
  return cachedFloat64Memory0;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
  if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
    cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachedInt32Memory0;
}

const cachedTextDecoder = typeof TextDecoder !== "undefined"
  ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true })
  : {
    decode: () => {
      throw Error("TextDecoder not available");
    },
  };

if (typeof TextDecoder !== "undefined") cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
  if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];

  heap[idx] = obj;
  return idx;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = typeof TextEncoder !== "undefined"
  ? new TextEncoder("utf-8")
  : {
    encode: () => {
      throw Error("TextEncoder not available");
    },
  };

const encodeString = function (arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
};

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length, 1) >>> 0;
    getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;

  const mem = getUint8Memory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7F) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);

    offset += ret.written;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}
/**
 * Number of days between two date following day convention
 *
 * # Examples
 *
 * ```
 * DaysBetween(new Date(2015, 11, 1), new Date(2016, 7, 1), DayCount.ACT_360)
 *
 * ```
 * @param {Date} d1
 * @param {Date} d2
 * @param {string} day_count
 * @returns {number}
 */
export function DaysBetween(d1, d2, day_count) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passStringToWasm0(
      day_count,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc,
    );
    const len0 = WASM_VECTOR_LEN;
    wasm.DaysBetween(retptr, addHeapObject(d1), addHeapObject(d2), ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var r2 = getInt32Memory0()[retptr / 4 + 2];
    if (r2) {
      throw takeObject(r1);
    }
    return r0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}

/**
 * Fraction of year between two date following day convention
 *
 * # Examples
 *
 * ```
 * DaysBetween(new Date(2015, 11, 1), new Date(2016, 7, 1), DayCount.ACT_360)
 *
 * ```
 * @param {Date} d1
 * @param {Date} d2
 * @param {string} day_count
 * @returns {number}
 */
export function YearFraction(d1, d2, day_count) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passStringToWasm0(
      day_count,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc,
    );
    const len0 = WASM_VECTOR_LEN;
    wasm.YearFraction(retptr, addHeapObject(d1), addHeapObject(d2), ptr0, len0);
    var r0 = getFloat64Memory0()[retptr / 8 + 0];
    var r2 = getInt32Memory0()[retptr / 4 + 2];
    var r3 = getInt32Memory0()[retptr / 4 + 3];
    if (r3) {
      throw takeObject(r2);
    }
    return r0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}

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
 * @param {Array<any>} dates
 * @param {Array<any>} amounts
 * @param {number} guess
 * @param {string} day_count
 * @returns {number}
 */
export function XIRR(dates, amounts, guess, day_count) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passStringToWasm0(
      day_count,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc,
    );
    const len0 = WASM_VECTOR_LEN;
    wasm.XIRR(
      retptr,
      addHeapObject(dates),
      addHeapObject(amounts),
      guess,
      ptr0,
      len0,
    );
    var r0 = getFloat64Memory0()[retptr / 8 + 0];
    var r2 = getInt32Memory0()[retptr / 4 + 2];
    var r3 = getInt32Memory0()[retptr / 4 + 3];
    if (r3) {
      throw takeObject(r2);
    }
    return r0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}

/**
 * Present Value of a single cashflow
 *
 * # Examples
 *
 * ```
 * PV(5 / 100, 100, 5)
 *
 * ```
 * @param {number} rate
 * @param {number} cf1
 * @param {number} num_of_period
 * @returns {number}
 */
export function PV(rate, cf1, num_of_period) {
  const ret = wasm.PV(rate, cf1, num_of_period);
  return ret;
}

const imports = {
  __wbindgen_placeholder__: {
    __wbg_get_44be0491f933a435: function (arg0, arg1) {
      const ret = getObject(arg0)[arg1 >>> 0];
      return addHeapObject(ret);
    },
    __wbg_new_d258248ed531ff54: function (arg0, arg1) {
      const ret = new Error(getStringFromWasm0(arg0, arg1));
      return addHeapObject(ret);
    },
    __wbg_getFullYear_216d503364102f80: function (arg0) {
      const ret = getObject(arg0).getFullYear();
      return ret;
    },
    __wbg_getUTCMonth_0d50a6216b1c52ca: function (arg0) {
      const ret = getObject(arg0).getUTCMonth();
      return ret;
    },
    __wbg_getDate_36902c0bd04b2cd0: function (arg0) {
      const ret = getObject(arg0).getDate();
      return ret;
    },
    __wbindgen_object_drop_ref: function (arg0) {
      takeObject(arg0);
    },
    __wbg_length_fff51ee6522a1a18: function (arg0) {
      const ret = getObject(arg0).length;
      return ret;
    },
    __wbindgen_number_get: function (arg0, arg1) {
      const obj = getObject(arg1);
      const ret = typeof obj === "number" ? obj : undefined;
      getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
      getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    },
    __wbindgen_throw: function (arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    },
  },
};

import { Loader } from "https://deno.land/x/wasmbuild@0.15.0/loader.ts";
import { cacheToLocalDir } from "https://deno.land/x/wasmbuild@0.15.0/cache.ts";

const loader = new Loader({
  imports,
  cache: cacheToLocalDir,
});
/**
 * Decompression callback
 *
 * @callback DecompressCallback
 * @param {Uint8Array} compressed
 * @return {Uint8Array} decompressed
 */

/**
 * Options for instantiating a Wasm instance.
 * @typedef {Object} InstantiateOptions
 * @property {URL=} url - Optional url to the Wasm file to instantiate.
 * @property {DecompressCallback=} decompress - Callback to decompress the
 * raw Wasm file bytes before instantiating.
 */

/** Instantiates an instance of the Wasm module returning its functions.
 * @remarks It is safe to call this multiple times and once successfully
 * loaded it will always return a reference to the same object.
 * @param {InstantiateOptions=} opts
 */
export async function instantiate(opts) {
  return (await instantiateWithInstance(opts)).exports;
}

/** Instantiates an instance of the Wasm module along with its exports.
 * @remarks It is safe to call this multiple times and once successfully
 * loaded it will always return a reference to the same object.
 * @param {InstantiateOptions=} opts
 * @returns {Promise<{
 *   instance: WebAssembly.Instance;
 *   exports: { DaysBetween: typeof DaysBetween; YearFraction: typeof YearFraction; XIRR: typeof XIRR; PV: typeof PV }
 * }>}
 */
export async function instantiateWithInstance(opts) {
  const { instance } = await loader.load(
    opts?.url ?? new URL("rs_lib_bg.wasm", import.meta.url),
    opts?.decompress,
  );
  wasm = wasm ?? instance.exports;
  cachedInt32Memory0 = cachedInt32Memory0 ?? new Int32Array(wasm.memory.buffer);
  cachedUint8Memory0 = cachedUint8Memory0 ?? new Uint8Array(wasm.memory.buffer);
  return {
    instance,
    exports: getWasmInstanceExports(),
  };
}

function getWasmInstanceExports() {
  return { DaysBetween, YearFraction, XIRR, PV };
}

/** Gets if the Wasm module has been instantiated. */
export function isInstantiated() {
  return loader.instance != null;
}
