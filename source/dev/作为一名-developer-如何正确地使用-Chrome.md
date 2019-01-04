---
layout: post
title: 作为一名 developer 如何正确地使用 Chrome
date: 2018-12-24 14:08:52
tags: [Chrome, Tool, 教程]
---

# 作为一名 developer 如何正确地使用 Chrome

## 场景

现如今，[Google Chrome](https://www.google.com/chrome/) 是全世界最流行的浏览器，具体有多流行，可以看看 [浏览器市场份额统计](https://www.netmarketshare.com/browser-market-share.aspx)。然而，有许多人，只是简单的安装了 Chrome，然后直接使用，却并未想过如何才能更好的使用它。

## DevTool

Chrome 的开发者工具可以说是目前最好的了，然而除了简单的查看 `Network/Element` 之外，你可还使用过其他的功能？下面让我们一起来探讨一下 DevTool 的 **奇淫技巧** 吧！

### Network

1. `Copy => Copy as fetch`  
   以 `fetch` 方式复制这个请求，如果你对 `fetch` 还不了解，可以去 [MDN: 使用 Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch) 上查看它，并尝试使用它。这是一个浏览器原生的接口，用于进行 HTTP 操作。相比于 `XMLHttpRequest`，`fetch` 通常被称为下一代的 Ajax 技术。  
   这也正是吾辈将之单独列出的重要原因，因为它是纯 JavaScript 的，所以我们可以直接在浏览器中对其进行测试/修改/执行，这点对于 `user.js` 和 `nodejs 爬虫` 尤其重要。

   ![Copy => Copy as fetch](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190104212920.png)

2. Network 设置

   - `Disable Cache`：禁用网络缓存，开发阶段必备。如果你不想在开发时使用 `CS-R` 进行硬性重新加载，那最好禁用掉它，避免修改的代码没有及时生效。
   - `Preserve log`：保留日志。一般而言，当你刷新页面后，`Network` 将被清空。然而有时候，我们想知道代码修改前后请求发生了哪些变化（修改之前请求一切正常，修改之后就 GG 了），这是便需要使用该选项保留所有的网络请求，方便对比刷新前后请求的变化。
   - `Group by frame`：根据 frame 对请求进行分组。常见于 Web 后台开发，很多后台项目都使用 frame 实现了标签页的功能，所以按照 frame 进行分组会方便进行查看一点。

   ![Network 设置](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190104214338.png)

### Element

1. `Copy => Copy selector`  
   复制 DOM 元素的选择器，该选择器实际上是供 [Selectors API](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Locating_DOM_elements_using_selectors) 使用（`querySelector/querySelectorAll`），但 jquery 的选择器应该兼容它。我们复制完选择器后就可以使用 `Selectors API` 或 `jquery` 之类的选择器去获取到元素，然后对之进行操作。这对 `user.js`/`nodejs 爬虫`/`快速获取元素` 有着重要的意义。

   ![Copy => Copy selector](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190104220838.png)

2. `Break on`  
   在开发过程中，你是否遇到过这样的问题：“某个元素改变了，但始终不知道是那里的代码改变的”。这时候，DOM 断点就派上用场了，监听某个元素，并根据条件触发并暂停当前 JavaScript 进入 Debug 模式。

   - `subtree modification`：当子节点发生改变时触发
   - `attribute modification`：当节点属性发生改变时触发
   - `node removal`：当节点移除时触发

   ![Break on](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190104221816.png)

## 使用插件

自从 Firefox59 以来，随着大量旧体系的插件大量失效，Firefox 的插件库已经不像以往了。现在，Chrome 的插件库是这个星球上最庞大的浏览器插件库了。如果你还没有使用过插件，那恐怕只能使用 Chrome 的一部分能力罢了。

### Tampermonkey

> [Chrome Webstore](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)

非常强大的一个插件，如果真要展开说明，恐怕又要写一篇博客了。可以将用户自定义的 js 代码 **注入** 到网页中，而这，其实就代表着，任何只要会 JavaScript 的人，都可以在自己浏览器上任意修改网站。

那么，说的好像很厉害的样子，具体能做些什么呢？下面列出吾辈常用的 user.js 脚本

- [為什麼你們就是不能加個空格呢？](https://greasyfork.org/scripts/2185)：网站本身不加空格吾辈帮它加咯
- [Google Hit Hider by Domain](https://greasyfork.org/scripts/1682)：Google 搜索结果过滤域名
- [网页限制解除](https://greasyfork.org/scripts/41075)：解除网页不能复制/粘贴/右键的问题
- [Ci-Aria2 百度云盘增强版](https://greasyfork.org/scripts/40496)：提取百度网盘下载直链
- [网盘自动填写密码](https://greasyfork.org/scripts/29762)：自动填写百度网盘提取密码
- [Booru Downloader + Viewer](https://greasyfork.org/scripts/34175)：图站抓图之用

哦，如果你很懒，也可以先去 [Greasy Fork](https://greasyfork.org) 搜索一下是否有你需要的 user.js 脚本。有的话可以直接安装。

> Greasy Fork 上的脚本全部都是开源的，如果你不信任其他开发者，可以随意对脚本进行检查。
