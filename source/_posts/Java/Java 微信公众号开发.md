---
title: Java 微信公众号开发
tags:
  - Java
abbrlink: 61fefd61
date: 2018-09-12 00:00:00
updated: 2018-09-17 00:00:00
---

# Java 微信公众号开发

- [Java 微信公众号开发](#java-微信公众号开发)
  - [场景](#场景)
  - [注册微信公众号](#注册微信公众号)
  - [基本配置](#基本配置)
  - [使用测试账号](#使用测试账号)
  - [服务端编码](#服务端编码)
    - [初始化项目](#初始化项目)
    - [内网穿透](#内网穿透)
    - [微信服务器认证](#微信服务器认证)
    - [消息处理](#消息处理)
    - [创建菜单](#创建菜单)

## 场景

公司需要做一个微信的公众号，以前没有玩过结果踩了一堆坑，也是无奈了，便在这里记录一下

## 注册微信公众号

首先在 [微信公众平台](https://mp.weixin.qq.com/) 注册一个账号，这里选择了 _订阅号_，填写一堆乱七八糟的信息后就得到了一个微信公众号（订阅号）了。之后登录的话却是要进行扫码操作（反人类操作）。

## 基本配置

在【开发 > 基本配置】中设定好相关的信息，主要有

- 开发者 ID(AppID)：自动生成
- 开发者密码(AppSecret)：修改完之后记录下来，一会还要用到
- IP 白名单：可以公网访问的服务器 IP 地址（没有也行，后面会说到 **内网穿透**）
- 服务器地址(URL)：用于给微信校验的服务器地址，没有公网服务器也行
- 令牌(Token)：自定义，随机字符串即可，可以在 [LastPass](https://www.lastpass.com/zh/password-generator) 生成一个
- 消息加解密密钥(EncodingAESKey)：点击随机生成即可
- 消息加解密方式：目前选择明文模式

> 配置服务器地址时会报错，先不管了就行，后面会再回来配置的。

## 使用测试账号

有了自己的微信公众号当然很好，但不可能每次都直接修改真正的公众号吧，修改挂了怎么办？所以就有了测试公众号，而且测试公众号的权限是要高于普通的未认证订阅号的。

在【开发 > 公众平台测试帐号 > 公众平台测试帐号】中申请一个测试账号，如 [基本配置](#基本配置) 所述中配置一下。

> 安全域名设置：如果你有的自己的域名和服务器的话就配置，否则就先不管。

## 服务端编码

### 初始化项目

为了简化配置这里使用 SpringBoot Web 项目作为例子（注意勾上 web 模块依赖）

### 内网穿透

使用内网穿透工具 serveo 实现将本地内网服务映射到外网的 80 端口上

> 下面的命令要求系统已经安装了 SSH 客户端，Linux 已经默认安装了，如果是 Windows 可以使用 Cmder 或 Git For Windows 之类的。

```sh
ssh -o ServerAliveInterval=60 -R rx:80:localhost:8080 serveo.net
```

> 具体可以参考 [官网](https://serveo.net/) 或 [使用 Serveo 进行内网穿透](https://blog.rxliuli.com/p/5ad7fa84/)

现在，访问 <https://rx.serveo.net/>，是不是已经可以啦（出现的 `Whitelabel Error Page` 不用管，因为我们本来也没有处理 `/` 路径的访问）

### 微信服务器认证

引入额外的依赖（SpringBoot Web 项目默认引入 `spring-boot-starter`，`spring-boot-starter-web` 和 `spring-boot-starter-test` 模块）

```xml
<!--微信的公众号依赖-->
<dependency>
    <groupId>com.github.binarywang</groupId>
    <artifactId>weixin-java-mp</artifactId>
    <version>3.1.0</version>
</dependency>
```

添加配置文件 `application.yml`

```yml
# 非必需，但这里还是设定一下端口，方便后面写启动脚本
server:
  port: 8080
custom:
  wx:
    mp:
      # 基本上都是微信公众号那边的设置（这里是测试的）
      appId: appId
      secret: secret
      token: token
      aesKey: aesKey
```

将配置读取到 Java Bean 对象上方便在程序中使用 `WxMpPropertiesConfig`

```java
/**
 * 微信公众号属性配置
 *
 * @author rxliuli
 */
@ConfigurationProperties(prefix = "custom.wx.mp")
public class WxMpPropertiesConfig {
    private String appId;
    private String secret;
    private String token;
    private String aesKey;
    // getter() and setter()
}
```

添加微信相关的主配置类 `WxMpMainConfig`

```java
/**
 * 微信公众号主要的配置类
 *
 * @author rxliuli
 */
@Configuration
@EnableConfigurationProperties(WxMpPropertiesConfig.class)
public class WxMpMainConfig {
    private final WxMpPropertiesConfig wxMpPropertiesConfig;

    /**
     * 微信公众号的服务对象
     * 用户调用微信的各种 API, 例如获取 access_token
     */
    private WxMpService wxMpService;

    @Autowired
    public WxMpMainConfig(WxMpPropertiesConfig wxMpPropertiesConfig) {
        this.wxMpPropertiesConfig = wxMpPropertiesConfig;
    }

    /**
     * 初始化路由列表和微信服务 api 对象
     */
    @PostConstruct
    public void init() {
        //配置微信 api 对象的策略（目前在内存中）
        final WxMpInMemoryConfigStorage storage = new WxMpInMemoryConfigStorage();
        storage.setAppId(wxMpPropertiesConfig.getAppId());
        storage.setSecret(wxMpPropertiesConfig.getSecret());
        storage.setAesKey(wxMpPropertiesConfig.getAesKey());
        storage.setToken(wxMpPropertiesConfig.getToken());
        //设置策略到服务对象中
        wxMpService = new WxMpServiceImpl();
        wxMpService.setWxMpConfigStorage(storage);
    }

    @Bean
    public WxMpService wxMpService() {
        return wxMpService;
    }
}
```

添加一个窗口 api 用于给微信调用 `WxMpPortalApi`

```java
/**
 * 微信服务窗口 api
 *
 * @author rxliuli
 */
@RestController
@RequestMapping("/wx/portal")
public class WxMpPortalApi {
    private final WxMpService wxMpService;

    @Autowired
    public WxMpPortalApi(WxMpService wxMpService) {
        this.wxMpService = wxMpService;
    }

    /**
     * 微信认证当前服务可用
     *
     * @param signature 微信加密签名，signature 结合了开发者填写的 token 参数和请求中的 timestamp 参数、nonce 参数
     * @param timestamp 时间戳
     * @param nonce     随机数
     * @param echostr   成功后回传的随机字符串
     * @return {@code echostr}
     */
    @GetMapping
    public String authGet(
            String signature,
            String timestamp,
            String nonce,
            String echostr
    ) {
        if (StringUtils.isAnyEmpty(signature, timestamp, nonce, echostr)) {
            throw new IllegalArgumentException("请求非法参数!");
        }
        if (wxMpService.checkSignature(timestamp, nonce, signature)) {
            return echostr;
        }
        return "非法请求";
    }
}
```

重启项目，将 <https://rx.serveo.net/wx/portal> 填到服务器配置中的 url 里面，点击 **提交**，应该可以看到 [修改成功] 的提示了。

### 消息处理

很显然，如果我们只让微信认证我们的服务器的话是做不了什么的，所以我们需要监听并处理用户在微信公众号中的操作并返回结果。

修改微信服务窗口 api `WxMpPortalApi`，添加对 `post` 请求的处理

```java
/**
 * 微信服务窗口 api
 *
 * @author rxliuli
 */
@RestController
@RequestMapping("/wx/portal")
public class WxMpPortalApi {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final WxMpService wxMpService;
    private final WxMpMessageRouter router;

    @Autowired
    public WxMpPortalApi(WxMpService wxMpService, WxMpMessageRouter router) {
        this.wxMpService = wxMpService;
        this.router = router;
    }

    /**
     * 微信认证当前服务可用
     *
     * @param signature 微信加密签名，signature 结合了开发者填写的 token 参数和请求中的 timestamp 参数、nonce 参数
     * @param timestamp 时间戳
     * @param nonce     随机数
     * @param echostr   成功后回传的随机字符串
     * @return {@code echostr}
     */
    @GetMapping
    public String authGet(
            String signature,
            String timestamp,
            String nonce,
            String echostr
    ) {
        if (StringUtils.isAnyEmpty(signature, timestamp, nonce, echostr)) {
            throw new IllegalArgumentException("请求非法参数!");
        }
        if (wxMpService.checkSignature(timestamp, nonce, signature)) {
            return echostr;
        }
        return "非法请求";
    }

    /**
     * 对所有来自微信服务器的消息进行预处理
     *
     * @param requestBody 请求体（xml 格式）
     * @return 明文消息
     */
    @PostMapping
    public String authPost(
            @RequestBody String requestBody,
            @RequestParam("signature") String signature,
            @RequestParam("timestamp") String timestamp,
            @RequestParam("nonce") String nonce,
            @RequestParam(name = "encrypt_type", required = false) String encType,
            @RequestParam(name = "msg_signature", required = false) String msgSignature
    ) throws JsonProcessingException {
        if (!wxMpService.checkSignature(timestamp, nonce, signature)) {
            throw new IllegalArgumentException("非法请求, 并非微信发来的");
        }

        WxMpXmlMessage inMessage = null;
        if (encType == null) {
            //明文传输
            inMessage = WxMpXmlMessage.fromXml(requestBody);
        } else if ("aes".equals(encType)) {
            //aes 加密
            inMessage = WxMpXmlMessage.fromEncryptedXml(requestBody, wxMpService.getWxMpConfigStorage(), timestamp, nonce, msgSignature);
        }
        WxMpXmlOutMessage outMessage = router.route(inMessage);
        log.info("客户端发送的消息: {}", new ObjectMapper().writeValueAsString(outMessage));
        return outMessage == null ? "" : outMessage.toXml();
    }
}
```

添加一个用户消息处理器

```java
/**
 * 基础微信消息处理器
 *
 * @author rxliuli
 */
public abstract class BaseHandler implements WxMpMessageHandler {
    final Logger log = LoggerFactory.getLogger(getClass());

    /**
     * 默认空实现
     *
     * @param wxMessage      微信的消息
     * @param context        上下文环境(用于在 handler 中传递信息)
     * @param wxMpService    微信 api 服务
     * @param sessionManager 会话管理
     * @return xml 格式的消息, 异步可返回 null
     */
    @Override
    public WxMpXmlOutMessage handle(WxMpXmlMessage wxMessage, Map<String, Object> context, WxMpService wxMpService, WxSessionManager sessionManager) {
        return null;
    }
}

/**
 * 用户发送消息的处理器
 *
 * @author rxliuli
 */
@Component
public class MsgHandler extends BaseHandler {
    @Override
    public WxMpXmlOutMessage handle(WxMpXmlMessage wxMessage, Map<String, Object> context, WxMpService wxMpService, WxSessionManager sessionManager) {
        log.info("接收到消息: {}", wxMessage.getMsg());
        final String content = "您发送的消息为: " + wxMessage.getContent();
        return WxMpXmlOutMessage.TEXT().content(content)
                .fromUser(wxMessage.getToUser())
                .toUser(wxMessage.getFromUser())
                .build();
    }
}
```

修改微信公众号主要的配置类 `WxMpMainConfig`，添加路由管理器

```java
/**
 * 微信公众号主要的配置类
 *
 * @author rxliuli
 */
@Configuration
@EnableConfigurationProperties(WxMpPropertiesConfig.class)
public class WxMpMainConfig {
    private final WxMpPropertiesConfig wxMpPropertiesConfig;
    private final MsgHandler msgHandler;
    /**
     * 微信公众号监听管理路由映射表
     * 其实就是监听用户在公众号的操作罢了, 比如点击了某个菜单, 发送了一些消息
     */
    private WxMpMessageRouter wxMpMessageRouter;
    /**
     * 微信公众号的服务对象
     * 用户调用微信的各种 API, 例如获取 access_token
     */
    private WxMpService wxMpService;

    @Autowired
    public WxMpMainConfig(WxMpPropertiesConfig wxMpPropertiesConfig, MsgHandler msgHandler) {
        this.wxMpPropertiesConfig = wxMpPropertiesConfig;
        this.msgHandler = msgHandler;
    }

    /**
     * 初始化路由列表和微信服务 api 对象
     */
    @PostConstruct
    public void init() {
        //配置微信 api 对象的策略（目前在内存中）
        final WxMpInMemoryConfigStorage storage = new WxMpInMemoryConfigStorage();
        storage.setAppId(wxMpPropertiesConfig.getAppId());
        storage.setSecret(wxMpPropertiesConfig.getSecret());
        storage.setAesKey(wxMpPropertiesConfig.getAesKey());
        storage.setToken(wxMpPropertiesConfig.getToken());
        //设置策略到服务对象中
        wxMpService = new WxMpServiceImpl();
        wxMpService.setWxMpConfigStorage(storage);
        //添加路由
        wxMpMessageRouter = this.newRouter(wxMpService);
    }

    /**
     * 根据微信 api 服务对象创建一个微信监听路由
     *
     * @param wxMpService 微信 api 服务
     * @return 微信监听路由对象
     */
    private WxMpMessageRouter newRouter(WxMpService wxMpService) {
        WxMpMessageRouter router = new WxMpMessageRouter(wxMpService);
        //发送消息(默认)
        router.rule().async(false).handler(this.msgHandler).end();
        return router;
    }

    @Bean
    public WxMpService wxMpService() {
        return wxMpService;
    }

    @Bean
    public WxMpMessageRouter wxMpMessageRouter() {
        return wxMpMessageRouter;
    }
}
```

现在向公众号发送消息，就可以得到回复了（简单的）。还有日志，菜单，关注，取消关注等处理器这里就不赘述了

### 创建菜单

创建一个简单的公众号菜单 Api 对象

```java
/**
 * 微信公众号菜单
 *
 * @author rxliuli
 */
@RestController
@RequestMapping("/wx/menu/")
public class WxMpMenuApi extends WxMpBaseApi {
    /**
     * 创建一个默认的菜单
     *
     * @return 菜单 id
     */
    @GetMapping("create")
    public String createDefault() throws WxErrorException {
        final WxMenu wxMenu = new WxMenu();
        final WxMenuButton buttonLeft = new WxMenuButton();
        buttonLeft.setType(WxConsts.MenuButtonType.CLICK);
        buttonLeft.setName("点击");
        buttonLeft.setKey(IdWorker.getIdStr());

        final WxMenuButton buttonRight = new WxMenuButton();
        buttonRight.setType(WxConsts.MenuButtonType.VIEW);
        buttonRight.setName("链接");
        buttonRight.setUrl("https://blog.rxliuli.com");
        buttonRight.setKey(IdWorker.getIdStr());
        wxMenu.getButtons().add(buttonLeft);
        wxMenu.getButtons().add(buttonRight);
        return wxMpService.getMenuService().menuCreate(wxMenu);
    }
}
```

访问 <https://rx.serveo.net/wx/menu/create> 就可以为微信公众号创建一个简单的菜单了。点击左边的“点击"按钮会回复文字说点击了什么，右边的链接则会跳转到一个网页。

> 其他的功能就放到后面再实现吧，更多公众号开发相关的内容可以参考 [微信官方文档](https://mp.weixin.qq.com/wiki) 和 [微信开发工具包](https://github.com/Wechat-Group/weixin-java-tools)。当然，所有的示例代码吾辈都已经放到了 [GitHub](https://github.com/rxliuli/wx-mp-example)，却是可以参考一下的呢
