// @generated file from wasmbuild -- do not edit
// @ts-nocheck: generated
// deno-lint-ignore-file
// deno-fmt-ignore-file

let wasm;
export function __wbg_set_wasm(val) {
  wasm = val;
}

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

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
  if (
    cachedDataViewMemory0 === null ||
    cachedDataViewMemory0.buffer.detached === true ||
    (cachedDataViewMemory0.buffer.detached === undefined &&
      cachedDataViewMemory0.buffer !== wasm.memory.buffer)
  ) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }
  return cachedDataViewMemory0;
}

const lTextDecoder = typeof TextDecoder === "undefined"
  ? (0, module.require)("util").TextDecoder
  : TextDecoder;

let cachedTextDecoder = new lTextDecoder("utf-8", {
  ignoreBOM: true,
  fatal: true,
});

cachedTextDecoder.decode();

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
  if (
    cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0
  ) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(
    getUint8ArrayMemory0().subarray(ptr, ptr + len),
  );
}

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];

  heap[idx] = obj;
  return idx;
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === "undefined"
  ? (0, module.require)("util").TextEncoder
  : TextEncoder;

let cachedTextEncoder = new lTextEncoder("utf-8");

const encodeString = typeof cachedTextEncoder.encodeInto === "function"
  ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
  }
  : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length,
    };
  };

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;

  const mem = getUint8ArrayMemory0();

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
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);

    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
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
    var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
    var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
    var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
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
    var r0 = getDataViewMemory0().getFloat64(retptr + 8 * 0, true);
    var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
    var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
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
    var r0 = getDataViewMemory0().getFloat64(retptr + 8 * 0, true);
    var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
    var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
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

export function __wbg_get_5419cf6b954aa11d(arg0, arg1) {
  const ret = getObject(arg0)[arg1 >>> 0];
  return addHeapObject(ret);
}

export function __wbg_new_70a2f23d1565c04c(arg0, arg1) {
  const ret = new Error(getStringFromWasm0(arg0, arg1));
  return addHeapObject(ret);
}

export function __wbg_getFullYear_e1a765b7eef7e85d(arg0) {
  const ret = getObject(arg0).getFullYear();
  return ret;
}

export function __wbg_getUTCMonth_856ec2acc2502dbd(arg0) {
  const ret = getObject(arg0).getUTCMonth();
  return ret;
}

export function __wbg_getDate_aae460722f8c414e(arg0) {
  const ret = getObject(arg0).getDate();
  return ret;
}

export function __wbindgen_object_drop_ref(arg0) {
  takeObject(arg0);
}

export function __wbg_length_f217bbbf7e8e4df4(arg0) {
  const ret = getObject(arg0).length;
  return ret;
}

export function __wbindgen_number_get(arg0, arg1) {
  const obj = getObject(arg1);
  const ret = typeof obj === "number" ? obj : undefined;
  getDataViewMemory0().setFloat64(
    arg0 + 8 * 1,
    isLikeNone(ret) ? 0 : ret,
    true,
  );
  getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
}

export function __wbindgen_throw(arg0, arg1) {
  throw new Error(getStringFromWasm0(arg0, arg1));
}
