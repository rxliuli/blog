// // /**
// //  * 基本的树结构节点
// //  */
// // function Node(id, name, parentId, childrens) {
// //   this.id = id
// //   this.name = name
// //   this.parentId = parentId
// //   this.childrens = childrens
// // }

// // Node.rootId = 0

// // /**
// //  * 将树节点数组转换为树结构
// //  * 不存在的父节点的树节点会被忽略
// //  * 复杂度为 On^2
// //  * @param {Array} nodes 树节点数组
// //  */
// // function convertToNode(nodes) {
// //   const newArr = []
// //   nodes.forEach(v => {
// //     // 判断是否是根节点
// //     if (Node.rootId === v.parentId) {
// //       newArr.push(v)
// //     }
// //     nodes.forEach(v2 => {
// //       // 判断节点是否属于当前外层循环的子节点
// //       if (v2.parentId === v.id) {
// //         if (!v.childrens) {
// //           v.childrens = []
// //         }
// //         // 是的话就添加到子节点列表
// //         v.childrens.push(v2)
// //       }
// //     })
// //   })
// //   return newArr
// // }

// // // 测试
// // // 生成一个树节点数组
// // const arr = [
// //   new Node(1, '节点 0', 0),
// //   new Node(2, '节点 1', 1),
// //   new Node(3, '节点 0', 0),
// //   new Node(4, '节点 0', 1),
// //   new Node(5, '节点 0', 2),
// //   new Node(6, '节点 0', 3),
// //   new Node(7, '节点 0', 8)
// // ]
// // console.log(arr)

// // console.log(convertToNode(arr))

// // /**
// //  * 轮询等待指定资源加载完毕再执行操作
// //  * 使用 Promises 实现，可以使用 ES7 的 {@async}/{@await} 调用
// //  * @param {Function} resourceFn 判断必须的资源是否存在的方法
// //  * @param {Object} options 选项
// //  * @returns Promise 对象
// //  */
// // function waitResource(resourceFn, options) {
// //   var optionsRes = Object.assign(
// //     {
// //       interval: 1000,
// //       max: 10
// //     },
// //     options
// //   )
// //   var current = 0
// //   return new Promise((resolve, reject) => {
// //     var timer = setInterval(() => {
// //       if (resourceFn()) {
// //         clearInterval(timer)
// //         resolve()
// //       }
// //       current++
// //       if (current >= optionsRes.max) {
// //         clearInterval(timer)
// //         reject('等待超时')
// //       }
// //     }, optionsRes.interval)
// //   })
// // }

// // var resourceFn = (i => () => {
// //   console.log(`第 ${i++} 次调用`)
// //   return false
// // })(1)

// // waitResource(resourceFn, {
// //   interval: 1000,
// //   max: 3
// // })
// //   .then(() => console.log('完成'))
// //   .catch(err => console.log(err))

// // async function foo() {
// //   try {
// //     await waitResource(
// //       () => {
// //         console.log(`第 ${i++} 次调用`)
// //         return i > 17
// //       },
// //       {
// //         interval: 1000,
// //         max: 3
// //       }
// //     )
// //     console.log('完成')
// //   } catch (err) {
// //     console.log(err)
// //   }
// // }

// // /**
// //  * 等待被调用
// //  * @param {Number} ms 超时毫秒数
// //  * @param {String} name 准备被调用的挂载到 window 对象上的方法名
// //  */
// // function waitingToCall(ms, name = 'waiting') {
// //   return new Promise((resolve, reject) => {
// //     var timeout = setTimeout(() => {
// //       reject('等待超时')
// //     }, ms)
// //     window[name] = () => {
// //       clearTimeout(timeout)
// //       resolve()
// //     }
// //   })
// // }

// // window.waitingToCall = (() => {
// //   var timeout = setTimeout(() => {
// //     // 超时之后的操作
// //     console.log('等待超时')
// //   }, 10000)
// //   return () => {
// //     // 真正执行任务的代码
// //     clearTimeout(timeout)
// //   }
// // })()

