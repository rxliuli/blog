---
title: Markdown 图片粘贴工具 PicGo
date: 2018-10-16
tags: Tool
---
# Markdown 图片粘贴工具 PicGo

## 情景

使用 Markdown 的人都知道，想要在 Markdown 文件中插入图片并不是特别容易，因为你必须要先把图片上传到图床才行，一个好的图床能够节省很多时间。吾辈之前使用的是 smms，后来切换到了 GitHub，毕竟 GitHub 作为国外流行的托管网站，但事实上 GitHub 上传图片麻烦一点也不少。add -> commit -> push -> browser -> copy url，实在麻烦。直到，遇到了 PicGo。

PicGo 对于吾辈而言主要解决了下面的问题：

- 上传之前重命名
- 上传一键就好
- 上传后图片管理

> [官网](https://molunerfinn.com/PicGo/), [GitHub](https://github.com/rxliuli/PicGo)

![官网首页截图](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181016231008.png)

## GitHub 设置

这里可以参考 PicGo 的 [官方教程](https://github.com/Molunerfinn/PicGo/wiki/%E8%AF%A6%E7%BB%86%E7%AA%97%E5%8F%A3%E7%9A%84%E4%BD%BF%E7%94%A8#github%E5%9B%BE%E5%BA%8A)

基本上就是需要以下三个配置

- 仓库名：准确地说是 [用户名/仓库名]，例如吾辈的 GitHub 帐户名是 rxliuli，作为图床的仓库名是 img-bed，那么这里应该设置为 **rxliuli/img-bed**
- 分支名：默认就是 master 分支，如果没什么特别的需求应该不用修改
- Token：用来操作 GitHub 的钥匙，你可以在 [Token 设置](https://github.com/settings/tokens) 中任意生成，但需要留意权限，默认选择第一个 repo 然后点击 **Generator Token** 按钮生成就行了

吾辈的配置

![PicGo 配置](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181016232104.png)
