---
layout: post
title: JavaScript 处理树数据结构
abbrlink: bb943156
date: 2019-05-15 09:13:30
tags:
  - JavaScript
  - 教程
---

# JavaScript 处理树数据结构

## 场景

即便在前端，也有很多时候需要操作 **树结构** 的情况，最典型的场景莫过于 _后台侧边栏多级菜单_，以及 _权限管理_ 了。之前吾辈曾经遇到过这种场景，但当时没有多想直接手撕 JavaScript 列表转树了，并没有想到进行封装。后来遇到的场景多了，想到如何封装树结构操作，但考虑到不同场景的树节点结构的不同，就没有继续进行下去了。

直到吾辈开始经常运用了 ES6 `Proxy` 之后，吾辈想到了新的解决方案！

## 思考

- 问: 之前为什么停止封装树结构操作了？
- 答: 因为不同的树结构节点可能有不同的结构，例如某个项目的树节点父节点 id 字段是 `parent`，而另一个项目则是 `parentId`
- 问: `Proxy` 如何解决这个问题呢？
- 答: `Proxy` 可以拦截对象的操作，当访问对象不存在的字段时，`Proxy` 能将之代理到已经存在的字段上
- 问: 这点意味着什么？
- 答: 它意味着 `Proxy` 能够抹平不同的树节点结构之间的差异！
- 问: 我还是不太明白 `Proxy` 怎么用，能举个具体的例子么？
- 答: 当然可以，我现在就让你看看 `Proxy` 的能力

下面思考一下如何在同一个函数中处理这两种树节点结构

```js
/**
 * 系统菜单
 */
class SysMenu {
  /**
   * 构造函数
   * @param {Number} id 菜单 id
   * @param {String} name 显示的名称
   * @param {Number} parent 父级菜单 id
   */
  constructor(id, name, parent) {
    this.id = id
    this.name = name
    this.parent = parent
  }
}
/**
 * 系统权限
 */
class SysPermission {
  /**
   * 构造函数
   * @param {String} uid 系统唯一 uuid
   * @param {String} label 显示的菜单名
   * @param {String} parentId 父级权限 uid
   */
  constructor(uid, label, parentId) {
    this.uid = uid
    this.label = label
    this.parentId = parentId
  }
}
```

下面让我们使用 `Proxy` 来抹平访问它们之间的差异

```js
```
