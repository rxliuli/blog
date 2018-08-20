---
title: IDEA 热部署
date: 2018-06-27 01:39:21
tags: IDEA
---
# IDEA 热部署

在阅读本篇之前至少需要对以下概念有基本的认知：

- Java
- IDEA

---

## **热部署** 是什么？

以下内容引用于度娘百科：https://baike.baidu.com/item/%E7%83%AD%E9%83%A8%E7%BD%B2
> 所谓热部署，就是在应用正在运行的时候升级软件，却不需要重新启动应用。  
> 对于 Java 应用程序来说，热部署就是在运行时更新 Java 类文件。在基于 Java 的应用服务器实现热部署的过程中，类装入器扮演着重要的角色。大多数基于 Java 的应用服务器，包括 EJB 服务器和 Servlet 容器，都支持热部署。类装入器不能重新装入一个已经装入的类，但只要使用一个新的类装入器实例，就可以将类再次装入一个正在运行的应用程序。

简而言之，就是你在开发 Web 程序时不需要在每次 **修改代码** 之后都要重启 Web 容器再看效果了。
> 修改按文件类型分类大致有：Java 源代码，`src/main/resource` 下的资源文件，`src/main/webapp` 下的前端资源文件，`src/main/webapp` 下的模板文件（例如 JSP/Freemarker），亦或是 `web.xml` 这种 Web 容器的配置文件。

好了，废话就不说了（然而还是要了解一下概念啦）  

## 基本配置

1. 在编辑运行配置窗口，配置 Tomcat（其他 Web 容器应该也类似）的页面。
  ![Snipaste_2018-06-01_22-07-54.png](https://i.loli.net/2018/06/01/5b1153ce738df.png)  

2. 点击 Deployment 选项卡，配置要运行的 war，必须要选择 **exploded** 进行部署。
  ![Snipaste_2018-06-01_21-49-20.png](https://i.loli.net/2018/06/01/5b11546eb1594.png)  

3. 回到 Server 选项卡，配置 IDEA 在发现代码/框架发生变化是执行的动作。
  ![Snipaste_2018-06-01_21-52-05.png](https://i.loli.net/2018/06/01/5b1154fad17e5.png)  

然后，点击 OK 就可以了，接下来以 `Debug` 默认运行就可以自动帮你更新 Java 源码和 resources 资源文件以及 webapp 下的静态文件/模板文件了，愉快的玩耍吧！

---

## 多模块配置

> 注：如果你还没有接触多模块的话，可以略过下面的内容。

。。。然而不幸的是对于多模块项目以及各种各样的框架和类库，IDEA 本身的热部署实在不够看。所以如果你想要更强大的热部署功能的话，可以使用 **Jrebel** 来实现。  

1. IDEA 的官方 Plugin 商店里面就有这个，点击安装（由于众所周知的原因，下载可能比较慢），安装完成之后重启。
   > 然后，如果你不愿意支持正版又不打算折腾破解的话，也可以不用看下面的内容了（关于破解方法可以参考 <https://blog.rxliuli.com/2018/07/10/%E8%87%AA%E5%BB%BA-Jrebel-%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86.html>）  
   > [Google 上的相关内容](https://www.google.lk/search?q=IDEA+Jrebel+%E7%A0%B4%E8%A7%A3&oq=IDEA+Jrebel+%E7%A0%B4%E8%A7%A3)
2. 在 `help > Jrebel > Activation` 下输入 License
  ![Snipaste_2018-06-01_22-29-51.png](https://i.loli.net/2018/06/01/5b1158ef71fdf.png)  
  ![Snipaste_2018-06-01_22-29-00.png](https://i.loli.net/2018/06/01/5b1159ac477c3.png)
  ![Snipaste_2018-06-01_22-21-02.png](https://i.loli.net/2018/06/01/5b1157dd23342.png)  
3. 接下来如上面那样配置 IDEA 的 Tomcat 运行选项之后（就是没装 Jrebel 的那种热部署方式），然后点击 `View > Tool Windows > JRebel`
  ![Snipaste_2018-06-01_22-35-17.png](https://i.loli.net/2018/06/01/5b115aa1438ea.png)

  看到左侧弹出一个面板，选择你要热部署的模块，或者选择第一个以全选所有模块

  ![Snipaste_2018-06-01_22-40-02.png](https://i.loli.net/2018/06/01/5b115b56e42ba.png)

  > 你或许发现了 `src/main/resources` 目录下多了一个奇怪的配置文件 `rebel.xml`，然而你并不需要在意，因为它是 Jrebel 的热部署配置文件。

  ![Snipaste_2018-06-01_22-41-51.png](https://i.loli.net/2018/06/01/5b115bb8d7fae.png)
4. 最后，点击 Jrebel 的 Debug 按钮即可
  ![Snipaste_2018-06-01_22-49-40.png](https://i.loli.net/2018/06/01/5b115d9020a95.png)  

那么，IDEA 的热部署配置就到这里了，实际上使用了 `SpringBoot` 之后就自带了热部署相关的类库。。。#贴心  
