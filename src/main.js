// import 引入资源=============================================================================================================================
import Vue from 'vue'
import vuetify from './plugins/vuetify.js'
import 'vuetify/src/styles/main.sass'
import App from './App.vue'
import router from './router'
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
// import axios from 'axios'
import instance from '@/common/api.js'
// import VueAxios from 'vue-axios'
// 引入jquery
// import jQuery from 'jquery'
import md5 from 'js-md5'
import {Base64} from 'js-base64'
// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg'
// 定义全局的jQuery  或者通过webpack定义   如果没有全局jquery 只能通过$.id 绑定froala
// window.jQuery = window.$ = $
// require('vuetify/src/stylus/app.styl')
// 全局使用自定义的组件；在vue的js中用this.$msg,在独立的js先import vue，然后用v.prototype.$msg使用组件
import registryMsg from '@/components/message/message.js'
// let base64 = require('js-base64').Base64
// import 引入资源=============================================================================================================================

// require 引入资源=============================================================================================================================
// 引入 Froala Editor js file.
require('froala-editor/js/froala_editor.pkgd.min')
// 引入中文语言包
require('froala-editor/js/languages/zh_cn')
// 引入 Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css')
// 此处可在index.html中引入：font-awesome cdn地址：<link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
require('font-awesome/css/font-awesome.css') 
require('froala-editor/css/froala_style.min.css')
// require 引入资源=============================================================================================================================

// 定义全局引用 .use()/.prototype.$xxx==========================================================================================================
// 生成消息弹窗的方法注册到vue中，可以全局使用
Vue.use(registryMsg)

Vue.use(VueFroala)
// Vue.use($)
// Vue.use(VueAxios, axios)

// base64中没有定义install属性 不能通过Vue.use引用
Vue.prototype.$base64 = Base64
Vue.prototype.$md5 = md5


// import Vue from 'vue';
// import Vuetify, { VSnackbar } from 'vuetify/lib'
// const opts = {}; // your options
// const vueObj = new Vuetify(opts);

// import VuetifyToast from 'vuetify-toast-snackbar'
// // export default vueObj;
// Vue.use(Vuetify)
// Vue.use(VuetifyToast, {$vuetify: vueObj.framework});
// 定义全局引用 ================================================================================================================================

Vue.config.productionTip = false

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// 路由守卫 =====================================================================================================================================
// 路由守卫，在导航跳转前生效：https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB
router.beforeEach((to, from, next) => {
  // 放行404
  if (to.path === '/404') {
    next()
  }

  // 如果后台请求的路由未保存本地，需要请求后台
  if (store.getters.getRouter.length !== 0) {
    console.log('store中已经存储了后台请求的路由: ' + store.getters.getRouter[0].path)
    next()
  } else {
    instance.get('/learning/admin/findMenu').then(resp => {
      let routerList = resp.data.data
      // window.localStorage.setItem('routerList', JSON.stringify(routerList))
      // 先将后台请求的路由数据保存下来，dispatch触发store.action中方法
      store.dispatch('generatorRouter', routerList).then(() => {
        let routerResult = []
        store.getters.getRouter.forEach(e => {
          let componentName = e.component
          // 动态拼接组件:https://www.cnblogs.com/ajaemp/p/11912090.html
          e.component = resolve => {
            require(['@/' + componentName + '.vue'], resolve)
          }
          routerResult.push(e)
        })

        // 动态路由:https://router.vuejs.org/zh/api/#router-addroutes
        router.addRoutes(routerResult)

        // 如果访问根路径，则导航到的第一条路由
        if (to.path === '/') {
          next({path: routerResult[0].path})
        } else {
          // 尝试路由到to，如果to未加载，则抛异常转到404；...to为将to对象结构为json对象，其实只需要to.path即可
          next({...to})
        }
      })
    })
    // .catch(e => {
    //   // 如果请求动态路由失败，或 next({...to}) 失败等，导航到404页面
    //   console.error("请求动态路由失败", e)
    //   // next('/404')
    // })
  }
})
// 路由守卫 =====================================================================================================================================

// 封装的方法 =====================================================================================================================================
// 将后台component字符串加载为component组件对象
function formatRouter() {

}
// 封装的方法 =====================================================================================================================================

// vue实例化 =====================================================================================================================================
// $mount: 指定vue实例的挂载点， 将vue实例挂在index.html上id为app的div上
// 代替template字段，渲染模板字符串为dom页面, 渲染的页面会替代index.html中挂载点的元素(id=app的div元素)
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#indexpage')
// vue实例化 =====================================================================================================================================

// 将vue实例导出，以便在外部js中使用this
// export default vue