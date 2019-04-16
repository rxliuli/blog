---
layout: post
title: vue 使用 v-model 双向绑定父子组件的值
tags:
  - JavaScript
abbrlink: b039fdae
date: 2019-04-01 20:44:15
updated: 2019-04-01 20:44:15
---

# vue 使用 v-model 双向绑定父子组件的值

## 场景

今天在使用 `v-model` 进行组件双向数据绑定的时候遇到了一个奇怪的问题，网页本身运行正常，浏览器一直出现警告信息。

```sh
[Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "value"
```

引发这个警告的是一个自定义组件 `RxSelect`

```js
Vue.component('RxSelect', {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: [Number, String],
    map: Map,
  },
  template: `
        <select
          v-model="value"
          @change="$emit('change', value)"
        >
          <option
            v-for="[k,v] in map"
            :value="k"
            :key="k"
          >{{v}}</option>
        </select>
        `,
})
```

吾辈使用的代码看起来代码貌似没什么问题？

```html
<main id="app">
  当前选择的性别是: {{map.get(sex)}}
  <div>
    <rx-select :map="map" v-model="sex" />
  </div>
</main>
```

JavaScript 代码

```js
new Vue({
  el: '#app',
  data: {
    map: new Map()
      .set(1, '保密')
      .set(2, '男')
      .set(3, '女'),
    sex: '',
  },
})
```

经测试，程序本身运行正常，父子组件的传值也没什么问题，双向数据绑定确实生效了，然而浏览器就是一直报错。

## 尝试解决

吾辈找到一种方式

1. 为需要双向绑定的变量在组件内部 `data` 声明一个变量 `innerValue`，并初始化为 `value`
2. 在 `select` 上使用 `v-model` 绑定这个变量 `innerValue`
3. 监听 `value` 的变化，在父组件中 `value` 变化时修改 `innerValue` 的值
4. 监听 `innerValue` 的变化，在变化时使用 `this.$emit('change', val)` 告诉父组件需要更新 `value` 的值

```js
Vue.component('RxSelect', {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: [Number, String],
    map: Map,
  },
  data() {
    return {
      innerValue: this.value,
    }
  },
  watch: {
    value(val) {
      this.innerValue = val
    },
    innerValue(val) {
      this.$emit('change', val)
    },
  },
  template: `
  <select v-model="innerValue">
    <option
      v-for="[k,v] in map"
      :value="k"
      :key="k"
    >{{v}}</option>
  </select>
  `,
})
```

使用代码完全一样，然而组件 `RxSelect` 的代码却多了许多。。。

## 解决

一种更优雅的方式是使用 `computed` 计算属性以及其的 `get/set`，代码增加的程度还是可以接受的

```js
Vue.component('RxSelect', {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: [Number, String],
    map: Map,
  },
  computed: {
    innerValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('change', val)
      },
    },
  },
  template: `
  <select v-model="innerValue">
    <option
      v-for="[k,v] in map"
      :value="k"
      :key="k"
    >{{v}}</option>
  </select>
  `,
})
```
