---
layout: post
title: Windows 下 MongoDB 便携版安装与初始化
abbrlink: bef08cec63cd48fca96fec5a049ab920
tags:
  - sql
  - windows
categories:
  - 其他
  - NOSQL
date: 1587219249414
updated: 1609305544293
---

> [官网](https://www.mongodb.org/)

## 下载

> [下载位置](https://www.mongodb.org/dl/win32/x86_64-2008plus-ssl)

选择一个便携版本下载（`.zip` 结尾），例如吾辈选择的就是 [win32/mongodb-win32-x86\_64-2008plus-ssl-4.0.1.zip](http://downloads.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-4.0.1.zip)

## 配置环境变量

下载完成后解压到本地，将 `/bin/` 目录添加环境变量 `Path` 中以方便使用 `mongodb` 的命令。

配置完成后验证一下

```sh
mongo -version
```

如果环境变量配置正确的话会有类似于下面的这种输出

```sh
MongoDB shell version v4.0.1
```

## 配置日志文件与数据目录

吾辈的 `mongodb` 的安装目录是 `D:\Program\mongodb-win32-x86_64-2008plus-ssl-4.0.1`，所以就在安装目录下创建数据与日志目录了。

目录列表如下：

- mongodb\_data
  - log
    - mongodb.log
  - data

指定日志文件的位置

```sh
mongod --logpath "D:\Program\mongodb-win32-x86_64-2008plus-ssl-4.0.1\mongodb_data\log\mongodb.log"
```

指定数据存放的目录

```sh
mongod --dbpath "D:\Program\mongodb-win32-x86_64-2008plus-ssl-4.0.1\mongodb_data\data"
```

输出

```sh
2018-08-08T22:26:35.411+0800 I CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
```

然后，就停住了，其实这里并未发生错误，仔细看最后一行 `NETWORK [listener] connection accepted from 127.0.0.1:12598`，指的是正在监听连接 `127.0.0.1:12598`。所以这个时候在开一个新的 `cmd` 标签输入 `mongo` 命令就进入到 `mongo shell` 里面玩耍啦

## 安装服务

每次打开都要手动输入命令指定数据目录并启动 `mongod` 未免麻烦，我们可以将之添加到系统服务中，以后需要的时候只要启动服务就好了，也能设置自动启动什么的了呢

```sh
mongod --dbpath "D:\Program\mongodb-win32-x86_64-2008plus-ssl-4.0.1\mongodb_data\data" --logpath "D:\Program\mongodb-win32-x86_64-2008plus-ssl-4.0.1\mongodb_data\log\mongodb.log" --auth --install --serviceName "MongoDB"
```

检查一下系统服务里面是否有 `MongoDB`，如果没有的话使用管理员权限打开 `cmd` 再执行一次上面的命令就好了，如果服务没有启动的话就启动它。

这样便安装完成了，在命令行输入 `mongo` 就可以啦
