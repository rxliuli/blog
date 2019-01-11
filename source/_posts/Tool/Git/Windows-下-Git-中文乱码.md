---
layout: post
title: Windows 下 Git 中文乱码
date: 2019-01-11 18:39:53
tags: [Tool, Git, 记录]
---

# Windows 下 Git 中文乱码

## 场景

在公司的电脑上碰到了 Git 中文乱码的问题，例如想要查看一下仓库的状态，中文全部变成了 `\number` 的形式。

```sh
$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   "source/_posts/JavaScript/\345\234\250\344\274\240\347\273\237\351\241\271\347\233\256\344\270\255\344\275\277\347\224\250-babel-\347\274\226\350\257\221-ES6.md"
        modified:   "source/_posts/Tool/IDEA/IDEA \344\275\277\347\224\250\346\212\200\345\267\247.md"
        modified:   test/test.html
        modified:   test/test.js

no changes added to commit (use "git add" and/or "git commit -a")
```

## 解决方案

> 该方案摘抄自 [解决 Git 在 windows 下中文乱码的问题](https://gist.github.com/nightire/5069597)

配置一下这些内容即可

```sh
$ git config --global core.quotepath false # 显示 status 编码
$ git config --global gui.encoding utf-8 # 图形界面编码
$ git config --global i18n.commit.encoding utf-8 # 提交信息编码
$ git config --global i18n.logoutputencoding utf-8 # 输出 log 编码
$ export LESSCHARSET=utf-8
# 最后一条命令是因为 git log 默认使用 less 分页，所以需要 bash 对 less 命令进行 utf-8 编码
```
