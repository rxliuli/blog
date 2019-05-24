---
layout: post
title: JavaScript => TypeScript 迁移体验
tags:
  - TypeScript
  - 记录
abbrlink: eeb7bc5
date: 2019-05-23 20:22:36
---

# JavaScript => TypeScript 迁移体验

## 前言

- `JavaScript` 不能无缝迁移到 `TypeScript`！
- `JavaScript` 不能无缝迁移到 `TypeScript`！
- `JavaScript` 不能无缝迁移到 `TypeScript`！

重要的话说三遍，TypeScript 是 JavaScript 的超集，所以有很多人认为（并宣称）JavaScript 可以很容易迁移到 TypeScript，甚至是无缝迁移的！
导致了 JavaScript 开发者满心欢喜的入坑了 TypeScript（包括吾辈），然后掉进了坑里，甚至差点爬不出来。。。

## 原因

- 问: 为什么吾辈用 JavaScript 用的好好的，偏偏自找麻烦去入坑了 TypeScript 了呢？
- 答: JavaScript 因为一些固有问题和工具缺少支持，导致代码写起来会感觉很不方便
- 问: 具体谈谈
- 答: 有很多令人不满意的地方，这里只谈几点:
  - JavaScript 没有类型，所以写 JSDoc 感觉很麻烦，但不写又不太好。然而，JavaScript 代码写的太顺利的话就可能忘记加上 JSDoc，然后之后就很难维护。
  - VSCode 支持不好，这点或许才是最重要的: VSCode 使用 TypeScript 编写，并基于 TypeScript 实现的语法提示功能，虽然也支持根据 JSDoc 的注释进行提示，然而当你去做一个开源项目，并将之发布到 npm 之后，情况发生了变化。。。当一个用户使用 npm/yarn 安装了你的项目之后，发现并没有任何代码提示，如此你会怎么做？
  - 复杂的类型很难使用 JSDoc 表达出来并清晰地告诉调用者，例如高阶函数。
  - 等等。。。。

是的，TypeScript 确实解决了以上的一些问题，却同时带入了另外一些问题。

