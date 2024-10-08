interface Action<T> {
  payload?: T
  type: string
}

interface Module {
  count: number
  message: string
  asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>
  syncMethod<T, U>(action: Action<T>): Action<U>
}

type Result = {
  asyncMethod<T, U>(input: T): Action<U>
  syncMethod<T, U>(action: T): Action<U>
}

type Transform<X> = X extends (input: Promise<infer T>) => Promise<Action<infer U>>
  ? (input: T) => Action<U>
  : X extends (action: Action<infer T>) => Action<infer U>
  ? (action: T) => Action<U>
  : never

export type Connect<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: Transform<T[K]> // 重映射
}

// 实现类型Connect，要求 Connect<Module> 的结果为上面的 Result
// 如果函数是异步函数，要求自动解析出来Promise中的类型；
type F = Connect<Module>

/************** Usage ************/
class MyModule {
  count = 10000
  message = 'success'
  asyncMethod(input: Promise<number>) {
    return input.then((res) => {
      return {
        payload: res,
        type: 'asyncMethod',
      }
    })
  }
  ayncMethod(action: Action<string>): Action<string> {
    return {
      payload: action.payload,
      type: 'ayncMethod',
    }
  }
}
type R = Connect<MyModule>

export {}
