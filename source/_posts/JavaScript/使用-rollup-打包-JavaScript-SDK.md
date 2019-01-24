---
layout: post
title: 使用 rollup 打包 JavaScript SDK
date: 2019-01-24 12:43:57
tags: [JavaScript, 记录]
---

# 使用 rollup 打包 JavaScript SDK

## 场景

### 为什么要使用打包工具？

如果我们想要写一个 `JavaScript SDK`，那么就不太可能将所有的代码都写到同一个 js 文件中。当然了，想做的话的确可以做到，但随着 `JavaScript SDK` 内容的增加，一个 js 文件容易造成开发冲突，以及测试上的困难，这也是现代前端基本上都依赖于打包工具的原因。

### 为什么打包工具是 rollup？

现今最流行的打包工具是 [webpack](https://webpack.js.org/)，然而事实上对于单纯的打包 JavaScript SDK 而言 webpack 显得有些太重了。webpack 终究是用来整合同步类型的资源而产生的（`ReactJS/VueJS/Babel/TypeScript/Stylus`），对于纯 JavaScript 库而言其实并没有必要使用如此 **强大** 的工具。而 rollup 就显得小巧精致，少许配置就能立刻打包了。

## 步骤

### 前置条件

### 使用 rollup 直接打包

### 使用 babel 转换 ES5

### 使用 uglify 压缩生产环境代码

### 使用 ESLint 检查代码

### 多环境打包

### 添加压缩代码映射文件
