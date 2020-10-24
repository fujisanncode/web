import apiService from './shelf.service'

export default {
  data() {
    return {
      // 查询到的文章集合
      articles: [],
      apiResult: '',
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
      // 进度条进度数值：0-100
      progress: 0,
      websocket: null,
      // 通过webSocket发送给服务器的消息，接受服务器的消息
      sendMsg: '',
      receiveMsg: '',
      allLogins: '',
      curUser: null,
      // 上传进度条的对话框
      dialog: false,
      // 上传对话框提示语
      uploadType: '上传中...',
      // 书籍列表
      bookList: []
    }
  },
  watch: {
    // // 次粗监测dialog值得变化，变化后的值传入val中
    // dialog(val) {
    //   // 如果传入false，结束
    //   if (!val) return;
    //   // 如果传入true，则4s后关闭对话框
    //   setTimeout(() => (this.dialog = false), 4000);
    // }
  },
  created() {
    // 进入页面查询图书列表
    this.listBooks()
  },
  destroyed() {
  },
  methods: {
    // 查询图书列表
    listBooks() {
      apiService.listBook().then(resp => {
        this.bookList = resp.data
      })
    },
    // 本地保存记录上传的文件
    upload(val) {
      this.uploadFile = val
    },
    // 提交pdf文件到服务器
    submit() {
      this.dialog = true
      let val = this.uploadFile
      if (val) {
        let formData = new FormData()
        formData.append('file', val)
        apiService
          .uploadFile(formData, (progress) => {
            // 上传过程中，设置回调的进度值
            this.progress = progress
          })
          .then(() => {
            // 上传完成，进度设置为100
            this.progress = 100
            this.uploadType = '上传结束'
            // 清空文本框
            this.$refs.uploadFile.clearableCallback()
            // 1s后关闭对话框
            setTimeout(() => this.dialog = false, 1000)
            // 刷新图书列表
            this.listBooks()
          })
      }
    }
  }
}
