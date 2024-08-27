/**
 * 获取字符串字面量的第一个字符
 */

// 使用【模版字符串】获取字符串的第一个字符
export type FirstChar<T extends string> = T extends `${infer F}${infer L}` ? F : never;


type R1 = FirstChar<'Foo'>; // type R1 = "F"
type R2 = FirstChar<'bar'>; // type R2 = "b"
type R3 = FirstChar<''>; // type R3 = never
type R4 = FirstChar<'A'>; // type R4 = "A"（匹配`${infer F}${infer L}`时，L为空）

export {};
