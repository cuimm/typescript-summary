import AxiosInterceptorManager from "./AxiosInterceptorManager"
import { CancelTokenStatic, isCancel } from "./CancelToken"

export type Methods = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE'

// 获取类类型中<实例方法的返回值>的属性的类型
export type CancelToken = ReturnType<CancelTokenStatic['source']>['token']

export interface AxiosRequestConfig {
  url?: string
  method?: Methods
  params?: any
  data?: Record<string, any>
  headers?: Record<string, any>
  timeout?: number
  cancelToken?: CancelToken
}

export interface InternalAxiosRequestConfig extends AxiosRequestConfig {
    headers: Record<string, any>
}

export interface AxiosResponse<T = any> {
  config: AxiosRequestConfig,
  data: T
  headers: Record<string, any>
  request: any
  status: number
  statusText: string
}

export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>,
    interceptors: {
        request: AxiosInterceptorManager<InternalAxiosRequestConfig>,
        response: AxiosInterceptorManager<AxiosResponse>,
    }
    CancelToken: CancelTokenStatic
    isCancel: typeof isCancel // 获取函数的类型定义
}