// // waitingToCall(3000, 'waiting')
// //   .then(() => console.log('完成'))
// //   .catch(err => console.log(err))

// // wait(1000).then(() => console.log(完成))

// // var wait = ms => new Promise(resolve => setTimeout(resolve, ms))

// // function jsonp(url) {
// //   var scriptEl = document.createElement('script')
// //   scriptEl.src = url
// //   document.body.append(scriptEl)
// // }

// // var exam = [
// //   {
// //     name: '琉璃',
// //     subject: '语文',
// //     score: 75
// //   },
// //   {
// //     name: '琉璃',
// //     subject: '语文',
// //     score: 90
// //   },
// //   {
// //     name: '琉璃',
// //     subject: '英语',
// //     score: 85
// //   },
// //   {
// //     name: '楚轩',
// //     subject: '数学',
// //     score: 100
// //   },
// //   {
// //     name: '楚轩',
// //     subject: '物理',
// //     score: 100
// //   },
// //   {
// //     name: '张三',
// //     subject: '化学',
// //     score: 40
// //   },
// //   {
// //     name: '李四',
// //     subject: '生物',
// //     score: 100
// //   }
// // ]

// function rowToCol(arr) {
//   /**
//    * js 数组按照某个条件进行分组
//    * 注：分组完成后会得到一个二维数组，并且顺序会被打乱
//    * 时间复杂度为 2On
//    * @param fn 分组条件函数
//    */
//   Array.prototype.groupBy = function(fn = item => JSON.stringify(item)) {
//     // 将元素按照分组条件进行分组得到一个 条件 -> 数组 的对象
//     const obj = {}
//     this.forEach(item => {
//       const name = fn(item)
//       // 如果已经有这个键了就直接追加, 否则先将之赋值为 [] 再追加元素
//       ;(obj[name] || (obj[name] = [])).push(item)
//     })
//     // 将对象转换为数组
//     return Object.keys(obj).map(key => obj[key])
//   }

//   /**
//    * js 的数组去重方法
//    * 注: 极大量的数组尽量避免使用该方法, 该方法效率很高但内存但代价是内存占用
//    * @returns {*[]} 进行去重操作之后得到的新的数组 (原数组并未改变)
//    */
//   Array.prototype.uniqueBy = function(fn = item => JSON.stringify(item)) {
//     const obj = {}
//     return this.filter(function(item) {
//       return obj.hasOwnProperty(fn(item)) ? false : (obj[fn(item)] = true)
//     })
//   }

//   const subjectMap = (obj => () => Object.assign({}, obj))(
//     arr
//       .map(row => row.subject)
//       .uniqueBy()
//       .reduce((res, subject) => {
//         res[subject] = 0
//         return res
//       }, {})
//   )
//   return arr
//     .groupBy(row => row.name)
//     .map(arr =>
//       arr
//         .uniqueBy(row => row.subject)
//         .reduce((res, temp) => {
//           res = Object.assign(subjectMap(), res)
//           res.name = temp.name
//           res[temp.subject] = temp.score
//           return res
//         }, {})
//     )
// }

// // var i = exam
// //   .groupBy(row => row.name)
// //   .map(arr =>
// //     arr
// //       .uniqueBy(row => row.subject)
// //       .reduce((res, temp) => {
// //         Object.assign(res, subjectMap)
// //         res.name = temp.name
// //         res[temp.subject] = temp.score
// //         return res
// //       }, {})
// //   )

// // var exam = [
// //   {
// //     语文: 75,
// //     英语: 85,
// //     数学: 0,
// //     物理: 0,
// //     化学: 0,
// //     生物: 0,
// //     name: '琉璃'
// //   },
// //   {
// //     语文: 0,
// //     英语: 0,
// //     数学: 100,
// //     物理: 100,
// //     化学: 0,
// //     生物: 0,
// //     name: '楚轩'
// //   },
// //   {
// //     语文: 0,
// //     英语: 0,
// //     数学: 0,
// //     物理: 0,
// //     化学: 40,
// //     生物: 0,
// //     name: '张三'
// //   },
// //   {
// //     语文: 0,
// //     英语: 0,
// //     数学: 0,
// //     物理: 0,
// //     化学: 0,
// //     生物: 100,
// //     name: '李四'
// //   }
// // ]

