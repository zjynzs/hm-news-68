/* 发送请求的 */
import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import { Toast } from './vant'

// 把sxios挂载到vue原型上
Vue.prototype.$axios = axios
// 给axos配置默认的baseURL，基准地址
const URL = 'http://localhost:3000'
axios.defaults.baseURL = URL
Vue.prototype.$base = URL
// 给axios配置拦截器
// 请求拦截器
axios.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  // console.log('拦截到了请求', config)
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// 响应拦截器
axios.interceptors.response.use(function(response) {
  // 在发送请求之前做些什么
  // console.log('拦截到了响应', response)
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // 1. 跳转到登录页面
    router.push('/login')
    // 2. 清除失效的信息
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    // 3. 给提示  用户验证失败
    Toast.fail('登录信息失效')
  }
  return response
})

Vue.prototype.$url = function(url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return URL + url
  }
}
