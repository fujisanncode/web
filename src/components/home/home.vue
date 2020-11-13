<template>
  <v-main>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-card class="ma-2 pa-2">
          <div class="text-h3 pa-2">
            {{ `${this.displayName}, ${this.greetContent}!` }}
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-main>
</template>

<script>
import helpService from '@/components/home/home.service.js'
export default {
  data() {
    return {
      indexResult: 'initial',
      displayName: '游客',
      greetContent: '上午好'
    }
  },
  // props中值只能从父组件传下来，不能直接绑定到页面使用，因为是单向传递；通过监听，赋值给data中变量，然后使用
  props: {
    userName: {
      default: '游客',
      type: String
    }
  },
  watch:{
    userName (value) {
      // 监听props中this.userName变化，value是变化后的值，然后赋值给本地变量使用；不能直接使用props属性，因为此值单向传递，不可被修改
      console.log('值通过prop传递到子组件，子组件通过watch监听到值变化，然后赋值====> ' + value)
      this.displayName = value
    },
    // displayName (value) {
    //   this.$emit('userName', value)
    // }
  },
  created() {
    // 根据时间设定问候语
    let now = new Date().getHours()
    if (now <= 6) {
      this.greetContent = '早上好'
    } else if (now <= 12) {
      this.greetContent = '上午好'
    } else if (now <= 18) {
      this.greetContent = '下午好'
    } else {
      this.greetContent = '晚上好'
    }
    // 从sessionStorage中获取用户名称
    let userNameTmp = sessionStorage.getItem('userName')
    if (userNameTmp != null) {
      this.displayName = userNameTmp
    }
  },
  methods: {
    // 测试cookie透传
    test() {
      helpService.index().then(res => {
        this.indexResult = res.data
      })
    }
  }
}
</script>

<style>
</style>
