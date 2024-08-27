/**
 * 计算字面量字符串的长度
 */

// 元组的length属性可以返回长度。
// 【递归】不断的递归字符串的每一项，最左边的放入元组，最右边的递归，最终返回元组的长度。
export type LengthOfString<
    T extends string,
    F extends any[] = []
> = T extends `${infer L}${infer R}` ? LengthOfString<R, [...F, L]> : F['length'];

type R1 = LengthOfString<'Foo.com'>;
type R2 = LengthOfString<''>;

export { };

