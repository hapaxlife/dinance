# DINANCE

Finance module for Deno in Rust & WASM
- XIRR
- DaysBetween
- YearFraction

Others functions are not fully implemented or wrapped

:warning: Bench results show that Rust is **much slower** than Deno function 

Inspired / come from
- https://github.com/ebradyjobory/finance.js
- https://github.com/Anexen/pyxirr

## Command

For usage & examples
`deno run --allow-read examples/mod.ts`

For test
`deno test --allow-read examples/mod_test.ts`

For bench
`deno bench --allow-read examples/bench.ts`