---
title: Chrome 强制复制粘贴
date: 2018-10-01
tags: [工具]
---

# Chrome 强制复制粘贴

## 场景

登录支付宝时突然发现密码框不能 C-V 粘贴，也无法使用右键了。提示说是为了安全，实际上不就是为了让人使用 App 扫码么。。。想尽办法为难 PC 用户，这次 Chrome 的强制复制插件也没能起到作用。然而不管其是如何实现禁用粘贴/禁用右键的，但其一定需要用到 JavaScript，有了这个思路，只要暂时禁用 JavaScript 就好了。

## 具体步骤

使用 F12 打开 Chrome 开发者工具，勾选 **Setting -> Preferences -> Debugger -> Disable JavaScript**，临时禁用掉 JavaScript，然后在粘贴密码之后记得要取消勾选哦，因为支付宝的登录还要用到 JavaScript 呢

[![打开 Chrome 设置](https://raw.githubusercontent.com/rxliuli/img-bed/master/2018/10/01/Snipaste_2018-10-01_00-00-42.png)](https://raw.githubusercontent.com/rxliuli/img-bed/master/2018/10/01/Snipaste_2018-10-01_00-00-42.png)

[![临时禁用 JavaScript](https://raw.githubusercontent.com/rxliuli/img-bed/master/2018/10/01/Snipaste_2018-10-01_00-01-48.png)](https://raw.githubusercontent.com/rxliuli/img-bed/master/2018/10/01/Snipaste_2018-10-01_00-01-48.png)

快速切换的方法暂且还没有找到 Chrome 插件呢，有什么好推荐的也可以告诉吾辈哦
