---
title: Windows 上的工具清单
date: 2018-08-21
updated: 2018-10-14
tags: [Tool, Windows]
---

# Windows 上的工具清单

- [Windows 上的工具清单](#windows-上的工具清单)
  - [开发](#开发)
    - [IDEA：最好的 Java IDE](#idea最好的-java-ide)
    - [Google Chrome：最好的浏览器](#google-chrome最好的浏览器)
    - [MS VSCode：文本编辑器，类 IDE](#ms-vscode文本编辑器类-ide)
    - [Cmder：Windows 上模拟 Linux 终端](#cmderwindows-上模拟-linux-终端)
    - [HeidiSQL：SQL 客户端](#heidisqlsql-客户端)
    - [JDK：Java Developer Kit](#jdkjava-developer-kit)
    - [Git：Git 版本控制系统](#gitgit-版本控制系统)
    - [Apache SubVersion：公司使用的版本控制系统](#apache-subversion公司使用的版本控制系统)
    - [Apache Maven：Java 最流行的依赖管理工具](#apache-mavenjava-最流行的依赖管理工具)
    - [Apache Tomcat：Java Web 流行的开源服务器](#apache-tomcatjava-web-流行的开源服务器)
    - [Gradle：比较新的依赖管理工具，Andriod 默认的依赖管理工具](#gradle比较新的依赖管理工具andriod-默认的依赖管理工具)
    - [MobaXterm：非常强大的远程连接工具](#mobaxterm非常强大的远程连接工具)
    - [NodeJS：前端一把梭的基础](#nodejs前端一把梭的基础)
  - [日常](#日常)
    - [Win + R：快速启动](#win--r快速启动)
    - [SSR：正常上网必须](#ssr正常上网必须)
    - [MacType：字体美化](#mactype字体美化)
    - [Everything：文件快速搜索](#everything文件快速搜索)
    - [Snipaste：截图/贴图](#snipaste截图贴图)
    - [PicGo：图床上传](#picgo图床上传)
    - [ScreenToGif：录制 GIF 动态图](#screentogif录制-gif-动态图)
    - [QuickLook：文件管理器预览增强](#quicklook文件管理器预览增强)
    - [Bandizip：压缩/解压缩](#bandizip压缩解压缩)
    - [Ditto：剪切板增强](#ditto剪切板增强)
    - [imageview：图片浏览](#imageview图片浏览)
    - [Mindjet MindManager：思维导图](#mindjet-mindmanager思维导图)
    - [MS Office：文档管理](#ms-office文档管理)
    - [Google 文档：在线文档管理](#google-文档在线文档管理)
    - [SumatraPDF：电子书阅读（已被 Calibre 取代）](#sumatrapdf电子书阅读已被-calibre-取代)
    - [Calibre：电子书管理](#calibre电子书管理)
    - [Mozilla FireFox：抱有期待的浏览器](#mozilla-firefox抱有期待的浏览器)
    - [Pandoc：命令行转换文档格式](#pandoc命令行转换文档格式)
    - [AIMP：漂亮的本地音乐播放器](#aimp漂亮的本地音乐播放器)
    - [PotPlayer：视频播放器](#potplayer视频播放器)
    - [Dism++：Windows 的一个集中式的系统管理工具](#dismwindows-的一个集中式的系统管理工具)
    - [CCleaner：PC 上著名的垃圾清理工具](#ccleanerpc-上著名的垃圾清理工具)
    - [TreeSizeFree：以树状视图查看文件夹](#treesizefree以树状视图查看文件夹)
    - [FlashPlayer](#flashplayer)
    - [EagleGet：多线程下载工具（已被 PDM 取代）](#eagleget多线程下载工具已被-pdm-取代)
    - [Persepolis Download Manager：Aria2 图形化下载工具](#persepolis-download-manageraria2-图形化下载工具)
    - [waifu2x-caffe：图片清晰化](#waifu2x-caffe图片清晰化)
  - [国内流氓](#国内流氓)
    - [TIM：国内不得不用的流氓 IM](#tim国内不得不用的流氓-im)
    - [BaiduNetdisk：国内一家独大的网盘客户端](#baidunetdisk国内一家独大的网盘客户端)
    - [搜狗拼音输入法：很老的一个输入法了](#搜狗拼音输入法很老的一个输入法了)
  - [名词解释](#名词解释)
    - [便携版](#便携版)
    - [开源](#开源)
    - [部分开源](#部分开源)
    - [跨平台](#跨平台)
    - [免费](#免费)

## 开发

### IDEA：最好的 Java IDE

[便携版], [部分开源], [跨平台]

> [官网](https://www.jetbrains.com/idea/), [GitHub 社区版](https://github.com/JetBrains/intellij-community)

虽然说起最好的 IDE 什么的肯定是各种争论，但吾辈还是想说，在 Java 语言开发方面，IDEA 是目前最好的 IDE 了。

优点：

- 智能提示  
  IDEA 在代码提示方面真的是无可比拟（相比于 Eclipse 来说），通常在还没有打完全部代码的时候，IDEA 就知道想要做什么了，然后给吾辈最常用的提示。并且，对于某些不太好的代码，IDEA 会提出一些建议甚至帮助进行安全的重构。一般而言吾辈认为，如果 IDEA 认为代码有问题，那么一般真的是代码有问题（确实有些情况下也不尽如此）
- 开箱即用  
  虽然很不起眼，但这确实很重要。当下载完 IDEA 之后，几乎不需要安装什么插件，进行繁复的配置，就能开始工作了！因为 IDEA 帮你准备好了绝大多数情况所需要的插件，很多配置也都有着良好的默认值。
- 插件系统  
  或许 IDEA 的插件数量比不上 Eclipse，但 IDEA 的插件系统确实已经很完善了，至少，对于吾辈而言已然足够了。
- 界面很棒  
  其实这个就是吸引吾辈入坑 IDEA 的原因之一，毕竟当时整个班都在用者 Eclipse 的时候，吾辈看到了 IDEA 的黑色主题就被吸引了，然后到现在成了 IDEA 的死忠粉。
- 搜索功能  
  非常强大的搜索功能，可以搜索类，文件，字段，以及全文搜索，包括正则表达式，文件后缀名等过滤功能。
- 调试  
  或许有人说，现代的 IDE 基本上都有调试功能吧。但 IDEA 是不同的，它可以同时调试 Java 与 JavaScirpt 以及其他所集成的语言，这可真是强大无比。使用 JavaScript 发送一个请求，然后进入后台代码调试，得到 SQL 语句，去查询数据库，而这一切，都是在 IDEA 内部完成的！
- 语言注入  
  这是 IDEA 比较高级的部分了，但这也是一个相当强大的功能。例如，有时候我们不得不手写 SQL 语句，或者在 JavaScript 中拼接 HTML 代码。难道我们必须要去对应的文件中编辑完之后复制过来么？不不不，语言注入就是可以为某一个代码片段注入为某一种语言，例如你可以为 Java 中的字符串注入 SQL 语言。在字符串中，你写 SQL 语句就有提示了！
  > 当然，语言注入也是要符合基本法的，必须是 IDEA 支持的语言才行，不过 IDEA 对主流语言的支持都还不错。

缺点：

- 硬件杀手  
  IDEA 是出了名的吃内存（日常），吃磁盘（扫描项目建立索引）以及 CPU（索引）。
- 小病不断  
  虽然 IDEA 很是强大，但各种小问题也是层出不穷。例如自定义的 Maven 到了新的项目就变成默认的了。。。

常用的 Plugin：

- Jrebel：做 Java Web 开发时真心免不了的 Plugin，能够有效解决 Web 容器（例如 Apache Tomcat）启动速度慢的问题（因为几乎所有的资源都能够热加载，热部署）。
- LiveEdit：提供了 HTML/CSS/JavaScript 的实时预览和刷新功能。
- MybatisX：Mybatis 的一个辅助开发插件，能够比较愉快的使用 Mybatis 框架了
- Alibaba Java Coding Guidelines：Alibaba 出品的一个 Java 规范检查插件，能够规避一些不好的代码。
- Translation：目前使用感觉最好的翻译插件，能够提供比较长的内容进行翻译（某些翻译插件只能翻译很短的内容）。
- String Manipulation：字符串操作工具，可以方便对变量名或其他字符串修改为其他风格，例如将变量从 **驼峰命名**（Java 标准命名） 修改为 **下划线命名**（SQL 标准命名）或者 **中缀线命名**（HTML/CSS 标准命名）。
  > 其实这么多命名规范真心坑。。。
- Custom Postfix Templates：提供自定义的后缀模板
- GsonFormat：格式化 `json` 数据并转换为 `Java` 中的 `POJO`，其实对于吾辈而言主要是用来写爬虫时生成 `json` 数据对应的实体类
- Markdown Navigator：IDEA 平台的 Markdown 写作插件，比自带的 Markdown Support 要好很多，主要在需要写的 Markdown 内容中含有代码时比较方便。
- Maven Helper：一个 Apache Maven 的辅助操作插件
- CodeGlance：在编辑器右侧显示一块代码缩略图，主要为了方便使用滑块进行上下滑动
- Grep Console：自定义控制台的输出颜色
- .ignore：在使用版本控制时，快速忽略某些文件/文件夹，目前支持广泛
- CMD support：Cmd 支持，主要是方便在 IDEA 中直接运行 bat 脚本
- NodeJS：集成了 NodeJS，可以直接在 IDEA 中运行 NodeJS
- Vue.js：集成 Vue.js 框架
- Properties to YAML Converter：将 `Properties` 文件快速转换为 `YAML` 格式的配置文件
- WakaTime：统计使用的编程语言，不同 IDE 的记录。[官网](https://wakatime.com)

> 入门推荐教程（简体中文）：<https://github.com/judasn/IntelliJ-IDEA-Tutorial>

### Google Chrome：最好的浏览器

[部分开源], [跨平台], [免费]

> [官网](https://www.google.com/chrome/), [Google Chromium 各版本下载](https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html)

非常有名的浏览器，来源于 Google，在 PC 上不管是用于开发还是日常使用都能够满足需求。相比于国内的流氓而言非常干净简洁（至少，看起来而言），相比于 FireFox 来说更快，插件体系也已经足够庞大完整，基本上想要的都有了。

常用的 Plugin：

- AutoPagerize：自动翻页插件，浏览很多网站时不需要手动点击下一页了，可以自动加载出来下一页的结果。
- Checker Plus for Gmail™：对于日常使用 Gmail 的吾辈而言非常有用
- Checker Plus for Google Calendar™：日常使用 Google Calendar 方便进行提醒
- crxMouse Chrome™ 手势：鼠标手势插件，可以使用手势更简单地完成一些事情
- Dark Reader：为所有网站加上黑色主题，大部分情况下都还不错
- Enhancer for YouTube™：怎么说呢，Youtube 已经很好了，但吾辈还是觉得需要这个插件来优化播放体验
- Fatkun 图片批量下载：批量下载网页上的图片，偶尔用一下吧
- GitHub Hovercard：GitHub 增强插件，鼠标悬浮在仓库链接上面就可以预览
- GitHub Plus：GitHub 增强插件，显示仓库大小并可以下载单个文件
- Google 文档、表格及幻灯片的 Office 编辑扩展程序：使用 Chrome 浏览本地 Word，Excel，PPT 文档
- Insight.io for Github：GitHub 增强插件，仓库文件树状导航列表
- Isometric Contributions：GitHub 美化插件，将 GitHub 贡献以 3D 的效果显示出来
- IDM Integration Module：IDM Chrome 集成插件
- Image Search Options：使用右键以图搜图
- JetBrains IDE Support：使用 Chrome 实时显示 IDEA 的 HTML/CSS/JavaScript 文件，与上面的 IDEA 插件配合使用
- LastPass: Free Password Manager：跨平台的免费密码管理器，有了这个之后再也不用所有网站都使用同一个密码了
- Mailto: for Gmail™：对于 mailto 链接以 Gmail 网页版打开
- Markdown Here：在线将 Markdown 转换为有格式的文档，例如在一个普通的富文本编辑器（不支持 Markdown）中，可以先用 Markdown 语法写内容，然后转换一下就得到了有样式的内容了。
- Momentum：新标签页插件，这个纯粹看个人喜好
- Neat URL：移除网址中的无用段，例如返利链接后面的参数
- OwO：颜文字插件，多亏了这个让吾辈能够愉快的刷推了
- Proxy SwitchyOmega：科学上网必需
- RightToCopy：强制复制内容，有些网站就是不让复制，吾辈偏要！
- Stylus：使用自定义网站样式的插件，比 Stylish 的名声好一些
- Tampermonkey：使用自定义网站脚本的插件，可以使用各种 `user.js` 脚本，相当于小型的插件管理器了
- The Great Suspender：自动休眠标签页，避免 Chrome 使用的内存太过庞大
- uBlock Origin：日常上网必须，屏蔽各种广告，比 Adblock 的名声好一些
- 扩展管理器（Extension Manager）：插件很少的时候还好，一多起来还是需要一个插件进行管理，快速启用和禁用一些插件，根据场景切换启用插件列表
- WEB 前端助手(FeHelper)：貌似是百度的前端插件，但目前还没有什么流氓行为
- 隐私獾：拦截追踪器，并且防止 WebRTC 泄露，和 uBlock Origin 算是互补关系吧
- 快翻译：这个翻译插件是真心不错，某种意义上讲比 Chrome 自带的翻译都要好（#大雾）

Chrome 虽然已经很完美了，但 Google 却并非如此，最近 Chrome 开始变得越来越封闭了。首先是 Chrome 应用被删除，现在又禁止安装非官方商店中的第三方插件（目前仍可以通过开发者模式安装），真心越来越麻烦了。

> 附：这里提供一个快捷安装第三方插件的工具 [Chrome 插件伴侣](http://www.webappbus.com/)，方便解决 Chrome67 之后安装非商店插件的麻烦

### MS VSCode：文本编辑器，类 IDE

[便携版], [开源], [跨平台], [免费]

> 具体可以参考：[官网](https://code.visualstudio.com/), [GitHub](https://github.com/Microsoft/vscode), [GitBook 中文介绍](https://jeasonstudio.gitbooks.io/vscode-cn-doc/content/)

MS VSCode 是微软出品的一个跨平台，基于 Web 的，免费的开源文本编辑器。虽然吾辈刚接触了不到一个月，但已然觉得离不开它了。

主要优点：

- 开箱即用：基本上下载完就能开始使用了，不需要太多自定义的配置
- 多语言支持：这是很多文本编辑器/IDE 都没有做到的，例如上面吾辈最喜欢的 IDEA 到目前为止仍然只支持英文（虽然现在来说也没什么影响了），但吾辈仍然觉得本土化之后才能对萌新更加友好（门槛低，学习曲线平缓）
- 插件丰富：目前吾辈使用 VSCode 主要用于编辑 Markdown 文章，一些系统/程序的配置文件等，安装了插件之后使用对 Markdown 的功能支持还算不错。

缺点：

很明显，MS 的东西最后会不会变成全家桶/流氓谁也不清楚，虽然去年貌似 MS 在 GitHub 上的贡献量超过了 Google，但想想 MS 的开源黑历史。。。

常用的 Plugin

- ESLint: JavaScript 代码规范检查
- Excel Viewer: 以表格的形式显示 CVS 文件
- Git History: Git 历史显示
- Markdown PDF: 将 Markdown 导出 PDF 文档
- Material Theme: Material 风格的 VSCode
- Prettier: 其实是配合 ESLint 做代码格式自动修复的
- Settings Sync: 通过 Gist 同步 VSCode 设置
- Vetur: VueJS 框架支持
- Vue 2 Snippets: 添加了 VueJS2 的一些代码片段
- vuetify-vscode: 前端 Vuetify CSS 框架的 VSCode 代码提示
- WakaTime: 记录与统计代码的时间
- IntelliJ IDEA Keybindings: IDEA 的快捷键设置
- Markdown All in One: Markdown 编辑主要插件
- markdownlint: Markdown 语法检查
- Material Icon Theme: Material 风格的文件图标
- Settings Sync: 通过 GitHub Gist 同步设置和插件列表
- WakaTime: 统计使用的编程语言，IDE 的记录
- vscode-pandoc: 将 Markdown 转换为 HTML/DOC
- XML Tools: XML 增强工具

> [VSCode Settings](https://gist.github.com/rxliuli/529c425712b4b6fba23bd774a70e42b9)

### Cmder：Windows 上模拟 Linux 终端

[便携版], [开源], [免费]

> [官网](http://cmder.net/), [GitHub](https://github.com/cmderdev/cmder)

曾经有段时间吾辈也很迷信 Linux，觉得 Linux 适合开发者使用（事实上确实如此），但后来还是因为电脑的硬件原因（驱动问题，莫名其妙的卡死在登陆页面）而回到了 Windows。而最让人念念不忘的就是 Linux Bash 终端了，相比于 Windows 自带的 Cmd/PowerShell 来说漂亮/强大了许多。当然，Windows 相比于 Linux 的最大优点就是稳定（不怕折腾，很难损坏系统本身）以及可视化（大部分的设计都有可视化界面进行配置）。然而有时候还是不得不使用命令行，而这时便显示出 Windows 的不足了，直到后来吾辈在偶然的机会碰到了 Cmder，发现了 Windows 上果然已经有了解决方案。

Cmder 是一个在 Windows 上模拟 Linux Bash 的终端模拟器，其实对于吾辈而言，主要是因为 Cmder 比较漂亮，集成了很多组件（例如 Git, SSH, Curl, Less, vim），而且还能在上面安装 Windows 下的包管理系统 **Chocolatey**。安装了包管理器之后就能直接使用 `choco command options` 命令安装软件了。

> 具体方法可以参考另外一篇文章：[Windows 下 Cmder 安装 Chocolatey](https://blog.rxliuli.com/2018/06/27/Windows-%E4%B8%8B%E5%AE%89%E8%A3%85%E4%B8%8E%E9%85%8D%E7%BD%AE-cmder.html)

### HeidiSQL：SQL 客户端

[便携版], [开源], [免费]

> [官网](https://www.heidisql.com/), [GitHub](https://github.com/HeidiSQL/HeidiSQL)

一个支持 MSSQL,MySQL 和 PostgreSQL 的开源数据库轻量级客户端。吾辈使用这个 SQL 客户端最重要的原因就是满足了吾辈对于数据库文件的导入/导出需求，谁让 IDEA 自带的 DataGrip 没有导出功能呢

> 附：吾辈很清楚 MySQL 有自带的导出命令，然而并不灵活。。。至少这个能够定义创建数据表，插入数据时使用的策略

### JDK：Java Developer Kit

[开源], [跨平台], [免费]

> [官网](http://www.oracle.com/technetwork/java/)

Java 开发必备，内存杀手，尤其而且是在启动 Web 项目时会占用非常高的内存。

> 注：Minecraft 就是使用 Java 开发的游戏，所以运行起来非常占用资源而且很卡。

### Git：Git 版本控制系统

[便携版], [开源], [跨平台], [免费]

> [官网](https://git-scm.com/), [GitHub](https://github.com/git/git)

最初由 Linus 开发的一个分布式的版本控制系统，现在已经是最流行的版本控制系统之一了。说到 Git 不得不提 GitHub，GitHub 为 Git 实现了一个在线代码（或者其他）托管平台，相当好用而且托管开源项目是免费的。其实对于吾辈而言 Git 只是一个用于在本地操作 GitHub 的客户端罢了（很少有添加到 Git 而没有提交到 GitHub 的代码）。正是因为 GitHub 对 Git 的支持之好，所以吾辈才喜欢使用 Git 的。。。（#因果颠倒）

### Apache SubVersion：公司使用的版本控制系统

[便携版], [开源], [跨平台], [免费]

> [官网](https://tortoisesvn.net/index.zh.html), [GitHub](https://github.com/apache/subversion)

简称 **SVN** 或者小乌龟（图标），公司里面使用的版本控制工具。用于集中控制项目的进度，不能在本地进行提交进行本地版本控制，每次提交都必须要连接到中央服务器。

### Apache Maven：Java 最流行的依赖管理工具

[便携版], [开源], [跨平台], [免费]

> [官网](https://maven.apache.org/), [GitHub](https://github.com/apache/maven)

又是 Apache 家的工具，吾辈主要用作项目的依赖管理、项目打包构建方面。所有的依赖都通过 `pom.xml` 进行定义，能够简单的对依赖的 jar 进行统一管理，而不必每个项目都复制一份。

不过讲真现在 Maven 的默认配置不是特别好，JDK 默认仍然是 1.5，编码格式也默认为本地环境（都是坑），还有因为不可抗因素导致依赖下载的速度尤其的慢。

### Apache Tomcat：Java Web 流行的开源服务器

[便携版], [开源], [跨平台], [免费]

> [官网](http://tomcat.apache.org/), [GitHub](https://github.com/apache/tomcat)

**Apache \* 3**，Tomcat 是一个流行很多年的开源 Java Web 应用服务器，基本上很多中小企业都在用吧（`SpringBoot Web Starter` 里面直接内置了 Tomcat）。

### Gradle：比较新的依赖管理工具，Andriod 默认的依赖管理工具

[便携版], [开源], [跨平台], [免费]

> [官网](https://gradle.org), [GitHub](https://github.com/gradle/gradle)

号称是比 Maven 更好的依赖管理工具，在配置文件方面放弃了 Maven 的 XML 配置，采用了 `Groovy DSL` 作为配置文件语言，相比于 Maven 确实精简了不少。功能上可以直接将 Maven 的 `pom.xml` 转换为 `build.gradle`, 插件功能也比 Maven 更加强大。

但，功能强大也意味着复杂，目前的项目仍有很多在使用 Maven 进行项目管理（例如吾辈的公司就在用 Maven）。

### MobaXterm：非常强大的远程连接工具

[便携版]

> [官网](https://mobaxterm.mobatek.net/)

虽然是一个收费的远程连接工具，但免费家庭版本的功能已然够用了。同时支持 SSH/SFTP 这两点真心不错（集中化管理）。当然，页面上就比较复古一点（Win7 时代的风格），这个却是不用在意啦

> 页面优雅并且跨平台：[Termius](https://www.termius.com/)，但免费功能不支持 SFTP 功能

### NodeJS：前端一把梭的基础

[便携版], [开源], [跨平台], [免费]

> [官网](https://nodejs.org/), [官网中文界面](https://nodejs.org/zh-cn/), [GitHub](https://github.com/nodejs/node)

现代前端开发的基础，各种前端工具所必须的环境。像 NPM/Yarn/Bower 之类依赖管理，Gulp 这种自动化构建工具，还有各种前端库（JQuery/Twitter Bootstrap/React/Babel）都提供了使用 NPM 的依赖管理的引入方式，有些甚至不提供传统的手动引入方式！

> 附：然而 NodeJS 的作者又开始开发了新的 JavaScript 运行时，前端开发这却是又要受苦了呢 ┐(‘～`；)┌

---

## 日常

### Win + R：快速启动

虽说 Windows 上也有快速启动工具，但 Windows 原生的快速启动已然足够使用了。将快捷方式命名为一个简单的名字，例如将 **Google Chrome** 命名为 **GC**，然后丢到当前用户下面，然后使用 **Win + R** 弹出运行窗口，然后输入 **GC**，系统就会启动 **Google Chrome** 了。

当然，更好的方法是新建一个目录保存这些快速启动的快捷方式，然后将目录添加到环境变量中即可（`Path`）。

### SSR：正常上网必须

[便携版], [开源], [跨平台], [免费]

> [GitHub](https://github.com/shadowsocksr-backup)

为了正常浏览网络折腾与支付一些代价都是微不足道的，貌似比 `Shadowscoks` 要稳定一点，不过据传闻作者最初并未打算将其开源。

### MacType：字体美化

[开源], [免费]

> [官网](http://www.mactype.net/), [GitHub](https://github.com/snowie2000/mactype)

Windows 上的字体就是会出现锯齿（所谓的点阵字体真是坑），不过 MacType 可以缓解这一现象。它可以美化 Windows 对字体的渲染（绝大部分程序都不会出现问题），让吾辈在使用 Windows 的时候看着代码更舒服一点。

> 附：中文字体个人推荐 **造字工房悦黑系列**，英文字体推荐 **Inconsolata**（这款字体中文也可以用！不过不如前面那个看起来美观）

### Everything：文件快速搜索

[便携版], [免费]

> [官网](https://www.voidtools.com/)

用过 Windows Explorer（文件管理器）搜索文件的人都知道速度是有多慢，有了 Everything 之后这一切都是往事了。Everything 建立了全盘索引，可以对文件/文件夹进行实时搜索，速度之快简直和默认的文件管理器有天壤之别。当然，也能够根据正则表达式/类型进行高级查询。

### Snipaste：截图/贴图

[便携版], [免费]

> [官网](https://zh.snipaste.com/), [GitHub](https://github.com/Snipaste), [GitBook 中文教程](https://docs.snipaste.com/zh-cn/)
> 很漂亮，很漂亮，很漂亮！重要的话说三遍，Snipaste 相比于其他的截图软件（FSCapture）在使用时感觉漂亮了很多，而且在使用时会方便很多（截图完成后直接就进行编辑，而不是跳转到编辑器中编辑截图），保存时自动保存并且复制到剪切板也很方便。总而言之就是细节做的相当棒！

### PicGo：图床上传

[开源], [跨平台], [免费]

> [官网](https://molunerfinn.com/PicGo/), [GitHub](https://github.com/rxliuli/PicGo)
> 使用 Markdown 写作必备的图床工具，解决了吾辈关于 GitHub 图床的几个痛点。

- 上传之前重命名
- 上传一键就好
- 上传后图片管理

### ScreenToGif：录制 GIF 动态图

[便携版], [开源], [免费]

> [官网](https://www.screentogif.com/), [GitHub](https://github.com/NickeManarin/ScreenToGif)

虽然吾辈已经有了截图工具，但某些时候单靠截图并不能很好的表达意思，这时候就需要使用 Gif 去记录一系列的操作。这也是 ScreenToGif 的主要功能，将记录转换成 Gif 动态图。

嘛，虽然就使用上吾辈觉得还是有一些不便：

- 吸附窗口操作不太直观
- 保存时不能直接一键保存到指定目录并复制到剪切板

不过这也是目前吾辈能找到的比较好用的一个了

### QuickLook：文件管理器预览增强

[便携版], [开源], [免费]

> [官网](https://pooi.moe/QuickLook/), [GitHub](https://github.com/xupefei/QuickLook)

Windows Explorer 预览功能增强，支持很多种格式的文件/文件夹进行预览，包括但不限于文本、图像、视频、音频、压缩包、文件夹等。在按下空格时，就弹出一个预览窗口，感觉还是不错的。

### Bandizip：压缩/解压缩

[便携版], [免费]

> [官网](https://www.bandizip.com/)

目前吾辈觉得最好的压缩/解压缩软件，具体压缩率/支持格式什么的吾辈也并非专业所以就不说了。但就使用体验上看 Bandizip 是要明显优于其他同类软件的（WinRAR, 7Zip）。

吾辈看到的优点：

- 预览压缩文件时左侧有文件夹树状列表，不需要再用鼠标点击进进出出的活塞运动了
- 自动解压，这个功能相当棒，可以智能解压压缩文件到文件夹中（如果压缩包里面只有一个文件夹就直接解压出来，否则会将压缩包里面的内容解压到一个与压缩包同名的文件夹中），这个功能看起来很不起眼，但吾辈在此之前并未找到（需要特别注意压缩包的内容）

### Ditto：剪切板增强

[便携版], [免费]

> [官网](https://ditto-cp.sourceforge.io/), [善用佳软评测](https://xbeta.info/ditto.htm)

Windows 剪切板增强工具，不得不说 Windows 上的工具确实很多。即使一个功能 Windows 本身支持的不好，然而总有其他的工具对其增强就是了。[善用佳软评测](https://xbeta.info/ditto.htm) 对其的介绍很全面，这里也就无需赘述了，吾辈需要的只是它的剪切板历史功能。

### imageview：图片浏览

[免费]

> [官网](https://www.kantuwang.wang/)

中文名是 **快眼看图王**，嗯，有点俗。不过软件本身还是不错的，作为 Windows 上纯粹看图的软件却是极好的了，鼠标按下就可以拖动图片，可以浏览同一文件夹下的其他图片，快捷键 `Ctrl + C` 就可以直接复制图片。

### Mindjet MindManager：思维导图

[跨平台]

> [官网](https://www.mindjet.com/mindmanager/), [中文教程](http://www.mindmanager.cc/jiaochengziliao.html)

最近才开始用思维导图，Mindjet MindManager 算是国外比较老牌的思维导图工具了吧（XMind 好像也不错的样子），于是吾辈也就选择了它

> 注：该软件没有中文官网（苏州思杰马克丁软件有限公司 <http://www.mindmanager.cc/> 的那个所谓的中文官网是假的！！！关于这家公司的黑历史请去 [Google](https://www.google.com/search?q=%20%E6%80%9D%E6%9D%B0%E9%A9%AC%E5%85%8B%E4%B8%81) 了解）

### MS Office：文档管理

> [官网](https://products.office.com)

MS 的办公套件全家桶，讲真吾辈更喜欢用 `Markdown`，然而工作中其他人却只会使用 Word,Excel,PPT 也没办法不是。虽然不是国内流氓，然而还是不得不装的软件。

### Google 文档：在线文档管理

[免费], [跨平台]

> [官网](https://www.google.com/intl/zh-CN/docs/about/), [Chrome 插件](https://chrome.google.com/webstore/detail/gbkeegbaiigmenfmjfclcdgdpimamgkj)

MS Office 实在太重了，所以一般吾辈都是用 Google Doc 去浏览/修改文档的，加上 Chrome 插件之后可以直接使用 **Chrome 浏览器** 打开文档，修改的话也能自动保存，感觉还是很方便的。

### SumatraPDF：电子书阅读（已被 [Calibre](#calibre电子书管理) 取代）

[便携版], [开源], [免费]

> [官网](https://www.sumatrapdfreader.org/), [GitHub](https://github.com/sumatrapdfreader/sumatrapdf)

### Calibre：电子书管理

[便携版], [免费]

> [官网](https://calibre-ebook.com), [GitHub](https://github.com/kovidgoyal/calibre)

相比于上面的 [SumatraPDF](#sumatrapdf电子书阅读已被-calibre-取代)，Calibre 不但界面美观，功能也更为强大！而且是 PC 上少有的 Epub 阅读器，对一些自定义阅读设置也十分友好的提供了可视化设置（同样能以 CSS 配置），对电子书的管理、编辑、格式转换，书籍共享也支持的相当好。

### Mozilla FireFox：抱有期待的浏览器

[开源], [跨平台], [免费]

> [官网](https://firefox.com), [GitHub](https://github.com/mozilla/gecko-dev)

FireFox 是一个将 IE 拉下神坛的浏览器，一个开源的注重隐私的浏览器，但现在，它已然有些没落了。尤其是最近的 FireFox57 后为了提升性能更新了浏览器的整体架构，导致旧的扩展基本全部失效，恢复曾经的附加扩展生态却又不知道需要多久了。但是，这些问题，相比于隐私（信息收集）与自由（不限制扩展）来说，还是值得考虑一下的，确实挺期待 FireFox 之后发展的。

相比于其他的浏览器最大的特点就是隐私性和自由，收集隐私是完全可选的（国内的流氓浏览器信息收集简直过分），附加扩展基本不怎么限制（Chrome 限制扩展只能从官方商店直接安装）。

### Pandoc：命令行转换文档格式

[便携版], [开源], [跨平台], [免费]

> [官网](https://pandoc.org/), [GitHub](https://github.com/jgm/pandoc)

一个由 [Haskell](https://zh.wikipedia.org/wiki/Haskell) 语言开发的 [标记语言](https://zh.wikipedia.org/wiki/%E7%BD%AE%E6%A0%87%E8%AF%AD%E8%A8%80) 命令行转换工具，吾辈主要用来转换 Markdown 到 HTML/DOC。

### AIMP：漂亮的本地音乐播放器

[便携版], [免費]

> [官网](http://www.aimp.ru/)

一个很漂亮的本地音乐播放器，也能在线加载本地歌曲的歌词，貌似对歌曲音质的支持也很好（没什么感触），之所以放弃 Foobar 的最大原因就是其没什么好看的皮肤。。。

### PotPlayer：视频播放器

[便携版], [免费]

> [官网](https://potplayer.daum.net/)

非常强大/漂亮的本地视频播放器，虽然也可以播放 URL 的视频资源，但主要还是播放本地视频，支持大多数常见格式而且对于 1080P 之上的画质支持非常棒！

### Dism++：Windows 的一个集中式的系统管理工具

[便携版], [免费]

> [官网](https://www.chuyu.me), [GitHub](https://github.com/Chuyu-Team/Dism-Multi-language)

一个集中式管理 Windows 各种设置的 GUI 控制面板，能够方便的控制系统的各种设置（包括 Windows 10 的更新。。。），提供了一个简单但却还算可以的垃圾清理工具，感觉上很干净而且可以独立运行！

### CCleaner：PC 上著名的垃圾清理工具

> [官网](https://www.ccleaner.com/)

对于吾辈而言主要是用来清理垃圾（虽然和上面的 Dism++ 有些重复就是了）和注册表的，还提供了一个卸载软件的面板，相比于 Windows 自带的程序列表控制面板唯一的好处就是可以同时卸载多个程序。。。

### TreeSizeFree：以树状视图查看文件夹

[便携版], [免费]

> [官网](https://www.jam-software.com/treesize/)

用来以树状结构查看文件夹大小的工具，可以知道到底是哪些文件占用了硬盘及其大小。

### FlashPlayer

> [官网](https://www.flash.cn/)

早先时候流行的网页插件，有了 HTML5 之后逐步被放弃，但某些网页还是不得不用呀（好吧其实是吾辈偶尔想玩一些 Flash 游戏 #暴露年龄）

---

### EagleGet：多线程下载工具（已被 [PDM](#persepolis-download-manageraria2-图形化下载工具) 取代）

[免费]

> [官网](http://www.eagleget.com/)

默认集成 Chrome 的多线程下载工具，同时支持 `HTTP/HTTPS`, `BT` 等下载协议。

基本上满足吾辈日常的下载需求吧（不过静默下载这点不如 IDM，但谁让 EagleGet 是免费的呢！ ）

- [x] 提供客户端界面
- [x] 多线程
- [x] 集成 chrome
- [ ] 静默下载
- [x] 下载后可以打开文件/文件夹
- [ ] 便携版（配置可携带化）

### Persepolis Download Manager：Aria2 图形化下载工具

[免费], [开源], [跨平台]

> [官网](https://persepolisdm.github.io), [GitHub](https://github.com/persepolisdm/persepolis)

简称 PDM，相比于上面 EagleGet 最大的优点就是开源/跨平台了，虽然缺少集成 BT 下载功能，但也没有 EagleGet 的强制条款和后台常驻。

> 附：不过都不能做到静默下载，每次都要确认下载却是很麻烦呢

### waifu2x-caffe：图片清晰化

[便携版], [免费], [开源], [跨平台]

> [官网](http://waifu2x.udp.jp), [GitHub](https://github.com/nagadomi/waifu2x), [GitHub Windows](https://github.com/lltcggie/waifu2x-caffe)

可以让图片变得清晰，具体技术实现涉及机器学习等尖端技术（#dalao），可以说是很厉害了呢

## 国内流氓

### TIM：国内不得不用的流氓 IM

> [官网](https://tim.qq.com/)

垃圾 QQ，毁我人生！  
好了，以上纯属吐槽不用在意。QQ 是腾讯的社交 IM，由于国内使用人数极其庞大，所以吾辈也不得不用的软件。一个软件居然会向系统添加驱动服务，而且禁用了还不让使用，真是厉害了呀。。。

### BaiduNetdisk：国内一家独大的网盘客户端

> [官网](https://pan.baidu.com/)

目前真心国内唯一能用的网盘了吧（较大容量的），很多资源（动画，游戏，小说，电影）都是通过这个网盘进行分享，所以吾辈也在使用着。

> 附：已入正版会员，懒得去玩破解了，感觉时间花费的不值得了呢

### 搜狗拼音输入法：很老的一个输入法了

[跨平台], [免费]

> [官网](https://pinyin.sogou.com/)

国内老牌输入法，云输入功能还是可以的。吾辈使用的唯一理由是 MS 原生输入法不支持全局半角符号导致 coding 时经常需要切换语输入半角符号 "**(**" 与中文很麻烦，所以就用了这个。

---

> Pass：以上国内的流氓吾辈使用的都是修改过的版本，基本上没什么太多麻烦的东西了呢

---

## 名词解释

### 便携版

能够下载完解压之后无需安装即可直接使用的软件，所有的配置文件也都在程序运行的文件夹下（非用户目录下），理论上可以配置完成一次之后就可以用一辈子了（#笑）

### 开源

开放程序源代码，任何人都可以自由浏览

### 部分开源

指程序既有开源版本又有商业版本，所以标识为部分开源

### 跨平台

至少兼容三个主流 PC 系统平台（Windows/MacOS/Linux）才会标记为跨平台

### 免费

所有功能都完全免费（或许有捐助请求）才会标识为免费，有收费的高级功能的程序不会被标记为免费，例如 IDEA 就不会被标识为免费

> 以上均为吾辈个人主观认知，参考一下就好。。。
