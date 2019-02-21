---
layout: post
title: MybatisPlus 自定义全局操作 exists 一直返回 null
tags:
  - Java
  - Mybatis
  - 记录
abbrlink: 5bd9a558
date: 2018-12-11 19:26:18
updated: 2018-12-12 00:00:00
---

# MybatisPlus 自定义全局操作 exists 一直返回 null

## 场景

为 `mybatis-plus` 自定义了一个全局操作，然后就一直返回 `null`。。。

在自定义 sql 注入器类的时候，突然发现 `existsById()` 一直都在抛空指针异常，就去看了一下结果发现一直返回 `null`。

```java
package com.rxliuli.example.mybatisplussqlinjector.config;

import com.baomidou.mybatisplus.entity.TableInfo;
import com.baomidou.mybatisplus.mapper.AutoSqlInjector;
import org.apache.ibatis.builder.MapperBuilderAssistant;
import org.apache.ibatis.mapping.SqlSource;
import org.apache.ibatis.session.Configuration;

/**
 * 自定义 sql 注入器
 * 注: 此处不能声明为 Bean, 因为回和 MybatisPlus 自己的 SqlInjector 冲突
 */
public class CustomSqlInjector extends AutoSqlInjector {
    /**
     * 根据 id 确定数据是否存在
     */
    private static final String SQL_EXISTS_BY_ID = "select exists(select 0 from %s where id = #{id});";

    @Override
    public void inject(Configuration configuration, MapperBuilderAssistant builderAssistant, Class<?> mapperClass, Class<?> modelClass, TableInfo table) {
        existsById(mapperClass, modelClass, table);
    }

    public void existsById(Class<?> mapperClass, Class<?> modelClass, TableInfo table) {
        final String sql = String.format(SQL_EXISTS_BY_ID, table.getTableName());
        final SqlSource sqlSource = languageDriver.createSqlSource(configuration, sql, modelClass);
        this.addSelectMappedStatement(mapperClass, "existsById", sqlSource, modelClass, table);
    }
}
```

自定义的 `BaseDao` 基类

```java
package com.rxliuli.example.mybatisplussqlinjector.common.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.io.Serializable;

/**
 * @author rxliuli
 */
public interface BaseDao<T extends Serializable> extends BaseMapper<T> {
    /**
     * 根据 id 查询数据是否存在
     *
     * @param id 数据 id
     * @return 数据是否存在
     */
    Boolean existsById(@Param("id") Long id);
}
```

测试代码

```java
package com.rxliuli.example.mybatisplussqlinjector.dao;

import com.rxliuli.example.mybatisplussqlinjector.entity.User;
import common.test.BaseDaoAndServiceTest;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class UserDaoTest extends BaseDaoAndServiceTest<UserDao> {
    @Test
    public void existsById() {
        final Boolean res = base.existsById(1L);
        log.debug("res: {}", res);
        assertThat(res)
                .isTrue();
    }

    @Test
    public void selectById() {
        final User user = base.selectById(1L);
        log.debug("user: {}", user);
        assertThat(user)
                .isNotNull();
    }
}
```

结果

![测试结果](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181211202332.png)

然而，当我把全局注入的 sql 操作放到 xml 文件时

Dao 和对应的 xml 文件

```java
package com.rxliuli.example.mybatisplussqlinjector.dao;

import com.rxliuli.example.mybatisplussqlinjector.common.dao.BaseDao;
import com.rxliuli.example.mybatisplussqlinjector.entity.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends BaseDao<User> {
    @Override
    Boolean existsById(@Param("id") Long id);
}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.rxliuli.example.mybatisplussqlinjector.dao.UserDao">
    <select id="existsById" resultType="java.lang.Boolean">
        select exists(select 0
                      from user
                      where id = #{id});
    </select>
</mapper>
```

现在，一切又能正常运行了，这其中到底发生了什么呢？

![测试正常运行](https://raw.githubusercontent.com/rxliuli/img-bed/master/20181211202834.png)

> 目前该问题已经在 [官方 GitHub](https://github.com/baomidou/mybatis-plus) 上提出了一个 [issue](https://github.com/baomidou/mybatis-plus/issues/694)

## 解决

好吧，开发人员说是要在使用 `addSelectMappedStatement()` 时对返回值进行界定，之前一直查的都是表数据确实没注意到还需要对返回值类型进行界定呢

修改的地方其实只有一处

```java
package com.rxliuli.example.mybatisplussqlinjector.config;

import com.baomidou.mybatisplus.entity.TableInfo;
import com.baomidou.mybatisplus.mapper.AutoSqlInjector;
import org.apache.ibatis.builder.MapperBuilderAssistant;
import org.apache.ibatis.mapping.SqlSource;
import org.apache.ibatis.session.Configuration;

/**
 * 自定义 sql 注入器
 * 注: 此处不能声明为 Bean, 因为回和 MybatisPlus 自己的 SqlInjector 冲突
 */
public class CustomSqlInjector extends AutoSqlInjector {
    /**
     * 根据 id 确定数据是否存在
     */
    private static final String SQL_EXISTS_BY_ID = "select exists(select 0 from %s where id = #{id});";

    @Override
    public void inject(Configuration configuration, MapperBuilderAssistant builderAssistant, Class<?> mapperClass, Class<?> modelClass, TableInfo table) {
        existsById(mapperClass, modelClass, table);
    }

    public void existsById(Class<?> mapperClass, Class<?> modelClass, TableInfo table) {
        final String sql = String.format(SQL_EXISTS_BY_ID, table.getTableName());
        final SqlSource sqlSource = languageDriver.createSqlSource(configuration, sql, modelClass);
        // 注：在此处界定返回值类型
        this.addSelectMappedStatement(mapperClass, "existsById", sqlSource, Boolean.class, table);
    }
}
```

> 代码已经上传到 [mybatis-plus-sql-injector](https://github.com/rxliuli/mybatis-plus-sql-injector)

虽然只是个不起眼的小错误，不过这里还是记录一下吧，毕竟坑只要踩过一次就够了 ┐(￣ヮ￣)┌
