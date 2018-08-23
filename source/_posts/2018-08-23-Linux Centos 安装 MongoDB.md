---
title: Linux Centos 安装 MongoDB
date: 2018-08-23 10:02:55
tags: [Linux, DB]
---
# Linux Centos 安装 MongoDB

## 创建一个 `mongodb` 的 `yum` 仓库

```bash
vim /etc/yum.repos.d/mongodb-org-3.6.repo
```

内容是

```conf
[mongodb-org-3.6]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/3.6/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.6.asc
```

> 注：此处复制的时候不要漏掉什么内容就好。。。

## 安装一下

```bash
yum install -y mongodb-org
```

## 创建 `mongodb` 的数据文件目录

```bash
mkdir -p /data/db
```

## 启动服务测试一下

启动 `mongod` 服务

```bash
service mongod start
```

连接 `mongo shell`

```bash
mongo
```

应该会得到下面的输出

```bash
MongoDB shell version v3.6.7
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.6.7
Server has startup warnings:
2018-08-23T08:57:46.048+0800 I STORAGE  [initandlisten]
2018-08-23T08:57:46.048+0800 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2018-08-23T08:57:46.048+0800 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
2018-08-23T08:57:47.190+0800 I CONTROL  [initandlisten]
2018-08-23T08:57:47.190+0800 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2018-08-23T08:57:47.190+0800 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2018-08-23T08:57:47.190+0800 I CONTROL  [initandlisten]
2018-08-23T08:57:47.190+0800 I CONTROL  [initandlisten]
2018-08-23T08:57:47.190+0800 I CONTROL  [initandlisten] ** WARNING: /sys/kernel/mm/transparent_hugepage/enabled is 'always'.
2018-08-23T08:57:47.190+0800 I CONTROL  [initandlisten] **        We suggest setting it to 'never'
2018-08-23T08:57:47.190+0800 I CONTROL  [initandlisten]
2018-08-23T08:57:47.190+0800 I CONTROL  [initandlisten] ** WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'.
2018-08-23T08:57:47.190+0800 I CONTROL  [initandlisten] **        We suggest setting it to 'never'
2018-08-23T08:57:47.190+0800 I CONTROL  [initandlisten]
2018-08-23T08:57:47.190+0800 I CONTROL  [initandlisten] ** WARNING: soft rlimits too low. rlimits set to 4096 processes, 65535 files. Number of processes should be at least 32767.5 : 0.5 times number of files.
2018-08-23T08:57:47.190+0800 I CONTROL  [initandlisten]
```
