---
layout: post
title: JavaScript 异步时序问题
abbrlink: debc4f0e
date: 2019-06-12 18:10:19
tags:
  - JavaScript
---

# JavaScript 异步时序问题

## 场景

> 死后我们必升天堂，因为活时我们已在地狱。

不知你是否遇到过，向后台发送了多次异步请求，结果最后显示的数据却并不正确 -- 是旧的数据。

具体情况:

1. 用户触发事件，发送了第 1 次请求
2. 用户触发事件，发送了第 2 次请求
3. 第 2 次请求成功，更新页面上的数据
4. 第 1 次请求成功，更新页面上的数据

嗯？是不是感觉到异常了？这便是多次异步请求时会遇到的异步回调顺序与调用顺序不同的问题。

## 思考

- 为什么会出现这种问题？
- 出现这种问题怎么解决？

### 为什么会出现这种问题？

JavaScript 随处可见异步，但实际上并不是那么好控制。用户与 UI 交互，触发事件及其对应的处理函数，函数执行异步操作（网络请求），**异步操作得到结果的时间（顺序）是不确定的**，所以响应到 UI 上的时间就不确定，**如果触发事件的频率较高/异步操作的时间过长**，就会造成前面的异步操作结果覆盖后面的异步操作结果。

关键点

- 异步操作得到结果的时间（顺序）是不确定的
- 如果触发事件的频率较高/异步操作的时间过长

### 出现这种问题怎么解决？

既然关键点由两个要素组成，那么，只要破坏了任意一个即可。

- 手动控制异步返回结果的顺序
- 降低触发频率并限制异步超时时间

## 手动控制返回结果的顺序

根据对异步操作结果处理情况的不同也有三种不同的思路

1. 后面异步操作得到结果后**等待**前面的异步操作返回结果
2. 后面异步操作得到结果后**放弃**前面的异步操作返回结果
3. 依次处理每一个异步操作，等待上一个异步操作完成之后再执行下一个

这里先引入一个公共的 `wait` 函数

```js
/**
 * 等待指定的时间/等待指定表达式成立
 * 如果未指定等待条件则立刻执行
 * 注: 此实现在 nodejs 10- 会存在宏任务与微任务的问题，切记 async-await 本质上还是 Promise 的语法糖，实际上并非真正的同步函数！！！即便在浏览器，也不要依赖于这种特性。
 * @param param 等待时间/等待条件
 * @returns Promise 对象
 */
function wait(param) {
  return new Promise(resolve => {
    if (typeof param === 'number') {
      setTimeout(resolve, param)
    } else if (typeof param === 'function') {
      const timer = setInterval(() => {
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
```

### 1. 后面异步操作得到结果后**等待**前面的异步操作返回结果

```js
/**
 * 将一个异步函数包装为具有时序的异步函数
 * 注: 该函数会按照调用顺序依次返回结果，后面的调用的结果需要等待前面的，所以如果不关心过时的结果，请使用 {@link switchMap} 函数
 * @param fn 一个普通的异步函数
 * @returns 包装后的函数
 */
function mergeMap(fn) {
  // 当前执行的异步操作 id
  let id = 0
  // 所执行的异步操作 id 列表
  const ids = new Set()
  return new Proxy(fn, {
    async apply(_, _this, args) {
      const prom = Reflect.apply(_, _this, args)
      const temp = id
      ids.add(temp)
      id++
      await wait(() => !ids.has(temp - 1))
      ids.delete(temp)
      return await prom
    },
  })
}
```

