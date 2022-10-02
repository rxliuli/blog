---
layout: post
title: Yarn link 链接本地项目
abbrlink: 5ee1b8e7d6a24ad4a21caaceb371a46c
tags:
  - 工程化
date: 1580652937887
updated: 1609303410280
---

## 场景

作为 JavaScript SDK 的开发者一定都知道，想要在未发布前进行测试整个包可谓是困难重重。而 `yarn link` 这个命令便是为了解决这个需求而产生的，它能让包引用并测试自身，即便包并未发布或不包含在 `package.json` 中亦然。

## 操作

> [官网链接](https://www.notion.so/rxliuli/Yarn-link-45007161bbfd43b2beffac88a0bc69b0#396f98a450c445f29e6fff69202654f0)

### 链接包

在命令行运行即可将当前包链接安装到这个包中，即便你在 `package.json` 并不会找到显式的依赖。

```sh
yarn link && yarn link "<package.json 中的 name 字段>"
```

> 注：如果当前包是 `cli`，即 `package.json` 中包含 `bin` 字段，则还会被链接到 yarn 的全局脚本目录中。
> yarn 的全局脚本目录可以通过执行 `yarn global bin` 进行查看，如果要在全局执行，则需要将该目录设置到环境变量 `Path` 中，然后就可以全局运行命令了。

然后，便可以在项目中使用了（测试）

```sh
import <pkgName> from 'pkgName'
```

### 取消链接

如果不需要了，则也可以轻易通过 `unlink` 移除。

```sh
yarn unlink "<package.json 中的 name 字段>" && yarn unlink
```

> 注：同样的，如果当前包是 `cli`，则 yarn 全局 `bin` 目录中也会进行删除

### 通用 script

每个项目都这样太麻烦了，可否添加一个通用 `script` 脚本呢？

当然是可以的，通过 `%npm_package_name%` 我们便能在 `srcipt` 中访问到项目名

```json
"scripts": {
  "link:add": "yarn link && yarn link %npm_package_name%",
  "link:remove": "yarn unlink %npm_package_name% && yarn unlink"
},
```

> 参考：<https://docs.npmjs.com/misc/scripts#packagejson-vars>

以后便可以直接将命令复制到 `script` 即可直接使用了。

> 注：使用 `%%` 包裹便能在 `script` 中使用，该方式在 Windows 下生效，Linux 下似乎需要添加前缀 `$`，不过吾辈并未测试（懒得折腾 Linux 桌面了）。
> 然而，问题并非不存在了，例如本地使用 Windows 构建，然而远程 CI 使用 Linux，那这个脚本就要炸了。。。所以，如果你需要上 CI 的话，还是老实改名字吧。
> 或者也可以使用 **VSCode + WSL**？#笑
