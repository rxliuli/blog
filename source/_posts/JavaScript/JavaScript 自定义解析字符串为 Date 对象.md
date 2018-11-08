---
title: JavaScript 自定义解析字符串为 Date 对象
date: 2018-06-27 01:39:21
tags: JavaScript
---

# JavaScript 自定义解析字符串为 Date 对象

这两天在 JavaScript 遇到需要根据自定义的格式创建 `Date` 对象的情况，所以就没多想写个了解析方法。

基本思路是将非标准的日期字符串转换为标准的日期字符串，然后再创建对象。

具体的步骤如下：

1. 接收两个字符串参数，分别代表要进行解析的字符串 `dateStr`，以及该字符串需要的自定义日期字符串格式 `fmt`。
2. 先解析 `fmt`，获取其中的代表 `year, method, day, hour, minute, second, milliSecond` 的部分得到一个数组（并且记录不同部分的 `index`）`dateUnits`，对 `fmt` 的代表日期的不同部分进行替换.
3. 使用替换过的 `fmt` 创建正则验证 `dateStr` 是否合法，非法直接返回 `null`。
4. 对 `dateUnits` 根据 `index` 进行排序，得到一个按照原本的 `fmt` 的不同日期部分的顺序的数组。
5. 遍历 `dateUnits` 获取到不同的部分，然后拼接成一个标准的('yyyy-MM-dd hh:mm:ss:SSS')日期字符串 `date`。
6. 使用 new Date(date) 并且返回。

全部代码如下：

```js
/**
 * 解析字符串为 Date 对象
 * @param dateStr 日期字符串
 * @param fmt 日期字符串的格式
 * 目前仅支持使用 y(年),M(月),d(日),h(时),m(分),s(秒),S(毫秒)
 */
Date.of = function(dateStr, fmt) {
  if (!dateStr) {
    throw new Error('传入的日期字符串不能为空！')
  }
  if (!fmt) {
    throw new Error('传入的日期字符串的自定义格式不能为空！')
  }

  /**
   * 日期格式化对象
   * @param name 日期格式的名称
   * @param format 日期的格式值
   * @param value 格式化得到的值
   * @constructor
   */
  function DateFormat(name, format, value, index) {
    this.name = name
    this.format = format
    this.value = value
    this.index = index
  }

  //日期时间的正则表达式
  const dateFormats = {
    year: 'y{1,4}',
    month: 'M{1,2}',
    day: 'd{1,2}',
    hour: 'h{1,2}',
    minute: 'm{1,2}',
    second: 's{1,2}',
    milliSecond: 'S{1,3}'
  }
  //如果没有格式化某项的话则设置为默认时间
  const defaultDateValues = {
    year: '2001',
    month: '01',
    day: '01',
    hour: '00',
    minute: '00',
    second: '00',
    milliSecond: '000'
  }
  //保存对传入的日期字符串进行格式化的全部信息数组列表
  const dateUnits = []
  for (const fmtName in dateFormats) {
    const regExp = new RegExp(dateFormats[fmtName])
    if (regExp.test(fmt)) {
      const matchStr = regExp.exec(fmt)[0]
      const regexStr = String.fill('`', matchStr.length)
      const index = fmt.indexOf(matchStr)
      fmt = fmt.replaceAll(matchStr, regexStr)
      dateUnits.push(
        new DateFormat(
          fmtName,
          String.fill('\\d', matchStr.length),
          null,
          index
        )
      )
    } else {
      dateUnits.push(
        new DateFormat(fmtName, null, defaultDateValues[fmtName], -1)
      )
    }
  }
  //进行验证是否真的是符合传入格式的字符串
  fmt = fmt.replaceAll('`', 'd')
  if (!new RegExp(fmt).test(dateStr)) {
    return null
  }
  //进行一次排序, 依次对字符串进行截取
  dateUnits.sort(function(a, b) {
    return a.index - b.index
  })
  for (var i = 0, length = dateUnits.length; i < length; i++) {
    const format = dateUnits[i].format
    if (format == null) {
      continue
    }
    const matchDateUnit = new RegExp(format).exec(dateStr)
    if (matchDateUnit !== null && matchDateUnit.length > 0) {
      dateStr = dateStr.replace(matchDateUnit[0], '')
      dateUnits[i].value = matchDateUnit[0]
    }
  }
  //将截取完成的信息封装成对象并格式化标准的日期字符串
  const obj = dateUnits.toObject(function(item) {
    return {
      key: item.name,
      value: item.value
    }
  })
  const date = '{year}-{month}-{day}T{hour}:{minute}:{second}.{milliSecond}'.format(
    obj
  )
  try {
    return new Date(date)
  } catch (e) {
    return null
  }
}

//下面是上面的 Date.of() 使用的一些辅助方法

/**
 * 替换所有匹配exp的字符串为指定字符串
 * @param exp 被替换部分的正则
 * @param newStr 替换成的字符串
 */
String.prototype.replaceAll = function(exp, newStr) {
  return this.replace(new RegExp(exp, 'gm'), newStr)
}

/**
 * 原型：字符串格式化
 * @param args 格式化参数值
 */
String.prototype.format = function(args) {
  var result = this
  if (arguments.length < 1) {
    return result
  }

  var data = arguments // 如果模板参数是数组
  if (arguments.length === 1 && typeof args === 'object') {
    // 如果模板参数是对象
    data = args
  }
  for (var key in data) {
    var value = data[key]
    if (undefined !== value) {
      result = result.replaceAll('\\{' + key + '\\}', value)
    }
  }
  return result
}

/**
 * 为 js 的 String 添加填充字符串的静态方法
 * @param item 填充的元素
 * @param length 填充的长度
 * @returns {string} 填充得到的字符串
 */
String.fill = function(item, length) {
  var result = ''
  for (var i = 0; i < length; i++) {
    result += item
  }
  return result
}

/**
 * js 数组转换为一个 Object 对象
 * @param fn 转换方法
 * @returns {{}} 得到的 Object 对象
 */
Array.prototype.toObject = function(fn) {
  const obj = {}
  this.map(fn).forEach(function(item) {
    obj[item.key] = item.value
  })
  return obj
}
```

Code Gist：https://gist.github.com/rxliuli/a81f058d03a99cbd08d6ca6095b2c7cb

那么，关于 `JavaScript` 中的字符串解析为 `Date` 对象就到这里啦，如果有什么错误/更好的建议都可以提出来呢
