/**
 * 获取字面量字符串的最后一个字符
 */

// 【递归】不停的取右边的部分，并且每次取之前保存上一次的第一个字符，最终不满足条件时返回上一次的Left即可。

// 1. 通过【infer】关键字【递归】获取除第一个字母之外的剩余字符
// 2. 每次匹配之后，将上一次的第一个字符保存起来（F）
// 3. 最终条件不成立时，返回最后一次的第一个字符
export type LastChar<T, F = never> = T extends `${infer L}${infer R}` ? LastChar<R, L> : F;


type R1 = LastChar<'Foo'>; // "o"
type R2 = LastChar<'bar'>; // "r"
type R3 = LastChar<''>; // never
type R4 = LastChar<'A'>; // "A"

export {};