import express from 'express'
import bodyParser from 'body-parser'

const app = express()

// 项目中所有 Content-Type 是 "application/x-www-form-urlencoded" 或 "application/json" 请求数据都会经过 body-parser 中间件的处理，并设置到 req.body 属性上
app.use(bodyParser.json()) // parse application/json
app.use(bodyParser.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded

// 跨域中间件
app.use(function (req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,name',
    'Access-Control-Allow-Credentials': true,
  })
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.get('/get', function (req, res) {
  res.json(req.query)
})

app.post('/post', function (req, res) {
  res.json(req.body)
})

app.post('/post_timeout', function (req, res) {
  const { timeout } = req.query
  timeout = timeout ? parseInt(timeout) : 0
  setTimeout(() => {
    res.json(req.body)
  }, timeout)
})

app.post('/post_status', function (req, res) {
  const { code } = req.query
  code = code ? parseInt(code) : 200
  res.statusCode = code
  res.json(req.body)
})

app.listen(8088)
