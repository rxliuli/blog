---
title: Linux Centos 6.5 下部署 MySQL
date: 2018-06-27 01:39:21
tags: Linux
---
# Linux Centos 6.5 下部署 MySQL

首先，先使用 `root` 用户进行操作
检测系统是否自带安装 mysql:  

```bash
rpm -qa | grep mysql
rpm -e mysql　　# 普通删除模式
rpm -e --nodeps mysql　　# 强力删除模式，如果使用上面命令删除时，提示有依赖的其它文件，则用该命令可以对其进行强力删除
```

安装 mysql：

```bash
yum install mysql
yum install mysql-server
yum install mysql-devel
```

启动一下服务看看

```bash
service mysqld start
```

可以正常启动，但如果是第一次启动的话会要求我们设置 root 用户的密码  
设置一下

```bash
mysql -u root password [yourPassword]
```

然后，当你尝试远程连接的时候，问题就来了，突然发现连接不了？
首先检查一下网络/防火墙

```bash
ping [yourIP]
```

如果连 ping 都不行，指定是网络问题。  
然后检查端口是否被防火墙拦截了：  

```bash
telnet [yourIP] 3306
```

如果连接失败，配置防火墙（附：新的 Linux 一般都需要配置防火墙）：

```bash
vi /etc/sysconfig/iptables
-A INPUT -m state –state NEW -m tcp -p tcp –dport 3306 -j ACCEPT # 允许 3306 端口通过防火墙
service iptables restart # 重启防火墙使配置生效
```

配置完成之后，发现连接错误变成了另外一个！  
这里需要检查一下用户访问权限  
MySQL 建用户的时候会指定一个 host，默认是 127.0.0.1/localhost，那么这个用户就只能本机访问， 其它机器用这个用户帐号访问会提示没有权限，host 改为 %，表示允许所有机器访问。  

```bash
mysql -u root -p #登录 mysql root 用户
use mysql; #到 mysql 数据库
select host,user from user; #查询用户及对应的 host，如果 mysql root 用户的 host 为 127.0.0.1/localhost，则对其进行修改
update user set host='%' where user='root' and host = '127.0.0.1'; #修改 mysql root 用户的 host
```

上面这种方法虽然也能够进行远程访问 mysql，但使用 root 用户确实是个危险的行为。所以，我们可以创建一个新的用户用于远程连接！

```bash
mysql -uroot -p //使用 root 用户连接到 mysql
CREATE USER '[user]'@'%' IDENTIFIED BY '[password]'; //创建一个新的用户
GRANT ALL PRIVILEGES ON *.* TO '[username]'@'%' WITH GRANT OPTION; //赋予用户权限
FLUSH PRIVILEGES; //刷新权限
```

最后，重启一下系统：  
`reboot`

那么，这个教程就到这里啦 （ｖ＾＿＾）ｖ
