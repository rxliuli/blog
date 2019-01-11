---
title: IDEA 使用技巧
date: 2018-07-31
updated: 2018-12-03
tags: IDEA
---

# IDEA 使用技巧

- [IDEA 使用技巧](#idea-使用技巧)
  - [IDEA 全局默认配置](#idea-全局默认配置)
  - [Alt-Enter 自动修复](#alt-enter-自动修复)
  - [代码搜索/跳转/选择](#代码搜索跳转选择)
  - [语言注入](#语言注入)
  - [Live Template/Prosfix Template 模板](#live-templateprosfix-template-模板)

## IDEA 全局默认配置

使用场景：  
使用 IDEA 经常会遇到一种情况，在这个项目自顶了一些设置（**Settings** 而非 **Project Structure**，例如 自定义的 Maven，项目字符编码等等），到了新的项目全部恢复了默认值又要重新设定。

解决方案：  
通过 IDEA 的默认设置（**File > Other Settings > Default Settings**）就可以设定全局的 **Settings**，而不需要在每个项目中重新设定一次。

> 默认设定按吾辈的理解应该是用于设定那些可以使项目级别的设置，例如 **代码检查**，**代码样式** 等。毕竟大部分的设置都是全局的嘛

## Alt-Enter 操作提示

Alter-Enter 大概是 IDEA 最强大快捷键了，放在不同的位置有不同的功能。

- 警告（代码下面有黄色波浪线），会自动帮我们修复警告。
  代码重复，代码冗余（1/0 之类），多余的变量（声明完就立刻返回/声明完最多只使用了一次）
- 错误（代码下面有红色波浪线），一般会提出合适的修复建议。
  代码缺少注解，具体子类有未实现的方法
- 接口名（接口的名字），一般会提示可以生成实现类或者跳转到实现类
- 自动修复变量名的问题（不符合驼峰）
- 普通类名，一般会提示创建测试类，没有 JavaDoc 注释还会提示生成注释
- 字符串里面，会提示使用 [语言注入](#语言注入)
- 跳转到注入语言的编辑面板

## Double Shift 任意搜索

这个功能其实是集成了多个搜索，但有时候真的很好用，集成的功能包括

- 搜索 `Settings`（`CS-A`）：搜索 IDEA 的设置
- 搜索 `class`（`C-N`）：搜索代码里的 class 类
- 搜索 `File`（`CS-N`）：搜索任何文件
- 搜索 `symbol`（`CSA-N`）：搜索符号，主要用于搜索 Spring MVC 路径
- 搜索 `Tool Windows`（`C-Tab`）：搜索工具窗口
- 搜索 `Run configuration`（`SA-F9/F10`）：搜索运行的配置项
- 搜索 `Action`（`Alt-Enter`）：搜索当前位置的代码可执行操作

如果你知道需要搜索的类型，请尽量使用单独的搜索选项，毕竟速度上会有一些优势

## 常用快捷键

> 快捷键想要熟练没有什么好的办法，却是只能多加使用了。如果你还不熟悉 IDEA 的快捷键，可以使用 [Key Promoter X](https://github.com/halirutan/IntelliJ-Key-Promoter-X) 插件来提示你使用快捷键操作。

- 搜索
  - `C-N` ：搜索类
  - `CS-N` ：搜索文件
  - `CSA-N` ：搜索字段名(包含数据库字段)/方法名
  - `SS` ：搜索接口路径，类名，文件名，字段名/方法名
  - `CS-F`：全局搜索代码（该快捷键与 Windows10 的默认输入法冲突，可以修改快捷键，或者换用其他输入法）
- 面板操作
  - `ESC`：返回到编辑器中
  - `C-E` ：列出最近操作的文件历史以及可操作面板列表，然后可以通过输入单词跳转到对应的面板
  - `C-Tab -> *`：列出最近操作的文件历史以及可操作面板，并能通过单个字母导航到对应的操作面板（需要一直按住 `Ctrl`）
  - `A-Top/Bottom/Left/Right` ：左右是切换标签页，上下是切换方法
  - `F12` ：跳转到最后一个使用的面板
  - `CS-F12` ：收起/显示所有面板
  - `C-F12` ：在一个悬浮面板上列出所有字段/方法
- 选择
  - `C-W/CS-W` ：扩大/缩小选择区域范围
  - `CS-[/]`：选择至当前区域的开始/结束
  - `A/SA-J` ：选中/反选相同的单词进行列编辑（一个个的选中）
  - `CSA-J` ：选中多个相同的单词（当前文件全部选中）
- 代码跳转
  - `CA-Left/Right` ：跳转到上一个/下一个浏览的位置
  - `CS-Backspace` ：回退到上一个编辑的位置
  - `C-Top/Bottom/Left/Right`：左右是跳转到上一个/下一个单词，上下是移动屏幕（非移动光标）
  - `C-;` ：屏幕内任意跳转（需要安装 **Ace Jumper** 插件）
  - `Home` ：跳转到行首/编辑器的最左侧
  - `End` ：跳转到行尾
  - `C-Home/End` ：跳转到文件的开始/结尾
  - `C-Page Up/Page Down` ：跳转到当前屏幕的第一行/最后一行
  - `F2/S-F2` ：跳转到下一个/上一个错误/警告的位置
  - `C-Left/C-Right` ：跳转到上一个/下一个单词的位置
  - `C-B` ：跳转到变量/方法的声明处
  - `CS-B` ：跳转到变量/方法的具体实现处，如果不止一处就会列出下拉框
    > 注：这里吾辈修改了快捷键，毕竟 `CA-B` 单手按起来还真有点麻烦
- 小键盘专用
  - `CS-Number`
    - `CS-8/2/4/6` ：相当于 `C-Top/Bottom/Left/Right`
    - `CS-7/1/9/3` ：相当于 `C-Home/End/Page Up/Page Down`
    - `CS-0` ：相当于 `C-C`
    - `CS-.` ：相当于 `C-Delete`
  - `SA-Number`
    - `SA-8/2/4/6` ：相当于 `A-Top/Bottom/Left/Right`
    - `SA-7` ：相当于 `A-Home`
    - `SA-0` ：相当于 `A-Insert`

> 注：在 IDEA 看来左侧字母上面的数字键和右侧小键盘的数字键是不同的！

## 常用插件

- [JRebel for IntelliJ](https://plugins.jetbrains.com/plugin/4441-jrebel-for-intellij)：做 Java Web 开发时真心免不了的 Plugin，能够有效解决 Web 容器（例如 Apache Tomcat）启动速度慢的问题（因为几乎所有的资源都能够热加载，热部署）
- [LiveEdit](https://plugins.jetbrains.com/plugin/7007-liveedit)：提供了 HTML/CSS/JavaScript 的实时预览和刷新功能
- [MybatisX](https://plugins.jetbrains.com/plugin/10119-mybatisx)：Mybatis 的一个辅助开发插件，能够比较愉快的使用 Mybatis 框架了
- [Alibaba Java Coding Guidelines](https://plugins.jetbrains.com/plugin/10046-alibaba-java-coding-guidelines)：Alibaba 出品的一个 Java 规范检查插件，能够规避一些不好的代码
- [Translation](https://plugins.jetbrains.com/plugin/8579-translation)：目前使用感觉最好的翻译插件，能够提供比较长的内容进行翻译（某些翻译插件只能翻译很短的内容）
- [String Manipulation](https://plugins.jetbrains.com/plugin/2162-string-manipulation)：字符串操作工具，可以方便对变量名或其他字符串修改为其他风格，例如将变量从 **驼峰命名**（Java 标准命名） 修改为 **下划线命名**（SQL 标准命名）或者 **中缀线命名**（HTML/CSS 标准命名）。
  > 其实这么多命名规范真心坑。。。
- [Key Promoter X](https://plugins.jetbrains.com/plugin/9792-key-promoter-x)：使用鼠标操作时提示对应的快捷键
- [Custom Postfix Templates](https://plugins.jetbrains.com/plugin/9862-custom-postfix-templates)：提供自定义的后缀模板
- [Markdown Navigator](https://plugins.jetbrains.com/plugin/7896-markdown-navigator)：IDEA 平台的 Markdown 写作插件，比自带的 Markdown Support 要好很多，主要在需要写的 Markdown 内容中含有代码时比较方便
- [Maven Helper](https://plugins.jetbrains.com/plugin/7179-maven-helper)：一个 Apache Maven 的辅助操作插件
- [CodeGlance](https://plugins.jetbrains.com/plugin/7275-codeglance)：在编辑器右侧显示一块代码缩略图，主要为了方便使用滑块进行上下滑动
- [Grep Console](https://plugins.jetbrains.com/plugin/7125-grep-console)：自定义控制台的输出颜色
- [.ignore](https://plugins.jetbrains.com/plugin/7495--ignore)：在使用版本控制时，快速忽略某些文件/文件夹，目前支持广泛
- [CMD support](https://plugins.jetbrains.com/plugin/5834-cmd-support)：Cmd 支持，主要是方便在 IDEA 中直接运行 bat 脚本
- [NodeJS](https://plugins.jetbrains.com/plugin/6098-nodejs)：集成了 NodeJS，可以直接在 IDEA 中运行 NodeJS
- [Vue.js](https://plugins.jetbrains.com/plugin/9442-vue-js)：集成 Vue.js 框架
- [ESLint](https://plugins.jetbrains.com/plugin/7494-eslint)：前端代码规范
- [Prettier](https://plugins.jetbrains.com/plugin/10456-prettier)：根据上面 ESLint 的规范自动格式化代码
- [Properties to YAML Converter](https://plugins.jetbrains.com/plugin/8000-properties-to-yaml-converter)：将 `Properties` 文件快速转换为 `YAML` 格式的配置文件
- [WakaTime](https://plugins.jetbrains.com/plugin/7425-wakatime)：统计使用的编程语言，不同 IDE 的记录

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
