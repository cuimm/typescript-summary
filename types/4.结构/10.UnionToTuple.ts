/**
 * 联合类型转换为元组类型
 */

/******************* 函数参数类型为交互类型 case ************************/
type Paramater<T> = T extends (args: infer P) => any ? P : never
type F = ((p: string) => any) & ((p: boolean) => any) & ((p: object) => any)
type P = Paramater<F> // 【随机返回】交叉函数类型其中【一个】参数类型：object 或者 boolean  或者 string
/**************************************************************/


// 1. 先构建联合类型。a1 => ((a1: (p: 1) => any) => any) | ((a1: (p: 2) => any) => any) | ((a1: (p: 3) => any) => any)
// 2. 推断成交叉类型。a2 => ((p: 1) => any) & ((p: 2) => any) & ((p: 3) => any)
// 3. boolean产生了分发，特殊处理
type Transform<T> = [boolean] extends [T]
  ? boolean
  : (T extends any ? (a1: (p: T) => any) => any : never) extends (a2: infer P) => any
  ? P extends (arg: infer P2) => any
    ? P2
    : never
  : never

type t1 = Transform<1 | 2 | 3> // type t1 = 3【随机返回其中一个】
type t2 = Transform<1 | 2 | boolean | string> // type t2 = boolean

export type UnionToTuple<T, U = Transform<T>> = [T] extends [never]
  ? []
  : [...UnionToTuple<Exclude<T, U>>, U]

type a1 = UnionToTuple<1 | 2 | 3> // [1, 2, 3]
type a2 = UnionToTuple<1 | 2 | boolean | string> // [1, 2, boolean, string]

export {}
