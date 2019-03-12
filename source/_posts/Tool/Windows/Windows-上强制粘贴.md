---
layout: post
title: Windows 上强制粘贴
tags:
  - Windows
abbrlink: '47137298'
date: 2019-02-19 20:56:36
updated: 2019-02-19 00:00:00
---

# Windows 上强制粘贴

## 场景

前面吾辈曾经写过一篇 [Chrome 强制复制粘贴](https://blog.rxliuli.com/p/58a7c146/) 的文章，然而那篇内容仅仅只是针对于 Chrome/Firefox 浏览器。对于 Windows 的客户端软件，例如 QQ、阿里旺旺之类，它们还是不允许粘贴密码。这点对于所有密码都是用密码管理器管理，随机生成的用户而言（吾辈），实在是太过讨厌了一点！

## 解决思路

QQ 这种客户端是如何屏蔽粘贴功能的呢？很显然，QQ 不仅仅是禁用右键/快捷键那么简单，或许是添加键盘驱动了也说不定。但不管怎样，我们都可以从根本的地方下手 -- **模拟键盘输入，将剪切版的文字一个一个的输入进去！**

## 解决方案

虽然不像 Linux 那样任何操作都可以使用脚本去控制（实际上也可以，只不过 Windows 的 `cmd` 脚本实在不怎么样），然而基于 Windows 丰富的生态，还是有人做出了第三方的脚本语言 -- **Autohotkey**。

我们首先去 [官网](https://www.autohotkey.com/) 看一下，介绍只有简单的两句话。

> Powerful. Easy to learn.  
> The ultimate automation scripting language for Windows.

翻译过来就是：

> 强大，简单易学  
> Windows 上的自动化脚本语言

我们可以写一个 Autohotkey 自动化的脚本，在检测到 QQ 运行并且按下 **CS-V** 时将剪切版的字符逐个输入进去。

## 具体实现

```ahk
#IfWinActive ahk_exe QQ.exe
{
    ;热键为 Ctrl+Shift+V
    ^+v::
    ;发送剪切版的内容到输入
    SendInput {Raw}%Clipboard%
    Return
}
#IfWinActive
```

当然，如果不喜欢安装 Autohotkey 的话也没关系，吾辈转换了一个 [.exe 可执行文件](https://blog.rxliuli.com/uploads/QQForcedPaste.exe)，也可以直接下载使用啦

## 使用效果

![使用示例](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190219214116.gif)
