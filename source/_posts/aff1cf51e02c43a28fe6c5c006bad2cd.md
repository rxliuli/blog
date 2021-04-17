---
layout: post
title: SpringBoot 集成 Thymeleaf 模板引擎
abbrlink: aff1cf51e02c43a28fe6c5c006bad2cd
tags:
  - java
date: 1587219249396
updated: 1609304971065
sticky: null
---

## 场景

最近开始了一个新的项目，后端使用了 SpringBoot。因为没有进行前后端分离，所以还需要模板引擎。经过调查，我们放弃 `JSP/JSTL` 而选择了 SpringBoot 默认推荐的 `Thymeleaf`。

> 附：不要吐槽 `JSP/JSTL` 很老，吾辈自己都觉得很老，然而公司不允许前后端分离，无解。。。（或许有？）

## 实现

### 创建项目

使用 [springboot.io](https://start.spring.io/) 创建项目，选择 `Web` 和 `Thymeleaf` 依赖，生成的 `build.gradle` 配置如下

```groovy
plugins {
    id 'org.springframework.boot' version '2.1.3.RELEASE'
    id 'java'
}

apply plugin: 'io.spring.dependency-management'

group = 'com.rxliuli.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '1.8'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

### 添加公共 js 依赖管理

公共 `JavaScript` 依赖: _templates/common/common-lib-js.html_

```html
<!DOCTYPE html>
<html lang="zh-CN" xmlns:th="http://www.thymeleaf.org">
  <body>
    <div th:fragment="common-lib-js">
      <script src="https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js"></script>
    </div>
  </body>
</html>
```

### 添加公共顶部

公共的顶部: _templates/common/common-header.html_

```html
<!DOCTYPE html>
<html lang="zh-CN" xmlns:th="http://www.thymeleaf.org">
  <body>
    <header th:fragment="common-header" id="common-header">
      <style>
        #common-header {
          height: 100px;
          width: 100%;
        }

        #common-header .text-center {
          text-align: center;
        }
      </style>
      <h1 class="text-center">这里是公共顶部</h1>
    </header>
  </body>
</html>
```

### 添加公共底部

公共的底部: _templates/common/common-footer.html_

```html
<!DOCTYPE html>
<html lang="zh-CN" xmlns:th="http://www.thymeleaf.org">
  <body>
    <header th:fragment="common-footer" id="common-footer">
      <style>
        #common-footer {
          height: 100px;
          width: 100%;
        }

        #common-footer .text-center {
          text-align: center;
        }
      </style>
      <h1 class="text-center">这里是公共底部</h1>
    </header>
  </body>
</html>
```

### 在页面中引入

下面在页面中引入看看效果

```html
<!DOCTYPE html>
<html lang="zh-CN" xmlns:th="http://www.thymeleaf.org">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <style>
      .text-center {
        text-align: center;
      }
    </style>
    <title>首页</title>
  </head>
  <body>
    <div th:replace="common/common-header::common-header"></div>
    <main>
      <p class="text-center">这里是页面单独的内容部分</p>
    </main>
    <div th:replace="common/common-footer::common-footer"></div>
    <div th:replace="common/common-lib-js::common-lib-js"></div>
    <script>
      console.log($);
    </script>
  </body>
</html>
```

效果图

![效果图](https://img.rxliuli.com/20190309095422.png)

可以看到 `common-lib-js`, `common-header`, `common-footer` 都已经引入成功

注意，我们在页面中引入的顺序是

1.  `common-header`: 公共头部
1.  页面自定义 HTML 内容
1.  `common-footer`: 公共底部
1.  `common-lib-js`: 公共 JavaScript 依赖
1.  页面自定义 JavaScript 脚本

主要遵循下面几个原则

- JavaScript 必须在 HTML body 结尾处引入，避免加载的速度问题
- 自定义的 JavaScript 必须在公共的 JavaScript 之后引入，避免依赖找不到

## 更进一步

难道每个页面我们都需要引入这些公共的文件么？有什么更好的方法么？例如每个页面只要写单独的部分，在渲染的时候 **自动** 将页面中的单独部分渲染到某个布局页面中。\
很遗憾的是，`Thymeleaf` 本身并未提供这个功能。然而，`Thymeleaf` 已经有人做出了第三方的库以提供此功能。

1.添加依赖项

```groovy
implementation 'nz.net.ultraq.thymeleaf:thymeleaf-layout-dialect:2.3.0'
```

2.添加布局文件

```html
<!DOCTYPE html>
<html
  lang="zh-CN"
  xmlns:th="http://www.thymeleaf.org"
  xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout"
>
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>layout</title>
  </head>
  <body>
    <!--公共的头部-->
    <div th:replace="common/common-header::common-header"></div>
    <!--页面自定义的 HTML-->
    <div layout:fragment="html"></div>
    <!--公共的尾部-->
    <div th:replace="common/common-footer::common-footer"></div>
    <!--公共的 js 依赖-->
    <div th:replace="common/common-lib-js::common-lib-js"></div>
    <!--页面的 js 依赖-->
    <div layout:fragment="js"></div>
  </body>
</html>
```

3.使用布局文件

```html
<!DOCTYPE html>
<html
  lang="zh-CN"
  xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout"
  layout:decorator="common/layout"
>
  <head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <style>
      .text-center {
        text-align: center;
      }
    </style>
    <title>首页</title>
  </head>
  <body>
    <main layout:fragment="html">
      <p class="text-center">这里是页面单独的内容部分</p>
    </main>
    <script layout:fragment="js">
      console.log($);
    </script>
  </body>
</html>
```

再次刷新，将看到与直接引入有着相同的效果！
