---
layout: post
title: IDEA 创建和运行一个简单的 maven web 项目
tags:
  - IDEA
  - Java
  - Maven
  - Web
  - 教程
abbrlink: 3dde13
date: 2018-12-04 18:11:33
---

# IDEA 创建和运行一个简单的 maven web 项目

## 场景

本文是为了帮助刚接触 IDEA 的萌新快速了解如何创建与运行一个 Maven Web 项目，但由于 [知识的诅咒](https://en.wikipedia.org/wiki/Curse_of_knowledge)（#笑），如果有什么不太明白或者发现了什么问题，欢迎在最下方进行留言哦

## 创建

首先打开 IDEA，进入到了 IDEA 欢迎页，点击 **Create New Project**  
![IDEA 欢迎页](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181204181531.png)

来到项目创建面板

1. 选择 Maven
2. 勾选上 **Create from archetype**（根据原型创建）
3. 选择 `org.apche.maven.archetypes:maven-archetype-webapp` 原型
   > 这里可以输入 webapp，就可以通过 Top/Bottom 键来快速找到原型了

![创建面板](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181204182057.png)

接下来设定一下 Maven 的基本配置

- GroupId：代表该项目的实体或组织。例如 `com.rxliuli.example` 就是一个组织 id。
  > 如果你对 maven 没有任何基础，可以直接使用 `com.{你的英文名}` 作为组织 id
- ArtifactId：实际的工件名称。例如 `idea-maven-webapp-example` 就指明了该项目就是一个 idea 创建的 maven webapp 案例项目
- Version：该项目的版本号，没什么好说的。

![Maven 基本配置](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181204183441.png)

然后是使用的 Maven 程序，IDEA 内置了 Maven，所以如果你不怎么了解 Maven 可以直接 Next 过去  
![使用的 Maven 程序](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181204183409.png)

最后一步是创建 IDEA 项目，基本上不需要修改什么，直接 FINISH 即可  
![创建 IDEA 项目](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181204183707.png)

## 配置项目

### 项目初始配置

创建完成后会提示是否选择自动引入依赖，这里选择 **Enable Auto import**。当然，另一个要我们去配置 Web 框架的提示就不用管了，IDEA 已经自动完成了这一切。  
![创建完成提示](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181204184028.png)

### 配置 Tomcat 容器

项目搭建好了，然而我们还需要一个 Web 容器，这里以 Tomcat 作为演示

1. 使用快捷键 `CS-A` 打开 IDEA 结构化设置搜索
2. 输入 `edit config`，找到 `edit configurations...` 项
3. 回车打开 IDEA 运行配置面板  
   ![IDEA 结构化设置搜索](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181204185414.png)
4. 添加一个新的 Tomcat 容器运行配置项  
   ![Tomcat 容器运行配置](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181204185728.png)
5. 配置 Application server，点击 CONFIGURETION 按钮  
   ![配置 Application server](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181204190023.png)
6. 选择本地 Tomcat 的目录并确定  
   ![选择本地 Tomcat 的目录](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181204190127.png)
7. 选择要运行的 war 包  
   配置完成会发现下面多了一条警告 `Warning:No artifacts marked for deployment`，意思是没有 jar/war 包需要被部署，这里我们只要点一下 Fix，并且选择 `war exploded`，之后 IDEA 会自动完成剩余的事  
   ![部署 war 项目](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181204190459.png)
   > 注：有人觉得每次都要配置 Tomcat 真的挺麻烦的，这里吾辈坚决声明这是误解，只有第一次才需要配置各种环境，后面 IDEA 是能够**记住**的。
8. 最后，修改一下运行配置的名字，然后点击 OK 按钮  
   ![修改运行配置的名字](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181204191042.png)
9. 在右上角的运行配置里应该已经显示出刚才添加的运行配置项 Tomcat 了，这是点击右边的 Debug 按钮，一切就开始了  
   ![Debug 开始](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181204191242.png)
10. 运行完成后会自动打开浏览器 <http://localhost:8080/>，显示出这个项目的首页了呢  
    ![浏览器](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181204200454.png)

至此，我们已经使用 IDEA 运行起来了一个基本的 Web 项目了呢！

## 其他

### 配置项目目录结构

项目的文件菜单树大概长这样，初始只有这么几个文件，稍微解释一下用途

- `pom.xml`：Maven 的配置文件，所有 Maven 搭建的项目都会有，记录着项目所有的依赖
- `web.xml`：Web 项目所需要的一个配置文件。主要用来配置 `Servlet`, `Filter`, `Listene`。
- `index.jsp`：Maven webapp 原型自带的一个初始的 jsp 首页

![项目文件结构](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181204184248.png)

### 配置 java/resources 目录

现在，我们已经可以写 jsp 了，那么 `Servlet` 之类的 java 文件应该写到哪里呢？

1. 在 _src/main_ 新建 _java_ 和 _resources_ 目录  
   ![新建 java/resources 目录](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181204194615.png)
2. 点击 _File > Project Structure_ 打开项目结构配置面板（或者使用快捷键 `CSA-S`）  
   ![Project Structure](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181204194742.png)
3. 标识目录

   1. 点击 Module 项
   2. 选择需要的项目
   3. 选中 java 文件夹
   4. 点击 Source 使 java 目录变为蓝色
   5. 选中 resources 目录
   6. 点击 Resources 使 resources 目录变为紫色
   7. 完成后点击下方的 OK

   ![标识目录](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181204195327.png)

### 修改 web.xml 的 servlet 版本为 3.1

其实就是把 `web.xml` 的内容修改为下面这样

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">

</web-app>
```

### 添加 servlet/jsp 依赖

虽然 tomcat 本身就有 servlet/jsp 的实现，但那是在项目运行时才会有的，而我们需要在代码中使用 Servlet 的类时，则需要添加对应的依赖。

找到 `pom.xml` maven 配置文件，在 dependencies 中添加 `javax.servlet` 和 `javax.servlet.jsp` 两项依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <!-- 其他内容 -->
  <dependencies>
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.1.0</version>
    </dependency>
    <dependency>
      <groupId>javax.servlet.jsp</groupId>
      <artifactId>javax.servlet.jsp-api</artifactId>
      <version>2.3.1</version>
    </dependency>
    <!-- 其他依赖 -->
  </dependencies>
  <!-- 其他内容 -->
</project>
```

### 创建 Servlet

接下来，我们的 Java 源码就全部放到 _/src/main/java_ 下即可

新建一个简单的 Servlet 类 `HomeServlet` (path: `com.rxliuli.example.ideamavenwebappexample.HomeServlet`)

```java
package com.rxliuli.example.ideamavenwebappexample;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @author rxliuli
 */
@WebServlet(name = "HomeServlet", urlPatterns = "/home")
public class HomeServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        final PrintWriter out = resp.getWriter();
        out.println("这里是首页哦");
    }
}
```

最后，再次点击 Debug 按钮重新运行项目，在浏览器中访问 <http://localhost:8080/home>，可以看到我们的 Servlet 已经生效了呢  
![访问 home Servlet](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181204202042.png)

## 总结

- 这个演示项目吾辈也放到了 [GitHub](https://github.com/rxliuli/idea-maven-webapp-example) 上，如果需要可以随便下载
- 如果你还不了解 maven 的话强烈建议稍微了解一下 maven 的基本概念。可以参照吾辈 blog 上的教程 [Windows 上 Maven 安装与使用](https://blog.rxliuli.com/2018/11/09/java/windows-%E4%B8%8A-maven-%E5%AE%89%E8%A3%85%E4%B8%8E%E4%BD%BF%E7%94%A8/) 进行安装
- 如果你还不了解 IDEA（废话，这不是当然的嘛！#打），推荐阅读 [IntelliJ IDEA 简体中文专题教程](https://github.com/judasn/IntelliJ-IDEA-Tutorial) 进行入门

那么，这篇教程到这里便结束啦，希望我们都能愉快地使用 IDEA 呢 o(〃＾ ▽ ＾〃)o
