/**
 * 当前message是否为取消请求
 * message is CanceledError：代表返回值为true时，message为CanceledError类型
 */
export function isCancel(message: any): message is CanceledError {
  return message instanceof CanceledError
}

export class CanceledError {
  constructor(public message: string) {}
}
export class CancelTokenStatic {
  public resolve: any

  // 请求参数中配置的cancelToken为source().token这个promise，当用户执行source().cancel时，token这个promise变为成功态。
  // dispatchRequest内的config.cancelToken.then会执行request.abort()，从而取消请求
  source() {
    return {
      // token是一个promise（对应请求参数中配置的cancelToken）
      token: new Promise<CanceledError>((resolve, reject) => {
        this.resolve = resolve
      }),
      // cancel是让token这个promise成功
      cancel: (message: string) => {
        this.resolve(new CanceledError(message))
      },
    }
  }
}
