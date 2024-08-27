/**
 * 接口 interface
 * 
 * 接口不能有具体的实现，可以用于描述函数、对象、类、混合类型。
 * 
 */

// const getFullName = ({ firstName, lastName }: { firstName: string, lastName: string }) => {
//     return firstName + lastName;
// }

// 下面两种定义IFullName的方式是一样的效果
// type IFullName = {
//     firstName: string,
//     lastName: string,
// }
interface IFullName {
    firstName: string;
    lastName: string;
}

// 下面两种定义函数的方式是一样的效果
// type IFn = (obj: IFullName) => string;
type IFn = {
    (obj: IFullName): string
};
const getFullName: IFn = ({ firstName, lastName }: IFullName) => {
    return firstName + lastName;
}
console.log(getFullName({ firstName: 'cui', lastName: 'mm' }));

/**
 * type和interface的区别：
 * 1. 如果只是用来描述结构，推荐interface。
 * 2. 如果涉及到联合类型，只能使用type声明。
 * 3. type不能被扩展，interface可以扩展。
 * 4. type不能重名，interface重名可以合并。
 * 5. type可以使用循环和条件，interface不行。
 * 其他情况下可以互换。（函数类型一般采用type声明）。
 * 
 * => 一般情况下，函数使用type声明、对象使用interface声明。
 */


/**
 * 混合类型
 */
// 使用接口定义【混合类型】(一下两种定义click方法的方式是一样的效果)
// type IClick = {
//     (): number,
//     count: number
// }
interface IClick {
    (): number; // 描述【函数】
    count: number; // 描述【属性】
}
// 如下使用let定义click方法时，报错：由于“click'”不具有返回类型批注并且在它的一个返回表达式中得到直接或间接引用，因此它隐式具有返回类型 "any"。ts(7023)
// let click = () => {
//     return click.count++;
// }
// click.count = 0;

// => 使用const定义click方法
const click: IClick = () => {
    return click.count++;
};
click.count = 0;

console.log(click());


/**
 * 
 */

interface IVeg {
    readonly color: string; // 只读属性，后续不可修改
    size?: number; // 可选属性
    taste: string;
    [key: string]: any // 任意类型。
}
const obj = {
    color: 'red',
    size: 10,
    taste: "sweet",
    xxx: 'xxx'
};
const tomato: IVeg = obj;
const tomato2: IVeg = {
    color: 'red',
    size: 10,
    taste: "sweet",
    xxx: 'xxx',
    1: 100,
    [Symbol()]: 'symbol'
};

/*
    1. 如果对象中的属性多于接口的属性，可以直接采用断言的方式来赋值。
        const tomato: IVeg = {
            color: 'red',
            size: 10,
            taste: "sweet",
            xxx: 'xxx'
        } as IVeg;
    2. 可以基于接口的特性再写一个同名的接口（多个同名接口属性会合并）【不推荐】
        interface IVeg {
            xxx: string;
        }
    3. 通过继承原有属性的方式产生一个新的类型
        interface IVeg2 extends IVeg {
            xxx: string
        }
        const tomato: IVeg2 = {
            color: 'red',
            size: 10,
            taste: "sweet",
            xxx: 'xxx'
        };
    4. 任意类型扩展【常用于一部分格式固定、一部分不固定的类型】
        interface IVeg {
            readonly color: string; // 只读属性，后续不可修改
            size?: number; // 可选属性
            taste: string;
            [key: string]: any // 任意类型。
        }
        const tomato: IVeg = {
            color: 'red',
            size: 10,
            taste: "sweet",
            xxx: 'xxx',
            1: 100,
            [Symbol()]: 'symbol'
        };
    5. 类型兼容
        interface IVeg {
            readonly color: string; // 只读属性，后续不可修改
            size?: number; // 可选属性
            taste: string;
        }
        const obj = {
            color: 'red',
            size: 10,
            taste: "sweet",
            xxx: 'xxx'
        };
        const tomato: IVeg = obj; // 此处先定义一个新的变量obj，然后将obj赋值给IVeg类型的变量。
    6. 交叉类型&...
*/

/**
 * 数字索引
 */
interface IArray {
    [key: number]: any
};
const arr: IArray = [1, 2, 3];
const arr2: IArray = {
    0: 0,
    1: 1,
    2: 2
};

/**
 * 通过索引访问字符串可以取值的类型
 */
interface IPerson {
    name: string;
    [key: string]: any;
    [key: number]: any;
    company: {
        rank: number
    }
}
const p: IPerson = {
    name: 'cuimm',
    age: 18,
    company: {
        rank: 100
    }
};
// type PersonNameType = IPerson.name; // 报错：无法访问“IPerson.name”，因为“IPerson”是类型，不是命名空间。是否要使用“IPerson["name"]”检索“IPerson”中“name”属性的类型?ts(2713)
type PersonNameType = IPerson['name']; // 通过索引访问符获取name的类型【返回的是type】
type PersonAnyType = IPerson['string']; // 通过索引访问符获取任意类型的类型
type PersonRankType = IPerson['company']['rank']; // 通过索引访问父获取rank的类型

/**
 * keyof可以取一个类型中key的集合
 * 可以实现valueOf：取值的类型集合
 */
interface ICar {
    color: string;
    price: 10000;
    width: 12;
}
const car: ICar = {
    color: 'red',
    price: 10000,
    width: 12
};
type c = typeof car; // ICar
type keyOfCar = keyof ICar & {}; // type valueOf = "color" | "price" | "width"。keyof T：返回包含T所有属性别的联合类型。
type valueOf = ICar[keyof ICar]; // type valueOf = string | 10000 | 12。通过索引运算符获取值的集合


/**
 * 接口继承 【implements】
 */
interface ChineseSpeak {
    speakChinese(): void;
}
interface EnglishSpeak {
    speakEnglish(): void;
}
// 类可以继承多个接口
class Speak implements ChineseSpeak, EnglishSpeak {
    speakChinese(): void {
        throw new Error("Method not implemented.");
    }
    speakEnglish(): void {
        throw new Error("Method not implemented.");
    }
}

export { };
