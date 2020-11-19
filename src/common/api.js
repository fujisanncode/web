import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(VueAxios, axios)

import url from './const.js'

let instance = axios.create({
  timeout: 30000, // 超时时间
  withCredentials: true, // 是否允许携带cookie
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Credentials': true // 配置withCredential
  }
})

instance.interceptors.request.use(
  request => {
    return request
  },
  err => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  response => {
    // 如果接口200，则直接返回data内容
    return response.data
  },
  err => {
    // 接口401等
    switch (err.response.status) {
      case url.unAuthCode:
        // Router.push('/login')
        console.log('未认证')
        Vue.prototype.$msg({text: '未认证(' + err.response.status  + ')', color: 'error'})
        break
      case url.forbiddenCode:
        console.log('未授权')
        Vue.prototype.$msg({text: '未授权(' + err.response.status  + ')', color: 'error'})
        break
      default:
        console.log('其他错误')
        Vue.prototype.$msg({text: '其他错误(' + err.response.status  + ')', color: 'error'})
        break
    }
    // promise.reject终止请求, 请求链的后续部分不执行       ··
    return Promise.reject(err.response.status)
  }
)

export default instance