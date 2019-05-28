---
layout: post
title: 优化 Google Chrome 的使用体验
abbrlink: 54be2845
date: 2019-05-27 18:29:11
tags:
  - Chrome
---

# 优化 Google Chrome 的使用体验

## 前言

下面是吾辈在使用 Chrome 遇到的一些不舒服的地方，以及对应的解决方法。一切皆是为了一个目标：**提高浏览器的使用体验！**

> 假若我没有看见光明，我本可以忍受黑暗。

## 字体

在之前吾辈也未曾对字体有过什么注意，直到后来听闻 MacOS 的字体显示比 Windows 上好很多，去看了一下确实如此。想要有一个好看的字体，字体本身极为重要，这里吾辈目前在使用，也很推荐的字体是 [Sarasa Gothic](https://github.com/be5invis/Sarasa-Gothic)。支持 **简中/繁中/英/日** 四种语言，虽然体积稍微庞大，但效果却是相当不错。

Windows 字体预览

![更纱黑体](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190527190659.png)

> 这里也推荐作为编程字体，毕竟程序中同时存在中英文，而一个同时支持中英文的等宽字体实在难得。

## 设置网页默认字体

安装完了字体，然而 Chrome 默认并不会使用它，我们还需要 [Stylus](https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne) 进行指定。

![添加 UserCSS](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190527221308.png)

添加一个新的样式，内容只需要设置所有元素使用的字体为 **Sarasa Mono CL**

```css
/* 全局字体设置 */
* {
  font-family: 'Sarasa Mono CL';
}
/* 强制指定 input 框中的字体 */
input {
  font-family: 'Sarasa Mono CL' !important;
}
```

这时候查看一下字体效果

![效果](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190527221458.png)

## 夜间模式
