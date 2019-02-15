---
layout: post
title: Java8 函数式功能速查
date: 2019-02-15 14:40:39
tags: [Java]
---

# Java8 函数式功能速查

## 场景

有时候使用 `lambda` 参数的时候忘记应该接口的名字，所以便在此写一下 Java
`function` 包下原生的 `lambda` 接口。

## lambda 接口

| class            | 参数    | 返回值    | 示例                            | 应用场景     |
| ---------------- | ------- | --------- | ------------------------------- | ------------ |
| `Function`       | `<T>`   | `<R>`     | `Stream` 中的 `map/flatMap`     | 映射         |
| `Consumer`       | `<T>`   | `void`    | `Stream` 中的 `forEach/peek`    | 迭代         |
| `Predicate`      | `<T>`   | `boolean` | `Stream` 中的 `filter/anyMatch` | 过滤         |
| `Supplier`       |         | `<R>`     | `Stream` 中的 `generate`        | 生成         |
| `BiFunction`     | `<U,T>` | `<T>`     | `Stream` 中的 `reduce`          | 归纳         |
| `UnaryOperator`  | `<T>`   | `<T>`     | `Stream` 中的 `iterate`         | 映射相同类型 |
| `BinaryOperator` | `<T,T>` | `<T>`     | `Stream` 中的 `reduce`          | 归纳相同类型 |
| `Comparator`     | `<T,T>` | `<U>`     | `Stream` 中的 `sort`            | 比较         |

## Stream 流

Stream 流为我们提供了一种简单的操作集合的方式，每个操作都具有原子性。

| function         | 参数                    | 返回值        | 功能                            |
| ---------------- | ----------------------- | ------------- | ------------------------------- |
| `filter`         | `Predicate<T>`          | `Stream<T>`   | 过滤                            |
| `map`            | `Function<T,T>`         | `Stream<T>`   | 映射                            |
| `flatMap`        | `Function<T,Stream<T>>` | `Stream<T>`   | 压平映射                        |
| `distinct`       |                         | `Stream<T>`   | 去重                            |
| `sorted`         |                         | `Stream<T>`   | 排序, 要求 `T` 实现 `Closeable` |
| `sorted`         | `Comparator<T>`         | `Stream<T>`   | 排序                            |
| `peek`           | `Consumer<T>`           | `Stream<T>`   | 迭代，但有返回值                |
| `limit`          | `long`                  | `Stream<T>`   | 限制数量                        |
| `skip`           | `long`                  | `Stream<T>`   | 从开头丢弃指定数量的元素        |
| `forEach`        | `Consumer<T>`           | `void`        | 迭代                            |
| `forEachOrdered` | `Consumer<T>`           | `void`        | 保证顺序的迭代                  |
| `toArray`        |                         | `Object[]`    | 转换为数组                      |
| `toArray`        | `IntFunction<T[]>`      | `T[]`         | 转换为指定类型的数组            |
| `reduce`         | `BinaryOperator<T>`     | `Optional<T>` | 归纳为一个元素                  |
| `collect`        | `Collector<T,A,R>`      | `R`           | 将结果归集                      |
| `min`            | `Comparator<T>`         | `Optional<T>` | 最小值                          |
| `max`            | `Comparator<T>`         | `Optional<T>` | 最大值                          |
| `count`          |                         | `long`        | 长度                            |
| `anyMatch`       | `Predicate<T>`          | `boolean`     | 是否存在匹配的元素              |
| `allMatch`       | `Predicate<T>`          | `boolean`     | 是否所有元素都匹配              |
| `noneMatch`      | `Predicate<T>`          | `boolean`     | 是否所有元素都不匹配            |
| `findFirst`      |                         | `Optional<T>` | 查找第一个元素                  |
| `findAny`        |                         | `Optional<T>` | 查找任意一个元素                |
| `empty`          |                         | `Stream<T>`   | 获取一个空的流                  |
| `of`             | `T...`                  | `Stream<T>`   | 将多个元素构造为流              |
| `iterate`        | `T,UnaryOperator<T>`    | `Stream<T>`   | 构造无限有序流                  |
| `generate`       | `Supplier`              | `Stream<T>`   | 构造无限无序流                  |
| `concat`         | `Stream<T>,Stream<T>`   | `Stream<T>`   | 连接两个流                      |

## Collectors
