(function () {
    'use strict';

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
    /**
     * 内置类型实例
     */
    {
        class Person {
            constructor(name, age) {
                this.name = name;
                this.age = age;
            }
        }
        function createInstance(target, ...args) {
            return new target(...args);
        }
        createInstance(Person, 'cuimm', 10);
        createInstance(Person, 'cuimm', 10);
    }

})();
//# sourceMappingURL=bundle.js.map
