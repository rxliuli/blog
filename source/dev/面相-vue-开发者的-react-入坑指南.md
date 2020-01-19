---
layout: post
title: 面相 vue 开发者的 react 入坑指南
tags:
  - Vue
  - React
  - JavaScript
abbrlink: b6a3c3df
date: 2020-01-16 08:43:17
---

## 场景

## 工程

以下皆基于 `cra(create-react-app)` 创建的 `ts + react + mobx + react-router + immer` 技术栈进行说明，虽然完全不了解以上内容亦可，但最好了解一下它们是做什么的，下面第一次提及时也会简单说明一下。

### 创建项目

使用 create-react-app 创建 react 项目，但和 vue-cli 有一点明显区别：不提供很多配置，只是简单的项目生成。

### this 的值

在 `class` 中使用箭头函数以直接绑定当前组件的实例，尽量不要使用 `function`，否则 `this` 可能是不明确的。

```tsx
import React, { Component } from 'react'

class HelloWorld extends Component {
  logMsg = () => {
    console.log('msg')
  }
  render() {
    return (
      <div>
        <h1>hello world</h1>
        <button onClick={this.logMsg}>打印</button>
      </div>
    )
  }
}

export default HelloWorld
```

### 状态管理

此处使用 mobx 对标，mobx 是一个状态管理库，以响应式、可变、简单方便为最大卖点。本质上可以认为为每个页面（页面内的所有组件）提供了一个全局对象，并实现了 vue 中的 `computed` 和 `watch`，所以 vue 的作者说 vue 是更简单的 react + mobx 确实有些道理，实际上这两个加起来能做到的事情不比原生 vue 多多少。

但它们之间也有几点不同

- vue 基于组件级别实现的 `computed` 和 `watch`，而 mobx 则是全局的
- vue 是基于组件级别自动初始化和销毁，而 mobx 则是手动的
- vue 基于组件但也受限于组件级别，全局状态仍要使用 vuex 这种 **大炮**，而 mobx 此时则是统一的

是否需要支持 es5？

- 是：高阶函数
- 否：装饰器

### 路由

- 递归菜单栏
- 获取当前路由：useMatch()
- 使用编程式的路由导航:withRouter()
  - 注意 props 的类型

异步组件和 vue 稍微有点差别，虽然也是需要 `import()` 语法，但却需要使用高阶组件。

```tsx
import React from 'react'

function AsyncRoute(
  importComponent: () => PromiseLike<{ default: any }> | { default: any },
) {
  class AsyncComponent extends React.Component<any, any> {
    constructor(props: any) {
      super(props)
      this.state = {
        component: null,
      }
    }

    async componentDidMount() {
      const { default: component } = await importComponent()
      this.setState({
        component: component,
      })
    }

    render() {
      const C = this.state.component
      return C ? <C {...this.props} /> : null
    }
  }

  return AsyncComponent
}

export default AsyncRoute
```

然后使用高阶组件包装即可

```tsx
<Route
  path={'/system/task'}
  component={AsyncRoute(() => import('../../index/HelloWorld'))}
/>
```

> 注：高阶组件和高阶函数类似，指的是接收一个组件/返回一个组件的组件。

## CSS 样式隔离

cra 创建的项目默认支持 css module，是 react 项目流行的一种 CSS 隔离方案。

使用步骤

1. 为需要的 css 文件使用 `.module.css` 后缀名
2. 通过 `import styles from '*.module.css'` 在 `tsx` 中引入
3. 在 `className={styles.*}` 使用 class 样式

示例

```css
.helloWorld {
  background-color: #000;
}
```

```tsx
import styles from 'HelloWorld.module.css'

export default function HelloWorld() {
  return <div className={styles.helloWorld}>hello world</div>
}
```

注：

- 此处的 `import styles from '*.module.css'` 不支持命名导入
- 此处实现的逻辑和 Vue 是一致的，只要使用了其中一个样式 `class`，则整个文件都会引入
- CSS 只要被引入了，就不会被删除，即便组件被销毁了亦然，所以页面内的 CSS 只会增加，不会减少

