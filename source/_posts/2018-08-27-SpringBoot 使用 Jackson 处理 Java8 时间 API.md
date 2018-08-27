---
title: Xmind 激活
date: 2018-08-27
tags: [Java]
---
# SpringBoot 使用 Jackson 处理 Java8 时间 API

## 场景

在项目中的实体类里面使用了 `Java8` 新的时间 API，例如 `LocalDate`, `LocalTime`, `LocalDateTime` 等。然而在将这些时间类型的字段序列化返回到前端时，但格式却感觉有些异常。

嗯，大概就是下面这种样子的

```json
{
  "dayOfMonth": 27,
  "dayOfWeek": "MONDAY",
  "dayOfYear": 239,
  "month": "AUGUST",
  "monthValue": 8,
  "year": 2018,
  "hour": 10,
  "minute": 0,
  "nano": 370000000,
  "second": 52,
  "chronology": {
    "id": "ISO",
    "calendarType": "iso8601"
  }
}
```

这是什么鬼的格式。。。

## 解决方案

添加依赖

```xml
<dependency>
    <groupId>com.fasterxml.jackson.datatype</groupId>
    <artifactId>jackson-datatype-jsr310</artifactId>
</dependency>
```

修改 `application.yml`，配置 `spring.jackson.serialization.write_dates_as_timestamps` 禁用 *打印日期为时间戳的功能*。

```yaml
spring:
  jackson:
    serialization:
      write_dates_as_timestamps: false
```

如此，在返回数据到前端的时候 SpringBoot 就会自动将日期格式化为 `yyyy-MM-ddThh:mm:ss`

然而，如果我们想要在程序中手动的序列化日期怎么办呢？实际上也很简单，使用代码 *打印日期为时间戳的功能* 并添加 `jackson-datatype-jsr310` 中的 `JavaTimeModule` 模块。

```java
ObjectMapper om = new ObjectMapper()
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .registerModule(new JavaTimeModule());
```

那么，以上就是 SpringBoot 序列化 Java8 时间 API 的问题和解决方案啦 ヾ(@^▽^@)ノ
