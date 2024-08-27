import axios, { AxiosRequestConfig, AxiosResponse } from './axios'

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
  // url: baseUrl + '/get',
  // url: baseUrl + '/post',
  // url: baseUrl + '/post_status?code=404',
  url: baseUrl + '/post_timeout?timeout=3000',
  method: 'post',
  //   params: person,
  data: person,
  headers: {
    'Content-Type': 'application/json',
    'x-token': 'x-token',
    'x-name': 'x-name',
  },
  timeout: 1000,
}

axios(requestConfig)
  .then((response: AxiosResponse<Person>) => {
    console.log(response)
  })
  .catch((error) => {
    console.log('error: ', error)
  })
