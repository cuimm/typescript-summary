/**
 * 函数
 * 
 * 函数中的类型 1）函数的声明方式 2） 函数的参数  3） 函数的返回值
 * 1. function关键字定义函数
 * 2. 表达式（可以描述变量的类型）
 * 
 * 1. function关键字来声明的函数：可以提升到当前作用域顶部、不能标注函数类型。
 * 2. 函数表达式来声明的函数：必须赋予满足定义的类型。
 * 
 */

// function关键字定义函数
function sum(a: number, b: number): number {
    return a + b;
}

// 函数表达式
let sum2: (a: number, b: number) => number = (a: number, b: number): number => {
    return a + b;
};

type ISum = (a: number, b: number) => number;
let sum3: ISum = (a: number, b: number): number => {
    return a + b;
};

let sum4: ISum = (a, b) => a + b; // 会根据上下文推导变量类型


/*********** 常见的类型推导方式 ****************/
// 1）根据赋值进行推导
let name = 'cuimm';
let age = 20;

// 2）根据返回值进行推导
function fn(a: string, b: string) {
    return a + b;
}

// 3）根据上下文来推导
type ISum2 = (a: number, b: number) => number;
let sum5: ISum2 = (a, b) => {
    return a + b;
};

// 返回值是void类型，表示不关心返回的具体类型。
type ICallback = (a: string, b: string) => void;
function fn2(callback: ICallback) { }
fn2((x, y) => {
    return x + y;
});


// 函数的剩余参数（剩余运算符，类型是数组）
let total = (...rest: number[]) => {
    rest.reduce((memo, next) => {
        return memo + next;
    }, 0);
};


// 函数的this。TS中的this需手动指定，默认是函数中的第一个参数。
// TS中的`typeof`：来获取变量的类型。
// `keyof`：获取对象中的key的类型，作为联合类型
let person = {
    name: 'cuimm',
    age: 20
};
function getValue(this: typeof person, key: keyof typeof person) {
    return this[key];
}
/**
 * 编译后：
    function getValue(key) {
        return this[key];
    }
 */

type IPerson = typeof person; // 获取类型
type IKey = keyof IPerson;  // 获取对象的key
function getValue2(this: IPerson, key: IKey) {
    return this[key];
}
getValue.call(person, 'name'); // 调用



// 函数的重载
// TS中的重载是伪装的。仅是类型的重载，而不是逻辑的重载。
// 以下函数的重载，必须写在一起。
function toArray(value: string): string[];
function toArray(value: number): number[];
function toArray(value: string | number) {
    if (typeof value === 'string') {
        return value.split('');
    } else {
        return value.toString().split('').map(Number);
    }
}
toArray(123);
toArray('123');




export { };
