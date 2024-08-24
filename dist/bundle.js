(function () {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol */


    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    /**
     * 【类型装饰器】
     *
     * 装饰器本身就是一个【函数】，只能在【类】中使用。可以使用在【类本身、类的成员】上。
     *
     * 装饰器的分类：
     *  类的装饰器
     *  方法装饰器
     *  属性装饰器
     *  访问装饰器
     *  参数装饰器
     */
    /**
     * 【1. 类的装饰器】
     *  TS默认不支持类的装饰器，需配置experimentalDecorators:true。
     *  1）给类进行扩展
     *  2）返回子类去重写父类
     *
     * 【一般不会通过装饰器去扩展累的属性和方法，因为扩展后原来没有定义的方法无法直接访问到，需要通过interface、namespace来进行扩展】
     */
    {
        /**
         * Person类的修饰符【给类扩展：方法/属性】
         * @param target 类本身
         */
        const AnimalClassDecorator = (target) => {
            target.gender = 'woman'; // 静态属性
            target.getGender = function () {
                return this.gender; // 静态方法。这里的this是类本身
            };
            // 添加实例属性和方法
            Object.assign(target.prototype, {
                age: 20,
                run() {
                    console.log('running...');
                },
            });
        };
        let Person = class Person {
        };
        Person = __decorate([
            AnimalClassDecorator
        ], Person);
        const person = new Person();
        console.log('age: ', person.age); // interface中没有扩展age属性，此处需要类型断言
        console.log('run: ', person.run()); // interface扩展了run属性，此处可以直接点出来，无需类型断言
        console.log('getGender: ', Person.getGender());
        console.log('person', person);
    }
    {
        /**
         * 返回子类去重写父类
         * @param target 类本身
         * @returns
         */
        function OverrideAnimalDecorator(target) {
            return class extends target {
                eat() {
                    console.log('override eat...');
                }
            };
        }
        // 返回子类去重写父类
        let Animal = class Animal {
            eat() {
                console.log('animal eat...');
            }
        };
        Animal = __decorate([
            OverrideAnimalDecorator
        ], Animal);
        const animal = new Animal();
        console.log('animal: ', animal.eat());
    }
    console.log('----------');
    /**
     * 【2. 方法装饰器】
     * 返回类型：MethodDecorator
     */
    {
        // 方法的装饰器：是否可被枚举【返回类型：MethodDecorator】
        // function Enum(isEnum: boolean): (target: Animal, propertyKey: 'eat' | 'run', descriptor: TypedPropertyDescriptor<() => void>) => void | TypedPropertyDescriptor<() => void> {
        function Enum(isEnum) {
            return function (target, propertyKey, descriptor) {
                // descriptor.configurable // 属性是否可以删除
                // descriptor.writable // 是否可被重写
                // descriptor.value // 当前函数的值
                descriptor.enumerable = isEnum; // 是否可被重写
                // 【切片编程】
                const originaVal = descriptor.value;
                descriptor.value = function () {
                    console.log('prev call...');
                    return originaVal.call(this, ...arguments); // 调用原有方法
                };
            };
        }
        class Animal {
            eat() {
                console.log('eat...');
            }
            run() {
                console.log('running...');
            }
        }
        __decorate([
            Enum(true)
        ], Animal.prototype, "eat", null);
        __decorate([
            Enum(false)
        ], Animal.prototype, "run", null);
        const animal = new Animal();
        console.log('animal: ', animal);
        animal.eat();
    }
    console.log('**********************');
    /**
     * 【3. 属性装饰器】
     * 不同的ES版本，会有不同的解析。
     */
    {
        function Upper(isUpper) {
            return function (target, propertyKey) {
                /**
                 * 如果在ES2015中设置原型属性，后续赋值的时候会触发原型属性。
                 * 如果在ESNext中，则无法触发。
                 */
                let val;
                Object.defineProperty(target, propertyKey, {
                    get() {
                        return isUpper ? val.toUpperCase() : val;
                    },
                    set(newVal) {
                        val = newVal;
                    }
                });
            };
        }
        class Animal {
            constructor() {
                this.name = 'animal';
                this.gender = 'gender';
            }
        }
        __decorate([
            Upper(true)
        ], Animal.prototype, "name", void 0);
        __decorate([
            Upper(false)
        ], Animal.prototype, "gender", void 0);
        const animal = new Animal();
        console.log(animal.name); // ANIMAL
        console.log(animal.gender); // gender
    }
    console.log('------------------------');
    /**
     * 【4. 属性装饰器】
     */
    {
        function ValToUpper(target, propertyKey, descriptor) {
            // 拦截set
            let originalSet = descriptor.set;
            descriptor.set = function (newVal) {
                console.log(this); // Animal
                return originalSet.call(this, newVal.toUpperCase());
            };
            // 拦截get
            let originalGet = descriptor.get;
            descriptor.get = function () {
                return '$' + originalGet.call(this) + '$';
            };
        }
        class Animal {
            get name() {
                return this._name;
            }
            set name(newVal) {
                this._name = newVal;
            }
        }
        __decorate([
            ValToUpper
        ], Animal.prototype, "name", null);
        const animal = new Animal();
        animal.name = 'cuimm';
        console.log(animal.name);
    }

})();
//# sourceMappingURL=bundle.js.map
