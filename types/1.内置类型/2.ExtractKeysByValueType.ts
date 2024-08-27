/**
 * 根据值类型（挑选/忽略）对象类型的属性
 */

/**
 * 【1. 通过Pick/Omit实现】
 * 1. 找到所有指定类型的key
 * 2. 将对象映射{name: string, age: number, address: string} -> {name: name, age: never, address: address} 
 * 3. name | age | address -> name | address
 * 4. Pick挑选属性
 */
{
    /**
    * 判断两个类型是否相同（从类型的角度出发，2个类型如果一样，可以相互extends）
    * 1. 类型层级需一样
    * 2. 类型结构一样
    * 
    * [T] extends [K]： 防止类型分发
     */
    type IsEqualType<T, K, Success, Fail> =
        [T] extends [K]
        ? ([K] extends [T] ? Success : Fail)
        : Fail;

    type ExtractKeys<T extends object, U> = {
        [P in keyof T]: IsEqualType<T[P], U, P, never>
    }[keyof T]; // 获取非never的属性。（"name" | "address"）

    // 获取指定类型值的对象
    type PickKeysByValueType<T extends object, U> = Pick<T, ExtractKeys<T, U>>;
    // 排除指定类型值的对象
    type OmitKeysByValueType<T extends object, U> = Omit<T, ExtractKeys<T, U>>;
}

/**
 * 【2. 在1的基础上传参】
 */
{
    type IsEqualType<T, K, Success, Fail> = [T] extends [K] ? ([K] extends [T] ? Success : Fail) : Fail;

    type ExtractKeys<T extends object, U, O = ''> = {
        [P in keyof T]: IsEqualType<T[P], U, IsEqualType<O, 'omit', never, P>, IsEqualType<O, 'omit', P, never>>
    }[keyof T];

    type PickKeysByValueType<T extends object, U> = Pick<T, ExtractKeys<T, U>>;
    type OmitKeysByValueType<T extends object, U> = Pick<T, ExtractKeys<T, U, 'omit'>>;
}

/**
 * 【3. 模版字符串】
 */
/*
type PickKeysByValueType<T extends object, U> = {
    [K in keyof T as (T[K] extends U ? K : never)]: T[K]
};
type OmitKeysByValueType<T extends object, U> = {
    [K in keyof T as T[K] extends U ? never : K]: T[K]
};
*/

type isEqualType<T, K, Success, Fail> = [T] extends [K] ? [K] extends [T] ? Success : Fail : Fail;

type PickKeysByValueType<T extends object, U> = {
    [K in keyof T as isEqualType<T[K], U, K, never>]: T[K] // 模版字符串重映射，key为never的时候会被忽略
};

type OmitKeysByValueType<T extends object, U> = {
    [K in keyof T as isEqualType<T[K], U, never, K>]: T[K]
};



/************************ case ************************/
interface Person {
    name: string;
    age: number;
    address: string;
}

// 挑选string类型的属性
type R = PickKeysByValueType<Person, string>;
/**
    type R = {
        name: string;
        address: string;
    }
 */

// 过滤number类型的属性
type R2 = OmitKeysByValueType<Person, string>;
/**
     type R2 = {
        age: number;
    }
 */
export { };
