/**
 * 泛型
 *      可以用于函数、接口、类、type
 *      如果在使用时无法确定当时的类型，可以采用泛形来定义
 * 
 * T写在等号后面：表示【定义函数】的时候传参
 *      type IForEach = <T>(array: T[], callback: ICallback<T>) => void; 
 * 
 * T写在等号前面：表示【调用函数】的时候传参
 *      type ICallback<T> = (item: T, index: number) => void; 
 * 
 */

/************ 1. 提供一个方法创建Person、Animal等实例 ************/
class Person {
    constructor(public name: string, public age: number) { }
}
class Animal {
    constructor(public name: string, public age: number, public sound: string) { }
}
// 1. 初实现
{
    // type ITarget = new (name: string, age: number) => any;
    type ITarget = {
        new(name: string, age: number): any
    }
    function createIntance(target: ITarget, name: string, age: number) {
        return new target(name, age);
    }
    const person = createIntance(Person, 'cuimm', 18); // person推导出来的类型为：any
}

// 2. 使用范型
{
    interface ITarget<T> {
        new(name: string, age: number): T; // 描述类的类型，必须可以new
    }
    function createIntance<T>(target: ITarget<T>, name: string, age: number) {
        return new target(name, age);
    }
    const person = createIntance<Person>(Person, 'cuimm', 18);
    console.log(person);

    // const animal = createIntance(Animal, 'cat', 10);
}

// 3. 优化：function + 使用范型 + 剩余/展开运算符
{
    type ITarget<T> = new (...args: any[]) => T; // 【类的类型定义】
    function createIntance<T>(target: ITarget<T>, ...args: any[]): T {
        return new target(args);
    }
    const person = createIntance<Person>(Person, 'cuimm', 18); // person类型：Person
    const animal = createIntance(Animal, 'cat', 10, '喵'); // animal类型：Animal
}

// 4. 优化：函数表达式 + 范型 + 剩余/展开运算符
{
    type ITarget<T> = new (...args: any[]) => T;
    // type ICreateInstance = <T>(Target: ITarget<T>, ...args: any[]) => T;
    type ICreateInstance = {
        <T>(Target: ITarget<T>, ...args: any[]): T
    };
    const createInstance: ICreateInstance = (Target, ...args) => {
        return new Target(...args);
    };
    const person = createInstance(Person, 'cuimm', 20);
    const animal = createInstance(Animal, 'cat', 10, '喵');
}


/************ 2. 根据提供的数据生成对应长度的数组 ************/
function createArray<T>(length: number, value: T) {
    const result: T[] = [];
    for (let index = 0; index < length; index++) {
        result.push(value);
    }
    return result;
}
const arr1 = createArray<string>(3, 'abc'); // arr1推导类型为：string[]
const arr2 = createArray(3, 100); // arr2推导类型为：number[]


/************ 3. 交换元组的两个变量 ************/
{
    function swap<T, K>(tuple: [T, K]): [K, T] {
        return [tuple[1], tuple[0]];
    }

    const result = swap([100, 'abc']); // result's type is: [string, number]
    const result2 = swap([100, true]); // result's type is: [boolean, number]
}

// 使用函数表达式定义
{
    type ISwap = <T, K>(tuple: [T, K]) => [K, T]; // 定义函数的方法类型
    const swap: ISwap = tuple => {
        return [tuple[1], tuple[0]];
    }
    const result = swap([100, 'abc']); // result's type is: [string, number]
    const result2 = swap([100, true]); // result's type is: [boolean, number]
}



/************ 4. 数组循环 ************/
{
    const forEach = <T>(array: Array<T>, callback: (item: T, index: number) => void) => {
        for (let index = 0; index < array.length; index++) {
            callback(array[index], index);
        }
    };
    forEach([1, 2, 3, 'a', 'b', 'c', true], (item, index) => {
        console.log(item, index);
    });
}
{
    type ICallback<T> = (item: T, index: number) => void; // T写在等号前面：表示【调用函数】的时候传参
    type IForEach = <T>(array: T[], callback: ICallback<T>) => void; // T写在等号后面：表示【定义类型】的时候传参

    const forEach: IForEach = (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            callback(array[index], index); // TS在推导的时候并没有真正执行。范型使用的时候传递参数，可以直接推导，但是内部调用的时候没有确定类型。
        }
    };

    forEach([1, 2, 3, 'a', 'b', 'c', true,], (item, index) => {
        console.log(item, index);
    });
}

/************ 5. 范型默认值 ************/
{
    // 范型是可以设置默认值的
    type Union<T = boolean> = T | number | string;
    const union: Union<boolean> = true;
    const union2: Union = true; // 范型设置了默认值之后，就可以不再传递T的类型
}

/************ 5. 范型约束 extends ************/
// 1）传参约束
{
    // 范型约束：要求传递的参数必须符合要求。语法：A extends B。要求A是B的子类型或者同类型。【A包含B所有的属性】

    // 1）T必须是 string 或者 number 类型
    function handle<T extends string | number>(val: T): T {
        return val;
    }
    const v = handle(100);
    const v2 = handle('abc');

    // 2）传入参数必须有length属性
    interface IWidthLen {
        length: number
    }
    function handle2<T extends IWidthLen>(val: T): number {
        return val.length;
    }
    handle2('abc');
    handle2([]);
    /* #__PURE__*/ handle2({ a: 1, b: 2, length: 100 }); // val有length属性，就可以是IWidthLen的子类型。【对于对象，A 继承 B： A的属性要比B多】
}

// 3）获取对象属性值
{
    function getVal<T>(val: T, key: keyof T) {
        return val[key];
    }
    getVal({ name: 'cuimm', age: 20 }, 'age');

    // 优化：K extends number | string
    function getVal2<T, K extends keyof T>(val: T, key: K) {
        return val[key];
    }
    getVal2({ name: 'cuimm', age: 20 }, 'age');
}

// 4）登陆
{
    // 角色
    enum Role {
        ADMIN,
        SAMPLE,
    }
    type IRole = 1 | 2 | 3;
    // 接口通用返回值结构
    interface IResponse<T> {
        code: number;
        message?: string;
        data: T;
    }
    // 登陆接口返回值结构
    interface ILoginResponseData {
        token: string;
        // role: 1 | 2 | 3
        // role: IRole
        role: Role
    };
    function login(): IResponse<ILoginResponseData> {
        return {
            code: 10000,
            message: 'success',
            data: {
                token: 'hiwW2dasbs',
                role: 1,
            },
        };
    }
    const data = login();
}

// 5）获取数组最大值
{
    class MyArray<T> {
        private array: T[] = [];
        set(val: T) {
            this.array.push(val);
        }
        max(): T {
            let max = this.array[0];
            for (let index = 0; index < this.array.length; index++) {
                const current = this.array[index];
                if (current > max) {
                    max = current;
                }
            }
            return max;
        }
    }

    const myArray = new MyArray<number>();
    myArray.set(100);
    myArray.set(300);
    myArray.set(200);
    const max = myArray.max();
    console.log(max);
}
export { };
