---
layout: post
title: Java 优雅的拷贝对象属性
abbrlink: b66b7639
date: 2019-02-27 14:20:04
updated: 2019-02-27
tags: [Java, 教程]
---

# Java 优雅的拷贝对象属性

## 场景

在 Java 项目中，经常遇到需要在对象之间拷贝属性的问题。然而，除了直接使用 `Getter/Stter` 方法，我们还有其他的方法么？  
当然有，例如 `Apache Common Lang3` 的 `BeanUtils`，然而 `BeanUtils` 却无法完全满足吾辈的需求，所以吾辈便自己封装了一个，这里分享出来以供参考。

- 需要大量复制对象的属性
- 对象之间的属性名可能是不同的
- 对象之间的属性类型可能是不同的

## 目标

简单易用的 API

- `copy`: 指定需要拷贝的源对象和目标对象
- `prop`: 拷贝指定对象的字段
- `props`: 拷贝指定对象的多个字段
- `exec`: 执行真正的拷贝操作
- `from`: 重新开始添加其他对象的属性
- `get`: 返回当前的目标对象
- `config`: 配置拷贝的一些策略

## 思路

1. 定义门面类 `BeanCopyUtil` 用以暴露出一些 API
2. 定义每个字段的操作类 `BeanCopyField`，保存对每个字段的操作
3. 定义 `BeanCopyConfig`，用于配置拷贝属性的策略
4. 定义 `BeanCopyOperator` 作为拷贝的真正实现

图解

![图解](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20190227215703.png)

## 实现

