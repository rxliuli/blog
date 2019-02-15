---
layout: post
title: 在 Windows 上使用 Ftp/Sftp 服务端
date: 2019-02-15 08:59:49
tags: [Ftp]
---

# 在 Windows 上使用 Ftp/Sftp 服务端

## 场景

最近在做 WebService 项目时遇到了定时上报报表的需求，协议可能是 `ftp/sftp`。然而第三方服务暂时无法测试，所以只能在本地使用软件模拟出 `ftp/sftp` 服务端，然后在 Java 代码中进行测试。

## 前言

吾辈并未使用 Windows 上大名鼎鼎的 [FileZilla](https://filezilla-project.org/)。  
谜之音：**FileZilla 开源免费，而且 `ftp/sftp/ftps` 都能支持岂不美滋滋？**  
吾辈：然而安装完成直接启动就报错了  
谜之音：**报错就去查一下，这都觉得麻烦却是没办法了呢！**

事实上这是很多开发者，尤其是 Linux 下的开发者，习惯了使用软件可能报错，可能有问题，对使用体验毫不在意的认知。  
所以吾辈滚了，滚去使用其他的软件了。

## FTP

> [Easy FTP 官网](http://www.pablosoftwaresolutions.com)

事实上，使用 EasyFTP 是一件相当简单的事情。

1. 首先点击 [下载链接](http://www.pablosoftwaresolutions.com/files/ftpserver3lite.zip) 下载压缩包
2. 解压后点击 **FTPServer.exe** 打开软件
3. 根据引导配置用户名/密码/FTP 根目录
   ![用户名](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190215180358.png)  
   ![密码](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190215180617.png)  
   ![权限](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190215181353.png)

4. 启动 FTP 服务  
   ![启动服务](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190215181459.png)
5. 打开浏览器访问 <ftp://localhost>
   ![浏览器登录](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190215181900.png)  
   ![登录成功](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190215182848.png)

## SFTP
