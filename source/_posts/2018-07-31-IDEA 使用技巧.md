---
title: IDEA 使用技巧
date: 2018-07-31 01:39:21
tags: IDEA
---
# IDEA 使用技巧

- [IDEA 使用技巧](#idea-使用技巧)
  - [设置 IDEA 全局默认环境](#设置-idea-全局默认环境)
  - [Alt-Enter 自动修复](#alt-enter-自动修复)
  - [代码搜索/跳转/选择](#代码搜索跳转选择)
  - [语言注入](#语言注入)
  - [Live Template/Prosfix Template 模板](#live-templateprosfix-template-模板)

## 设置 IDEA 全局默认环境

使用场景：  
使用 IDEA 经常会遇到一种情况，在这个项目自顶了一些设置（**Settings** 而非 **Project Structure**，例如 自定义的 Maven，项目字符编码等等），到了新的项目全部恢复了默认值又要重新设定。

解决方案：  
通过 IDEA 的默认设置（**File > Other Settings > Default Settings**）就可以设定全局的 **Settings**，而不需要在每个项目中重新设定一次。

> 默认设定按吾辈的理解应该是用于设定那些可以使项目级别的设置，例如 **代码检查**，**代码样式** 等。毕竟大部分的设置都是全局的嘛

## Alt-Enter 自动修复

Alter-Enter 大概是 IDEA 最强大快捷键了，放在不同的位置有不同的功能。

- 警告（代码下面有黄色波浪线），会自动帮我们修复警告。
    代码重复，代码冗余（1/0 之类），多余的变量（声明完就立刻返回/声明完最多只使用了一次）
- 错误（代码下面有红色波浪线），一般会提出合适的修复建议。
    代码缺少注解，具体子类有未实现的方法
- 接口名（接口的名字），一般会提示可以生成实现类或者跳转到实现类
- 普通类名，一般会提示创建测试类，没有 JavaDoc 注释还会提示生成注释
- 字符串里面，会提示使用 [语言注入](#语言注入)

## 代码搜索/跳转/选择

这里更常用的是快捷键：

- 搜索
  - `C-N` ：搜索类名
  - `CS-N` ：搜索文件名
  - `CSA-N` ：搜索字段名(包含数据库字段)/方法名
  - `SS` ：搜索接口路径，类名，文件名，字段名/方法名
  - `C-E` ：列出最近操作的文件历史以及可操作面板列表
  - `A-F1` ：列出可操作的面板列表
  - `CS-F12` ：收起/显示所有面板
  - `C-F12` ：在一个悬浮面板上列出所有字段/方法
- 跳转
  - `CA-Left/Right` ：跳转到上一个/下一个浏览的位置
  - `C-Top/Bottom/Left/Right`：左右是跳转到上一个/下一个单词，上下是移动屏幕（非移动光标）
  - `A-Top/Bottom/Left/Right` ：左右是切换标签页，上下是切换方法
  - `Home` ：跳转到行首/编辑器的最左侧
  - `End` ：跳转到行尾
  - `C-Home/End` ：跳转到文件的开始/结尾
  - `C-Page Up/Page Down` ：跳转到当前屏幕的第一行/最后一行
  - `CS-Backspace` ：回退到上一个编辑的位置
  - `C-;` ：屏幕内任意跳转
  - `F2/S-F2` ：跳转到下一个/上一个错误/警告的位置
  - `C-Left/C-Right` ：跳转到上一个/下一个单词的位置
  - `C-B` ：跳转到变量/方法的声明处
  - `CS-B` ：跳转到变量/方法的具体实现处，如果不止一处就会列出下拉框
    > 注：这里吾辈修改了快捷键，毕竟 `CA-B` 单手按起来还真有点麻烦
  - `F12` ：跳转到最后一个使用的面板
  - `A-Top/Bottom` ：如果有小键盘的话使用这个还算不错
  - `CS-Number` ：如果有小键盘的话使用这个会非常好用
    - `CS-Top/Bottom/Left/Right` ：相当于 `C-Top/Bottom/Left/Right`
    - `CS-71` ：相当于 `C-Home/End`
    - `CS-93` ：相当于 `C-Page Up/Page Down`
    - `CS-0` ：相当于 `C-Insert`
    - `CS-.` ：相当于 `C-Delete`
  - `SA-Number` ：如果有小键盘的话使用这个还算不错
    - `SA-Top/Bottom/Left/Right` ：相当于 `A-Top/Bottom/Left/Right`
    - `SA-7` ：相当于 `A-Home`
    - `SA-0` ：相当于 `A-Insert`
- 选择
  - `C-W/CS-W` ：扩大/缩小选择区域范围
  - `A-J` ：选中多个相同的单词（一个个的选中）
  - `CSA-J` ：选中多个相同的单词（全部选中）

> 注：在 IDEA 看来左侧字母上面的数字键和右侧小键盘的数字键是不同的！

## 语言注入

为某一段区域的注入其他语言，IDEA 最常见的就是在 JavaScript 的字符串中注入了 HTML/CSS/JavaScript，使得在字符串内也有代码提示可用。
> 此功能常用于 JavaScript 字符串拼接 HTML 代码，当然目前这个需求在 ES6 中由 `模板字符串` 原生实现了。

我们也可以手动注入，例如为 Java 中的字符串注入 SQL 语言，这样在写 SQL 语句就不用跑到 SQL 编辑器那里写完 SQL 语句在粘贴过来了。

## Live Template/Prosfix Template 模板

Live Template 模板就是那种在 Java 中输入 `sout` 就可以生成以下代码的模板功能，而这功能在 IDEA 还可以自定义。

```java
System.out.println($END$);
```

例如吾辈就定义了 `autowired` 用于生成

```java
@Autowired private $BeanClass$ $BeanName$;
$END$
```

或者 `thread`

```java
new Thread(() -> {
    $END$
}).start();
```

此功能使用得当甚至能大量减少重复编码。不过相比之下另外一个代码生成功能吾辈更加喜欢，但 IDEA 在 2018.2 版本之前并不支持自定义，所以功能上来说就显得稍弱一些，当然吾辈也使用插件（Custom Postfix Templates [GitHub](https://github.com/xylo/intellij-postfix-templates#download)）实现了自定义的需求。最新版本 IDEA 原生支持了自定义功能（[IDEA 官方介绍](https://blog.jetbrains.com/idea/2014/03/postfix-completion/)），但实现尚不完善。

此功能可以做到另外一种形式的模板字符串，例如输入 `"str".var` 然后回车会得到

```java
String $variableName$ = "str";$END$
```

或者 `"str".sout`

```java
Sysout.out.println("str");
```

吾辈也自定义一些，例如输入了 `"str".val`，会生成

```java
final String $variableName$ = "str";$END$
```
