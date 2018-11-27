---
title: Vue 深度监听
date: 2018-11-27 12:57:46
tags: [JavaScript, VueJS, 记录]
---

# Vue 深度监听

## 场景

吾辈在前端项目中需要监听 Vue 组件中的一个数组的变化，然而没想到这个简单的功能却发现并没有想象中的容易。在废了一波三折之后终于算是实现了效果，所以便在这里记录一下。

## 代码

> 吾辈写一个 demo 在 [GitHub](https://github.com/rxliuli/vue-deep-monitoring)，如果需要可以去看下。也有一个 [网站](https://vue-deep-monitoring.rxliuli.com/) 用来演示下面的三种方法的效果

```js
<template>
  <v-card>
    <v-card-title primary-title>
      <h2>普通监听</h2>
      <v-subheader>不会发生变化</v-subheader>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.k">
          <v-text-field
            :label="`输入框 ${item.k}`"
            v-model="item.v"
          ></v-text-field>
        </v-list-tile>
      </v-list>
      <v-layout row wrap>
        <v-flex md4 xs12>
          <h2>旧值</h2>
          <p>{{ oldVal }}</p>
        </v-flex>

        <v-flex md4 sm4 xs12>
          <h2>差异</h2>
          <p>{{ difference }}</p>
        </v-flex>
        <v-flex md4 xs12>
          <h2>新值</h2>
          <p>{{ val }}</p>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <h4>最后更新于：{{ lastUpdateTime }}</h4>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import _ from 'lodash'
export default {
  data: () => ({
    // 吾辈想要监视这个的变化
    items: [],
    // 下面的两个属性仅用于展示
    oldVal: [],
    val: [],
    difference: [],
    lastUpdateTime: new Date()
  }),
  methods: {
    /**
     * 初始化 items
     */
    init() {
      this.items = _.range(1, 6).map(i => ({
        k: i,
        v: ''
      }))
    }
  },
  mounted() {
    this.init()
  }
}
</script>
```

## 直接使用 `watch` 监听

最开始吾辈使用 `watch` 直接监听数组 `items` 的变化

```js
watch: {
  // 监听 items 的变化（实际上数组内部的值变化监听不到）
  items(val, oldVal) {
    this.val = val
    this.oldVal = oldVal
    this.difference = _.differenceWith(
      val,
      oldVal,
      (i, k) => JSON.stringify(i) === JSON.stringify(k)
    )
    this.lastUpdateTime = new Date().toISOString()
  }
},
```

结果发现完全没有一点效果，vuejs 居然认为数组没有变化。查了一下官网文档，发现在 [这里](https://cn.vuejs.org/v2/guide/list.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9) 有一段话。

> 由于 JavaScript 的限制，Vue 不能检测以下变动的数组：
>
> 1. 当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue
> 2. 当你修改数组的长度时，例如：vm.items.length = newLength

## 使用 `deep` 属性设置深度监听

后来，在 [watch 的 API](https://cn.vuejs.org/v2/api/#watch) 里面，吾辈找到了一个属性：`deep` ，使用它就可以对数组等嵌套对象进行深度监听。

所以，吾辈的监听代码变成了这样

```js
watch: {
  items: {
    handler (val, oldVal) {
      this.val = val
      this.oldVal = oldVal
      this.difference = _.differenceWith(val, oldVal, (i, k) => JSON.stringify(i) === JSON.stringify(k))
      this.lastUpdateTime = new Date().toISOString()
    },
    // 这里是关键，代表递归监听 items 的变化
    deep: true
  },
}
```

然而之后又发现了一个问题，深度监听是能够响应数组里面的元素每一次的变化，但旧的值并没有被记录。原因在 [官网文档](https://cn.vuejs.org/v2/api/#vm-watch) 也有指明。

> 注意：在变异 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象 / 数组。Vue 不会保留变异之前值的副本。

## 使用额外的变量保存旧值

没办法，既然 vuejs 限制如此，引用类型的变量无法保存旧值，那我们就自己保存吧

```js
watch: {
  items: {
    handler (val) {
      this.val = val
      // itemOld 就是额外的变量
      this.oldVal = this.itemOld
      this.difference = _.differenceWith(val, this.itemOld, (i, k) => JSON.stringify(i) === JSON.stringify(k))
      // 注意：这里更新旧值采用的是深层复制而非简单的引用
      this.itemOld = _.cloneDeep(val)
      this.lastUpdateTime = new Date().toISOString()
    },
    // 这里是关键，代表递归监听 items 的变化
    deep: true
  },
```

## 总结

vuejs 的坑是真的不少呢，不过踩过去就好啦
