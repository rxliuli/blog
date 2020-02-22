---
title: 自建 SSR 进行科学上网
abbrlink: caca3b07
date: 2018-08-21 01:39:21
updated: 2020-02-23
tags:
  - 教程
---

> 目前吾辈不推荐自建的行为，因为学习、使用和维护成本较高，使用一个合适的机场一年下来花个几百块省点心还是值得的。当然，一切都取决于你 -- 事物的价值取决于被需要的程度。
> 具体大佬的评测可以参考 [浅谈部分机场（SS/SSR 提供商）的使用感受](https://www.notion.so/rxliuli/SS-SSR-DuyaoSS-c36372860f91499b87b1633007e28edd)，这里吾辈仅推荐 [BosLife](https://boslife.biz/aff.php?aff=2114)。

## 购买服务器

首先需要需要一台在国外并且能够正常访问的服务器，可以使用 [vultr](https://www.vultr.com/?ref=7239719) 这个服务提供商，也可以选择其他的。

## 安装 SSR

先在服务器上安装一下 **SSR** 的服务端，嗯，其实也就是复制一下命令的事情（具体的操作由脚本帮忙执行了）

```bash
yum -y install wget
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssr.sh && chmod +x ssr.sh && bash ssr.sh
```

如果上面的链接失效，请将以下 bash 命令复制到 `.sh` 文件中执行

> 注：在你安装完成后显示的信息中不要去查看二维码，因为 **SS/SSR** 链接在你访问 <http://doub.pw> 查看二维码的时候被服务器记录，以防万一还是不要去访问比较好。。。

## 安装 BBR

**BBR** 是一个单边加速工具，能够保持线路稳定。也安装一下，安装完成重启服务器就好。

```bash
yum -y install wget
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh
chmod +x bbr.sh
./bbr.sh
```

如果上面的链接失效，请将以下 bash 命令复制到 `.sh` 文件中执行

## 安装 SSR 客户端

> [GitHub](https://github.com/shadowsocksrr)

访问上面的 SSR 的 GitHub 地址，在上面找到你所需要的客户端即可（基本上主流平台都有了）