// // /**
// //  * 列转行
// //  * @param {Array} arr 需要进行列转行的数组
// //  * @returns {Array} 列转行得到的数组
// //  */
// // function colToRow(arr) {
// //   // 定义好需要进行合并列的数组
// //   var cols = ['语文', '英语', '数学', '物理', '化学', '生物']
// //   return arr.flatMap(row =>
// //     cols
// //       .map(subject => ({
// //         name: row.name,
// //         subject: subject,
// //         score: row[subject]
// //       }))
// //       .filter(newRow => newRow.score != 0)
// //   )
// // }

// // /**
// //  * 行转列
// //  * @param {Array} arr 需要进行行转列的数组
// //  * @returns {Array} 行转列得到的数组
// //  */
// // function rowToCol(arr) {
// //   /**
// //    * js 数组按照某个条件进行分组
// //    * 注：分组完成后会得到一个二维数组，并且顺序会被打乱
// //    * 时间复杂度为 2On
// //    * @param {Function} {fn} 元素分组的方法，默认使用 {@link JSON.stringify()}
// //    * @returns {Array} 新的数组
// //    */
// //   Array.prototype.groupBy = function(fn = item => JSON.stringify(item)) {
// //     // 将元素按照分组条件进行分组得到一个 条件 -> 数组 的对象
// //     const obj = {}
// //     this.forEach(item => {
// //       const name = fn(item)
// //       // 如果已经有这个键了就直接追加, 否则先将之赋值为 [] 再追加元素
// //       ;(obj[name] || (obj[name] = [])).push(item)
// //     })
// //     // 将对象转换为数组
// //     return Object.keys(obj).map(key => obj[key])
// //   }

// //   /**
// //    * js 的数组去重方法
// //    * @param {Function} {fn} 唯一标识元素的方法，默认使用 {@link JSON.stringify()}
// //    * @returns {Array} 进行去重操作之后得到的新的数组 (原数组并未改变)
// //    */
// //   Array.prototype.uniqueBy = function(fn = item => JSON.stringify(item)) {
// //     const obj = {}
// //     return this.filter(function(item) {
// //       return obj.hasOwnProperty(fn(item)) ? false : (obj[fn(item)] = true)
// //     })
// //   }

// //   /**
// //    * 获取所有的科目 -> 分数映射表
// //    * 看起来函数有点奇怪，但实际上只是一个闭包函数而已
// //    * @returns {Object} 所有的科目 -> 分数映射表的拷贝
// //    */
// //   const subjectMap = (obj => () => Object.assign({}, obj))(
// //     arr
// //       .map(row => row.subject)
// //       .uniqueBy()
// //       .reduce((res, subject) => {
// //         res[subject] = 0
// //         return res
// //       }, {})
// //   )
// //   return arr
// //     .groupBy(row => row.name)
// //     .map(arr =>
// //       arr
// //         .uniqueBy(row => row.subject)
// //         .reduce((res, temp) => {
// //           res = Object.assign(subjectMap(), res)
// //           res.name = temp.name
// //           res[temp.subject] = temp.score
// //           return res
// //         }, {})
// //     )
// // }

// // document
// //   .querySelectorAll('*')
// //   .forEach(el => (el.onclick = event => console.log('点击了')))
// // document.onclick = event => console.log('点击了')
// // document.addEventListener('copy', event => false, true)(
// //   <body oncopy="javascript: return false" />
// // )
// // var _obj
// // for (let obj = { len: 0 }; obj.len < 3; console.log(obj === _obj), obj.len++) {
// //   _obj = obj
// //   setTimeout(() => console.log(obj.len), 0)
// // }

// // for (var i = 0; i < 3; i++) {
// //   setTimeout(() => console.log(i), 0)
// // }

