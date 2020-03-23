<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app :clipped="$vuetify.breakpoint.lgAndUp">
        <v-list dense>
          <template v-for="item in items">
            <v-list-item v-if="item.heading" :key="item.heading">
              <v-flex xs6>
                <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
              </v-flex>
              <v-flex xs6 class="text-xs-center">
                <a :href="item.to" class="body-2 black--text">EDIT</a>
              </v-flex>
            </v-list-item>
            <v-list-group v-else-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
              <v-list-item slot="activator">
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-for="(child, i) in item.children" :key="i" @click="hrefTo(child)">
                <v-list-item-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ child.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-item v-else @click="$router.push(item.to)" :key="item.text">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar color="blue darken-3" dark app :clipped-left="$vuetify.breakpoint.lgAndUp">
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          <v-app-bar-nav-icon v-if="dispDrawer" @click.stop='drawer = !drawer'></v-app-bar-nav-icon>
          <span class="hidden-sm-and-down">Google Contacts</span>
        </v-toolbar-title>
        <v-text-field flat solo-inverted hide-details prepend-inner-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon to="/">
          <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon to="/">
          <v-icon>notifications</v-icon>
        </v-btn>
        <v-btn icon @click="logOut">
          <v-icon>power_settings_new</v-icon>
        </v-btn>
        <v-btn icon large>
          <v-avatar size="32px" tile>
            <!-- ./只能找到当前目录的文件，当前目录文件夹只能用../向下找 -->
            <img src="../assets/logo.svg" alt="Vuetify">
          </v-avatar>
        </v-btn>
      </v-app-bar>
      <v-content>
        <router-view></router-view>
      </v-content>
      <v-btn fab bottom right color="pink" dark fixed @click.stop="dialog = !dialog">
        <v-icon>add</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" width="800px">
        <v-card>
          <v-card-title class="grey lighten-4 py-4 title">Create contact</v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                  <v-avatar size="40px" class="mr-3">
                    <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt="">
                  </v-avatar>
                  <v-text-field placeholder="Name"></v-text-field>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-text-field prepend-icon="business" placeholder="Company"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field placeholder="Job title"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field prepend-icon="mail" placeholder="Email"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field type="tel" prepend-icon="phone" placeholder="(000) 000 - 0000" mask="phone"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field prepend-icon="notes" placeholder="Notes"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-btn text color="primary">More</v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
            <v-btn text @click="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>
<script>
import api from './index.service.js'
export default {
  data () {
    return {
      // drawer: null,
      // items: [
      //   { title: 'Home', icon: 'dashboard' },
      //   { title: 'About', icon: 'question_answer' }
      // ],
      // mini: false,
      // right: null,
      source: 'https://codepen.io/johnjleider/pen/EQOYVV',
      dialog: false,
      items: [
        // { heading: 'Home' },// heading
        { icon: 'contacts', text: 'About' },// about
        { icon: 'history', text: 'Photo' }, // photon
        { icon: 'content_copy', text: 'WebSocket' }, // IM
        { icon: 'help', text: 'Help' }, // help
        { // 用户、角色、权限
          icon: 'personal_video',
          'icon-alt': 'personal_video',
          text: 'Admin',
          model: false,
          children: [
            { text: 'Person', icon: 'people' },
            { text: 'Role', icon: 'person' },
            { text: 'Permission', icon: 'how_to_reg' }
          ]
        },
        { // children
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Labels',
          model: true, // 展开下拉
          children: [
            { icon: 'add', text: 'Create label' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'More',
          model: false,
          children: [
            { text: 'Import' },
            { text: 'Export' },
            { text: 'Print' },
            { text: 'Undo changes' },
            { text: 'Other contacts' }
          ]
        },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Send feedback' },
        { icon: 'phonelink', text: 'App downloads' },
        { icon: 'keyboard', text: 'Go to the old version' }
      ],
      // 显示左侧栏的按钮
      dispDrawer: true,
      // 左侧栏是否显示
      drawer: false
    }
  },
  created () {
    // 按照顺序映射router和菜单
    let routerTemp = this.$router.options.routes[2].children
    let pushIndex = 0
    this.items.forEach((ele) => {
      if (ele.children) {
        // 对于子菜单的处理
        ele.children.forEach((e) => {
          e.to = pushIndex > routerTemp.length - 1 ? '/' : routerTemp[pushIndex].path
          pushIndex++
        })
      } else {
        ele.to = pushIndex > routerTemp.length - 1 ? '/' : routerTemp[pushIndex].path
        pushIndex++
      }
    })

    // 进入index页面后，默认跳转到/index/about页面
    this.$router.push('/index/help')
    this.drawer = true
  },
  methods: {
    hrefTo (child) {
      this.$router.push(child.to)
    },
    logOut () {
      api.logout().then(res => {
        console.log(`logout -> ${res.data}`)
        this.$router.push('/login')
      })
    }
  }

}
</script>

