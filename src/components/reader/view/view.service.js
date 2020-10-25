import instance from '@/common/api.js' // 引用增加了拦截器的axios实例

export default {
  // 保存新增的网站
  save(postPara) {
    return instance({
      url: '/learning/shelf/addWeb',
      method: 'post',
      data: postPara
    })
  },
  // 查询网站分页
  page() {
    return instance({
      url: '/learning/shelf/pageWeb?pageNum=1&pageSize=10',
      method: 'get'
    })
  },
  // 查找登录用户
  findAllLogin() {
    return instance({
      url: '/vue/login-manage/find-all-login',
      method: 'get'
    })
  }
}
