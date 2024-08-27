/**
 * 元组类型转换为枚举类型
 */

import { FindIndex, IsEqual } from "./10.FindIndex";

// 循环元组
export type TupleToEnum<T extends any[], U = false> = {
  readonly [K in T[number]]: IsEqual<U, true> extends true
    ? FindIndex<T, K>
    : K;
};

// 元组有<number>属性，返回的是联合类型。通过该联合类型可以用来循环元组。
type X = ["MaxOs", "Windows", "Linux"][number]; // type X = "MaxOs" | "Windows" | "Linux"

type a1 = TupleToEnum<["MacOS", "Windows", "Linux"]>;
// -> { readonly MacOS: "MacOS", readonly Windows: "Windows", readonly Linux: "Linux" }

// 如果传递了第二个参数为true，则枚举对象中值的类型就是元素类型中某个元素在元组中的index索引，也就是数字字面量类型
type a2 = TupleToEnum<["MacOS", "Windows", "Linux"], true>;
// -> { readonly MacOS: 0, readonly Windows: 1, readonly Linux: 2 }

export {};
