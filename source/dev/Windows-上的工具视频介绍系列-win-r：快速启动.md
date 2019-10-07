---
layout: post
title: '[Windows 上的工具视频介绍系列] win + r：快速启动'
abbrlink: '17054714'
date: 2019-10-07 16:48:00
tags:
  - Windows
---

# [Windows 上的工具视频介绍系列] win + r：快速启动

## 简介

虽然 Windows 上也有快速启动工具，但 Windows 原生的快速启动已然足够使用了。将快捷方式命名为一个简单的名字，例如将 **Google Chrome** 命名为 **GC**，然后丢到当前用户目录下，然后使用 **Win + R** 弹出运行窗口，然后输入 **GC**，系统就会启动 **Google Chrome** 了。

当然，更好的方法是新建一个目录保存这些快速启动的快捷方式，然后将目录添加到环境变量中即可（`Path`）。

## 视频

## 步骤

1. 创建一个目录。如下，吾辈在用户目录下创建了一个文件夹 _Shortcut_
   ![Shortcut 文件夹](https://raw.githubusercontent.com/rxliuli/img-bed/master/20191007171259.png)
2. 将目录添加到环境变量中
   ![将目录添加到环境变量中](https://raw.githubusercontent.com/rxliuli/img-bed/master/20191007173016.gif)
3. 将快捷方式并放到之前创建的目录下并重命名
   ![将快捷方式并放到之前创建的目录下并重命名](https://raw.githubusercontent.com/rxliuli/img-bed/master/20191007173630.gif)
4. 使用 `win + r` 唤出运行，输入快捷方式的名字回车打开
   ![使用 `win + r` 运行](https://raw.githubusercontent.com/rxliuli/img-bed/master/20191007174125.gif)
