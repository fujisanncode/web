import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Index from '@/views/Index.vue'
import Embed from '@/components/reader/view/embed.vue'
import View from '@/components/reader/view/view.vue'
import Shelf from '@/components/reader/shelf/shelf.vue'
import Reader from '@/components/reader/pdf/pdf.vue'
import Home from '@/components/home/home.vue'
import PlanNew from '@/components/plan/planEdit.vue'
import PlanList from '@/components/plan/planList.vue'
import Health from '@/components/health/health.vue'
import About from '@/components/About/About.vue'
import Photo from '@/components/photoDemo/photoDemo.vue'
import IMConsole from '@/components/web-socket/IMConsole.vue'
import User from '@/components/admin/user/user.vue'
import Role from '@/components/admin/role/role.vue'
import Permission from '@/components/admin/permission/permission.vue'
import UnAuth from '@/components/error/403.vue'

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