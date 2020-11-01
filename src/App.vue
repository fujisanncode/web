<template>
  <div id="vueapp">
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
      <v-app-bar color="blue darken-3" dark app :clipped-left="$vuetify.breakpoint.lgAndUp" v-if="true">
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
        <v-btn icon @click.stop="loginDialog = !loginDialog">
          <v-icon>power_settings_new</v-icon>
        </v-btn>
        <v-btn icon @click="logOut()">
          <v-icon>power_settings_new</v-icon>
        </v-btn>
        <v-btn icon large>
          <v-avatar size="32px" tile>
            <!-- ./只能找到当前目录的文件，当前目录文件夹只能用../向下找 -->
            <img src="./assets/logo.svg" alt="Vuetify"/>
          </v-avatar>
        </v-btn>
      </v-app-bar>
      <!-- 页脚ICP备案-->
      <v-footer padless app>
        <v-card class="flex" flat tile>
          <v-card-text class="py-2 black--text text-center">
            @{{ new Date().getFullYear() }} fujisann — 皖ICP备20005176号
          </v-card-text>
        </v-card>
      </v-footer>
      <!-- 加载路由-->
      <v-main>
        <router-view></router-view>
      </v-main>
      <!-- 浮动按钮-->
      <v-btn fab bottom right color="pink" dark fixed @click.stop="dialog = !dialog">
        <v-icon>add</v-icon>
      </v-btn>
      <!-- 浮动按钮的弹窗 -->
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
      <!--登入弹窗-->
      <v-dialog v-model="loginDialog" width="400px">
        <v-card>
          <v-card-title class="grey lighten-4 py-4 title">登入</v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field prepend-icon="mail" placeholder="账号"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field prepend-icon="notes" placeholder="密码"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="loginDialog = false">取消</v-btn>
            <v-btn text @click="loginDialog = false">登入</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loginDialog: false,
      // source: 'https://codepen.io/johnjleider/pen/EQOYVV',
      dialog: false,
      // 左侧菜单显示内容，在create中通过顺序和router绑定，拟在此处指定路由名称进行绑定
      // {}
      items: [],
      // 显示左侧栏的按钮
      dispDrawer: true,
      // 定时器
      timer: ''
      // 左侧栏是否显示
      // drawer: false
    }
  },
  created() {
    console.log('Index.vue开始加载......')

    // 如果未加载过菜单，则将后台路由转化为菜单
    if (this.items.length === 0) {
      let start = Date.now()
      // 50ms执行一次定时任务，路由表不为空或超时：则清楚定时任务，并完成路由跳转
      this.timer = setInterval(() => {
        if (this.$store.getters.getRouter.length !== 0) {
          this.buildMenu()
          clearInterval(this.timer)
        } else if (Date.now() - start > 1000) {
          console.log('构建菜单超时')
          this.$router.push('/404')
        }
      }, 50)

    }

    console.log('Index.vue完成加载:' + JSON.stringify(this.items))
  },
  methods: {
    // 构建左侧菜单
    buildMenu() {
      // 将store中路由列表（从后台请求的路由列表）中菜单相关数据提取出来
      let routerList = this.$store.getters.getRouter
      for (let i = 0; i < routerList.length; i++) {
        let e = routerList[i], meta = e.meta
        // 如果是隐藏路由，则不需要被处理为菜单
        if (e.meta.hidden === 'true') {
          continue
        }
        this.items.push({
          to: e.path,
          text: meta.text,
          icon: meta.icon,
          'alt-icon': meta['alt-icon'],
          model: meta.model
        })
      }
      console.log('左侧菜单构建完毕')
    },
    // 菜单的点击事件
    hrefTo(item) {
      this.$router.push(item.to)
    },
    logOut() {
      console.log('登出')
      // api.logout().then((res) => {
      //   console.log(`logout -> ${res.data}`)
      //   this.$router.push('/login')
      // })
    },
    logIn() {
      console.log('登入')
    }
  }
}
</script>

