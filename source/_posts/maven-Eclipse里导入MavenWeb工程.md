---
title: maven-Eclipse里导入MavenWeb工程
categories: maven
---

# 原文链接
详情参考[使用Eclipse创建Maven Web工程](http://jingyan.baidu.com/article/9f63fb91a7d2a5c8400f0e20.html)

# 所遇到的问题
> pom.xml报错:`web.xml is missing and <failOnMissingWebXml> is set to true`

# 解决方案
> 这时候需要**右击项目——>Java EE Tools——>Generate Deployment Descriptor Stub.然后系统会在src/main/webapp/WEB_INF文件加下创建web.xml文件。**错误解决！
> 当然这个方法是针对web项目的解决方案，如果你的工程不是web项目，那么还有另外一种解决方案，就是在pom文件中配置一下failOnMissingWebXml。具体配置如下：
``` xml
<build>
  <plugins>
   <plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-war-plugin</artifactId>
    <version>2.6</version>
    <configuration>
     <failOnMissingWebXml>false</failOnMissingWebXml>
    </configuration>
   </plugin>
  </plugins>
 </build>
```
