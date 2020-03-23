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
    let login = getCookie('login')
    if (login != null) {
      this.curUser = JSON.parse(login).name
    }
  },
  destroyed () {
    this.closeSocket()
  },
  methods: {
    getFile (val) {
      this.uploadFile = val
    },
    // file change
    selectFile () {
      let val = this.uploadFile
      if (val) {
        let fomrData = new FormData()
        fomrData.append('file', val)
        this.uploadPercentage = 'start'
        apiService.uploadFile(fomrData, (percentage, type) => {
          this.uploadPercentage = `${type}: ${percentage}`
        }).then(() => {
          this.uploadPercentage = `success`
        }) 
      }
    },
    // 开启webSocket服务
    openSocket () {
      if(typeof(WebSocket) == 'undefined') {
        alert('您的浏览器不支持webSocket')
      } else {
        if (this.curUser == null) {
          console.log('no login!!!')
          return
        }
        // 连接websocket前先登录,否则websocket无法启动
        loginService.login({'name': 'hulei', 'password': '123'}).then((res) => {
          console.log(res)
          let websocket = new WebSocket(`ws://localhost:8081/vue/websocket/${this.curUser}`)
          this.websocket = websocket
          websocket.onopen = () => {
            console.log('建立连接后触发')
          }
          websocket.onmessage = (evt) => {
            console.log(`获取到服务端消息时触发`)
            this.receiveMsg = evt.data
          }
          websocket.onclose = () => {
            console.log('关闭连接触发')
          }
          websocket.onerror = () => {
            console.log('连接错误时触发'    )
          }
        })
      }
    },
    // 通过socket发送消息给后台
    sendMsgMethod(){
      this.sendMsg = new Date().getTime()
      this.websocket.send(this.sendMsg)
    },
    // 关闭socket连接
    closeSocket(){
      if (this.websocket != null) {
        console.log('关闭连接')
        this.websocket.close()
      }
    },
    // 查找所有登录用户
    findLogin(){
      apiService.findAllLogin().then((res) => {
        this.allLogins = JSON.stringify(res.data[0])
      }).catch((e) => {
        console.log(e)
        this.$router.push('/login')
      })
    }
  }
}