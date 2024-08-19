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
11. Mutate<T>：可选属性。将对象最外层属性变成可选属性

12. Pick<T, k>：从已有类型中挑选所需属性
13. Omit<T, k>：从已有类型中排除指定属性
14. Record<T, K>：主要用来定义对象，接收2个范型，【对象键的类型和对象值的类型】


