import qs from 'qs'
import parseHeaders from 'parse-headers'
import { AxiosRequestConfig, AxiosResponse } from './types'

class Axios {
  request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.dispatchRequest(config)
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
      request.open(method, url!, true)

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
            reject('axios error: request failed with status code ' + request.status)
          }
        }
      }

      if (timeout) {
        request.timeout = timeout;
        request.ontimeout = function() {
            reject(`timeout of ${timeout}ms exceeded`);
        }
      }

      // 3. 发送请求
      request.send(requestBody)
    })
  }
}

export default Axios
