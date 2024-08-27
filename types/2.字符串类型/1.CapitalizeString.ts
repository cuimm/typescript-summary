/**
 * 首字母大写
 */

// 1. 使用【模版字符串】将首字母大写
export type CapitalizeString<T> = T extends string ? `${Capitalize<T & string>}` : T;

type R1 = CapitalizeString<'handler'>; // Handler
type R2 = CapitalizeString<100>; // 100


// 2. 使用【infer】将首字母大写
export type CapitalizeString2<T> = T extends `${infer L}${infer R}` ? `${Capitalize<L>}${R}` : T;

type P1 = CapitalizeString2<'handler'>; // Handler
type P2 = CapitalizeString2<100>; // 100

export { };
