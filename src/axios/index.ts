import { AxiosInstance } from './types'
import Axios from './Axios'

function createInstance() {
  // 1. 创建Axios的实例
  const context = new Axios()

  // 2. 获取request方法，并让request的this绑定为当前Axios的实例
  const instance: AxiosInstance = Axios.prototype.request.bind(context)

  // 3. 返回instance
  return instance
}

const axios = createInstance()

export default axios
export * from './types'
