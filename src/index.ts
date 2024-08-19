/**
 * 内置类型
 *    基于循环的映射类型：
 *      Partial<T>：循环遍历T【最外层】的属性，将属性变成可选属性。
 *      Required<T>：循环遍历【最外层】的属性，将属性变成必填属性。
 *      Readonly<T>：只读属性。将对象最外层属性变成只读属性
 *      Mutate：可选属性。将对象最外层属性变成可选属性
 * 
 *      Pick<T, k>：从已有类型中挑选所需属性
 *      Omit<T, k>：从已有类型中排除指定属性
 *      Record<T, K>：主要用来定义对象，接收2个范型，【对象键的类型和对象值的类型】
 */

/**
 * 内置类型【Partial】
 * 
 * Partial<T>：循环便利T【最外层】的属性，将属性变成可选属性。
 */
{
    // 循环T最外层属性，将最外层属性变成可选属性
    type Partial<T> = {
        [K in keyof T]?: T[K]
    }
    // 循环T所有层级的所有属性，将全部的属性变成可选属性
    type DeepPartial<T> = {
        [K in keyof T]?: T[K] extends object ? Partial<T[K]> : T[K]
    }

    // 实例：
    interface Person {
        name: string;
        age: number;
        address: {
            x: number;
            y: number;
        }
    };
    // 1）通过【Partial】将Person最外层属性变为可选参数【address可不传，但是如果穿了address就必须传x、y】
    const person1: Partial<Person> = {};
    const person2: Partial<Person> = {
        address: {
            x: 100,
            y: 200,
        }
    };
    // 2）通过【DeepPartial】所有层级的属性都可不传
    const person3: DeepPartial<Person> = {};
    const person4: DeepPartial<Person> = {
        address: {}
    };
}

/**
 * 内置属性【required】
 * 
 * Required<T>：循环遍历最外面的一层属性，将属性变成必填属性。
 */
{
    // 【类型定义】
    type Required<T> = {
        [K in keyof T]-?: T[K] // -?：将可选属性修饰符去掉
    };

    // 【使用】
    interface Person {
        name?: string;
        age: number;
        address?: {
            x: number;
            // y?: number;
        }
    };
    const person: Required<Person> = {
        name: 'cuimm',
        age: 20,
        address: {
            x: 100
        }
    };
}

/**
 * 【Readonly】：只读
 */
{
    // 【方法定义】
    type Readonly<T> = {
        readonly [K in keyof T]: T[K]
    };

    // 【使用】
    interface Person {
        name: string;
        age?: number;
    };
    const person: Readonly<Required<Person>> = {
        name: 'cuimm',
        age: 20,
    };
    // person.name = 'cui'; // 报错：无法为“name”赋值，因为它是只读属性。ts(2540)
}

/**
 * 【Mutate】
 * 
 * 可变属性
 */
{
    type Mutate<T> = {
        -readonly [K in keyof T]: T[K]
    };
    // 【使用】
    interface Person {
        readonly name: string;
        age?: number;
    };
    const person: Mutate<Readonly<Required<Person>>> = {
        name: 'cuimm',
        age: 20,
    };
    person.name = 'cui';
}

/**
 * 【Pick】：从已有类型中挑选所需属性
 * 
 * 重构对象结构
 */
{
    type Pick<T, K extends keyof T> = {
        [R in K]: T[R]
    };
    //【示例】
    interface Person {
        name: string;
        age: number;
        address: object;
    };
    type PickPerson = Pick<Person, 'name' | 'age'>; // type PickPerson = { name: string; age: number; }
    let person: PickPerson = { name: 'cuimm', age: 10 };
}

/**
 * 【Omit】：从已有类型中排除指定属性
 */
{
    type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

    //【示例】
    interface Person {
        name: string;
        age: number;
        address: object;
    };
    type OmitPerson = Omit<Person, 'address'>; // type OmitPerson = { name: string; age: number; }
}

/*** 
 * 示例【mixin】
 * 
 * 2个对象合并 
 */
{
    /* 错误定义
    function mixin<T, K>(a: T, b: K): T & K {
        return { ...a, ...b };
    }
    type name = (typeof res)['name']; // type name = never
    */

    function mixin<T, K>(a: T, b: K): Omit<T, keyof K> & K {
        return { ...a, ...b };
    }
    let res = mixin(
        { name: 'cuimm', age: 10, address: 'sd' },
        { name: 100, gender: 'man' }
    );

    type resType = typeof res; // 直接的返回结果可读性不高，可通过范型进行重构
    type name = (typeof res)['name']; // type name = number

    // 创建一个新的类型，类型可读性更高
    type Computed<T> = {
        [K in keyof T]: T[K]
    };
    type resType2 = Computed<typeof res>;
    /**
     type resType2 = {
        age: number;
        address: string;
        name: number;
        gender: string;
    }
     */
}

/**
 * 【Record<T, K>】
 * 主要用来定义对象，接收2个范型，【对象键的类型和对象值的类型】
 */
{
    type Record<T extends keyof any, K> = {
        [Key in T]: K
    };
    const obj: Record<string, any> = { a: 1, b: "2", c: {} };


    // 【将对象结构重新映射返回新的对象】
    function map<T extends keyof any, K, R>(
        obj: Record<T, K>,
        callback: (value: K, key: T) => R
    ) {
        const result = {} as Record<T, R>;
        for (let key in obj) {
            result[key] = callback(obj[key], key);
        }
        return result;
    }

    // TS 是基于位置进行推导的
    // let result: Record<"name" | "age", string>
    // (parameter) item: string | number
    // (parameter) key: "name" | "age"
    let result = map({ name: 'cuimm', age: 10 }, (item, key) => {
        return 'abc';
    });
}

export { };

