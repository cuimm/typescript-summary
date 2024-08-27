/**
 * 得到元组类型中的第一个元素
 */

// 通过索引访问元组的第一个
export type FirstItem<T extends any[]> = T[0];


type A = FirstItem<[string, number, boolean, string]>; // string
type B = FirstItem<['A', 'B', 'C']>; // 'A'

export {};