- TypeScript 有类型了，然而即便有类型推导，还是要加很多类型，而且有时候 TypeScript 和我们的想法不同的时候还要用 `!`/`(t as unkonwn) as R` 这种 **hack 技巧**。
- VSCode 天生支持 TypeScript，但 TypeScript 的 API Doc 生成工具实在谈不上多好，例如 [typedoc](https://typedoc.org/) 相比于 [ESDoc](https://esdoc.org/) 不过是个半吊子。。。
- 事实上，即便使用 TypeScript 写的项目，只要使用者没有在 `jsconfig.json` 中进行配置的话，提示仍然默认不存在
- TypeScript 的类型系统是把双刃剑，实在太复杂了，当然有理由认为是为了兼容 JavaScript。然而在 TypeScript 想要正确的表达类型也是一件相当困难的事情。

## 类型系统踩坑

### 如何声明参数与返回值类型相同？

例如一个函数接受一个参数，并返回一个完全相同类型的返回值。

```ts
function returnItself(obj: any): any {
  return obj
}
```

假使这样写的话，类型系统就不会发挥作用了，调用函数的结果将是 `any`，意味着类型系统将没有效果。

例如下面的代码会被 ts 认为是错误

```ts
// 这段代码并不会有提示
console.log(returnItself('abc').length)
```

需要写成

```ts
function returnItself<T = any>(obj: T): T {
  return obj
}
```

这里主要声明了参数和返回值是同一类型，默认为 any，但具体取决于参数的不同而使得返回值也不同，返回值不会丢失类型信息。

### 如何声明参数与返回值类型有关联？

例如一个计算函数执行时间的函数 `timing`，接受一个函数参数，有可能是同步/异步的，所以要根据函数的返回值确定 `timing` 的返回值为 `number/Promise<number>`

```ts
export function timing(
  fn: (...args: any[]) => any | Promise<any>,
): number | Promise<number> {
  const begin = performance.now()
  const result = fn()
  if (!(result instanceof Promise)) {
    return performance.now() - begin
  }
  return result.then(() => performance.now() - begin)
}
```

然而在使用时你会发现返回值类型不太对，因为 `timing` 的返回值是 `number | Promise<number>` 这种复合类型

```ts
// 这里会提示类型错误
const res: number = timing(() => sleep(100))
expect(res).toBeGreaterThan(99)
```

解决方案有二

1. 使用函数声明重载
2. 使用类型判断

#### 使用函数声明重载

```ts
export function timing(fn: (...args: any[]) => Promise<any>): Promise<number>
export function timing(fn: (...args: any[]) => any): number
export function timing(
  fn: (...args: any[]) => any | Promise<any>,
): number | Promise<number> {
  const begin = performance.now()
  const result = fn()
  if (!(result instanceof Promise)) {
    return performance.now() - begin
  }
  return result.then(() => performance.now() - begin)
}
```

感觉函数声明顺序有点奇怪是因为 `Promise<any>` 属于 `any` 的子类，而函数声明重载必须由具体到宽泛。当然，我们有方法可以在 `any` 中排除掉 `Promise<any>`，这样顺序就对了！

```ts
export function timing(
  fn: (...args: any[]) => Exclude<any, Promise<any>>,
): number
export function timing(fn: (...args: any[]) => Promise<any>): Promise<number>
export function timing(
  fn: (...args: any[]) => any | Promise<any>,
): number | Promise<number> {
  const begin = performance.now()
  const result = fn()
  if (!(result instanceof Promise)) {
    return performance.now() - begin
  }
  return result.then(() => performance.now() - begin)
}
```

#### 使用类型判断

```ts
export function timing(
  fn: (...args: any[]) => any | Promise<any>,
  // 函数返回类型是 Promise 的话，则返回 Promise<number>，否则返回 number
): R extends Promise<any> ? Promise<number> : number {
  const begin = performance.now()
  const result = fn()
  if (!(result instanceof Promise)) {
    return (performance.now() - begin) as any
  }
  return result.then(() => performance.now() - begin) as any
}
```

#### 总结

可以看出来，第一种方式的优点在于可以很精细的控制每个不同参数对应的返回值，并且，可以处理特别复杂的情况，缺点则是如果写 doc 文档的话需要为每个声明都写上，即便，它们有大部分注释是相同的。
而第二种方式，则在代码量上有所减少，而且不必使用函数声明重载。缺点则是无法应对特别复杂的情况，另外一点就是使用了 `any`，可能会造成**重构火葬场**。

### TypeScript 类型系统就是认为吾辈错了怎么办？

有时候，明明自己知道是正确的，但 TypeScript 偏偏认为你写错了。思考以下功能如何实现？

将 Array 转换为 Map，接受三个参数

1. 需要转换的数组
2. 将数组元素转换为 Map key 的函数
3. 将数组元素转换为 Map value 的函数，可选，默认为数组元素

```ts
function returnItself<T = any>(obj: T): T {
  return obj
}

export type ArrayCallback<T, R> = (item: T, index: number, arr: T[]) => R

export function arrayToMap<T, K, V>(
  arr: T[],
  kFn: ArrayCallback<T, K>,
  vFn: ArrayCallback<T, V> = returnItself,
): Map<K, V> {
  return arr.reduce(
    (res, item, index, arr) =>
      res.set(kFn(item, index, arr), vFn(item, index, arr)),
    new Map<K, V>(),
  )
}
```

可能有以上代码，然而实际上 `returnItself` 无法直接赋值给 `ArrayCallback<T, V>`。当然，我们知道，这一定是可以赋值的，但 TypeScript 却无法编译通过！

```ts
export function arrayToMap<T, K, V>(
  arr: T[],
  kFn: ArrayCallback<T, K>,
  // 是的，这里添加 as any 就好了
  vFn: ArrayCallback<T, V> = returnItself as any,
): Map<K, V> {
  return arr.reduce(
    (res, item, index, arr) =>
      res.set(kFn(item, index, arr), vFn(item, index, arr)),
    new Map<K, V>(),
  )
}
```

或者，如果 `returnItself` 用的比较多的话（例如吾辈），可以使用另一种方式

```ts
// 修改 returnItself 的返回值
function returnItself<T, R = T>(obj: T): R {
  return obj as any
}

export type ArrayCallback<T, R> = (item: T, index: number, arr: T[]) => R

export function arrayToMap<T, K, V>(
  arr: T[],
  kFn: ArrayCallback<T, K>,
  vFn: ArrayCallback<T, V> = returnItself,
): Map<K, V> {
  return arr.reduce(
    (res, item, index, arr) =>
      res.set(kFn(item, index, arr), vFn(item, index, arr)),
    new Map<K, V>(),
  )
}
```

### 如何强制调用非空时对象上的函数？
