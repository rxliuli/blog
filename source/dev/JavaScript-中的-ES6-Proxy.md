---
layout: post
title: JavaScript 中的 ES6 Proxy
abbrlink: c3d52d35
date: 2019-06-14 13:19:35
tags:
  - JavaScript
---

# JavaScript 中的 ES6 Proxy

## 场景

> 就算只是扮演，也会成为真实的自我的一部分。对人类的精神来说，真实和虚假其实并没有明显的界限。入戏太深不是一件好事，但对于你来说并不成立，因为戏中的你才是真正符合你的身份的你。如今的你是真实的，就算一开始你只是在模仿着这种形象，现在的你也已经成为了这种形象。无论如何，你也不可能再回到过去了。

`Proxy` 代理，在 JavaScript 似乎很陌生，却又在生活中无处不在。或许有人在学习 ES6 的时候有所涉猎，但却并未真正了解它的使用场景，平时在写业务代码时也不会用到这个特性。

相比于文绉绉的定义内容，想必我们更希望了解它的使用场景，使其在真正的生产环境发挥强大的作用，而不仅仅是作为一个新的特性 -- **然后，实际中完全没有用到！**

- 为函数添加特定的功能
- 作为胶水桥接不同结构的对象
- 代理对象的访问
- 监视对象的变化

## 为函数添加特定的功能

下面是一个为异步函数自动添加超时功能的高阶函数，我们来看一下它有什么问题

```js
/**
 * 为异步函数添加自动超时功能
 * @param timeout 超时时间
 * @param action 异步函数
 * @returns 包装后的异步函数
 */
function asyncTimeout(timeout, action) {
  return function(...args) {
    return Promise.race([
      Reflect.apply(action, this, args),
      wait(timeout).then(Promise.reject),
    ])
  }
}
```

**一般而言**，上面的代码足以胜任，但问题就在这里，不一般的情况 -- 函数上面包含**自定义属性**呢？
众所周知，JavaScript 中的函数是一等公民，即函数可以被传递，被返回，以及，被添加属性！

例如下面这个简单的函数 `get`，其上有着 `_name` 这个属性

```js
const get = async i => i
get._name = 'get'
```

一旦使用上面的 `asyncTimeout` 函数包裹之后，问题便会出现，返回的函数中 `_name` 属性不见了。这是当然的，毕竟实际上返回的是一个匿名函数。
