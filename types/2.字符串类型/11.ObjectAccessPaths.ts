/**
 * 得到对象中的值访问字符串
 */
import { RemoveFirstChar } from './9.KebabCase';

// 拼接对象可访问字符串
export type ObjectAccessPaths<T, F extends string = '', K = keyof T> =
    K extends keyof T // 将联合类型K进行分发
    ? T[K] extends object
        ? ObjectAccessPaths<T[K], `${F}.${K & string}`> // 如果当前的值是对象，继续递归拼接。并且将当前解析的key拼接到结果集中。
        : RemoveFirstChar<`${F}.${K & string}`, '.'>
    : never;


function createI18n<Schema>(schema: Schema): (path: ObjectAccessPaths<Schema>) => void {
    return (path) => { };
}

const i18n = createI18n({
    home: {
        topBar: {
            title: "顶部标题",
            welcome: "欢迎登录",
        },
        bottomBar: {
            notes: "XXX备案，归XXX所有",
        },
    },
    login: {
        username: "用户名",
        password: "密码",
    },
});

i18n("home.topBar.title"); // correct
i18n("home.topBar.welcome"); // correct
i18n("home.bottomBar.notes"); // correct

// i18n("home.login.abc"); // error，不存在的属性
// i18n("home.topBar"); // error，没有到最后一个属性

export { };