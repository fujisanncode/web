import axios from 'axios'
import Router from '@/router.js'
import url from '@/common/const.js'
// 注意：在js文件中使用element组件 按照下面更优雅哦~~
import Vue from 'vue'

let instance = axios.create({
  timeout: 30000, // 超时时间
  withCredentials: true, // 是否允许携带cookie
  headers: {
    'content-type': 'application/json'
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
    // 接口200等
    return response
  },
  err => {
    // 接口401等，用promise.reject终止请求
    switch (err.response.status) {
    case url.unAuthCode:
      Router.push('/login')
      break
    case url.forbiddenCode:
      console.log('401.....')
      Vue.prototype.$msg({text: err.response.status, color: 'info'})
      break
    default:
      console.log('403.....')
      Vue.prototype.$msg({text: err.response.status, color: 'error'})
      break
    }
    return Promise.reject(err.response.status)
  }
)

export default instance