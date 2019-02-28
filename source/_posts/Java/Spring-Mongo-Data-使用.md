---
layout: post
title: Spring Mongo Data 使用
date: 2019-02-23 14:00:46
abbrlink: 80c83b5c
tags:
  - Java
  - MonngoDB
  - 教程
---

# Spring Mongo Data 使用

## 前置要求

本文假设你已经了解或知道以下技能，尤其而且是勾选的内容。

- [x] Gradle
- [x] SpringBoot
- [x] MongoDB
- [x] SpringBoot 集成 MongoDB

> 注：本文不谈 SpringBoot 如何整合 MongoDB，如果需要可以去吾辈的另一篇记录 [SpringBoot 整合 Mybatis Plus/MongoDB](https://blog.rxliuli.com/p/872037f5/) 查看，并且本文以项目 [spring-boot-mybatis-plus-mongo](https://github.com/rxliuli/spring-boot-mybatis-plus-mongo) 为基础作为说明。

## 使用

> 注：Spring Data MongoDB 是 Spring Data 的一部分，下面统一使用 MongoData 来称呼。

### 继承 MongoRepository<T, ID> 使用命名方法

集成了 MongoData 之后，我们可以选择让 Dao 继承 `MongoRepository<T, ID>` 模板以获得通用方法，并且，可以通过特定方式的命名方法让 MongoData 来帮我们自动实现。

例如

```java
@Repository
public interface UserInfoLogRepository extends MongoRepository<UserInfoLog, Long>, CustomUserInfoLogRepository {
    /**
     * 根据 id 查询用户日志信息
     *
     * @param id 查询的 id
     * @return 用户日志
     */
    UserInfoLog findUserInfoLogByIdEquals(Long id);
}
```

这个方法将会被 MongoData 自动实现，而我们做的只是让接口方法名符合 MongoData 的命名规范罢了。

这里来说明一下 `findUserInfoLogByIdEquals` 方法，将之拆分开来

- `find`: 代表查询的意思，可以想象成 SQL 中的 `select`
- `UserInfoLog`: 代表查询的类型，可以想象成 `select` 中的表名（非必须，默认为当前 `MongoRepository` 的实体泛型类）
- `By`: 代表着条件的开始，可以想象成 SQL 中的 `where`
- `Id`: 代表着条件中的字段，可以想象成 `where` 下的条件字段名
- `Equals`: 代表条件的操作，可以想象成 `where` 下的条件操作，此处等价于 `=`

是的，MongoData 会自动根据方法名创建具体的实现，而我们要做的，仅仅是让方法名复合 MongoData 的规范而已。

甚至于，我们可以添加更多的条件，例如下面的 `findUserInfoLogsByUserIdEqualsAndLogTimeGreaterThanEqualAndOperateRegex`

```java
/**
  * 根据用户 id/记录时间/操作说明查询用户日志
  *
  * @param userId  用户 id
  * @param logTime 记录时间
  * @param operate 操作说明
  * @return 用户日志
  */
List<UserInfoLog> findUserInfoLogsByUserIdEqualsAndLogTimeGreaterThanEqualAndOperateRegex(Long userId, LocalDateTime logTime, String operate);
```

当吾辈第一次看到这么长的方法名时（是的，足足有 71 个字符组成），也只能惊呼：**Oh my Gad!**  
这对业务层的调用实在是太过于痛苦了，尤其而且能逼死强迫症（例如吾辈），所以下面就说一种更加灵活的解决方案！

### 使用 MongoOperations 创建更加灵活的查询

修改 `UserInfoLogRepository` 并定义 `listByParam()` 以替代上面的 `findUserInfoLogsByUserIdEqualsAndLogTimeGreaterThanEqualAndOperateRegex()` 方法

```java
public interface UserInfoLogRepository {
    /**
     * 根据一些参数查询用户信息列表
     *
     * @param userInfoLog 参数对象
     * @return 用户信息列表
     */
    List<UserInfoLog> listByParam(UserInfoLog userInfoLog);
}
```

创建实现类 `UserInfoLogRepositoryImpl` 并实现 `listByParam()` 方法。这里注入 `MongoOperations` MongoDB 操作模板，它的实现类实际上是 `MongoTemplate`，然后使用 `Criteria` 定义复杂的查询。

```java
@Repository
public class UserInfoLogRepositoryImpl implements UserInfoLogRepository {
    @Autowired
    private MongoOperations mongoOperations;

    @Override
    public List<UserInfoLog> listByParam(UserInfoLog userInfoLog) {
        final Criteria criteria = new Criteria();
        if (userInfoLog.getUserId() != null) {
            criteria.and("userId")
                    .is(userInfoLog.getUserId());
        }
        if (userInfoLog.getLogTime() != null) {
            criteria.and("logTime")
                    .gte(userInfoLog.getLogTime());
        }
        if (userInfoLog.getOperate() != null) {
            criteria.and("operate")
                    .regex(userInfoLog.getOperate());
        }
        return mongoOperations.find(new Query(criteria), UserInfoLog.class);
    }
}
```

可以看到，`listByParam()` 相对而言更加优雅，不过代码量上也有增加就是了。事实上，对于复杂的查询，最好使用这种方式进行查询。

### 集合 MongoRepository 和 MongoOperations

总之，上面两种方式各有优缺点。`MongoRepository` 对于大部分常见的操作基本都可以正常替代，而 `MongoOperations` 比之灵活得多，我们是否只能**鱼与熊掌不可兼得**呢？  
当然不是，MongoData 在设计之初便充分权衡过方便与灵活性的平衡点，所以，我们可以同时使用它们！

具体使用步骤如下

#### 自定义更加复杂的 Dao 接口

该接口定义需要自己实现的方法，需要同时被 `UserInfoLogRepository` 和 `UserInfoLogRepositoryImpl` 实现

```java
public interface CustomUserInfoLogRepository {
    /**
     * 根据一些参数查询用户信息列表
     *
     * @param userInfoLog 参数对象
     * @return 用户信息列表
     */
    List<UserInfoLog> listByParam(UserInfoLog userInfoLog);
}
```

#### 定义一些简单操作的 Dao 接口

注意，这里同时继承了 `CustomUserInfoLogRepository`

```java
public interface UserInfoLogRepository extends MongoRepository<UserInfoLog, Long>, CustomUserInfoLogRepository {
    /**
     * 根据 id 查询用户日志信息
     *
     * @param id 查询的 id
     * @return 用户日志
     */
    @Nullable
    UserInfoLog findUserInfoLogByIdEquals(Long id);

    /**
     * 根据用户 id/记录时间/操作说明查询用户日志
     *
     * @param userId  用户 id
     * @param logTime 记录时间
     * @param operate 操作说明
     * @return 用户日志
     */
    List<UserInfoLog> findUserInfoLogsByUserIdEqualsAndLogTimeGreaterThanEqualAndOperateRegex(Long userId, LocalDateTime logTime, String operate);
}
```

#### 定义实现 UserInfoLogRepositoryImpl 类

数据仓库 `UserInfoLogRepository` 的实现类，但请务必注意，实现类继承的是 `CustomUserInfoLogRepository` 接口，而非本应该继承的接口。而且实现类的名字必须是基础接口名 + `Impl`，因为 MongoData 默认使用的实现类就是这个名字。

```java
public class UserInfoLogRepositoryImpl implements CustomUserInfoLogRepository {
    @Autowired
    private MongoOperations mongoOperations;

    @Override
    public List<UserInfoLog> listByParam(UserInfoLog userInfoLog) {
        final Criteria criteria = new Criteria();
        if (userInfoLog.getUserId() != null) {
            criteria.and("userId")
                    .is(userInfoLog.getUserId());
        }
        if (userInfoLog.getLogTime() != null) {
            criteria.and("logTime")
                    .gte(userInfoLog.getLogTime());
        }
        if (userInfoLog.getOperate() != null) {
            criteria.and("operate")
                    .regex(userInfoLog.getOperate());
        }
        return mongoOperations.find(new Query(criteria), UserInfoLog.class);
    }
}
```

## 常用 API

匹配标准：`Criteria`

| 方法名        | 参数                           | 功能             |
| ------------- | ------------------------------ | ---------------- |
| `and`         | `String`                       | 并且             |
| `not`         | `/Object`                      | 非               |
| `orOperator`  | `Criteria...`                  | 并且是其他标准   |
| `andOperator` | `Criteria...`                  | 并且是其他标准   |
| `is`          | `Object`                       | 等于             |
| `ne`          | `Object`                       | 不等于           |
| `le`          | `Object`                       | 小于             |
| `let`         | `Object`                       | 小于或等于       |
| `gt`          | `Object`                       | 大于             |
| `gte`         | `Object`                       | 大于或等于       |
| `in`          | `Object.../Collection<?>`      | 在其中           |
| `nin`         | `Object.../Collection<?>`      | 不在其中         |
| `mod`         | `Number,Number`                | 模运算           |
| `all`         | `Object.../Collection<?>`      | 包含全部         |
| `size`        | `int`                          | 长度             |
| `exists`      | `boolean`                      | 存在             |
| `type`        | `int/Type...`                  | 结构化数据的类型 |
| `regex`       | `String/String,String/Pattern` | 正则             |
| `alike`       | `Example<?>`                   | 匹配到最像的     |
| `isEqual`     | `Object,Object`                | 是否相等         |
