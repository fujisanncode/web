<template>
  <div>
    <v-form>
      <v-row>
        <v-col md="4">
          <v-btn class="ma-2" @click="openSocket">open socket</v-btn>
          <v-btn class="ma-2" @click="closeSocket">close socket</v-btn>
        </v-col>
        <v-col md="3">
          <v-select v-model="toUserName" :items='items'></v-select>
        </v-col>
        <v-col md="3">
          <v-text-field v-model="msgContent"></v-text-field>
        </v-col>
        <v-col md="2">
          <v-btn class="ma-2" @click="sendMsgMethod">send msg</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-container id='scroll-target' style="max-height: 400px">
      <v-row v-scroll:#scroll-target='onScroll' style="height: 1000px">
        <v-list class="blue lighten-4" style="width: 100%">
          <v-list-item v-for="(msg, index) in msgs" :key='index'>
            <span class="white--text">{{ msg }}</span>
          </v-list-item>
        </v-list>
      </v-row>
    </v-container>
  </div>
</template>

<script src='./IMConsole.js'></script>
