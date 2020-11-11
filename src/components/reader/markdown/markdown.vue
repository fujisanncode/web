<template>
  <article v-html="value" ></article>
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