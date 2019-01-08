---
layout: post
title: JavaScript 善用解构赋值
date: 2019-01-08 20:36:58
tags: [JavaScript]
---

# JavaScript 善用解构赋值

## 场景

在今天写 JavaScript 函数时，发现了一个有趣的技巧。

在此之前，吾辈想知道泥萌需要默认值的时候是如何做的呢？

例如下面的函数 `print`，吾辈需要在没有给定参数 `user` 的情况下，给出合适的输出

```js
function print(user) {
  if (!user) {
    user = {}
  }
  if (!user.name) {
    user.name = '未设置'
  }
  if (!user.age) {
    user.age = 0
  }
  console.log(`姓名：${user.name}，年龄：${user.age}`)
}
```

那么，我们应该怎么优化呢？

- 三元表达式
- `||` / `&&` 赋予默认值
- `Object.assign()` 合并对象

我们分别来实现一下

### 三元表达式实现

```js
function print(user) {
  user = user ? user : {}
  console.log(
    `姓名：${user.name ? user.name : '未设置'}，年龄：${
      user.age ? user.age : 0
    }`
  )
}
```

### `||` / `&&` 赋予默认值

```js
function print(user) {
  console.log(
    `姓名：${(user || {}).name || '未设置'}，年龄：${(user || {}).age || 0}`
  )
}
```

使用 `&&` 也可以

```js
function print(user) {
  console.log(
    `姓名：${(user && user.name) || '未设置'}，年龄：${(user && user.age) || 0}`
  )
}
```

> `||` / `&&` 解释
>
> - `||` 用来取默认值，避免太多的 `if` 判断。例如对于 `a || b` 我们可以认为：如果 `a` 为空，则赋值为 `b`
> - `&&` 用来连续执行，避免深层嵌套的 `if` 判断。例如对于 `a || b`，我们可以认为：如果 `a` 不为空，则赋值为 `b`
>
> 注：||`/`&&` 非常适合简单的默认值赋值，但一旦设置到深层嵌套默认值就不太合适了

### `Object.assign()` 合并对象

```js
function print(user) {
  _user = {
    name: '未设置',
    age: 0
  }
  user = Object.assign(_user, user)
  console.log(`姓名：${user.name}，年龄：${user.age}`)
}
```

---

可以看出

1. 三元表达式的方式方式明显有点繁琐
2. `||` / `&&` 很好很强大，缺点是看起来很不直观，而且容易混淆
3. `Object.assign()` 合并对象的方式应该算是最好的了，然而是在方法内部进行的初始化，作为调用者除非查看文档或源码才能知道

那么，有没有更好的解决方案呢？

## 解构赋值

解构赋值是 ES6 的一个新的语法，具体可以查看 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)。

下面是一些简单的解构赋值操作

### 数组解构

```js
var arr = [1, 2, 3, 4]
var [first, second, ...remaining] = arr // first: 1, second: 2, remaining: [3, 4]
// 接受一或多个可变参数的函数
function join(...arr) {
  return arr.join(', ')
}
// 调用时可以使用 ... 将数组解构
join(...arr) // 1, 2, 3, 4
// 忽略开始的某些值
var [, , ...remaining] = arr // remaining: [3, 4]
// 默认值
var [first = 1, second = 2, ...remaining] = [] // first: 1, second: 2, remaining:
var a = 1,
  b = 2
// 交换变量
;[a, b] = [b, a] // a: 2, b: 1
```

### 对象解构

```js
var user = {
  id: 1,
  name: '未设置',
  age: 0,
  sex: false
}
var { name, age, ...rest } = user // name: '未设置', age: 0, 其他属性: { "id": 1,"sex": false }

// 使用新的变量名
var { name: newName, age: newAge } = user // newName: '未设置', newAge: 0
// 默认值
var { name = '未设置', age = 0 } = {} // name: '未设置', age: 0
// 同时使用新的变量名和默认值
var { name: newName = '未设置', age: newAge = 0 } = user // newName: '未设置', newAge: 0
// 计算属性名
var key = 'name'
var { [key]: name } = user
// 数组迭代解构
var users = [
  {
    name: '琉璃',
    age: 17
  },
  {
    name: '楚轩',
    age: 23
  }
]
users.map(({ name, age }) => `name: ${name}, age: ${age}`).join('\n')
// 解构函数实参
function print({ name = '未设置', age = 0 } = {}) {
  console.log(`姓名：${name}，年龄：${age}`)
}
```

啊嘞，吾辈好像不知不觉间把解决方案写出来了。。。？

### 分析

让我们好好看下这段代码

```js
function print({ name = '未设置', age = 0 } = {}) {
  console.log(`姓名：${name}，年龄：${age}`)
}
```

一眼看过去，是不是感觉很直观，如果稍微了解一点 ES6 就能瞬间明白这是解构赋值以及默认参数

我们分析一下具体流程

1. 调用 `print` 函数
2. 检查参数是否为有值，没有的话设置默认值 `{}`  
   相当于

   ```js
   if (!user) {
     user = {}
   }
   ```

3. 解构参数，检查解构的属性是否有值，没有的话设置默认值  
    相当于

   ```js
   var name
   if (!user.name) {
     name = '未设置'
   } else {
     name = user.name
   }
   var age
   if (!user.age) {
     age = 0
   } else {
     age = user.age
   }
   ```

4. 进入函数内部

关键就在于第 2,3 步，[默认参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters) 和 [解构赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) 都是 ES6 的新特性，善于使用能大大简化代码的繁琐性。

---

希望有更多的人能够学会怎么使用，让我们早日抛弃 babel 吧 (\*＾ ▽ ＾)／
