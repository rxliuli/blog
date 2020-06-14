---
layout: post
title: react 通用列表组件封装
abbrlink: '4e033209'
date: 2020-06-13 23:36:55
tags:
  - react
---

## 场景

> [GitHub 源码](https://github.com/rxliuli/example/tree/master/basic_list)

解决重复的简单列表的编写，避免每次都手动控制过滤器/分页之类的东西，将之抽象成配置项，然后通过它进行生成。

## 理念

使用逐级递进的方式进行封装，使用者可以根据需求停留在一个合适的封装层次。

- `BasicList`：高层列表封装组件
  - `ListHeader`：列表页顶部工具栏组件
    - `CommonHeader`: 通用的顶部工具栏组件
  - `ListFilter`：过滤器组件
    - `FilterSelect`：单选过滤器
    - `FilterTimeRange`：时间区间过滤器
    - `FilterSlot`：自定义过滤器
  - `ListTable`：列表封装组件

## 使用步骤

### 使用基本 API

> [GitHub 代码示例](https://github.com/rxliuli/example/blob/master/basic_list/src/pages/user/BasicListExample.tsx)

如下所示，我们想要构造下面这样一个简单的列表页面，包含一个面包屑导航列表、搜索框、过滤条件选择器和一个表格。

```tsx
import * as React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { Moment } from 'moment'
import { LabeledValue } from 'antd/es/select'
import { userApi } from './api/UserApi'
import {
  BasicList,
  BasicListPropsType,
  FilterFieldTypeEnum,
} from '../../components/list'

type PropsType = {}

type Config = Omit<BasicListPropsType, 'params'> & {
  params?: {
    keyword?: string
    test?: number
    birthdayTimeRange?: [Moment, Moment]
  }
}
const testOptionList: LabeledValue[] = [
  { value: 0, label: '测试 0' },
  { value: 1, label: '测试 1' },
  { value: 2, label: '测试 2' },
]

//列表配置项
const config: Config = {
  header: {
    placeholder: '用户名/住址',
    list: ['用户', '列表'],
  },
  filters: [
    {
      type: FilterFieldTypeEnum.Select,
      label: '测试字段',
      field: 'test',
      options: testOptionList,
    },
    {
      type: FilterFieldTypeEnum.TimeRange,
      label: '生日',
      field: 'birthdayTimeRange',
    },
  ],
  columns: [
    { field: 'id', title: 'ID' },
    { field: 'name', title: '姓名' },
    { field: 'birthday', title: '生日' },
    {
      field: 'operate',
      title: '操作',
      slot: (param) => <Link to={`/system/user/${param.record.id}`}>详情</Link>,
    },
  ],
  api: userApi,
}

/**
 * 一个基本的列表页面
 * @constructor
 */
const BasicListExample: React.FC<PropsType> = () => {
  return <BasicList {...config} />
}

export default BasicListExample
```

### 使用自定义过滤器组件

> [GitHub 代码示例](https://github.com/rxliuli/example/blob/master/basic_list/src/pages/user/CustomFilterListExample.tsx)

事实上，总有各种奇怪的过滤器无法满足，这时候就需要添加一个自定义的过滤器了。
例如下面这个过滤器，包含了年龄的值和单位，是不是感觉很奇怪

关键代码如下

```tsx
const config: Config = {
  filters: [
    {
      type: FilterFieldTypeEnum.Slot,
      label: '年龄',
      field: 'age',
      children: (
        <Input.Group compact>
          <Form.Item name={['age', 'value']} noStyle>
            <InputNumber style={{ width: 'calc(100% - 64px)' }} />
          </Form.Item>
          <Form.Item name={['age', 'unit']} noStyle>
            <Select style={{ width: 64 }} options={ageUnitOptionList} />
          </Form.Item>
        </Input.Group>
      ),
    },
  ],
  // 此处是为了添加过滤器的默认值
  params: {
    age: {
      unit: 0,
    },
  },
}
```

### 添加表格的额外操作

### 过滤器的下拉框数据来源是异步的

## API

### BasicList

参考 _src/components/common/table/js/BasicListOptions.d.ts_

| `prop`           | 类型                     | 说明           |
| ---------------- | ------------------------ | -------------- |
| `header`         | `BasicList.Header`       | 标题栏相关配置 |
| `[filters]`      | `BaseFilterField[]`      | 过滤器列表     |
| `[params]`       | `BasicList.Params`       | 查询参数       |
| `columns`        | `TableColumn[]`          | 列字段列表     |
| `api`            | `BaseListApi`            | api 对象       |
| `[tableOptions]` | `BasicList.TableOptions` | 一些其他选项   |

### ListFilter

| `prop`    | 类型                | 说明       |
| --------- | ------------------- | ---------- |
| `[value]` | `BasicList.Params`  | 查询参数   |
| `filters` | `BaseFilterField[]` | 过滤器列表 |

### ListTable

| `prop`      | 类型                     | 说明         |
| ----------- | ------------------------ | ------------ |
| `columns`   | `TableColumn[]`          | 列字段列表   |
| `api`       | `BaseListApi`            | api 对象     |
| `params`    | `BasicList.Params`       | 查询参数     |
| `[options]` | `BasicList.TableOptions` | 一些其他选项 |

### 类型定义

下面是类型定义，所有的类型定义都有对应的 `.d.ts` 文件，请使用 `C-N` 搜索 `class`。

| `CommonHeaderNavItem` | 类型      | 说明                      |
| --------------------- | --------- | ------------------------- |
| `name`                | `string`  | 导航的名字                |
| `isRoute`             | `boolean` | 默认会赋值                |
| `[link]`              | `string`  | 如果是 route 的话必须有值 |

| `BasicList.Header` | 类型                    | 说明             |
| ------------------ | ----------------------- | ---------------- |
| `list`             | `CommonHeaderNavItem[]` | 导航元素列表     |
| `placeholder`      | `string`                | 搜索框的提示文本 |
| `title`            | `string`                | 标题             |

| `filterFieldType` | 类型 | 说明           |
| ----------------- | ---- | -------------- |
| `slot`            | `1`  | 自定义 slot    |
| `select`          | `2`  | 普通选择框     |
| `timeRange`       | `3`  | 日期区间选择器 |

| `BaseFilterField` | 类型              | 说明           |
| ----------------- | ----------------- | -------------- |
| `type`            | `filterFieldType` | 过滤器元素类型 |
| `title`           | `string`          | 过滤器的标题   |

| `BasicList.Params` | 类型     | 说明         |
| ------------------ | -------- | ------------ |
| `keyword`          | `string` | 查询关键字   |
| `...args`          | `any[]`  | 其他查询参数 |

| `TableColumn` | 类型                              | 说明                            |
| ------------- | --------------------------------- | ------------------------------- |
| `field`       | `string`                          | 在数据项中对应的字段名          |
| `title`       | `string`                          | 列标题                          |
| `[formatter]` | `(v: any, record: any) =&gt; any` | 自定义字段格式化函数            |
| `slot`        | `boolean`                         | 是否使用 slot，如果是，则值为？ |

| `BaseListApi` | 类型                                                 | 说明                                       |
| ------------- | ---------------------------------------------------- | ------------------------------------------ |
| `pageList`    | `(params: any) =&gt; Promise&lt;Page&lt;any&gt;&gt;` | 所有 ListTable 中的 api 对象必须实现该类型 |

| `TableOptions` | 类型      | 说明                   |
| -------------- | --------- | ---------------------- |
| `isSelect`     | `boolean` | 是否可选，默认为 false |
| `rowKey`       | `string`  | 行的唯一键，默认为 id  |
