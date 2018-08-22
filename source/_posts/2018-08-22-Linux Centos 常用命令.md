---
title: Linux Centos 常用命令
date: 2018-08-22 22:24:37
updated: 2018-08-22 22:24:37
tags: Linux
---
# Linux Centos 常用命令

- [Linux Centos 常用命令](#linux-centos-常用命令)
  - [分类](#分类)
    - [进程](#进程)
      - [`nohup`：后台运行命令](#nohup后台运行命令)
      - [`setsid`：同样是后台运行命令](#setsid同样是后台运行命令)
      - [`pkill`：根据名字杀死进程](#pkill根据名字杀死进程)
    - [远程连接](#远程连接)
      - [`ssh`：远程连接到 `Linux` 服务器](#ssh远程连接到-linux-服务器)
      - [`scp`：`Linux` 下的文件传输工具](#scplinux-下的文件传输工具)

## 分类

### 进程

#### `nohup`：后台运行命令

例如想要运行一个程序的时候不会因为 `SSH` 退出而退出，就需要使用这个命令了。在需要执行的命令前面加上 `nohup`，之后就算用 `Ctrl+C` 停止了命令行的输出也不会影响刚才运行的命令本身。

#### `setsid`：同样是后台运行命令

虽然也是也个后台运行命令，但吾辈最近使用 `nohup` 总是失败，这个相比之下就安全多了

#### `pkill`：根据名字杀死进程

不需要在先使用 `ps ef|grep name` 查看进程的 `pid` 再使用 `kill -9 pid` 去杀死进程了，直接使用 `pkill name` 就可以杀死进程了呢

### 远程连接

#### `ssh`：远程连接到 `Linux` 服务器

使用 `ssh username@ip` 就可以连接远程的开启了 `SSH` 服务端的服务器（`Linux` 系统默认就有）。  
使用 `ssh username@ip "ls /"` 甚至可以远程发送一些命令到 `Linux` 服务器执行，对于脚本而言还是挺好的。

#### `scp`：`Linux` 下的文件传输工具

使用 `scp` 命令可以轻易地在本地与服务器之间传输文件，一个基本的示例是：

```bash
# 将本地的 ssh 公钥上传到 Linux 服务器
scp ~/.ssh/id_rsa.pub username@ip:~/.ssh/
```

> 具体可以参考：[使用 SCP 上传和下载服务器的文件](./2018-08-10-使用 SSH 连接 Linux 服务器.md)

---
> 该页面持续更新中
