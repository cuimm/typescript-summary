/**
 * 条件分发 和 内置类型
 * 
 * 内置类型：
 *      Extract：交集：两个类型公共的部分
 *      Exclude：排除：从T中排除U的部分
 *      NonNullable：非空
 *      ReturnType：获取函数返回值
 *      Parameters：获取函数参数列表
 *      ConstructorParameters：获取类的构造函数的参数
 *      InstanceType：获取类的实例类型
 */

/** 
 * 1. 条件类型的分发 
 * 我们可以通过 A extends B 来判断，A extends B 返回true的时候，A就是B的子类型
 * 
 * 条件分发要满足的条件：（分发是默认开启的）
 *  1. A类型是通过范型传入的。
 *  2. A类型如果是联合类型，会进行分发。
 *  3. 范型参数A必须是完全裸露的，才具备分发的能力。【A & {} 这种交叉类型会返回一个新的类型，这种就不是裸露的类型】
 * 
 * 什么是裸类型？只有自己一个类型，没有和其他类型发生关系。
 * 什么是分发：将传入联合类型先单个依次比较，比较完之后再进行联合。
 * 不想分发？将传入的联合类型整体进行运算后，再进行比较。（只要让A不是裸类型，就可以禁用分发）
 * 
 * 【我们在进行父子关系的比较时，默认情况下应该关闭分发。】
*/
{
    interface IBird {
        name: '鸟';
    }
    interface ISky {
        name: '天';
    }
    interface IFish {
        ame: '雨';
    }
    interface IWater {
        name: '水';
    }

    // 1）条件类型
    type Conditional = IFish | IBird extends IFish ? IWater : ISky; // 返回：ISky。此情况没有产生分发

    // 2）条件类型分发
    type Conditiona2<T> = T extends IFish ? IWater : ISky;

    type R1 = Conditiona2<IFish>; // 返回：IWater【非联合类型】
    type R2 = Conditiona2<IBird>; // 返回：ISky【非联合类型】
    type R3 = Conditiona2<IFish | IBird>; // 返回：ISky | IWater【满足上述3个条件，条件类型会进行分发】(Conditiona2<IFish>返回IWater，Conditiona2<IBird>返回ISky，分发后结果为ISky | IWater)
    type R4 = Conditiona2<(IFish & {} | IBird) & {}>;

    // 3）条件类型分发-2
    type Conditiona3<T, U> = T extends U ? true : false;

    type R11 = Conditiona3<1 | 2, 1 | 3 | 5>; // 返回：boolean。T满足范型传入、联合类型、裸露类型的条件，进行条件分发：1 extends 1 ｜ 3 ｜ 5 => true，2 extends 1 ｜ 3 ｜ 5 => false，true ｜ false => boolean
    type R12 = Conditiona3<1 | 2, 1 | 2 | 3>; // 返回：true

    // 4）禁用分发【某些情况下需要关闭分发能力，因为分发会造成判断不准确】
    // => A extends B ：只要让A不是裸类型，就会丧失分发机制
    type Conditiona4<T, U> = T & {} extends U ? true : false;

    type R21 = Conditiona4<1 | 2, 1>; // 返回：false【因为T与{}相交之后不再是裸类型，禁用了分发机制】

    // 优化-1【使用交叉类型产生一个新的非裸类型】
    type NoDistribute<T> = T & {};
    type Conditiona5<T, U> = NoDistribute<T> extends U ? true : false;

    type R22 = Conditiona5<1 | 2, 1>; // 返回：false

    // 优化-2【产生一个新的非裸的元组类型】
    type Conditiona6<T, U> = [T] extends [U] ? true : false;
    type R23 = Conditiona6<1 | 2, 1>; // 返回：false

    // 条件判断的一些注意事项
    type IsNever<T> = T extends never ? true : false;
    // => never 直接比较的时候，无法返回正确的结果。
    type R31 = IsNever<never>; // 返回：never。

    // 解决never问题-1【元组】
    type IsNever2<T> = [T] extends [never] ? true : false;
    type R33 = IsNever2<never>; // 返回：true。
    // 解决never问题-2【交叉】
    type IsNever3<T> = NoDistribute<T> extends never ? true : false;
    type R34 = IsNever3<never>; // 返回：true。
}

