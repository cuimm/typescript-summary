/**
 * 将类型重复N次
 */

export type Repeat<T, C extends number, F extends any[] = []>  = 
    F['length'] extends C ? F : Repeat<T, C, [...F, T]>;


type A = Repeat<number, 3>; // [number, number, number]
type B = Repeat<string, 2>; // [string, string]
type C = Repeat<1, 2>; // [1, 1]
type D = Repeat<0, 0>; // []

export {};
