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
    /***** 给类通过装饰器进行扩展时，扩展后的属性无法提示，需要类型断言。 *****/
    // 解决：通过interface对类类型扩展。
    interface Person {
        run(): void
    }

    /**
     * Person类的修饰符【给类扩展：方法/属性】
     * @param target 类本身
     */
    const AnimalClassDecorator = <T extends new (...arg: any) => any>(target: T) => {
        (target as any).gender = 'woman'; // 静态属性
        (target as any).getGender = function () {
            return this.gender; // 静态方法。这里的this是类本身
        }
        // 添加实例属性和方法
        Object.assign(target.prototype, {
            age: 20,
            run() {
                console.log('running...');
            },
        });
    };

    @AnimalClassDecorator
    class Person { }
    const person = new Person();

    console.log('age: ', (person as any).age); // interface中没有扩展age属性，此处需要类型断言
    console.log('run: ', person.run()); // interface扩展了run属性，此处可以直接点出来，无需类型断言
    console.log('getGender: ', (Person as any).getGender());
    console.log('person', person);
}
{
    /**
     * 返回子类去重写父类
     * @param target 类本身
     * @returns 
     */
    function OverrideAnimalDecorator(target: typeof Animal): void | typeof Animal {
        return class extends target {
            eat() {
                console.log('override eat...');
            }
        }
    }

    // 返回子类去重写父类
    @OverrideAnimalDecorator
    class Animal {
        eat() {
            console.log('animal eat...');
        }
    }
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
    function Enum(isEnum: boolean): MethodDecorator {
        return function (target: object, propertyKey: string | symbol, descriptor: any) {
            // descriptor.configurable // 属性是否可以删除
            // descriptor.writable // 是否可被重写
            // descriptor.value // 当前函数的值
            descriptor.enumerable = isEnum; // 是否可被重写

            // 【切片编程】
            const originaVal = descriptor.value;
            descriptor.value = function () {
                console.log('prev call...');
                return originaVal.call(this, ...arguments); // 调用原有方法
            }
        }
    }
    class Animal {
        @Enum(true)
        eat() {
            console.log('eat...');
        }
        @Enum(false)
        run() {
            console.log('running...');
        }
    }

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
    function Upper(isUpper: boolean): PropertyDecorator {
        return function (target, propertyKey) {
            /**
             * 如果在ES2015中设置原型属性，后续赋值的时候会触发原型属性。
             * 如果在ESNext中，则无法触发。
             */
            let val: any;
            Object.defineProperty(target, propertyKey, {
                get() {
                    return isUpper ? val.toUpperCase() : val;
                },
                set(newVal) {
                    val = newVal;
                }
            });

        }
    }
    class Animal {
        @Upper(true)
        public name: string = 'animal';
        @Upper(false)
        public gender: string = 'gender';
    }

    const animal = new Animal();
    console.log(animal.name); // ANIMAL
    console.log(animal.gender); // gender
}

console.log('------------------------');


/**
 * 【4. 属性装饰器】
 */
{
    function ValToUpper(target: any, propertyKey: string, descriptor: any) {        
        // 拦截set
        let originalSet = descriptor.set;
        descriptor.set = function(newVal: string) {
            console.log(this); // Animal
            return originalSet.call(this, newVal.toUpperCase());
        }

        // 拦截get
        let originalGet = descriptor.get;
        descriptor.get = function() {
            return '$' + originalGet.call(this) + '$';
        }
    }

    class Animal {
        private _name!: string;

        @ValToUpper
        get name() {
            return this._name;
        }
        set name(newVal) {
            this._name = newVal;
        }
    }

    const animal = new Animal();
    animal.name = 'cuimm';
    console.log(animal.name);
}

export { };