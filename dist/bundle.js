(function () {
    'use strict';

    /**
     * 函数
     *
     * 函数中的类型 1）函数的声明方式 2） 函数的参数  3） 函数的返回值
     * 1. function关键字定义函数
     * 2. 表达式（可以描述变量的类型）
     *
     * 1. function关键字来声明的函数：可以提升到当前作用域顶部、不能标注函数类型。
     * 2. 函数表达式来声明的函数：必须赋予满足定义的类型。
     *
     */
    // function关键字定义函数
    // 函数的this。TS中的this需手动指定，默认是函数中的第一个参数。
    // TS中的`typeof`：来获取变量的类型。
    // `keyof`：获取对象中的key的类型，作为联合类型
    let person = {
        name: 'cuimm',
        age: 20
    };
    function getValue(key) {
        return this[key];
    }
    getValue.call(person, 'name'); // 调用
    function toArray(value) {
        if (typeof value === 'string') {
            return value.split('');
        }
        else {
            return value.toString().split('').map(Number);
        }
    }
    toArray(123);
    toArray('123');

})();
//# sourceMappingURL=bundle.js.map
