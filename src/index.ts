import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from './axios'

// 基础访问路径
const baseUrl = 'http://localhost:8088'

interface Person {
  name: string
  age: number
}
const person: Person = {
  name: 'cuimm',
  age: 30,
}

const requestConfig: AxiosRequestConfig = {
  url: baseUrl + '/get',
  // url: baseUrl + '/post',
  // url: baseUrl + '/post_status?code=404',
  // url: baseUrl + '/post_timeout?timeout=3000',
  method: 'get',
  params: person,
  // data: person,
  headers: {
    'Content-Type': 'application/json',
    'x-token': 'x-token',
    'x-name': 'x-name',
  },
  timeout: 1000,
}

// 【请求拦截器】按照代码顺序从下到上依次执行。【请求拦截器2 => 请求拦截器1】【不取消r1时，最终x-name执行结果为x-name-hello-cuimm】
// 请求拦截器1
const r1 = axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers['x-name'] += '-cuimm'
  return config
})
// 请求拦截器2
axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // 此处请求拦截器会等待1s后在往下执行
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      config.headers['x-name'] += '-hello'
      resolve(config)
    }, 1000)
  })
})
axios.interceptors.request.eject(r1) // 取消r1的拦截器

// 【响应拦截器】按照代码顺序从上向下执行【响应拦截器1 => 响应拦截器2 => 响应拦截器3】【不取消response1时，最终response.data.name结果为：cuimm-a-b-c】
// 响应拦截器1
const response1 = axios.interceptors.response.use((response: AxiosResponse) => {
  response.data['name'] += '-a'
  return response
})
// 响应拦截器2
axios.interceptors.response.use((response: AxiosResponse) => {
  response.data['name'] += '-b'
  return response
})
// 响应拦截器3
axios.interceptors.response.use((response: AxiosResponse) => {
  response.data['name'] += '-c'
  return response
})
axios.interceptors.response.eject(response1); // 取消响应拦截器

axios(requestConfig)
  .then((response: AxiosResponse<Person>) => {
    console.log(response)
  })
  .catch((error) => {
    console.log('error: ', error)
  })
