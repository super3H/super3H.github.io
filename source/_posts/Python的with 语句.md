---
title: Python的with 语句
categories: Python
---

# 前言
**with 语句是被设计用来简化“try / finally”语句的。**通常的用处在于共享资源的获取和释放，比如文件、数据库和线程资源。它的用法如下：
``` py
with context_exp [as var]:
    with_suit
```

# with 语句解释
with 语句也是复合语句的一种，就像 if、try 一样，它的后面也有个“：”，并且紧跟一个缩进的代码块 `with_suit`。 `context_exp` 表达式的作用是提供一个上下文管理器（Context Manager），整个 with_suit 代码块都是在这个上下文管理器的运行环境下执行的。**context_exp 可以直接是一个上下文管理器的引用，也可以是一句可执行的表达式，with 语句会自动执行这个表达式以获得上下文管理对象。**with 语句的实际执行流程是这样的：
1. 执行 `context_exp` 以获取上下文管理器
2. 加载上下文管理器的` __exit__()` 方法以备稍后调用
3. 调用上下文管理器的 `__enter__()` 方法
4. 如果有 as var 从句，则将 `__enter__()` 方法的返回值赋给 var
5. 执行子代码块` with_suit`
6. 调用上下文管理器的` __exit__()` 方法，如果 with_suit 的退出是由异常引发的，那么该异常的 type、value 和 traceback 会作为参数传给 `__exit__()`，否则传三个 None
7. 如果 `with_suit` 的退出由异常引发，并且 `__exit__() `的返回值等于 False，那么这个异常将被重新引发一次；如果 `__exit__() `的返回值等于 True，那么这个异常就被无视掉，继续执行后面的代码

# 原文参考
更详细内容请看:[Python 中的 with 语句与上下文管理器](https://my.oschina.net/lionets/blog/196197)