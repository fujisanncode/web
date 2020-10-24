<style scoped>
@import url(shelf.css);
</style>

<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="6" md="3">
          <v-file-input accept="pdf/*" label="File input" @change="upload" ref='uploadFile'></v-file-input>
        </v-col>
        <v-col cols="6" md="3">
          <v-text-field v-model="article.articleTitle" :rules="nameRules" :counter="100" label="Article Title"
                        required></v-text-field>
        </v-col>
        <v-col cols="6" md="3">
          <v-text-field v-model="article.tags" :rules="nameRules" :counter="100" label="Tags" required></v-text-field>
        </v-col>
        <v-col cols="6" md="3">
          <v-btn class="ma-2" @click="submit">提交</v-btn>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            {{ uploadType }}
            <v-progress-linear color="white" class="mb-0" :buffer-value="progress">
            </v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-card max-width="450" class="mx-auto">
        <v-list one-line>
          <template v-for="(item) in bookList">
            <v-list-item :key="item.bookId">
              <v-list-item-content>
                <v-list-item-title v-html="item.bookName"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-container>
  </v-form>
</template>

<script src='./shelf.js'></script>
