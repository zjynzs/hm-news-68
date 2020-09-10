/* 配置全局的过滤器 */
import Vue from 'vue'
import mometh from 'moment'
// 给mome全局的定义语言环境
mometh.locale('zh-CN')
// 定义全局过滤器
Vue.filter('time', (input, str = 'YYYY-MM-DD') => {
  return mometh(input).format(str)
})

Vue.filter('now', (input) => {
  return mometh(input).fromNow()
})
