import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
// import Login from '../views/user/Login.vue'
// import Register from '../views/user/Register'
// import User from '../views/user/User.vue'
// import UserEdit from '../views/user/UserEdit.vue'
// import Demo from '../views/user/Demo.vue'
// import MyFollow from '../views/user/MyFollow.vue'
// import MyComment from '../views/user/MyComment.vue'
// import MyStar from '../views/user/MyStar'
// import Index from '../views/news/Index.vue'
// import Manage from '../views/news/Manage.vue'
// import PostDetail from '../views/news/PostDetail.vue'
// import Search from '../views/news/Search.vue'

const Login = () => import(/* webpackChunkName: "user" */'../views/user/Login.vue')
const Register = () => import(/* webpackChunkName: "user" */'../views/user/Register')
const User = () => import(/* webpackChunkName: "user" */'../views/user/User.vue')
const UserEdit = () => import(/* webpackChunkName: "user" */'../views/user/UserEdit.vue')
const Demo = () => import(/* webpackChunkName: "user" */'../views/user/Demo.vue')
const MyFollow = () => import(/* webpackChunkName: "user" */'../views/user/MyFollow.vue')
const MyComment = () => import(/* webpackChunkName: "user" */'../views/user/MyComment.vue')
const MyStar = () => import(/* webpackChunkName: "user" */'../views/user/MyStar')
const Index = () => import(/* webpackChunkName: "index" */'../views/news/Index.vue')
const Manage = () => import(/* webpackChunkName: "news" */'../views/news/Manage.vue')
const PostDetail = () => import(/* webpackChunkName: "news" */'../views/news/PostDetail.vue')
const Search = () => import(/* webpackChunkName: "news" */'../views/news/Search.vue')

Vue.use(VueRouter)
// 全局的把push的异常给处理了
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/user-edit', component: UserEdit, name: 'user-edit' },
  { path: '/demo', component: Demo },
  { path: '/myfollow', component: MyFollow, name: 'myfollow' },
  { path: '/mycomment', component: MyComment, name: 'mycomment' },
  { path: '/mystar', component: MyStar, name: 'mystar' },
  { path: '/', component: Index, name: 'index' },
  { path: '/manage', component: Manage, name: 'manage' },
  { path: '/post-detail/:id', component: PostDetail, name: 'post-detail' },
  { path: '/search', component: Search, name: 'search' }
]
const router = new VueRouter({
  routes
})

// 配置全局的导航守卫
// to: 到哪去
// from: 从哪儿来
// next: 函数代表是否放行
// 判断 to的path 是否是/user 判断用户是否去个人中心
// 1. 如果不是去个人中心 nex() 放行
// 2. 如果是去个人中心 判断是否有token
//  如果有， 放行
//  如果没有， 跳转到登录去
router.beforeEach(function(to, from, next) {
  // 只要路由发生跳转，跳转之前这个函数就要执行
  // if (to.name === 'user') {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     next()
  //   } else {
  //     router.push('/login')
  //   }
  // } else {
  //   next()
  // }
  const token = localStorage.getItem('token')
  // 需要拦截的所有页面
  const authUrls = ['/user', '/user-edit', '/myfollow', '/mycomment', '/mystar']
  if (!authUrls.includes(to.path) || token) {
    next()
  } else {
    router.push('/login')
  }
})
// 后置的导航守卫
// router.afterEach(function(to, from) {})

export default router
