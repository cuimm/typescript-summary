/**
 * 部分属性可选
 */

// 将对象的指定属性变成可选属性
export type PartialPropsOptional<T extends object, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;



/************************ case ************************/
interface Person {
    name: string;
    age: number;
    address: string;
}

type Computed<T> = {
    [Key in keyof T]: T[Key]
}

type R = Computed<PartialPropsOptional<Person, 'age' | 'address'>>;
/**
    type R = {
        age?: number | undefined;
        address?: string | undefined;
        name: string;
    }
 */
export { };
