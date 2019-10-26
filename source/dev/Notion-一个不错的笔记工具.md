---
layout: post
title: 'Notion: 一个不错的笔记工具'
abbrlink: 128afec8
date: 2019-10-26 12:49:04
updated: 2019-10-26 12:49:04
tags:
  - 文章
  - 工具
---

# Notion: 一个不错的笔记工具

> [官网](http://notion.so)

## 快捷键

- `C-B`：将选定文字加粗
- `C-I`：将选定文字变成斜体
- `C-E`：将选定区域为行内代码，或者结束行内代码模式
- `S-鼠标滚轮`：水平滚动
- `CS-L`：切换夜间模式
- `C-V + Link`：选中文字粘贴链接，会直接将文字变成可点击链接
- `CS-Up/Down`：将当前行上移/下移
- `S-Enter`：不完成当前区块的情况下换行。类似于 QQ 的回车发送消息，`Shift-Enter` 换行一样。
- `Tab`：缩进一个 Tab
- `S-Tab`：反向缩进一个 Tab

## 快捷 Block 片段

输入后按空格即可生成的特定 Block 的字符

- `-`：无序列表
- `Number`：有序列表
- `>`：可折叠层级列表（和 markdown 语义不同了）
- `"`：引用（这才是 markdown 中 `>` 在 notion 中的关键字）
- **``**：行内代码块
  - 必须在输入第一个 `之后，输入代码，再输入第二个` 才有效
  - 生成行内代码片段后，必须紧跟一个空格，如果输入之后又删除掉，再次输入就会被当成行内代码，这时候使用 `C-E` 可将下一个字符指定为行内代码之外的文本。
- **```**：区域代码块
  - 无法直接指定语言，必须在选择框内选择语言（鼠标）

## 夜间模式

通过 `CS-L` 进行切换，也可以在 `Settings & Members` 中找到 `Dark Mode` 这个切换。

![夜间模式](https://raw.githubusercontent.com/rxliuli/img-bed/master/20191026125332.png)

## 缺点

- 编辑真的很卡！
- 性能不好
  - 大文件
  - 包含图片
  - 导入 markdown
- 粘贴富文本链接存在问题
- 没有列编辑
- 没有 **标签** 的概念，导致分类只能依赖于目录，不能跨目录进行某种关联。例如 **未完成**
- 就单纯的编辑体验上还说不上非常好，至少比起 VSCode 还有一段距离
- 无法深度导出 PDF（需要企业版），导致想要打印资料会很不方便
- bug
  - 从编辑器之外点击编辑器，第一次并不会获取到焦点，需要点第二次才行（只出现在 Windows 自动分屏）
  - 代码块中同时存在中文和英文时粘贴后只剩中文部分，英文代码不见了
  - 从 VSCode 的 markdown 预览区复制的区域代码块最后总是会多出空行
  - 代码高亮渲染问题，目前 `TypeScript/HTML` 是存在问题的
    ```ts
    // 一个用于
    type PromiseDeconstruct<T extends Promise<any>> = T extends Promise<infer R>
      ? R
      : never
    const res = Promise.resolve(1)
    // 解构 Promsie 中的泛型类
    const i: PromiseDeconstruct<typeof res> = 1
    ```

## 感受

笔记适合作为整理资料的方式，而作为写作工具的话体验却是还差了点。
