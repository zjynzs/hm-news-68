/* 用于全局注册组件 */
import Vue from 'vue'
import HmHeader from '../components/HmHeader.vue'
import HmLogo from '../components/HmLogo.vue'
import HmNavItem from '../components/HmNavItem.vue'

// 全局注册组件
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-navitem', HmNavItem)
