# fujisann
## 项目简介
### 项目结构
1. 页面：vuejs + vuetify
2. 后台：java + mysql + redis + rabbitmq
3. 部署：nginx + supervisor
### 访问地址
1. http://fujisann.ink

## 项目启动
### 安装依赖
```
npm install
```
### 启动服务端
```
npm run serve
```
### 打包
```
npm run build
```
### 运行单元测试
```
npm run test
```
### 检查语法
```
npm run lint
```
### 自定义配置
See [Configuration Reference](https://cli.vuejs.org/config/).


## 更新日志
### 2020.10
1. 引入pdf.js
2.

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

