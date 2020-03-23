// 引用增加了拦截器的axios实例
import instance from '@/common/api.js'
export default {
  logout() {
    return instance({
      url: `/vue/shiro-manage/logout`,
      method: 'get'
    })
  }
}