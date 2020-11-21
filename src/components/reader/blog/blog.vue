<style scoped>
  @import url(blog.css);
</style>

<template>
  <v-main>
    <v-container fluid>
      <!-- <v-layout row>
        <v-alert v-model="alert" color="success" icon="check_circle" outline transition="scale-transition">
          This is a success alert. Result is {{ apiResult }}
        </v-alert>
      </v-layout> -->
      <v-snackbar v-model="snackbar" :timeout="3000" :top="true">
        {{ apiResult }}
      </v-snackbar>
      <v-layout row>
        <v-flex xs8 pa-2 class="froala-editor">
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field v-model="article.articleTitle" :rules="nameRules" :counter="100" label="Article Title" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field v-model="article.tags" :rules="nameRules" :counter="100" label="Tags" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <froala :tag="'textarea'" :config="froalaConfig" v-model="froalaContent"></froala>
        </v-flex>
        <v-flex xs4 pa-2>
          <v-card>
            <v-app-bar color="indigo" dark>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
              <v-toolbar-title>Inbox</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>search</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-app-bar>
            <v-list>
              <template v-for="(item, index) in articles">
                <v-list-item :key="index" @click="fillEditor(item)">
                  <v-list-item-avatar>
                    <img :src="item.avatar" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.articleTitle"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon ripple @click.stop="deleteArticle(item)">
                      <v-icon>remove_circle_outline</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
                <v-divider v-if="index + 1 < articles.length" :key="`divider-${index}`"></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout align-center>
        <v-flex xs12 sm4 text-xs-center>
          <div>
            <v-btn small @click="submit">Submit</v-btn>
            <!-- <v-btn small color="primary" @click="refresh">Refresh</v-btn> -->
            <v-btn small color="error" @click="reset">Reset</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script src='./blog.js'></script>
