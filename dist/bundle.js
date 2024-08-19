(function () {
    'use strict';

    /**
     * 内置类型
     *    基于循环的映射类型：
     *      Partial<T>：循环遍历T【最外层】的属性，将属性变成可选属性。
     *      Required<T>：循环遍历【最外层】的属性，将属性变成必填属性。
     *      Readonly<T>：只读属性。将对象最外层属性变成只读属性
     *      Mutate：可选属性。将对象最外层属性变成可选属性
     *
     *      Pick<T, k>：从已有类型中挑选所需属性
     *      Omit<T, k>：从已有类型中排除指定属性
     *      Record<T, K>：主要用来定义对象，接收2个范型，【对象键的类型和对象值的类型】
     */
    /**
     * 内置类型【Partial】
     *
     * Partial<T>：循环便利T【最外层】的属性，将属性变成可选属性。
     */
    /***
     * 示例【mixin】
     *
     * 2个对象合并
     */
    {
        /* 错误定义
        function mixin<T, K>(a: T, b: K): T & K {
            return { ...a, ...b };
        }
        type name = (typeof res)['name']; // type name = never
        */
        function mixin(a, b) {
            return Object.assign(Object.assign({}, a), b);
        }
        mixin({ name: 'cuimm', age: 10, address: 'sd' }, { name: 100, gender: 'man' });
        /**
         type resType2 = {
            age: number;
            address: string;
            name: number;
            gender: string;
        }
         */
    }

})();
//# sourceMappingURL=bundle.js.map
