---
title: Git 设置和取消代理
tags: Git
abbrlink: 9b8bc525
date: 2018-07-23 00:00:00
updated: 2018-10-06 00:00:00
---
# Git 设置和取消代理

## 设置代理：

```bash
git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'
```

> 注：此处设置的代理 ip 和端口号都是本地存在的（**SS/SSR** 默认就是）。

## 取消代理

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## Git 全局配置文件位置

根配置文件 `/etc/gitconfig`
> Windows 的话在 Git 安装目录下 `/mingw64/etc/gitconfig`，不过最好不要动这个
当前用户 Git 配置 `~/.gitconfig`

在配置文件里面添加以下内容也可以添加代理：

```conf
[https]
        proxy = socks5://127.0.0.1:1080
[http]
        proxy = socks5://127.0.0.1:1080
```

## 遇到的坑

设置了代理之后很容易碰到一个问题：[Git Push 提示不支持具有 Socks5 方案的代理](https://blog.rxliuli.com/2018/08/25/Tool/Git/Git%20Push%20%E6%8F%90%E7%A4%BA%E4%B8%8D%E6%94%AF%E6%8C%81%E5%85%B7%E6%9C%89%20Socks5%20%E6%96%B9%E6%A1%88%E7%9A%84%E4%BB%A3%E7%90%86/)

> 具体 Git 相关的内容建议参考 [Pro Git](https://git-scm.com/book/zh/v2)