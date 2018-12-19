---
layout: post
title: Greasemonkey 踩坑之路
date: 2018-12-19 22:40:04
updated: 2018-12-20
tags: [JavaScript, Greasemonkey, 记录]
---

# Greasemonkey 踩坑之路

- [Greasemonkey 踩坑之路](#greasemonkey-踩坑之路)
  - [场景](#场景)
  - [window 对象不能和外部交换数据](#window-对象不能和外部交换数据)
  - [Greasemonkey API 显示 undefined](#greasemonkey-api-显示-undefined)
  - [内存爆炸](#内存爆炸)

## 场景

最近在玩 `user.js` 脚本，遇到了各种奇怪的问题，便于此处统一记录一下。

## window 对象不能和外部交换数据

场景

在写 user.js 时遇到的一个奇怪的问题，吾辈想要把某些数据添加到 `window` 对象上，方便在 DevTool console 中进行测试。然而却由此印发了一个新的问题，即 `window` 对象不是真正的 `window` 对象的问题。

```js
// ==UserScript==
// @name         Testing
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  用来测试的 userjs 脚本
// @author       rxliuli
// @include     http://*
// @include			https://*
// @grant        MIT
// ==/UserScript==

;(function() {
  'use strict'
  window.onload = function() {
    window.rxliuli = function() {
      console.log('这里是 rxliuli 编写的 user.js 脚本')
    }
    window.rxliuli()
  }
})()
```

控制台正常输出了一句话。然而，当吾辈在 console 中输入 `window.rxliuli` 的结果却是 `undefined`。

---

解决

吾辈估计又是 Greasemonkey 自身的问题，所以不得不去翻了 [Wiki](https://wiki.greasespot.net) 上查找，直到看到了 [Greasemonkey Manual:Environment](https://wiki.greasespot.net/Greasemonkey_Manual:Environment)。里面有这么一段话

> Depending on the usage, the special Greasemonkey environment may seem perfectly normal, or excessively limiting.  
> The Greasemonkey environment is a vanilla XPCNativeWrapper of the content window, with only certain extra bits added in to emulate a normal environment, or changed. Specifically:
>
> - window is an XPCNativeWrapper of the content window.
> - document is the document object of the XPCNativeWrapper window object.
> - XPathResult is added so that document.evaluate() works.
> - Unless the @unwrap metadata imperative is present in the user script header, the entire script is wrapped inside an anonymous function, to guarantee the script's identifiers do not collide with identifiers present in the Mozilla JavaScript sandbox. This function wrapper captures any function definitions and var variable declarations made (e.g. var i = 5;) into the function's local scope. Declarations made without var will however end up on the script's this object, which in Greasemonkey is the global object, contrary to in the normal browser object model, where the window object fills this function. In effect, after i = 5;, the values of window['i'] and window.i remain undefined, whereas this['i'] and this.i will be 5. See also: Global object
> - In order to access variables on the page, use the unsafeWindow object. To use values defined in a script, simply reference them by their names.

大意是 Greasemonkey 为了安全所以 `user.js` 脚本是在沙箱中执行的，并且限制了一些内容。其中就包括了 `window` 对象并非浏览器的原生对象，而是 `XPCNativeWrapper`。  
所以，`XPCNativeWrapper` 是什么。。。？（一个 Greasemonkey 的坑太多了吧 #吐血）  
吾辈找到了两篇文章

- [XPCNat ive Wrapper](https://developer.mozilla.org/zh-TW/docs/XPCNativeWrapper)
- [Use XPCNativeWrapper](http://kb.mozillazine.org/XPCNativeWrapper)

看完之后表示只知道 `XPCNativeWrapper` 是在扩展中用来保护不受信任的对象，并非浏览器客户端本身的 API。

好吧，说了这么多解决方案是什么呢？

答案很简单，其实使用 [unsafeWindow](https://wiki.greasespot.net/UnsafeWindow) 对象就能像使用原生的 `window` 对象行为一致，即便这是不推荐的方法，但有时仍然是必须的！

## Greasemonkey API 显示 undefined

场景

在 [Greasemonkey 手册：API](https://wiki.greasespot.net/Greasemonkey_Manual:API) 写出的 API 有很多都不能正常使用，吾辈打印下来的结果是

```js
// ==UserScript==
// @name         test
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  test
// @match        *
// @author       rxliuli
// @grant        MIT
// ==/UserScript==

;(function() {
  'use strict'

  console.log(GM)
  console.log(GM.info)
  console.log(GM.deleteValue)
  console.log(GM.getValue)
  console.log(GM.listValues)
  console.log(GM.setValue)
  console.log(GM.getResourceUrl)
  console.log(GM.notification)
  console.log(GM.openInTab)
  console.log(GM.setClipboard)
  console.log(GM.setClipboard)
  console.log(unsafeWindow)
})()
```

![Greasemonkey API 显示 undefined](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181219225309.png)

测试环境如下：

- Windows 10 Ltsc
- Chrome 71
- tampermonkey 4.7.44

---

解决

吾辈在翻 [GitHub Issue](https://github.com/sindresorhus/globals/issues/122) 找到了问题所在，原因是这些 API 必须要手动获取准许才行。
即使用 `// @grant GM.[Function]` 来获取需要的 API，所以吾辈的脚本变成了下面这样：

```js
// ==UserScript==
// @name         test
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  test
// @match        *
// @author       rxliuli
// @grant        MIT
// @grant        GM.deleteValue
// @grant        GM.getValue
// @grant        GM.listValues
// @grant        GM.setValue
// @grant        GM.getResourceUrl
// @grant        GM.notification
// @grant        GM.openInTab
// @grant        GM.setClipboard
// ==/UserScript==

;(function() {
  'use strict'
  console.log(GM)
  console.log(GM.info)
  console.log(GM.deleteValue)
  console.log(GM.getValue)
  console.log(GM.listValues)
  console.log(GM.setValue)
  console.log(GM.getResourceUrl)
  console.log(GM.notification)
  console.log(GM.openInTab)
  console.log(GM.setClipboard)
  console.log(GM.setClipboard)
  console.log(unsafeWindow)
})()
```

问题解决了，现在，所有的 API 都有值了。

![GM API 都有值了](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181219225919.png)

## 内存爆炸

场景

使用了 `GM.setValue()/GM.getValue()` 两个 API，结果内存分分钟爆炸。吾辈安装 Chrome 以来第一次碰到加载网页能把内存耗尽的情况，果然 GM 的限制不是没有道理的呢  
![内存爆炸](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181220002112.png)  
![浏览器崩溃](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181220013001.png)

```js
// ==UserScript==
// @name         Testing
// @namespace    http://tampermonkey.net/
// @match        *
// @version      0.1
// @description  用来测试的 userjs 脚本
// @author       rxliuli
// @grant        GM.getValue
// @grant        GM.setValue
// ==/UserScript==

;(function() {
  'use strict'

  var domains = {
    domainsName: 'domains',
    async list() {
      var valueStr = GM.getValue(this.domainsName)
      if (!valueStr) {
        return null
      }
      try {
        return JSON.parse(valueStr)
      } catch (err) {
        var defaultArr = []
        await this.set(defaultArr)
        return defaultArr
      }
    },
    async set(arr) {
      await GM.setValue(this.domainsName, JSON.stringify(arr))
      return this.list()
    }
  }

  async function init() {
    var arr = new Array(0).fill(0).map((v, i) => i)
    var result = await domains.set(arr)
    console.log(result)
  }

  init()
})()
```

---

解决方案

Debug 之后发现是调用 `GM.setValue()` 没有使用 `await` 造成的异步请求数量不断积累最终导致网页崩溃。果然 Promise 什么的还是要小心一点好呀  
当然，不信的话你也可以新建一个 `user.js` 脚本尝试一下内存爆炸的感觉咯

> 递归不是主要问题，吾辈 PC 上的 Chrome 最多到 1.4w+ 次递归就会抛出异常（网页没有崩溃），所以递归不是主要问题呀
