import AxiosInterceptorManager from "./AxiosInterceptorManager"

export type Methods = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE'

export interface AxiosRequestConfig {
  url?: string
  method: Methods
  params?: any
  data?: Record<string, any>
  headers?: Record<string, any>
  timeout?: number
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
}
