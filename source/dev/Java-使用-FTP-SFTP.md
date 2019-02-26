---
layout: post
title: Java 使用 FTP/SFTP
tags:
  - Java
  - 记录
abbrlink: 6e1ed646
date: 2019-02-14 15:17:38
---

# Java 使用 FTP/SFTP

## 场景

项目中需要使用 FTP

## 目标

封装简单的通用操作

- 上传单个文件
- 上传使用 `InputStream`(内存操作)
- 下载单个文件
- 下载得到 `InputStream`(内存操作)
- 创建目录
- 递归创建目录
- 删除单个文件/空目录
- 获取指定目录下的文件信息列表
- 获取文件/目录信息
- 递归获取文件/目录信息
- 递归删除目录
- 监听目录变化（内部使用）
- 异步上传后等待结果

## 思路

1. 定义顶层接口 `FtpOperator`，具体实现由子类（`BasicFtpOperatorImpl`, `SftpOperatorImpl`）完成
2. 定义顶层配置文件基类 `FtpClientConfig`，包含着 ftp 连接必须的一些东西，具体细节在子类配置中 `BasicFtpClientConfig`, `SftpClientConfig`
3. 添加工厂类 `FtpOperatorFactory`，根据不同子类的配置对象创建不同的 ftp 操作对象，并且一经创建就可以永久性使用
4. 添加 `FtpWatchConfig`, `FtpWatch`, `FtpWatchFactory` FTP 监听器
5. 添加集成 SpringBoot 中，读取 `application.yml` 中的配置，并创建不同的 `FtpOperator` 暴露给外部使用，动态初始化 FTP 监视器

> 注：这里使用 FTP 监视器的原因是为了避免每次上传数据后都要单独监听 FTP 目录的变化，造成 FTP 多线程连接数量过多
> 注：这里的并未实现 FTPClient 及 Jsch 的对象池管理，所以仅可参考实现，生产环境中仍需进行修改！

图解如下

![图解](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190226221826.png)

## 实现
