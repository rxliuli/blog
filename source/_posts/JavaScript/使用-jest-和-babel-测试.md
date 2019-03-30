---
layout: post
title: 使用 jest 和 babel 测试
tags:
  - JavaScript
  - 记录
abbrlink: 3a7e1b3c
date: 2019-03-30 13:39:46
---

# 使用 jest 和 babel 测试

> [博客](https://blog.rxliuli.com/p/3a7e1b3c/), [GitHub 示例](https://github.com/rxliuli/jest-example)

## 场景

最近想为吾辈的工具函数库 [rx-util](https://github.com/rxliuli/rx-util) 添加单元测试，因为目前还在学习 ReactJS，所以最终选择了 Fackbook 家的 jest 进行测试。这里记录一下整个过程，以供他人参考。

> 注：`Babel` 是现代前端库的天坑之一，不保证不同版本按照该教程能正常完成。如果出现了错误，请对比示例项目库 [jest-example](https://github.com/rxliuli/jest-example)。

## 过程

### 添加依赖

使用 yarn 安装 jest 和 babel 的依赖项

```js
yarn add -D jest @types/jest babel-jest @babel/core @babel/preset-env
```

> 注: `@types/jest` 是 jest 的 ts 类型定义文件，而 vscode 便是基于 ts 进行代码提示的。

### 进行配置

添加 babel 配置

```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
}
```

在 package.json 中添加 test 命令（可选）

```json
"scripts": {
  "test": "jest --watch"
}
```

### 一般测试

现在，我们可以进行基本的测试了

在 _src_ 下添加一个 _add.js_

```js
// src/add.js
// @ts-check
/**
 * 相加函数
 * @param {Number} than 第一个数字
 * @param {Number} that 第二个数字
 * @returns {Number} 两数之和
 */
export function add(than, that) {
  return than + that
}
```

```js
// src/add.test.js
import { add } from './add'

test('test add', () => {
  expect(add(1, 2)).toBe(3)
})
```

添加稍微麻烦一点的测试

```js
// src/uniqueBy.js
// @ts-check

/**
 * js 的数组去重方法
 *  @typedef {any} T 参数数组以及函数的参数类型
 * @param {Array.<T>} arr 要进行去重的数组
 * @param {Function} fn 唯一标识元素的方法，默认使用 {@link JSON.stringify()}
 * @returns {Array.<T>} 进行去重操作之后得到的新的数组 (原数组并未改变)
 */
export function uniqueBy(arr, fn = item => JSON.stringify(item)) {
  const obj = {}
  return arr.filter(item =>
    obj.hasOwnProperty(fn(item)) ? false : (obj[fn(item)] = true),
  )
}
```

```js
// src/uniqueBy.test.js
import { uniqueBy } from './uniqueBy'

test('test uniqueBy', () => {
  expect(uniqueBy([1, 2, 3, 1, 2])).toEqual(expect.arrayContaining([1, 2, 3]))
})
```

### 异步测试

或许你会认为异步测试需要单独的配置？然而事实上 jest 不愧是开箱即用的，直接就可以使用 `async/await` 进行异步测试。

下面是一个简单的异步函数及其测试代码

```js
// src/wait.js
// @ts-check
/**
 * 等待指定的时间/等待指定表达式成立
 * @param {Number|Function} param 等待时间/等待条件
 * @returns {Promise} Promise 对象
 */
export function wait(param) {
  return new Promise(resolve => {
    if (typeof param === 'number') {
      setTimeout(resolve, param)
    } else if (typeof param === 'function') {
      var timer = setInterval(() => {
        if (param()) {
          clearInterval(timer)
          resolve()
        }
      }, 100)
    } else {
      resolve()
    }
  })
}
```

```js
// src/wait.test.js
import { wait } from './wait'

test('test wait sepecify time', async () => {
  const start = Date.now()
  await wait(1000)
  expect(Date.now() - start).toBeGreaterThanOrEqual(1000)
})
```

### 集成 ESLint

一般而言，项目中都会使用 eslint 进行代码规范，而 jest 所使用的全局变量 `test` 和 `expect` 却并不符合 eslint 默认的规范。

添加 eslint 依赖，这里选择 `standard` 模板

```js
yarn add -D eslint standard
```

然后初始化 eslint 配置项

```js
yarn eslint --init
```

这里也添加一个 script 便于运行

```json
"scripts": {
  "lint": "eslint --fix ./src/"
}
```

现在回到 `src/add.js`，可以看到 `test/expect` 上都已经出现错误警告，其实消除错误很简单。

安装依赖

```js
yarn add -D eslint-plugin-jest
```

修改 eslint 默认配置文件 `.eslintrc.js`，最终结果如下

```js
module.exports = {
  env: {
    browser: true,
    es6: true,
    // 配置项目使用了 jest
    'jest/globals': true,
  },
  extends: 'standard',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {},
  // 配置 jest 的插件
  plugins: ['jest'],
}
```

那么，使用 `yarn lint`，一切都将正常运行！
