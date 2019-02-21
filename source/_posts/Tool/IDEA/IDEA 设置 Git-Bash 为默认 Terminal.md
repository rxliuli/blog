---
title: IDEA 设置 Git-Bash 为默认 Terminal
tags: IDEA
abbrlink: '33085091'
date: 2018-08-09 01:39:21
---
# IDEA 设置 Git-Bash 为默认 Terminal

IDEA 默认集成了 **Terminal**，但默认使用的终端确是 `cmd.exe`（`Windows10` 默认则是 `PowerShell`）。而众所周知，`Windows` 在命令行上做得确实有够难用的，所以我们可以选择其他的第三方终端进行使用。

这里演示一下使用 `Git-Bash` 作为默认集成的终端

在设置 `Settings > Tools > Terminal` 下有一个 `Shell path` 的选择框。

在里面填写以下内容：

```bash
"D:\Program\cmder\vendor\git-for-windows\bin\bash.exe"  -login -i
```

> 注：这里吾辈直接使用了 `cmder` 内置的 `Git` 客户端，关于 `cmder` 可以参考另外一篇内容：<https://blog.rxliuli.com/2018/06/27/Windows-%E4%B8%8B%E5%AE%89%E8%A3%85%E4%B8%8E%E9%85%8D%E7%BD%AE-cmder.html>  
> 而且使用 Git-Bash 的话最好确保安装的 Git 是最新版本，否则 IDEA Terminal 有可能出现光标位置偏移的错误。

字符串中的内容是本机上的 `Git-Bash` 的程序完全路径，后面两个参数则是为了避免在 `IDEA` 集成的终端下发生有中文时光标异常的问题。