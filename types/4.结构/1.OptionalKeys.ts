/**
 * 获取对象类型中的可选属性的联合类型
 */

// 怎么判断这个对象的属性是否可以删除？
// => 把对象的属性删除之后，看能不能再赋给自己，如果可以则说明属性是可选属性。

// 条件分发
export type OptionalKeys<T extends object, K = keyof T> = K extends keyof T
  ? Omit<T, K> extends T
    ? K
    : never
  : never

type a1 = OptionalKeys<{
  foo: number | undefined
  bar?: string
  flag: boolean
}> // "bar"
type a2 = OptionalKeys<{ foo: number; bar?: string }> // "bar"
type a3 = OptionalKeys<{ foo: number; flag: boolean }> // never
type a4 = OptionalKeys<{ foo?: number; flag?: boolean }> // "foo" | "flag"
type a5 = OptionalKeys<{}> // never

// 条件分发示例
type Test<T extends object, K = keyof T> = K extends keyof T ? (v: K) => any : never
type test2 = Test<{
  foo: number | undefined
  bar?: string
  flag: boolean
}> // type test2 = ((v: "foo") => any) | ((v: "bar") => any) | ((v: "flag") => any)

export {}
