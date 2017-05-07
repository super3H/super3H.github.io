---
title: Java-ValueOf
categories: JavaSE
---

# value of
- Integer valueOf(int i)：返回一个表示指定的 int 值的 Integer 实例。
- Integer valueOf(String s):返回保存指定的 String 的值的 Integer 对象。
- Integer valueOf(String s, int radix): 返回一个 Integer 对象，该对象中保存了用第二个参数提供的基数进行解析时从指定的 String 中提取的值。

# 题目
``` java
System.out.println(Integer.valueOf("127")==Integer.valueOf("127"));//true
System.out.println(Integer.valueOf("128")==Integer.valueOf("128"));//false
System.out.println(Integer.parseInt("128")==Integer.valueOf("128"));//true
```
# 解析
看官方文档可以发现:
> `This method will always cache values in the range -128 to 127`
默认会缓存-128到127间的值，因为128没有被缓存，所以每次调用，都会生成一个新的整型对象，因此两个128整型对象是不同的对象。


