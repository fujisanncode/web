<template>
  <v-main>
    <v-card class="pa-6">
      <v-row>
        <v-btn class="ma-1" :text="true">富文本编辑器</v-btn>
        <v-btn class="ma-1" @click="submit">提交</v-btn>
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

export default {
  data() {
    return {
      contentEditor: ""
    }
  },
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
        this.contentEditor.setValue("hello,Vditor+Vue!")
      }
    })
  },
  methods: {}
}
</script>