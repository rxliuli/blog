# Java8 常用时间 API

Java8 面世以来已经 6 年了，许多人也开始使用起了 `lambda`,`Stream<T>`,`Optional<T>` 之类的新的语言特性，然而对于 Java8 提供的新的时间 `API` 虽然据说比旧版本的 `Date` 好很多，但并没有得到完全的使用。一方面是为了兼容旧的系统，另一方面 Java8 的时间 API 似乎太过于强大了，让人有些不知所措，不知道应该从何下手。再加上因为对 `Date`,`Calendar` 的了解，此消彼长之下自然是懒得去修改了。

其实对于新的时间 API，大致的基本需求是一样的

- 创建/修改/比较简单
- 对遗留系统的时间可以集成/转换
- 主流框架对其要有支持
- 线程安全

## 常用的类

- [LocalDate](#LocalDate)：日期的不可变类
- [LocalTime](#LocalTime)：时间的不可变类
- [LocalDateTime](#LocalDateTime)：日期时间的不可变类
- [OffsetDateTime](#OffsetDateTime)：距离 1970 年的偏移时间，精确到纳秒
- [Period](#Period)：计算两个日期的差值
- [Duration](#Duration)：计算两个日期时间的差值
- [TemporalField/ChronoField](#TemporalField/ChronoField)：时间的单位
- [TemporalUnit/ChronoUnit](#TemporalUnit/ChronoUnit)：根据指定的单位计算时间

## LocalDate

一个不可变（线程安全）的日期对象，用且表示 *年-月-日* 的时间，默认 `toString()` 格式是 `yyyy-MM-dd`。

基本操作

```java
//获取当前的日期
final LocalDate now = LocalDate.now();
//toString 一下日期
//会得到 yyyy-MM-dd 格式
System.out.println("现在：" + now);
//1 天后的日期
final LocalDate localDatePlusDayOne = now.plusDays(1);
System.out.println("一天后：" + localDatePlusDayOne);
//一天前的日期
final LocalDate localDateMinusDayOne = now.minusDays(1);
System.out.println("一天前：" + localDateMinusDayOne);
//比较两个日期/时间的大小
final int nowEvenBigger = now.compareTo(localDatePlusDayOne);
System.out.println("当前时间更大么？" + nowEvenBigger);
//获取指定单位的日期（年/月/日/星期）
//获取当前月的时间
final int dayOfMonth = now.getDayOfMonth();
System.out.println("当前月的天数：" + dayOfMonth);
//更加通用获取方式
//使用枚举类 ChronoField
final int dayOfMonthForChronoField = now.get(ChronoField.DAY_OF_MONTH);
System.out.println("当前月的天数（通过 get() 获取）：" + dayOfMonthForChronoField);
//比较两个日期的差值
final long between = ChronoUnit.DAYS.between(now, localDatePlusDayOne);
System.out.println(between);
```

上面有些地方看不太懂不碍事，先过一遍，下面对其中的部分代码会有解释

## LocalTime

一个不可变的（线程安全）的时间对象，用于表示 *时：分：秒* 的时间，默认 `toString()` 格式是 `hh:mm:ss`。

基本操作

```java
final LocalTime now = LocalTime.now();

```