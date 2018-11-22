---
title: Windows 下 Cmder 安装 Chocolatey
date: 2018-06-27 01:39:21
tags: Cmder
---

# Windows 下 Cmder 安装 Chocolatey

Chocolatey 是一个 Windows 下的软件包管理系统，追求一切皆可用命令解决。

> [官网](https://chocolatey.org/) / [GitHub 仓库](https://github.com/chocolatey/chocolatey)

在 Cmder 的 Admin Bash 环境下输入以下命令：

```bash
λ powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
```

![安装图示](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181122211812.png)

> 此处千万注意三点：

1. 使用 **Admin** 权限打开的 Cmder（或者是打开的新选项卡）  
   如果提示你权限不足肯定就是因为这个啦
2. 使用的是 Cmder **Bash** 而非 PowerShell  
   在 powershell 下也能够安装（命令不太一样），然而我们想要在 Cmder Bash 下安装，所以不要搞混淆了哦
3. 命令不要复制错误了（吾辈就错了。。。）  
   如果提示 _使用“1”个参数调用“DownloadString”时发生异常:“不支持给定路径的格式。”_ 的话一般都是下载路径那里多了个空格之类，仔细找找吧

安装完成之后输入 `choco` 验证一下，得到如下输出即为成功！
![成功的响应](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181122211828.png)
Chocolatey 常用的命令如下：

```bash
λ choco list softwareName //查询软件列表
λ choco install softwareName //安装软件
λ choco list -lo //列出当前使用 choco 所安装的软件
λ choco uninstall softwareName //卸载软件
λ clist softwareName //查询软件列表简写
λ cinst softwareName //安装软件简写
```

[可安装软件包列表](https://chocolatey.org/packages)

## Windows 下常用的开发环境软件包

```bash
λ choco install git.install     #安装 git
λ choco install jdk8            #安装 JDK8
λ choco install google-chrome-x64 #Google Chrome (64-bit only)
λ choco install autohotkey.portable    #安装 AutoHotkey (Portable)
λ choco install googlechrome    #安装 Chrome
λ choco install firefox         #安装 firefox
λ choco install python          #安装 python
λ choco install nodejs.install  #安装 node
λ choco install ruby            #安装 ruby
λ choco install notepadplusplus.install #安装 notepad++
λ choco install Atom                    #安装 Atom
λ choco install SublimeText3            #安装 SublimeText3
```

Cmder 在使用 `Cmd` 原生命令时（例如 `clip` 复制命令），可能会出现乱码，使用命令即可切换默认代码页为 `UTF-8`：

```bash
powershell -NoProfile -ExecutionPolicy unrestricted -Command "chcp 65001"
```

如果有什么能够一劳永逸的方法就好了，泥萌知道的话可以去 [GitHub](https://github.com/rxliuli/rxliuli.github.io) 提出 [Issues](https://github.com/rxliuli/rxliuli.github.io/issues) 啦
