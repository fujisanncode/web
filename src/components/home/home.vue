<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <div>Welcome to home page !!!</div>
        <div>
          <v-btn class="ma-2" @click="test">Now</v-btn>
          <span>{{ indexResult }}</span>
        </div>
      </v-flex>
    </v-layout>
    <!-- <message></message> -->
  </v-container>
</template>

<script>
import helpService from '@/components/home/home.service.js'
// import message from '@/components/Message/message.vue'
export default {
  data() {
    return {
      indexResult: 'initial'
    }
  },
  // components: {
  //   message
  // },
  created() {
    console.log('home 完成加载')
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
