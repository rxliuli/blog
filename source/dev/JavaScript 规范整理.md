# JavaScript 规范整理

## 命名规范

### 不要使用拼音命名

如果不熟悉英语，可以使用 [Google 翻译](https://translate.google.com)，避免使用拼音命名。

错误示例

```js
// 这里是用户状态
const yongHuZhuangTai = 1
```

正确示例

```js
const userStatus = 1
```

### 函数中的变量

js 中普通变量使用 [小写开头驼峰命名法](https://en.wikipedia.org/wiki/Camel_case)，而非不区分大小写，或使用下划线命名等等。

错误示例

```js
// 用户操作日志备注
const useroperatinglogremark = '新增用户'
```

正确示例

```js
const userOperatingLogRemark = '新增用户'
```

### 内部变量

如果需要不想让使用者使用的属性（能够看到），需要使用下划线开头。例如 `_value`，代表内部的值，外部不应该直接访问（实际上可以做到）。

```js
class DateFormat {
  constructor(fmt) {
    // 不想让外部使用
    this._fmt = fmt
  }
  format(date) {
    // 具体格式化代码
  }
  parse(str) {
    // 具体解析代码
  }
}
```

### 不要使用无意义的前缀命名

如果一个对象的变量名已经很好的标识了该对象，那么内部的属性就不能使用对象名作为前缀！

```js
// 活跃的日志信息
const activeLog = {
  activeUserId: 'rx',
  activeTime: new Date(),
}
```

## ES6

### 优先使用 const/let

一般情况下，使用 `const/let` 声明变量，而不是使用 `var`。因为使用 `var` 声明的变量会存在变量提升。

示例代码

```js
;(function() {
  // 使用 var 声明的变量（初始值为 undefined）
  console.log(i)
  i = 1
  console.log(i)
  // 此时使用 var 声明的变量 i 相当于在 function 顶部声明，然后在此处进行了赋值操作
  var i = 0

  // 使用 const 声明的变量（抛出异常 k is not defined）
  // console.log(k)
  k = 1
  const k = 0
})()
```

关于可以参考 [let 与 var 在 for 循环中的区别](https://blog.rxliuli.com/p/acfc2875/)

### 使用新的函数声明方式

ES6 推出了一种更简洁的函数声明方式，不需要在写 `function`，只要 **名字 + ()** 即可在 `class` 或 `Object` 中声明函数。

错误示例

```js
const user = {
  name: 'rx',
  hello: function() {
    console.log('hello' + this.name)
  },
}
```

正确示例

```js
const user = {
  name: 'rx',
  hello() {
    console.log('hello' + this.name)
  },
}
```

### 优先使用箭头函数而非 function

优先使用 **箭头函数** 而不是使用传统的函数，尤其是使用 **匿名函数** 时，更应如此。

错误示例

```js
const sum = [1, 2, 3, 4]
  // 过滤出偶数
  .filter(function(i) {
    return i % 2 === 0
  })
  // 将偶数翻倍
  .map(function(i) {
    return i * 2
  })
  // 计算总和
  .reduce(function(res, i) {
    return (res += i)
  })

console.log(sum)
```

正确示例

```js
const sum = [1, 2, 3, 4]
  // 过滤出偶数
  .filter(i => i % 2 === 0)
  // 将偶数翻倍
  .map(i => i * 2)
  // 计算总和
  .reduce((res, i) => (res += i))

console.log(sum)
```

### 不要使用 if 判断再赋予默认值

如果函数需要对参数做默认值处理，请不要使用 `if` 判空之后再修改参数，而是使用 ES6 的 [默认参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters) 和 [解构赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)。

主要优点

- 减少代码，JavaScript 是动态语言，维护起来较为麻烦，代码越少，错误越少
- 清晰明了，可以让人一眼就能看出这个参数的默认值，而不需要关心函数内部的逻辑
- IDE 大多对此进行了支持，代码提示时便会告诉我们参数是可选的并且有默认值

错误示例

```js
/**
 * 格式化日期
 * @param {Date} [date] 日期对象。默认为当前时间
 * @return {String} 格式化日期字符串
 */
function formatDate(date) {
  if (date === undefined) {
    date = new Date()
  }
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
```

正确示例

```js
function formatDate(date = new Date()) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
```

这里如果展开来讲实在太多，请参考 [JavaScript 善用解构赋值](https://blog.rxliuli.com/p/5985b64e/)

### 优先使用 Map 做键值对映射而非传统的对象

如果需要 **键值映射**，不要使用一般的对象，而是用 ES6 的 [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)。它不仅可以使用 **任意类型的键**，另外 Map 本身也是 **有序** 的哦

错误示例

```js
const obj = {
  2: '琉璃',
  1: 'rx',
  '1': 'liuli',
}
// 结果为 true，因为属性 1 实际上会被转换为 '1'
console.log(obj[1] === obj['1'])
// 结果为 [ '1', '2']，因为是按照属性字符串排序的
console.log(Object.keys(obj))
```

正确示例

```js
const map = new Map()
  .set(2, '琉璃')
  .set(1, 'rx')
  .set('1', 'liuli')
// 结果为 false
console.log(map.get(1) === map.get('1'))
// 结果为 [ 2, 1, '1' ]，因为是按照插入顺序排序的
console.log(Array.from(map.keys()))
```

### 优先使用模板字符串拼接多个字符串变量

如果需要拼接多个对象以及字符串时，不要使用 `+` 进行拼接，使用 es6 的 [模板字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings) 会更好一点。一般而言，如果需要拼接的变量超过 3 个，那么就应该使用模板字符串了。

错误示例

```js
function hello(name, age, sex) {
  return 'name: ' + name + ', age: ' + age + ', sex: ' + sex
}
```

正确示例

```js
function hello(name, age, sex) {
  return `name: ${name}, age: ${age}, sex: ${sex}`
}
```

### 当独立参数超过 3 个时使用对象参数并解构

错误示例

```js
function hello(name, age, sex) {
  return `name: ${name}, age: ${age}, sex: ${sex}`
}
```

正确示例

```js
function hello({ name, age, sex }) {
  return `name: ${name}, age: ${age}, sex: ${sex}`
}
```

### 不要写多余的 await

如果 `await` 是不必要的（在返回语句时，那么就不要用 `async` 标识函数），这是没有必要的 -- 除非，你需要在这个函数内异步请求完成后有其他操作。

错误示例

```js
const login = async searchText => {
  if (!useranme) {
    console.log('用户名不能为空')
    return
  }
  if (!password) {
    console.log('密码不能为空')
    return
  }
  // 真正发起登录请求
  return await userApi.login(user)
}
```

正确示例

```js
const login = searchText => {
  if (!useranme) {
    console.log('用户名不能为空')
    return
  }
  if (!password) {
    console.log('密码不能为空')
    return
  }
  // 真正发起登录请求
  return userApi.login(user)
}
```

## 逻辑代码

### 不要判断一个 Boolean 值并以此返回 Boolean 值

不要在得到一个 `Boolean` 的值后使用 `if-else` 进行判断，然后根据结果返回 `true` 或 `false`，这真的显得非常非常蠢！

错误示例

```js
// 模拟登录异步请求
const login = async ({ username, password }) => {
  const res = username === 'rx' && password === 'rx'
  if (res) {
    return true
  } else {
    return false
  }
}
```

正确示例

```js
// 模拟登录异步请求
const login = async ({ username, password }) =>
  username === 'rx' && password === 'rx'
```

### 不要使用多余的变量

错误示例

```js
// 模拟登录异步请求
const login = async ({ username, password }) => {
  const res = username === 'rx' && password === 'rx'
  return res
}
```

正确示例

```js
// 模拟登录异步请求
const login = async ({ username, password }) => {
  return username === 'rx' && password === 'rx'
}
```

### 不要使用嵌套 if

不要使用多级的 `if` 嵌套，这会让代码变得丑陋且难以调试，应当优先使用 **提前 return** 的策略。

错误示例

```js
// 模拟登录异步请求
const login = async ({ username, password }) =>
  username === 'rx' && password === 'rx'

async function submit(user) {
  const { username, password } = user
  if (username) {
    if (password) {
      const res = await login(user)
      if (res) {
        console.log('登录成功，即将跳转到首页')
      } else {
        console.log('登录失败，请检查用户名和密码')
      }
    } else {
      console.log('用户密码不能为空')
    }
  } else {
    console.log('用户名不能为空')
  }
}
```

正确示例

```js
// 模拟登录异步请求
const login = async ({ username, password }) =>
  username === 'rx' && password === 'rx'

async function submit(user) {
  const { username, password } = user
  if (!username) {
    console.log('用户名不能为空')
    return
  }
  if (!password) {
    console.log('用户密码不能为空')
    return
  }
  const res = await login(user)
  if (!res) {
    console.log('登录失败，请检查用户名和密码')
    return
  }
  console.log('登录成功，即将跳转到首页')
}
```

### 不要先声明空对象然后一个个追加属性

有时候会碰到这种情况，先声明一个空对象，然后在下面一个个追加属性，为什么创建对象与初始化不放到一起做呢？

错误示例

```js
// 模拟登录异步请求
const login = async ({ username, password }) =>
  username === 'rx' && password === 'rx'

async function submit(username, password) {
  // 数据格式校验处理。。。

  const user = {}
  user.username = username.trim()
  user.password = password.trim()

  const res = await login(user)

  // 后续的错误处理。。。
}
```

正确示例

```js
// 模拟登录异步请求
const login = async ({ username, password }) =>
  username === 'rx' && password === 'rx'

async function submit(username, password) {
  // 数据格式校验处理。。。

  const user = {
    username: username.trim(),
    password: password.trim(),
  }

  const res = await login(user)

  // 后续的错误处理。。。
}
```

### 不要使用无意义的函数包裹

使用函数时，如果你想包裹的函数和原来函数的参数/返回值相同，那就直接应该使用函数作为参数，而非在包裹一层。给人的感觉就像是大夏天穿着棉袄吃雪糕 -- 多此一举！

错误示例

```js
// 判断是否是偶数的函数
const isEven = i => i % 2 === 0
//过滤出所有偶数
const res = [1, 2, 3, 4].filter(i => isEven(i))
```

正确示例

```js
// 判断是否是偶数的函数
const isEven = i => i % 2 === 0
//过滤出所有偶数
const res = [1, 2, 3, 4].filter(isEven)
```

### 不要使用三元运算符进行复杂的计算

三元运算符适合于替代简单的 `if-else` 的情况，如果碰到较为复杂的情况，请使用 `if + return` 或者解构/默认参数的方式解决。

错误示例

```js
function formatUser(user) {
  return user === undefined
    ? 'username: noname, password: blank'
    : 'username: ' +
        (user.username === undefined ? 'noname' : user.username) +
        ', password: ' +
        (user.password === undefined ? 'blank' : user.password)
}
```

看到上面的代码就感觉到一股烂代码的味道扑面而来，这实在是太糟糕了！实际上只需要两行代码就好了！

正确示例

```js
function formatUser({ username = 'noname', password = 'blank' } = {}) {
  return `username: ${username}, password: ${password}`
}
```

### 如果变量有所关联则使用对象而非多个单独的变量

### 应该尽量解决编辑器警告

如果编辑器对我们的代码发出警告，那么一般都是我们代码出现了问题（一般开发人员的能力并不足以比肩编辑器 #MS 那些 dalao 的能力）。所以，如果出现了警告，应该先去解决它 -- 如果你确认发生了错误，则通过注释/配置禁用它！

### 使用类型定义参数对象

如果一个函数需要一个对象参数，最好专门定义一个类型，并在注释上说明，便于在使用时 IDE 进行提示，而不需要去查找文档手册。
