<template>
  <v-main>
    <v-container fluid v-if="ifMarkdownList">
      <v-row dense>
        <v-col v-for="card in cards" :key="card.id" :cols="6">
          <v-card :color="card.color" dark @click="viewDetail(card)">
            <!--<v-img :src="card.img" height="150px">-->
            <!--  <v-card-title v-text="card.title"></v-card-title>-->
            <!--</v-img>-->
            <v-card-title v-text="card.title"></v-card-title>
            <v-card-subtitle v-text="card.content"></v-card-subtitle>
            <v-card-actions>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <router-view></router-view>
  </v-main>
</template>

<script>
import api from '@/common/api'

export default {
  data() {
    return {
      cards: [
        {
          id: '1',
          title: 'xxxx',
          content: 'xxxx',
          img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          color: '#1F7087'
        },
        {
          id: '2',
          title: 'xxxx',
          content: 'xxxx',
          img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          color: '#952175'
        },
        {
          id: '3',
          title: 'xxxx',
          content: 'xxxx',
          img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          color: '#3F5D35'
        }
      ],
      ifMarkdownList: true
    }
  },
  created() {
    let url = `/learning/blog/findAll?id`
    api.get(url).then(resp => {
      this.cards = []
      resp.forEach(e => {
        this.cards.push({
          id: e.id,
          title: e.title,
          content: e.content,
          img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          color: '#1F7087'
        })
      })
      // this.contentEditor.setValue(resp.data.content)
      // this.blogId = resp.data.id
    })
  },
  methods: {
    viewDetail(card){
      this.ifMarkdownList = false
      this.$router.push({name: 'reader-markdown-detail', params: card})
    }
  }
}
</script>