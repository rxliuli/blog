---
title: MySQL 获取随机条数据
date: 2018-11-10 10:55:27
tags: [DB, MySQL]
---

# MySQL 获取随机条数据

## 场景

有一个需要从数据库随机获取指定数量的数据的需求，然而这个问题却是意外的挺麻烦。

假设有一个数据表

```sql
create table topic (
  id      int primary key not null
  comment '编号',
  content varchar(20)     not null
  comment '内容'
)
  comment '主题表';
```

## 解决方案 1：直接使用 `order by rand()`

直接使用 `order by rand()` 就可以获取到随机的数据了，而且能够获取到全部的数据（顺序仍然是随机的）。

1. 按照 `rand()` 产生的结果
    > 这一步相当于为每条数据加上一列由 `rand()` 函数产生的数据，然后对这一列进行排序
2. 限制查询条数

```sql
select *
from topic
order by rand()
limit 50000;
```

但缺点很明显，速度是个问题，因为 rand() 的数据没有索引，所以会造成排序速度极慢。

在 10w 条数据中随机获取 5w 条数据，花费时常 **6 s 378 ms**，这个时间真的太长了点。

其实 `order by rand()` 看起来很奇怪，实际上等效于：

```sql
select *
from (
       select
         topic.*,
         rand() as order_column
       from topic
     ) as temp
order by order_column
limit 50000;
```

## 解决方案 2：使用 where 取中间的随机值

因为 `order by rand()` 没有索引导致的排序太耗时，我们可以尝试绕过这个问题。

下面的这种解决方案便是如此

1. 取最小值和最大值之间的随机值
2. 判断 id 是否大于（或者小于）这个随机值
3. 限制查询条数

```sql
select *
from topic
where id <= ((select max(id)
              from topic)
             - (select min(id)
                from topic))
            * rand()
            + (select min(id)
               from topic)
limit 50000;
```

这种方法查询速度虽然极快（150 ms），但却会受到数据分布密度的影响。如果数据不是平均的，那么查询到的总数据条数就会受限。

例如数据分布呈以下情况

`1,100002,100003,100004...199999,200000`

那么使用上述代码就只能获取到很少一部分数据（大约在 2.5w 条左右）。然而如果将符号稍微下改一下，将 `>=` 修改为 `<=`，那么能够获取到的平均数量将大大增加（7.5w 条左右）。

```sql
select *
from topic
# 注意：这里的符号修改了
where id >= ((select max(id)
              from topic)
             - (select min(id)
                from topic))
            * rand()
            + (select min(id)
               from topic)
limit 50000;
```

密度越是趋于平均，获取到的最大随机数据条数的平均值愈接近 `1/2`，否则则会愈加偏离（不一定偏大还是偏小）。

## 对比

| 不同点                 | `order by rand()` | `where`    |
| ---------------------- | ----------------- | ---------- |
| 可以随机获取全部       | 可以              | 几乎不可能 |
| 速度                   | 慢                | 极快       |
| 需要可比较的主键类型   | 否                | 是         |
| 受数据分布密度影响     | 否                | 是         |
| 速度受表数据复杂度影响 | 很大              | 较小       |

那么，看完上面的不同点对比，我们也可以得出它们的使用场景了

- 如果我们只需要获取很少的数据而主键恰好又是可以进行比较的类型，那么就使用 `where` 会更好（**推荐首选**）
- 如果你需要随机获取很多的数据，甚至是打乱全部的数据，那么你也可以使用 `order by rand()` 来打乱顺序

> 注：如果仅仅只是需要打乱数据顺序的话还是更推荐将数据读取到内存中在进行操作更好！
