/**
 * 字类型互斥
 */
interface Man1 {
    height: string;
    a: number;
};
interface Man2 {
    funny: string,
    a: number;
};
interface Man3 {
    foreign: string
};

// Man：类型Man满足其中一个类型即可。
type Man = Man1 | Man2 | Man3;
let man: Man = {
    height: '高个',
    funny: '幽默',
    foreign: '洋派'
};


/**
 * 需求：属性互斥，只能满足一个上面其中一个类型。
 * 
 * 思路：
 *      1. 将要排除的属性类型定义为never。
 *        interface { height: string } -> interface { height: string, funny?: never, foreign?: never }
 *      2. 利用联合类型进行属性间的互斥
 *    
 */
// 将不在U内的属性类型设置为可选never类型
type DiscardType<T, U> = {
    [K in Exclude<keyof T, keyof U>]?: never
};
// 联合类型
export type OrType<T, U> = (DiscardType<T, U> & U) | DiscardType<U, T> & T;


// 多个数据类型互次
type SimpleMan = OrType<Man3, OrType<Man1, Man2>>;



let simpleMan: SimpleMan = {
    height: '高个',
    a: 100,
    // funny: '幽默',
    // foreign: '洋派'
}

export { };