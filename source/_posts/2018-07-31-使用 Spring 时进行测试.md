---
title: 使用 Spring 时进行测试
date: 2018-07-31 01:39:21
tags: Java
---
# 使用 Spring 时进行测试

- [使用 Spring 时进行测试](#使用-spring-时进行测试)
  - [前置要求](#前置要求)
  - [概略](#概略)
  - [普通测试](#普通测试)
  - [Dao/Service 层测试](#daoservice-层测试)
    - [手动使用 `ApplicationContext` 去获取 Bean 然后进行测试](#手动使用-applicationcontext-去获取-bean-然后进行测试)
    - [使用注解自动加载 Spring 测试环境](#使用注解自动加载-spring-测试环境)
  - [Web 层测试](#web-层测试)
    - [独立安装测试](#独立安装测试)
    - [集成 Web 环境测试](#集成-web-环境测试)

## 前置要求

- Java
- Spring/SpringMVC
- Maven

## 概略

单元测试/集成测试是软件开发时重要的一项流程，而 Spring 对于测试提供了非常强大的支持。

- 支持主流测试框架 `Junit`/`TestNG`
- 支持在测试中使用依赖注入
- 支持在测试中事物自动回滚
- 支持使用各种注解增强功能

那么，测试基本上按照场景分为三种情况：

- 普通测试：不需要使用 Spring 容器的测试（工具类）
- Dao/Service 层测试：需要使用 Spring 容器的依赖注入
- Web 层测试：测试对外部提供的接口

这里新建一个用来测试的项目，吾辈将之丢到了 GitHub 上面
> [项目链接](https://github.com/rxliuli/springtest)

你也可以自己创建一个基础的 Maven 项目，项目结构应当如下：

- /
  - src/
    - main/
      - java/
      - resources/
    - test/
      - java/
  - pom.xml

## 普通测试

假设吾辈有一个 `SpringUtil`（路径是 `/src/main/java/com/rxliuli/study/springtest/util/SpringUtil.java`） 工具类，想要测试怎么办呢？

```java
/**
 * 用于测试的字符串工具类
 *
 * @author rxliuli
 */
public class StringUtil {
    /**
     * 判断是否为空
     *
     * @param string 要进行判断的字符串
     * @return 是否为 null 或者空字符串
     */
    public static boolean isEmpty(String string) {
        return string == null || string.isEmpty();

    }

    /**
     * 判断是否为空
     *
     * @param string 要进行判断的字符串
     * @return 是否为 null 或者空字符串
     */
    public static boolean isNotEmpty(String string) {
        return !isEmpty(string);
    }

    /**
     * 判断是否有字符串为空
     *
     * @param strings 要进行判断的一个或多个字符串
     * @return 是否有 null 或者空字符串
     */
    public static boolean isAnyEmpty(String... strings) {
        return Arrays.stream(strings)
                .anyMatch(StringUtil::isEmpty);
    }

    /**
     * 判断字符串是否全部为空
     *
     * @param strings 要进行判断的一个或多个字符串
     * @return 是否全部为 null 或者空字符串
     */
    public static boolean isAllEmpty(String... strings) {
        return Arrays.stream(strings)
                .allMatch(StringUtil::isEmpty);
    }
}
```

首先需要引入以下依赖

- `Junit4`：流行的 Java 测试框架。虽然吾辈个人更喜欢 `TestNG`，但 `Junit` 的流行度要更高一点，`SpringBoot` 甚至将之默认引入了，所以这里使用 `Junit` 框架。
- `AssertJ`：流行的 Java 流畅式断言框架。`Junit` 也有自己的断言方法，但和 `AssertJ` 相比就是小巫见大巫了。

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.assertj</groupId>
    <artifactId>assertj-core</artifactId>
    <version>3.9.1</version>
    <scope>test</scope>
</dependency>
```

> 注：生产环境中 **version** 应该放到 **properties** 节点下，这里只做演示。  
> 此篇不对 `Junit` 和 `AssertJ` 进行详细的讲解，如果想要入门了解参考 [Junit](http://wiki.jikexueyuan.com/project/junit/), [AssertJ](http://hao.jobbole.com/assertj/)

然后创建一个对应的测试类 `StringUtilTest`（`/src/test/java/com/rxliuli/study/springtest/util/SpringUtilTest.java`）直接进行测试即可。

```java
/**
 * @author rxliuli
 */
public class StringUtilTest {
    private String strNull = null;
    private String strEmpty = "";
    private String strSome = "str";

    @Test
    public void isEmpty() {
        //测试 null
        assertThat(StringUtil.isEmpty(strNull))
                .isTrue();
        //测试 empty
        assertThat(StringUtil.isEmpty(strEmpty))
                .isTrue();
        //测试 some
        assertThat(StringUtil.isEmpty(strSome))
                .isFalse();
    }

    @Test
    public void isNotEmpty() {
        //测试 null
        assertThat(StringUtil.isNotEmpty(strNull))
                .isFalse();
        //测试 empty
        assertThat(StringUtil.isNotEmpty(strEmpty))
                .isFalse();
        //测试 some
        assertThat(StringUtil.isNotEmpty(strSome))
                .isTrue();
    }

    @Test
    public void isAnyEmpty() {
        assertThat(StringUtil.isAnyEmpty(strNull, strEmpty, strSome))
                .isTrue();
        assertThat(StringUtil.isAnyEmpty())
                .isFalse();
    }

    @Test
    public void isAllEmpty() {
        assertThat(StringUtil.isAllEmpty(strNull, strEmpty, strSome))
                .isFalse();
        assertThat(StringUtil.isAnyEmpty(strNull, strEmpty))
                .isTrue();
    }
}
```

上面测试流程基本如下：

- 构建出测试需要的参数（非必需）
- 调用需要测试的方法
- 使用 AssertJ 对得到的结果进行断言

## Dao/Service 层测试

准确的说是需要使用 Spring 容器的测试，测试方法有 2 种。

1. 手动使用 `ApplicationContext` 去获取 Bean 然后进行测试
2. 使用注解自动加载 Spring 测试环境

### 手动使用 `ApplicationContext` 去获取 Bean 然后进行测试

这里先演示手动使用 `ApplicationContext` 的做法进行测试，为了简化测试，这里直接使用 `H2DB` 和 `SpringJdbcTemplate`。

```xml
<!--spring-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>4.3.14.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>4.3.14.RELEASE</version>
</dependency>
<!--h2 db-->
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <version>1.4.196</version>
    <scope>test</scope>
</dependency>
```

创建初始化 sql 文件 `hsqldb/initDatabase.sql`

```sql
drop table if exists user;
create table user (
  id   int auto_increment not null
  comment '编号',
  name varchar(20)        not null
  comment '名字',
  sex  boolean            null
  comment '性别',
  age  int                null
  comment '年龄'
);

insert into user (id, name, sex, age)
values
  (1, '琉璃', false, 17),
  (2, '月姬', false, 1000);
```

Spring 配置文件 `spring/spring-context.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:jdbc="http://www.springframework.org/schema/jdbc" xmlns:p="http://www.springframework.org/schema/p"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
http://www.springframework.org/schema/jdbc http://www.springframework.org/schema/jdbc/spring-jdbc-4.0.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
    <!--自动扫描-->
    <context:component-scan base-package="com.rxliuli.study.springtest"/>

    <jdbc:embedded-database id="dataSource" type="H2">
        <!--初始化 db-->
        <jdbc:script location="classpath:hsqldb/initDatabase.sql" encoding="UTF-8"/>
    </jdbc:embedded-database>

    <!--配置 Spring JdbcTemplate-->
    <bean class="org.springframework.jdbc.core.JdbcTemplate" id="jdbcTemplate"
          p:dataSource-ref="dataSource"/>
</beans>
```

接下来我们可以编写实体类 `com.rxliuli.study.springtest.entity.User`，dao 层 `com.rxliuli.study.springtest.dao.UserDao` 和 dao 对应的测试类 `com.rxliuli.study.springtest.dao.UserDaoTest`。

- User

```java
/**
 * @author rxliuli
 * @date 2018/7/31
 */
public class User {
    private Integer id;
    private String name;
    private Boolean sex;
    private Integer age;

    public User() {
    }

    public User(String name, Boolean sex, Integer age) {
        this.name = name;
        this.sex = sex;
        this.age = age;
    }

    public User(Integer id, String name, Boolean sex, Integer age) {
        this.id = id;
        this.name = name;
        this.sex = sex;
        this.age = age;
    }

    public Integer getId() {
        return id;
    }

    public User setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public User setName(String name) {
        this.name = name;
        return this;
    }

    public Boolean getSex() {
        return sex;
    }

    public User setSex(Boolean sex) {
        this.sex = sex;
        return this;
    }

    public Integer getAge() {
        return age;
    }

    public User setAge(Integer age) {
        this.age = age;
        return this;
    }
}
```

- UserDao

```java
/**
 * @author rxliuli
 * @date 2018/7/31
 */
@Repository
public class UserDao {
    private final RowMapper<User> userRowMapper = (rs, rowNum) -> new User(
            rs.getInt("id"),
            rs.getString("name"),
            rs.getBoolean("sex"),
            rs.getInt("age")
    );
    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * 根据 id 获取一个对象
     *
     * @param id id
     * @return 根据 id 查询到的对象，如果没有查到则为 null
     */
    public User get(Integer id) {
        return jdbcTemplate.queryForObject("select * from user where id = ?", userRowMapper, id);
    }

    /**
     * 查询全部用户
     *
     * @return 全部用户列表
     */
    public List<User> listForAll() {
        return jdbcTemplate.query("select * from user", userRowMapper);
    }
}
```

> 注：这里直接使用了 Dao 类，生产过程中最好使用接口。

- UserDaoTest

```java
/**
 * @author rxliuli
 * @date 2018/7/31
 */
public class UserDaoTest {
    private UserDao userDao;

    @Before
    public void before() {
        //使用 spring xml 配置文件初始化 ApplicationContext
        ApplicationContext context = new ClassPathXmlApplicationContext("classpath:/spring/spring-context.xml");
        //然后使用 ApplicationContext 获取 UserDao 的对象
        userDao = context.getBean(UserDao.class);
    }

    @Test
    public void get() {
        int id = 1;
        User result = userDao.get(id);
        //断言 id 和 get id 相同
        assertThat(result)
                .extracting(User::getId)
                .contains(id);
    }

    @Test
    public void listForAll() {
        List<User> userList = userDao.listForAll();
        //断言不为空
        assertThat(userList)
                .isNotEmpty();
    }
}
```

手动加载的基本思路就是：

- 先加载 ApplicationContext 初始化 Spring 环境
    注：这一步实际上就已经加载了 Spring 容器，并且使用 `initDatabase.sql` 初始化 h2 DB 了
- 使用 ApplicationContext 对象获得 UserDao 实例
- 调用被测试的方法
- 对结果进行断言

但这里实际上，ApplicationContext 是会被初始化两次的，所以会造成浪费和麻烦（例如初始化 sql 脚本也会被执行两次，当然这里吾辈先把 user 表删除后再创建的所以没事）。其实 Spring 早已想到了这一切，并为我们准备了解决方案。

使用 `SpringTest` 整合测试！  

### 使用注解自动加载 Spring 测试环境

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>4.3.14.RELEASE</version>
    <scope>test</scope>
</dependency>
```

使用 SpringTest 进行测试

```java
/**
 * @author rxliuli
 * @date 2018/7/31
 */
//加载 Spring 配置文件
@ContextConfiguration(locations = "classpath:/spring/spring-context.xml")
//使用 SpringJUnit4ClassRunner 来运行 test
@RunWith(SpringJUnit4ClassRunner.class)
public class UserDaoSpringTest {
    /**
     * 直接注入 UserDao 就好了
     */
    @Autowired
    private UserDao userDao;

    @Test
    public void get() {
        int id = 1;
        User result = userDao.get(id);
        //断言 id 和 get id 相同
        assertThat(result)
                .extracting(User::getId)
                .contains(id);
    }

    @Test
    public void listForAll() {
        List<User> userList = userDao.listForAll();
        //断言不为空
        assertThat(userList)
                .isNotEmpty();
    }
}
```

可以看到，这里我们甚至可以使用 Spring 的自动注入注解 `@Autowired` 了

当然，现在还有一个问题就是现在测试对数据库的影响是持久的，也就是说不能重复的测试。
例如删除了一个为 id 为 1 的用户，返回值应当是 1，但第二次删除时，因为 id 为 1 的用户已经不存在了，所以返回值是 0，然后就报错了 23333  

我们可以测试一下

1. 在 UserDao 中新增方法 `deleteById`

```java
/**
 * 根据 id 删除用户
 *
 * @param id 用户 id
 * @return 受影响行数
 */
public int deleteById(Integer id) {
    return jdbcTemplate.update("delete from user where id = ?", id);
}
```

然后在测试类 `UserDaoSpringTest` 中添加两个删除测试方法

```java
@Test
public void deleteById() {
    int result = userDao.deleteById(1);
    assertThat(result)
            .isGreaterThan(0);
}

@Test
public void deleteByIdForTransaction() {
    //这个仅仅是为了测试事物与自动回滚是否生效
    int result = userDao.deleteById(1);
    assertThat(result)
            .isGreaterThan(0);
}
```

然后运行测试类，你会得到一个错误

```java
java.lang.AssertionError:
Expecting:
 <0>
to be greater than:
 <0>
```

所以我们需要让所有测试的操作都不影响到数据库，即 **全局事物** + **默认回滚**。

首先需要在 `spring-context.xml` 中添加数据库事务管理的配置

```xml
<!--配置数据库事务并开启注解支持-->
<bean class="org.springframework.jdbc.datasource.DataSourceTransactionManager" id="dataSourceTransactionManager"
        p:dataSource-ref="dataSource"/>
<tx:annotation-driven transaction-manager="dataSourceTransactionManager"/>
```

在 `UserDaoSpringTest` 测试类上添加两个注解

```java
//为这个测试类开启事物
@Transactional
//默认回滚所有数据库操作
@Rollback
```

再次运行，一切便都正常了，是不是感觉很棒！但每个测试类头上都加那么一大堆注解也很麻烦，所以我们需要将之抽出一个父类直接继承就好了

以下是一个最简单的测试基类 `BaseTest`(common.test.BaseTest)

```java
/**
 * 简单的测试基类
 * <BaseBean> 需要自动注入的 Bean 类型
 *
 * @author rxliuli
 * @date 2018/7/31
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:/spring/spring-context*.xml")
@Transactional
@Rollback
public abstract class BaseTest<BaseBean> {
    /**
     * 自动注入的 Bean
     */
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private BaseBean base;
}
```

然后创建测试类 `UserDaoBaseTest`(com.rxliuli.study.springtest.dao.UserDaoBaseTest) 继承 `BaseTest` 进行测试

```java
/**
 * @author rxliuli
 * @date 2018/7/31
 */
public class UserDaoBaseTest extends BaseTest<UserDao> {
    @Test
    public void get() {
        int id = 1;
        User result = base.get(id);
        //断言 id 和 get id 相同
        assertThat(result)
                .extracting(User::getId)
                .contains(id);
    }

    @Test
    public void listForAll() {
        List<User> userList = base.listForAll();
        //断言不为空
        assertThat(userList)
                .isNotEmpty();
    }

    @Test
    public void deleteById() {
        int result = base.deleteById(1);
        assertThat(result)
                .isGreaterThan(0);
    }

    @Test
    public void deleteByIdForTransaction() {
        //这个仅仅是为了测试事物与自动回滚是否生效
        int result = base.deleteById(1);
        assertThat(result)
                .isGreaterThan(0);
    }
}
```

运行结果也是一切正常呢，对 Dao/Service 需要加载 Spring 容器的测试暂且到这里便结束了。。。

## Web 层测试

绝大部分时候，很多人喜欢写完代码就到前台页面直接看效果。但人眼是不一定准确的，而且可重复性/可靠性不足。如果是 API，大部分人或许会选择诸如 **Postman**, **IDEA HttpClient** 这一类的工具吧，但实际上，SpringTest 已经考虑到了对 Web 层的测试并集成了这些。

首先还是需要添加依赖

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>4.3.14.RELEASE</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-core</artifactId>
    <version>2.9.5</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.9.5</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-annotations</artifactId>
    <version>2.9.5</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.module</groupId>
    <artifactId>jackson-module-jaxb-annotations</artifactId>
    <version>2.9.5</version>
</dependency>
<!--json-path-assert 对 MockMvc response 中返回的 json 数据进行断言-->
<dependency>
    <groupId>com.jayway.jsonpath</groupId>
    <artifactId>json-path-assert</artifactId>
    <version>2.4.0</version>
    <scope>test</scope>
</dependency>
```

设置 maven 打包时为 `war`

```xml
<packaging>war</packaging>
```

添加配置文件 `spring/spring-mvc.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
    <!--配置支持注解并自动扫描-->
    <mvc:annotation-driven/>
    <context:component-scan base-package="com.rxliuli.study.springtest">
        <context:include-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
        <context:include-filter type="annotation" expression="org.springframework.web.bind.annotation.RestController"/>
    </context:component-scan>
</beans>
```

添加 web 的根目录 `/src/main/webapp` 并在 webapp 目录下创建 `web.xml`(WEB-INF/web.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">
    <!--context configLocation -->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath*:/spring/spring-context*.xml</param-value>
    </context-param>
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
    <listener>
        <listener-class>org.springframework.web.context.request.RequestContextListener</listener-class>
    </listener>

    <!--encoding filter-->
    <filter>
        <filter-name>encodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
        <init-param>
            <param-name>forceEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>encodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

    <!--MVC Servlet-->
    <servlet>
        <servlet-name>springServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath*:/spring/spring-mvc*.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>springServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```

至此，项目中便添加了 web 环境支持。

下面开始编写要测试的接口 `UserController`(com.rxliuli.study.springtest.web.UserController)

```java
/**
 * @author rxliuli
 * @date 2018/7/31
 */
@RestController
public class UserController {
    @Autowired
    private UserDao userDao;

    /**
     * 获取用户信息
     *
     * @param id 用户 id
     * @return 用户对象信息
     */
    @GetMapping("/user/{id}")
    public User get(@PathVariable("id") Integer id) {
        return userDao.get(id);
    }

    /**
     * 获取全部的用户列表
     *
     * @return 全部的用户列表
     */
    @PostMapping("/user/listForAll")
    public List<User> listForAll() {
        return userDao.listForAll();
    }
}
```

这时候启动 web 项目在浏览器中访问 `localhost:8080/{上下文}/user/1` 应当会得到一个 User 对象。
> 注：上下文 IDEA 默认为空，Eclipse 默认为项目名

然而测试却是有两种方法：

1. 独立安装测试  
  手动加载单个 Controller，所以测试其他 Controller 中的接口会发生异常。但测试速度上较快，所以应当优先选择。
2. 集成 Web 环境测试  
  将启动并且加载所有的 Controller, 所以效率上之于 BaseWebUnitTest 来说非常低下, 仅适用于集成测试多个 Controller 时使用。

### 独立安装测试

简单的独立安装测试类 `UserControllerUnitTest`(com.rxliuli.study.springtest.web.UserControllerUnitTest)

```java
/**
 * @author rxliuli
 * @date 2018/7/31
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:/spring/spring-*.xml")
@Transactional
@Rollback
@WebAppConfiguration
public class UserControllerUnitTest {
    @Autowired
    private UserController userController;
    /**
     * 用于测试 API 的模拟请求对象
     */
    private MockMvc mockMvc;

    @Before
    public void before() {
        //模拟一个 Mvc 测试环境，获取一个 MockMvc 实例
        mockMvc = MockMvcBuilders.standaloneSetup(userController)
                .build();
    }

    @Test
    public void testGet() throws Exception {
        //测试能够正常获取
        Integer id = 1;
        mockMvc.perform(
                //发起 get 请求
                get("/user/" + id)
        )
                //断言请求的状态是成功的(200)
                .andExpect(status().isOk())
                //断言返回对象的 id 和请求的 id 相同
                .andExpect(jsonPath("$.id").value(id));
    }

    @Test
    public void listForAll() throws Exception {
        //测试正常获取
        mockMvc.perform(
                //发起 post 请求
                post("/user/listForAll")
        )
                //断言请求状态
                .andExpect(status().isOk())
                //断言返回结果是数组
                .andExpect(jsonPath("$").isArray())
                //断言返回数组不是空的
                .andExpect(jsonPath("$").isNotEmpty());
    }
}
```

### 集成 Web 环境测试

简单的独立安装测试类 `UserControllerIntegratedTest`(com.rxliuli.study.springtest.web.UserControllerIntegratedTest)

```java
/**
 * @author rxliuli
 * @date 2018/7/31
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:/spring/spring-*.xml")
@Transactional
@Rollback
@WebAppConfiguration
public class UserControllerIntegratedTest {
    @Autowired
    private WebApplicationContext context;
    /**
     * 用于测试 API 的模拟请求对象
     */
    private MockMvc mockMvc;

    @Before
    public void before() {
        //这里把整个 WebApplicationContext 上下文都丢进去了，所以可以测试所有的 Controller
        mockMvc = MockMvcBuilders.webAppContextSetup(context)
                .build();
    }

    @Test
    public void testGet() throws Exception {
        //测试能够正常获取
        Integer id = 1;
        mockMvc.perform(
                //发起 get 请求
                get("/user/" + id)
        )
                //断言请求的状态是成功的(200)
                .andExpect(status().isOk())
                //断言返回对象的 id 和请求的 id 相同
                .andExpect(jsonPath("$.id").value(id));
    }

    @Test
    public void listForAll() throws Exception {
        //测试正常获取
        mockMvc.perform(
                //发起 post 请求
                post("/user/listForAll")
        )
                //断言请求状态
                .andExpect(status().isOk())
                //断言返回结果是数组
                .andExpect(jsonPath("$").isArray())
                //断言返回数组不是空的
                .andExpect(jsonPath("$").isNotEmpty());
    }
}
```

---

其实从上面可以看出来主要就是获得 MockMvc 的方式不同，所以其实也可以抽出来公共的测试父类。这里就不再赘述，具体的做法可以参考 [测试基类](https://github.com/rxliuli/springtest/tree/master/src/test/java/common)

那么，有关使用 Spring 进行测试的问题就像说到这里啦

> 附：用了 SpringBoot 之后才觉得 Spring 的各种配置好麻烦。。。