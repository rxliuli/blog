---
title: Vue 实现一个滚动到顶部的悬浮图标组件
tags:
  - JavaScript
  - VueJS
abbrlink: a4fbddd2
date: 2018-11-03 18:11:06
updated: 2018-11-03 18:11:06
---

# Vue 实现一个滚动到顶部的悬浮图标组件

## 场景

吾辈在写 vuejs 前端项目的时候，需要实现一个下拉文章列表时，出现一个悬浮按钮，用于一键回到文章顶部。

## 实现

> 实现源码放到了 [GitHub](https://github.com/rxliuli/vue-scroll-to-top-component)，[Demo 演示](https://vue-scrollto-top-component.rxliuli.com/#/) 想直接看源码/效果的人可以直接去看，但最好看一下 [注意点](#注意点)

### 思路

1. 定义一个 vuejs 组件，抽取出最需要的几个属性（位置，组件的样子）
2. 监听窗口滚动，当滚动到第二屏的时候显示组件
3. 监听组件点击，点击即逐渐减少与顶端的距离
4. 当在滚动中用户手动下拉时终止滚动
5. 引用组件并传递一个 vue 模板

### 代码

定义模板 `VxScrollToTop`

```vuejs
/**
一个 Vue 的滚动到顶部的容器组件（不提供 UI 显示）
使用：
1. 引入自定义文件上传组件: import VxScrollToTop from '@/components/common/VxScrollToTop'
2. 声明它
export default {
  components: {
    VxScrollToTop: VxScrollToTop
  }
}
3. 在 template 中使用
<vx-scroll-to-top>
  <!-- 这里面的内容随你定义，是上拉按钮要显示的样子 -->
  <v-btn color="primary"
          fab>
    <v-icon>vertical_align_top</v-icon>
  </v-btn>
</vx-scroll-to-top>
 */
<template>
  <div :style="scrollToTopStyle"
       v-show="showScrollToTop"
       @click="scrollToTop">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    // 定义上拉按钮容器的位置
    top: {
      type: [Number, String],
      default: undefined
    },
    bottom: {
      type: [Number, String],
      default: undefined
    },
    left: {
      type: [Number, String],
      default: undefined
    },
    right: {
      type: [Number, String],
      default: undefined
    }
  },
  data: () => ({
    // 是否显示，初始默认不显示
    showScrollToTop: false,
    // 定时器
    timer: null,
    scrollToTopStyle: {
      position: 'fixed',
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  }),
  methods: {
    isNumber (str) {
      if (!new RegExp('^[0-9]+([.]{1}[0-9]+)?$').test(str)) {
        return false
      }
      return true
    },
    watchPosition () {
      if (![this.top, this.bottom, this.left, this.right].find(i => i !== undefined)) {
        this.scrollToTopStyle.bottom = this.scrollToTopStyle.right = '14px'
      }
    },
    watchTop () {
      if (this.top !== undefined) {
        this.scrollToTopStyle.top = this.isNumber(this.top) ? parseFloat(this.top) + 'px' : this.top
      }
    },
    watchBottom () {
      if (this.bottom !== undefined) {
        this.scrollToTopStyle.bottom = this.isNumber(this.bottom) ? parseFloat(this.bottom) + 'px' : this.bottom
      }
    },
    watchLeft () {
      if (this.left !== undefined) {
        this.scrollToTopStyle.left = this.isNumber(this.left) ? parseFloat(this.left) + 'px' : this.left
      }
    },
    watchRigth () {
      if (this.right !== undefined) {
        this.scrollToTopStyle.right = this.isNumber(this.right) ? parseFloat(this.right) + 'px' : this.right
      }
    },
    /**
     * 初始化按钮的位置
     */
    initBtnPosition () {
      this.watchTop()
      this.watchBottom()
      this.watchLeft()
      this.watchRigth()
      this.watchPosition()
    },
    initBindScroll () {
      // 监听窗口滚动
      document.onscroll = ((oldScrollTopLength) => {
        const clientHeight = document.documentElement.clientHeight
        return () => {
          const scrollTopLength = document.documentElement.scrollTop || document.body.scrollTop
          // 如果定时器不存在的话就正常计算滚动到顶部的图标是否存在
          if (!this.timer) {
            // 滚动到第二屏就显示
            this.showScrollToTop = scrollTopLength > clientHeight
          }
          // 向下滚动时判断判断是否正在向上滚动，是的话就清除定时器，停在当前位置
          if (scrollTopLength > oldScrollTopLength && this.timer) {
            // 设置这个是因为有时候 clearInterval() 并不能清除这个属性，或许是 vuejs 组件中的属性特殊一点？
            this.timer = clearInterval(this.timer)
          }
          oldScrollTopLength = scrollTopLength
        }
      })(0)
    },
    /**
     * 回到顶部
     */
    scrollToTop () {
      this.timer = setInterval(() => {
        const scrollTopLength = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTopLength <= 0) {
          this.timer = clearInterval(this.timer)
          this.showScrollToTop = false
        }
        const spend = scrollTopLength / 5
        document.documentElement.scrollTop = document.body.scrollTop = scrollTopLength - spend
      }, 30)
    }
  },
  mounted () {
    this.initBtnPosition()
    this.initBindScroll()
  }
}
</script>
<style scoped>
#vx-scroll-to-top-btn {
  position: fixed;
}
</style>
```

使用起来就很简单了

```vuejs
<template>
  <div>
    <h2 v-for="i in 100"
        :key="i">
      第 {{i}} 行文字
    </h2>
    <vx-scroll-to-top>
      <!-- 这里面的内容随你定义，是上拉按钮要显示的样子 -->
      <v-btn color="primary"
             fab>
        <v-icon>vertical_align_top</v-icon>
      </v-btn>
    </vx-scroll-to-top>
  </div>
</template>

<script>
import VxScrollToTop from '@/components/common/VxScrollToTop'

export default {
  components: {
    VxScrollToTop
  }
}
</script>
```

目前这里只能供了最简单的功能，如果有特别的需求可以在上面继续修改一下就好啦

### 注意点

- 组件方法内部必须使用 `箭头函数`，因为使用 `function` 会导致 `this` 发生变化。详情参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- 必须要手动置空 `timer`，例如上文所用的 `this.timer = clearInterval(this.timer)`，关于为什么 `timer` 没有被 `clearInterval` 清空目前吾辈还真不太清楚，但如果把 `timer` 放到组件外部就正常使用，估计是 vuejs 的属性有什么特殊的地方也说不定！
