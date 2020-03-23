import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// Vuetify 样式
// import 'vuetify/dist/vuetify.min.css'
// vuetify1.5
// import 'vuetify/src/stylus/app.styl'
// import 'vuetify/src/styles/main.sass'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);
export default new Vuetify({
  icons: {
    iconfont: 'mdi'
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
