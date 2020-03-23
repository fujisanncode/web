// 引用增加拦截器的axios实例
import instance from '@/common/api.js'
export default {
  findAllUser() {
    return instance({
      url: `/vue/shiro-manage/findAllRole`,
      method: 'get'
    })
  },
  findRoleByUser(userName) {
    return instance({
      url: `/vue/shiro-manage/findRoleByUser?userName=${userName}`,
      method: 'get'
    })
  },
  saveRole(param) {
    return instance({
      url: `/vue/shiro-manage/addRoleSingle`,
      method: 'post',
      data: param
    })
  },
  // 按照当前用户查询未配置的角色
  findNonRoleByUser(userName) {
    return instance({
      url: `/vue/shiro-manage/findNonRoleByUser?userName=${userName}`,
      method: 'get'
    })
  },
  // 批量给用户指定角色（写用户角色表）
  addUserRoleBatch(userRole) {
    return instance({
      url: `/vue/shiro-manage/addUserRoleBatch`,
      method: 'post',
      data: userRole
    })
  }
}