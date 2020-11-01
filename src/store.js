import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 变量
  state: {
    routerList: []
  },
  // 获取变量
  getters: {
    // 获取路由列表（从后台获取的路由列表被保存在state中）
    getRouter(state) {
      return state.routerList
    }
  },
  mutations: {},
  // 对变量的操作, 通过dispatch方法触发
  actions: {
    // 保存后台请求的路由列表,context为第一个参数不需要传入，payload为可选传入参数：https://vuex.vuejs.org/zh/api/#actions
    generatorRouter(context, routerList) {
      console.log('dispatch 触发了actions中方法，用于保存后台请求的路由')
      context.state.routerList = routerList
    }
  }
})
