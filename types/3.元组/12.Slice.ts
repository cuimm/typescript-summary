/**
 * 元组截取
 */

// SA: 达到开始索引前的元素，达到开始索引后长度不再增加
// SE: 当前遍历的个数，一直累加
//  F: 最终结果
export type Slice<
  T extends any[],
  S extends number,
  E = T["length"],
  SA extends any[] = [],
  SE extends any[] = [],
  F extends any[] = []
> = T extends [infer L, ...infer R]
  ? SA["length"] extends S
    ? SE["length"] extends E
      ? [...F, L]
      : Slice<R, S, E, SA, [...SE, L], [...F, L]>
    : Slice<R, S, E, [...SA, L], [...SE, L], F>
  : F;

type A1 = Slice<[any, never, 1, "2", true, boolean], 0, 2>; // [any,never,1]  从第0个位置开始，保留到第2个位置的元素类型
type A2 = Slice<[any, never, 1, "2", true, boolean], 1, 3>; // [never,1,'2']  从第1个位置开始，保留到第3个位置的元素类型
type A3 = Slice<[any, never, 1, "2", true, boolean], 1, 2>; // [never,1]  从第1个位置开始，保留到第2个位置的元素类型
type A4 = Slice<[any, never, 1, "2", true, boolean], 2>; // [1,'2',true,boolean]  从第2个位置开始，保留后面所有元素类型
type A5 = Slice<[any], 2>; // []  从第2个位置开始，保留后面所有元素类型
type A6 = Slice<[], 0>; // []  从第0个位置开始，保留后面所有元素类型

export {};
