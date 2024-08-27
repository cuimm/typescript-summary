/**
 * 元组删除并替换部分元素
 */
export type Splice<
  T extends any[],
  S extends number,
  E extends number,
  I extends any[] = [],
  SA extends any[] = [], // 达到开始索引前的元组
  SE extends any[] = [], // 删除的元素
  F extends any[] = [] // 结果集
> = T extends [infer L, ...infer R]
  ? SA["length"] extends S
    ? SE["length"] extends E
      ? [...F, ...I, L, ...R]
      : Splice<R, S, E, I, SA, [...SE, L], F>
    : Splice<R, S, E, I, [...SA, L], SE, [...F, L]>
  : F;

type A1 = Splice<[string, number, boolean, null, undefined, never], 0, 2>; // [boolean,null,undefined,never]  从第0开始删除，删除2个元素
type A2 = Splice<[string, number, boolean, null, undefined, never], 1, 3>; // [string,undefined,never]  从第1开始删除，删除3个元素
type A3 = Splice<
  [string, number, boolean, null, undefined, never],
  1,
  2,
  [1, 2, 3]
>; // [string,1,2,3,null,undefined,never]  从第1开始删除，删除2个元素，替换为另外三个元素1,2,3

export {};
