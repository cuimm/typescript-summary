/**
 * 寻找下标
 */

type T1 = 1 extends any ? true : false; // true
type T2 = never extends 1 ? true : false; // true
type T3 = [1] extends [any] ? true : false; // true
type T4 = [any] extends [1] ? true : false; // true

// 判断两个类型是否严格一样
export type IsEqual<T, U> = 
    [T] extends [U]
    ? [U] extends [T] 
        ? keyof T extends keyof U 
            ? keyof U extends keyof T 
                ? true 
                : false 
            : false
        : false
    : false;

export type FindIndex<T extends any[], U, F extends any[] = []> =
    T extends [infer L, ...infer R]
    ? IsEqual<L, U> extends true ? F['length'] : FindIndex<R, U, [...F, L]>
    : never;



type a1 = [any, never, 1, "2", true];
type a2 = FindIndex<a1, any>; // 0
type a3 = FindIndex<a1, never>; // 1
type a4 = FindIndex<a1, 1>; // 2
type a5 = FindIndex<a1, '2'>; // 3
type a6 = FindIndex<a1, true>; // 4
type a7 = FindIndex<a1, 3>; // never

export { };
