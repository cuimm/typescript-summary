/**
 * 对象的交、差、并、补
 */

type A = {
    name: string;
    age: number;
    address: string;
};

type B = {
    name: string;
    male: boolean;
    address: number;
};
type Computed<T> = { [K in keyof T]: T[K] };


// ********* 【1. 交集】 *********
export type ObjectInter<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U>>;

type R1 = ObjectInter<A, B>; // { name: string; address: string; }

// ********* 【2. 差集】 *********
export type ObjectDiff<T extends object, U extends object> = Pick<T, Exclude<keyof T, keyof U>>;

type R2 = ObjectDiff<A, B>; // A-B:  { age: number }
type R21 = ObjectDiff<B, A>; // B-A:  { male: boolean }

// ********* 【3. 补集】 ********* 补集就是差集，但是需要有父子关系
{
    interface A2 {
        name: string;
        age: number;
        address: string;
    };
    interface B2 {
        name: string;
        age: number;
    };

    // 补集
    type ObjectCom<T extends U, U extends object> = Pick<T, Exclude<keyof T, keyof U>>;

    type R3 = ObjectCom<A2, B2>; // { address: string }
}

// ********* 【4. 重写】 *********【以后面的类型为准，再加上比现在多的类型】
{
    interface A4 {
        fullName: string;
        age: number;
        address: number;
    };
    interface B4 {
        name: string;
        age: number;
        address: string;
        phone: string,
    };

    // 重写1
    type ObjectMixin<T extends object, U extends object> = Omit<T, keyof U> & U;
    // 重写2
    type ObjectInter<T, U> = Pick<T, Extract<keyof T, keyof U>>;
    type ObjectDiffC<T, U> = Pick<T, Exclude<keyof T, keyof U>>;
    type ObjectMixin2<T extends object, U extends object> = ObjectInter<T, U> & ObjectDiff<U, T> & ObjectDiff<T, U>;

    type R4 = Computed<ObjectMixin<A4, B4>>;
    type R42 = Computed<ObjectMixin2<A4, B4>>;
    /**
     type R4 = {
        fullName: string;
        name: string;
        age: number;
        address: string;
        phone: string;
    }
     */
}
export { };