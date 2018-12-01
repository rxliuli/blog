---
title: Markdown 图片粘贴工具 PicGo
date: 2018-10-16
tags: [Tool, markdown]
---

# Markdown 图片粘贴工具 PicGo

## 情景

使用 Markdown 的人都知道，想要在 Markdown 文件中插入图片并不是特别容易，因为你必须要先把图片上传到图床才行，一个好的图床能够节省很多时间。吾辈之前使用的是 smms，后来切换到了 GitHub，毕竟 GitHub 作为国外流行的托管网站，但事实上 GitHub 上传图片麻烦一点也不少。_add -> commit -> push -> browser -> copy url_，实在麻烦。直到，遇到了 PicGo。

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

## VSCode 插件

如果你使用的编辑器是 VSCode 并且不需要管理图片的话，便可以使用 VSCode 插件 [PicGo](https://marketplace.visualstudio.com/items?itemName=Spades.vs-picgo)

基本上安装完成之后就可以直接使用了，默认使用 [SMMS 图床](https://sm.ms/)。

常用操作只有三个：

- 截图上传 `Ctrl-Alt-U`  
  ![20181201170229.png](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181201170229.png)
- 文件管理器选择上传 `Ctrl-Alt-E`  
  ![20181201170402.png](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181201170402.png)
- 输入文件路径上传 `Ctrl-Alt-O`  
  ![20181201170445.png](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181201170445.png)

> 如果你不想使用 SMMS 图床，也可以配置 GitHub 或者其他的图床，具体参考 [官方文档](https://marketplace.visualstudio.com/items?itemName=Spades.vs-picgo)。

那么，关于 Markdown 图片粘贴工具到这里便结束了，愉快的使用 Markdown 写作吧 `o(〃＾▽＾〃)o`
