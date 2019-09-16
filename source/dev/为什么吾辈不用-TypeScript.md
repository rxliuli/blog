---
layout: post
title: 为什么吾辈不用 TypeScript
abbrlink: 9d253d48
date: 2019-06-22 16:15:25
tags:
  - TypeScript
---

# 为什么吾辈不用 TypeScript

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

## API 文档工具太烂

## 其他问题

- 编译重载函数时会删除注释内容
