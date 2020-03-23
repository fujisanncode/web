<template>
  <v-card>
    <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :color="color" :left="x === 'left'"
      :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" 
      :vertical="mode === 'vertical'">
      {{ text }}
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      color: '',
      mode: '',
      snackbar: false,
      text: '',
      timeout: 0,
      x: '',
      y: ''
    }
  }
}
</script>