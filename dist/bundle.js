(function () {
  'use strict';

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
  // tuple2.push(4); // 添加readonly报错：类型“readonly ["a", 1, true]”上不存在属性“push”
  // tuple2[0] = 'a2' // error: 无法为“0”赋值，因为它是只读属性。
  /*
  枚举
      自带类型的对象、值自动增长。
      类型可以进行反举（值是数字的时候，可以反过来枚举）,枚举没有值会根据上面的索引来自动累加。
      异构枚举 就是枚举中不光有数字，还有字符串. 异构枚举如果上一个是字符串会导致下一个无法推导。
  */
  var USER_ROLES;
  (function (USER_ROLES) {
      USER_ROLES[USER_ROLES["ADMIN"] = 0] = "ADMIN";
      USER_ROLES[USER_ROLES["SAMPLE"] = 1] = "SAMPLE";
      USER_ROLES[USER_ROLES["READONLY"] = 2] = "READONLY";
      USER_ROLES["OTHER"] = "abc"; // 异构枚举。
  })(USER_ROLES || (USER_ROLES = {}));
  /**
   * BigInt
   * 需调整tsconfig.json配置，将lib调整为ES2020及以上
   */
  BigInt(Number.MAX_SAFE_INTEGER + 100); // 直接使用报错：找不到名称“BigInt”。是否需要更改目标库? 请尝试将 “lib” 编译器选项更改为“es2020”或更高版本

})();
//# sourceMappingURL=bundle.js.map
