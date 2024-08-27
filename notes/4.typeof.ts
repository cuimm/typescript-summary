
type Computed<T> = {
    [Key in keyof T]: T[Key]
}

type T1 = typeof Object; // type T1 = ObjectConstructor
type R1 = Computed<T1>;
/**
 type R1 = {
    readonly prototype: Object;
    getPrototypeOf: (o: any) => any;
    getOwnPropertyDescriptor: (o: any, p: PropertyKey) => PropertyDescriptor | undefined;
    getOwnPropertyNames: (o: any) => string[];
    ... 17 more ...;
    fromEntries: {
        ...;
    };
}
 */

type T2 = keyof typeof Object; // type T2 = keyof ObjectConstructor
type R2 = Computed<T2>;
/**
 type R2 = "prototype" | "getPrototypeOf" | "getOwnPropertyDescriptor" | "getOwnPropertyNames" | "create" | "defineProperty" | "defineProperties" | "seal" | "freeze" | "preventExtensions" | ... 11 more ... | "fromEntries"
 */

type T3 = keyof Object; // type T3 = keyof Object
type R3 = Computed<T3>;
/**
 type R3 = "constructor" | "toString" | "toLocaleString" | "valueOf" | "hasOwnProperty" | "isPrototypeOf" | "propertyIsEnumerable"
 */


export { };