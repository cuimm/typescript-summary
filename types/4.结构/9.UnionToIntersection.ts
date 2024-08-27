/**
 * 将联合类型转换为交叉类型
 */

// 【逆变与协变】
// 函数中，逆变参数可以传父级

// 1）构建函数
type UnionToIntersectionStep<T> = T extends any ? (p: T) => any : false // 分发条件：条件类型 + 范型 + 联合类型
type A1 = UnionToIntersectionStep<{ a: string } | { b: string } | { c: string }>
/**
 * type A1 = ((p: {a: string;}) => any) | ((p: {b: string;}) => any) | ((p: {c: string;}) => any)
 */

// 2）利用函数<逆变>构建新的结构得到参数的交叉类型
export type UnionToIntersection<T> = (T extends any ? (p: T) => any : false) extends (
  p: infer R
) => any
  ? R
  : never

type A = UnionToIntersection<{ a: string } | { b: string } | { c: string }>
// {a: string} & {b: string} & {c: string}

export {}
