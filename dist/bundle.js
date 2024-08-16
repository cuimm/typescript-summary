(function () {
    'use strict';

    /**
     * 接口 interface
     *
     * 接口不能有具体的实现，可以用于描述函数、对象、类、混合类型。
     *
     */
    const getFullName = ({ firstName, lastName }) => {
        return firstName + lastName;
    };
    console.log(getFullName({ firstName: 'cui', lastName: 'mm' }));
    // 如下使用let定义click方法时，报错：由于“click'”不具有返回类型批注并且在它的一个返回表达式中得到直接或间接引用，因此它隐式具有返回类型 "any"。ts(7023)
    // let click = () => {
    //     return click.count++;
    // }
    // click.count = 0;
    // => 使用const定义click方法
    const click = () => {
        return click.count++;
    };
    click.count = 0;
    console.log(click());

})();
//# sourceMappingURL=bundle.js.map
