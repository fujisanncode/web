import axios from 'axios'
import Router from '@/router.js'
import url from '@/common/const.js'
// 注意：在js文件中使用element组件 按照下面更优雅哦~~
import v from 'vue'

let instance = axios.create({
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
    switch(err.response.status){
      case url.unAuthCode:
        Router.push('/login')
        break;
      case url.forbiddenCode:
        v.prototype.$msg({text: err.response.status, color: 'info'})
        break;
      default:
        v.prototype.$msg({text: err.response.status, color: 'error'})
        break;
    }
    return Promise.reject(err.response.status)
  }
)

export default instance