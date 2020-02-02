---
layout: post
title: 面相 vue 开发者的 react 入坑指南
tags:
  - Vue
  - React
  - JavaScript
abbrlink: b6a3c3df
date: 2020-02-02
---

## 场景

- 问：为什么吾辈要使用 React？
- 答：React 拥有更加庞大的生态，以及对 TypeScript 的更好支持。
  前者让需求实现变得更加简单，例如目前使用 Vue 做的后台管理系统使用了 Ant Design Vue 这个 UI 库，而它的上游 Ant Design 实际上官方维护的是 React 版本，而 Vue 并不是 **亲儿子**，导致一些问题并不像官方那么快解决。
  后者强大的类型系统能降低维护成本，虽然开发时代码添加类型会稍加工作量，但可以降低维护成本，便于后续的修改、重构，同时 IDE 对其支持是 JavaScript 无法相提并论的。
- 问：那 React 相比于 Vue 而言有什么区别？
- 答：更强大、复杂、酷，对于没有开发经验的人而言可能非常困难，但一旦熟悉，则会非常喜欢它。组件化（`React Component/JSX`）、函数式（`React Hooks`）、不可变（`immutable`）都是非常有趣的思想，理解之后确实都能发现具体使用场景。
  > Vue 作者说 **React + Mobx 就是更复杂的 Vue**，这句话确实有道理，下面在 [状态管理](#状态管理) 那里也进行了说明，但同时，相比于 `Vue + Vuex`，避免引入 Redux 的 `React + Mobx` 将是更简单的。
- 问：有大公司在用么？
- 答：作为能够支撑 Facebook 这种级别公司的 Web 产品的基础，显然它拥有相当多的生产环境实践。

## 工程与周边生态

以下皆基于 `cra(create-react-app)` 创建的 `ts + react + mobx + react-router + immer` 技术栈进行说明，虽然完全不了解以上内容亦可，但最好了解一下它们是做什么的，下面第一次提及时也会简单说明一下。

### 创建项目

使用 create-react-app 创建 react 项目，但和 vue-cli 有一点明显区别：不提供很多配置，只是简单的项目生成。

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

### 代码组织

- 导出：tsx/jsx 使用默认导出，避免需要高阶函数包装的场景
- 优先使用函数式组件
- src
  - pages：页面级的组件
    - component：页面级组件
  - components：非页面相关的通用组件
  - assets：静态资源

### 命名规范

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

## 重点

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

### CSS 样式隔离

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

### watch 监听 props

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

### 生命周期

相比于 Vue 的生命周期，React 显然更加**复杂**与**混乱**，而且，老实说有时候真的很难用。

例如非常常见的生命周期 `componentWillUpdate`，它承担的责任实在是太多了，不仅 `watch` `state/props` 中的数据要用这个，连 React Router 的路由变化同样依赖于此。

下面列出最常用的一些生命周期以及典型用例

- `render`：只要 state 变化就会触发重新渲染，等价于 vue 中渲染模板 HTML 中的内容
- `shouldComponentUpdate`：state 或者 props **变化前**就会执行，时机上早于 `render`。等价于 vue `beforeUpdate`，但可以在这个方法内 `return false` 阻止视图更新。
- `componentDidUpdate`：state 或者 props **变化后**就会执行，时机上晚于 `render`。等价于 vue `updated`。
  多用于监听一些数据变化执行一些副作用操作，但包含的种类可能会非常多。

  > 注：此处 vue 中将之分为 `updated/watch/beforeRouteUpdate`，而在 React 中，全部由 `componentDidMount` 承担这个责任。

- `componentDidMount`：当组件渲染**完成后**就会执行，时机上晚于 `render`，等价于 vue `mounted`。
  多用于执行一些初始化操作，除非逻辑特别简单，否则不要在这个函数里放具体执行逻辑代码，而是专门写初始化函数在这里调用。
- `UNSAFE_componentWillMount`：在组件渲染**完成前**就会执行，等价于 vue `beforeMount`，但被废弃了，替代解决方案参考 [怎么在没有 `created` 生命周期的情况下初始化数据并保证用户看不到默认空数据](#怎么在没有-created-生命周期的情况下初始化数据并保证用户看不到默认空数据)。
- `componentWillUnmount`: 组件即将被销毁前调用，等价于 vue `beforeDestroy`。

### 简化 state 修改

使用 `setState` 很烦的一点是当你需要深度为某个属性赋值的时候，要为该属性上面所有的对象全部使用 `...` 或者其他方式拷贝一遍。

例如

```ts
this.setState({
  user: {
    ...this.state.user,
    address: {
      ...this.state.user.address,
      city: newCity,
    },
  },
})
```

当有多个属性需要赋值时就尤其的繁琐，而 [immerjs](https://github.com/immerjs/immer) 正好可以解决这种痛点

使用 immer 重构之后

```ts
this.setState(produce(this.state, draft => {
  draft.user.address.city = newCity
})
```

代码变得很简单了，虽然看起来是直接赋值，不过 immer 使用了 `Proxy` 和 `Object.freeze` 实现了对使用者友好的不可变数据修改，具体参考 。

## 常见问题

### 怎么在没有 `created` 生命周期的情况下初始化数据并保证用户看不到默认空数据

在 vue 中，吾辈经常在 created 生命周期中加载数据，避免用户看到默认的空数据，然而，React 中却没有这个生命周期，所以需要额外的处理。

> 注：其实 vue 中用户也有可能看到空数据，但因为 Ajax 请求数据的速度也比较快，所以默认可以不用处理。

一个可能解决方案是在指定元素外面包一层，在页面数据未加载之前，在元素上方添加一个 Loading 遮罩层提示**正在加载中**，等到数据加载完成后删除浮层。

下面是一个简单的实现

```css
/* ComponentLoading.module.css */
.componentLoadingDialog {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: #fff;
}
```

```tsx
// ComponentLoading.tsx
import React from 'react'
import { Spin } from 'antd'
import styles from './ComponentLoading.module.css'

type PropsType = {
  /**
   * 是否显示 loading?
   */
  isLoading: boolean
  tip?: string
}

/**
 * 控制 Ajax 请求未完成前某个区域不展示默认数据
 * @param props
 * @constructor
 */
const ComponentLoading: React.FC<PropsType> = function(props) {
  const { isLoading, tip = '正在加载中。。。' } = props
  return (
    <div style={{ position: 'relative' }}>
      {isLoading && (
        <div className={styles.componentLoadingDialog}>
          <Spin tip={tip} />
        </div>
      )}

      {/*注：默认会渲染 children 组件*/}
      {props.children}
    </div>
  )
}

export default ComponentLoading
```
