<template>
  <div id="app">
    <v-app id="inspire">
      <!-- 左侧抽屉 -->
      <v-navigation-drawer v-model="$vuetify.breakpoint.lgAndUp" app :clipped="$vuetify.breakpoint.lgAndUp">
        <v-list dense>
          <template v-for="item in items">
            <!-- 如果item.heading 存在，则按照heading菜单的方式显示-->
            <!-- <v-list-item v-if="item.heading" :key="item.heading">
              <v-flex xs6>
                <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
              </v-flex>
            </v-list-item> -->
            <!-- 如果item.childen存在，则按照存在子菜单的方式显示 -->
            <v-list-group v-if="item.children" v-model="item.model" :key="item.text"
                          :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
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
            <!-- 其他的按照普通菜单的方式显示 -->
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
      <!-- toolbar，顶部标题栏 -->
      <v-app-bar color="blue darken-3" dark app :clipped-left="$vuetify.breakpoint.lgAndUp" v-if="false">
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          <v-app-bar-nav-icon v-if="dispDrawer" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <span class="hidden-sm-and-down">FUJISANN</span>
        </v-toolbar-title>
        <v-text-field flat solo-inverted hide-details prepend-inner-icon="search" label="Search"
                      class="hidden-sm-and-down"></v-text-field>
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
            <img src="../assets/logo.svg" alt="Vuetify"/>
          </v-avatar>
        </v-btn>
      </v-app-bar>
      <v-footer padless app>
        <v-card class="flex" flat tile>
          <v-card-text class="py-2 black--text text-center">
            @{{ new Date().getFullYear() }} fujisann — 皖ICP备20005176号
          </v-card-text>
        </v-card>
      </v-footer>
      <v-main>
        <router-view></router-view>
      </v-main>
      <v-btn fab bottom right color="pink" dark fixed @click.stop="dialog = !dialog">
        <v-icon>add</v-icon>
      </v-btn>
      <!-- 弹窗 -->
      <v-dialog v-model="dialog" width="800px">
        <v-card>
          <v-card-title class="grey lighten-4 py-4 title">Create contact</v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                  <v-avatar size="40px" class="mr-3">
                    <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt=""/>
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
                <v-text-field type="tel" prepend-icon="phone" placeholder="(000) 000 - 0000"
                              mask="phone"></v-text-field>
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
  data() {
    return {
      // source: 'https://codepen.io/johnjleider/pen/EQOYVV',
      dialog: false,
      items: [
        // 菜单顺序必须和路由匹配
        // { heading: 'Home' },// heading
        {
          icon: 'shopping_basket',
          'icon-alt': 'shopping_basket',
          text: '书架',
          model: false,
          children: [
            {
              icon: 'web_asset',
              text: '嵌入网页'
            },
            {
              icon: 'shopping_basket',
              text: '书架'
            }, {
              icon: 'class',
              text: '阅读器'
            }
          ]
        },
        {icon: 'account_balance', text: 'home'}, // heading
        {icon: 'assignment_turned_in', text: 'plan'}, // 制定计划
        {icon: 'restaurant_menu', text: 'health'}, // 健康记录
        {icon: 'contacts', text: 'About'}, // about
        {icon: 'history', text: 'Photo'}, // photon
        {icon: 'content_copy', text: 'WebSocket'}, // IM
        // { icon: 'help', text: 'Help' }, // help
        {
          // 用户、角色、权限
          icon: 'personal_video',
          'icon-alt': 'personal_video',
          text: 'Admin',
          model: false,
          children: [
            {text: 'Person', icon: 'people'},
            {text: 'Role', icon: 'person'},
            {text: 'Permission', icon: 'how_to_reg'}
          ]
        },
        {
          // children
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Labels',
          model: true, // 展开下拉
          children: [{icon: 'add', text: 'Create label'}]
        },
        {icon: 'settings', text: 'Settings'},
        {icon: 'chat_bubble', text: 'Send feedback'},
        {icon: 'phonelink', text: 'App downloads'},
        {icon: 'keyboard', text: 'Go to the old version'}
      ],
      // 显示左侧栏的按钮
      dispDrawer: true
      // 左侧栏是否显示
      // drawer: false
    }
  },
  created() {
    // 按照顺序映射router和菜单，设置所有菜单的跳转地址，当菜单点击事件触发后则按照地址跳转
    let routerTemp = this.$router.options.routes[2].children
    let pushIndex = 0
    this.items.forEach((ele) => {
      if (ele.children) {
        // 对于子菜单的处理
        ele.children.forEach((e) => {
          // 如果是隐藏路由，跳过
          while (
              routerTemp[pushIndex] != undefined &&
              routerTemp[pushIndex].meta != undefined &&
              routerTemp[pushIndex].meta.hidden != undefined
              ) {
            pushIndex++
          }
          // 仅非隐藏路由和菜单建立映射
          e.to =
              pushIndex > routerTemp.length - 1 ? '/' : routerTemp[pushIndex].path
          pushIndex++
        })
      } else {
        // 如果是隐藏路由，跳过
        while (
            routerTemp[pushIndex] != undefined &&
            routerTemp[pushIndex].meta != undefined &&
            routerTemp[pushIndex].meta.hidden != undefined
            ) {
          pushIndex++
        }
        // 仅非隐藏路由和菜单建立映射
        ele.to =
            pushIndex > routerTemp.length - 1 ? '/' : routerTemp[pushIndex].path
        pushIndex++
      }
    })

    // 进入index页面后，默认跳转到/index/about页面
    // this.$router.push('/index/home')
    // this.drawer = true
  },
  methods: {
    // 菜单的点击事件
    hrefTo(item) {
      this.$router.push(item.to)
    },
    logOut() {
      api.logout().then((res) => {
        console.log(`logout -> ${res.data}`)
        this.$router.push('/login')
      })
    }
  }
}
</script>

