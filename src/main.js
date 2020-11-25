import Vue from 'vue'
import App from './App.vue'
import vuetify from "./plugins/vuetify";
import router from './plugins/router'
import store from './plugins/store'
import instance from '@/common/api.js'
import md5 from 'js-md5'
Vue.prototype.$md5 = md5 // 全局引用
import {Base64} from 'js-base64'
Vue.prototype.$base64 = Base64 //base64中没有定义install属性 不能通过Vue.use引用
import registryMsg from '@/components/message/message.js'
Vue.use(registryMsg) //生成消息弹窗的方法注册到vue中，可以全局使用
import VueFroala from './plugins/vue-froala'
Vue.use(VueFroala)
// import VueFroala from 'vue-froala-wysiwyg'
// Vue.use(VueFroala) // 全局引用
// Vue.config.productionTip = false
// require('font-awesome/css/font-awesome.css')
// require('froala-editor/css/froala_editor.pkgd.min.css')
// require('froala-editor/css/froala_style.min.css')
// require('froala-editor/js/languages/zh_cn')
// require('froala-editor/js/froala_editor.pkgd.min')
// 定义全局的jQuery  或者通过webpack定义   如果没有全局jquery 只能通过$.id 绑定froala
import $ from 'jquery' // froala需要使用jquery
window.jquery = window.$ = $
// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
// Vue.use(mavonEditor)

// 路由守卫
router.beforeEach((to, from, next) => {
  // 放行404
  if (to.path === '/404') {
    next()
  }

  // 如果后台请求的路由未保存本地，需要请求后台
  if (sessionStorage.getItem('routerList') !== null) {
    console.log('store中存储的路由数量：' + store.getters.getRouter.length)
    console.log('当前即将跳转到url:' + to.path)
    // 保存当前url，用户页面刷新后设置
    sessionStorage.setItem("currentUrl", to.path)
    next()
  } else {
    // 用户未登录前，请求后台菜单
    instance.get('/learning/admin/findMenu').then(resp => {
      let routerList = resp.menu
      sessionStorage.setItem('routerList', JSON.stringify(routerList))
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
          let currentUrl = sessionStorage.getItem("currentUrl");
          if(currentUrl !== null){
            next({path: currentUrl})
          } else {
            next({path: routerResult[0].path})
          }
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