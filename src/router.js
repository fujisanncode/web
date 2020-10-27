import Vue from 'vue'
import Router from 'vue-router'

// 将js分块打包，生成多个vendor，实现按需加载
const Login = () => import(/* webpackChunkName: 'Login' */ '@/views/Login.vue')
const Index = () => import(/* webpackChunkName: 'Index' */  '@/views/Index.vue')
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

Vue.use(Router)

export default new Router({
  // 根路径，默认跳转index, history模式根路径不确定
  mode: 'history',
  // base: '/web',
  routes: [
    {
      path: '/',
      redirect: '/index/reader/view'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/index/reader/embed',
          name: 'index-reader-embed',
          component: Embed,
          meta: {
            hidden: true // 如果隐藏，则不映射菜单, 自定义属性只能定义在meta中
          }
        },
        {
          path: '/index/reader/view',
          name: 'index-reader-view',
          component: View
        },
        {
          path: '/index/reader/shelf',
          name: 'index-reader-shelf',
          component: Shelf
        },
        {
          path: '/index/reader/pdf',
          name: 'index-reader-pdf',
          component: Reader
        }, {
          path: '/index/home',
          name: 'index-home',
          component: Home,
          meta: {
            permission: ['all', 'all-query']
          }
        }, {
          path: '/index/plan-new',
          name: 'index-plan-new',
          component: PlanNew,
          meta: {
            hidden: true // 如果隐藏，则不映射菜单, 自定义属性只能定义在meta中
          }
        }, {
          path: '/index/plan-list',
          name: 'index-plan-list',
          component: PlanList
        }, {
          path: '/index/health',
          name: 'index-health',
          component: Health
        }, {
          path: '/index/about',
          name: 'index-about',
          component: About
        },
        {
          path: '/index/photo',
          name: 'index-photo',
          component: Photo,
          meta: {
            permission: ['all', 'all-query']
          }
        },
        {
          path: '/index/IM',
          name: 'index-IM',
          component: IMConsole,
          meta: {
            permission: ['all', 'all-query']
          }
        },
        {
          path: '/index/admin/user',
          name: 'index-admin-user',
          component: User
        },
        {
          path: '/index/admin/role',
          name: 'index-admin-role',
          component: Role
        },
        {
          path: '/index/admin/permission',
          name: 'index-admin-permission',
          component: Permission
        },
        {
          path: '/403',
          name: 'index-permission',
          component: UnAuth
        }
      ]
    }
  ]
})