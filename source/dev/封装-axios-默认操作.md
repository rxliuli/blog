---
layout: post
title: 封装 axios 默认操作
tags:
  - JavaScript
abbrlink: a58124dd
date: 2019-03-05 23:10:45
---

# 封装 axios 默认操作

```js
var rxajax = (function(axios) {
  return {
    /**
     * 发出 get 请求
     * @param {String} url url 链接
     * @param {AxiosRequestConfig} config 配置项
     */
    get(url, config) {
      return axios.get(url, config)
    },
    /**
     *
     * @param {String} url url 链接
     * @param {Object} data 数据对象，可选
     * @param {AxiosRequestConfig} config 配置项
     */
    post(url, data, config) {
      const fd = new FormData()
      if (data !== undefined) {
        for (const k in data) {
          if (data.hasOwnProperty(k)) {
            const v = data[k]
            fd.append(k, v)
          }
        }
      }
      return axios.post(url, fd, config)
    },
  }
})(
  axios.create({
    timeout: 10000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformResponse: [
      function(data) {
        // TODO 这里做一些自定义的处理
        return data
      },
    ],
  }),
)
```
