---
title: Linux Centos 上通过 RPM 安装 MySQL
tags:
  - Linux
  - 记录
abbrlink: 74cbb0a6
date: 2018-06-30 01:39:21
---

# Linux Centos 上通过 RPM 安装 MySQL

> 此教程基本上参考自 [MySQL 官方文档](https://dev.mysql.com/doc/mysql-repo-excerpt/5.6/en/linux-installation-yum-repo.html)

## 1. 卸载 Centos Linux 自带的 MariaDB

> [官方参考文档链接](https://dev.mysql.com/doc/mysql-repo-excerpt/5.6/en/replace-third-party-yum.html)  
> 使用以下命令获取已安装的 MariaDB 软件包列表：

```bash
yum list installed mariadb\*
```

如果输出中有 `MariaDB` 的话，说明系统上已经有 `MariaDB` 了，需要先使用命令卸载。

```bash
yum remove MariaDB-common MariaDB-compat MariaDB-server
```

或者

```bash
yum remove mariadb-libs
```

> 如果没有的话可以直接跳到第 2 步

## 2. 添加 MySQL Yum 存储库

在 Centos Linux 上已经不能直接安装 MySQL 了, 所以要手动添加软件源。

```bash
wget https://dev.mysql.com/get/mysql57-community-release-el7-9.noarch.rpm
rpm -ivh mysql-community-release-el7-5.noarch.rpm
```

验证软件源是否按转成功

```bash
yum repolist enabled | grep "mysql.*-community.*"
```

## 3. 安装 MySQL

使用以下命令安装

```bash
yum install mysql-community-server
```

吾辈在安装的时候就遇到了错误：

```bash
Error: Package: mysql-community-server-5.7.22-1.el6.x86_64 (mysql57-community)
           Requires: libsasl2.so.2()(64bit)
 You could try using --skip-broken to work around the problem
 You could try running: rpm -Va --nofiles --nodigest
```

去 Google 了一下找到了一个解决方案，修改 MySQL 安装源文件。

```conf
[mysql57-community]
name=MySQL 5.7 Community Server
## baseurl=http://repo.mysql.com/yum/mysql-5.7-community/el/6/$basearch/
baseurl=http://repo.mysql.com/yum/mysql-5.7-community/el/7/$basearch/
enabled=1
gpgcheck=0
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql
```

然后继续安装就好了

## 4. 测试 MySQL

- 启动 MySQL 的服务 `service mysqld start`
- 查看 MySQL 的状态 `service mysqld status`
- 关闭 MySQL 的服务 `service mysqld stop`（执行后记得再重新开启，下面还需要用到）
  > 注：服务器启动时，如果服务器的数据目录为空，则会进行以下操作：
  >
  > - 服务器已初始化。
  > - SSL 证书和密钥文件在数据目录中生成。
  > - validate_password 已安装并启用。
  > - MySQL root 用户'root'@'localhost 已创建。root 的密码被设置并存储在错误日志文件中。要显示它，请使用以下命令：  
  >   `grep "temporary password" /var/log/mysqld.log`

## 5. 使用 **mysql_secure_installation** 执行一些重要的操作

执行以下命令

```bash
mysql_secure_installation
```

输入上面获得的默认的 root 密码，然后会询问一些重要的操作，列表如下：

- 修改密码

  ```bash
  The 'validate_password' plugin is installed on the server.
  The subsequent steps will run with the existing configuration
  of the plugin.
  Using existing password for root.

      Estimated strength of the password: 100
      Change the password for root ?
  ```

  如果是刚刚安装完成请务必修改一次密码，当然，MySQL 默认密码策略还是很严格的，所以要输入一个安全度较高的密码哦

- 删除 MySQL 默认的匿名用户（便于测试使用）

  ```bash
  By default, a MySQL installation has an anonymous user,
  allowing anyone to log into MySQL without having to have
  a user account created for them. This is intended only for
  testing, and to make the installation go a bit smoother.
  You should remove them before moving into a production
  environment.
  Remove anonymous users?
  ```

  生产环境删除

- 是否允许远程连接 root 用户

  ```bash
  Normally, root should only be allowed to connect from
  'localhost'. This ensures that someone cannot guess at
  the root password from the network.

  Disallow root login remotely?
  ```

  如果没有特殊需求还是尽量禁用了吧，再创建一个 MySQL 账户也不难，不是么？

- 删除测试数据库 test

  ```bash
  By default, MySQL comes with a database named 'test' that
  anyone can access. This is also intended only for testing,
  and should be removed before moving into a production
  environment.
  Remove test database and access to it?
  ```

  因为是任何人都可以访问的，所以没什么需求的话也删了就好

- 是否重新加载权限表立即生效

  ```bash
  Reloading the privilege tables will ensure that all changes
  made so far will take effect immediately.

  Reload privilege tables now?
  ```

  没什么好说的，直接 **y** 就好了。

## 测试登录 MySQL

使用以下命令登录

```sql
mysql -u root -p
```

这里吾辈遇到过一个错误，死活就卡住了，也没有让输入密码，然后出现了一个错误：

```sql
ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: NO)
```

Google 了一下发现可能是默认的 localhost 没有映射到 127.0.0.1，所以尝试指定了 IP 地址

```sql
mysql -u root -h 127.0.0.1 -p
```

结果可以登陆了。。。  
查询一下用户表发现只有 **root@localhost** 一个

| user          | host      |
| ------------- | --------- |
| mysql.session | localhost |
| mysql.sys     | localhost |
| root          | localhost |

所以添加两个权限：

```sql
GRANT ALL PRIVILEGES ON mytimelinedb.* TO root@'127.0.0.1' IDENTIFIED BY 'yourRootPassword';
GRANT ALL PRIVILEGES ON mytimelinedb.* TO root@'yourServerIP' IDENTIFIED BY 'yourRootPassword';
```

好了，再查询一下用户表

| user          | host         |
| ------------- | ------------ |
| root          | 127.0.0.1    |
| root          | yourServerIP |
| mysql.session | localhost    |
| mysql.sys     | localhost    |
| root          | localhost    |

然后 `exit` 退出 MySQL 再使用 `mysql -u root -p` 重新登录，是不是就可以啦！
