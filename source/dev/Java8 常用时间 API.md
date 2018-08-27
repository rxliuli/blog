# Java8 常用时间 API

Java8 面世以来已经 6 年了，许多人也开始使用起了 `lambda`,`Stream<T>`,`Optional<T>` 之类的新的语言特性，然而对于 Java8 提供的新的时间 `API` 虽然据说比旧版本的 `Date` 好很多，但并没有得到完全的使用。一方面是为了兼容旧的系统，另一方面 Java8 的时间 API 似乎太过于强大了，让人有些不知所措，不知道应该从何下手。再加上因为对 `Date`,`Calendar` 的了解，此消彼长之下自然是懒得去修改了。

其实对于新的时间 API，大致的基本需求是一样的

- 创建的时候不麻烦
- 修改的时候不麻烦
- 线程安全
- 对遗留系统可以集成/转换
- 对主流框架要有支持

## 常用的类

- [LocalDate](#LocalDate)：代表日期的不可变类
- [LocalTime](#LocalTime)：代表时间的不可变类
- [LocalDateTime](#LocalDateTime)：代表日期时间的不可变类
- [OffsetDateTime](#OffsetDateTime)：代表距离 1970 年的偏移时间，精确到纳秒
- [Period](#Period)：计算两个日期的差值
- [Duration](#Duration)：计算两个日期时间的差值
- [ChronoUnit](#ChronoUnit)：根据某个单位计算两个日期时间的差值
- [TemporalUnit](#TemporalUnit)/[ChronoUnit](#ChronoUnit)：时间的单位

## LocalDate
