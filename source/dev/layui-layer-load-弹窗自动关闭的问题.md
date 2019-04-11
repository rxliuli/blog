---
layout: post
title: layui-layer load 弹窗自动关闭的问题
tags:
  - JavaScript
abbrlink: a33a66e4
date: 2019-04-11 16:42:37
---

# layui-layer load 弹窗自动关闭的问题

## 场景

项目中的 Ajax 加载时的 loading 框有时候会关闭了弹窗之后很久页面上的数据才加载出来，而且这个问题是随机出现的，有些页面存在，有些页面则正常。本来吾辈以为是 Vue 页面渲染的锅，结果实际上却是 layer 默认只允许一个活动的 `loading` 弹窗。
单例模式避免无谓的内存浪费是正常的，然而 `close` 函数却只对最后一个弹窗的 id 时生效的。

例如下面这段代码，无论调用多少次 `layer.close(id1)`，页面上的 `loading` 都不会关闭。。。

```js
const id1 = layer.load()
const id2 = layer.load()
layer.close(id1)
layer.close(id1)
// ...
layer.close(id1)
layer.close(id1)
```

> 这里吾辈可以想象到，layer 认为先加载的 `load()` 就应该先被 `close()`，而不考虑到复杂异步的情况。
