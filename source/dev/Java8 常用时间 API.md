# Java8 常用时间 API

## 简介

Java8 面世以来已经 6 年了，许多人也开始使用起了 `lambda`,`Stream<T>`,`Optional<T>` 之类的新的语言特性，然而对于 Java8 提供的新的时间 `API` 虽然据说比旧版本的 `Date` 好很多，但并没有得到完全的使用。一方面是为了兼容旧的系统，另一方面 Java8 的时间 API 似乎太过于强大了，让人有些不知所措，不知道应该从何下手。再加上因为对 `Date`,`Calendar` 的熟悉，此消彼长之下自然是懒得去修改了。

其实对于新的时间 API，大致的基本需求是一样的

- 创建/修改/比较简单
- 对遗留系统的时间可以集成/转换
- 主流框架对其要有支持
- 线程安全/不可变

## 常用的类

- [LocalDate](#LocalDate)：日期的不可变类
- [LocalTime](#LocalTime)：时间的不可变类
- [LocalDateTime](#LocalDateTime)：日期时间的不可变类
- [OffsetDateTime](#OffsetDateTime)：偏移标准 UTC 时间的日期时间不可变类
- [Period](#Period)：计算两个日期的差值
- [Duration](#Duration)：通用的计算时间
- [TemporalField/ChronoField](#TemporalField/ChronoField)：时间的单位
- [TemporalUnit/ChronoUnit](#TemporalUnit/ChronoUnit)：根据指定的单位计算时间
- [DateTimeFormatter](#DateTimeFormatter)：时间格式化

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

一个不可变的（线程安全）的时间对象，用于表示 *时：分：秒：毫秒* 的时间，默认 `toString()` 格式是 `hh:mm:ss.SSS`。

基本操作

```java
//获得当前时间
final LocalTime now = LocalTime.now();
//默认格式 hh:mm:ss.SSS
System.out.println("现在：" + now);
//一个小时后的时间
final LocalTime localTimePlusHourOne = now.plusHours(1);
System.out.println("一小时后：" + localTimePlusHourOne);
//一分钟前的时间
final LocalTime localTimeMinusMinuteOne = now.minusMinutes(1);
System.out.println(localTimeMinusMinuteOne);
//比较时间大小（实现了 Comparable 接口）
final int nowEvenBigger = now.compareTo(localTimeMinusMinuteOne);
System.out.println("当前时间更大么？" + nowEvenBigger);
//获取指定单位的时间
//当前小时数
final int hour = now.getHour();
System.out.println("当前时间的小时数：" + hour);
//使用枚举类 ChronoField 获取
final int hourOfDay = now.get(ChronoField.HOUR_OF_DAY);
System.out.println("当前时间的小时数（通过 get() 获取）：" + hourOfDay);
//比较两个日期的差值
final long between = ChronoUnit.HOURS.between(now, localTimePlusHourOne);
System.out.println(between);
```

## LocalDateTime

不可变的日期时间对象，用于表示 *日-月-年 时：分：秒：毫秒* 的日期时间，默认格式化格式是 `yyyy-MM-ddThh:mm:ss.SSS`。

基本操作

```java
//当前日期时间
final LocalDateTime now = LocalDateTime.now();
//默认格式 yyyy-MM-ddThh:mm:ss.SSS
System.out.println("现在：" + now);
//一个小时后的时间
final LocalDateTime localTimePlusHourOne = now.plusHours(1);
System.out.println("一小时后：" + localTimePlusHourOne);
//一分钟前的时间
final LocalDateTime localTimeMinusMinuteOne = now.minusMinutes(1);
System.out.println(localTimeMinusMinuteOne);
//比较时间大小（实现了 Comparable 接口）
final int nowEvenBigger = now.compareTo(localTimeMinusMinuteOne);
System.out.println("当前时间更大么？" + nowEvenBigger);
//获取指定单位的时间
//当前小时数
final int hour = now.getHour();
System.out.println("当前时间的小时数：" + hour);
//使用枚举类 ChronoField 获取
final int hourOfDay = now.get(ChronoField.HOUR_OF_DAY);
System.out.println("当前时间的小时数（通过 get() 获取）：" + hourOfDay);
//比较两个日期的差值
final long between = ChronoUnit.HOURS.between(now, localTimePlusHourOne);
System.out.println(between);
```

可以看到，和上面的 [LocalTime](#LocalTime) 除了类型不同外，代码是完全相同的，因为 [LocalDateTime](#LocalDateTime) 是包含 [LocalDate](#LocalDate) 与 [LocalTime](#LocalTime) 的。在源码中也可以看到其包含了两个属性。

```java
//获取日期/时间对象
final LocalDate localDate = now.toLocalDate();
final LocalTime localTime = now.toLocalTime();
System.out.println("当前日期：" + localDate);
System.out.println("当前时间：" + localTime);
```

## OffsetDateTime

代表偏移标准 UTC 时间的日期时间不可变对象，用于表示 *日-月-年 时：分：秒：毫秒时区*，默认格式是 `yyyy-MM-ddThh:mm:ss.SSSZoneId`

基本操作

```java
//当前偏移的日期时间
final OffsetDateTime now = OffsetDateTime.now();
System.out.println(now);
//其实个人感觉就是多了一个时区
//获取到时区
ZoneId zone = now.toZonedDateTime().getZone();
System.out.println(zone);
//转换时区
ZonedDateTime zonedDateTime = now.atZoneSameInstant(ZoneId.of("+00:00"));
System.out.println(zonedDateTime);
//其他基本操作和上面的差不多，就不啰嗦啦
```