如何添加多个，默认使用 cra 创建的项目支持使用模板字符串

```tsx
className={`${styles.className1} ${styles.className2}`}
```

看起来很丑？可以试试 [classnames](https://github.com/JedWatson/classnames)

```tsx
import classNames from 'classnames'

className={classNames(globalStyles.global, globalStyles.margin)}
```

但仍然很丑，正如 Sindre Sorhus 所说：[React 把简单的事情变复杂，复杂的事情变简单](https://twitter.com/sindresorhus/status/1001355913930858502)

另一种个 API 是 `classNames.bind`

```tsx
import classNames from 'classnames'
const cx={classNames.bind(globalStyles)}
className={cx('global', 'margin')}
```

但这会让 WebStorm 损失所有的 CSS 关联，影响了包括代码提示/跳转/重构等功能，考虑到维护成本实在得不偿失。

还有人提出了 typed css module，为所有的 `.module.css` 生成 `.d.ts` 类型定义，但这会和 css in js 一样丧失 css 预处理器的优势 ---- 并且，所有的工具链都需要重新支持这种关联，将之认为是 css。

> 参考
>
> - [添加 CSS 模块样式表](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)
> - [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules)

### slot

两种方案

1. 使用 `{props.children}`，和 vue 的 `slot:default` 几乎一样，只是不能通过子组件传递参数。
2. 如果需要传递多个命名 `slot`，则可以直接为 `props` 属性赋值为组件。例如 `title={<div>hello world</div>}`
3. 如果需要使用子组件传参的话需要使用函数式组件的形式。例如 `title={value => <div>{value}</div>}`

> 吐槽：函数式已经是政治正确了。

使用函数式的 `slot` 时必须检查函数是否存在，如果不存在则不要调用，不像是 vue 中的 `slot` 是自动处理这一步的。

```tsx
{
  this.props.tableOperate && this.props.tableOperate(this.state.innerValue)
}
```

## watch 监听 props

```tsx
componentDidUpdate(prevProps: PropsType) {
  // 典型用法（不要忘记比较 props）：
  if (this.props.value !== prevProps.value) {
    this.setState({
      innerValue: this.props.value,
    })
  }
}
```

## 代码组织

- 导出：tsx/jsx 使用默认导出，避免需要高阶函数包装的场景
- 优先使用函数式组件
- src
  - pages：页面级的组件
    - component：页面级组件
  - components：非页面相关的通用组件
  - assets：静态资源

## 命名规范

- React
  - 组件：必须使用大写驼峰，包括使用组件亦然
  - store
    - 必须使用 .store 后缀以区分普通 ts 文件
    - 组件级 store 必须与组件名保持一致，例如 `Login` 组件对应的即为 `Login.store.ts`
- CSS
  - css 中的 class 必须使用小写驼峰命名法，避免 css module 找不到（cra 不会自动处理转换）
  - 优先使用 `.module.css` 而非 `.css`，避免全局样式污染
  - 页面级 css 必须与组件名保持一致，例如 `Login` 组件对应的即为 `Login.module.css`
  - 非 css module 的代码必须使用 `""` 而非 `{''}`

### 问题

- CSS module 很多方案，但没有一统天下的
- CSS 没有局部化处理，没有像 vue 那样用 `[data-has]` 属性做组件隔离
- vue 在组件创建/销毁时会自动初始化/销毁状态及监听器，而 mobx 会一直保留需要手动初始化/清理
  - 注: 这点还未找到解决方案
- 注：使用 yarn 并上传 `yarn.lock` 文件，避免线上 npm/yarn 自动更新小版本（所谓的语义版本号就是坑）
- 使用 AntD 时可能遇到样式覆盖不了的问题，需要混合使用 `className, style` 两个属性。
- react 会在开发阶段报错比较多，主要是一些低级错误，尤其是加上 ts 之后尤其如此
