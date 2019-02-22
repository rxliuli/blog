---
title: Chrome 强制复制粘贴
tags:
  - Tool
  - Chrome
abbrlink: 58a7c146
date: 2018-10-01 00:00:00
---

# Chrome 强制复制粘贴

## 场景

> 如果你是一位开发者，可以看一下另一篇博客 [使用 Greasemonkey 解除网页复制粘贴限制](https://blog.rxliuli.com/2018/12/23/javascript/%E4%BD%BF%E7%94%A8-greasemonkey-%E8%A7%A3%E9%99%A4%E7%BD%91%E9%A1%B5%E5%A4%8D%E5%88%B6%E7%B2%98%E8%B4%B4%E9%99%90%E5%88%B6/)。或许，你能找到更好的方式

登录支付宝时突然发现密码框不能 C-V 粘贴，也无法使用右键了。提示说是为了安全，实际上不就是为了让人使用 App 扫码么。。。想尽办法为难 PC 用户，这次 Chrome 的强制复制插件也没能起到作用。然而不管其是如何实现禁用粘贴/禁用右键的，但其一定需要用到 JavaScript，有了这个思路，只要暂时禁用 JavaScript 就好了。

## 具体步骤

使用 F12 打开 Chrome 开发者工具，勾选 **Setting -> Preferences -> Debugger -> Disable JavaScript**，临时禁用掉 JavaScript，然后在粘贴密码之后记得要取消勾选哦，因为支付宝的登录还要用到 JavaScript 呢

1. 打开 Chrome 开发者工具  
   [![打开 Chrome 开发者工具](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190117221230.png)](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190117221230.png)
2. 临时禁用 JavaScript  
   [![临时禁用 JavaScript](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190117221505.png)](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190117221505.png)

> 快速切换的方法暂且还没有找到 Chrome 插件呢，有什么好推荐的也可以告诉吾辈哦
