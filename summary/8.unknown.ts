/**
 * unknown：any的安全类型。范型还没有赋予值的时候，默认就是unkonwn。
 * 
 * 默认情况下，unknown必须要进行类型监测才能使用。（类型检查、类型断言）。
 * 
 * 
 */


{
    function processInput(val: unknown) {
        if (typeof val === 'string') {
            return val.toUpperCase();
        }
        if (typeof val === 'number') {
            return val.toFixed();
        }
        return val;
    }
    const result = processInput('abc'); // result: unknown
}

{
    const name: unknown = 'cuimm';
    // name.toUpperCase(); // 直接使用报错：“name”的类型为“未知”。ts(18046)
    (name as string).toUpperCase();
}

// unknown 在联合类型和交叉类型中的特点
{
    // 1. unknown和任意类型做联合类型时，结果都是unknown
    type UnionUnknown = unknown | string | number; // UnionUnknown：unknown。

    // 2. unknown & string => string
    type InterUnknown1 = unknown & string; // InterUnknown1：string
    type InterUnknown2 = unknown & string & number; // InterUnknown2：never
    type InterUnknown3 = any & string; // InterUnknown3：any【any和其他类型交叉的时候结果是any】
    type InterUnknown4 = any & string & number; // InterUnknown4：never

    // 区分类型是unknown 还是any，可以采用交叉类型
}

{
    // 不能使用keyof来获取unknown的类型
    type IKeyOf = keyof unknown; // IKeyOf: never

    // 只有string、number、symbol才可以充当any
    type IKeyOfAny = keyof any; // IKeyOfAny：string | number | symbol
}

export { };
