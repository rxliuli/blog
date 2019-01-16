---
layout: post
title: JavaScript 避免使用 if-else 的方法
date: 2019-01-15 10:47:30
tags: [JavaScript, 教程]
---

# JavaScript 避免使用 if-else 的方法

## 场景

在日常编写 JavaScript 代码的过程中，或许会遇到一个很常见的问题。根据某个状态，进行判断，并执行不同的操作。吾辈并不是说 `if-else` 不好，简单的逻辑判断 `if-else` 毫无疑问是个不错的选择。然而在很多时候似乎我们习惯了使用 `if-else`，导致代码不断庞大的同时复杂度越来越高，所有的 JavaScript 代码都乱作一团，后期维护时越发困难。  
例如下面这段代码，点击不同的按钮，显示不同的面板。

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>JavaScript 避免使用 if-else</title>
  </head>
  <body>
    <main>
      <div id="tab">
        <label>
          <input type="radio" data-index="1" name="form-tab-radio" />
          第一个选项卡
        </label>
        <label>
          <input type="radio" data-index="2" name="form-tab-radio" />
          第二个选项卡
        </label>
        <label>
          <input type="radio" data-index="3" name="form-tab-radio" />
          第三个选项卡
        </label>
      </div>
      <form id="extends-form"></form>
    </main>
    <script src="./js/if-else.js"></script>
  </body>
</html>
```

```js
// js/if-else.js
document.querySelectorAll('#tab input[name="form-tab-radio"]').forEach(el => {
  el.addEventListener('click', () => {
    const index = el.dataset.index
    const header = el.parentElement.innerText.trim()
    // 如果为 1 就添加一个文本表单
    if (index === '1') {
      document.querySelector('#extends-form').innerHTML = `
            <header><h2>${header}</h2></header>
            <div>
              <label for="name">姓名</label>
              <input type="text" name="name" id="name" />
            </div>
            <div>
              <label for="age">年龄</label>
              <input type="number" name="age" id="age" />
            </div>
            <div>
              <button type="submit">提交</button> <button type="reset">重置</button>
            </div>
          `
    } else if (index === '2') {
      document.querySelector('#extends-form').innerHTML = `
        <header><h2>${header}</h2></header>
        <div>
          <label for="avatar">头像</label>
          <input type="file" name="avatar" id="avatar" />
        </div>
        <div><img id="avatar-preview" src="" /></div>
        <div>
          <button type="submit">提交</button> <button type="reset">重置</button>
        </div>
      `
      function readLocalFile(file) {
        return new Promise((resolve, reject) => {
          const fr = new FileReader()
          fr.onload = event => {
            resolve(event.target.result)
          }
          fr.onerror = error => {
            reject(error)
          }
          fr.readAsDataURL(file)
        })
      }
      document.querySelector('#avatar').addEventListener('change', evnet => {
        const file = evnet.target.files[0]
        if (!file) {
          return
        }
        if (!file.type.includes('image')) {
          return
        }
        readLocalFile(file).then(link => {
          document.querySelector('#avatar-preview').src = link
        })
      })
    } else if (index === '3') {
      const initData = new Array(100).fill(0).map((v, i) => `第 ${i} 项内容`)
      document.querySelector('#extends-form').innerHTML = `
        <header><h2>${header}</h2></header>
        <div>
          <label for="search-text">搜索文本</label>
          <input type="text" name="search-text" id="search-text" />
          <ul id="search-result"></ul>
        </div>
      `
      document
        .querySelector('#search-text')
        .addEventListener('input', evnet => {
          const searchText = event.target.value
          document.querySelector('#search-result').innerHTML = initData
            .filter(v => v.includes(searchText))
            .map(v => `<li>${v}</li>`)
            .join()
        })
    }
  })
})
```

那么，我们可以如何优化呢？

## 抽取函数

稍有些经验的 developer 都知道，如果一个函数过于冗长，那么就应该将之分离成多个单独的函数。

所以，我们的代码变成了下面这样

实现思路

1. 抽取每个状态对应执行的函数
2. 根据状态使用 `if-else/switch` 判断然后调用不同的函数

```js
// 抽取函数

