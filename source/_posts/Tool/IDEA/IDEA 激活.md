---
title: IDEA 激活
date: 2018-08-03 01:39:21
tags: IDEA
---
# IDEA 激活

## IDEA 2018.1+ 激活方式

1. 下载破解 Jar：[JetbrainsCrack](https://github.com/rxliuli/rxliuli.github.io/blob/bd79a5d88b86ea8dffe86c9fa2b61f96257907fd/_posts/Tool/IDEA/IDEA%20%E6%BF%80%E6%B4%BB/JetbrainsCrack.jar)

    然后放到一个合适的位置（你不会随意删除的位置，推荐直接放到 IDEA 的安装目录下）
2. 修改 IDEA 的一个配置文件（位置在 `${idea.home}/bin/idea64.exe.vmoptions`），在最后一行添加：`-javaagent:这里是你上面下载的那个 Jar 的绝对路径`

    然后在激活对话框中选 **Activation code** 随意输入然后点击 OK 即可。

3. Pass：其实下面还有一步的，不过做不做都可以，运行上面的就已经完成激活了，不过激活信息显示的不是你的名字。当然，我们可以去变成自己的名字，如果我们在 **Activation code** 里填写合适的 `json` 信息的话。
    1. 首先运行刚才下载的 Jar，然后会得到一个激活信息的 `json` 字符串，大致是下面这样：
        ```json
        {"licenseId":"ThisCrackLicenseId",
        "licenseeName":"Rover12421",
        "assigneeName":"Rover12421",
        "assigneeEmail":"rover12421@163.com",
        "licenseRestriction":"By Rover12421 Crack, Only Test! Please support genuine!!!",
        "checkConcurrentUse":false,
        "products":[
        {"code":"II","paidUpTo":"2099-12-31"},
        {"code":"DM","paidUpTo":"2099-12-31"},
        {"code":"AC","paidUpTo":"2099-12-31"},
        {"code":"RS0","paidUpTo":"2099-12-31"},
        {"code":"WS","paidUpTo":"2099-12-31"},
        {"code":"DPN","paidUpTo":"2099-12-31"},
        {"code":"RC","paidUpTo":"2099-12-31"},
        {"code":"PS","paidUpTo":"2099-12-31"},
        {"code":"DC","paidUpTo":"2099-12-31"},
        {"code":"RM","paidUpTo":"2099-12-31"},
        {"code":"CL","paidUpTo":"2099-12-31"},
        {"code":"PC","paidUpTo":"2099-12-31"},
        {"code":"DB","paidUpTo":"2099-12-31"},
        {"code":"GO","paidUpTo":"2099-12-31"},
        {"code":"RD","paidUpTo":"2099-12-31"}
        ],
        "hash":"2911276/0",
        "gracePeriodDays":7,
        "autoProlongated":false}
        ```
    2. 修改其中的 `licenseeName`, `assigneeName`, `assigneeEmail` 为你的名字和邮箱，然后将修改后的 `json` 字符串丢到 **Activation code** 里面就好啦

## 使用本地注册码（不需要在线）的方式激活。

> 注: 此方法对 IDEA2018.2 之后的版本无效

1. 修改 **hosts** 文件，Windows 系统上的位置是 **C:\Windows\System32\drivers\etc\hosts**，将之复制到其他位置并在文件的最末尾添加一句话。  
    ```hosts
    0.0.0.0 account.jetbrains.com
    ```
    然后将 **hosts** 文件复制到原本的位置覆盖一下就好。  
    > 注：该操作是必要的，因为不修改 **hosts** 文件的话获得的激活码是会直接提示非法的！  

2. 在 <http://idea.iteblog.com/> 获得到一个注册码（用户名和 PC 用户名保持一致），将注册码用于激活 IDEA 即可。

## IDEA 注册码

> 注: 此方法随时可能失效
- 激活服务器：<http://idea.imsxm.com/>，<http://idea.uri.ci>
- 如果无法激活，请前往 [网站](http://idea.imsxm.com/) 查找方法。如有能力，请支持正版！

使用方法

- 在 idea 首次使用时会要求输入注册码，选择第三个选项卡，即 __License Server__,然后填入上面的激活服务器即可。
- 进入 idea 后，选择 Help->Register,就会弹出一个输入注册码的窗口了，以上面那种方法输入就行啦。

