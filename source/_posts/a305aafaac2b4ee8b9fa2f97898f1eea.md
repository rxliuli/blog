---
layout: post
title: VSCode 与 WebStorm 横向对比
abbrlink: a305aafaac2b4ee8b9fa2f97898f1eea
tags:
  - webstorm
  - vscode
  - 工具
  - wiki
categories:
  - 其他
  - VSCode
date: 1580652938013
updated: 1673338679886
---

## 前言

> 不能认清自己，怎能看清别人？

最近很长一段时间，VSCode 似乎成为了前端口中的标准开发编辑器，前端圈到处都在推荐 VSCode，劝说其他人放弃 Sublime, WebStorm, Atom 之流，仿佛真的是**信巨硬，得永生**一般。而吾辈作为一个长时间使用 JetBrains 系 IDE 的全沾开发者，这里就来对比一下 WebStorm 与后起之秀 VSCode 之前的异同点吧

## 比较

### 插件生态

VSCode 的生态无疑非常好，基于 Web 技术构建的编辑器同样可以使用 Web 技术开发插件，而 Web 开发人员的数量也确实非常庞大。且由于其轻量跨平台的特性，受到很多开发者的喜爱，将之作为主力文件编辑器或者将其打造成 IDE 使用。它们的插件市场首页分别如下

VSCode
![VSCode 插件市场](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20190830232931.png)

WebStorm
![WebStorm 插件市场](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20190830232701.png)

WebStorm 官方给出的插件总数是 1607，而 VSCode 吾辈并未找到插件的总数量，但显而易见，VSCode 的插件数量应该远远高于这个数字。而且你可以看到 WebStorm 下载量第一的插件仅仅只下载过 **5,558,762** 次，而 VSCode 的热门插件的下载数量是以 M 来计算的。我们来搜索一下前端流行打包工具 `webpack`，对比一下结果。

VSCode
![webpack for vscode](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20190830233610.png)

WebStorm
![webpack for WebStorm](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20190830233724.png)

是的，VSCode 搜索到了 16 个插件，而 WebStorm 的搜索结果是。。。**0**？不了解 WebStorm 的小伙伴可能会有疑问，难道 WebStorm 不支持 webpack 嘛？那要它何用，还是拉出去砍了吧！
泥萌先别急着掀桌子，个中缘由且听吾辈细细说来。之所以出现这种情况，主要是因为二者的策略不同造成的。WebStorm 的目标是让用户拥有开箱即用的生产力工具，下载安装完成后就可以立即进行项目开发了，所以它将很多功能内置了 IDE 之中，或者是由官方开发插件出来，然后直接集成到 IDE 中，给个人开发者开发插件的机会不多。
而 VSCode 由于官方的开发团队没那么强大，而且又是免费的开源产品，所以理所当然只能发动广大人民群众的力量了，所以有很多插件就只能交给第三方开发者进行开发和维护。而这点也造成了安装完 VSCode 之后并不能立即使用，还需要下载插件、进行配置等一系列操作。
以上两种模式的孰优孰劣早有人分析过，这里吾辈只说自己的使用体验。WebStorm 的开箱即用做的确实比 VSCode 更好，但问题在于如果官方不支持的话就会很难受，因为其实并没有太多人同时精通前端和 Java（是的，必须使用 Java 开发插件）。这也是吾辈目前仍然使用 VSCode 作为主力文本编辑器编辑配置文件，以及使用它写 Markdown 文章的原因，包括这篇文章亦是通过 VSCode 写出来的。
![Markdown 写作截图](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20190830235425.png)

