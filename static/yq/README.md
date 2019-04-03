
## 简介

`bw_base` 是bw模版集成解决方案，它基于 [Vue.js](https://github.com/vuejs/vue) 
内置了i18国际化解决方案，动态路由，权限验证等很多功能特性
业务逻辑，单独抽出来，改版时不需要过于纠结业务逻辑
有助于快速切图做站，而不必考虑兼容性，缓存等体力活

**注意：该项目使用 vue2.0 ，浏览器最低兼容IE8

## 前序准备

你的本地环境需要安装 [node](http://nodejs.org/) 。
我们的技术栈基于：
 [ES2015+](http://es6.ruanyifeng.com/)、
 [vue](https://cn.vuejs.org/index.html)、
 [vuex](https://vuex.vuejs.org/zh-cn/) 、
 [vue-router](https://router.vuejs.org/zh-cn/) 、
 [axios](https://www.kancloud.cn/yunye/axios/234845)、
 [Mock.js](https://github.com/nuysoft/Mock)模拟数据请求(需要配置，直接使用线上接口也可以)，提前了解和学习这些知识会对使用本项目有很大的帮助。

同时配套一个系列的教程文章在内部论坛，如何从零构建后一个webapp项目，新手建议大家先看完这些文章再来实践本项目

## 功能
  - 页面权限验证
  - 国际化多语言
  - 本地mock数据
  - Clipboard(剪贴复制)
  - 正则过滤
  - 错误日志
  - 集成网站分析功能（GOOGLE，百度，站长）

## 开发
# 克隆项目
git clone (giturl)

# 安装依赖
npm install
   
# 建议不要用cnpm安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install

# 本地开发启动服务
npm run dev
浏览器访问 http://localhost:9527

## 发布
# 构建测试环境
npm run build:sit

# 构建线上生成环境
npm run build:prod

## 其它
npm run build:prod --report

npm run build:prod --preview

# 检查文件格式
npm run lint

# 自动修复文件格式
npm run lint -- --fix

# 服务器如果用nginx需要做如下配置：

Copyright (c) 2018-ITGO
