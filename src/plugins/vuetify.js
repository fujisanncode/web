// ui 组件 vuetify
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
Vue.use(Vuetify)
import zhHans from 'vuetify/es5/locale/zh-Hans'
import colors from 'vuetify/lib/util/colors'

// 引用自定义图标文件
import '@/assets/icon/markdown/iconfont.css'
import MyIcon from '@/components/icon/icon.vue'

const vuetify =  new Vuetify({
  icons: {
    iconfont: 'mdi', // mdi表示material-design-icon图标库
    values: { // 自定义图标
      markdown: {
        component: MyIcon
      },
    },
  },
  theme: {
    dark: false,
  },
  themes: {
    light: {
      primary: colors.red.darken1, // #E53935
      secondary: colors.red.lighten4, // #FFCDD2
      accent: colors.indigo.base, // #3F51B5
    }
  },
  lang: {
    locales: { zhHans },
    current: 'zh-Hans'
  }
})

// Vue.use(VuetifyToast, { $vuetify: vuetify.framework })
export default vuetify
