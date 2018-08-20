---
title: Git 设置和取消代理
date: 2018-07-23 01:39:21
tags: Git
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

> 具体 Git 相关的内容建议参考 [Pro Git](https://git-scm.com/book/zh/v2)