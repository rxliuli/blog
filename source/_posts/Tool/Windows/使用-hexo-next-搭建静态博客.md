---
layout: post
title: 使用 hexo next 搭建静态博客
tags:
  - markdown
  - blog
  - 教程
abbrlink: '8034e749'
date: 2018-12-09 16:32:42
updated: 2019-01-10 00:00:00
---

# 使用 hexo next 搭建静态博客

## 场景

在碎片化学习的时代，没有体系化/总结的知识很快会被彻底遗忘，而博客可以帮助我们记忆平时零碎的知识。有人似乎认为想玩博客就必须要域名/服务器，这里吾辈不得不说明一下，这个认知是错误的。

对于绝大多数网站来说，静态是无法满足复杂的需求的。然而我们只是想要日常写点博客，分享到网络上的话，却是不需要这些，静态博客也便是足够了。

## 准备

本文假设你是一位开发者并至少对下面打勾的内容有基本了解。

- [x] [git](https://git-scm.com/)：分布式版本控制工具
- [x] [gitlab](https://gitlab.com/)：私有代码托管平台
- [x] [Bash/PowerShell/Cmd](.)：命令行操作
- [x] [域名](.)：让别人能记住你的博客
- [ ] [nodejs](https://nodejs.org/)：JavaScript 运行环境
- [ ] [netlify](https://www.netlify.com/)：静态网站托管服务
- [ ] [VSCode](https://code.visualstudio.com/)：文本编辑器（类 IDE）

## 使用 npm 全局安装 hexo

如果你还没有安装 nodejs 的话可以去 [nodejs 官网下载页面](https://nodejs.org/en/download/) 进行下载并安装，具体步骤可以参考 [在 Windows 上安装 nodejs](.)。

全局安装 hexo 命令行工具

```sh
npm i hexo -g
```

安装过程

![hexo cli 安装过程](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209170408.png)

验证一下

输入 `hexo`，应该会得到类似下面的响应

![hexo 安装验证](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209170553.png)

## 初始化 hexo 博客

创建一个空的文件夹作为 hexo 博客目录，在命令行中进入这个文件夹然后执行初始化命令。

```sh
hexo init
```

输出

![hexo init 输出](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209174358.png)

安装完成后文件夹如下

![安装后的文件夹](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209175833.png)

## 本地运行博客

使用命令运行一个本地的 hexo 博客服务器

```sh
hexo s
```

在浏览器打开 <http://localhost:4000/> 页面，可以看到 hexo 博客的初始页面  
![hexo 博客的初始页面](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209175541.png)

嗯，有点丑，我们可以更换一下主题，本文主要讲解使用 [hexo next](https://theme-next.iissnan.com/) 主题。

## 安装 next 主题

1. 克隆并安装主题最新版本

   ```sh
   git clone https://github.com/iissnan/hexo-theme-next themes/next
   ```

2. 启用主题  
   打开根目录下的 _\_config.yml_ 文件，找到 `theme` 字段，将之修改为 `next` 即可  
   ![启用 next 主题](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209181850.png)

3. 重新打开本地服务器测试一下  
   ![next 主题首页](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209182031.png)

## 将代码托管到 gitlab

> 肯定有人会问，为什么不用 github？  
> 原因很简单：如果你需要使用第三方服务的话肯定需要第三方服务的认证。例如 github 的 token，如果别人想要滥用这个 token 对你的博客做点什么，你却无法阻止，因为 github 托管代码是公开的。

删除掉默认的 _landscape_ 主题和 _next_ 主题的 git 仓库，位置分别是

- _themes/landscape/_
- _themes/next/.git_

在本地也初始化一下 git 仓库，然后初始提交全部

```sh
git init
git add -A
git commit -a -m "Initial Commit"
```

所以，在 [gitlab](https://gitlab.com) 创建一个私有仓库（最好与本地博客文件夹同名）。  
![gitlab 创建私有仓库](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209182900.png)

创建完成后会得到一个 git 远程仓库的地址  
![git 远程仓库地址](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209183821.png)

将之设置为本地仓库的远程仓库

```sh
git remote add origin [这里替换成你的远程仓库地址]
```

最后，提交一下吧

```sh
git push origin master
```

提交完成后回到刚才创建的远程仓库的页面，会看到远程仓库中已经有文件了  
![提交完之后](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209184200.png)

## 托管网站

> 这里声明一下：之所以不使用 github 作为静态网站托管服务是因为 github 只能托管一个静态网站，老实说这是一件很麻烦的事情。毕竟，一个人并不止一个网站。

具体差别如下：

| 对比                   | GitHub       | Netlify     |
| ---------------------- | ------------ | ----------- |
| 价格                   | 免费         | 免费        |
| 构建限制               | 每小时 10 次 | 每分钟 3 次 |
| 使用 HTTPS 的自定义域  | 是           | 是          |
| 单击 回滚              | 没有         | 是          |
| 资产优化               | 没有         | 是          |
| 表格处理               | 没有         | 是          |
| 部署预览               | 没有         | 是          |
| 持续部署               | 没有         | 是          |
| 自定义重写和重定向     | 没有         | 是          |
| 兼容所有静态站点生成器 | 没有         | 是          |
| 预呈现                 | 没有         | 是          |
| 拆分测试               | 没有         | 是          |
| Lambda 函数集成        | 没有         | 是          |

## 部署 netlify

1. 首先你需要一个 [netlify](https://netlify.com/) 的账号，只需要邮箱即可注册。

2. 登录之后进入你的 [个人首页](https://app.netlify.com/)  
   ![个人首页](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209211213.png)

3. 由于我们的远程仓库使用的是 GitLab，所以我们连接自己的 GitLab 账户  
   ![连接到 GitLab](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209211441.png)

4. 接下来找到我们的远程仓库  
   ![远程仓库](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209211616.png)

5. 设定构建命令以及构建目录，没有意外的话 netlify 已经自动识别出这是 hexo 博客了
   ![设定构建命令](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209211803.png)

6. 部署站点  
   点击部署之后就会帮你自动部署，部署完成后就可以在线访问你的博客啦  
   ![在线自动部署](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209212501.png)

7. 自定义域名

   > 如果你还没有自己的域名（本文假定你有），可以直接跳转到步骤 9

   1. 点击 **Domain settings** 进入域名设置
   2. 点击 **Add custom domain** 添加自定义的域名
   3. 点击 **Verify => Yes, add domain** 验证并确认添加
   4. 点击 **Check DNS configuration** 检查 DNS 配置
   5. 查看其中的 CNAME DNS 记录，一会还要用

   ![Gif 图解](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190110234441.gif)

8. 在你的域名 DNS 记录中添加上面的 CNAME 记录

   1. 打开你的 DNS 管理器，这里以 [cloudflare](https://www.cloudflare.com) 为例
   2. 添加一条 CNAME 记录，Name 是我们自定义的二级域名前缀 [blog-demo](https://blog-demo.rxliuli.com/)，Domain name 是 netlify 为我们自动生成的二级域名 [confident-joliot-3c1548.netlify.com](https://confident-joliot-3c1548.netlify.com/)。
   3. 等待 DNS 刷新完成

   ![Gif 图解](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190110235636.gif)

   > 这里吾辈再推荐一次 [cloudflare](https://www.cloudflare.com)，DNS 刷新时间不会超过 5 分钟，真的是有够快的了！

9. 访问博客  
   ![访问博客](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209212636.png)

## 修改博客设置

现在博客基本上部署到线上了，然而有很多地方需要配置，如果需要了解更多的功能可以访问 [hexo](https://hexo.io/) 或 [hexo next 主题](https://theme-next.iissnan.com/)，下面只说一些最重要的配置。

在 _\_config.yml_ 配置文件中

- title：博客标题
- subtitle：博客子标题
- language：博客显示语言
- author：作者

配置效果对照图

![VSCode](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209214854.png)  
![浏览器](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209215051.png)

## 写一个新的文章

使用 hexo 命令即可创建新的文章（本质上是一个含有 yml 关于文章简介的 markdown 文件）

```sh
hexo new "[文章名]"
```

![创建新的文章](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209215646.png)

随便写点什么  
![编辑 markdown 文件](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209215853.png)

最后使用 git 将之提交到 GitLab 远程仓库，netlify 会监听并帮我们自动部署好一切的，再访问网站可以看到新的篇章了（如果内容很多可能要等一段时间）  
![新的篇章](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181209220703.png)

这个示例 blog 被吾辈部署到 <https://hexo-next-blog-demo.rxliuli.com/>

## 总结

最后，吾辈推荐看看下面的内容

- [hexo 官网](https://hexo.io/)
- [next 主题官网](https://theme-next.iissnan.com/)
- [markdown 语法说明](https://blog.rxliuli.com/p/5042aac0/)
- [VSCode 搭建 markdown 写作环境](https://blog.rxliuli.com/p/43851eb5/)
- [Markdown 图片粘贴工具 PicGo](https://blog.rxliuli.com/p/6138bec/)
