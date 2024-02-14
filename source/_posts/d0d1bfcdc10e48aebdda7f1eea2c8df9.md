---
layout: post
title: 配置文件 yml
abbrlink: d0d1bfcdc10e48aebdda7f1eea2c8df9
tags:
  - java
categories:
  - 其他
  - Java
  - "# 配置文件 yml.md"
date: 1587219249398
updated: 1609304980935
---

> 本文主要引用自：[Spring Boot 配置文件详解](https://www.cnblogs.com/itdragon/p/8686554.html)，这里主要是为了进行记录以便吾辈进行查找。

yml 是 YAML（YAML Ain't Markup Language）语言的文件，以数据为中心，比 json、xml 等更适合做配置文件。

> 对比：
> yml 和 xml 相比，少了一些结构化的代码，使数据更直接，一目了然。\
> yml 和 json 呢？没有谁好谁坏，合适才是最好的。yml 的语法比 json 优雅，注释更标准，适合做配置文件。json 作为一种机器交换格式比 yml 强，更适合做 api 调用的数据交换。

## 语法

- 以空格的缩进程度来控制层级关系。空格的个数并不重要，只要左边空格对齐则视为同一个层级。注意不能用 `tab` 代替 `空格`。且大小写敏感。支持字面值，对象，数组三种数据结构，也支持复合结构。
- 字面值：字符串，布尔类型，数值，日期。字符串默认不加引号，单引号会转义特殊字符。日期格式支持 `yyyy/MM/dd HH:mm:ss`
- 对象：由键值对组成，形如 key:(空格)value 的数据组成。冒号后面的空格是必须要有的，每组键值对占用一行，且缩进的程度要一致，也可以使用行内写法：{k1: v1, ....kn: vn}
- 数组：由形如 -(空格)value 的数据组成。短横线后面的空格是必须要有的，每组数据占用一行，且缩进的程度要一致，也可以使用行内写法： \[1,2,...n]
- 复合结构：上面三种数据结构任意组合

## 使用

创建一个 Spring Boot 的全局配置文件 application.yml，配置属性参数。主要有字符串，带特殊字符的字符串，布尔类型，数值，集合，行内集合，行内对象，集合对象这几种常用的数据格式。

```yaml
yaml:
  str: 字符串可以不加引号
  specialStr: "双引号直接输出\n特殊字符"
  specialStr2: '单引号可以转义\n特殊字符'
  flag: false
  num: 666
  Dnum: 88.88
  list:
    - one
    - two
    - two
  set: [1, 2, 2, 3]
  map: { k1: v1, k2: v2 }
  positions:
    - name: ITDragon
      salary: 15000.00
    - name: ITDragonBlog
      salary: 18888.88
```

## 注意

- 字符串可以不加引号，若加双引号则输出特殊字符，若不加或加单引号则转义特殊字
- 数组类型，短横线后面要有空格；对象类型，冒号后面要有空格。
- YAML 是以空格缩进的程度来控制层级关系，但不能用 tab 键代替空格，大小写敏
- 如何让一个程序员崩溃？在 yml 文件中加几个空格！(〃＞皿＜)
