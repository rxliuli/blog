---
layout: post
title: Joplin VSCode 插件发布啦
abbrlink: 9fbf8bb4
date: 2020-06-23 12:45:51
updated: 2020-06-23 12:45:51
tags:
  - 宣告
---

花了大约 3 周的零散时间，吾辈终于写完了 Joplin 的 VSCode 插件。

> [joplin](https://joplinapp.org/), [joplin-vscode-plugin](https://marketplace.visualstudio.com/items?itemName=rxliuli.joplin-vscode-plugin)

## 起因

### 为什么吾辈使用 Joplin

吾辈曾经使用过一些笔记工具，包括 印象、OneNote、Notion 这些，但最终都放弃了。
关键还是在于吾辈核心的一些需求未能得到满足:

1. 搜索要快
2. 编辑器体验要好
3. 数据应该能够全部导出
4. 基于标准的 md，可以直接复制到其他平台
5. 可以基于它进行二次开发
6. 还没死

下面让我们来细品以上工具的功能

印象笔记

好吧，印象笔记有国际版/国内版，但国内版本很明显属于收钱不做正事的典型，很长时间内都没有任何变化了。而且，markdown 支持并非官方自带，而是需要使用第三方插件才行（18 年底更新之后貌似支持了）。而且最近 [印象笔记又抢注国内的 notion 的图片商标](https://www.zhihu.com/question/343856067)，真可谓是国内独树一帜的**奇观** 了。

OneNote

老实说，如果习惯使用 Office 全家桶整理文档的话，OneNote 还是很香的，编辑体验和 Word 保持一致，搜索极快。但很遗憾的是，吾辈是坚定的 **万物基于 markdown** 人士，所以不喜欢 OneNote。

Notion

是目前遇到的一个比较满意的笔记工具，但主要有 3 点不太满意。

1. 编辑器比较卡
2. 搜索非常慢
3. 无法导出全部数据

> 具体参考：[Notion 使用体验](https://blog.rxliuli.com/p/fecb9995/)

而 Joplin，则是吾辈能够解决 notion 的以上几个问题的笔记工具，同时开源免费，允许吾辈参与其中。

主要优点：

1. 搜索很快，非常快
2. 可以使用外部编辑器打开
3. 数据都在自己手里，提供一次性导出全部的功能
4. 使用标准的 md，可以直接复制到其他平台
5. 可以基于它进行二次开发

主要缺点：

1. ui/ux 有点简陋
2. 没有 vsc 插件导致使用外部编辑器也并不是非常方便

### 为什么吾辈要写 vscode 的这个插件

1. 作为专业的编辑器在编辑功能上 vscode 是笔记工具无法比拟的。例如快捷键支持
2. vscode 不仅仅是一个编辑器，更有着非常庞大的插件生态圈，所以在 markdown 格式化、linter 校验、pdf 导出等功能上早已实现，不需要在笔记工具里重复造轮子 -- 还可能是方轮子
3. 事实上，我一直在使用 vscode 在进行 markdown 文档编辑工作，用 git + vscode 存储公司相关的文档。同时也在使用 joplin 存储个人的笔记资料，但目前经过一段时间发现我需要的是 vscode 的编辑 + joplin 的同步/搜索功能。

所以我编写了这个插件，用以给与我有相同需求的人使用。

## 插件介绍

在 VSCode 中集成 joplin，目前允许直接对目录、笔记进行操作，同时支持搜索功能。

![预览图](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20200623085740.png)

### 功能

- 在 VSCode 中有一个选项卡可以展示目录树
- 在 VSCode 中创建/更新/删除目录/笔记
- 在 VSCode 中点击即直接编辑
- 在 VSCode 中搜索所有笔记

### 要求

- [Joplin Pre v1.0.221](https://github.com/laurent22/joplin/releases/tag/v1.0.221)
- VSCode version > v1.45.0

### 插件设置

- `joplin.token`: joplin web 服务的 token
- `joplin.port`: joplin web 服务的端口，默认为 41184

### 已知问题

- 缺少快捷键支持

### 发布说明

#### 0.1.0

- 创建笔记后直接打开
- 关闭笔记后关闭同步
- 在 Joplin 中对目录/笔记做操作时 VSCode 中的目录树定时自动更新
- 添加开发环境变量
- 支持国际化
- 将 icon 替换为 joplin 的

#### 0.0.1

- 在 VSCode 中有一个选项卡可以展示目录树
- 在 VSCode 中创建/更新/删除目录/笔记
- 在 VSCode 中点击即直接编辑
- 在 VSCode 中搜索所有笔记

### 使用 Markdown

**Note:** You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
- Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
- Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

#### For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
