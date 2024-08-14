/* 
ts中，:后面的是类型，=后面的是值

1).ts的目的？从安全角度来考虑使用 (考虑在赋予结果的时候，是否会发生错误)  推荐vscode插件：error lens
2).ts是用来检测类型的，只是提示作用，不是在运行的时候发生的 (运行的时候和ts无关，“代码没有被执行”)
3).编译ts之后，类型就消失了，不存在类型了。最终生产环境下，可以增添.d.ts 来对js文件增加类型声明

基础类型：
    string number boolean undefined null void array object tuple symbol bigint never any
*/

/* 
基础类型
    在使用基本类型的时候，需要采用小写类型来标识。大写的用来描述的是实例类型。
*/
let name: string = 'cuimm';
let age: number = 20;
let flga: boolean = true;

const title: String = 'title'; // 在赋值的时候，子集可以赋给父级
const title2: String = new String('title'); // 类的类型，用来描述实例
const title3: string = 'title';

// 数组类型
let arr: number[] = [1, 2, 3];
let arr2: string[] = ['1', '2', '3'];
let arr3: (number | string)[] = [1, '2', 3]
let arr4: Array<number | string> = [1, '2', 3];


/*
  元组
    规定长度和存储的类型
*/
const tuple: [string, number, boolean] = ['a', 1, true];
// tuple.push({}); // error: 类型“{}”的参数不能赋给类型“string | number | boolean”的参数
// tuple.push(4); console.log(tuple[3]); // error: 长度为 "3" 的元组类型 "[string, number, boolean]" 在索引 "3" 处没有元素。

const tuple2: readonly ['a', 1, true] = ['a', 1, true];
// tuple2.push(4); // 添加readonly报错：类型“readonly ["a", 1, true]”上不存在属性“push”
// tuple2[0] = 'a2' // error: 无法为“0”赋值，因为它是只读属性。



/*
枚举
    自带类型的对象、值自动增长。
    类型可以进行反举（值是数字的时候，可以反过来枚举）,枚举没有值会根据上面的索引来自动累加。
    异构枚举 就是枚举中不光有数字，还有字符串. 异构枚举如果上一个是字符串会导致下一个无法推导。
*/
enum USER_ROLES {
    ADMIN,
    SAMPLE,
    READONLY,
    OTHER = 'abc' // 异构枚举。
}
/*
编译后结果：
  var USER_ROLES;
  (function (USER_ROLES) {
    USER_ROLES[USER_ROLES["ADMIN"] = 0] = "ADMIN";
    USER_ROLES[USER_ROLES["SAMPLE"] = 1] = "SAMPLE";
    USER_ROLES[USER_ROLES["READONLY"] = 2] = "READONLY";
  })(USER_ROLES || (USER_ROLES = {}));
})();
*/


/*
null 和 undefined

    任何类型的子类型。
    严格模式下，null和undefined只能分别赋给null和undefined。
    strictNullChecks关闭时，null和undefined可以赋给任何类型。
 */
const str: undefined = undefined;
const empty: null = null;
// const str: string = undefined; // 严格模式下报错：不能将类型“undefined”分配给类型“string”。ts(2322)
// const num: number = null; // 严格模式下报错：不能将类型“null”分配给类型“number”。


/*
void
    代表函数的返回值为空，只在函数中使用。
*/
function fn(): undefined {
    return undefined;
}
function fn2(): void {
    return undefined;
}
function fn3(): void {
}


/*
never
    任何类型的子类型
*/
function fn4(): never {
    throw new Error('');
}
function fn5(): never {
    while (true) {
    }
}
const res: string = fn5(); // 子类型可以赋值给父级类型

// 针对不同类型做不同处理
function validate(val: never) {}
function getResult(stringOrNumberOrBool: string | number | boolean) {
    if (typeof stringOrNumberOrBool === 'string') {
        return stringOrNumberOrBool;
    }
    if (typeof stringOrNumberOrBool === 'number') {
        return stringOrNumberOrBool;
    }
    if (typeof stringOrNumberOrBool === 'boolean') {
        return stringOrNumberOrBool;
    }
    validate(stringOrNumberOrBool); // 【代码的完整性保护】【if/else、 switch/case场景】（永远到达不了的地方...）
}

// never跟其他类型做联合类型时，会被忽略掉。
let union: string | number | boolean | never;
// validate(union); // 报错：类型“string | number | boolean”的参数不能赋给类型“never”的参数。不能将类型“string”分配给类型“never”。



/*
对象类型
*/
const obj: Object = {};

const create = (target: object) => {};
create({});
create(function() {});
create([]);


/**
 * Symbol
 */
const s1: symbol = Symbol();


/**
 * BigInt
 * 需调整tsconfig.json配置，将lib调整为ES2020及以上
 */
const b1: bigint = BigInt(Number.MAX_SAFE_INTEGER + 100); // 直接使用报错：找不到名称“BigInt”。是否需要更改目标库? 请尝试将 “lib” 编译器选项更改为“es2020”或更高版本


/**
 * any
 *  任意类型
 *  有时候我们需要对类型做转化，但是无法直接转化，这时这个值可以赋给任意类型。 
 */

/*
模块隔离。

定义name变量：
    const name = 'TS';
当前文件代码如果没有export，会报错。报错如下：
报错：
    无法重新声明块范围变量“name”。ts(2451)
    lib.dom.d.ts(27609, 15): 此处也声明了 "name"。
解决方案：
    export {} 导出该模块，增加模块之间的隔离。
*/
export { };