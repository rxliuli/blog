---
layout: post
title: 基于 nodejs 的热更新 http 开发服务器
date: 2019-02-20
tags: [NodeJS]
---

# 基于 nodejs 的热更新 http 开发服务器

## 场景

之前一直在使用 [http-server](https://www.npmjs.com/package/http-server) 作为本地快速启动静态 http 服务器的命令行工具，然而直到今天，吾辈实在难以忍受其在修改完 `HTML` 文件后，http-server 不会自动刷新浏览器重新渲染页面，而是需要我们手动刷新才行，真的是不厌其烦，所以吾辈开始找更好的工具。

> 注：http-server 其实也已经热更新到内存中了，只不过不会触发浏览器刷新页面。

## 期望

- [x] 零配置使用
- [x] 修改文件保存后将自动触发浏览器刷新页面
- [x] 基于 nodejs 开发
- [ ] 允许特定的配置

## 结果

前端页面热更新

- [live-server](https://www.npmjs.com/search?q=live-server): 自带热更新并启动即打开浏览器的 http 开发服务器
- [anywhere](https://www.npmjs.com/package/anywhere): 与上面的 live-server 类似（由国人开发，已经一年没有更新了）

nodejs 热更新

- [nodemon](https://www.npmjs.com/package/nodemon): 文件修改后自动重启 nodejs 程序
- [supervisor](https://www.npmjs.com/package/supervisor): nodejs 程序运行管理器，包含热更新功能（两年没有更新了）

VSCode 插件

- [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer): VSCode 中的插件，可以将任何一个 HTML 当作 web 程序打开，并自带热更新
