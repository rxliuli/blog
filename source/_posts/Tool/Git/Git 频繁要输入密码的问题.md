---
title: Git 频繁要输入密码的问题
date: 2018-08-20 01:39:21
tags: Git
---
# Git 频繁要输入密码的问题

## 场景

突然就遇到了，每次使用 `Git` 进行 `pull`/`push` 操作时都要输入密码，真是超级麻烦！

## 原因

在 `Git` 服务器上面设置了 `SSH` 密钥但仍然使用 `HTTP/HTTPS` 连接就会出现这个问题

## 解决方案

### 1. 配置一个本地文件记录用户名/密码

进入到 git 根目录下，执行下面的命令即可

```bash
git config --global credential.helper store
```

### 2. 使用 SSH 连接

在本机生成一个密钥对（已有的话就不需要了），参见 [使用-SSH-连接-Linux-服务器](https://blog.rxliuli.com/2018/08/10/%E4%BD%BF%E7%94%A8-SSH-%E8%BF%9E%E6%8E%A5-Linux-%E6%9C%8D%E5%8A%A1%E5%99%A8.html)，将密钥对的公钥（`id_rsa.pub`）配置到你的远程仓库即可。

> [GitHub SSH 设置](https://github.com/settings/keys)