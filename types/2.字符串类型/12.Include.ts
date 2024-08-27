/**
 * 判断传入的字符串字面量类型中是否含有某个字符串
 */

// 实现方式 1
export type Include<T extends string, U extends string> =
  T extends ''
    ? U extends '' ? true : false
    : T extends `${ infer L }${ U }${ infer R }` ? true : false;


// 实现方式 2
export type Include2<T extends string, U extends string> =
  T extends ''
    ? U extends ''
      ? true
      : false
    : T extends `${ infer L }${ infer R }`
      ? L extends U ? true : Include<R, U>
      : false;


type R1 = Include<'Cui', 'C'>; // true
type R2 = Include<'Cui', 'i'>; // true
type R3 = Include<'Cui', 'x'>; // false
type R4 = Include<'', 'aaa'>; // false
type R5 = Include<'', ''>; // true 空字符串时需要特殊处理

export {};
