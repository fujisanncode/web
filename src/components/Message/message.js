import vue from 'vue'
import messageComponent from '@/components/Message/message.vue'
import vuetify from '@/plugins/vuetify.js'
 

// 组件构造器，构造出一个 vue组件实例
const MsgConstructor = vue.extend(
  vuetify, 
  {
    template: '<v-card><v-snackbar v-model="snackbar">{{ text }}</v-snackbar></v-card>',
    data () {
      // 传递变量给组件
      return {
        color: 'info', // 颜色['success', 'info', 'error', 'cyan darken-2'],其他参考vuetify
        mode: '',
        snackbar: true, // 进入方法即显示组件
        text: 'text',
        timeout: 2000, // 默认值2000;2000ms后组件隐藏
        x: 'right', // 水平位置，['left', 'right']
        y: 'top'// 竖向位置，['top', 'bottom']
      }
    }
  }
)

// 定义全局方法中显示和隐藏组件的行为
function showMsg ({ text, color, duration = 3000 }) {

  // 1、进入方法后设定组件属性为显示,
  // 不能挂在root上，必须挂在在#vueapp内部的元素上，https://vuetifyjs.com/en/components/application/
  new MsgConstructor().$mount('#snake')

  // 2、然后将组件加载到document中
  // document.getElementById('snake').appendChild(msgDom.$el)

  // 3、通过延时任务隐藏组件，2s后隐藏组件
  // setTimeout(() => {
  //   msgDom.snackbar = true
  // }, 1000)
}

// 定义组件，当通过vue.use使用组件时，第一步进入这里，
function registryMsg() {
  vue.prototype.$msg = showMsg
}
 
export default registryMsg