// // for (let i = 0; i < 3; i++) {
// //   i = i * 2
// //   setTimeout(() => console.log(i), 0)
// // }

// // ;(() => {
// //   for (var i = 0; i < 3; i++) {
// //     ;(i => {
// //       setTimeout(() => console.log(i), 0)
// //     })(i)
// //   }
// // })()

// // /**
// //  * 封装 fetch 请求
// //  * @param {RequestInfo} url 请求信息
// //  * @param {RequestInit} init 请求参数设置
// //  */
// // async function _fetch(url, init) {
// //   const defaultInit = {
// //     method: 'get',
// //     credentials: 'include',
// //     headers: {
// //       Authorization: localStorage.userToken
// //     }
// //   }
// //   Object.assign(defaultInit, init)
// //   switch (defaultInit.method) {
// //     case 'get':
// //       break
// //     case 'post':
// //       break
// //     default:
// //       break
// //   }

// //   const res = await fetch(url)
// //   const json = await res.json()
// //   return json
// // }

// function print(user) {
//   if (!user) {
//     user = {}
//   }
//   if (!user.name) {
//     user.name = '未设置'
//   }
//   if (!user.age) {
//     user.age = 0
//   }
//   console.log(`姓名：${user.name}，年龄：${user.age}`)
// }

// function print(user) {
//   user = user ? user : {}
//   console.log(
//     `姓名：${user.name ? user.name : '未设置'}，年龄：${
//       user.age ? user.age : 0
//     }`
//   )
// }

// function print(user) {
//   user = user || {}
//   console.log(`姓名：${user.name || '未设置'}，年龄：${user.age || 0}`)
// }

// function print(user) {
//   console.log(
//     `姓名：${(user && user.name) || '未设置'}，年龄：${(user && user.age) || 0}`
//   )
// }

// function print(user) {
//   _user = {
//     name: '未设置',
//     age: 0
//   }
//   user = Object.assign(_user, user)
//   console.log(`姓名：${user.name}，年龄：${user.age}`)
// }

// var arr = [1, 2, 3, 4]
// var [first, second, ...remaining] = arr // first: 1, second: 2, remaining: [3, 4]
// console.log(`first: ${first}, second: ${second}, remaining: ${remaining}`)
// // 接受一或多个可变参数的函数
// function join(...arr) {
//   return arr.join(', ')
// }
// // 调用时可以使用 ... 将数组解构
// join(...arr) // 1, 2, 3, 4
// // 忽略开始的某些值
// var [, , ...remaining] = arr // remaining: [3, 4]
// // 默认值
// var [first = 1, second = 2, ...remaining] = [] // first: 1, second: 2, remaining:
// var a = 1,
//   b = 2
// ;[a, b] = [b, a] // a: 2, b: 1

// // 对象解构
// var user = {
//   id: 1,
//   name: '未设置',
//   age: 0,
//   sex: false
// }
// var { name, age, ...rest } = user // name: '未设置', age: 0, 其他属性: { "id": 1,"sex": false }

// // 使用新的变量名
// var { name: newName, age: newAge } = user // newName: '未设置', newAge: 0
// // 默认值
// var { name = '未设置', age = 0 } = {} // name: '未设置', age: 0
// // 同时使用新的变量名和默认值
// var { name: newName = '未设置', age: newAge = 0 } = user // newName: '未设置', newAge: 0
// // 计算属性名
// var key = 'name'
// var { [key]: name } = user
// // 数组迭代
// var users = [
//   {
//     name: '琉璃',
//     age: 17
//   },
//   {
//     name: '楚轩',
//     age: 23
//   }
// ]
// users.map(({ name, age }) => `name: ${name}, age: ${age}`).join('\n')
// // 解构函数实参
// function print({ name = '未设置', age = 0 } = {}) {
//   console.log(`姓名：${name}，年龄：${age}`)
// }

// ;(async () => {
//   await wait(1000)
//   console.log(`username: ${username}, password: ${password}`)
// })()

/*const htmlStr = `<a href="#"/>`;
console.log(`htmlStr: `)
