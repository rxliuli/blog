---
title: Windows 下安装 Gradle
date: 2018-11-16 21:04:23
tags: [记录, Java, Gradle, Windows]
---

# Windows 下安装 Gradle

> [官网](https://gradle.org), [GitHub](https://github.com/gradle/gradle)

## 场景

吾辈需要在 Windows 下 build Android 的项目，作为 Android 官方推荐的构建工具，Gradle 也却是不得不用呀

## 安装

在官网的版本 [发布页面](https://gradle.org/releases/) 找到 Download 的 **binary-only** 链接，点击即可下载了（后面的 **complete** 指的是完整版，我们只是使用的话并不需要下载那个）。  
![版本发布](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181116203320.png)  
![下载详情](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181116203612.png)

## 设置环境变量

下载完成后，将文件解压出来，解压出来的文件夹内大概是这个样子

![Gradle 解压目录](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181116203858.png)

现在，我们需要设置环境变量了

在 _控制面板 > 系统和安全 > 系统_ 中找到 _高级系统设置_ 项  
![系统](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181116204013.png)

点击 _环境变量_  
![系统属性](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181116204130.png)

双击 _系统变量 > Path_  
![Path](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181116204344.png)

点击 **新建** 创建一个环境变量，随便输入点什么，然后点击 **浏览**  
![新建环境变量](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181116204638.png)

选择 gradle 解压后的文件夹位置，之后点击确定  
![选择解压后的文件夹位置](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181116205022.png)

然后一路点击确认关闭这 3 个窗口  
![关闭窗口](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181116205528.png)

## 测试

打开 Cmd，下面是从菜单中找到 _Windows 系统 > 命令提示符_  
![打开 Cmd](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181116205716.png)

在 Cmd 中输入 `gradle -v` 验证一下，如果得到的是类似于下面的输出，那么 gradle 便是安装成功了  
![在 Cmd 下验证 Gradle](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181116210006.png)

那么，Gradle 的安装到这里便是基本结束了呢 (★^O^★)
