/**
 * 移除收尾空格
 */

// type TrimLeft<T extends string> = T extends `${' '}${infer R}` ? TrimLeft<R> : T;
export type TrimLeft<T extends string> = T extends ` ${infer R}` ? TrimLeft<R> : T;

// type TrimRight<T extends string> = T extends `${infer L}${' '}` ? TrimRight<L> : T;
export type TrimRight<T extends string> = T extends `${infer L} ` ? TrimRight<L> : T;

export type Trim<T extends string> = TrimRight<TrimLeft<T>>;




type R = Trim<'      *cuimm*   '>; // *cuimm*

export { };
