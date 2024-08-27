## 语法
```
type Required<T> = {
    [K in keyof T]-?: T[K]
};
```
> `-?`代表将可选属性修饰符去掉

```
type Mutate<T> = {
    -readonly [K in keyof T]: T[K]
};
```
> `-readonly`：将readonly去掉，变成可变属性

## 内置类型
1. Extract<T, U>：交集：两个类型公共的部分
2. Exclude<T, U>：排除：从T中排除U的部分
3. NonNullable<T>：非空
4. ReturnType<T>：获取函数返回值
5. Parameters<T>：获取函数参数列表
6. ConstructorParameters<T>：获取类的构造函数的参数
7. InstanceType<T>：获取类的实例类型

8. Partial<T>：循环遍历T【最外层】的属性，将属性变成可选属性。
9. Required<T>：循环遍历【最外层】的属性，将属性变成必填属性。
10. Readonly<T>：只读属性。将对象最外层属性变成只读属性
11. Mutate<T>：可变属性。将对象最外层属性去掉readonly

12. Pick<T, k>：从已有类型中挑选所需属性
13. Omit<T, k>：从已有类型中排除指定属性
14. Record<T, K>：主要用来定义对象，接收2个范型，【对象键的类型和对象值的类型】



## 语法
1. declare var 声明全局变量
2. declare function 声明全局方法
3. declare class 声明全局类
4. declare enum 声明全局枚举类型
5. declare namespace 声明（含有子属性的）全局对象
6. interface 和 type 声明全局类型
7. export 导出变量
8. export namespace 导出（含有子属性的）对象
9. export default ES6 默认导出
10. export = commonjs 导出模块
11. export as namespace UMD 库声明全局变量
12. declare global 扩展全局变量
13. declare module 扩展模块
14. ///  三斜线指令


## 整理
> 判断两个类型是否严格一致
```
type isEqual<T, U> = 
    [T] extends [U]
    ? [U] extends [T] 
        ? keyof T extends keyof U 
            ? keyof U extends keyof T 
                ? true 
                : false 
            : false
        : false
    : false;
```

> 元组循环
> 元组的`number`属性返回联合类型，可以用来循环元组的每一项。
```
type X = ['MaxOs', 'Windows', 'Linux'][number];
```
返回
```
type X = "MaxOs" | "Windows" | "Linux";
```

