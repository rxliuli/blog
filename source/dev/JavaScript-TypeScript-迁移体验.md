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
  - JavaScript 没有类型，所以写 JSDoc 感觉很麻烦，但不写又不太好。然而，写多了 JavaScript 之后太顺的话就不会想起来去加 JSDoc，然后之后就很难看懂。
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

### TypeScript 类型系统就是认为吾辈错了怎么办？

### 如何强制调用非空时对象上的函数？
