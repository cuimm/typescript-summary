(function () {
    'use strict';

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
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }
    class Animal {
        constructor(name, age, sound) {
            this.name = name;
            this.age = age;
            this.sound = sound;
        }
    }
    // 2. 使用范型
    {
        function createIntance(target, name, age) {
            return new target(name, age);
        }
        const person = createIntance(Person, 'cuimm', 18);
        console.log(person);
        // const animal = createIntance(Animal, 'cat', 10);
    }
    // 3. 优化：function + 使用范型 + 剩余/展开运算符
    {
        function createIntance(target, ...args) {
            return new target(args);
        }
        createIntance(Person, 'cuimm', 18); // person类型：Person
        createIntance(Animal, 'cat', 10, '喵'); // animal类型：Animal
    }
    // 4. 优化：函数表达式 + 范型 + 剩余/展开运算符
    {
        const createInstance = (Target, ...args) => {
            return new Target(...args);
        };
        createInstance(Person, 'cuimm', 20);
        createInstance(Animal, 'cat', 10, '喵');
    }
    /************ 3. 交换元组的两个变量 ************/
    {
        function swap(tuple) {
            return [tuple[1], tuple[0]];
        }
        swap([100, 'abc']); // result's type is: [string, number]
        swap([100, true]); // result's type is: [boolean, number]
    }
    // 使用函数表达式定义
    {
        const swap = tuple => {
            return [tuple[1], tuple[0]];
        };
        swap([100, 'abc']); // result's type is: [string, number]
        swap([100, true]); // result's type is: [boolean, number]
    }
    /************ 4. 数组循环 ************/
    {
        const forEach = (array, callback) => {
            for (let index = 0; index < array.length; index++) {
                callback(array[index], index);
            }
        };
        forEach([1, 2, 3, 'a', 'b', 'c', true], (item, index) => {
            console.log(item, index);
        });
    }
    {
        const forEach = (array, callback) => {
            for (let index = 0; index < array.length; index++) {
                callback(array[index], index); // TS在推导的时候并没有真正执行。范型使用的时候传递参数，可以直接推导，但是内部调用的时候没有确定类型。
            }
        };
        forEach([1, 2, 3, 'a', 'b', 'c', true,], (item, index) => {
            console.log(item, index);
        });
    }
    /************ 5. 范型约束 ************/
    // 1）传参约束
    {
        function handle2(val) {
            return val.length;
        }
        handle2('abc');
        handle2([]);
    }
    // 4）登陆
    {
        // 角色
        let Role;
        (function (Role) {
            Role[Role["ADMIN"] = 0] = "ADMIN";
            Role[Role["SAMPLE"] = 1] = "SAMPLE";
        })(Role || (Role = {}));
    }
    // 5）获取数组最大值
    {
        class MyArray {
            constructor() {
                this.array = [];
            }
            set(val) {
                this.array.push(val);
            }
            max() {
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
        const myArray = new MyArray();
        myArray.set(100);
        myArray.set(300);
        myArray.set(200);
        const max = myArray.max();
        console.log(max);
    }

})();
//# sourceMappingURL=bundle.js.map
