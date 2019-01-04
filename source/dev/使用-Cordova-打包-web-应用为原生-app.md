<!-- ---
title: 使用 Cordova 打包 web 应用为原生 app
date: 2018-10-16 23:33:24
tags: 大前端
--- -->

# 使用 Cordova 打包 web 应用为 android app

## 简介

> [官网](https://cordova.apache.org/), [GitHub](https://github.com/apache/cordova-cli)

又是 Apache 家的工具包。咦，吾辈为什么要说又？（Maven/Tomcat：盯。。。）。一个能将 web 应用（html/css/js）打包成原生的 app，并且，是跨平台的。

## 环境要求

- [JDK8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)：安卓开发必须 JDK。[安装参考](https://blog.rxliuli.com/2018/10/17/java/windows%20%E4%B8%8A%E5%AE%89%E8%A3%85%20jdk%20%E5%B9%B6%E8%AE%BE%E7%BD%AE%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F/)
- [Gradle 构建工具](https://gradle.org)：Android 官方构建工具。[安装参考](https://blog.rxliuli.com/2018/11/16/java/windows-%E4%B8%8B%E5%AE%89%E8%A3%85-gradle/)
- [Android SDK](https://developer.android.com/studio/)：Android App 所必须的一些工具/依赖。[安装参考](.)
- [NodeJS](https://nodejs.org/zh-cn)：前端一把梭的基础。[安装参考](.)
- [Cordova](https://cordova.apache.org)：构建跨平台 App 的 npm 库。[安装参考](.)
