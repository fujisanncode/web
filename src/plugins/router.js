// vue-router组件
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 将js分块打包，生成多个vendor，实现按需加载
const Login = () => import(/* webpackChunkName: 'Login' */ '@/components/login/Login.vue')
const UnAuth = () => import(/* webpackChunkName: 'UnAuth' */  '@/components/error/403.vue')
const NotFound = () => import(/* webpackChunkName: 'Notfound' */  '@/components/error/404.vue')

// router必须导出为此名称
const router = new VueRouter({
  // hash路由模式下，路径会累加
  mode: 'history',
  // base: '/web',
  routes: [
    // {
    //   path: '/',
    //   redirect: '/index/reader/view'
    // },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/403',
      name: '403',
      component: UnAuth
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    }
  ]
})

export default router