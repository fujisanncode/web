<style scoped>
  @import url(./photoDemo.css);
</style>

<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-file-input accept="image/*" label="File input" @change="getFile" ref='uploadFile'></v-file-input>
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
          <v-btn class="ma-2" @click="selectFile">提交</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          {{ `sendMsg: ${sendMsg}, receiveMsg: ${receiveMsg}` }}
        </v-col>
        <v-col cols="6">
          <v-btn class="ma-2" @click="openSocket">open socket</v-btn>
          <v-btn class="ma-2" @click="sendMsgMethod">send msg</v-btn>
          <v-btn class="ma-2" @click="closeSocket">close socket</v-btn>   
          <v-btn class="ma-2" @click="findLogin">find login</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          {{ `findLogin: ${allLogins}` }}
        </v-col>
        <v-col cols="6">  
          <v-btn class="ma-2" @click="findLogin">find login</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script src='./photoDemo.js'></script>
