---
title: JavaScript 定义类
tags: JavaScript
abbrlink: 7e1583b6
date: 2018-06-28 01:39:21
updated: 2018-06-28 01:39:21
---

# 在 JavaScript 定义类

在一个新的项目时，需要在 JavaScript 中编写与后端对应的实体类时，因为不想使用下面的方法定义类了，感觉实在不够灵活...

```js
var User = {
  //more field and function
}
```

或者

```js
function User() {
  //more field and function
}
```

所以去 Google 了一下，大致发现了三种方法：

1.  构造函数法  
    经典方法，基本上是 JavaScript 书籍上都会说的方法。使用构造函数模拟 `class`，在其内部使用 `this` 关键字指代实例对象。

    ```js
    function User() {
      //注：这里所有的 property/function 都是对象级别（没错连方法都是。。。）。所以，toJSON() 方法在每个实例中都有一份，比较浪费内存，可以新建两个 User 对象 user1,user2，然后使用 user1.toJSON === user2.toJSON 验证一下，你会发现为 false...(2333)
      this.name = 'rxliuli'
      this.toJSON = function() {
        return JSON.stringify(this)
      }
    }

    //想要定义所有对象都公用的 property/function，需要使用 Object.prototype 属性（原型），例如下面定义一个公用的 toJSON() 方法
    User.prototype.toJSON = function() {
      return JSON.stringify(this)
    }
    ```

    这种方法的缺陷很明显了，定义起来实在太过麻烦，使用 Object.prototype 让对象的定义实在很不直观。

2.  Object.create() 法  
    为了解决 "构造函数法" 的缺点，更方便地生成对象，Javascript 的国际标准 ECMAScript 第五版（目前通行的是第五版），提出了一个新的方法 Object.create()。

    ```js
    var User = {
      //注：这里所有的 property/function 都是继承得到的（类似于上面的 Object.prototype），所以没有改变的 property/function 只会有一份
      name: 'rxliuli',
      toJSON: function() {
        return JSON.stringify(this)
      },
    }
    ```

    调用的话直接使用 `Object.create()` 生成实例，并不需要使用 `new`。

    ```js
    var user = Object.create(User)
    user.name = '琉璃'
    console.log(user.toJSON())
    ```

    这种方法看起来简洁很多，但不能实现私有属性和私有方法，实例之间没有共享数据，对于模拟 `class` 而言并不是很好。

3.  极简主义法
    据说是比 Object.create() 更好的方法，此方法不使用 `this` 和 `property`，代码部署起来也比较简单。  
     - 封装  
     `js var User = { createNew: function () { var user = {}; user.name = 'rxliuli'; user.toJSON = function () { return JSON.stringify(this); }; return user; } }`
    使用时调用 `User.createNew()` 即可。
    `js var user = User.createNew(); user.name = '琉璃'; console.log(name);`
    不知道你有没有发现，这里使用 createNew() 创建的对象的方法又是对象级别的了。但这种方法定义好处是，可以实现私有属性/私有方法，能够实现继承，能够在 `class` 之间共享数据，同时允许在构造对象时传入参数。

        - 继承
        通过第三种方法可以很容易实现，只要子类在创建对象时调用父类的 `createNew()` 方法即可！
        例如下面的 `Person` 和 `Student` 类。

        ```js
        var User = {
            createNew: function () {
                var user = {};
                user.name = 'rxliuli';
                user.toJSON = function () {
                    return JSON.stringify(this);
                };
                return user;
            }
        }

        var Student = {
            createNew: function () {
                var student = User.createNew();
                /*这里只定义 Student 特有的方法属性和方法即可*/
                student.grade = 1;
                return student;
            }
        }
        ```

        - 私有属性和私有方法

        在 `createNew()` 方法中，只要不是定义在 user 对象上的 property/function，就都是私有的。

        ```js
        var User = {
            createNew: function () {
                var user = {};
                user.name = 'rxliuli';
                /*私有属性（最好不要问女人的年龄哦）*/
                var age = 17;
                /*这里的变量 age 对于外部而言就是无法读取的，只有通过 user 的公有方*/法 showAge() 读取
                user.showAge = function () {
                    alert(age);
                }
                user.toJSON = function () {
                    return JSON.stringify(this);
                };
                return user;
            }
        }
        ```

        - 数据共享
        有时候我们需要所有的实例对象都共享一项数据（其实就类似于静态变量/方法啦）。这种情况数据封装到类对象的里面，`createNew()` 方法的外面就好了。
        ```js
        var User = {
            createNew: function () {
                var user = {};
                user.name = 'rxliuli';
                user.showAge = function () {
                    alert(age);
                }

                return user;
            },
            /**
            * 这个方法便是所有 User 对象公用的方法啦
            * @returns {string}
            */
            toJSON: function () {
                return JSON.stringify(this);
            }
        }
        ```
        然后生成两个实例对象，这两个实例对象的 `toJSON()` 方法是同一个，如果有个实例对象修改了，那其他所有的对象都会受到影响。
        ```js
        var user = User.createNew();
        var user2 = User.createNew();
        console.log(user.toJSON === user2.toJSON)
        ```
        还记得上面提出的发现方法 3 的一个问题么？
        > 不知道你有没有发现，这里使用 createNew() 创建的对象的方法又是对象级别的了

    这里其实可以解决一部分的，当然，前提是你的数据不需要修改，然而需要修改的数据也不该使用共享数据了。

4.  ECMAScript6 `class` 关键字  
    为了解决以上长期诟病的问题，ECMAScript6 允许使用关键字 `class` 来定义类，用于更好的模拟类。
    > 注：`class` 其实在很早以前就是 JavaScript 的关键字了，然而一直都没有使用。。。
    ```js
    class User {
      //这样就算是定义了属性和方法。。。真是简洁！
      //而且这种方法所有 property/function 默认都是定义在类的 prototype 上面的，不会造成内存上的浪费。
      name = 'rxliuli'
      toJSON = function() {
        return JSON.stringify(this)
      }
    }
    ```
    使用方法相当简单，看起来和构造函数法很是类似，实际上内部实现貌似都是一样的，只是补足了其的很多缺陷。
    ```js
    const user = new User()
    console.log(user.toJSON())
    ```
    然而，不幸的是，ECMAScript6 是在 2015 年第一次发布，虽然至今已过 3 年，然而在实际应用中（尤其而且是在传统的企业开发中使用甚少），即便浏览器对其的兼容性已经很好了（IE 是什么，能吃么？(\*´・ｖ・)），但还是要小心一些麻烦的问题。
    > 而且你的代码有可能会不被他人所看懂，从而引起抱怨（吾辈就用了一个 Java8 都会被同事抱怨，而且至今 Java8 时间 API 都不让使用。。。）

---

其实也可以直接不使用类来构建对象的，使用 `{}` 也能直接进行构建对象

```js
var user = {
  name: 'rxliuli',
  //注：这里所有的 property/function 都是对象级别（没错连方法都是。。。）。所以，toJSON() 方法在每个实例中都有一份，比较浪费内存
  toJSON: function() {
    return JSON.stringify(this)
  },
}
```

好了，一个 `user` 对象就构建好了，可以立即使用了。

```js
user.name = '琉璃'
console.log(name)
```

这种方法快速构建对象对于 function 参数而言很有帮助，然而同样缺陷极大，不适用于大量构造对象（因为每一次构建都要写这么多。。。），而且对象之间没有明显的关联。

那么，关于 JavaScript 定义类就到这里啦 (〜￣ ▽ ￣)〜
