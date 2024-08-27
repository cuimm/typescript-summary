/**
 * 向元组中插入新的元素
 */

export type Push<T extends any[], U> = [...T, U];


type A = Push<[1, 2], 3>; // [1, 2, 3]
type B = Push<[string], number>; // [string, number]
type C = Push<[], 'a'>; // ["a"]

export {};