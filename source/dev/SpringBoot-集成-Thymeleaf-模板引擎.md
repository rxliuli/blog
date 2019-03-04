---
layout: post
title: SpringBoot 集成 Thymeleaf 模板引擎
abbrlink: 229b5cfd
date: 2019-03-04 14:07:07
tags:
---

# SpringBoot 集成 Thymeleaf 模板引擎

## 问题

- 静态资源引用错误：绝对路径是 `/**` 而非 `/static/**`
- 无法使用 layout 功能：缺少依赖
- title 标题被覆盖
