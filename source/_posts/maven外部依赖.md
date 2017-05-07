---
title: maven外部依赖
categories: maven
---

# maven外部依赖
> 正如大家所了解的那样，Maven确实使用 Maven 库的概念作依赖管理。但是，如果依赖是在远程存储库和中央存储库不提供那会怎么样？ Maven 提供为使用外部依赖的概念，就是应用在这样的场景中的。
> 举一个例子，让我们在[Maven创建项目](http://www.yiibai.com/maven/maven_creating_project.html)这一章节中创建的项目做以下的修改
    - 添加 lib 文件夹到 src 文件夹
    - 复制任何的 jar 到 lib 文件夹。这里使用的是 ldapjdk.jar，这是 LDAP 操作的辅助库
> 目录结构如下:
![](maven外部依赖/1.jpg)
> 在这里，在项目中指定自己所用的库，它可以包含 jar 文件，但是可能无法在任何 Maven 存储库找到，那么需要从外部下载。如果代码使用这个 Maven 库但没有办法找到，那么 Maven 构建将会失败，因为它在编译阶段使用指这个库无法下载或无法找到。
> 要处理这种情况，*需要添加外部依赖项*，如使用下列方式在 Maven 的 pom.xml 
``` xml
<project xmlns="http://maven.apache.org/POM/4.0.0" 
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
   http://maven.apache.org/maven-v4_0_0.xsd">
   
   <modelVersion>4.0.0</modelVersion>
   <groupId>com.companyname.bank</groupId>
   <artifactId>consumerBanking</artifactId>
   <packaging>jar</packaging>
   <version>1.0-SNAPSHOT</version>
   <name>consumerBanking</name>
   <url>http://maven.apache.org</url>

   <dependencies>
      <dependency>
         <groupId>junit</groupId>
         <artifactId>junit</artifactId>
         <version>3.8.1</version>
         <scope>test</scope>
      </dependency>

      <dependency>
         <groupId>ldapjdk</groupId>
         <artifactId>ldapjdk</artifactId>
         <scope>system</scope>
         <version>1.0</version>
         <systemPath>${basedir}\src\lib\ldapjdk.jar</systemPath>
      </dependency>
   </dependencies>

</project>
```
> 再看上面例子中的第二个依赖元素（dependency），它清除以下有关外部依赖的重要概念。
    - 外部依赖（JAR库的位置）可以在 pom.xml 中配置为与其他依赖的方式相同；
    - 指定 groupId 同样作为库的名称；
    - 指定 artifactId 同样作为库的名称
    - 指定范围的系统；
    - 指定相系统项目的位置；

# 原文链接
详情请参考[Maven外部依赖](http://www.yiibai.com/maven/maven_external_dependencies.html)