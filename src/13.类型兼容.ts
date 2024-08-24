/**
 * 类型兼容
 * 
 * 子类型可以赋予给父类型，从结构角度出发。ts比较的不是类型的名称，而是【结构上的属性和方法】。
 * 
 * 对于函数的兼容性而言：【参数个数要少，传递的可以是父类， 返回值可以返回儿子】【少参、传父、返子】
 * 
 * strictFunctionTypes：false。关闭双向协变
 */

{
    /**
     1)【基础类型的兼容性】
    obj2 = obj1 要满足：obj1的属性比obj2多【即：obj1要满足obj2要求的结构 
    */
    let obj: { toString(): string };
    let str: string = 'cuimm';
    obj = str;
}

{
    /**
     2)【接口的兼容性】
    obj2 = obj1 要满足：obj1的属性比obj2多【即：obj1要满足obj2要求的结构】
    */
    interface IAnimal {
        name: string;
        age: string;
    }
    interface IPerson {
        name: string;
        age: string;
        address: string;
    }
    let animal!: IAnimal;
    let person!: IPerson;
    animal = person; // 赋值
}

{
    /**
    3)【函数的兼容性】
        fn1 = fn2，要赋予的函数要满足：
            1. 参数：【f2参数个数只能少不能多】。 
            2. 返回值类型：【fn2必须是fn1的子类型】。【返回值必须要能正常访问fn1上的属性和方法】
    */
    let fn1 = (a: string, b: string): string | number => a;
    let fn2 = (a: string): number => {
        return 100;
    }
    fn1 = fn2; // 【赋值的时候，fn1的类型不变，值变化了】
}


class Parent {
    house() { }
}
class Child extends Parent {
    car() { }
}
class Grandson extends Child {
    money() { }
}

{
    /**
     * 【函数的逆变与协变】
     *      函数的【参数是逆变】，【返回值是协变】
     * 
     * 基于安全考虑
     * 
     * 在继承关系里，传递的函数：【传父】（参数是逆变的），【返子】（返回值是协变的）
     * 传递的参数要保证是安全的，
     */
    function fn(callback: (instance: Child) => Child) {
        let child = new Child();
        let ins: Child = callback(child);
        return ins;
    }

    // 为什么传参时可以写Parent，但是不能写Grandson？【内部调用的时候传递的是Child，在拿到这个实例的时候不能访问Child访问不到的属性】【结构要兼容】
    /*
    报错：类型“(instance: Grandson) => Child”的参数不能赋给类型“(instance: Child) => Child”的参数。
         参数“instance”和“instance” 的类型不兼容。
         类型 "Child" 中缺少属性 "money"，但类型 "Grandson" 中需要该属性。
    fn((instance: Grandson) => {
        return new Child();
    });
    */
    fn((instance: Parent): Grandson => {
        // return new Parent();
        return new Grandson();
    });

    /**
     * let t1: (instance: Child) => void：是t1的类型
     * t1 = (instance: Parent) => "" 是给t1赋值
     * 赋值的时候要满足t1的类型
     */
    let t1: (instance: Child) => void = (instance: Parent) => ""; // 函数的参数是逆变的
    let t2: (instance: Child) => Child = (instance: Child) => new Grandson(); // 函数的返回值是协变的
    // 传递的函数：（传父（参数是逆变的），返子（返回值是协变的））

    // 【对于函数的兼容性而言，参数个数要少，传递的可以是父类， 返回值可以返回儿子】

}

/**
 * 推导公式
 */
{
    function fn(callback: (instance: Child) => Child) {
        let child = new Child();
        let ins: Child = callback(child);
        return ins;
    }

    // 推导公式：
    type Arg<T> = (arg: T) => void;
    type Return<T> = (arg: any) => T;
    type ArgType = Arg<Parent> extends Arg<Child> ? true : false; // true. 逆变
    type ReturnType = Return<Grandson> extends Return<Child> ? true : false; // true. 协变
}

{

    interface MyArray<T> {
        concat(...args: T[]): T[]; // 不会对参数进行逆变检测【推荐写法】
        //   concat: (...args: T[]) => void; // 这种方式会检测逆变【这种方式不推荐】
    }

    let arr1!: MyArray<Parent>;
    let arr2!: MyArray<Child>;
    // arr1 -> (...args: Parent[]): Parent[];
    // arr2 -> (...args: Child[]): Child[];

    arr1 = arr2;

    // 对于类而言，有子类可以重写父类
    // strictFunctionTypes 开启后就变成了双向协变，参数和返回值都是协变的

}

{
    // 1）接口。ts 比较的是结构，结构一致即可
    interface TT<T> { }

    let o1!: TT<string>;
    let o2!: TT<number>;
    o2 = o1;

    // 2）枚举不具备兼容性问题 （枚举会生成一个对象）
    enum E1 { }
    enum E2 { }

    let e1!: E1;
    let e2!: E2;
    console.log(E1);
    // e2 = e1;

    // 3）类的兼容性【比的是属性和方法】【静态成员和构造函数不在比较的范围内】
    class A {
        static age: number;
        public name!: string;
        // protected name!: string; // name如果是受保护或者私有的，则不能兼容
    }
    class B {
        public name!: string;
        public age!: string;
    }
    // b只能访问name属性
    let b: A = new B(); // 比较的是属性，不符合就不兼容. 如果类中存在私有属性或者受保护的属性，则不能兼容


    // ts 比较类型结构的时候比较的是【属性和方法】
    // 如果属性和方法都满足则兼容，有一些比较特殊

    // 基础类型和对象类型的兼容，接口的兼容， 泛型的兼容，枚举的兼容， 类的兼容


}

/**
    在其他语言中存在【标称类型】（根据名称来区分类型）
    标称类型：TS中通过【交叉】类型实现标称类型
    类型分为两种：结构化类型(structural type system) 、标称类型(nominal type system)
 */
/**
 * 下面示例中，虽然 BTC，USDT 都是 number 类型，但还是想要用不同的类型表示，且不能互换，数据的值本身没什么区别，安上不同名字就是不同类型。
 * 也就是说，标称类型系统中，两个变量是否类型兼容（可以交换赋值）取决于这两个变量显式声明的类型名字是否相同。
 */
{
    // 无法区分BST和UDST
    type BST = number;
    type USTD = number;
    let bst: BST = 1000;
    let ustd: USTD = 2000;

    function getVal(val: number) {
        return val;
    }
    getVal(bst);
    getVal(ustd);
}

// 标称类型
{
    type Normalize<T, K extends string> = T & { __flag: K }; // 使用交叉类型产生一个新的类型
    type BST = Normalize<number, 'bst'>; // number & { __flag: "bst"; }
    type USDT = Normalize<number, 'usdt'>; // number & { __flag: "usdt"; 
    let bst: BST = 1000 as BST;
    let ustd: USDT = 2000 as USDT;

    function getVal(val: BST) {
        return val;
    }

    getVal(bst);
    // getVal(ustd); // 报错：类型“USDT”的参数不能赋给类型“BST”的参数
}


export { };