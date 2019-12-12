---
title: Windows 上 Maven 安装与使用
tags:
  - Java
  - Maven
abbrlink: 82700e2a
date: 2018-11-09 12:34:16
updated: 2018-11-09 12:34:16
---

# Windows 上 Maven 安装与使用

> [官网](https://maven.apache.org), [GitHub](https://github.com/apache/maven)

## 介绍

Maven 已经是 Java 事实上的依赖管理标准工具了，所以学习使用 maven 有益无害。

## 前置要求

- [x] 必须已经安装了 JDK 并设置了环境变量，如果还没有安装，请参考 [Windows 上安装 JDK 并设置环境变量](https://blog.rxliuli.com/p/d0cf29fa/) 进行安装

## 下载

在官网 [下载页面](https://maven.apache.org/download.cgi) 找到 **Binary zip archive** 下载二进制数据。

![Maven 下载页面](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20181109124211.png)

> 这里不使用二进制安装包的原因是绿色版更容易迁移，而且是跨平台的。

## 设置环境变量

将文件夹解压到某个位置，然后在环境变量 **Path** 中添加 _/bin/_ 目录

![Maven 设置环境变量](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20181109124557.png)

## 验证安装

使用 cmd 打开命令行，输入 `mvn --version`，你应该得到了类似于下面的输出

![查看 Maven 的版本](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20181109124924.png)

## 基本使用

1. 创建一个普通的项目

   直接使用命令行根据模板创建项目在实际中极为罕见，这里只是演示一下 maven 可以使用命令行创建项目而已

   ```sh
   mvn archetype:generate -DgroupId=com.rxliuli.maven.example -DartifactId=HelloWorld -DarchetypeArtifactId
   =maven-archetype-quickstart -DinteractiveMode=false
   ```

   应该会得到如下输出

   ![Maven 使用命令行创建模板项目](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20181109130243.png)

2. 进入项目

   项目目录结构

   ```sh
   HelloWorld
   └─src
   ├─main
   │  └─java
   │      └─com
   │          └─rxliuli
   │              └─maven
   │                  └─example
   └─test
       └─java
           └─com
               └─rxliuli
                   └─maven
                       └─example
   ```

   maven 项目的配置文件是 `pom.xml`，而 **源码** 与 **测试** 代码则分离到了两个单独的文件夹

3. maven 基本命令
   - package(mvn package): 打包项目
   - clean(mvn clean): 清理打包目录
   - test(mvn test): 执行 test 目录下的测试
   - install(mvn install): 打包项目并安装到本地

其实原生 maven 了解多少并没有什么，因为 IDE 基本都集成了这些开源的工具，并不需要我们手动输入 maven 命令了。嘛，多少了解一些也是挺好的啦ヽ(=^･ω･^=)丿
