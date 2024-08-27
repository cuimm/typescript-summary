/**
 * 拍平元组
 */

// [...通过, 拍平成一维数组, ...继续拍平<剩余的数组>]
export type Flat<T extends any[]> =
    T extends [infer L, ...infer R]
    ? [...(L extends any[] ? Flat<L> : [L]), ...Flat<R>]
    : T;



type A = Flat<[1, 2, 3]>; // [1, 2, 3]
type B = Flat<[1, [2, 3], [4, [5, 6]]]>; // [1, 2, 3, 4, 5, 6]
type C = Flat<[]>; // []
type D = Flat<[1]>; // [1]

export { };
