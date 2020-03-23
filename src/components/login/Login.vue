<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-img :src="require('../../assets/logo.svg')" class="my-3" contain height="200">
        </v-img>
      </v-flex>
      <!-- <v-flex mb-4> -->
        <v-form ref="form">
          <v-text-field v-model="name" label="name"></v-text-field>
          <v-text-field v-model="password" label="password"></v-text-field>
          <v-btn class="ma-2" @click="login">login</v-btn>
          <v-btn class="ma-2" @click="logout">logout</v-btn>
          <v-btn class="ma-2" @click="cancle">cancel</v-btn>
        </v-form>
      <!-- </v-flex> -->
    </v-layout>
  </v-container>
</template>

<script>
  import loginService from '@/components/login/login.service.js'
  // import {setCookie} from '@/common/cookie.js'
  export default {
    data () {
      return {
        name: 'hulei',
        password: '123'
      }
    },
    created () {
    },
    methods: {
      // 登录
      login(){
        loginService.login({'name': this.name, 'password': this.password}).then((res) => {
          // console.log(res)
          // let login = res.data
          // setCookie('login', JSON.stringify(login))
          sessionStorage.setItem('loginDate', new Date())
          sessionStorage.setItem('loginFlag', 'Y')
          this.$router.push('/index')
        })
      },
      logout(){

      },
      cancle(){

      }
    }
  }
</script>

<style>

</style>
