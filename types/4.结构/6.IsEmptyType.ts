/**
 * 是否为没有属性的对象类型
 */

type t1 = keyof string extends never ? true : false; // false
type t2 = keyof { a: 3 } extends never ? true : false; // false
type t3 = keyof { } extends never ? true : false; // true
type t4 = keyof any extends never ? true : false; // false
type t5 = keyof object extends never ? true : false; // false
type t6 = '123' extends object ? true : false; // false


export type IsEmptyType<T> = keyof T extends never
  ? "123" extends T
    ? unknown extends T // unknown 也不是空
      ? false
      : true
    : false // 排除对象object的情况
  : false;

type A = IsEmptyType<string>; // false
type B = IsEmptyType<{ a: 3 }>; // false
type C = IsEmptyType<{}>; // true
type D = IsEmptyType<any>; // false

type E = IsEmptyType<object>; // false
type F = IsEmptyType<Object>; // false

type G = IsEmptyType<unknown>; // false


export {};
