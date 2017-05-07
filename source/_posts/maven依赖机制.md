---
title: maven依赖机制
categories: maven
---

# 案例分析
> 让我们看一个案例研究，以了解它是如何工作的。假设你想使用 Log4j 作为项目的日志。这里你要做什么？

1. 在传统方式
    1. 访问[http://logging.apache.org/log4j/](http://logging.apache.org/log4j/)
    2. 下载 Log4 j的 jar 库
    3. 复制 jar 到项目类路径
    4. 手动将其包含到项目的依赖
    5. 所有的管理需要一切由自己做
    6. 如果有 Log4j 版本升级，则需要重复上述步骤一次

2. 在Maven的方式
    1. 你需要知道 log4j 的 Maven 坐标，例如：
``` xml
<groupId>log4j</groupId>
<artifactId>log4j</artifactId>
<version>1.2.14</version>
```
    2. 它会自动下载 log4j 的1.2.14 版本库。如果“version”标签被忽略，它会自动升级库时当有新的版本时
    3. 声明 Maven 的坐标转换成 pom.xml 文件
``` xml
<dependencies>
    <dependency>
	<groupId>log4j</groupId>
	<artifactId>log4j</artifactId>
	<version>1.2.14</version>
    </dependency>
</dependencies>
```
    4. 当 Maven 编译或构建，log4j 的 jar 会自动下载，并把它放到 Maven 本地存储库
    5. 所有由 Maven 管理

# 解释说明
> 看看有什么不同？那么到底在Maven发生了什么？当建立一个Maven的项目，pom.xml文件将被解析，如果看到 log4j 的 Maven 坐标，然后 Maven 按此顺序搜索 log4j 库：
    1. 在 Maven 的本地仓库搜索 log4j 
    2. 在 Maven 中央存储库搜索 log4j
    3. 在 Maven 远程仓库搜索 log4j(如果在 pom.xml 中定义)
> Maven 依赖库管理是一个非常好的工具，为您节省了大量的工作
> `如何找到 Maven 坐标:`**访问 Maven 中心储存库，搜索下载您想要的jar。**

# 原文参考
[Maven依赖机制](http://www.yiibai.com/maven/maven-dependency-to-download-library.html)