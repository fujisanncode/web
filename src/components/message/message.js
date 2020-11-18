import Vue from 'vue'
import Vuetify from 'vuetify'
import messageComponent from '@/components/message/message.vue'

// 组件构造器，构造出一个vue的子类MsgConstructor，所以Vue中use的vuetify，在子类中不需要重复引入
// messageComponent是实例化后需要使用的template
const MsgConstructor = Vue.extend(messageComponent)

// 定义全局方法中显示和隐藏组件的行为
function showMsg ({ text, color, duration = 3000 }) {

  // 1、实例化MsgConstructor，需要指定template和data，因为template在构造器中已经指定不需要重复指定
  const vm = new MsgConstructor({
    // el: '#snake',
    data () {
      // 传递变量给组件
      return {
        color: color, // 颜色['success', 'info', 'error', 'cyan darken-2'],其他参考vuetify
        mode: 'vertical', // 多行文字，竖向文字['multi-line', 'vertical']
        snackbar: true, // 显示snackbar
        text: text, // snack-bar中内容
        timeout: duration, // 默认值2000;2000ms后组件隐藏
        x: 'right', // 水平位置，['left', 'right']
        y: 'top'// 竖向位置，['top', 'bottom']
      }
    }
  })

  // 将vuetify.framework赋值给message实例，解决vuetify2.3版本使用snackbar报错的问题
  Object.assign(vm, { $vuetify: Vuetify.framework })

  // 1、指定挂载点，只有指定el，或者通过$mount指定挂载点，才能进入下一步编译模板为html
  // 编译后的html会将挂载点的元素替换掉，生成真实的Dom
  // 可以用'#mtdiv'指定已经存在的Dom为挂载点，也可以创建一个Dom为挂载点
  vm.$mount(document.createElement('div'))

  // 2、如果挂载点是页面存在的元素，则不需要再次拼接到默认Dom中
  // 如果是创建的Dom作为挂载点，则可以通过vm.$el可以获取到真实的Dom，然后将真实的Dom拼接为#snake的子Dom
  document.getElementById('snake').appendChild(vm.$el)

  // 3、通过延时任务隐藏组件，2s后隐藏组件
  // setTimeout(() => {
  //   msgDom.snackbar = true
  // }, 1000)
}

// 定义组件，当通过vue.use使用组件时，第一步进入这里，
function registryMsg() {
  Vue.prototype.$msg = showMsg
}

export default registryMsg