> 附: 插件开放让第三方实现与官方自己实现并集成的优劣之分参考知乎的一篇文章: [Visual Studio Code 有哪些工程方面的亮点](https://zhuanlan.zhihu.com/p/35303567)。
> 通过插件来扩展功能的做法已经是司空见惯了，但如何保证插件和原生功能一样优秀呢？历史告诉我们：不能保证。大家可以参考 Eclipse，插件模型可以说是做得非常彻底了，功能层面也是无所不能，但存在几个烦人的问题：不稳定、难用、慢，所以不少用户转投 IntelliJ 的怀抱。可谓成也插件，败也插件。问题的本质在于信息不对称，它导致不同团队写出来的代码，无论是思路还是质量，都不一致。最终，用户得到了一个又乱又卡的产品。所以要让插件在稳定性、速度和体验的层面都做到和原生功能统一，只能是一个美好的愿望。
> 来看看其他 IDE 是怎么做的，Visual Studio 自己搞定所有功能，并且做到优秀，让别人无事可做，这也成就了其 “宇宙第一 IDE” 的美名；IntelliJ 与之相仿，开箱即用，插件可有可无。这么看起来，自己搞定所有的事情是个好办法，但大家是否知道，Visual Studio 背后有上千人的工程团队，显然，这不是 VS Code 这二十几号人能搞定的。他们选择了让大家来做插件，那怎么解决 Eclipse 所遇到的问题呢？
> 这里分享一个小知识 ——Eclipse 核心部分的开发者就是早期的 VS Code 团队。嗯，所以他们没有两次踏入同一条河流。与 Eclipse 不同，VS Code 选择了把插件关进盒子里。
> 这样做首先解决的问题就是稳定性，这个问题对于 VS Code 来说尤为重要。都知道 VS Code 基于 Electron，实质上是个 node.js 环境，单线程，任何代码崩了都是灾难性后果。所以 VS Code 干脆不信任任何人，把插件们放到单独的进程里，任你折腾，主程序妥妥的。
> VS Code 团队的这一决策不是没有原因的，正如前面提到的，团队里很多人其实是 Eclipse 的旧部，自然对 Eclipse 的插件模型有深入的思考。Eclipse 的设计目标之一就是把组件化推向极致，所以很多核心功能都是用插件的形式来实现的。遗憾的是，Eclipse 的插件运行在主进程中，任何插件性能不佳或者不稳定，都直接影响到 Eclipse，最终结果是大家抱怨 Eclipse 臃肿、慢、不稳定。VS Code 基于进程做到了物理级别的隔离，成功解决了该问题。实际上进程级别的隔离也带出了另一个话题，那就是界面与业务逻辑的隔离。

### 智能提示

作为写代码的工具，代码提示已经司空见惯了。但是，就算同样是代码提示，有的代码提示只是简单的代码片段（`snippets`），而有的却是基于代码语法树分析进行的，甚至于编辑器会学习使用者的习惯，将最常用的提示放在最前面。WebStorm 从始至终一直都是第三种，而 VSCode 最近官方才开发了基于 AI 自动学习的智能提示插件 [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)。

VSCode
![VSCode 智能提示](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20190831030339.gif)

WebStorm
![WebStorm 智能提示](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20190831030506.gif)

***

更新，大型前端 monorepo 项目中，vscode 的表现几乎不能看。相比于 webstorm 无法自动添加 import 导入语句，vscode 则完全不可用，必须手写且 ts server 时有卡死，导航以及重构也存在更多的问题。

### 自动修复

我们在日常开发中经常会遇到一些低级问题，而编辑器其实是有可能帮我们自动修复的。这里便对吾辈了解的一些问题进行对比，问题详细信息请参考文章 [JavaScript 规范整理](/p/69eedef48bf54c3ca692b43a115a118f)

> 注: VSCode 没有原生的自动修复功能，必须使用插件才行。

| 分类   | 对比项                             | VSCode | WebStorm |
| ---- | ------------------------------- | ------ | -------- |
| 命名规范 |                                 |        |          |
|      | 不要使用拼音命名                        | 支持     | 支持       |
|      | 函数中的变量                          | 支持     | 支持       |
|      | 内部变量                            | 不支持    | 不支持      |
|      | 不要使用无意义的前缀命名                    | 支持     | 支持       |
| ES6  |                                 |        |          |
|      | 优先使用 const/let                  | 支持     | 支持       |
|      | 使用新的函数声明方式                      | 支持     | 支持       |
|      | 优先使用箭头函数而非 function             | 不支持    | 支持       |
|      | 不要使用 if 判断再赋予默认值                | 不支持    | 不支持      |
|      | 优先使用 Map 做键值对映射而非传统的对象          | 不支持    | 不支持      |
|      | 优先使用模板字符串拼接多个字符串变量              | 不支持    | 支持       |
|      | 当独立参数超过 3 个时使用对象参数并解构           | 不支持    | 支持       |
|      | 不要写多余的 await                    | 支持     | 支持       |
|      | 不要使用 == 进行比较                    | 支持     | 支持       |
|      | 使用计算属性名替代使用方括号表示法赋值             | 不支持    | 不支持      |
| 逻辑代码 |                                 |        |          |
|      | 不要判断一个 Boolean 值并以此返回 Boolean 值 | 支持     | 支持       |
|      | 不要使用多余的变量                       | 支持     | 支持       |
|      | 不要使用嵌套 if                       | 不支持    | 支持       |
|      | 不要先声明空对象然后一个个追加属性               | 不支持    | 不支持      |
|      | 不要使用无意义的函数包裹                    | 不支持    | 不支持      |
|      | 不要使用三元运算符进行复杂的计算                | 不支持    | 支持       |
|      | 如果变量有所关联则使用对象而非多个单独的变量          | 不支持    | 不支持      |
|      | 应该尽量解决编辑器警告                     | 不支持    | 不支持      |
|      | 使用类型定义参数对象                      | 不支持    | 不支持      |
|      | 尽量扁平化代码                         | 支持     | 支持       |
|      | 自执行函数前面必须加分号                    | 不支持    | 不支持      |

下面是一张 WebStorm 官方使用自动修复的动图
![WebStorm 自动修复](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20190831030641.gif)

### 重构

说起重构的话，VSCode 可以简单的说是做的**太少**，而 WebStorm 则是相反做的**太多**，下面继续以表格的形式进行对比。

> WebStorm 较新版本已经修复了 2018.02 重命名会自动索引字符串的问题（变成可选项了）。

| 分类  | 操作       | VSCode | WebStorm |
| --- | -------- | ------ | -------- |
| 重命名 |          |        |          |
|     | 变量重名名    | 支持     | 支持       |
|     | 复杂变量重命名  | 不支持    | 支持       |
|     | 全局重命名    | 支持     | 支持       |
|     | 正则重命名    | 存在 bug | 支持       |
|     | 文件重命名    | 不支持    | 支持       |
| 提取  |          |        |          |
|     | 提取表达式为变量 | 支持     | 支持       |
|     | 提取代码段为函数 | 支持     | 支持       |
|     | 提取函数到新文件 | 支持     | 支持       |

WebStorm 重命名文件
![WebStorm 重命名文件](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20190831031020.gif)

### Git/GitHub 集成

VSCode 的 Git 支持一直不太行，就算加了插件 [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) 也无法比得上 WebStorm。

| 分类     | 操作            | VSCode | WebStorm |
| ------ | ------------- | ------ | -------- |
| Git    |               |        |          |
|        | commit 提交     | 难用     | 支持       |
|        | push 推送       | 支持     | 支持       |
|        | pull 拉取       | 支持     | 支持       |
|        | merge 合并      | 支持     | 支持       |
|        | 历史记录          | 难用     | 支持       |
|        | reset 回退      | 支持     | 支持       |
|        | revert 回退     | 难用     | 支持       |
|        | stash 暂存      | 支持     | 支持       |
|        | branch 分支操作   | 支持     | 支持       |
| GitHub |               |        |          |
|        | 分享到 GitHub    | 不支持    | 支持       |
|        | 从 GitHub 选择拉取 | 不支持    | 支持       |
|        | 分享到 Gist      | 支持     | 支持       |

放两张图对比一下

VSCode GitLens
![GitLens](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20190831022549.png)

WebStorm
![WebStorm Git](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20190831022643.png)

> 新版的 GitLens 好用很多，不仅仅追求功能丰富，更对开发者体验非常关心。

### 前端支持

前面提过，VSCode 生态很好，基本上很多语言/框架都有支持，而且官方也有一些非常优秀的插件。但是，有一些地方很重要，VSCode 对于 HTML/CSS/JavaScript 这些 Web 基本元素的支持相比于 WebStorm 确实可以说的上是糟糕。

先来测试前端三剑客: `HTML/CSS/JavaScript`。

VSCode
![VSCode](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20190831004550.gif)

WebStorm
![WebStorm](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20190831003352.gif)

可以看到，对于 HTML/CSS 之间的代码提示、跳转这些基本功能，VSCode 其实并没有做好。现代前端说是不再写 HTML 了，但实际上终究还是要写（即便是 JSX 还是要符合写 HTML 的直觉的），VSCode 代码提示在这里明显不太够看。还有一点也很有趣，VSCode 在打完 `document.querySelector('#hello')` 之后彻底没了动静，而 WebStorm 在 `style` 输入完成之后，立刻就有了各种 CSS 属性提示了。

> 附: VSCode 中通过输入 `h1.hello#hello` Tab 之后就得到代码是一种前端 HTML 代码编写方式，被称为 [Zen Coding](https://www.qianduan.net/zen-coding-a-new-way-to-write-html-code/)。但实际上，这种编写方式在代码提示方面存在劣势，所以使用 WebStorm 时并未演示。
> 附: VSCode 引用文件路径提示需要插件 [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)

对于库的开发者而言最难受的地方是 VSCode 实质上依赖于 TypeScript 才能做到代码提示，如果你也像吾辈是一位 JavaScript SDK 的开发者，那么也会遇到这件令人郁闷的事情: 如果想要使用你的 JavaScript SDK 的 VSCode 用户有正常的代码提示的话，你就必须接触 TypeScript。要么使用 TypeScript 重构整个 SDK，要么写 *.d.ts* 专门为 VSCode 维护一份注释文档，详情可以参考文章 [JavaScript => TypeScript 迁移体验](/p/03ee7047ae3c4203b0c4c4ebfd6d7bd9)。

### 历史记录

不知你是否曾遇到过，正在编辑着一个文件，突然断电，或者是因为其他什么原因，导致文件内容被清空了。或者是误删了代码之后之前的代码还没提交，又不能撤回那么多次，导致代码重写的经历呢？吾辈就曾经经历过，所以对本地历史记录这个功能相当重视，然而很遗憾，VSCode 依旧需要第三方插件 [Local History](https://marketplace.visualstudio.com/items?itemName=xyz.local-history) 才能支持。

VSCode Local History
![VSCode Local History](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20190831024208.png)

WebStorm
![WebStorm](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20190831024420.png)

两者相比主要有以下不同

| 对比项         | VSCode | WebStorm          |
| ----------- | ------ | ----------------- |
| 原始文件是否为人类可读 | 是      | 否（XML 不列入人类可读格式中） |
| 是否可以添加标签    | 否      | 是                 |
| 是否可以对比      | 是      | 是                 |
| 是否可以合并      | 否      | 是                 |
| 是否支持目录历史    | 否      | 是                 |

> WebStorm 的支持目录的历史记录非常强大，相当于实时保存和提交的 git

### 主题配色

两者都支持黑暗主题，而且都是默认设置，也同样支持使用插件定制界面。下面是两者的截图

VSCode
![VSCode 主界面](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20190830231558.png)

WebStorm
![WebStorm 主界面](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20190830231815.png)

事实上，上面两者都使用了主题。VSCode 是 Monokai，WebStorm 是 Material。但其实 WebStorm 的 [Material 主题](https://plugins.jetbrains.com/plugin/8006) 还是存在一些 Bug 的，例如有些地方图标莫名的错位之类，VSCode 目前吾辈还未曾遇到过这类问题。

### 使用性能

WebStorm 确实很吃内存，尤其是项目刚刚打开的时候，索引会疯狂地吃 CPU/内存/硬盘，如果电脑性能不行的话这个过程所需时间可能泡面都够了。但基于 Chrome 内核的 VSCode 在使用各种插件打造成前端 IDE 之后吃的内存也并不少。吾辈打开了项目 [rx-util](https://github.com/rxliuli/rx-util)，可以看到 VSCode 每个插件确实都放在了单独的进程里（Chrome 系的习惯 #笑），相比之下 WebStorm 只有两个进程，其中一个还是启动的 nodejs，整体对比下来其实相差不大。

![任务管理器](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20190831000118.png)

> 不得不承认的是，WebStorm 吃的性能终究还是要比 VSCode 多。但是，能用钱堆硬件解决的问题，能算问题么？
> ![1613744562293](/resources/6996b9a2e3f54a919287c7ea7d0027f7.png)

### 工具集成

JetBrains IDE 深度集成工具链，倾向于一切都以可视化界面点击/快捷键完成操作。而 VSCode 则有所不同，它有很多功能需要使用命令行/配置文件的形式完成。吾辈最开始使用 VSCode 时它甚至还没有配置界面，也只能使用 `launch.json` 启动 debugger（最新版似乎已经不是了），真是被吓到了。
在调试、运行支持的工具时，一般 VSCode 仍然需要使用命令行工具，或者在需要调试时编写 `launch.json` 配置脚本。但 WebStorm 则更加深度集成的工具链，倾向于一切都以可视化界面点击/快捷键完成操作。拿运行和调试代码为例，统一支持可视化的形式运行或调试（自动生成 ide 配置，并支持在必要的时候调整），目前支持 npm/gulp/浏览器 js/jest/nodejs/electron/typescript/git。

至于有人说一个命令的事情为什么要 ide 集成？

- 安装依赖的时候停止索引，避免影响性能
- 简单启动调试（至今吾辈仍然没有彻底搞懂 vscode 的调试，为什么不能点一下就启动调试？至于是浏览器、nodejs、electron 可能存在不同的差异，让 ide 去屏蔽这一层不就好了，反正 ide 能识别出来项目使用的技术栈（至少是 ide 支持的技术栈））
- 显示单独的命令视图
- 快速查找/运行命令

> 有可能通过插件支持，但使用 VSCode 的人似乎更倾向于使用命令行（懒得找）。

### 远程/协作编辑

VSCode 通过 [live-share](https://github.com/MicrosoftDocs/live-share) 实现了远程开发，但 WebStorm 也通过官方插件 [Code With Me](https://www.jetbrains.com/code-with-me/) 和 [Projector](https://lp.jetbrains.com/projector/) 进行了支持。

| 比较项    | VSCode | WebStorm |
| ------ | ------ | -------- |
| 协同编辑   | 是      | 是        |
| WSL 支持 | 是      | 是        |
| 远程项目   | 是      | 是        |
| 画板支持   | 是      | 否        |
| 聊天     | 是      | 是        |
| 语音     | 是      | 是        |
| 免费     | 是      | IDEA 免费  |

> 就吾辈实际使用而言，感觉这是个噱头功能，和许多云 IDE 差不多。

### 东家

VSCode 背后站着微软，俗成 **M$**，开发了宇宙最强 IDE Visual Studio。而 WebStorm 则是基于 JetBrains 平台专门为前端进行特殊处理优化的 IDE，背后则是业界最智能的 IDE 的开发公司 JetBrains（捷克公司）。两者在 IDE/编辑的开发上都相当有经验，然而，有一点本质的不同：IDE 对于 JetBrains 而言几乎是全部，而 VSCode 对于 M$ 则只是开发的一部分 -- 编辑器。

`VSCode => VSCode Remote => GitHub => GitHub Actions => Azure`，从 MS 的一系列变化来看，这对开发者是真的相当上心，从本地开发、远程协作、版本控制、自动化流程控制 CI/CD 到部署到云端，完全是一站式的体验。相比于国内的云服务商，MS 显然更加开放、更加为开发者着想。
而 JetBrains，虽然现在也有了编程语言 `Kotlin`、项目管理工具 `Space`（包含 CI/CD 工具 `TeamCity`），但本质上在其领域内，除了 IDE，其他的东西都没能形成特别大的优势（Kotlin 只能用于开发 Android 平台，而 Web 技术甚至能开发全端；`TeamCity` 虽然很漂亮，但似乎人们更喜欢开源的 `Jenkins`）。
未来 VSCode 一统天下似乎是必然之势，但目前而言，其尚且年幼，唯有 WebStorm 正值壮年。

> 附：例如某只企鹅，开发的大多数云服务都是私有服务，使用上比开源的还难用而且还强制绑定到自家云服务上，使人不得不用全家桶（问题是体验又烂，文档死难找）
> 附: 居然连 “文档和 Demo 有可能过期，但代码一定是最新的” 这种话都能说出来，与 MS 花大力气创造开源的 `VSCode` 简直是天壤之别。
> 附: 没有对比就没有伤害！

## 总结

其实在 Atom/VSCode 出现之前，WebStorm 因为在这个领域没有对手而发展缓慢，它们的出现使得 WebStorm 有了压力，良性竞争，这当然是好事。即便如此，就目前而言，VSCode 作为一个 IDE 来讲仍然比不上 JetBrains 全家桶系列。
说了上面这么多，总的来说: 如果你需要一个文本编辑器，那么推荐你用 VSCode，因为它既漂亮又生态丰富，想写点什么很方便。但是，如果你需要真正开发项目，则 WebStorm 更加合适，完全开箱即用的体验，不需要安装/配置任何插件就能立刻开始项目，强大的编辑器可以让你写代码更舒服一点。（其实是没钱就用免费的 VSCode，有钱就上 WebStorm 啦！）

> ref link: [Why I Switched From Visual Studio Code To JetBrains WebStorm](https://dev.to/mokkapps/why-i-switched-from-visual-studio-code-to-jetbrains-webstorm-939)
> 吾辈个人非常同意作者及相关评论的观点：为 WebStorm 付费能减少折腾 VSCode 的时间，VSCode 的真正优势是启动时间，使用内存和免费。
