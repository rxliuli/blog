---
layout: post
title: 使用 Greasemonkey 解除网页复制粘贴限制
date: 2018-12-23 15:10:04
tags: [JavaScript, Greasemonkey]
---

# 使用 Greasemonkey 解除网页复制粘贴限制

## 场景

在浏览网页时经常会出现的一件事，当我想要复制，突然发现复制好像没用了？（[知乎禁止转载的文章](https://www.zhihu.com/question/23994286)）亦或者是复制的最后多出了一点内容（[简书](https://www.jianshu.com/p/0a85e4c7d3d3)），或者干脆直接不能选中了（[360doc](http://www.360doc.cn)）。粘贴时也有可能发现一直粘贴不了（[支付宝登录](https://auth.alipay.com/login/index.htm)）。

## 问题

欲先制敌，必先惑敌。想要解除复制粘贴的限制，就必须要清楚它们是如何实现的。不管如何，浏览器上能够运行的都是 JavaScript，它们都是使用 JavaScript 实现的。实现方式大致都是监听相应的事件（例如 `onkeydown` 监听 `Ctrl-C`），然后做一些特别的操作。

例如屏蔽复制功能只需要一句代码

```js
document.oncopy = event => false
```

是的，只要返回了 false，那么 copy 就会失效。还有一个更讨厌的方式，直接在 `body` 元素上加行内事件

```html
<body oncopy="javascript: return false" />
```

## 解决

可以看出，一般都是使用 JavaScript 在相应事件中返回 false，来阻止对应事件。那么，既然事件都被阻止了，是否意味着我们就束手无策了呢？吾辈所能想到的大致有三种方向

- 使用 JavaScript 监听事件并自行实现复制/剪切/粘贴功能
  - 优点：实现完成后不管是任何网站都能使用，并且不会影响到监听之外的事件，也不会删除监听的同类型事件，可以解除浏览器本身的限制（密码框禁止复制）
  - 缺点：某些功能自行实现难度很大，例如选择文本
- 重新实现 `addEventListener` 然后删除掉网站自定义的事件
  - 优点：事件生效范围广泛，通用性高，不仅 _复制/剪切/粘贴_，其他类型的事件也可以解除
  - 缺点：实现起来需要替换 `addEventListener` 事件**够早**，对浏览器默认操作不会生效（密码框禁止复制），而且某些网站也无法破解
- 替换元素并删除 DOM 上的事件属性
  - 优点：能够确保网站 js 的限制被解除，通用性高，事件生效范围广泛
  - 缺点：可能影响到其他类型的事件，复制节点时不会复制使用 `addEventListener` 添加的事件
    > 注：该种方法不予演示，缺陷实在过大

总之，如果真的想接触 **限制**，恐怕需要两种方式并用才可以呢

## 使用 JavaScript 监听事件并自行实现复制/剪切/粘贴功能

### 实现强制复制

思路

1. 冒泡监听 `copy` 事件
2. 获取当前选中的内容
3. 设置剪切版的内容
4. 阻止默认事件处理

```js
// 强制复制
document.addEventListener(
  'copy',
  event => {
    event.clipboardData.setData(
      'text/plain',
      document.getSelection().toString()
    )
    // 阻止默认的事件处理
    event.preventDefault()
  },
  true
)
```

### 实现强制剪切

思路

1. 冒泡监听 `cut` 事件
2. 获取当前选中的内容
3. 设置剪切版的内容
4. 如果是可编辑内容要删除选中部分
5. 阻止默认事件处理

> 可以看到唯一需要增加的就是需要额外处理可编辑内容了，然而代码量瞬间爆炸了哦

```js
/**
 * 字符串安全的转换为小写
 * @param {String} str 字符串
 * @returns {String} 转换后得到的全小写字符串
 */
function toLowerCase(str) {
  if (!str || typeof str !== 'string') {
    return str
  }
  return str.toLowerCase()
}

/**
 * 判断指定元素是否是可编辑元素
 * 注：可编辑元素并不一定能够进行编辑，例如只读的 input 元素
 * @param {Element} el 需要进行判断的元素
 * @returns {Boolean} 是否为可编辑元素
 */
function isEditable(el) {
  var inputEls = ['input', 'date', 'datetime', 'select', 'textarea']
  return (
    el && (el.isContentEditable || inputEls.includes(toLowerCase(el.tagName)))
  )
}

/**
 * 获取输入框中光标所在位置
 * @param  {Element} el 需要获取的输入框元素
 * @returns {Number} 光标所在位置的下标
 */
function getCusorPostion(el) {
  return el.selectionStart
}

/**
 * 设置输入框中选中的文本/光标所在位置
 * @param {Element} el 需要设置的输入框元素
 * @param {Number} start 光标所在位置的下标
 * @param {Number} {end} 结束位置，默认为输入框结束
 */
function setCusorPostion(el, start, end = start) {
  el.focus()
  el.setSelectionRange(start, end)
}

/**
 * 在指定范围内删除文本
 * @param {Element} el 需要设置的输入框元素
 * @param {Number} {start} 开始位置，默认为当前选中开始位置
 * @param {Number} {end} 结束位置，默认为当前选中结束位置
 */
function removeText(el, start = el.selectionStart, end = el.selectionEnd) {
  // 删除之前必须要 [记住] 当前光标的位置
  var index = getCusorPostion(el)
  var value = el.value
  el.value = value.substr(0, start) + value.substr(end, value.length)
  setCusorPostion(el, index)
}

// 强制剪切
document.addEventListener(
  'cut',
  event => {
    event.clipboardData.setData(
      'text/plain',
      document.getSelection().toString()
    )
    // 如果是可编辑元素还要进行删除
    if (isEditable(event.target)) {
      removeText(event.target)
    }
    event.preventDefault()
  },
  true
)
```

### 实现强制粘贴

1. 冒泡监听 `focus/blur`，以获得最后一个获得焦点的可编辑元素
2. 冒泡监听 `paste` 事件
3. 获取剪切版的内容
4. 获取最后一个获得焦点的可编辑元素
5. 删除当前选中的文本
6. 在当前光标处插入文本
7. 阻止默认事件处理

```js
/**
 * 获取到最后一个获得焦点的元素
 */
var getLastFocus = (lastFocusEl => {
  document.addEventListener(
    'focus',
    event => {
      lastFocusEl = event.target
    },
    true
  )
  document.addEventListener(
    'blur',
    event => {
      lastFocusEl = null
    },
    true
  )
  return () => lastFocusEl
})(null)

/**
 * 字符串安全的转换为小写
 * @param {String} str 字符串
 * @returns {String} 转换后得到的全小写字符串
 */
function toLowerCase(str) {
  if (!str || typeof str !== 'string') {
    return str
  }
  return str.toLowerCase()
}

/**
 * 判断指定元素是否是可编辑元素
 * 注：可编辑元素并不一定能够进行编辑，例如只读的 input 元素
 * @param {Element} el 需要进行判断的元素
 * @returns {Boolean} 是否为可编辑元素
 */
function isEditable(el) {
  var inputEls = ['input', 'date', 'datetime', 'select', 'textarea']
  return (
    el && (el.isContentEditable || inputEls.includes(toLowerCase(el.tagName)))
  )
}

/**
 * 获取输入框中光标所在位置
 * @param  {Element} el 需要获取的输入框元素
 * @returns {Number} 光标所在位置的下标
 */
function getCusorPostion(el) {
  return el.selectionStart
}

/**
 * 设置输入框中选中的文本/光标所在位置
 * @param {Element} el 需要设置的输入框元素
 * @param {Number} start 光标所在位置的下标
 * @param {Number} {end} 结束位置，默认为输入框结束
 */
function setCusorPostion(el, start, end = start) {
  el.focus()
  el.setSelectionRange(start, end)
}

/**
 * 在指定位置后插入文本
 * @param {Element} el 需要设置的输入框元素
 * @param {String} value 要插入的值
 * @param {Number} {start} 开始位置，默认为当前光标处
 */
function insertText(el, text, start = getCusorPostion(el)) {
  var value = el.value
  el.value = value.substr(0, start) + text + value.substr(start)
  setCusorPostion(el, start + text.length)
}

/**
 * 在指定范围内删除文本
 * @param {Element} el 需要设置的输入框元素
 * @param {Number} {start} 开始位置，默认为当前选中开始位置
 * @param {Number} {end} 结束位置，默认为当前选中结束位置
 */
function removeText(el, start = el.selectionStart, end = el.selectionEnd) {
  // 删除之前必须要 [记住] 当前光标的位置
  var index = getCusorPostion(el)
  var value = el.value
  el.value = value.substr(0, start) + value.substr(end, value.length)
  setCusorPostion(el, index)
}

// 强制粘贴
document.addEventListener(
  'paste',
  event => {
    // 获取当前剪切板内容
    var clipboardData = event.clipboardData
    var items = clipboardData.items
    var item = items[0]
    if (item.kind !== 'string') {
      return
    }
    var text = clipboardData.getData(item.type)
    // 获取当前焦点元素
    // 粘贴的时候获取不到焦点？
    var focusEl = getLastFocus()
    // input 居然不是 [可编辑] 的元素？
    if (isEditable(focusEl)) {
      removeText(focusEl)
      insertText(focusEl, text)
      event.preventDefault()
    }
  },
  true
)
```

### 总结

脚本全貌

```js
;(function() {
  'use strict'

  /**
   * 两种思路：
   * 1. 自己实现
   * 2. 替换元素
   */

  /**
   * 获取到最后一个获得焦点的元素
   */
  var getLastFocus = (lastFocusEl => {
    document.addEventListener(
      'focus',
      event => {
        lastFocusEl = event.target
      },
      true
    )
    document.addEventListener(
      'blur',
      event => {
        lastFocusEl = null
      },
      true
    )
    return () => lastFocusEl
  })(null)

  /**
   * 字符串安全的转换为小写
   * @param {String} str 字符串
   * @returns {String} 转换后得到的全小写字符串
   */
  function toLowerCase(str) {
    if (!str || typeof str !== 'string') {
      return str
    }
    return str.toLowerCase()
  }

  /**
   * 字符串安全的转换为大写
   * @param {String} str 字符串
   * @returns {String} 转换后得到的全大写字符串
   */
  function toUpperCase(str) {
    if (!str || typeof str !== 'string') {
      return str
    }
    return str.toUpperCase()
  }

  /**
   * 判断指定元素是否是可编辑元素
   * 注：可编辑元素并不一定能够进行编辑，例如只读的 input 元素
   * @param {Element} el 需要进行判断的元素
   * @returns {Boolean} 是否为可编辑元素
   */
  function isEditable(el) {
    var inputEls = ['input', 'date', 'datetime', 'select', 'textarea']
    return (
      el && (el.isContentEditable || inputEls.includes(toLowerCase(el.tagName)))
    )
  }

  /**
   * 获取输入框中光标所在位置
   * @param  {Element} el 需要获取的输入框元素
   * @returns {Number} 光标所在位置的下标
   */
  function getCusorPostion(el) {
    return el.selectionStart
  }

  /**
   * 设置输入框中选中的文本/光标所在位置
   * @param {Element} el 需要设置的输入框元素
   * @param {Number} start 光标所在位置的下标
   * @param {Number} {end} 结束位置，默认为输入框结束
   */
  function setCusorPostion(el, start, end = start) {
    el.focus()
    el.setSelectionRange(start, end)
  }

  /**
   * 在指定位置后插入文本
   * @param {Element} el 需要设置的输入框元素
   * @param {String} value 要插入的值
   * @param {Number} {start} 开始位置，默认为当前光标处
   */
  function insertText(el, text, start = getCusorPostion(el)) {
    var value = el.value
    el.value = value.substr(0, start) + text + value.substr(start)
    setCusorPostion(el, start + text.length)
  }

  /**
   * 在指定范围内删除文本
   * @param {Element} el 需要设置的输入框元素
   * @param {Number} {start} 开始位置，默认为当前选中开始位置
   * @param {Number} {end} 结束位置，默认为当前选中结束位置
   */
  function removeText(el, start = el.selectionStart, end = el.selectionEnd) {
    // 删除之前必须要 [记住] 当前光标的位置
    var index = getCusorPostion(el)
    var value = el.value
    el.value = value.substr(0, start) + value.substr(end, value.length)
    setCusorPostion(el, index)
  }

  // 强制复制
  document.addEventListener(
    'copy',
    event => {
      event.clipboardData.setData(
        'text/plain',
        document.getSelection().toString()
      )
      event.preventDefault()
    },
    true
  )

  // 强制剪切
  document.addEventListener(
    'cut',
    event => {
      event.clipboardData.setData(
        'text/plain',
        document.getSelection().toString()
      )
      // 如果是可编辑元素还要进行删除
      if (isEditable(event.target)) {
        removeText(event.target)
      }
      event.preventDefault()
    },
    true
  )

  // 强制粘贴
  document.addEventListener(
    'paste',
    event => {
      // 获取当前剪切板内容
      var clipboardData = event.clipboardData
      var items = clipboardData.items
      var item = items[0]
      if (item.kind !== 'string') {
        return
      }
      var text = clipboardData.getData(item.type)
      // 获取当前焦点元素
      // 粘贴的时候获取不到焦点？
      var focusEl = getLastFocus()
      // input 居然不是 [可编辑] 的元素？
      if (isEditable(focusEl)) {
        removeText(focusEl)
        insertText(focusEl, text)
        event.preventDefault()
      }
    },
    true
  )

  function selection() {
    var dom
    document.onmousedown = event => {
      dom = event.target
      // console.log('点击: ', dom)
      debugger
      console.log('光标所在处: ', getCusorPostion(dom))
    }
    document.onmousemove = event => {
      console.log('移动: ', dom)
    }
    document.onmouseup = event => {
      console.log('松开: ', dom)
    }
  }
})()
```

## 重新实现 `addEventListener` 然后删除掉网站自定义的事件

> 该实现来自 <https://greasyfork.org/en/scripts/41075>，几乎完美实现了解除限制的功能

```js
// ==UserScript==
// @namespace         https://www.github.com/Cat7373/remove-web-limits/
// @name              网页限制解除（精简优化版）
// @description       解除大部分网站禁止复制、剪切、选择文本、右键菜单的限制。
// @homepageURL       https://github.com/xinggsf/gm/
// @supportURL        https://github.com/Cat7373/remove-web-limits/issues/
// @author            Cat73  xinggsf
// @version           1.5.5
// @license           LGPLv3
// @include           https://www.zhihu.com/*
// @include           https://www.bilibili.com/read/*

// @include           *://b.faloo.com/*
// @include           *://bbs.coocaa.com/*
// @include           *://book.hjsm.tom.com/*
// @include           *://book.zhulang.com/*
// @include           *://book.zongheng.com/*
// @include           *://book.hjsm.tom.com/*
// @include           *://chokstick.com/*
// @include           *://chuangshi.qq.com/*
// @include           *://yunqi.qq.com/*
// @include           *://city.udn.com/*
// @include           *://cutelisa55.pixnet.net/*
// @include           *://huayu.baidu.com/*
// @include           *://tiyu.baidu.com/*
// @include           *://yd.baidu.com/*
// @include           *://yuedu.baidu.com/*
// @include           *://imac.hk/*
// @include           https://life.tw/*
// @include           *://luxmuscles.com/*
// @include           *://read.qidian.com/*
// @include           *://www.15yan.com/*
// @include           *://www.17k.com/*
// @include           *://www.18183.com/*
// @include           *://www.360doc.com/*
// @include           *://www.eyu.com/*
// @include           *://www.hongshu.com/*
// @include           *://www.coco01.com/*
// @include           *://news.missevan.com/*
// @include           *://www.hongxiu.com/*
// @include           *://www.imooc.com/*
// @include           *://www.readnovel.com/*
// @include           *://www.tadu.com/*
// @include           *://www.jjwxc.net/*
// @include           *://www.xxsy.net/*
// @include           *://www.z3z4.com/*
// @include           *://yuedu.163.com/*
// @grant             GM_addStyle
// @run-at            document-start
// @updateUrl    https://raw.githubusercontent.com/xinggsf/gm/master/Remove%20web%20limits.user.js
// ==/UserScript==

'use strict'
// 域名规则列表
const rules = {
  plus: {
    name: 'default',
    hook_eventNames: 'contextmenu|select|selectstart|copy|cut|dragstart',
    unhook_eventNames: 'mousedown|mouseup|keydown|keyup',
    dom0: true,
    hook_addEventListener: true,
    hook_preventDefault: true,
    add_css: true
  }
}

const returnTrue = e => true
// 获取目标域名应该使用的规则
const getRule = host => {
  return rules.plus
}
const dontHook = e => !!e.closest('form')
// 储存被 Hook 的函数
const EventTarget_addEventListener = EventTarget.prototype.addEventListener
const document_addEventListener = document.addEventListener
const Event_preventDefault = Event.prototype.preventDefault
// 要处理的 event 列表
let hook_eventNames, unhook_eventNames, eventNames

// Hook addEventListener proc
function addEventListener(type, func, useCapture) {
  let _addEventListener =
    this === document ? document_addEventListener : EventTarget_addEventListener
  if (!hook_eventNames.includes(type)) {
    _addEventListener.apply(this, arguments)
  } else {
    _addEventListener.apply(this, [type, returnTrue, useCapture])
  }
}

// 清理或还原DOM节点的onxxx属性
function clearLoop() {
  let type,
    prop,
    c = [document, document.body, ...document.getElementsByTagName('div')],
    // https://life.tw/?app=view&no=746862
    e = document.querySelector('iframe[src="about:blank"]')
  if (e && e.clientWidth > 99 && e.clientHeight > 11) {
    e = e.contentWindow.document
    c.push(e, e.body)
  }

  for (e of c) {
    if (!e) continue
    e = e.wrappedJSObject || e
    for (type of eventNames) {
      prop = 'on' + type
      e[prop] = null
    }
  }
}

function init() {
  // 获取当前域名的规则
  let rule = getRule(location.host)

  // 设置 event 列表
  hook_eventNames = rule.hook_eventNames.split('|')
  // Allowed to return value
  unhook_eventNames = rule.unhook_eventNames.split('|')
  eventNames = hook_eventNames.concat(unhook_eventNames)

  if (rule.dom0) {
    setInterval(clearLoop, 9e3)
    setTimeout(clearLoop, 1e3)
    window.addEventListener('load', clearLoop, true)
  }

  if (rule.hook_addEventListener) {
    EventTarget.prototype.addEventListener = addEventListener
    document.addEventListener = addEventListener
  }

  if (rule.hook_preventDefault) {
    Event.prototype.preventDefault = function() {
      if (dontHook(this.target) || !eventNames.includes(this.type)) {
        Event_preventDefault.apply(this, arguments)
      }
    }
  }

  if (rule.add_css)
    GM_addStyle(`
      html, * {
        -webkit-user-select:text !important;
        -moz-user-select:text !important;
        user-select:text !important;
      }
      ::-moz-selection {color:#111 !important; background:#05D3F9 !important;}
      ::selection {color:#111 !important; background:#05D3F9 !important;}
    `)
}

init()
```

---

最后，JavaScript hook 技巧是真的很多，果然写 Greasemonkey 脚本这方面用得很多呢 (๑>ᴗ<๑)
