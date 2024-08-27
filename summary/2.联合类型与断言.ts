/**
 * 联合类型
 */
let strOrNumber: string | number;

// 联合类型，默认没有赋值的时候，可以调用公共方法。为了安全，只能访问公共属性。
// strOrNumber.toString(); // 直接使用报错：在赋值前使用了变量“strOrNumber”。ts(2454)
strOrNumber!.toString(); // 非空断言。表示strOrNumber肯定不为空。

strOrNumber = 'string';
strOrNumber.toString();

strOrNumber = 100;
strOrNumber.toFixed(); // 赋值后会推断类型。


// 可以基于联合类型来扩展额外的类型。

// 字面量类型。
type Direction = 'up' | 'down' | 'left' | 'right'; // 使用type扩展一个新的类型Direction
let direction: Direction = 'down'; // 给Direction类型的变量赋值

// 对象的联合类型。可以利用联合类型实现属性之间的互斥（可辨识联合类型）
type Women =
    | {
        wealthy: true,
        waste: string,
    } | {
        wealthy: false,
        norality: string,
    };

let richWomen: Women = { wealthy: true, waste: 'shopping' };
let poorWomen: Women = { wealthy: false, norality: '勤俭节约' };



/*
断言
 */
let ele: HTMLElement | null = document.getElementById('app');
// ele.style.color = 'red'; // 报错：“ele”可能为 “null”
ele!.style.color = 'red'; // !非空断言。TS语法

// ele?.style.color = 'red'; // JS语法。可选链操作赋
// console.log(false ?? 100); // JS语法。空值合并操作符：除了null和undefined，都会返回左边的值


// as断言。可以强制将类型断言成已经存在的某个类型。
(ele as HTMLElement).style.color = 'green'; // 将ele断言成HTMLElement。
(<HTMLElement>ele).style.color = 'green'; // 将ele断言成HTMLElement。不推荐写法。会和JSX语法冲突。


// 双重断言。
// 可以把一个值断言成any，再断言成某个类型。
let str: string | number;
str! as any as boolean; // 先将str断言成any，再断言成boolean


export { };
