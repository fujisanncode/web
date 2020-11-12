<template>
  <article v-html="value" ></article>
  <div style="width:300px;margin:0 auto; padding:20px 0;">
    <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32011502011263" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">苏公网安备 32011502011263号</p></a>
  </div>
</template>

<script>
export default {
  data() {
    return {//value的值是经过markdown解析后的文本，可使用`@change="changeData"`在控制台打印显示
      value: `<blockquote>
									<p>你好</p>
									</blockquote>
									<p><code>java</code></p>`,
      defaultData: "preview"
    };
  },
  methods: {
  }
};
</script>