function switchFirst(header) {
  document.querySelector('#extends-form').innerHTML = `
          ${header}
          <div>
            <label for="name">姓名</label>
            <input type="text" name="name" id="name" />
          </div>
          <div>
            <label for="age">年龄</label>
            <input type="number" name="age" id="age" />
          </div>
          <div>
            <button type="submit">提交</button> <button type="reset">重置</button>
          </div>
        `
}

function switchSecond(header) {
  document.querySelector('#extends-form').innerHTML = `
      ${header}
      <div>
        <label for="avatar">头像</label>
        <input type="file" name="avatar" id="avatar" />
      </div>
      <div><img id="avatar-preview" src="" /></div>
      <div>
        <button type="submit">提交</button> <button type="reset">重置</button>
      </div>
    `
  function readLocalFile(file) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader()
      fr.onload = event => {
        resolve(event.target.result)
      }
      fr.onerror = error => {
        reject(error)
      }
      fr.readAsDataURL(file)
    })
  }
  document.querySelector('#avatar').addEventListener('change', evnet => {
    const file = evnet.target.files[0]
    if (!file) {
      return
    }
    if (!file.type.includes('image')) {
      return
    }
    readLocalFile(file).then(link => {
      document.querySelector('#avatar-preview').src = link
    })
  })
}

function switchThree(header) {
  const initData = new Array(100).fill(0).map((v, i) => `第 ${i} 项内容`)
  document.querySelector('#extends-form').innerHTML = `
      ${header}
      <div>
        <label for="search-text">搜索文本</label>
        <input type="text" name="search-text" id="search-text" />
        <ul id="search-result"></ul>
      </div>
    `
  document.querySelector('#search-text').addEventListener('input', evnet => {
    const searchText = event.target.value
    document.querySelector('#search-result').innerHTML = initData
      .filter(v => v.includes(searchText))
      .map(v => `<li>${v}</li>`)
      .join()
  })
}

function switchTab(el) {
  const index = el.dataset.index
  const header = `<header><h2>${el.parentElement.innerText.trim()}</h2></header>`
  // 如果为 1 就添加一个文本表单
  if (index === '1') {
    switchFirst(header)
  } else if (index === '2') {
    switchSecond(header)
  } else if (index === '3') {
    switchThree(header)
  }
}

document.querySelectorAll('#tab input[name="form-tab-radio"]').forEach(el => {
  el.addEventListener('click', () => switchTab(el))
})
```

## Map 映射

如果我们不想使用 if else 进行各种判断，那么 `Map<Number, Function>` 或许是一个更好的选择。

实现思路

1. 创建一个 `Map<Number, Function>` `statusFnMap`，用以保存状态与执行函数的对应关系
2. 向 `statusFnMap` 添加状态与对应的函数
3. 调用者根据状态去获取到对应的函数并执行

具体实现

```js
```

主要优势

- 如果是一些比较简单的状态处理可以尝试使用这种方式，毕竟实现起来比较简单

## ES6 class：有限状态机

如果你知道 ES6 的 `class` 的话，应该也了解到目前 js 可以使用 `class` 模拟面向对象的继承，以及多态。

实现思路

1. 创建一个基类，并在其中声明一个需要被子类重写的方法
2. 根据不同的状态创建不同的子类，并分别实现基类的方法
3. 添加一个 `Builder` 类，用于根据不同的状态判断来创建不同的子类
4. 调用者使用 `Builder` 类构造出来的对象调用父类中声明的方法

具体实现

```js
```

主要优势

- 分离了状态与执行函数之间的关联，具体执行由具体的子类决定
- 子类允许包含独有的属性/方法
- 可扩展性更好，随时可以扩展任意多个子类

## ES6 class：无限状态机

上面使用 class 继承多态实现的状态机虽然很好，但却并不能应对 **不确定** 具体有多少种状态的情况。因为每个子类都与父类有着强关联，直接在父类中进行了声明。那么，有没有一种方式，可以让父类 **自动** 找到所有的子类呢？

1. 创建一个基类，并在其中声明一个需要被子类重写的方法
2. 根据不同的状态创建不同的子类，并分别实现基类的方法
3. 添加一个 `Builder` 类，使用反射拿到所有的子类，具体子类对应的状态由子类的某个属性决定
4. 使用 `Builder` 构造子类对象，并调用基类声明的方法

具体实现

```js
```

主要优势

- 虽然再次将状态与执行函数分离开来，然而内聚也是一种良好的状态
- 可扩展性最好，添加新的子类不影响父类及其他子类
