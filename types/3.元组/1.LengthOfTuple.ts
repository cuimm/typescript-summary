/**
 * 计算元组类型的长度
 */

// 元组有length属性，可以获取元组的长度
export type LengthOfTuple<T extends any[]> = T['length'];


type A = LengthOfTuple<['A', 'B', 'C']>; // 3
type B = LengthOfTuple<[]>; // 0

export { };
