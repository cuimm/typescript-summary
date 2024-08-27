/**
 * 将字符串字面量重复N次
 */

// 字符串的length属性返回的是number
type StringLength = 'ABC'['length']; // type StringLength = number

// 元组有length属性，返回的是元组的长度
type TupleLength = ['A', 'B', 'C']['length']; // type TupleLength = 3

// 字面量的extends
type P = 3 extends 3 ? true : false; // true


// 1. 【递归】使用TupleToString
import { TupleToString } from './5.TupleToString';
export type RepeatString<T extends string, N extends number, F extends any[] = []> = F['length'] extends N ? TupleToString<F> : RepeatString<T, N, [...F, T]>;

type R1 = RepeatString<'A', 3>; // type R1 = "AAA"
type R2 = RepeatString<'B', 0>; // type R2 = ""


// 2. 【递归】直接实现
// 扩展参数A：用来记录当前循环次数
// 扩展参数F：最终拼接的字符串
export type RepeatString2<T extends string, N extends number, A extends any[] = [], F extends string = ''> = A['length'] extends N
    ? F
    : RepeatString2<T, N, [...A, undefined], `${F}${T}`>;


type U = RepeatString2<'A', 3>; // type U = "AAA"
type U2 = RepeatString2<'B', 0>; // type U2 = ""

export { };
