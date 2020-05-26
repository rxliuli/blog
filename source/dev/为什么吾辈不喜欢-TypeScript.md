---
layout: post
title: 为什么吾辈不喜欢 TypeScript
abbrlink: 9d253d48
date: 2019-06-22 16:15:25
tags:
  - TypeScript
---

# 为什么吾辈不喜欢 TypeScript

> 注：吾辈现在很喜欢 TypeScript，所有能上 TypeScript 的项目都上了 TypeScript！

## 使用只是为了支持 VSCode

众所周知，VSCode 基于 TypeScript 实现的代码提示，所以很多 js 库都有写 `.d.ts` 以支持它。甚至于，该需求强烈到人们创建了一个 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) 项目，用以专门维护那些流行 js 库的类型。当然，本质上该项目是为了让 ts 使用者在安装 js 库之后写代码时仍然能够正确的访问类型，但 VSCode 却将之绑定了起来。

> 本质上 MS 这样做的原因一方面是为了推广 TS，但同时也对库的开发人员要求更高。这其实是一件好事，因为 NPM 的生态是在太大也太糟糕了－－虚幻的繁荣！

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

> 注：此处的复杂性主要会在你做写基建的时候出现，如果平时只是写点业务代码，那么是无法体会到 ts 的类型复杂性的。

## 周边生态不是很好

### API 文档工具

目前 ts 领域最好的 API 文档工具 [TypeDoc](https://typedoc.org/) 和 js 中流行的 API 文档工具 [ESDoc](https://esdoc.org/) 比起来，使用体验上仍然远远不及。

页面对比

| TypeDoc                                                | ESDoc                                                     |
| ------------------------------------------------------ | --------------------------------------------------------- |
| ![TypeDoc](https://img.rxliuli.com/20190918123430.png) | ![ESDoc 截图](https://img.rxliuli.com/20190918123929.png) |

> 注: 著名 ts 前端库 [rxjs](https://cn.rx.js.org/) 的文档生成工具使用的是 ESDoc。
> ESDoc 太过复杂的话可以考虑使用 TypeDoc + eleDoc 主题，生成的文档虽然细节之处仍有些许不足，不过已然足够使用了。

### Linter 工具

ts 目前最流行的 linter 工具是 [tslint](https://palantir.github.io/tslint/)，完全放弃 [eslint](https://eslint.org/) 的积累而另立门户，导致为 eslint 编写 linter 规则并不能在 tslint 中使用，所以规则数量远远少于 eslint。虽然现在也有了 [typescript-eslint](https://typescript-eslint.io/) 致力于让 eslint 能够检测 ts 代码，但目前该项目还远远没有成熟，距离能够在生产中使用尚有一段距离（2019 年大抵是用不上的，却是要等到明年了）。

完整规则列表

[TSLint](https://palantir.github.io/tslint/rules/)
[ESLint](https://cn.eslint.org/docs/rules/)

## 强制要求所有的库都必须使用 ts

在使用 ts 时，项目中如果需要引入什么包，那么这个包必须是 ts 写的，或者有 types 定义，完全放弃了分析 js 进行代码提示。

> 现在稍微大型的包 DefinitelyTyped 都有定义好的 types，甚至有些库迁移到了 ts 实现（`vuejs, immerjs`），如果没有的话写一个简单的类型定义也并不困难。

## 仍存在一些非常讨厌的地方

### 不提供 `excludeTypes` 选项

这导致项目依赖中错误包含 `node` 的 types 之后无法排除，只能选择忽略或使用 `types` 包含所有需要类型定义的库。

```json
{
  "compilerOptions": {
    "types": ["typescript", "jest", "jest-extended"]
  }
}
```

> 这点没有太好的解决方案。。。

### 自定义 types 很麻烦

当遇到没有提供 types 的库时，如果在 @types 项目找不到，那么只能自己手动定义了，但如何让类型定义正确生效并不是一件简单的事情。

- 必须在 `@types` 目录下
- 使用 `declare module * {}` 这种形式定义包，并且 `*` 需要与需要类型的包同名

下面是一个例子

```ts
// jquery.d.ts
declare module 'jquery' {
  interface $ {
    function(selector: string): JQueryStatic
    function(func: Function): void
    ajax: (config: object) => void
  }
}
```

> 定义 types 还好吧，本质上就是复制粘贴函数定义，然后添加类型即可
