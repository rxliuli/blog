---
layout: post
title: JavaScript 自定义限流队列 fetch
date: 2019-01-23 13:02:57
tags: [JavaScript, 教程]
---

# JavaScript 自定义限流队列 fetch

## 为什么需要它？

有些时候不得不需要限制并发 fetch 的请求数量，避免请求过快导致 IP 封禁

## 需要做到什么？

- 允许限制 fetch 请求同时存在的数量
- 时间过久便认为是超时了

## 如何实现？

### 暂停请求

> 该方法的请求是无序的！

1. 使用 class 定义默认超时设置和请求数量限制的构造函数
2. 在请求前判断当前请求的数量，添加请求等待数量
   1. 如果请求数量已满，则进行等待
   2. 如果请求数量未满，则删除一个请求等待数量
3. 请求完成，删除当前请求数量

### 等待队列：触发钩子

1. 使用 class 定义默认超时设置和请求数量限制的构造函数
2. 在请求前将请求 argments 添加到等待队列中
3. 添加完成，尝试启动等待队列（钩子）
   - 如果数量过多，就不做任何事情
   - 如果数量没有超出最大限制，那就循环执行请求，直到到达最大限制
4. 请求完成，尝试启动等待队列（钩子）

### 等待队列：循环监听

1. 使用 class 定义默认超时设置和请求数量限制的构造函数
2. 在请求前将请求 argments 添加到等待队列中
3. 使用 `setInterval` 函数持续监听队列和当前执行的请求数
   - 发现请求数量没有到达最大值，且等待队列中还有值，那么就执行一次请求

## 实现代码

### 暂停请求实现

```js
/**
 * 等待指定的时间/等待指定表达式成立
 * @param {Number|Function} param 等待时间/等待条件
 * @returns {Promise} Promise 对象
 */
function wait(param) {
  return new Promise(resolve => {
    if (typeof param === 'number') {
      setTimeout(resolve, param)
    } else if (typeof param === 'function') {
      var timer = setInterval(() => {
        if (param()) {
          clearInterval(timer)
          resolve()
        }
      }, 100)
    } else {
      resolve()
    }
  })
}

/**
 * 限制并发请求数量的 fetch 封装
 */
class RequestLimiting {
  constructor({ timeout = 10000, limit = 10 }) {
    this.timeout = timeout
    this.limit = limit
    this.execCount = 0
    this.waitCount = 0
  }
  /**
   * 执行一个请求
   * 如果到达最大并发限制时就进行等待
   * 注：该方法的请求顺序是无序的，与代码里的顺序无关
   * @param {RequestInfo} url 请求 url 信息
   * @param {RequestInit} init 请求的其他可选项
   * @returns {Promise} 如果超时就提前返回 reject, 否则正常返回 fetch 结果
   */
  async _fetch(url, init) {
    this.waitCount++
    await wait(() => this.execCount < this.limit)
    this.waitCount--
    this.execCount++
    var now = Date.now()
    try {
      return await this.promiseTimeout(fetch(url, init), this.timeout)
    } finally {
      this.execCount--
    }
  }

  /**
   * 为 fetch 请求添加超时选项
   * 注：超时选项并非真正意义上的超时即取消请求，请求依旧正常执行完成，但会提前返回 reject 结果
   * @param {Promise} fetchPromise fetch 请求的 Promise
   * @param {Number} timeout 超时时间
   * @returns {Promise} 如果超时就提前返回 reject, 否则正常返回 fetch 结果
   */
  promiseTimeout(fetchPromise, timeout) {
    var abortFn = null

    //这是一个可以被reject的promise
    var abortPromise = new Promise(function(resolve, reject) {
      abortFn = function() {
        reject('abort promise')
      }
    })

    var abortablePromise = Promise.race([fetchPromise, abortPromise])

    setTimeout(function() {
      abortFn()
    }, timeout)

    return abortablePromise
  }
}
```

使用示例

```js
var requestLimiting = new RequestLimiting({ timeout: 500, limit: 1 })
new Array(100).fill(0).forEach(i =>
  requestLimiting
    ._fetch('/')
    .then(res => console.log(res))
    .catch(err => console.log(err))
)
```
