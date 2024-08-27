/**
 * 定义组件的监听事件类型
 */

import { CamelCase } from './10.CamelCase';

// 使用infer可以获取函数的参数
export type ComponentEmitsType<T> = {
    [K in keyof T as `on${CamelCase<K & string>}`]?: T[K] extends (...agrs: infer R) => any ? (...agrs: R) => void : any
};


type a1 = {
    "handle-open": (flag: boolean) => true;
    "preview-item": (data: { item: any; index: number }) => true;
    "close-item": (data: { item: any; index: number }) => true;
};

type a2 = ComponentEmitsType<a1>;
// 转化为类型
/*
{
    onHandleOpen?: (flag: boolean) => void,
    onPreviewItem?: (data: { item: any, index: number }) => void,
    onCloseItem?: (data: { item: any, index: number }) => void,
}
*/
export { };
