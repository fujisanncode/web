<template>
  <div class="home">
    <Login msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/login/Login.vue'

export default {
  name: 'home',
  components: {
    Login
  }
}
</script>
