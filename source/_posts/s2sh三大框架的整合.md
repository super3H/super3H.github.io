---
title: s2sh三大框架的整合
categories: J2EE
---
# 前言
> 断断续续的学完了三大框架，自己也想尝试整合三大框架，这里记录我碰到的问题，以及学习的过程。

# 问题
# struts有关错误
- 使用`modelDriven`遇到的错误,报错如下：

``` java
ERROR ParametersInterceptor Developer Notification (set struts.devMode to false to disable this message):
Unexpected Exception caught setting 'age' on 'class test.hhh.action.PersonAction: Error setting expression 'age' with value '20'
ERROR ParametersInterceptor Developer Notification (set struts.devMode to false to disable this message):
Unexpected Exception caught setting 'name' on 'class test.hhh.action.PersonAction: Error setting expression 'name' with value 'hhh'
```
> 原因如下:

``` java
//action中如下写
private Person model;
//由于model对象还没new，其内部为空，所以导致获取的model为null，改法如下
private Person model = new Person();
```

- spring和struts整合报错如下:
``` java
ERROR Dispatcher Dispatcher initialization failed
 Unable to load configuration. - [unknown location]
	at com.opensymphony.xwork2.config.ConfigurationManager.getConfiguration(ConfigurationManager.java:70)
	at org.apache.struts2.dispatcher.Dispatcher.getContainer(Dispatcher.java:906)
	at org.apache.struts2.dispatcher.Dispatcher.init_PreloadConfiguration(Dispatcher.java:445)
	at org.apache.struts2.dispatcher.Dispatcher.init(Dispatcher.java:486)
	at org.apache.struts2.dispatcher.InitOperations.initDispatcher(InitOperations.java:75)
	at org.apache.struts2.dispatcher.filter.StrutsPrepareAndExecuteFilter.init(StrutsPrepareAndExecuteFilter.java:63)
	at org.apache.catalina.core.ApplicationFilterConfig.initFilter(ApplicationFilterConfig.java:279)
	at org.apache.catalina.core.ApplicationFilterConfig.getFilter(ApplicationFilterConfig.java:260)
	at org.apache.catalina.core.ApplicationFilterConfig.<init>(ApplicationFilterConfig.java:105)
	at org.apache.catalina.core.StandardContext.filterStart(StandardContext.java:4572)
	at org.apache.catalina.core.StandardContext.startInternal(StandardContext.java:5215)
	at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:150)
	at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1419)
	at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1409)
	at java.util.concurrent.FutureTask.run(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
	at java.lang.Thread.run(Unknown Source)
Caused by: Cannot locate the chosen ObjectFactory implementation: spring - [unknown location]
	at org.apache.struts2.config.AbstractBeanSelectionProvider.alias(AbstractBeanSelectionProvider.java:64)
	at org.apache.struts2.config.AbstractBeanSelectionProvider.alias(AbstractBeanSelectionProvider.java:41)
	at org.apache.struts2.config.DefaultBeanSelectionProvider.register(DefaultBeanSelectionProvider.java:366)
	at com.opensymphony.xwork2.config.impl.DefaultConfiguration.reloadContainer(DefaultConfiguration.java:163)
	at com.opensymphony.xwork2.config.ConfigurationManager.getConfiguration(ConfigurationManager.java:67)
	... 17 more
三月 01, 2017 9:48:48 下午 org.apache.catalina.core.StandardContext filterStart
```
> 解释:<font color='#ED8F76'>struts没有交给spring管理或者你根本没导入`struts2-spring-plugin-2.5.5.jar`。和以下配置</font>
``` xml
<constant name="struts.objectFactory" value="spring"></constant>
```

# hibernate有关错误
- 错误如下
``` java
Already value [org.springframework.orm.hibernate5.SessionHolder@43826ec] for key [org.hibernate.internal.SessionFactoryImpl@304a3655] bound to thread [main]
```
- 解决方案:<font color='#FF0000'>由于spring配置问题，类`LocalSessionFactoryBean`应该来自于`org.springframework.orm.hibernate5`而不是`org.springframework.orm.hibernate4`</font>
``` xml
<!--注意:PersonDaoImpl和LocalSessionFactoryBean都要来自于hibernate5的包下-->
<bean id="sessionFactory" class="org.springframework.orm.hibernate5.LocalSessionFactoryBean">
		<property name="dataSource" ref="dataSource"></property>
		<property name="configLocation">
			<value>classpath:hibernate.cfg.xml</value>
		</property>
	</bean>
	
	<bean id="personDao" class="test.hhh.dao.Impl.PersonDaoImpl" >
		<property name="factory" ref="sessionFactory"></property>
	</bean>
	
	<tx:annotation-driven transaction-manager="transactionManager"/>
	<bean id="transactionManager" class="org.springframework.orm.hibernate5.HibernateTransactionManager">
		<property name="sessionFactory" ref="sessionFactory"></property>
	</bean>
```
> `PersonDaoImpl和LocalSessionFactoryBean`来自的包必须相同，不能一个来自于`hibernate5`一个`hibernate4`

# s2sh整合时遇到错误
- web.xml中spring的配置如下:
``` xml
<context-param>
  	<param-name>contextConfigLocation</param-name>
  	<param-value>WEB-INF/classes/applicationContext.xml</param-value>
  </context-param>
```
> 读取时从创建时候设置的文件目录读取，所以此处要加`WEB-INF/classes/`或者从src下读取，即添加以下配置`classpath:applicationContext.xml`否者会报错

- applicationContext.xml中导入数据源配置文件:
``` xml
<bean class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
		<property name="location">
			<value>classpath:dataSource.properties</value>
		</property>
	</bean>
```
> 注意：<font color='#ED8F76'>**加上classpath是让spring从src中读取**</font>

# Log4J日志配置
## 所需jar包
- 如下图
![](s2sh三大框架的整合/1.png)

## web.xml配置如下
``` xml
<!-- log4j配置，文件路径，因为是跟随项目启动 -->
	<context-param>
		<param-name>log4jConfigLocation</param-name>
		<param-value>classpath:log4j.properties</param-value>
	</context-param>
	<context-param>
		<param-name>loggingLevel</param-name>
		<param-value>info</param-value>
	</context-param>
	<!-- 加载log4j配置文件 -->
	<listener>
		<listener-class>org.springframework.web.util.Log4jConfigListener</listener-class>
	</listener>
```

## log4J.properties配置
``` properties
# Define the root logger with appender file
log4j.rootLogger = DEBUG, FILE

# Define the file appender
log4j.appender.FILE=org.apache.log4j.FileAppender
# Set the name of the file
log4j.appender.FILE.File=G:\\log4J\u65E5\u5FD7\\s2sh_test01\\htmlLayout.html

# Set the immediate flush to true (default)
log4j.appender.FILE.ImmediateFlush=true

# Set the threshold to debug mode
log4j.appender.FILE.Threshold=debug

# Define the layout for file appender
log4j.appender.FILE.layout=org.apache.log4j.HTMLLayout
log4j.appender.FILE.layout.Title=HTML Layout Example
log4j.appender.FILE.layout.LocationInfo=true
```

# 参考链接
[Struts2学习笔记——Struts2与Spring整合](http://www.cnblogs.com/S-E-P/archive/2012/01/18/2325253.html)