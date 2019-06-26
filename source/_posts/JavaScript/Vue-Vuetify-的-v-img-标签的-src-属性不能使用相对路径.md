---
title: Vue Vuetify 的 v-img 标签的 src 属性不能使用相对路径
tags:
  - JavaScript
  - VueJS
  - Vuetify
abbrlink: 4bfec1fa
date: 2018-11-01 10:13:19
updated: 2018-11-01 10:13:19
---

# Vue Vuetify 的 v-img 标签的 src 属性不能使用相对路径

## 场景

吾辈在使用 Vuetify 时突然遇到的，明明 `img` 标签就可以使用相对路径获取到图片，而 Veutify 的组件 `v-img` 却不能使用。

如下面 3 种加载图片的方式

```html
<!-- 正常加载 -->
<v-img :src="require('../../assets/logo.png')" />
<!-- 无法加载 -->
<v-img src="../../assets/logo.png" />
<!-- 正常加载 -->
<img src="../../assets/logo.png" />
```

> 吾辈在 [segmentfault](https://segmentfault.com/q/1010000016871400) 上的提问

## 原因

是的，居然必须用 `require()` 引入图片才能生效，那为什么 `img` 标签可以直接使用相对路径呢？这和 [vue-loader 资源路径处理](https://vue-loader-v14.vuejs.org/zh-cn/configurations/asset-url.html) 有关系。

![官方资源路径处理](https://img.rxliuli.com/20181101130706.png)

官方明确指出会将所有资源路径作为模块依赖，也就是后台 `vue-loader` 帮我们转换成 `require()` 的形式了。

## 解决方案

那么，Veutify 组件中的 `src` 不能使用相对路径的原因就很明确了。因为 `vue-loader` 并不知道我们要把 `v-img` 的 `src` 属性转换成 `require()` 依赖。我们找到 `vue-loader` 配置处，在 `options.transformToRequire` 中加上 `v-img` 即可

```js
// vuetify 框架的 src 标签也需要自动转换为 require
'v-img': 'src'
```

吾辈的配置文件在 _build > vue-loader.conf.js_

![vue-loader 配置文件](https://img.rxliuli.com/20181101131408.png)

> [vue-loader 官方文档参考](https://vue-loader-v14.vuejs.org/zh-cn/options.html#transformtorequire)

然后重启 `npm run dev` 刷新一下就行啦
