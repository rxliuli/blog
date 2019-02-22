---
layout: post
title: SpringMVC @RequestParam 参数不能自动转换泛型集合
tags:
  - Java
  - 记录
abbrlink: 2f32308b
date: 2019-01-17 17:48:57
---

# SpringMVC @RequestParam 参数不能自动转换泛型集合

## 场景

在使用 SpringMVC 传参的时候遇到的一个问题，本来需要的参数类型是 `Map<Integer, Integer>l`。然而浏览器传递过来的是 `Map<String, String>`。然而，此时 SpringMVC 并没有直接说参数类型错误。

Controller 大概是下面这样

```java
@RestController
@RequestMapping("/")
public class HomeApi {
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @PostMapping("testMap")
    public Map<Integer, Integer> testMap(@RequestParam Map<Integer, Integer> map) {
        // 简单的打印 map
        log.info("map: {}", map);
        return map;
    }
}
```

然而，当吾辈调用这个接口时，却出现了错误

```js
const fd = new FormData()
fd.append(1, 1)
fd.append(2, 2)
fd.append(3, 3)
fetch('/testMap', {
  method: 'post',
  body: fd
})
  .then(res => res.json())
  .then(json => console.log(json))
```

报错信息

```json
{
  "timestamp": "2019-01-17T09:59:16.809+0000",
  "status": 500,
  "error": "Internal Server Error",
  "message": "Could not write JSON: java.lang.String cannot be cast to java.lang.Number; nested exception is com.fasterxml.jackson.databind.JsonMappingException: java.lang.String cannot be cast to java.lang.Number",
  "path": "/testMap"
}
```

可以看到，Spring 告诉我们，不能转换 `String` 为 `Integer`。这是为什么呢？让我们来调试一下！

可以看到，确实进入了方法，然而最后一步却报错了  
![进入了方法](https://raw.githubusercontent.com/rxliuli/img-bed/master/20190117180704.png)

报错原因

- 泛型只在编译期有约束，运行时泛型实际并不存在，所以可以进入方法而非出现参数错误
- 最终转换类型为 `Map<Integer, Integer>` 的时候发现类型错误

那么，我们是否可以手动将之转换为 `Map<Integer, Integer>` 呢？修改代码如下

```java
@RestController
@RequestMapping("/")
public class HomeApi {
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @PostMapping("testMap")
    public Map<Integer, Integer> testMap(@RequestParam Map<Integer, Integer> map) {
        log.info("map: {}", map);
        return map.entrySet().stream().collect(Collectors.toMap(kv -> Integer.parseInt(kv.getKey()), kv -> Integer.parseInt(kv.getValue())));
    }
}
```

再次调用，发现在 `kv.getKey()` 这里就已经发生了异常。那么，我们应该如何解决呢？

## 解决

### 使用 `Map<String, String>`

其实，我们只要将参数类型声明为 `Map<String, String>`，然后再手动转换即可

```java
@RestController
@RequestMapping("/")
public class HomeApi {
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @PostMapping("testMap")
    public Map<Integer, Integer> testMap(@RequestParam Map<String, String> map) {
        log.info("map: {}", map);
        return map.entrySet().stream().collect(Collectors.toMap(kv -> Integer.parseInt(kv.getKey()), kv -> Integer.parseInt(kv.getValue())));
    }
}
```

再次调用，一切恢复了正常！

### 使用 `@RequestBody`

除此之外，我们或许还有另外一种方法，使用支持泛型的参数的 `@RequestBody` 标识为 `json` 参数。修改代码如下

```java
@RestController
@RequestMapping("/")
public class HomeApi {
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @PostMapping("testMap")
    public Map<Integer, Integer> testMap(@RequestBody Map<Integer, Integer> map) {
        log.info("map: {}", map);
        return map;
    }
}
```

同时，客户端也要修改为以 `json` 的形式，将参数传递给服务端

```js
fetch('/testMap', {
  method: 'post',
  body: JSON.stringify({
    1: 1,
    2: 2,
    3: 3
  }),
  headers: {
    'content-type': 'application/json'
  }
})
  .then(res => res.json())
  .then(json => console.log(json))
```

---

那么，关于 SpringMVC 不能自动转换泛型集合便到这里就结束啦
