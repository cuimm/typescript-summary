/**
 * 将字符串字面量类型按照指定字符分割为元组。无法分割的则返回原字符串字面量
 */

// 根据infer的左右来分割，左边的放到数组F中，右边递归，最终在结果集中增加无法匹配的即可。
export type SplitString<
    T extends string,
    S extends string,
    F extends any[] = []
> = T extends `${infer L}${S}${infer R}` ? SplitString<R, S, [...F, L]> : [...F, T];


type A1 = SplitString<"handle-open-flag", "-">; // ["handle", "open", "flag"]
type A2 = SplitString<"open-flag", "-">; // ["open", "flag"]
type A3 = SplitString<"handle.open.flag", ".">; // ["handle", "open", "flag"]
type A4 = SplitString<"handle.open.flag", "-">; // ["handle.open.flag"]


export { };