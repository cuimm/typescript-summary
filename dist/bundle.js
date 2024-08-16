(function () {
    'use strict';

    /**
     * 类的构成：
     *      构造函数
     *      属性（实例属性、原型属性、静态属性）
     *      方法（实例方法、原型方法、静态方法）
     *      属性访问器
     *
     * 类的修饰符：
     *      public：公开属性。父类和子类都可以访问。
     *      protected：保护属性。类本身、子类内部可以访问，外部无法访问。
     *      private：私有属性。只能在类中访问。
     */
    var _Animal_privateProp;
    // 2. 简化写法
    {
        /*** 简化写法 ***/
        class Circle2 {
            // 构建函数内实例属性如果添加了修饰符，就不需要再为变量赋值了。
            // 没有修饰符，默认是public
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }
        }
        const c = new Circle2(1, 2);
        console.log(c);
        /*
        // Circle2编译后的代码：
        class Circle2 {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }
        }
        */
    }
    // 3. 子类继承
    {
        class Animal {
            constructor(name, age) {
                this.name = name;
                this.age = age;
            }
        }
        class Tom extends Animal {
            constructor(name, age) {
                super(name, age);
            }
        }
        const tom = new Tom('Tom猫', 12);
        // tom.age // 子类Tom访问age报错：属性“age”为私有属性，只能在类“Animal”中访问
        console.log(tom['age']); // 使用此方式可以访问私有属性，绕过TS校验
    }
    // 4. 私有属性（不建议用，私有属性会被编译成WeakMap，语法版本较高。）
    {
        class Animal {
            constructor(name, age) {
                this.name = name;
                this.age = age;
                _Animal_privateProp.set(this, '私有属性'); // 仅在父类中可以访问
            }
        }
        _Animal_privateProp = new WeakMap();
        class Cat extends Animal {
            constructor(name, age) {
                super(name, age);
            }
        }
        new Cat('Tom猫', 10);
        // cat['#privateProp'] // 子类访问父类的私有属性报错：类型“Cat”上不存在属性“#privateProp”
        // 编译后代码：
        /*
        class Animal {
            constructor(name, age) {
                this.name = name;
                this.age = age;
                _Animal_privateProp.set(this, '私有属性'); // 仅在父类中可以访问
            }
        }
        _Animal_privateProp = new WeakMap();
        class Cat extends Animal {
            constructor(name, age) {
                super(name, age);
            }
        }
        */
    }
    // 5. readonly只读属性（初始化后不可以再修改）
    {
        class Animal {
            // 类的构建函数属于初始化操作，可以给readonly的数据赋值
            constructor(name, age) {
                this.age = age;
                this.name = 'animal';
                this.name = name;
                this.name = 'animal2';
                this.name = 'animal3';
                this.age = age;
            }
        }
        const animal = new Animal('动物', 10);
        console.log(animal);
        // animal.name = '动物' // 给只读属性赋值报错：无法为“name”赋值，因为它是只读属性。
    }
    // 6. 属性访问器（最终会被编译成Object.defineProperty）
    {
        class Animal {
            constructor(name, age) {
                this.name = name;
                this.age = age;
                this._sound = '';
            }
            get sound() {
                return this._sound;
            }
            set sound(val) {
                this._sound = val;
            }
        }
        class Cat extends Animal {
            constructor(name, age) {
                super(name, age);
            }
        }
        const cat = new Cat('Tom', 10);
        cat.sound = '喵～';
        console.log(cat);
    }
    // 7. 实例方法/静态方法
    {
        class Animal {
            constructor(name, age) {
                this.name = name;
                this.age = age;
                this._sound = '';
            }
            get sound() {
                return this._sound;
            }
            set sound(val) {
                this._sound = val;
            }
            eat(foot) {
                console.log('正在吃' + foot);
            }
            static getAddress() {
                return this.address;
            }
        }
        Animal.address = 'China'; // 静态属性
        class Cat extends Animal {
            constructor(name, age) {
                super(name, age);
            }
            // 子类重写父类的实例方法。子类重写父类实例方法时，需保证兼容父类的类型。（返回的void代表不关心返回类型）
            eat(foot) {
                console.log(`${this.name}正在开心的吃${foot}`);
            }
            static getAddress() {
                return super.getAddress(); // 调用父类的静态方法【super在原型方法中指向实例、在静态方法和构造方法中指向父类】
            }
        }
        new Cat('TOM', 10);
        console.log(Cat.getAddress()); // 调用静态方法
    }
    // 8. 单例模式
    {
        class Singleton {
            constructor() {
            }
            static getInstance() {
                return this.instance;
            }
        }
        Singleton.instance = new Singleton();
        const s1 = Singleton.getInstance();
        const s2 = Singleton.getInstance();
        console.log('单例模式: ', s1 === s2); // true   
    }
    // 9. 抽象类
    /**
     * 1. 抽象类不能new
     * 2. 抽象类可以创建抽象属性和方法，让子类实现。但是静态方法、静态属性不可以。
     * 3. 抽象类中可以有具有的实现。
     */
    {
        class Animal {
            // 抽象类中可以有具体的实现
            drink() {
                console.log('drink');
            }
        }
        Animal.habitat = '地球';
        class Cat extends Animal {
            constructor(name, age, address) {
                super();
                this.name = name;
                this.age = age;
                this.address = ''; // 抽象属性
                // play() {} // 子类如果按照实例方法实现会报错：类“Animal”将“play”定义为实例成员属性，但扩展类“Cat”将其定义为实例成员函数。
                this.play = () => { }; // 按照实例属性方式直接赋值，也可以在构造函数中赋值
                this.address = address;
            }
            eat() {
                throw new Error("Method not implemented.");
            }
            drink() {
                console.log('drink~~~');
            }
        }
        console.log(Cat.habitat);
        console.log(new Cat('Tom', 10, 'SD'));
    }

})();
//# sourceMappingURL=bundle.js.map
