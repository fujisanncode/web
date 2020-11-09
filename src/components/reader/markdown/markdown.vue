<template>
  <div class="order">
    <h5>富文本编辑器</h5>
    <div id="vditor"></div>
  </div>
</template>

<script>
import Vditor from "vditor"
import "vditor/dist/index.css"
export default {
  data(){
    return{
      contentEditor:""
    }
  },
  mounted(){
    this.contentEditor = new Vditor("vditor",{
      height:360,
      toolbarConfig:{
        pin:true
      },
      cache:{
        enable:false
      },
      after:()=>{
        this.contentEditor.setValue("hello,Vditor+Vue!")
      }
    })
  },
  methods:{

  }
}
</script>