> 注：反射部分依赖于 [joor](https://github.com/jOOQ/jOOR), JDK1.8 请使用 [joor-java-8](https://mvnrepository.com/artifact/org.jooq/joor-java-8/0.9.7)

### 定义门面类 `BeanCopyUtil` 用以暴露出一些 API

```java
/**
 * java bean 复制操作的工具类
 *
 * @author rxliuli
 */
public class BeanCopyUtil<F, T> {
    /**
     * 源对象
     */
    private final F from;
    /**
     * 目标对象
     */
    private final T to;
    /**
     * 拷贝的字段信息列表
     */
    private final List<BeanCopyField> copyFieldList = new LinkedList<>();
    /**
     * 配置信息
     */
    private BeanCopyConfig config = new BeanCopyConfig();

    private BeanCopyUtil(F from, T to) {
        this.from = from;
        this.to = to;
    }

    /**
     * 指定需要拷贝的源对象和目标对象
     *
     * @param from 源对象
     * @param to   目标对象
     * @param <F>  源对象类型
     * @param <T>  目标对象类型
     * @return 一个 {@link BeanCopyUtil} 对象
     */
    public static <F, T> BeanCopyUtil<F, T> copy(F from, T to) {
        return new BeanCopyUtil<>(from, to);
    }

    /**
     * 拷贝指定对象的字段
     *
     * @param fromField 源对象中的字段名
     * @param toField   目标对象中的字段名
     * @param converter 将源对象中字段转换为目标对象字段类型的转换器
     * @return 返回 {@code this}
     */
    public BeanCopyUtil<F, T> prop(String fromField, String toField, Function<? super Object, ? super Object> converter) {
        copyFieldList.add(new BeanCopyField(fromField, toField, converter));
        return this;
    }

    /**
     * 拷贝指定对象的字段
     *
     * @param fromField 源对象中的字段名
     * @param toField   目标对象中的字段名
     * @return 返回 {@code this}
     */
    public BeanCopyUtil<F, T> prop(String fromField, String toField) {
        return prop(fromField, toField, null);
    }

    /**
     * 拷贝指定对象的字段
     *
     * @param field     源对象中与目标对象中的字段名
     * @param converter 将源对象中字段转换为目标对象字段类型的转换器
     * @return 返回 {@code this}
     */
    public BeanCopyUtil<F, T> prop(String field, Function<? super Object, ? super Object> converter) {
        return prop(field, field, converter);
    }

    /**
     * 拷贝指定对象的字段
     *
     * @param field 源对象中与目标对象中的字段名
     * @return 返回 {@code this}
     */
    public BeanCopyUtil<F, T> prop(String field) {
        return prop(field, field, null);
    }

    /**
     * 拷贝指定对象的多个字段
     *
     * @param fields 源对象中与目标对象中的多个字段名
     * @return 返回 {@code this}
     */
    public BeanCopyUtil<F, T> props(String... fields) {
        for (String field : fields) {
            prop(field);
        }
        return this;
    }

    /**
     * 执行真正的拷贝操作
     *
     * @return 返回 {@code this}
     */
    public BeanCopyUtil<F, T> exec() {
        new BeanCopyOperator<>(from, to, copyFieldList, config).copy();
        return this;
    }

    /**
     * 重新开始添加其他对象的属性
     * 用于在执行完 {@link #exec()} 之后还想复制其它对象的属性
     *
     * @param from 源对象
     * @param <R>  源对象类型
     * @return 一个新的 {@link BeanCopyUtil} 对象
     */
    public <R> BeanCopyUtil<R, T> from(R from) {
        return new BeanCopyUtil<>(from, to);
    }

    /**
     * 返回当前的目标对象
     *
     * @return 当前的目标对象
     */
    public T get() {
        return to;
    }

    /**
     * 配置拷贝的一些策略
     *
     * @param config 拷贝配置对象
     * @return 返回 {@code this}
     */
    public BeanCopyUtil<F, T> config(BeanCopyConfig config) {
        this.config = config;
        return this;
    }
}
```

### 定义每个字段的操作类 `BeanCopyField`，保存对每个字段的操作

```java
/**
 * 拷贝属性的每一个字段的选项
 *
 * @author rxliuli
 */
public class BeanCopyField {
    private String from;
    private String to;
    private Function<? super Object, ? super Object> converter;

    public BeanCopyField() {
    }

    public BeanCopyField(String from, String to, Function<? super Object, ? super Object> converter) {
        this.from = from;
        this.to = to;
        this.converter = converter;
    }

    public String getFrom() {
        return from;
    }

    public BeanCopyField setFrom(String from) {
        this.from = from;
        return this;
    }

    public String getTo() {
        return to;
    }

    public BeanCopyField setTo(String to) {
        this.to = to;
        return this;
    }

    public Function<? super Object, ? super Object> getConverter() {
        return converter;
    }

    public BeanCopyField setConverter(Function<? super Object, ? super Object> converter) {
        this.converter = converter;
        return this;
    }
}
```

### 定义 `BeanCopyConfig`，用于配置拷贝属性的策略

```java
/**
 * 拷贝属性的配置
 *
 * @author rxliuli
 */
public class BeanCopyConfig {
    /**
     * 同名的字段自动复制
     */
    private boolean same = true;
    /**
     * 覆盖同名的字段
     */
    private boolean override = true;
    /**
     * 忽略 {@code null} 的源对象属性
     */
    private boolean ignoreNull = true;
    /**
     * 尝试进行自动转换
     */
    private boolean converter = true;

    public BeanCopyConfig() {
    }

    public BeanCopyConfig(boolean same, boolean override, boolean ignoreNull, boolean converter) {
        this.same = same;
        this.override = override;
        this.ignoreNull = ignoreNull;
        this.converter = converter;
    }

    public boolean isSame() {
        return same;
    }

    public BeanCopyConfig setSame(boolean same) {
        this.same = same;
        return this;
    }

    public boolean isOverride() {
        return override;
    }

    public BeanCopyConfig setOverride(boolean override) {
        this.override = override;
        return this;
    }

    public boolean isIgnoreNull() {
        return ignoreNull;
    }

    public BeanCopyConfig setIgnoreNull(boolean ignoreNull) {
        this.ignoreNull = ignoreNull;
        return this;
    }

    public boolean isConverter() {
        return converter;
    }

    public BeanCopyConfig setConverter(boolean converter) {
        this.converter = converter;
        return this;
    }
}
```

### 定义 `BeanCopyOperator` 作为拷贝的真正实现

```java
/**
 * 真正执行 copy 属性的类
 *
 * @author rxliuli
 */
public class BeanCopyOperator<F, T> {
    private static final Logger log = LoggerFactory.getLogger(BeanCopyUtil.class);
    private final F from;
    private final T to;
    private final BeanCopyConfig config;
    private List<BeanCopyField> copyFieldList;

    public BeanCopyOperator(F from, T to, List<BeanCopyField> copyFieldList, BeanCopyConfig config) {
        this.from = from;
        this.to = to;
        this.copyFieldList = copyFieldList;
        this.config = config;
    }

    public void copy() {
        //获取到两个对象所有的属性
        final Map<String, Reflect> fromFields = Reflect.on(from).fields();
        final Reflect to = Reflect.on(this.to);
        final Map<String, Reflect> toFields = to.fields();
        //过滤出所有相同字段名的字段并进行拷贝
        if (config.isSame()) {
            final Map<ListUtil.ListDiffState, List<String>> different = ListUtil.different(new ArrayList<>(fromFields.keySet()), new ArrayList<>(toFields.keySet()));
            copyFieldList = Stream.concat(different.get(ListUtil.ListDiffState.common).stream()
                    .map(s -> new BeanCopyField(s, s, null)), copyFieldList.stream())
                    .collect(Collectors.toList());
        }
        //根据拷贝字段列表进行拷贝
        copyFieldList.stream()
                //忽略空值
                .filter(beanCopyField -> !config.isIgnoreNull() || fromFields.get(beanCopyField.getFrom()).get() != null)
                //覆盖属性
                .filter(beanCopyField -> config.isOverride() || toFields.get(beanCopyField.getTo()).get() == null)
                //如果没有转换器，则使用默认的转换器
                .peek(beanCopyField -> {
                    if (beanCopyField.getConverter() == null) {
                        beanCopyField.setConverter(Function.identity());
                    }
                })
                .forEach(beanCopyField -> {
                    final String fromField = beanCopyField.getFrom();
                    final F from = fromFields.get(fromField).get();
                    final String toField = beanCopyField.getTo();
                    try {
                        to.set(toField, beanCopyField.getConverter().apply(from));
                    } catch (ReflectException e) {
                        log.warn("Copy field failed, from {} to {}, exception is {}", fromField, toField, e.getMessage());
                    }
                });
    }
}
```

## 使用

### 使用流程图

![使用流程图](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20190228000845.png)

### 测试

代码写完了，让我们测试一下！

```java
public class BeanCopyUtilTest {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private Student student;
    private Teacher teacher;

    @Before
    public void before() {
        student = new Student("琉璃", 10, "女", 4);
        teacher = new Teacher();
    }

    @Test
    public void copy() {
        //简单的复制（类似于 BeanUtils.copyProperties）
        BeanCopyUtil.copy(student, teacher).exec();
        log.info("teacher: {}", teacher);
        assertThat(teacher)
                .extracting("age")
                .containsOnlyOnce(student.getAge());
    }

    @Test
    public void prop() {
        //不同名字的属性
        BeanCopyUtil.copy(student, teacher)
                .prop("sex", "sex", sex -> Objects.equals(sex, "男"))
                .prop("realname", "name")
                .exec();
        assertThat(teacher)
                .extracting("name", "age", "sex")
                .containsOnlyOnce(student.getRealname(), student.getAge(), false);
    }

    @Test
    public void prop1() {
        //不存的属性
        assertThat(BeanCopyUtil.copy(student, teacher)
                .prop("sex", "sex", sex -> Objects.equals(sex, "男"))
                .prop("realname", "name2")
                .exec()
                .get())
                .extracting("age", "sex")
                .containsOnlyOnce(student.getAge(), false);
    }

    @Test
    public void from() {
        final Teacher lingMeng = new Teacher()
                .setName("灵梦")
                .setAge(17);
        //测试 from 是否覆盖
        assertThat(BeanCopyUtil.copy(student, teacher)
                .prop("sex", "sex", sex -> Objects.equals(sex, "男"))
                .prop("realname", "name")
                .exec()
                .from(lingMeng)
                .exec()
                .get())
                .extracting("name", "age", "sex")
                .containsOnlyOnce(lingMeng.getName(), lingMeng.getAge(), false);
    }

    @Test
    public void get() {
        //测试 get 是否有效
        assertThat(BeanCopyUtil.copy(student, teacher)
                .prop("sex", "sex", sex -> Objects.equals(sex, "男"))
                .prop("realname", "name")
                .exec()
                .get())
                .extracting("name", "age", "sex")
                .containsOnlyOnce(student.getRealname(), student.getAge(), false);
    }

    @Test
    public void config() {
        //不自动复制同名属性
        assertThat(BeanCopyUtil.copy(new Student().setAge(15), new Teacher())
                .config(new BeanCopyConfig().setSame(false))
                .exec()
                .get())
                .extracting("age")
                .containsOnlyNulls();
        //不覆盖不为空的属性
        assertThat(BeanCopyUtil.copy(new Student().setAge(15), new Teacher().setAge(10))
                .config(new BeanCopyConfig().setOverride(false))
                .exec()
                .get())
                .extracting("age")
                .containsOnlyOnce(10);
        //不忽略源对象不为空的属性
        assertThat(BeanCopyUtil.copy(new Student(), student)
                .config(new BeanCopyConfig().setIgnoreNull(false))
                .exec()
                .get())
                .extracting("realname", "age", "sex", "grade")
                .containsOnlyNulls();
    }

    /**
     * 测试学生类
     */
    private static class Student {
        /**
         * 姓名
         */
        private String realname;
        /**
         * 年龄
         */
        private Integer age;
        /**
         * 性别，男/女
         */
        private String sex;
        /**
         * 年级，1 - 6
         */
        private Integer grade;

        public Student() {
        }

        public Student(String realname, Integer age, String sex, Integer grade) {
            this.realname = realname;
            this.age = age;
            this.sex = sex;
            this.grade = grade;
        }

        public String getRealname() {

            return realname;
        }

        public Student setRealname(String realname) {
            this.realname = realname;
            return this;
        }

        public Integer getAge() {
            return age;
        }

        public Student setAge(Integer age) {
            this.age = age;
            return this;
        }

        public String getSex() {
            return sex;
        }

        public Student setSex(String sex) {
            this.sex = sex;
            return this;
        }

        public Integer getGrade() {
            return grade;
        }

        public Student setGrade(Integer grade) {
            this.grade = grade;
            return this;
        }

        @Override
        public String toString() {
            return ToStringBuilder.reflectionToString(this);
        }
    }

    /**
     * 测试教师类
     */
    private static class Teacher {
        /**
         * 姓名
         */
        private String name;
        /**
         * 年龄
         */
        private Integer age;
        /**
         * 性别，true 男，false 女
         */
        private Boolean sex;
        /**
         * 职位
         */
        private String post;

        public Teacher() {
        }

        public Teacher(String name, Integer age, Boolean sex, String post) {
            this.name = name;
            this.age = age;
            this.sex = sex;
            this.post = post;
        }

        public String getName() {
            return name;
        }

        public Teacher setName(String name) {
            this.name = name;
            return this;
        }

        public Integer getAge() {
            return age;
        }

        public Teacher setAge(Integer age) {
            this.age = age;
            return this;
        }

        public Boolean getSex() {
            return sex;
        }

        public Teacher setSex(Boolean sex) {
            this.sex = sex;
            return this;
        }

        public String getPost() {
            return post;
        }

        public Teacher setPost(String post) {
            this.post = post;
            return this;
        }

        @Override
        public String toString() {
            return ToStringBuilder.reflectionToString(this);
        }
    }
}
```

如果没有发生什么意外，那么一切将能够正常运行！

---

好了，那么关于在 Java 中优雅的拷贝对象属性就到这里啦
