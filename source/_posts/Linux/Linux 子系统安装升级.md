---
title: Windows10 升级 Linux 的子系统 Ubuntu
tags: Linux
abbrlink: 59023f68
date: 2018-06-27 01:39:21
updated: 2018-06-27 01:39:21
---

# Windows10 升级 Linux 的子系统 Ubuntu

## 先查看一下自己的系统版本,打开命令提示符输入 bash 回车然后键入如下命令回车

```bash
lsb_release -a
```

下面这样用 Ubuntu 的自动升级在 Bash on Windows 会失败的：

```bash
sudo aptitude install update-manager-core
sudo do-release-upgrade
```

## 因此需要用到 Debian 的升级方法

步骤:

1. 获取全局 root 权限
   ```bash
   sudo -s
   # 然后输入密码
   ```
2. 把所有包升级至 14.04 (trusty) 的最新版
   ```bash
   aptitude update
   aptitude full-upgrade -y
   ```
3. 更改更新源为 16.04 (xenial)
   ```bash
   # 方法一：修改初始的更新源文件
   # 备份初始的源文件为sources.list.ORIG，将sources.list里的"trusty"全替换为"xenial"。
   sed -i.ORIG 's/trusty/xenial/g' /etc/apt/sources.list
   ```
   ```bash
   # 方法二（推荐）：把更新源直接改为国内的阿里云Ubuntu(xenial)镜像，这样会很快
   # 编辑更新源文件
   vim /etc/apt/sources.list
   # 清空文件后粘贴如以下代码：
   deb http://mirrors.aliyun.com/ubuntu/ xenial main restricted universe multiverse
   deb http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted universe multiverse
   deb http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted universe multiverse
   deb http://mirrors.aliyun.com/ubuntu/ xenial-proposed main restricted universe multiverse
   deb http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse
   deb-src http://mirrors.aliyun.com/ubuntu/ xenial main restricted universe multiverse
   deb-src http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted universe multiverse
   deb-src http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted universe multiverse
   deb-src http://mirrors.aliyun.com/ubuntu/ xenial-proposed main restricted universe multiverse
   deb-src http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse
   # :wq 保存退出
   ```
4. 备份并新建空文件夹 /etc/apt/sources.list.d/  
   注：bash 刚装好时这个文件夹是空的，若如此可跳过这一步
   ```bash
   mv /etc/apt/sources.list.d/ /etc/apt/sources.list.d.ORIG/
   mkdir /etc/apt/sources.list.d/
   ```
5. 升级至 16.04 (xenial)
   ```bash
   aptitude update
   aptitude safe-upgrade -y
   # 注1：升级过程中会提示你重启服务（restart services），选yes
   # 注2：还会出现文件冲突，保留当前版本（current version）即可，输入N
   ```
6. 把所有包升级至 16.04 (xenial) 的最新版，并重装丢失的 aptitude 包，最后清理无用包
   ```bash
   apt-get dist-upgrade
   apt-get install aptitude
   apt-get autoremove
   ```
7. 至此已经顺利升级至 16.04 (xenial) 了，但你会发现像原来那样使用 sudo 命令会报错：

   ```bash
   # 重启Bash，在非root权限下测试
   sudo apt-get update
   sudo: no tty present and no askpass program specified
   ```

   此后用 sudo 只能这么用：

   ```bash
   sudo -S apt-get update
   ```

   或者，你可以设置 root 的密码：

   ```bash
   sudo -S passwd root
   [sudo] password for rxliuli: # 输入你的密码
   Enter new UNIX password: # 输入 root 密码
   Retype new UNIX password: # 确认输入 root 密码
   passwd: password updated successfully # 大功告成！
   ```

   以后，我们就可以使用 root 账号了：

   ```bash
   su
   Password: # 输入 root 密码
   # 进入 root 了
   ```

   如果你装错了，或者想退回 Ubuntu 14.04 (trusty)，把 Linux 子系统卸载重装即可(在 Windows 的 cmd 而非 bash 下)：

   ```bash
   > lxrun /uninstall /full /y
   > lxrun /install
   ```

最后，引用一句话：

> So when will the newer Ubuntu 16.04 LTS release be available? In a recent comment, Microsoft’s Rich Turner explained: “We have to add some additional capabilities to make it work well, but we are looking at 16.04 support for a future release.”

微软自认为这个 Bash on Ubuntu on Windows 还不够稳定，所以暂不支持官方升级，这样强行升级会有什么后果，那就不好说了，大家凑合用吧。

参考解决方案： <https://www.reddit.com/r/windowsinsiders/comments/4iy38n/upgrade_ubuntu_on_windows_from_1404_to_1604/?st=iq62jo5j&sh=7af74c79>  
<https://help.ubuntu.com/lts/serverguide/installing-upgrading.html>

---

> 此文转自[知乎](https://www.zhihu.com/question/49411626),有什么问题可以问原作者,在吾辈的电脑上是能够正常工作的呢
