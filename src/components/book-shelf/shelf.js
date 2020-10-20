import apiService from '@/components/photoDemo/photoDemo.service.js'
import {getCookie} from '@/common/cookie.js'
import loginService from '@/components/login/login.service.js'
export default {
  data () {
    return {
      // 查询到的文章集合
      articles: [],
      apiResult: "",
      // 提示框
      snackbar: false,
      // 标题
      article: {
        articleTitle: '',
        articleId: ''
      },
      tags: '',
      // 表单可见
      valid: false,
      // 表单验证
      nameRules: [],
      uploadFile: null,
      uploadPercentage: 'start',
      websocket: null,
      // 通过webSocket发送给服务器的消息，接受服务器的消息
      sendMsg: '',
      receiveMsg: '',
      allLogins: '',
      curUser: null
    }
  },
  created () {
  },
  destroyed () {
  },
  methods: {
    // 本地保存记录上传的文件
    upload (val) {
      this.uploadFile = val
    },
    // 提交pdf文件到服务器
    submit () {
      let val = this.uploadFile
      if (val) {
        let formData = new FormData()
        formData.append('file', val)
        this.uploadPercentage = 'start'
        apiService.uploadFile(formData, (percentage, type) => {
          this.uploadPercentage = `${type}: ${percentage}`
        }).then(() => {
          this.uploadPercentage = `success`
        }) 
      }
    }
  }
}