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
const sysMenuMap = new Map().set('parentId', 'parent')
const sysMenu = new Proxy(new SysMenu(1, 'rx', 0), {
  get(_, k) {
    if (sysMenuMap.has(k)) {
      return Reflect.get(_, sysMenuMap.get(k))
    }
    return Reflect.get(_, k)
  },
})
console.log(sysMenu.id, sysMenu.name, sysMenu.parentId) // 1 'rx' 0

const sysPermissionMap = new Map().set('id', 'uid').set('name', 'label')
const sysPermission = new Proxy(new SysPermission(1, 'rx', 0), {
  get(_, k) {
    if (sysPermissionMap.has(k)) {
      return Reflect.get(_, sysPermissionMap.get(k))
    }
    return Reflect.get(_, k)
  },
})
console.log(sysPermission.id, sysPermission.name, sysPermission.parentId) // 1 'rx' 0
```

现在，差异确实抹平了，我们可以通过访问相同的属性来获取到不同结构对象的值！然而，每个对象都写一次代理终究有点麻烦，所以我们实现一个通用函数用以包装。

```js
/**
 * 桥接对象不存在的字段
 * @param {Object} map 代理的字段映射 Map
 * @returns {Function} 转换一个对象为代理对象
 */
export function bridge(map) {
  /**
   * 为对象添加代理的函数
   * @param {Object} obj 任何对象
   * @returns {Proxy} 代理后的对象
   */
  return function(obj) {
    return new Proxy(obj, {
      get(target, k) {
        console.log('s')
        if (Reflect.has(map, k)) {
          return Reflect.get(target, Reflect.get(map, k))
        }
        return Reflect.get(target, k)
      },
      set(target, k, v) {
        if (Reflect.has(map, k)) {
          Reflect.set(target, Reflect.get(map, k), v)
          return true
        }
        Reflect.set(target, k, v)
        return true
      },
    })
  }
}
```

现在，我们可以用更简单的方式来做代理了。

```js
const sysMenu = bridge({
  parentId: 'parent',
})(new SysMenu(1, 'rx', 0))
console.log(sysMenu.id, sysMenu.name, sysMenu.parentId) // 1 'rx' 0

const sysPermission = bridge({
  id: 'uid',
  name: 'label',
})(new SysPermission(1, 'rx', 0))
console.log(sysPermission.id, sysPermission.name, sysPermission.parentId) // 1 'rx' 0
```

## 实现列表转树

列表转树，除了递归之外，也可以使用循环实现，这里便以循环为示例。

思路

1. 在外层遍历子节点
2. 如果是根节点，就添加到根节点中并不在找其父节点。
3. 否则在内层循环中找该节点的父节点，找到之后将子节点追加到父节点的子节点列表中，然后结束本次内层循环。

```js
/**
 * 将列表转换为树节点
 * 注：该函数默认树的根节点只有一个，如果有多个，则返回一个数组
 * @param {Array.<Object>} list 树节点列表
 * @param {Object} [options] 其他选项
 * @param {Function} [options.isRoot] 判断节点是否为根节点。默认根节点的父节点为空
 * @param {Function} [options.bridge=returnItself] 桥接函数，默认返回自身
 * @returns {Object|Array.<String>} 树节点，或是树节点列表
 */
export function listToTree(
  list,
  { isRoot = node => !node.parentId, bridge = i => i } = {},
) {
  const res = list.reduce((root, _sub) => {
    if (isRoot(sub)) {
      root.push(sub)
      return root
    }
    const sub = bridge(_sub)
    for (let _parent of list) {
      const parent = bridge(_parent)
      if (sub.parentId === parent.id) {
        parent.child = parent.child || []
        parent.child.push(sub)
        return root
      }
    }
    return root
  }, [])
  // 根据顶级节点的数量决定如何返回
  const len = res.length
  if (len === 0) return {}
  if (len === 1) return res[0]
  return res
}
```

## 实现树转列表

```js

```