[测试一下](https://codepen.io/rxliuli/pen/orXpEY)

```js
;(async () => {
  // 模拟一个异步请求，接受参数并返回它，然后等待指定的时间
  async function get(ms) {
    await wait(ms)
    return ms
  }
  const fn = mergeMap(get)
  let last = 0
  let sum = 0
  await Promise.all([
    fn(30).then(res => {
      last = res
      sum += res
    }),
    fn(20).then(res => {
      last = res
      sum += res
    }),
    fn(10).then(res => {
      last = res
      sum += res
    }),
  ])
  console.log(last)
  // 实际上确实执行了 3 次，结果也确实为 3 次调用参数之和
  console.log(sum)
})()
```

### 2. 后面异步操作得到结果后**放弃**前面的异步操作返回结果

```js
/**
 * 将一个异步函数包装为具有时序的异步函数
 * 注: 该函数会丢弃过期的异步操作结果，这样的话性能会稍稍提高（主要是响应比较快的结果会立刻生效而不必等待前面的响应结果）
 * @param fn 一个普通的异步函数
 * @returns 包装后的函数
 */
function switchMap(fn) {
  // 当前执行的异步操作 id
  let id = 0
  // 最后一次异步操作的 id，小于这个的操作结果会被丢弃
  let last = 0
  // 缓存最后一次异步操作的结果
  let cache
  return new Proxy(fn, {
    async apply(_, _this, args) {
      const temp = id
      id++
      const res = await Reflect.apply(_, _this, args)
      if (temp < last) {
        return cache
      }
      cache = res
      last = temp
      return res
    },
  })
}
```

[测试一下](https://codepen.io/rxliuli/pen/BgNJbq)

```js
;(async () => {
  // 模拟一个异步请求，接受参数并返回它，然后等待指定的时间
  async function get(ms) {
    await wait(ms)
    return ms
  }
  const fn = switchMap(get)
  let last = 0
  let sum = 0
  await Promise.all([
    fn(30).then(res => {
      last = res
      sum += res
    }),
    fn(20).then(res => {
      last = res
      sum += res
    }),
    fn(10).then(res => {
      last = res
      sum += res
    }),
  ])
  console.log(last)
  // 实际上确实执行了 3 次，然而结果并不是 3 次调用参数之和，因为前两次的结果均被抛弃，实际上返回了最后一次发送请求的结果
  console.log(sum)
})()
```

### 3. 依次处理每一个异步操作，等待上一个异步操作完成之后再执行下一个

```js
/**
 * 将一个异步函数包装为具有时序的异步函数
 * 注: 该函数会按照调用顺序依次返回结果，后面的执行的调用（不是调用结果）需要等待前面的，此函数适用于异步函数的内里执行也必须保证顺序时使用，否则请使用 {@link mergeMap} 函数
 * 注: 该函数其实相当于调用 {@code asyncLimiting(fn, {limit: 1})} 函数
 * 例如即时保存文档到服务器，当然要等待上一次的请求结束才能请求下一次，不然数据库保存的数据就存在谬误了
 * @param fn 一个普通的异步函数
 * @returns 包装后的函数
 */
function concatMap(fn) {
  // 当前执行的异步操作 id
  let id = 0
  // 所执行的异步操作 id 列表
  const ids = new Set()
  return new Proxy(fn, {
    async apply(_, _this, args) {
      const temp = id
      ids.add(temp)
      id++
      await wait(() => !ids.has(temp - 1))
      const prom = Reflect.apply(_, _this, args)
      ids.delete(temp)
      return await prom
    },
  })
}
```

[测试一下](https://codepen.io/rxliuli/pen/xoGYxq)

```js
;(async () => {
  // 模拟一个异步请求，接受参数并返回它，然后等待指定的时间
  async function get(ms) {
    await wait(ms)
    return ms
  }
  const fn = concatMap(get)
  let last = 0
  let sum = 0
  await Promise.all([
    fn(30).then(res => {
      last = res
      sum += res
    }),
    fn(20).then(res => {
      last = res
      sum += res
    }),
    fn(10).then(res => {
      last = res
      sum += res
    }),
  ])
  console.log(last)
  // 实际上确实执行了 3 次，然而结果并不是 3 次调用参数之和，因为前两次的结果均被抛弃，实际上返回了最后一次发送请求的结果
  console.log(sum)
})()
```

### 小结

虽然三个函数看似效果都差不多，但还是有所不同的。

1. 是否允许异步操作并发？否: `concatMap`, 是: 到下一步
2. 是否需要处理旧的的结果？否: `switchMap`, 是: `mergeMap`
