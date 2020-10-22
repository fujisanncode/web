<style scoped>
  @import url(shelf.css);
</style>

<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-file-input accept="image/*" label="File input" @change="upload" ref='uploadFile'></v-file-input>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="article.articleTitle" :rules="nameRules" :counter="100" label="Article Title" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="article.tags" :rules="nameRules" :counter="100" label="Tags" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          {{ uploadPercentage }}
        </v-col>
        <v-col cols="6">
          <v-btn class="ma-2" @click="submit">提交</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script src='./shelf.js'></script>
