---
title: Vue 打包的静态文件不能直接运行
tags:
  - JavaScript
  - VueJS
abbrlink: 7d805fde
date: 2018-10-29 00:00:00
updated: 2018-10-29 00:00:00
---

# Vue 打包的静态文件不能直接运行

## 问题

吾辈使用 **vue-cli** 直接生成的 vue 模板项目，在模板之上继续开发的。然而在使用 `npm run build` 打包项目时，却发现打包好的项目在浏览器中直接打开好像什么都没有？

## 原因

查看了一下打包后的 `index.html` 源码，终于发现了一个重要的点：

![vue-cli 打包的项目 index.html 源码](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20181029131219.png)

_所有涉及到路径的地方全都是以 **/** 开头的_

下面是吾辈打包后生成的 dist 目录

```bash
dist:.
│  index.html
│
└─static
    ├─css
    │      app.b7bce283257fbd427fb1dc3fea80cee1.css
    │      app.b7bce283257fbd427fb1dc3fea80cee1.css.map
    │
    ├─fonts
    │      MaterialIcons-Regular.012cf6a.woff
    │      MaterialIcons-Regular.570eb83.woff2
    │      MaterialIcons-Regular.a37b0c0.ttf
    │      MaterialIcons-Regular.e79bfd8.eot
    │
    └─js
            app.58cce746b2fe4ac2f2b9.js
            app.58cce746b2fe4ac2f2b9.js.map
            manifest.2ae2e69a05c33dfc65f8.js
            manifest.2ae2e69a05c33dfc65f8.js.map
            vendor.a32972498ed8de656202.js
            vendor.a32972498ed8de656202.js.map
```

这下很清楚了，vue-cli 生成的模板项目打包后的文件默认需要放到静态资源服务器上，而且还必须是根目录！这很不好，很糟糕，所以需要修改配置。

## 解决方案

1. 修改文件 _/config/index.js_，将 `build.assetsPublicPath` 属性的值由 `/` 改为 `./`
   ![/config/index.js](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20181029133603.png)
2. 修改文件 _/build/utils.js_，在插件 `ExtractTextPlugin` 中添加 `publicPath: '../../'`
   ![/build/utils.js](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20181029133636.png)

那么，使用 `npm run build` 重新打包后的静态文件应该就可以直接打开啦
