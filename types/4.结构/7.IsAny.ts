/**
 * 判断类型是否为any
 */
// 1.可以将 unknown 赋给any

type t1 = unknown extends unknown ? true : false; // true
type t2 = any extends unknown ? true : false; // true
type t3 = unknown extends any ? true : false; // true
type t4 = string extends unknown ? true : false; // true   let a: unknown = '1000';
type t5 = unknown extends string ? true : false; // false
type t6 = string extends any ? true : false; // true
type t7 = any extends string ? true : false; // boolean
type t8 = [any] extends [string] ? true : false; // true
type t9 = [unknown] extends [string] ? true : false; // false

type IsAny<T> = unknown extends T
  ? [T] extends ["abc"]
    ? true
    : false
  : false;

  let b :any= 100
  let a: string = b;
  console.log(a);
  

// 实现方式2
// 【任意类型和any交互都是any、任意类型和unknown相交都是该类型】
// 【any可以赋值给任意类型、任意类型也可以赋值给any】
type T1 = 1 & any; // any
type T2 = 1 & unknown; // 1

export type IsAny2<T> = 0 extends 1 & T ? true : false;

type A = IsAny<string>; // false
type B = IsAny<any>; // true
type C = IsAny<unknown>; // false
type D = IsAny<never>; // false

export {};
