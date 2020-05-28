const webpack = require('webpack')
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: { //配置跨域
      '/vue': {
        // target: 'http://localhost:8081',
        target: 'http://fujisann.ink:8081',
        ws: true,
        changOrigin: true //允许跨域
        // pathRewrite: {
        //     '^/api': ''//请求的时候使用这个api就可以
        // }
      }

    }
  },
  // 修复edge不兼容vuetify.js
  transpileDependencies: ['vuetify']
}