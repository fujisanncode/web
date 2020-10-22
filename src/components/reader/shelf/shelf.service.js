// 引用增加了拦截器的axios实例
import instance from '@/common/api.js'
export default {
  // 上传文件
  uploadFile (postPara, callback) {
    return instance({
      url: `/vue/multi/upload`,
      method: 'post',
      data: postPara,
      headers: {'Content-Type': 'multipart/form-data'},
      onUploadProgress: function (progressEvent) {
        // 对原生进度事件的处理
        let percentage = (progressEvent.loaded / progressEvent.total) * 100
        let formatPercent = Number.parseFloat(percentage).toFixed(2)
        callback(`${formatPercent} %`, progressEvent.type)
      }
    })
  },
  // 查找登录用户
  findAllLogin () {
    return instance({
      url: `/vue/login-manage/find-all-login`,
      method: 'get'
    })
  }
}
