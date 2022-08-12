// 封装axios
// 实例化  请求拦截器  响应拦截器
import axios from 'axios'
import { getToken } from './token'

const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})
// 添加请求拦截器
http.interceptors.request.use((config) => {
  const token = getToken()
  // 第一次发起请求，是登录请求，此时，localStorage中没有token，getToken获取不到，不走下面这个if函数体，直接return config；
  // 后面再发请求时，由于已经登录了，此时，localStorage中有token，getToken获取到了，走if中的函数体，在发起请求前自动进行预处理，追加一个token，以便于访问需要权限的页面
  // 为请求头对象(headers)中添加token验证的自定义字段(Authorization)
  // 作用是为了让需要验证才能使用的API能够使用(请求头中携带了token值则可通过验证)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // 在最后必须return config
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export { http }