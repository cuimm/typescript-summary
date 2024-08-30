import { AxiosInstance } from './types'
import Axios from './Axios'
import { CancelTokenStatic, isCancel } from './CancelToken';

function createInstance() {
  // 1. 创建Axios的实例
  const context = new Axios()

  // 2. 获取request方法，并让request的this绑定为当前Axios的实例
  let instance = Axios.prototype.request.bind(context)

  // context.interceptors.request.use
  // context.interceptors.response.use
  instance = Object.assign(instance, context);

  // 3. 返回instance
  return instance as AxiosInstance
}

const axios = createInstance()

axios.CancelToken = new CancelTokenStatic()
axios.isCancel = isCancel

export default axios
export * from './types'
