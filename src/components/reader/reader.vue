<style lang="scss" scoped>
</style>

<template>
  <iframe ref="iframe" v-if="pdfSrc != ''" :src="'/pdfjs/web/viewer.html?file=' + ossUrl + pdfSrc + '#page=' + page" width="100%" height="100%" frameborder="0"></iframe>
</template>

<script>
let PDFJS = require('pdfjs-dist')
export default {
  data () {
    return {
      ossUrl: 'http://fujisann.ink/file/',
      pdfSrc: 'Maven权威指南中文版.pdf',
      page: 210
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>