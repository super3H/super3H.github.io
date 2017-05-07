---
title: python is和==的区别
categories: Python
---
# is和==的区别

`Python`中的对象包含三要素：`id`、`type`、``value``。
其中`id`用来唯一标识一个对象，`type`标识对象的类型，`value`是对象的值。
`is`判断的是a对象是否就是b对象，是通过`id`来判断的。
`==`判断的是a对象的值是否和b对象的值相等，是通过`value`来判断的
![](http://img.my.csdn.net/uploads/201303/05/1362459851_8030.jpg)