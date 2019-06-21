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

> 吾辈是一只在飞向太阳的萤火虫

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

是不是感觉超级蠢？吾辈也是这样认为的！

## 链式调用加延迟执行

我们可以尝试使用链式调用加延迟执行修改这个 `AsyncArray`

```js
/**
 * 保存高阶函数传入的异步操作
 */
class AsyncArrayAction {
  constructor(type, action) {
    /**
     * @field 异步操作的类型
     * @type {string}
     */
    this.type = type
    /**
     * @field 异步操作
     * @type {Function}
     */
    this.action = action
  }
}

/**
 * 真正实现的异步数组
 */
class _AsyncArray {
  constructor(arr) {
    this._arr = arr
  }
  async forEach(fn) {
    const arr = this._arr
    for (let i = 0, len = arr.length; i < len; i++) {
      await fn(arr[i], i, this)
    }
    this._arr = []
  }
  async map(fn) {
    const arr = this._arr
    const res = []
    for (let i = 0, len = arr.length; i < len; i++) {
      res.push(await fn(arr[i], i, this))
    }
    this._arr = res
    return this
  }
  async filter(fn) {
    const arr = this._arr
    const res = []
    for (let i = 0, len = arr.length; i < len; i++) {
      if (await fn(arr[i], i, this)) {
        res.push(arr[i])
      }
    }
    this._arr = res
    return this
  }
}

class AsyncArray {
  constructor(...args) {
    this._arr = Array.from(args)
    /**
     * @field 保存异步任务
     * @type {AsyncArrayAction[]}
     */
    this._task = []
  }
  forEach(fn) {
    this._task.push(new AsyncArrayAction('forEach', fn))
    return this
  }
  map(fn) {
    this._task.push(new AsyncArrayAction('map', fn))
    return this
  }
  /**
   * 终结整个链式操作并返回结果
   */
  async value() {
    const arr = new _AsyncArray(this._arr)
    let result
    for (let task of this._task) {
      result = await arr[task.type](task.action)
    }
    return result
  }
}
```

使用一下

```js
await new AsyncArray(...ids)
  .map(get)
  .forEach(async res => console.log(res))
  .value()
```

可以看到，确实符合预期了，然而每次都要调用 `value()`，终归有些麻烦。

## 使用 then 以支持 await 自动结束

这里使用 `then()` 替代它以使得可以使用 `await` **自动**计算结果

```js
class AsyncArray {
  // 上面的其他内容...
  /**
   * 等待计算完成所有的异步结果
   */
  async then() {
    const arr = new _AsyncArray(this._arr)
    let result
    for (let task of this._task) {
      result = await arr[task.type](task.action)
    }
    return result
  }
}
```

现在，可以使用 `await` 结束这次链式调用了

```js
await new AsyncArray(...ids).map(get).forEach(async res => console.log(res))
```

突然之间，我们发现了一个问题，为什么会这么慢？一个个去进行异步操作太慢了，难道就不能一次性全部发送出去，然后有序的处理结果就好了嘛？

## 并发异步操作

我们可以使用 `Promise.all` 并发执行异步操作，然后对它们的结果进行有序地处理。

```js
/**
 * 并发实现的异步数组
 */
class _AsyncArrayParallel {
  constructor(arr) {
    this._arr = arr
  }
  async _all(fn) {
    return Promise.all(this._arr.map(fn))
  }
  async forEach(fn) {
    await this._all(fn)
    this._arr = []
  }
  async map(fn) {
    this._arr = await this._all(fn)
    return this
  }
  async filter(fn) {
    const arr = await this._all(fn)
    this._arr = this._arr.filter((v, i) => arr[i])
    return this
  }
}
```

然后修改 `AsyncArray`，使用 `_AsyncArrayParallel` 即可

```js
class AsyncArray {
  // 上面的其他内容...
  /**
   * 终结整个链式操作并返回结果
   */
  async then() {
    const arr = new _AsyncArrayParallel(this._arr)
    let result
    for (let task of this._task) {
      result = await arr[task.type](task.action)
    }
    return result
  }
}
```

调用方式不变。当然，由于使用 `Promise.all` 实现，也同样受到它的限制 -- 异步操作实际上全部执行了。

## 串行/并行相互转换

现在我们的 `_AsyncArray` 和 `_AsyncArrayParallel` 两个类只能二选一，所以，我们需要添加两个函数用于互相转换。

```js
class AsyncArray {
  constructor(...args) {
    this._arr = Array.from(args)
    /**
     * @field 保存异步任务
     * @type {AsyncArrayAction[]}
     */
    this._task = []
    /**
     * 是否并行化
     */
    this._parallel = false
  }
  // 其他内容...
  parallel() {
    this._parallel = true
    return this
  }
  serial() {
    this._parallel = false
    return this
  }
  /**
   * 终结整个链式操作并返回结果
   */
  async then() {
    const arr = this._parallel
      ? new _AsyncArray(this._arr)
      : new _AsyncArrayParallel(this._arr)
    let result
    for (let task of this._task) {
      result = await arr[task.type](task.action)
    }
    return result
  }
}
```

现在，我们可以在真正执行之前在任意位置对其进行转换了

```js
await new AsyncArray(...ids)
  .parallel()
  .filter(async i => i % 2 === 0)
  .map(get)
  .forEach(async res => console.log(res))
```

## 补全一览

```js
```
