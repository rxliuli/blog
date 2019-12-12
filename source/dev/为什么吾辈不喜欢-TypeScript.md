---
layout: post
title: 为什么吾辈不喜欢 TypeScript
abbrlink: 9d253d48
date: 2019-06-22 16:15:25
tags:
  - TypeScript
---

# 为什么吾辈不喜欢 TypeScript

## 场景

## 使用只是为了支持 VSCode

众所周知，VSCode 基于 TypeScript 实现的代码提示，所以很多 js 库都有写 `.d.ts` 以支持它。甚至于，该需求强烈到人们创建了一个 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) 项目，用以专门维护那些流行 js 库的类型。当然，本质上该项目是为了让 ts 使用者在安装 js 库之后写代码时仍然能够正确的访问类型，但 VSCode 却将之绑定了起来。

## 类型系统过于复杂

想要写出来正确的类型，其实并非易事。例如常见的函数 `assign`，用于将多个对象的属性合并到一个对象上。

```js
function assign(target, ...objects) {
  objects.forEach(obj => {
    Object.entries(obj).forEach(([k, v]) => (target[k] = v))
  })
  return target
}
```

```ts
export function assign<T, A>(target: T, a: A): T & A
export function assign<T, A, B>(target: T, a: A, b: B): T & A & B
export function assign<T, A, B, C>(target: T, a: A, b: B, c: C): T & A & B & C
export function assign<T, A, B, C, D>(
  target: T,
  a: A,
  b: B,
  c: C,
  d: D,
): T & A & B & C & D
function assign<T>(target: T, ...objects: any[]): any {
  objects.forEach(obj => {
    Object.entries(obj).forEach(([k, v]) => (target[k] = v))
  })
  return target
}
```

## 周边生态不是很好

### API 文档工具

目前 ts 领域最好的 API 文档工具 [TypeDoc](https://typedoc.org/) 和 js 中流行的 API 文档工具 [ESDoc](https://esdoc.org/) 比起来，使用体验上仍然远远不及。

页面对比

| TypeDoc                                                | ESDoc                                                     |
| ------------------------------------------------------ | --------------------------------------------------------- |
| ![TypeDoc](https://img.rxliuli.com/20190918123430.png) | ![ESDoc 截图](https://img.rxliuli.com/20190918123929.png) |

> 注: 著名 ts 前端库 [rxjs](https://cn.rx.js.org/) 的文档生成工具使用的是 ESDoc。

### Linter 工具

ts 目前最流行的 linter 工具是 [tslint](https://palantir.github.io/tslint/)，完全放弃 [eslint](https://eslint.org/) 的积累而另立门户，导致为 eslint 编写 linter 规则并不能在 tslint 中使用，所以规则数量远远少于 eslint。虽然现在也有了 [typescript-eslint](https://typescript-eslint.io/) 致力于让 eslint 能够检测 ts 代码，但目前该项目还远远没有成熟，距离能够在生产中使用尚有一段距离（2019 年大抵是用不上的，却是要等到明年了）。

完整规则列表

[TSLint](https://palantir.github.io/tslint/rules/)
[ESLint](https://cn.eslint.org/docs/rules/)

## 强制要求所有的库都必须使用 ts

在使用 ts 时，项目中如果需要引入什么包，那么这个包必须是 ts 写的，或者有 types 定义，完全放弃了分析 js 进行代码提示。
