---
title: Chrome 踩坑笔记
date: 2018-10-11
tags: [工具]
---

# Chrome 踩坑笔记

## Chrome 右键翻译不能使用

> 2018-10-11

### 原因

其实是 SwitchyOmega 这个插件，之前一直没出过问题，结果现在 Chrome69 出现了。Chrome 浏览器右键翻译的 API 和 Google 翻译网页版使用的不是同一个！

- Google 网页版：<https://translate.google.com>
- Google Chrome：<https://translate.googleapis.com>

结果就出现了 Google 翻译网页版明明能正常使用，但 Chrome 浏览器右键翻译功能就是不行的奇怪现象。

### 解决方案

直接访问 <https://translate.googleapis.com>，嗯，访问失败了。然后设置这个域名使用代理就好了，正常情况下应该显示 404，并不是错误。
