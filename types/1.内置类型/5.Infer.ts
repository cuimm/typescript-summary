/**
 * 模式匹配类型，推断函数类型中参数的最后一个参数类型.
 *
 * Infer：构建推断位置即可。
 */

function sum(a: number, b: number, c: string) {}

// 获取所有参数类型
type Paramaters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

// 最后一个参数类型 1
export type LastParamater<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P extends [...any, infer LastP]
    ? LastP
    : never
  : never;

// 最后一个参数类型 2：（...infer X 处不可用...any代替）
export type LastParamater2<T extends (...agrs: any[]) => any> = T extends (
  ...args: [...infer X, infer LastP]
) => any
  ? LastP
  : never;

// 最后一个参数类型 3
export type LastParamater3<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P extends [...infer arr, infer LastP]
    ? LastP
    : never
  : never;

// 最后一个参数类型 4：使用Paramaters
export type LastParamater4<T extends (...args: any[]) => any> =
  Paramaters<T> extends [...any, infer P] ? P : never;

type R = Paramaters<typeof sum>; // type R1 = [a: number, b: number, c: string]
type R1 = LastParamater<typeof sum>; // type R1 = string
type R2 = LastParamater2<typeof sum>; // type R2 = string
type R3 = LastParamater3<typeof sum>; // type R3 = string
type R4 = LastParamater4<typeof sum>; // type R4 = string

export {};
