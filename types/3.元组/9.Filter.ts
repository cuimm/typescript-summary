/**
 * 类型过滤
 */
export type Filter2<T extends any[], U, F extends any[] = []> = 
    T extends [infer L, ...infer R]
    ? [L] extends [U]  // 处理any
        ? Filter<R, U, [...F, L]> 
        : Filter<R, U, F>
    : F;

// 优化写法
export type Filter<T extends any[], U, F extends any[] = []> = 
    T extends [infer L, ...infer R]
    ? Filter<R, U, [L] extends [U] ? [...F, L] : F>
    : F;


type A = Filter<[1, "BFE", 2, true, "dev"], number>; // [1, 2]
type B = Filter<[1, "BFE", 2, true, "dev"], string>; // ['BFE', 'dev']
type C = Filter<[1, "BFE", 2, any, "dev"], string>; // ['BFE', any, 'dev']

// any
type a = any extends string ? true : false; // boolean
type b = [any] extends [string] ? true : false; // true

export {};
