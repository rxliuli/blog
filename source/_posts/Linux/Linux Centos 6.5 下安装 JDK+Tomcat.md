---
title: Linux Centos 6.5 下安装 JDK+Tomcat
tags: Linux
abbrlink: 9a3e10ff
date: 2018-06-27 01:39:21
---
# Linux Centos 6.5 下安装 JDK+Tomcat

## 下载 JDK/Tomcat

[Oracle JDK 下载页面](http://www.oracle.com/technetwork/java/javase/downloads/index.html)  
首先，我们需要去 oracle 官网找到 JDK Linux 的下载链接(选择同意协议然后复制链接即可, 此处吾辈选择的是 1.8.7):  
http://download.oracle.com/otn-pub/java/jdk/8u171-b11/512cd62ec5174c3487ac17c61aaa89e8/jdk-8u171-linux-x64.tar.gz  

然后再 shell 中执行以下下载命令：  

```bash
wget --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie;" htt p://download.oracle.com/otn-pub/java/jdk/8u171-b11/512cd62ec5174c3487ac17c61aaa89e8/jdk-8u171-linux-x64.tar.gz
--2018-06-10 01:08:27--  http://download.oracle.com/otn-pub/java/jdk/8u171-b11/512cd62ec5174c3487ac17c61aaa89e8/jdk-8u171-linux-x64.tar.gz
```

> 注: Oracle 限制了无法直接进行下载, 所以才要设置一下请求头...

然后找到 Tomcat 的下载链接(吾辈使用的是 8.5)：  
[Apache Tomcat 下载页面](http://tomcat.apache.org/download-80.cgi)  

执行下载：  

```bash
wget http://mirrors.tuna.tsinghua.edu.cn/apache/tomcat/tomcat-8/v8.5.31/bin/apache-tomcat-8.5.31.tar.gz
```

## 解压 JDK/Tomcat

```bash
tar -zxvf jdk-8u171-linux-x64.tar.gz -C /usr/java/
tar -zxvf apache-tomcat-8.5.29.tar.gz -C /usr/
```

## 设置环境变量  

编辑环境变量配置：  

```bash
vi /etc/profile
```

在最后加上：  

```conf
# configurer Oracle JDK classpath
export JAVA_HOME=/opt/java/jdk1.8.0_171
export JRE_HOME=${JAVA_HOME}/jrea
export CLASSPATH=.:${JAVA_HOME}/lib/tools.jar:${JRE_HOME}/lib/dt.jar
export PATH=${JAVA_HOME}/bin:${JAVA_HOME}/jre/bin:$PATH
```

重新加载环境变量：  

```bash
source /etc/profile
```

## 启动 Tomcat

```bash
/opt/apache-tomcat-8.5.31/bin/startup.sh
```

现在可以看到 Tomcat 确实启动了，然而每次都输入这么一大长串的值感觉有点麻烦，解决方案是把 Tomcat 也加入到环境变量中去。  
再次修改环境变量配置文件：  

```bash
vi /etc/profile
```

```conf
# configurer Apache Tomcat classpath
export TOMCAT_HOME=/opt/apache-tomcat-8.5.31
export PATH=${TOMCAT_HOME}/bin:$PATH
```

重新加载环境变量：  

```bash
source /etc/profile
```

那么，JDK/Tomcat 的配置就到这里啦