import Vue from 'vue'
import Router from 'vue-router'

// 将js分块打包，生成多个vendor，实现按需加载
const Login = () => import(/* webpackChunkName: 'Login' */ '@/components/login/Login.vue')
const Index = () => import(/* webpackChunkName: 'Index' */  '@/App.vue')
const Embed = () => import(/* webpackChunkName: 'Embed' */  '@/components/reader/view/embed.vue')
const View = () => import(/* webpackChunkName: 'View' */  '@/components/reader/view/view.vue')
const Shelf = () => import(/* webpackChunkName: 'Shelf' */  '@/components/reader/shelf/shelf.vue')
const Reader = () => import(/* webpackChunkName: 'Reader' */  '@/components/reader/pdf/pdf.vue')
const Home = () => import(/* webpackChunkName: 'Home' */  '@/components/home/home.vue')
const PlanNew = () => import(/* webpackChunkName: 'PlanNew' */  '@/components/plan/planEdit.vue')
const PlanList = () => import(/* webpackChunkName: 'PlanNew' */  '@/components/plan/planList.vue')
const Health = () => import(/* webpackChunkName: 'Health' */  '@/components/health/health.vue')
const About = () => import(/* webpackChunkName: 'About' */  '@/components/About/About.vue')
const Photo = () => import(/* webpackChunkName: 'Photo' */  '@/components/photoDemo/photoDemo.vue')
const IMConsole = () => import(/* webpackChunkName: 'IMConsole' */  '@/components/web-socket/IMConsole.vue')
const User = () => import(/* webpackChunkName: 'User' */  '@/components/admin/user/user.vue')
const Role = () => import(/* webpackChunkName: 'User' */  '@/components/admin/role/role.vue')
const Permission = () => import(/* webpackChunkName: 'User' */  '@/components/admin/permission/permission.vue')
const UnAuth = () => import(/* webpackChunkName: 'UnAuth' */  '@/components/error/403.vue')
const NotFound = () => import(/* webpackChunkName: 'Notfound' */  '@/components/error/404.vue')

Vue.use(Router)

export default new Router({
  // 根路径，默认跳转index, history模式根路径不确定
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