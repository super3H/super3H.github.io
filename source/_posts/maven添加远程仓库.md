---
title: maven添加远程仓库
categories: maven
---
# Java.net资源库
> 添加Java.net远程仓库的详细信息在“pom.xml”文件
``` xml
<!--pom.xml-->
<project ...>
<repositories>
    <repository>
      <id>java.net</id>
      <url>https://maven.java.net/content/repositories/public/</url>
    </repository>
 </repositories>
</project>
```

# JBoss Maven存储库
> 添加JBoss远程仓库的详细信息在 “pom.xml” 文件中
``` xml
<project ...>
    <repositories>
      <repository>
	<id>JBoss repository</id>
	<url>http://repository.jboss.org/nexus/content/groups/public/</url>
      </repository>
    </repositories>
</project>
```

# 原文参考
[Maven添加远程仓库](http://www.yiibai.com/maven/add-remote-repository-in-maven-pom-xml.html)