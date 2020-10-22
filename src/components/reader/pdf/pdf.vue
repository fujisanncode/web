<style lang="scss" scoped>
</style>

<template>
  <iframe ref="iframe" v-if="pdfSrc != ''" :src="'/pdfjs/web/viewer.html?file=' + ossUrl + pdfSrc + '#page=' + page" width="100%" height="100%" frameborder="0"></iframe>
</template>

<script>
export default {
  data () {
    return {
      ossUrl: 'http://fujisann.ink/file/',
      // pdfSrc: 'nodejs.pdf',
      pdfSrc: 'Java核心技术卷一基础知识第10版.pdf',
      // pdfSrc: 'Maven权威指南中文版.pdf',
      page: 1
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>