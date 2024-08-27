/**
 * 字符串转换为元数组
 */

// 【递归】不停取字符串的每一项，将其放在数组中，最终返回结果。
// F约束为数组（F extends any[]）之后，才可以使用展开运算符（...F）
export type StringToTuple<T, F extends any[] = []> = T extends `${infer L}${infer R}` ? StringToTuple<R, [...F, L]> : F;


type R1 = StringToTuple<'Foo.com'>; // type R1 = ["F", "o", "o", ".", "c", "o", "m"]
type R2 = StringToTuple<''>; // type R2 = []


export { };
