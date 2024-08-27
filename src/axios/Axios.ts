import { AxiosRequestConfig, AxiosResponse } from './types'

class Axios {
  request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise((resolve, reject) => {
      resolve(100 as any)
    })
  }
}

export default Axios
