<template>
  <v-main>
    <v-card class="pa-6">
      <v-row>
        <v-btn class="ma-1" :text="true">富文本编辑器</v-btn>
        <v-btn class="ma-1" @click="submit()">提交</v-btn>
        <v-btn class="ma-1" @click="edit()">编辑/预览</v-btn>
      </v-row>
      <v-row>
        <v-col>
          <div id="vditor"></div>
        </v-col>
      </v-row>
    </v-card>
  </v-main>
</template>

<script>
import Vditor from "vditor"
import "vditor/dist/index.css"
import api from '@/common/api.js'

export default {
  data() {
    return {
      contentEditor: '',
      blogId: '',
      isEdit: true,
      content: ''
    }
  },
  // props: ['toChild'],
  // watch:{
  //   toChild(value){
  //     console.log('detail组件接受到数据 =======> ' + value)
  //   }
  // },
  mounted() {
    this.contentEditor = new Vditor("vditor", {
      height: 600,
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      after: () => {
        let blog = this.$route.params
        this.contentEditor.setValue(blog.content)
      }
    })
  },
  created() {
  },
  methods: {
    edit() {
      // this.contentEditor.
    },
    submit() {
      let content = this.contentEditor.getValue()
      let postParam = {
        title: 'test',
        content: content,
        author: 'fujisann'
      }

      let url = '/learning/blog/save'
      if (this.blogId !== '') {
        postParam.id = this.blogId
        url = '/learning/blog/update'
      }
      api.post(url, postParam).then(resp => {
        if (resp.data !== '') {
          console.log("xxxx ===> " + resp.data)
          this.blogId = resp.data
        }
      })
    }
  }
}
</script>