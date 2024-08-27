/**
 * 得到元组类型中的最后一个元素
 */

// 构建查找规则，通过infer查找元组的最后一个
export type LastItem<T extends any[]> = T extends [...infer L, infer R] ? R : never;

type A = LastItem<[string, number, boolean, object]>; // object
type B = LastItem<['A', 'B', 'C']>; // 'C'

export {};
