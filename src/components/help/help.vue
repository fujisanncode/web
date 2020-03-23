<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <span>test page >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>></span>
        <v-btn class="ma-2" @click="test">test</v-btn>
        <span>{{ indexResult }}</span>
        <!-- <v-img :src="require('../../assets/logo.svg')" class="my-3" contain height="200">
        </v-img> -->
      </v-flex>
      <!-- <v-flex mb-4> -->
        <!-- <v-form ref="form">
          <v-text-field v-model="name" label="name"></v-text-field>
          <v-text-field v-model="password" label="password"></v-text-field>
          <v-btn class="ma-2" @click="login">login</v-btn>
          <v-btn class="ma-2" @click="logout">logout</v-btn>
          <v-btn class="ma-2" @click="cancle">cancel</v-btn>
        </v-form> -->
      <!-- </v-flex> -->
    </v-layout>
    <message></message>
  </v-container>
</template>

<script>
  import helpService from '@/components/help/help.service.js'
  import message from '@/components/Message/message.vue'
  export default {
    data () {
      return {
        indexResult: 'initial'
      }
    },
    components: {
      message
    },
    created () {
    },
    methods: {
      // 测试cookie透传
      test(){
        helpService.index().then(res => {
          this.indexResult = res.data
        })
      }
    }
  }
</script>

<style>

</style>
