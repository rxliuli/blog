---
layout: post
title: VSCode 在 markdown 文档中存在表格时不能格式化文档
abbrlink: 8adbedea5b52412b9ed010ad71d6cfbf
date: 2020-02-02 10:15:38
updated: 2020-12-30 08:25:40
tags:
  - vscode
sticky: null
---

## 场景

在使用 markdown 写文档时突然发现格式化功能失效了。这是个很麻烦的问题，吾辈经常要用 VSCode 写 markdown 文档，如果不能进行格式化真是个大麻烦了。

## 确认是否为插件问题

吾辈有关 Markdown 的插件列表

- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
- [Markdown PDF](https://marketplace.visualstudio.com/items?itemName=yzane.markdown-pdf)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

不能进行格式化吾辈的第一想法就是 **Markdown All in One** 插件是不是出问题了，毕竟吾辈写 Markdown 文档这么久了，也是第一次遇到这种问题呢\
吾辈尝试禁用了 **Markdown All in One** 插件后，发现文档确实能够正常格式化了。\
然而这并没能解决问题，因为在 VSCode 书写 markdown 文档的话，**Markdown All in One** 插件的功能是必不可少的（更好的语法高亮，自动完成，生成标题等）。

实际上进行格式化的操作是由 **Prettier** 完成的，所以吾辈觉得应该是 **Markdown All in One** **阻碍** 了 **Prettier** 插件的格式化功能。

然而吾辈也明白了一件事：**Markdown All in One** 和 **Prettier** 插件居然不兼容！

## 确认是否是普遍性问题

之后，吾辈想要确认这是否是一个普遍性的问题。测试了几个 markdown 文档后惊奇的发现有些能够正常格式化，有些就不行。\
这就很奇怪了，吾辈在逐次删减部分 markdown 内容后终于发现了影响格式化的代码 -- 表格。\
这可真是太意外了，毕竟表格这种东西，感觉上不应该会影响到插件本身呀

## 解决

吾辈正要打算去 **Markdown All in One** 插件 [GitHub Issues](https://github.com/neilsustc/vscode-markdown/issues) 提出这个问题时，发现上面已经有人遇到了这个问题了。<https://github.com/neilsustc/vscode-markdown/issues/317>

开发者回复说明了这样的内容

> Thanks for the detailed description. The problem is vscode implicitly only allows one "formatter" per language. Then this extension('s formatter) and that of Prettier cannot co-exist.\
> Related [Microsoft/vscode#41882](https://github.com/Microsoft/vscode/issues/41882).\
> Is there an option of Prettier to format GFM table? If it can do this, you can disable this extension's formatter with `markdown.extension.tableFormatter.enabled`

大意是在 VSCode 中每种语言的格式化程序默认只能有一种，所以 **Markdown All in One** 的表格格式化 和 **Prettier** 的格式化就产生了冲突。然后他给出了解决方案，禁用掉表格格式化。\
配置如下

```js
{
  // 禁用表格格式化功能
  "markdown.extension.tableFormatter.enabled": false,
}
```

最后，添加这个配置之后需要重启 VSCode，不然可能不会生效哦
