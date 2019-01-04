---
layout: post
title: 点击按钮自动提交了 Form 表单
date: 2019-01-04 20:22:43
tags: [HTML, JavaScript, 记录]
---

# 点击按钮自动提交了 Form 表单

## 场景

在吾辈的写 HTML 时遇到了一个问题，一个普通的按钮，点击之后一旦在 `click` 事件中进行了 `return`，则立刻提交 `Form` 表单。

像下面这段代码，不管是点击 _修改按钮_ 还是 _提交按钮_，`Form` 表单都会被提交（可以看到 `alert` 弹框）。

```html
<form action="" id="form" onsubmit="submitFn()">
  <input type="text" name="username" placeholder="文本输入框" />
  <button onclick="updateFn">修改</button> <button type="submit">提交</button>
</form>
<script>
  // 提交方法
  function submitFn() {
    alert('form 表单被提交了')
  }

  // 修改方法
  function updateFn() {
    const $username = document.querySelector('#username')
    if (!$username.value) {
      return false
    }
    $username.value = ''
  }
</script>
```

## 解决

后来经过同事提醒，在 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button#%E5%B1%9E%E6%80%A7) 找到了关于 `button` 按钮的解释，在 _属性 => type_ 小结中，有下面这样一段内容

> **type**
> button 的类型。可选值：
>
> - `submit`: 此按钮将表单数据提交给服务器。如果未指定属性，或者属性动态更改为空值或无效值，则此值为默认值。
> - `reset`: 此按钮重置所有组件为初始值。
> - `button`: 此按钮没有默认行为。它可以有与元素事件相关的客户端脚本，当事件出现时可触发。
> - `menu`: 此按钮打开一个由指定 `<menu>` 元素进行定义的弹出菜单。

是的，当没有指定 `button` 元素的 `type` 属性时，浏览器将默认为 `submit` 而非 `button`，导致了在 `Form` 表单中容易出现奇怪的自动提交问题。

修改后的代码

```html
<form action="" id="form" onsubmit="submitFn()">
  <input type="text" name="username" placeholder="文本输入框" />
  <!-- 实际上只是在这里加了一个 type="button" 属性而已 -->
  <button type="button" onclick="updateFn">修改</button>
  <button type="submit">提交</button>
</form>
<script>
  // 提交方法
  function submitFn() {
    alert('form 表单被提交了')
  }

  // 修改方法
  function updateFn() {
    const $username = document.querySelector('#username')
    if (!$username.value) {
      return false
    }
    $username.value = ''
  }
</script>
```

实际上吾辈也只添加了一个 `type` 属性，但却因为这个问题耗费许久，终归是基础知识的坑踩得不够多。不过幸好，吾辈可以记录下来，避免在同一个坑里跌倒两次！
