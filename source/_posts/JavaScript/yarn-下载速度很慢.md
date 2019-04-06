---
layout: post
title: yarn 下载速度很慢
tags:
  - JavaScript
  - yarn
abbrlink: 68eef0ee
date: 2019-04-06 22:55:36
---

# yarn 下载速度很慢

## 场景

虽然 yarn 默认使用缓存策略，然而由于众所周知的原因，初次下载时还是非常慢，所以还是需要设置代理，此处做一下记录。

## 设置代理

```sh
yarn config set proxy http://127.0.0.1:1080
yarn config set https-proxy http://127.0.0.1:1080
```

如果某一天不需要了，也可以删除

```sh
yarn config delete proxy
yarn config delete https-proxy
```

## 项目配置

有人提到了一种有趣的方法，在项目根目录下添加 _.npmrc_ 配置文件指定仓库地址为淘宝镜像，相当于项目级别的配置吧

```sh
registry=https://registry.npm.taobao.org
```
