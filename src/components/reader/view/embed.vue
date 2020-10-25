<template>
  <iframe :src="url" height="100%" width="100%">
  </iframe>
</template>

<script>
export default {
  data: () => ({
    url: ""
  }),
  created() {
    this.url = this.$route.params.webUrl
  }
}
</script>