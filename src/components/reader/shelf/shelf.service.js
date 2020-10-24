import instance from '@/common/api.js' // 引用增加了拦截器的axios实例

export default {
  // 上传文件
  uploadFile(postPara, callback) {
    return instance({
      url: '/learning/shelf/uploadBook',
      method: 'post',
      data: postPara,
      headers: {'Content-Type': 'multipart/form-data'},
      onUploadProgress: function (progressEvent) {
        // 上传进度回调，按已经发送的数据包长度实时上报进度
        let progress = Math.round(
          progressEvent.loaded / progressEvent.total * 100
        )
        // progressEvent.type
        callback(progress)
      }
    })
  },
  // 查询图书列表
  listBook() {
    return instance({
      url: '/learning/shelf/listBook',
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
