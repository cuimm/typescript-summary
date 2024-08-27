/**
 * 驼峰命名转横杠命名
 */

// 如何匹配大写字母？将字母转为大写，然后转换的字母是否为大写的。
type IsUpperChar1 = 'a' extends Capitalize<'a'> ? true : false; // false
type IsUpperChar2 = 'A' extends Capitalize<'a'> ? true : false; // true
type IsUpperChar<T extends string> = T extends Capitalize<T> ? true : false;



// 移除指定的首个字符
export type RemoveFirstChar<T extends string, S extends string> = T extends `${S}${infer L}` ? L : T;

// 驼峰命名变横杠命名
export type KebabCase<T extends string, F extends string = ''> =
    T extends `${infer L}${infer R}` ? KebabCase<R, L extends Capitalize<L> ? `${F}-${Lowercase<L>}` : `${F}${L}`> : RemoveFirstChar<F, '-'>;


type R1 = KebabCase<'CuiMM'>; // cui-m-m
type R2 = KebabCase<'HelloWorld'>; // hello-world


export { };
