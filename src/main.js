import Vue from 'vue'
import vuetify from './plugins/vuetify'
import 'vuetify/src/styles/main.sass'
import Home from './Home.vue'
// import Login from './Login.vue'
import router from './router'
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
// 引入jquery
// import jQuery from 'jquery'
import md5 from 'js-md5'
import { Base64 } from 'js-base64'
// let base64 = require('js-base64').Base64
// 引入 Froala Editor js file.
require('froala-editor/js/froala_editor.pkgd.min')
//引入中文语言包
require('froala-editor/js/languages/zh_cn')
//引入 Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css')
require('font-awesome/css/font-awesome.css')//此处可在index.html中引入：font-awesome cdn地址：<link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
require('froala-editor/css/froala_style.min.css')

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg'
// 定义全局的jQuery  或者通过webpack定义   如果没有全局jquery 只能通过$.id 绑定froala
// window.jQuery = window.$ = $

// require('vuetify/src/stylus/app.styl')
import {getCookie} from './common/cookie'

// 全局使用自定义的组件；在vue的js中用this.$msg,在独立的js先import vue，然后用v.prototype.$msg使用组件
import registryMsg from '@/components/Message/message.js'
Vue.use(registryMsg)

Vue.use(VueFroala)
// Vue.use($)
Vue.use(VueAxios, axios)
// 全局引用
// Vue.use(base64)
// base64中没有定义install属性 不能通过Vue.use引用
Vue.prototype.$base64 = Base64
Vue.prototype.$md5 = md5

Vue.config.productionTip = false

// 路由的钩子函数，切换路由前会进入此方法
router.beforeEach((to, from , next) => {
  console.log('router before')
  // new Date(sessionStorage.getItem('loginDate')).getTime()
  let unLoginFlag = sessionStorage.getItem('loginFlag') != 'Y'
  // 如果登录的session失效跳转到登录,否则跳转到下一个页面
  if (unLoginFlag){
    // 最后一次跳转next必须没有参数，有参数会重复进入beforeEach
    // 因为next有参数，会认为你需要切换路由，从而重新进入此方法
    // 如果next没有参数，会认为你不需要重新切换路由，从而不在进入此方法
    if(to.path == '/login'){
      next()
    } else {
      next('/login')
    }
  } else {
    next() 
  }

  // let login = getCookie('login')
  // let permissions = []
  // if (login != null) {
  //   JSON.parse(login).roles.forEach(r => {
  //     r.permissions.forEach(p => {
  //       permissions.push(p.name)
  //     })
  //   })
  // }
  // // console.log(`router.beforeEach: ${JSON.parse(JSON.stringify(permissions))}`)
  // if (to.path != '/login' && !login) {
  //   // 如果路由到非登录页面，并且cookie中没有角色信息，则跳转到登录页面获取角色信息
  //   next('/login')
  // } else if(to.meta.permission) {
  //   // 如果页面配置的权限被包含，则有权限
  //   for(let i=0; i<to.meta.permission.length; i++) {
  //     if(permissions.indexOf(to.meta.permission[i]) > -1){
  //       next()
  //       return
  //     }
  //   }
  //   next('/403')
  // } else {
  //   // 如果页面没有权限控制，直接跳转
  //   next()
  // }
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(Home)
}).$mount('#app')
