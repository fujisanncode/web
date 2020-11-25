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
        this.blogId = blog.id
        this.contentEditor.setValue(blog.content)
      }
    })
  },
  created() {
    // vue推荐的定时任务方式
    const timer = setInterval(() =>{
      this.submit()
    }, 20000);
    // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer);
    })
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
          if(resp.data != undefined) {
            this.blogId = resp.data
          }
          this.$msg({text: '保存成功', color: 'info'})
        }
      })
    }
  }
}
</script>