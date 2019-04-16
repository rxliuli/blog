---
layout: post
title: 解决 npm 下载速度过慢
tags:
  - JavaScript
  - npm
  - 教程
abbrlink: dc4699e0
date: 2018-12-21 01:23:30
updated: 2018-12-21 01:23:30
---

# 解决 npm 下载速度过慢

## 场景

由于 [墙](https://zh.wikipedia.org/wiki/%E9%98%B2%E7%81%AB%E9%95%BF%E5%9F%8E) 的存在，所以我们使用 npm 下载依赖时会很慢，不解决的话实在是难以忍受 200k 的下载速度。。。

## 使用代理

以 `SSR` 的本地 `http` 代理为例

```sh
npm config set proxy http://127.0.0.1:1080
npm config set https-proxy http://127.0.0.1:1080
```

## 使用国内镜像

以 taobao 的 npm 镜像为例

- 临时使用  
  `npm [你需要执行的命令] --registry https://registry.npm.taobao.org`
- 永久设置  
  `npm config set registry https://registry.npm.taobao.org`
- 或者使用 cnpm  
  `npm install -g cnpm --registry=https://registry.npm.taobao.org`
  > 不推荐使用该方法，cnpm 下载的依赖包很奇怪，和 npm 下载的并不一样呢

## 总结

吾辈个人还是推荐使用代理啦，当然如果你没有稳定梯子却是不得不用国内镜像了呢
