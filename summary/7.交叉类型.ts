/**
 * 交叉类型
 *      将多个类型合并成一个
 * 
 * ｜：【或】满足其中一个类型
 * &：【交】包含所有的类型
 */

interface IPerson1 {
    handsome: string
}
interface IPerson2 {
    height: string
}
interface IPerson3 {
    rich: string
}

// 交集：需要满足 IPerson1、 IPerson2、 IPerson3
const person: IPerson1 & IPerson2 & IPerson3 = {
    handsome: '帅',
    height: '高',
    rich: '帅'
}

// 或：满足其中一个就可以
const person2: IPerson1 | IPerson2 = {
    handsome: '帅',
}

type IUnion = ('string' | 'number') & {}; // IUnion的类型是："string" | "number"

export {};
