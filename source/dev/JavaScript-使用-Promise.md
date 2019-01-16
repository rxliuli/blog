---
layout: post
title: JavaScript 使用 Promise
date: 2019-01-16 13:17:28
tags: [JavaScript, 教程]
---

# JavaScript 使用 Promise

## 场景

## 示例

```js
/**
 * 等待指定的时间/等待指定表达式成立后执行
 * @param {Number|Function} param 等待时间/等待条件
 * @returns {Promise} Promise 异步对象
 */
function wait(param) {
  return new Promise(resolve => {
    if (typeof param === 'number') {
      setTimeout(resolve, param)
    } else if (typeof param === 'function') {
      const timer = setInterval(() => {
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

/**
 * 读取本地浏览器选择的文件
 * @param {File} file 选择的文件
 * @param {{String}} init 一些初始选项，目前只有 type 一项
 * @returns {Promise} 返回了读取到的内容（异步）
 */
const readLocal = (() => {
  const result = (file, { type = 'readAsDataURL' } = {}) =>
    new Promise((resolve, reject) => {
      if (!file) {
        reject('file not exists')
      }
      const fr = new FileReader()
      fr.onload = event => {
        resolve(event.target.result)
      }
      fr.onerror = error => {
        reject(error)
      }
      fr[type](file)
    })
  result.DataURL = 'readAsDataURL'
  result.Text = 'readAsText'
  result.BinaryString = 'readAsBinaryString'
  result.ArrayBuffer = 'readAsArrayBuffer'
  return result
})()

/**
 * 测试函数的执行时间
 * 注：如果函数返回 Promise，则该函数也会返回 Promise，否则直接返回执行时间
 * @param {Function} fn 需要测试的函数
 * @returns {Number|Promise} 执行的毫秒数
 */
function timing(fn) {
  const begin = performance.now()
  const result = fn()
  if (!(result instanceof Promise)) {
    return performance.now() - begin
  }
  return result.then(() => performance.now() - begin)
}
```
