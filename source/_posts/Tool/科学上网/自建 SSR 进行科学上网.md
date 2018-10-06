---
title: 自建 SSR 进行科学上网
date: 2018-08-21 01:39:21
tags: 科学上网
---
# 自建 SSR 进行科学上网

## 购买服务器

首先需要需要一台在国外并且能够正常访问的服务器，可以使用 [vultr](https://my.vultr.com/) 这个服务提供商，也可以选择其他的。

## 安装 SSR

先在服务器上安装一下 **SSR** 的服务端，嗯，其实也就是复制一下命令的事情（具体的操作由脚本帮忙执行了）

```bash
yum -y install wget
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssr.sh && chmod +x ssr.sh && bash ssr.sh
```

> 注：在你安装完成后显示的信息中不要去查看二维码，因为 **SS/SSR** 链接在你访问 <http://doub.pw> 查看二维码的时候被服务器记录，以防万一还是不要去访问比较好。。。

## 安装 BBR

**BBR** 是一个单边加速工具，能够保持线路稳定。也安装一下，安装完成重启服务器就好。

```bash
yum -y install wget
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh
chmod +x bbr.sh
./bbr.sh
```

## 安装 SSR 客户端

> [GitHub](https://github.com/shadowsocksrr)

访问上面的 **SSR** 的 GitHub 地址，在上面找到你所需要的客户端即可（基本上主流平台都有了）