// 引用增加了拦截器的axios实例
import instance from '@/common/api.js'
export default {
  // 查找所有用户
  findAllUser() {
    return instance({
      url: `/vue/shiro-manage/findAllUser`,
      method: 'get'
    })
  },
  saveUser(param) {
    return instance({
      url: `/vue/shiro-manage/addUserSingle`,
      method: 'post',
      data: param
    })
  }
}