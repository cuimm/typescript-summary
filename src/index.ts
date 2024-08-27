import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

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
  method: 'get',
  params: person,
  headers: {
    'x-token': 'x-token',
    'x-name': 'x-name',
    xxx:'aaa',
  }
}

axios(requestConfig)
  .then((response: AxiosResponse<Person>) => {
    console.log(response)
  })
  .catch((error) => {
    console.log('error: ', error)
  })
