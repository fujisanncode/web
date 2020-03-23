// import apiService from '@/components/web-socket/IMConsole.service.js'
import {getCookie} from '@/common/cookie.js'
import loginService from '@/components/login/login.service.js'
export default {
  data () {
    return {
      curUser: null,
      toUserName: null,
      offsetTop: 0,
      items: ['hulei', 'hushi'],
      msgContent: 'welcome',
      msgs: ['hello boy', 'hello girl'],
      webSocketHeart: null
    }
  },
  created () {
    let login = getCookie('login')
    if (login != null) {
      this.curUser = JSON.parse(login)
      console.log('curUser is: ' + this.curUser.name)
    }
  },
  destroyed () {
    this.closeSocket()
  },
  methods: {
    // 开启webSocket服务
    openSocket () {
      if(typeof(WebSocket) == 'undefined') {
        alert('您的浏览器不支持webSocket')
      } else {
        if (this.curUser == null) {
          console.log('no login!!!')
          return
        }
        this.socketConnet()
      }
    },
    socketConnet(){
        // 连接websocket前先登录,否则websocket无法启动
        loginService.login({'name': this.curUser.name, 'password': this.curUser.password}).then((res) => {
          console.log(res)
          let websocket = new WebSocket(`ws://localhost:8081/vue/websocket/${this.curUser.name}/${this.toUserName}`)
          // 建立websocket后，清空对话列表
          this.msgs = []
          this.websocket = websocket
          websocket.onopen = () => {
            console.log('建立连接后触发')
          }
          websocket.onmessage = (evt) => {
            console.log(`获取到服务端消息时触发`)
            this.msgs.push(evt.data)
          }
          websocket.onclose = () => {
            console.log('关闭连接触发')
          }
          websocket.onerror = () => {
            console.log('连接错误时触发'    )
          }
        })
    },
    // 通过socket发送消息给后台
    sendMsgMethod(ping){
      if(ping != null) {
        this.websocket.send(ping)
      } else {
        this.sendMsg = new Date().getTime()
        this.msgs.push(`${this.msgContent} ---> ${this.sendMsg}`)
        this.websocket.send(this.msgContent)
      }
    },
    // 关闭socket连接
    closeSocket(){
      if (this.websocket != null) {
        console.log('关闭连接')
        this.websocket.close()
        clearInterval(this.webSocketHeart)
      }
    },
    onScroll(e){
      this.offsetTop = e.target.scrollTop
    }
  }
}