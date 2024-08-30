import qs from 'qs'
import parseHeaders from 'parse-headers'
import {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from './types'
import AxiosInterceptorManager, { Interceptor } from './AxiosInterceptorManager'

class Axios {
  public interceptors = {
    request: new AxiosInterceptorManager<InternalAxiosRequestConfig>(),
    response: new AxiosInterceptorManager<AxiosResponse>(),
  }

  request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    // 构建promise执行链【1.请求拦截器 - 2.真正的请求 - 3.响应拦截器】
    const promiseChain: (
      | Interceptor<InternalAxiosRequestConfig>
      | Interceptor<AxiosResponse>
    )[] = [{ onFulfilled: this.dispatchRequest }]

    this.interceptors.request.interceptors.forEach((item) => {
      item && promiseChain.unshift(item)
    })

    this.interceptors.response.interceptors.forEach((item) => {
      item && promiseChain.push(item)
    })

    // 通过promise链将所有的拦截器和请求放到一起
    let promise = Promise.resolve(config)
    while (promiseChain.length) {
      const { onFulfilled, onRejected } = promiseChain.shift()!
      promise = promise.then(
        onFulfilled as (v: AxiosRequestConfig | AxiosResponse) => any,
        onRejected
      )
    }

    return promise as Promise<AxiosResponse<T>>
  }

  dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise((resolve, reject) => {
      let { url, method, params, data, headers, timeout } = config

      // 1. 创建XMLHttpRequest对象
      const request = new XMLHttpRequest()

      // 处理请求字符串
      if (params) {
        if (typeof params === 'object') {
          params = qs.stringify(params)
        }
        url += (url?.includes('?') ? '&' : '?') + params
      }

      // 2. 创建链接
      request.open(method!, url!, true)

      // 处理headers
      if (headers) {
        for (let key in headers) {
          request.setRequestHeader(key, headers[key])
        }
      }

      request.responseType = 'json'

      // 处理请求体
      let requestBody: null | string = null
      if (data) {
        requestBody = JSON.stringify(data)
      }

      // 监听错误（网络异常）
      request.onerror = function () {
        reject('net::ERR_INTERNET_DISCONNECTED')
      }

      request.onreadystatechange = function () {
        // 请求发送成功。status:0 表示请求未发送或网络异常
        if (request.readyState === 4 && request.status !== 0) {
          if (request.status === 200 && request.status < 300) {
            const response: AxiosResponse<T> = {
              config,
              request,
              data: request.response || request.responseText,
              headers: parseHeaders(request.getAllResponseHeaders()),
              status: request.status,
              statusText: request.statusText,
            }
            resolve(response)
          } else {
            reject(
              'axios error: request failed with status code ' + request.status
            )
          }
        }
      }

      // 处理超时
      if (timeout) {
        request.timeout = timeout
        request.ontimeout = function () {
          reject(`timeout of ${timeout}ms exceeded`)
        }
      }

      // 取消请求
      if (config.cancelToken) {
        config.cancelToken.then((message) => {
          request.abort() // 终止请求
          reject(message)
        })
      }

      // 3. 发送请求
      request.send(requestBody)
    })
  }
}

export default Axios
