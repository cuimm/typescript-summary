/**
 * extends
 * 
 * 多种用法
 * 1. 扩展
 */

/************** 1. 扩展 *******************/
{
    interface Animal {
        name: string;
        age: number;
    }

    // Dog基于Animal扩展
    interface Dog extends Animal {
        run: string
    }

    const dog: Dog = { name: 'dog', age: 10, run: '跑' };
}

/************** 2. 继承 *******************/
{
    class Animal {
        constructor(public name: string, public age: number) { }
    }
    class Dog extends Animal {
        constructor(public name: string, public age: number) {
            super(name, age);
        }
    }
}

/************** 3. 范型约束 *******************/
{
    function getVal<T extends string | number>(val: T): T {
        return val;
    }
    const s1 = getVal(100); // 100
    const s2 = getVal('abc'); // abc
}

/************** 4. 条件类型 *******************/
{
    /**
     * A extends B：指类型A可以分配给类型B。【针对对象，A的属性 >= B的属性】
     */

    // 用来判断一个类型是不是可以分配给另一个类型
    type R1 = { a: number }
    type R11 = { a: 100, b: 'abc' } extends R1 ? true : false; // true

    type R2 = 1 | 2 | 3;
    type R21 = 1 | 2 extends R2 ? true : false; // true
    type R22 = 1 | 2 | 3 | 4 extends R2 ? true : false; // false
}

