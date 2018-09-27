---
title: JavaScript 加载全部资源后再使用
date: 2018-08-07 01:39:21
tags: JavaScript
---
# JavaScript 加载全部资源后再使用

## 场景

客户需要一次性将视频全部缓冲完成再进行观看而非看一段缓冲一段，所以就看了一下有没有什么方法能够做到，结果顺便还写了一个通用的加载资源的方法。

## 实现

基本思路是使用 `ajax`(`fetch`) 将资源先加载到本地，然后生成一个本地的 url，最后将本地资源链接赋值给需要资源的元素上。

```js
/**
    * 将 url 中的内容加载到元素上
    * 注：domSelector 必须有 src 属性用以将加载完成的资源赋值给其，加载默认是异步的
    * @param {string} url url 资源
    * @param {document} domSelector dom 选择器
    * @param {object} init 初始化参数, 实为 fetch() 的参数以及一些自定义的参数
    * 关于 fetch 具体可以参考 <https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch>
    * 自定义的参数有:
    * before: 加载之前的方法，例如可以设置一个弹窗或者遮罩告诉用户资源正在加载中
    * after: 加载完成之后的方法，例如可以设置一个加载完成的动画提醒一下用户
    * error: 发生异常时的方法，例如可以设置一个错误提示通知用户加载异常需要刷新了
    */
function loadResource(url, domSelector, init) {
  if (!init) {
    init = {}
  }
  if (init.before && typeof init.before === 'function') {
    init.before()
  }
  // 如果没有自定义缓存的话就设置缓存
  init.cache = init.cache || 'force-cache';
  // 如果没有自定义错误处理就设置一下错误处理
  init.error = init.error || (error => console.log(`request was wrong: ${error}`));
  fetch(url, init)
    // 判断返回的状态是否正常
    .then(rep => {
      if (rep.status === 200) {
        return rep;
      } else {
        throw new Error(`response status error ${rep.status}`);
      }
    })
    // 转换资源
    .then(data => data.blob())
    .then(blob => {
      // 生成一个本地的 url 并赋值给 src 属性
      domSelector.src = window.URL.createObjectURL(blob);
      if (init.after && typeof init.after === 'function') {
        init.after();
      }
    })
    .catch(init.error)
}
```

## 使用示例

假如有一个 `video` 元素需要加载视频

```html
<video id="video" controls></video>
```

那么使用该方法的 `JavaScript` 代码就是

```js
// 要加载的 url 资源
var url = '/html/testVideo.m4';
// 资源的容器，这里是一个视频元素
var video = document.querySelector('#video');

// 此处使用第三个参数仅为演示，不需要的话忽略即可。。。
loadResource(url, video, {
  before: () => console.log('video load before'),
  after: () => console.log('video load after'),
  error: error => console.log(`video load error: ${error}`)
})
// 即可以：
loadResource(url, video)
```

> 注：此方法不仅可以加载视频，也可以加载 audio, img 等拥有 src 属性的二进制资源
>
> 这个方法同样也已经丢到了 [GitHub Gist](https://gist.github.com/rxliuli/1bf04abd0e91718a901b97762beb0eb9) 上面啦