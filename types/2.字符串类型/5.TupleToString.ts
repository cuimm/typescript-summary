/**
 * 将字符串类型的元组转换为字符串字面量类型
 */

// 【递归】不停的取元组中的第一项，将其放在最终返回结果中
export type TupleToString<T extends any[], F extends string = ''> = T extends [infer L, ...infer R] ? TupleToString<R, `${F}${L & string}`> : F;

type R1 = TupleToString<['a', 'b', 'c', 'd']>;
type R2 = TupleToString<['a']>;
type R3 = TupleToString<[]>;

export { };
