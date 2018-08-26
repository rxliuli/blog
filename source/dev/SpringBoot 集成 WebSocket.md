# SpringBoot 集成 WebSocket

- [SpringBoot 集成 WebSocket](#springboot-集成-websocket)
  - [场景 & 需求](#场景--需求)
  - [前置知识](#前置知识)
  - [引入依赖](#引入依赖)
  - [配置 `SpringBoot WebSocket` 支持](#配置-springboot-websocket-支持)
  - [双向广播服务端](#双向广播服务端)
  - [双向广播客户端](#双向广播客户端)
  - [单向广播服务端](#单向广播服务端)
  - [单向广播客户端](#单向广播客户端)
  - [点对点推送服务端](#点对点推送服务端)
  - [点对点推送客户端](#点对点推送客户端)
  - [单向点对点推送服务端](#单向点对点推送服务端)
  - [单向点对点推送客户端](#单向点对点推送客户端)
  - [接受复杂类型的消息](#接受复杂类型的消息)
  - [返回复杂类型的消息](#返回复杂类型的消息)

## 场景 & 需求

1. 客户端发送请求后，服务端进行处理后可以对所有的客户端进行 **广播**
2. 服务端可以在任何时候主动对所有客户端进行 **广播**
3. 客户端发送请求后，服务端进行处理后可以对指定客户端进行 **点对点推送**
4. 服务端可以在任何时候主动对指定客户端进行 **点对点推送**
5. 服务端可以在任何时候主动对指定某些客户端进行 **广播**
6. 服务端可以识别客户端（状态），并以此进行 **点对点推送**

## 前置知识

- [X] Java
- [X] Maven
- [X] SpringBoot
- [ ] IDEA

## 引入依赖

创建一个 `SpringBoot` 项目，并添加 `spring-boot-starter-websocket` 依赖

```xml
<!--spring boot web socket-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
```

## 配置 `SpringBoot WebSocket` 支持

```java
/**
 * 配置 SpringBoot WebSocket 支持
 *
 * @author rxliuli
 */
@Configuration
@EnableWebSocketMessageBroker
public class SpringWebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {
    /**
     * 注册一个 Socket 端点
     *
     * @param stompEndpointRegistry stomp 端点注册表
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry stompEndpointRegistry) {
        stompEndpointRegistry.addEndpoint("/endpoint")
                //设置允许所有源请求（跨域）
                .setAllowedOrigins("*")
                .withSockJS();
    }

    /**
     * 注册一些广播消息代理
     *
     * @param registry 消息代理注册对象
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        //注册简单代理（里面是前缀）
        //注：默认 topic 是主题（广播），user 则是用户（点对点）
        registry.enableSimpleBroker("/topic", "/user");
    }
}
```

## 双向广播服务端

客户端发送请求后，服务端进行处理后可以对所有的客户端进行 **广播**

```java
/**
 * 双向广播控制器
 *
 * @author rxliuli
 */
@Controller
public class BilateralBroadcastingSocket {
    /**
     * 广播推送
     * 注解 @Payload 是为了绑定消息到参数 text 上
     *
     * @param text      简单的文本信息
     * @param sessionId 当前请求 socket 会话 id
     * @return 会话 id 和消息内容
     */
    @MessageMapping(value = "/talk")
    @SendTo("/topic/broadcasting/bilateral/allClient")
    public String talk(@Payload String text, @Header("simpSessionId") String sessionId) throws InterruptedException {
        //模拟处理其他事情
        Thread.sleep(1000L);
        return "[ " + sessionId + "] 说: [" + text + "]";
    }
}
```

## 双向广播客户端

向服务端发送消息，并监听服务端的广播。客户端发送消息与监听是分离的，也可以只向服务端发送消息而不监听广播，或者只接收广播不发送消息。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <script type="application/javascript" src="https://cdn.bootcss.com/sockjs-client/1.1.4/sockjs.min.js"></script>
  <script type="application/javascript" src="https://cdn.bootcss.com/stomp.js/2.3.3/stomp.min.js"></script>
  <script>
    let socket = new SockJS('http://127.0.0.1:8080/endpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect(
      {},
      // 连接成功回调函数
      frame => {
        console.log('服务端 Socket 连接建立')

        // 获取 websocket 连接的 sessionId
        const sessionId = /\/([^\/]+)\/websocket/.exec(socket._transport.url)[1];
        console.log("connected, session id: " + sessionId);

        // 订阅广播消息（双向通信）
        // 这里是关键（订阅了服务端的 topic）
        stompClient.subscribe('/topic/broadcasting/bilateral/allClient', res => {
          console.log(`[广播（双向通信）]: ${res.body}`)
        })

        // 发送请求
        send()

      }, error => {
        console.log('Socket 连接失败')
      });

    function send() {
      // 发送一个消息到服务端
      // 发送消息到服务端
      var headers = {};
      var body = {
        'message': '消息内容'
      };
      stompClient.send("/talk", headers, JSON.stringify(body));
    }

    /**
     * 监听窗口关闭事件，窗口关闭前，主动关闭连接，防止连接还没断开就关闭窗口，server 端会抛异常
     */
    window.onbeforeunload = function () {
      if (stompClient !== null) {
        stompClient.disconnect();
        socket.close();
      }
      console.log('断开连接');
    };
  </script>
</body>

</html>
```

## 单向广播服务端

从服务端推送消息到所有客户端，是单向推送到客户端的，不接受从客户端的输入。

```java
/**
 * 单向广播控制器
 *
 * @author rxliuli
 */
@Controller
public class UnidirectionalBroadcastingSocket {
    /**
     * 从服务端推送消息到所有客户端
     * 这是单向推送到客户端的，不接受从客户端的输入
     */
    @SendTo("/topic/broadcasting/unidirectional/allClient")
    public Object broadcasting() {
        return null;
    }
}

/**
 * 使用 Scheduled 不停的推送信息
 *
 * @author rxliuli
 */
@Component
public class ScheduledRefreshJob {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    /**
     * 不停地推送消息到客户端
     */
    @Scheduled(fixedDelay = 10 * 1000)
    public void scheduledBroadcasting() {
        simpMessagingTemplate.convertAndSend("/topic/broadcasting/unidirectional/allClient", new Person(1L, "rx", false));
    }
}
```

## 单向广播客户端

客户端只需要添加一个监听器就好了，不需要也不能向服务端发送消息。

```js
// 订阅广播消息（服务端单向推送）
const subscription_broadcast = stompClient.subscribe('/topic/broadcasting/unidirectional/allClient',
    (response) => {
        console.log(`[广播（服务端单向推送）]: ${response.body}`)
    });
```

## 点对点推送服务端

服务端使用 `@SendToUser(path)` 向单个客户端推送消息，这里的 `@Header("simpSessionId")` 指的是从客户端的请求头中的 `simpSessionId` 参数赋值给 `sessionId`（`WebSocket` 会话 `ID`，和用户 `Session` 不同，是每一个 `WebSocket` 唯一的 #即和用户不是一一对应）

```java
/**
 * 双向点对点推送控制器
 *
 * @author rxliuli
 */
@Controller
public class BilateralPushSocket {
    /**
     * 点对点推送（双向通信）
     *
     * @param text      消息
     * @param sessionId 会话 id
     * @return 推送到当前会话的消息
     */
    @MessageMapping("/speak")
    @SendToUser("/push/bilateral/thisClient")
    public String speak(@Payload String text, @Header("simpSessionId") String sessionId) throws InterruptedException {
        //模拟处理其他事情
        Thread.sleep(1000L);
        return "[ " + sessionId + "] send: [" + text + "]";
    }
}
```

## 点对点推送客户端

客户端请求的路径需要注意一下，是以 `/user/${sessionId}` 开头，后面才是 `@SendToUser(path)` 中设置的 `path`。

```js
// 订阅私人消息（双向通信）
stompClient.subscribe(`/user/${sessionId}/push/bilateral/thisClient`, res => {
    console.log(`[点对点推送（双向通信）]: ${res.body}`)
})
```

## 单向点对点推送服务端

## 单向点对点推送客户端

## 接受复杂类型的消息

## 返回复杂类型的消息