// 内置类型
// TS本身实现了一些常见的内置类型。（安装的typescript模块内包含了很多内置类型）
{
    // 1. Extract.【交集：两个类型公共的部分】
    // type Extract<T, U> = T extends U ? T : never;
    type R = Extract<1 | 2 | 3, 1 | 2 | 4>; // 

    // 2. Exclude. 【排除：从T中排除U的部分】
    // type Exclude<T, U> = T extends U ? never : T;
    type R2 = Exclude<1 | 2 | 3 | 4 | 5, 2 | 4>;

    // 3. NonNullable. 【非空】
    // type NonNullable<T> = T extends null | undefined ? never : T; 
    // type NonNullable<T> = T & {};
    // type R31 = null & {}; // never
    // type R32 = undefined & {}; // never
    type R3 = NonNullable<1 | 2 | null | undefined>;
}

/**
 * 【infer】
 * infer 可以在条件类型中“提取”类型的某一部分，在使用的时候想获取什么类型就将infer写在什么“地方”，然后再加一个变量就可以自动的来推导。
 * 类型推导都是基于“位置”的
 */
{
    function getObj(name: string, age: number) {
        return {
            name: name,
            age: age
        };
    }

    // 1. ReturnType. 【获取函数返回值】
    // type ReturnType<T extends (...agrs: any) => any> = T extends (...args: any) => infer R ? R : any; 
    type R1 = ReturnType<typeof getObj>; // 返回：{ name: string; age: number; }
    
    // 2. Parameters. 【获取函数参数列表】
    // type Parameters<T extends (...args: any) => any> = T extends (...agrs: infer R) => any ? R : never;
    type R2 = Parameters<typeof getObj>; // 返回：[name: string, age: number]


    // 3. ConstructorParameters. 【获取构造函数的参数】
    abstract class Person {
        constructor(public name: string, public age: number) { }
    }
    // type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer R) => any ? R : never;
    type R3 = ConstructorParameters<typeof Person>;

    // 4. InstanceType. 【获取类的实例类型】
    // type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : never;
    type R4 = InstanceType<typeof Person>;


}


/**
 * 实例1：使用【infer】交换元组
 */
{
    type Swap<T> = T extends [infer R1, infer R2] ? [R2, R1] : never;
    type R = Swap<['cuimm', 10]>; // type R = [10, "cuimm"]
}

/**
 * 实例2：使用【infer】头尾交互
 */
{
    type SwapHeadTail<T> = T extends [infer R1, ...infer K, infer R2] ? [R2, ...K, R1] : never;
    type R = SwapHeadTail<[1, 2, 3, 4]>; // type R = [4, 2, 3, 1]
}

/**
 * 实例3：使用【infer】【递归】获取Promise返回值。
 */
{
    type PromiseReturnValue<T> =
        T extends Promise<infer P>
        ? PromiseReturnValue<P>
        : T;
    type R = PromiseReturnValue<Promise<Promise<Promise<100>>>>; // type R = 100
}

/**
 * 实例4：使用【infer】将元组转化成联合类型
 * [number, string, boolean] => number | string | boolean
 */
{
    // 1. 通过索引转化
    type TupleToArray = [number, string, boolean][number]; // type TupleToArray = string | number | boolean

    // 2. 通过【infer】转换
    type TupleToUnion<T> = T extends Array<infer R> ? R : never;
    type R = TupleToUnion<[number, string, boolean]>; // type R = string | number | boolean

}


/**
 * 内置类型实例
 */
{
    class Person {
        constructor(public name: string, public age: number) { }
    }

    function createInstance<T extends new (...args: any) => InstanceType<T>>(target: T, ...args: ConstructorParameters<T>): InstanceType<T> {
        return new target(...args);
    }

    const person1 = createInstance(Person, 'cuimm', 10);
    const person2 = createInstance<typeof Person>(Person, 'cuimm', 10);
}
export { };
