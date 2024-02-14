---
layout: post
title: Git Push 提示不支持具有 Socks5 方案的代理
abbrlink: ea4c1bd6f73d4faeadf389d0bb269bd3
tags:
  - git
categories:
  - 其他
  - Git
  - "# Git Push 提示不支持具有 Socks5 方案的代理.md"
date: 1580652937987
updated: 1589552772527
---

## 场景

使用 `Git Push` 提交代码到远程服务器时提示了一个错误

```bash
fatal: NotSupportedException encountered.
   ServicePointManager 不支持具有 socks5 方案的代理。
```

## 问题

然而之后还是正常提交成功了，实际上问题是：

1. 配置了本地的 `socks5` 的代理（`Shadowsocks` 之类的代理软件）
2. 配置了远程服务器 `Git` 服务端的 `SSH`
3. 本地提交代码到远程服务器时使用的是 `http/https` 协议

这三者只要有一个不满足就不会出现这个错误了

## 解决方案

1. 取消代理
   使用以下简单命令即可取消代理

   ```bash
   git config --global --unset http.proxy
   git config --global --unset https.proxy
   ```

   > 注：取消代理会出现另外一个错误，所以并不能解决实际问题
   >
   > ```bash
   > git config --global --unset http.proxy
   > git config --global --unset https.proxy
   > ```

2. 取消远程的 `SSH`
   在下面的页面中删除你的 `SSH Keys` 即可

   > - [GitHub](https://github.com/settings/keys)
   > - [Bitbucket](https://bitbucket.org/account/user/your_username/ssh-keys/)

3. 提交内容到远程 `Git` 服务器时选择 `SSH` 协议
   设置远程仓库为 `SSH` 协议，例如 `GitHub` 的 `SSH` 链接就是 <<git@github.com>:rxliuli/rxliuli.github.io.git>

好了，关于 `Git` 提示错误 *Git Push 提示不支持具有 Socks5 方案的代理* 就到这里啦
