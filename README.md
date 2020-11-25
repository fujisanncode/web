# [富士山の小さな宇宙](http://fujisann.ink)
## 项目简介
### 项目结构

1. 页面：vuejs + vuetify
2. 后台：java + mysql + redis + rabbitmq
3. 部署：nginx + supervisor

### 项目启动
```shell
# 安装依赖
npm install
# 启动服务端
npm run serve
# 打包
npm run build
# 运行单元测试
npm run test
# 检查语法
npm run lint
# 更新npm，windows下必须重新下载安装包
npm install -g npm
```
### 自定义配置

See [Configuration Reference](https://cli.vuejs.org/config/).



## 更新日志

### 2020.11
1. 引入md5编辑器[vidtor](https://b3log.org/vditor/)，编辑器支持所见即所得模式，类似md编辑器Typora
2. 通过cdn方式引用富文本编辑器[froala-editor](https://github.com/froala/vue-froala-wysiwyg/)
   1. js通过cdn引用：index中引用，本地安装，main.js中引用，webpack中排除；需要本地安装，否则会报错，webpack中排除即可
   2. css通过cdn引用：index中引用；不需要本地安装，不需要再main.js中引用，不需要再webpack中排除
   3. pkdg版本为付费版，功能强大，未激活会存在水印；免费版本功能少，例如没有图片功能，没有水印
3. froala-editor解决未付费水印的问题，[参考](https://www.cnblogs.com/bremm/p/12792321.html)
   1. 修改后的文件不能通过三方CDN引用，则放到nginx中，并且通过CDN加速nginx文件的访问
4. vuetifyjs通过npm install 的方式引用，需要引用vuetify.framework解决全局弹窗报错的问题
5. 分析webpack打包各依赖体积，使用工具[Webpack Bundle Analyzer插件](https://segmentfault.com/a/1190000017716736)

### 2020.10
1. 引入pdf.js

### 很早之前
1. <u>npm info vuetify</u> 查看vuetify最新版本信息
2. v-file-input重复触发change事件的[bug](https://github.com/vuetifyjs/vuetify/issues/8167)
3. 通过npm 安装vue
```shell
npm install -g @vue/cli
npm --version
npm uninstall @vue/cli -g
```
4. 安装vue后通过，启动vue控制台
```shell
vue ui
```
5. 安装ncu，通过ncu更新依赖
```shell
npm install npm-check-updates -g
# 查看需要更新的依赖
ncu
# 更新所有依赖
ncu -u
```
6. 通过上述命令更新vue中依赖，或者通过vue ui更新依赖，否则通过更改package.json修改依赖版本，会导致vuetify的更新不能在项目中生效，为什么？？？
7.安装淘宝依赖源cnpm，下载依赖更快 
```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org 安
```
8. core-js报错，降低core-js版本
9. 安装font-awesome
```shell
npm install font-awesome --save 
```

