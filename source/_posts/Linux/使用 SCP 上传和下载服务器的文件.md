---
title: 使用 SCP 上传和下载服务器的文件
tags: Linux
abbrlink: 8c85cbe2
date: 2018-08-11 01:39:21
updated: 2018-08-11 01:39:21
---

# 使用 SCP 上传和下载服务器的文件

## 简介

`SCP` 是一个用于 `Linux` 之间文件传输的轻量工具（基于 `SSH`），命令使用起来十分简单，唯一的缺点大概就是不支持断点续传了。

## 本地 >> 远程

1. 将本地文件上传到服务器  
   命令格式：

   ```bash
   scp localFile user@ip:remoteDir
   ```

   - localFile：本地文件的路径
   - user@ip：服务器的用户名/IP
   - remoteDir：服务器上的目录，本地文件将被上传到该目录下

   例如下面将本地的 ssh 公钥上传到服务器的 `~`（当前用户目录）

   ```bash
   scp ~/.ssh/id_rsa.pub user@191.2.2.131:~
   ```

2. 将本地目录上传到服务器  
   命令格式：

   ```bash
   scp -r localDir user@ip:remoteDir
   ```

   - -r：递归整个目录
   - localDir：本地目录的路径
   - user@ip：服务器的用户名/IP
   - remoteDir：服务器上的目录，本地目录将被上传到该目录下

   例如下面将本地的 `/d/ssh` 目录上传到服务器 `~` 目录下

   ```bash
   scp -r /d/ssh/ user@191.2.2.131:~
   ```

> 其实你应该已经发现了，文件与目录的却别就在于一个 `-r` 参数而已

## 远程 >> 本地

1. 下载服务器文件到本地
   命令格式：

   ```bash
   scp user@ip:remoteFile localDir
   ```

   - user@ip：服务器的用户名/IP
   - remoteFile：服务器上文件的路径
   - localDir：本地的目录，服务器文件将被下载到该目录下

   例如下面将服务器的 ssh 公钥下载到本地的 `~` 下面

   ```bash
   scp user@191.2.2.131:~/.ssh/id_rsa.pub ~
   ```

2. 下载服务器目录到本地
   命令格式：

   ```bash
   scp -r user@ip:remoteDir localDir
   ```

   - -r：递归整个目录
   - user@ip：服务器的用户名/IP
   - remoteDir：服务器上的目录
   - localDir：本地的目录，服务器目录将被下载到该目录下

   例如下面将服务器的 .ssh 目录下载到本地的 `~` 下面

   ```bash
   scp -r user@191.2.2.131:~/.ssh ~
   ```

## 下面列出 SCP 的全部选项

> 很多并不一定用得到，但还是有存在的意义的

- 1： 强制 scp 命令使用协议 ssh1
- 2： 强制 scp 命令使用协议 ssh2
- 4： 强制 scp 命令只使用 IPv4 寻址
- 6： 强制 scp 命令只使用 IPv6 寻址
- B： 使用批处理模式（传输过程中不询问传输口令或短语）
- C： 允许压缩。（将 - C 标志传递给 ssh，从而打开压缩功能）
- p：保留原文件的修改时间，访问时间和访问权限。
- q： 不显示传输进度条。
- r： 递归复制整个目录。
- v：详细方式显示输出。scp 和 ssh(1) 会显示出整个过程的调试信息。这些信息用于调试连接，验证和配置问题。
- c cipher： 以 cipher 将数据传输进行加密，这个选项将直接传递给 ssh。
- F ssh_config： 指定一个替代的 ssh 配置文件，此参数直接传递给 ssh。
- i identity_file： 从指定文件中读取传输时使用的密钥文件，此参数直接传递给 ssh。
- l limit： 限定用户所能使用的带宽，以 Kbit/s 为单位。
- o ssh_option： 如果习惯于使用 ssh_config(5) 中的参数传递方式，
- P port：注意是大写的 P, port 是指定数据传输用到的端口号
- S program： 指定加密传输时所使用的程序。此程序必须能够理解 ssh(1) 的选项。
