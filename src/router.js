import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Index from './views/Index.vue'
import About from '@/components/About/About.vue'
import Photo from '@/components/photoDemo/photoDemo.vue'
import IMConsole from '@/components/web-socket/IMConsole.vue'
import UnAuth from '@/components/error/403.vue'
import Help from '@/components/help/help.vue'
import User from '@/components/admin/user/user.vue'
import Role from '@/components/admin/role/role.vue'
import Permission from '@/components/admin/permission/permission.vue'

Vue.use(Router)

export default new Router({
  // mode: history,
  routes: [{
      path: '/',
      redirect: '/login'
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
      children: [{
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
          path: '/index/help',
          name: 'index-help',
          component: Help,
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