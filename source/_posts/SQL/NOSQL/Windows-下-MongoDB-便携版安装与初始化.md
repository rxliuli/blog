---
title: Windows 下 MongoDB 便携版安装与初始化
date: 2018-08-08 01:39:21
updated: 2019-02-22
tags: [Windows, DB, MongoDB]
---

# Windows 下 MongoDB 便携版安装与初始化

> [官网](https://www.mongodb.org/)

## 下载

> [下载位置](https://www.mongodb.org/dl/win32/x86_64-2008plus-ssl)

选择一个便携版本下载（`.zip` 结尾），例如吾辈选择的就是 [win32/mongodb-win32-x86_64-2008plus-ssl-4.0.1.zip](http://downloads.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-4.0.1.zip)

## 配置环境变量

下载完成后解压到本地，将 `/bin/` 目录添加环境变量 `Path` 中以方便使用 `mongodb` 的命令。

配置完成后验证一下

```bash
mongo -version
```

检查一下系统服务里面是否有 `MongoDB`，如果没有的话使用管理员权限打开 `cmd` 再执行一次上面的命令就好了，如果服务没有启动的话就启动它。

这样便安装完成了，在命令行输入 `mongo` 就可以啦
