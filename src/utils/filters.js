/* 配置全局的过滤器 */
import Vue from 'vue'
import mometh from 'moment'

// 定义全局过滤器
Vue.filter('time', input => {
  return mometh(input).format('YYYY-MM-DD')
})
