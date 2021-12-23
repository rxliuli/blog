---
layout: post
title: TypeScript 函数根据第一个参数推导后面参数的类型
abbrlink: 2d9be16aabe14b50abff58cf979b9ec3
tags:
  - typescript
date: 1585791059335
updated: 1585810857420
sticky: null
---

## 问题

在编写一个重载函数时，吾辈发现了 ts 的方法签名问题。

```ts
enum TypeEnum {
  A,
  B,
}

type A = {
  a: string;
};
type B = {
  b: number;
};

//region 普通参数

function fn1(type: TypeEnum.A, obj: A): void;
function fn1(type: TypeEnum.B, obj: B): void;
function fn1(type: TypeEnum, obj: A | B) {}

//endregion
```

上面是一个简单的重载函数，吾辈希望在输入第一个参数 `type` 之后，ts 就能匹配到正确的参数，然而事实上，ts 并没能完全做到。

![ts 类型提示](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20200402140820.png)

当然，如果真的这样写 ts 的类型检查仍然能正确地抛出错误消息，然而未能推导终究是有点问题的。

```ts
// TS2769: No overload matches this call.   Overload 1 of 2, '(type: TypeEnum.A, obj: A): void', gave the following error.     Argument of type '{ a: string; b: number; }' is not assignable to parameter of type 'A'.       Object literal may only specify known properties, and 'b' does not exist in type 'A'.   Overload 2 of 2, '(type: TypeEnum.B, obj: B): void', gave the following error.     Argument of type 'TypeEnum.A' is not assignable to parameter of type 'TypeEnum.B'
fn1(TypeEnum.A, {
  a: "",
  b: 1,
});
```

然后，吾辈想到了几种方式可以尝试解决。

## 解决

### 继承

尝试使用继承限制字段的类型。

```ts
//region 对象参数

function fn2(arg: { type: TypeEnum.A; obj: A }): void;
function fn2(arg: { type: TypeEnum.B; obj: B }): void;
function fn2(arg: { type: TypeEnum; obj: A | B }) {}

fn2({
  type: TypeEnum.A,
  obj: {
    a: "",
  },
});

//endregion
```

很遗憾的是，这是行不通的，即便是下面的这种变体，仍然是不可行的。

![继承](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20200402145908.png)

```ts
interface Base<T extends TypeEnum> {
  type: T;
}

interface IA extends Base<TypeEnum.A> {
  obj: A;
}
interface IB extends Base<TypeEnum.B> {
  obj: B;
}

function fn2(arg: IA | IB) {}
```

### 泛型

事实上，使用泛型确实可以做到让 ts 的类型更加 **正确**。

![泛型](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20200402145745.png)

缺点：

- 不能使用 ts 的重载
- 需要函数的作者改变思维

```ts
//region 泛型

type EnumTypeMapGen<
  T extends string[],
  M extends { [P in TypeEnum]: any }
> = [];
type TypeMap = {
  [TypeEnum.A]: A;
  [TypeEnum.B]: B;
};

function fn3<T extends TypeEnum, Arg extends TypeMap[T]>(type: T, obj: Arg) {}

fn3(TypeEnum.A, {
  a: "",
});

//endregion
```

### 高阶函数

最后，高阶函数可以简单的解决这个问题，它将一次调用更改为两次调用，第一次调用返回的函数便已经确认了类型。

![高阶函数](https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20200402145633.png)

缺点：

- 需要使用者接收这种 **函数式** 的调用方式

```ts
//region 高阶函数

function fn4(type: TypeEnum.A): (obj: A) => void;
function fn4(type: TypeEnum.B): (obj: B) => void;
function fn4(type: TypeEnum): any {}

fn4(TypeEnum.A)({
  a: "",
});

//endregion
```

## 总结

总的而言，泛型和高阶函数都能解决这个问题，吾辈个人倾向于泛型，因为它并未改变调用者的使用方式，而是让作者去改变，避免改变函数的接口本身。
