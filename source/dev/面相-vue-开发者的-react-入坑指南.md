---
layout: post
title: 面相 vue 开发者的 react 入坑指南
date: 2020-01-16 08:43:17
tags:
  - Vue
  - React
  - JavaScript
---

## 场景

## 工程

以下皆基于 `ts + react + mobx + react-router + immer` 进行说明，虽然完全不了解以上内容亦可，但最好了解一下它们是做什么的，下面第一次提及时也会简单说明一下。

### 创建项目

使用 create-react-app 创建 react 项目，但和 vue-cli 有一点明显区别：不提供很多配置，只是简单的项目生成。

### this 的值

在 `class` 中使用箭头函数以直接绑定当前组件的实例，尽量不要使用 `function`，否则 `this` 可能是不明确的。

```tsx
import React, { Component } from 'react'

class HelloWorld extends Component {
  logMsg = () => {
    console.log('msg')
  }
  render() {
    return (
      <div>
        <h1>hello world</h1>
        <button onClick={this.logMsg}>打印</button>
      </div>
    )
  }
}

export default HelloWorld
```

### 状态管理

此处使用 mobx 对标，mobx 是一个状态管理库，以响应式、可变、简单方便为最大卖点。本质上可以认为提供了一个全局对象，并实现了 vue 中的 `computed` 和 `watch`，所以 vue 的作者说 vue 是更简单的 react + mobx 确实有些道理，实际上这两个加起来能做到的事情不比原生 vue 多多少。

但它们之间也有几点不同

- vue 基于组件级别实现的 `computed` 和 `watch`，而 mobx 则是全局的
- vue 是基于组件级别自动初始化和销毁，而 mobx 则是手动的
- vue 基于组件但也受限于组件级别，全局状态仍要使用 vuex 这种 **大炮**，而 mobx 此时则是统一的

是否需要支持 es5？

- 是：高阶函数
- 否：装饰器

### 路由

- 递归菜单栏
- 获取当前路由：useMatch()
- 使用编程式的路由导航:withRouter()
  - 注意 props 的类型

## 代码组织

- 导出：tsx/jsx 使用默认导出，避免需要高阶函数包装的场景
- 优先使用函数式组件
- src
  - pages：页面级的组件
    - component：页面级组件
  - components：非页面相关的通用组件
  - assets：静态资源
- 命名
  - 组件：必须使用大写驼峰，包括使用组件亦然
  - store：必须使用 .store 后缀以区分普通 ts 文件
  - css：页面级 css 必须与组件名保持一致

### 问题

- CSS module 很多方案，但没有一统天下的
- CSS 没有局部化处理，没有像 vue 那样用 `[data-has]` 属性做组件隔离
- vue 在组件创建/销毁时会自动初始化/销毁状态及监听器，而 mobx 会一直保留需要手动初始化/清理
  - 注: 这点还未找到解决方案
