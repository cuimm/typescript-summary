/**
 * 条件类型
 *  和范型约束通常一起使用，类似三元运算符。
 * 
 * 范型约束是用来约束范型的，条件类型是用来判断的。
 */

{
    type ResStatus<T> = T extends 200 | 204 | 206 ? 'success' : 'fail'; // 状态码
    type R1 = ResStatus<'ok'>; // fail. 没有对T进行约束，T可以任意传值，得到的结果是fail。

    // 对T进行约束：约束T必须是number类型
    type ResStatus2<T extends number> = T extends 200 | 204 | 206 ? 'success' : 'fail';
    type R2 = ResStatus2<100>; // fail
    type R3 = ResStatus2<200>; // success


    type Conditional<T, U> = T extends U ? true : false;
    type C1 = Conditional<'cuimm', string>; // true
    type C2 = Conditional<'cuimm', number>; // false
}

{
    type FormatResult<T extends string | number> = T extends string
        ? string
        : T extends number
        ? number
        : never;
    function processVal<T extends string | number>(a: T, b: T): FormatResult<T> {
        // return a + b; // 运算符“+”不能应用于类型“T”和“T”。ts(2365)
        return a + (b as any); // T + T = ? 范型类型之间不能做数据运算
    }
    const r1 = processVal(10, 20);
    const r2 = processVal('a', 'b');
}

export { };
