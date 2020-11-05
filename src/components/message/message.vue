<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" :color="color"
              :bottom="y === 'bottom'" :left="x === 'left'" :right="x === 'right'" :top="y === 'top'"
              :multi-line="mode === 'multi-line'"  :vertical="mode === 'vertical'">
    {{ text }}
  </v-snackbar>
</template>