/**
 * 类型层级
 *   由条件运算符可以掌握TS中的兼容性，以及类型的层级。
 * 
 * 兼容性：可以将一个值赋予给某个值。
 * 类型层级：低的层级可以赋予给搞得层级。
 */


type R1 = 'abc' extends string ? true : false; // true
type R2 = 123 extends number ? true : false; // true
type R3 = true extends boolean ? true : false; // true

let r1: string = 'abc';
let r2: number = 100;

type R4 = 'a' extends 'a' | 'b' | 'c' ? true : false; // true
type R5 = 1 extends 1 | 2 | 3 ? true : false; // true
type R6 = true extends true | false ? true : false; // true

let r4: 'a' | 'b' | 'c' = 'a';

type R7 = string extends String ? true : false; // true
type R8 = number extends Number ? true : false; // true
type R9 = boolean extends Boolean ? true : false; // true
type R10 = object extends Object ? true : false; // true


type R11 = Object extends any ? true : false; // true
type R12 = Object extends unknown ? true : false; // true

type R13 = never extends 'abc' ? true : false; // true




/**
 * 字面量类型可以赋值给基础类型
 * 字面量类型可以赋值给字面量的联合类型
 * 基础类型是包装类型的子类型
 * any、unknown是最大的类型
 * 
 * never < 字面量 < 字面量联合类型 | 字面量类型 < 基础数据类型 < 包装类型 < Object < any | unknown
 */

// 针对any来说，返回的是成功和失败的联合类型
type R14 = any extends Object ? true : false; // 【boolean】
type R15 = any extends 100 ? true : false; // 【boolean】
type R16 = unknown extends Object ? true : false; // false
type R17 = any extends unknown ? true : false; // true
type R18 = unknown extends any ? true : false; // true

type R19 = unknown extends 'abc' ? true : false; // false
type R20 = any extends any ? true : false; // true

/**
 * 从类型层面上：低类型可以赋值给高类型
 * 从结果上：交叉类型 可以赋值给交叉前类型
 */

type R21 = {} extends object ? true : false; // true
type R22 = {} extends Object ? true : false; // true

type R23 = object extends {} ? true : false; // true
type R24 = Object extends {} ? true : false; // true

// TS 默认小的object和Object都是可以相互赋值的
type R25 = Object extends object ? true : false; // true
type R26 = object extends Object ? true : false; // true


export { };
