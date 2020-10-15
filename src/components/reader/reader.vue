<style>
</style>

<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <div>这里是阅读页面</div>
        <div class="pdf-container">
          <pdf :src='pdfUrl' />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import readerService from '@/components/reader/reader.service.js'
import pdf from 'vue-pdf'

export default {
  name: 'vuePdf',
  components: {
    pdf
  },
  data () {
    return {
      pdfUrl: 'http://fujisann.ink/file/nodejs.pdf'
    }
  },
  created () {
  },
  methods: {
    // 测试cookie透传
    test () {
      readerService.index().then(res => {
        this.indexResult = res.data
      })
    }
  }
}
</script>
