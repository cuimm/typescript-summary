/**
 * 横杠命名转化为驼峰命名
 */

// 【递归】
export type CamelCase<T extends string, F extends string = ''> =
    T extends `${infer L}-${infer R1}${infer R2}` ? CamelCase<R2, `${F}${L}${Capitalize<R1>}`> : Capitalize<`${F}${T}`>;

export type CamelCase2<T extends string, F extends string = ''> = 
    T extends `${infer L}-${infer R}` ? CamelCase<R, `${F}${Capitalize<L>}`> : `${F}${Capitalize<T>}`;


type T1 = CamelCase<"hello-cui-mm">; // HelloCuiMm
type T2 = CamelCase<"hello-type-script">; // HelloTypeScript

export { };
