/**
 * 替换字符串中的指定字符
 */

// 构建查找规则，找到后将左边和右边保存起来，${infer L}${O}${infer R}，右边的R继续递归
export type Replace<T extends string, S extends string, RC extends string, F extends string = ''> =
    S extends '' 
    ? `${RC}${T}`
    : T extends `${ infer L }${ S }${ infer R }`
        ? Replace<R, S, RC, `${ F }${ L }${ RC }`>
        : `${F}${T}`;


type a1 = Replace<'ha ha ha s', 'ha', 'he'>; // he he he s
type a2 = Replace<'cm', 'cm', 'cuimm'>; // cuimm
type a3 = Replace<'a', '', 'cuimm'>; // cuimma（类型JS中：'a'.replace('', 'cuimm') 返回cuimma）
type a4 = Replace<'', '', 'cuimm'>; // cuimm（类型JS中：''.replace('', 'cuimm')，返回cuimm）
type a5 = Replace<'', 'xx', 'cuimm'>; // ''


export {};
