---
layout: post
title: JavaScript 数组的高阶函数使用异步操作
tags:
  - JavaScript
  - 教程
abbrlink: 5ec57ccc
date: 2019-06-21 12:56:21
updated: 2019-06-21 12:56:21
---

# JavaScript 数组的高阶函数使用异步操作

## 场景

> 我是一只在飞向太阳的萤火虫

JavaScript 中的数组是一个相当泛用性的数据结构，能当数组，元组，队列，栈进行操作，更好的是 JavaScript 提供了很多原生的高阶函数，便于我们对数组整体操作。
然而，JavaScript 中的高阶函数仍有缺陷 -- 异步！当你把它们放在一起使用时，就会感觉到这种问题的所在。

例如现在，有一组 id，我们要根据 id 获取到远端服务器 id 对应的值，然后将之打印出来。那么，我们要怎么做呢？

```js
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

async function get(id) {
  // 这里只是为了模拟每个请求的时间可能是不定的
  await wait(Math.random() * id * 100)
  return '内容: ' + id.toString()
}

const ids = [1, 2, 3, 4]
```

你或许会下意识地写出下面的代码

```js
ids.forEach(async id => console.log(await get(id)))
```

事实上，控制台输出是无序的，而并非想象中的 1, 2, 3, 4 依次输出

```sh
内容: 2 ​​​​​
内容: 3 ​​​​​
内容: 1 ​​​​​
内容: 4
```

这是为什么呢？原因便是 JavaScript 中数组的高阶函数并不会等待异步函数的返回！当你在网络上搜索时，会发现很多人会说可以使用 `for-of`, `for-in` 解决这个问题。

```js
;(async () => {
  for (let id of ids) {
    console.log(await get(id))
  }
})()
```

或者，使用 `Promise.all` 也是一种解决方案

```js
;(async () => {
  ;(await Promise.all(ids.map(get))).forEach(v => console.log(v))
})()
```

然而，第一种方式相当于丢弃了 Array 的所有高阶函数，再次重返远古 `for` 循环时代了。第二种则一定会执行所有的异步函数，即便你需要使用的是 `find/findIndex/some/every` 这些高阶函数。那么，有没有更好的解决方案呢？

## 思考

既然原生的 Array 不支持完善的异步操作，那么，为什么不由我们来实现一个呢？

实现思路:

1. 创建异步数组类型 `AsyncArray`
2. 内置一个数组保存当前异步操作数组的值
3. 实现数组的高阶函数并实现支持异步函数顺序执行
4. 获取到内置的数组

```js
class AsyncArray {
  constructor(...args) {
    this._arr = Array.from(args)
    this._task = []
  }
  async forEach(fn) {
    const arr = this._arr
    for (let i = 0, len = arr.length; i < len; i++) {
      await fn(arr[i], i, this)
    }
  }
}

new AsyncArray(...ids).forEach(async id => console.log(await get(id)))
```

打印结果确实有顺序了，看似一切很美好？

然而，当我们再实现一个 `map` 试一下

```js
class AsyncArray {
  constructor(...args) {
    this._arr = Array.from(args)
  }
  async forEach(fn) {
    const arr = this._arr
    for (let i = 0, len = arr.length; i < len; i++) {
      await fn(arr[i], i, this)
    }
  }
  async map(fn) {
    const arr = this._arr
    const res = []
    for (let i = 0, len = arr.length; i < len; i++) {
      res.push(await fn(arr[i], i, this))
    }
    return this
  }
}
```

调用一下

```js
new AsyncArray(...ids).map(get).forEach(async res => console.log(res))
// 抛出错误
// (intermediate value).map(...).forEach is not a function
```

然而会有问题，实际上 `map` 返回的是 `Promise`，所以我们还必须使用 `await` 进行等待

```js
;(async () => {
  ;(await new AsyncArray(...ids).map(get)).forEach(async res =>
    console.log(res),
  )
})()
```

是不是感觉超级蠢？吾辈也是这样认为的！我们可以尝试使用链式调用加延迟执行

```js
class AsyncArrayAction {
  constructor(action, fn) {
    this.action = action
    this.fn = fn
  }
}

class _AsyncArray {
  constructor(...args) {
    this._arr = Array.from(args)
  }
  async forEach(fn) {
    this._task.push()
    const arr = this._arr
    for (let i = 0, len = arr.length; i < len; i++) {
      await fn(arr[i], i, this)
    }
  }
  async map(fn) {
    const arr = this._arr
    const res = []
    for (let i = 0, len = arr.length; i < len; i++) {
      res.push(await fn(arr[i], i, this))
    }
    return this
  }
}

class AsyncArray {
  constructor(...args) {
    this._arr = Array.from(args)
    this._task = []
  }
  async forEach(fn) {
    this._task.push(new AsyncArrayAction('forEach', fn))
    return this
  }
  async map(fn) {
    const arr = this._arr
    const res = []
    for (let i = 0, len = arr.length; i < len; i++) {
      res.push(await fn(arr[i], i, this))
    }
    return this
  }
  async value() {}
}
```
