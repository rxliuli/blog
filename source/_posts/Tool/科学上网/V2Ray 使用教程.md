---
title: V2Ray 使用教程
tags:
  - FreeNetwork
  - 教程
abbrlink: dbfe5436
date: 2018-09-02 00:00:00
updated: 2019-01-04 00:00:00
---

# V2Ray 使用教程

## 介绍

> [官网](https://www.v2ray.com/), [GitHub](https://github.com/v2ray/v2ray-core), [非官方指南](https://toutyrater.github.io/)

Project V 提供了单一的内核和多种界面操作方式。内核（V2Ray）用于实际的网络交互、路由等针对网络数据的处理，而外围的用户界面程序提供了方便直接的操作流程。

V2Ray 的主要作用是根据用户的配置，对于传入的网络连接进行一定处理，然后发往指定的服务器。它是一个命令行程序，可以接受一个 JSON 格式的配置文件。

## 服务端

> 首先，你要有一台可以正常访问的国外服务器，例如 [Vultr](https://www.vultr.com/?ref=7239719)，最便宜的大概 \$3.5/month。

看到官网教程中那么庞大的文档，一般人都会表示瞬间不想玩了吧！

然而现在我们也可以使用 V2Ray 的傻瓜式一键部署脚本了，下面是 GitHub 的项目地址

> [GitHub](https://github.com/tracyone/v2ray.fun)

基本上如 GitHub 所述，是为了简化 V2Ray 的部署

1. 安装

   ```bash
   bash -c "$(curl -fsSL https://git.io/vpOeN)"
   ```

   如果脚本链接失效了请复制以下命令到 `.sh` 文件并执行

   ```sh
   #!/bin/bash
   export PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

   # 检查是否为Root
   [ $(id -u) != "0" ] && { echo "Error: You must be root to run this script"; exit 1; }

   # 检查系统信息
   if [ -f /etc/redhat-release ];then
           OS='CentOS'
       elif [ ! -z "`cat /etc/issue | grep bian`" ];then
           OS='Debian'
       elif [ ! -z "`cat /etc/issue | grep Ubuntu`" ];then
           OS='Ubuntu'
       else
           echo "Not support OS, Please reinstall OS and retry!"
           exit 1
   fi

   # 禁用SELinux
   if [ -s /etc/selinux/config ] && grep 'SELINUX=enforcing' /etc/selinux/config; then
       sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config
       setenforce 0
   fi

   # 安装依赖
   if [[ ${OS} == 'CentOS' ]];then
       curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
       yum install curl wget unzip git ntp ntpdate lrzsz python socat nodejs -y
       npm install -g qrcode
   else
       curl -sL https://deb.nodesource.com/setup_8.x | bash -
       apt-get update
       apt-get install curl unzip git ntp wget ntpdate python socat lrzsz nodejs -y
       npm install -g qrcode
   fi

   # 安装 acme.sh 以自动获取SSL证书
   curl  https://get.acme.sh | sh

   # 克隆V2ray.fun项目
   cd /usr/local/
   rm -R v2ray.fun
   git clone https://github.com/tracyone/v2ray.fun

   # 安装V2ray主程序
   bash <(curl -L -s https://install.direct/go.sh)

   # 配置V2ray初始环境
   ln -sf /usr/local/v2ray.fun/v2ray /usr/local/bin
   chmod +x /usr/bin/v2ray
   chmod +x /usr/local/bin/v2ray
   rm -rf /etc/v2ray/config.json
   cp /usr/local/v2ray.fun/json_template/server.json /etc/v2ray/config.json
   let PORT=$RANDOM+10000
   UUID=$(cat /proc/sys/kernel/random/uuid)
   sed -i "s/cc4f8d5b-967b-4557-a4b6-bde92965bc27/${UUID}/g" /etc/v2ray/config.json
   sed -i "s/12345/${PORT}/g" "/etc/v2ray/config.json"
   python /usr/local/v2ray.fun/genclient.py
   python /usr/local/v2ray.fun/openport.py
   service v2ray restart

   # auto open port after start
   # append a new line
   cat /etc/rc.local | grep openport.py
   if [[ $? -ne 0 ]]; then
   cat>>/etc/rc.local<<EOF
   python /usr/local/v2ray.fun/openport.py
   EOF
   chmod a+x /etc/rc.local
   fi

   clear

   echo "V2ray.fun 安装成功！"
   echo "输入 v2ray 回车即可使用"
   ```

2. 使用

   ```bash
   v2ray
   ```

   输出如下选项

   ```bash
   欢迎使用 V2ray.fun 管理程序

   1.服务管理
   2.更改配置
   3.查看服务端信息
   4.下载客户端配置文件
   5.更新v2ray和v2ray.fun
   请输入数字选择功能(按回车键退出)：
   ```

3. 修改一下端口

   > 注：此步骤可跳过，但最好修改端口为 `80/443`(`HTTP/HTTPS` 默认端口)

   选择 **2.更改配置 > 2.更改主端口**，输入新的端口，然后在 **1.服务管理** 中重启服务即可

4. 下载客户端配置文件

   选择 **4.下载客户端配置文件**，应该会提示 **保存成功！(/root/config.json)**。下载这个文件到本地，一会还有用。

## 客户端

首先去 [GitHub](https://github.com/v2ray/v2ray-core/releases) 下载合适的客户端，这里以 Windows 平台为例。

1. 首先解压出来，将上面下载的那个文件替换掉解压文件 `config.json`，然后双击 `v2ray.exe` 就启动了

2. 设置浏览器的本地代理
   代理配置为 `socks 127.0.0.1:1080` 即可

- Chrome 参考 [Google Chrome 浏览器代理 proxy 设置方法](https://jingyan.baidu.com/article/e52e3615a3ef8e40c60c510f.html)
- FireFox 参考 [代理设置 火狐 Firefox 如何设置修改代理](https://jingyan.baidu.com/article/375c8e199ca72525f2a229b8.html)
  > 吾辈强烈推荐插件 [Proxy SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif)，不仅配置方便而且跨浏览器使用（FireFox/Chrome）

好了，现在浏览器应该可以正常访问 <https://www.google.com/> 了

## 可视化

虽然能够使用了，但每次都是命令行启动着是麻烦了点。说到底，还是需要一个可视化的客户端呢

> [Project V 客户端](https://v2ray.com/ui_client/)

1. Windows 客户端
   [V2RayW](https://github.com/Cenmrev/V2RayW) 算是比较方便的了，将程序复制到解压目录下面就能用了
2. 安卓客户端
   [BifrostV](https://play.google.com/store/apps/details?id=com.github.dawndiy.bifrostv) 或 [v2rayNG](https://play.google.com/store/apps/details?id=com.v2ray.ang)
