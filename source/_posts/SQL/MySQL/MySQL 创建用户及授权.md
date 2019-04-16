---
title: MySQL 创建用户及授权
tags: DB
abbrlink: 676cd338
date: 2018-08-14 01:39:21
updated: 2018-08-14 01:39:21
---

# MySQL 创建用户及授权

## 用户

### 创建用户

使用 `root` 用户登录到 MySQL

```sql
CREATE USER rxliuli
  IDENTIFIED BY '123456';
```

### 删除用户

```sql
DROP USER rxliuli;
```

## 授权

### 添加授权

命令格式：

```sql
GRANT privilegesCode ON dbName.tableName TO username@host IDENTIFIED BY "password";
```

例如下面就是为 rxliuli 用户赋予了 mytimelinedb 数据库所有表的所有操作权限

```sql
GRANT ALL PRIVILEGES ON mytimelinedb.* TO rxliuli
IDENTIFIED BY '123456';
```

`privilegesCode` 代表权限，常用选项如下：

- ALL PRIVILEGES ：所有权限
- SELECT：读取权限
- DELETE ：删除权限
- UPDATE ：更新权限
- CREATE ：创建权限
- DROP ：删除数据库、数据表权限

`dbName.tableName` 代表数据库.数据表，常用选项如下：

- .：所有数据库的所有表的权限
- dbName.\*：指定数据库的所有表的权限
- dbName.tableName：指定数据库下指定数据表的权限

`username@host` 表示授予的用户及允许该用户登录的 IP 地址。host 常用选项是：

- 不填：允许任意 IP 地址登录
- localhost：只允许本地登录
- %：只允许远程登录
- 192.168.2.100：只允许指定 IP 地址登录

`password` 代表该用户的登录密码  
`FLUSH PRIVILEGES` 代表刷新权限

### 查看授权

```sql
SHOW GRANTS FOR rxliuli;
```

### 删除授权

```sql
revoke select on *.* from rxliuli;
```

### 刷新权限

```sql
flush privileges;
```
