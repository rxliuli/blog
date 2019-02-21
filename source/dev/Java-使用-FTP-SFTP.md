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

## 目标

- 使用统一的接口
- 根据具体不同的子类配置对象切换不同的操作对象（其中没有强转）
- 封装简单的通用操作，并提供获取真正执行的对象的方法
- 上传单个文件
- 下载单个文件
- 创建目录
- 删除单个文件/空目录
- 获取指定目录下的文件信息列表
- 获取文件/目录信息

## 思路

1. 定义顶层接口 `FtpOperator`，具体实现由子类（`BasicFtpOperatorImpl`, `SftpOperatorImpl`）完成
2. 定义顶层配置文件基类 `FtpClientConfig`，包含着 ftp 连接必须的一些东西，具体细节在子类配置中 `BasicFtpClientConfig`, `SftpClientConfig`
3. 添加工厂类 `FtpOperatorFactory`，根据不同子类的配置对象创建不同的 ftp 操作对象，并且一经创建就可以永久性使用
4. 添加集成 SpringBoot 配置类，读取 `application.yml` 中的配置，并创建不同的 `FtpOperator` 暴露给外部使用
