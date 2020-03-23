// 引用增加拦截器的axios实例
import instance from '@/common/api.js'
export default {
  findAllUser() {
    return instance({
      url: `/vue/shiro-manage/findAllPermission`,
      method: 'get'
    })
  },
  // 后台代码中所有权限点写入权限点表中
  syncPermission() {
    return instance({
      url: `/vue/shiro-manage/addExistPermission`,
      method: 'get'
    })
  },
  // 按照角色查询权限点集合
  findPermissionByRole(roleName) {
    return instance({
      url: `/vue/shiro-manage/findPermissionByRole?roleName=${roleName}`,
      method: 'get'
    })
  },
  // 按照角色查询未配置的权限点集合
  findNonPermissionByRole(roleName) {
    return instance({
      url: `/vue/shiro-manage/findNonPermissionByRole?roleName=${roleName}`,
      method: 'get'
    })
  },
  // 权限点批量写给指定角色（写权限角色表）
  addRolePermissionBatch(rolePermission) {
    return instance({
      url: `/vue/shiro-manage/addRolePermissionBatch`,
      method: 'post',
      data: rolePermission
    })
  }
}