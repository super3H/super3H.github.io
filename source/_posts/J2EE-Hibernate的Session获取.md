---
title: hibernate中openSession()跟getCurrentSession()的区别
categories: J2EE
---

# openSession()与getCurrentSession()
1. 采用`getCurrentSession()`创建的Session会绑定到当前的线程中去、而采用`OpenSession()`则不会。**查询也需要开事务，否则会报错**
2. 采用`getCurrentSession()`创建的Session在commit或rollback后会自动关闭，采用`OpenSession()`必须手动关闭。
3. 采用`getCurrentSession()`需要在`Hibernate.cfg.xml`配置文件中加入如下配置：

> 如果是本地事物，及JDBC一个数据库：`<property name=”current_session_context_class”>thread</property>`
> 如果是全局事物，及jta事物、多个数据库资源或事物资源：`<property name=”current_session_context_class”>jta</property>`
> 使用spring的getHiberanteTemplate 就不需要考虑事务管理和session关闭的问题

# 补充
> `openSession`创建session时autoCloseSessionEnabled参数为false，即在事物结束后不会自动关闭session，需要手动关闭，如果不关闭将导致session关联的数据库连接无法释放，最后资源耗尽而使程序当掉。              

> `getCurrentSession`创建session时autoCloseSessionEnabled，flushBeforeCompletionEnabled都为true，并且session会同sessionFactory组成一个map以sessionFactory为主键绑定到当前线程。

> `getCurrentSession()`:从上下文（配置文件current_session_context_class: thread 使用Connection自动管理；jta(java transaction api) 由Application Server提供的分布式事务管理，Tomcat本身不具备此能力，JBoss、WebLogic具备）找，如果有，则用旧的，否则创建新的，**事务提交自动Close；**

# 本地事务和全局事务
- `全局事务：`资源管理器管理和协调的事务，可以跨越多个数据库和进程。资源管理器一般使用 XA 二阶段提交协议与“企业信息系统”(EIS) 或数据库进行交互。 
- `本地事务：`在单个 EIS 或数据库的本地并且限制在单个进程内的事务。本地事务不涉及多个数据来源。

## 在Hibernate配置文件中有这么两种配置方式:
1. 如果使用的是本地事务（jdbc事务）`<property name="hibernate.current_session_context_class">thread</property>`,这个是我们常用的选项,只针对一个数据库进行操作，也就是说只针对一个事务性资源进行操作.
2. 如果使用的是全局事务（jta事务）
`<property name="hibernate.current_session_context_class">jta</property>`
>  以前我们学习的事务类型都属于本地事务。 `JTA`(全局事务)和`thread`(本地事务)有什么区别呢？在某些应用场合，只能使用全局事务，比如： 有两个数据库：
> `mysql` 和 `oracle`  现在有个业务需求--转账 :
``` sql
step 1> update mysql_table set amount=amount-xx where id=aaa 
/*发生扣钱,假设是在mysql数据库扣钱的。 */
step 2> update oracle_table set amount=amount+xx where id=bbb
/* 加钱,假设是在oracle数据库扣钱的。 */
```
> 现在怎么确保两个语句在同一个事务里执行呢？ 
``` sql
/*以前在JDBC里是这样做 */
connection = mysql /*连接mysql */
connection.setAutoCommit(false);  /*不自动提交 */
1> update mysql_table set amount=amount-xx where id=aaa
 /*发生扣钱,假设是在mysql数据库扣钱的。 */
2> update oracle_table set amount=amount+xx where id=bbb 
 /*发生在oracle数据库 */
connection.commit(); 
```
> 执行这两条语句，然后通过`connection`对象提交事务.我们这样子做只能确保这两个语句在同一个数据库`mysql`里面实现在同一个事务里执行。 但是问题是我们现在是要连接到`oracle`数据库，是不是需要`connection2`啊？

``` sql
connection = mysql /*连接mysql */
connection2 = oracle /*连接oracle */
connection.setAutoCommit(false);  /*不自动提交 */
1> update mysql_table set amount=amount-xx where id=aaa /*发生扣钱,假设是在mysql数据库扣钱的。 */
2> update oracle_table set amount=amount+xx where id=bbb  /*发生在oracle数据库 /*
connection.commit(); 
connection2.setAutoCommit(false); 
connection2.commit();
```

> 事务只能在一个`connection`里打开，并且确保两条语句都在该`connection`里执行，这样才能让两条语句在同一事务里执行，现在问题就在于**connection2是连接到oracle数据库的，那么connection2再开事务有意义吗？它能确保吗？不能，所以在这种情况下就只能使用全局事务了。** 
这种情况下用普通JDBC操作是满足不了这个业务需求的，这种业务需求只能使用全局事务，本地事务是无法支持我们的操作的，因为这时候，**事务的生命周期不应该局限于connection对象的生命周期范围**
> 全局事务怎么做呢？ 

``` sql
JPA.getUserTransaction().begin();      /*首先要全局事务的API,不需要我们编写，通常容器已经提供给我们了，我们只需要begin一下 */
connection = mysql /*连接mysql */
connection2 = oracle /*连接oracle*/
connection--> update mysql_table set amount=amount-xx where id=aaa /*发生扣钱,假设是在mysql数据库扣钱的。 */
connection2--> update oracle_table set amount=amount+xx where id=bbb /*发生在oracle数据库 */
JPA.getUserTransaction().commit(); 
```
> 那么它是怎么知道事务该提交还是回滚呢？ 
> 这时候它使用了二次提交协议。二次提交协议简单说就这样：**如果你先执行第一条语句，执行的结果先预提交到数据库，预提交到数据库了，数据库会执行这条语句，然后返回一个执行的结果，这个结果假如我们用布尔值表示的话，成功就是true，失败就是false.然后把执行的结果放入一个（假设是List）对象里面去，接下来再执行第二条语句，执行完第二条语句之后（也是预处理，数据库不会真正实现数据的提交，只是说这条语句送到数据库里面，它模拟下执行，给你返回个执行的结果），假如这两条语句的执行结果在List里面都是true的话，那么这个事务就认为语句是成功的，这时候全局事务就会提交。**二次提交协议，数据库在第一次提交这个语句时，只会做预处理，不会发生真正的数据改变，当我们在全局事务提交的时候，这时候发生了第二次提交，那`么第二次提交的时候才会真正的发生数据的改动。 `
   **如果说在执行这两条语句中，有一个出错了，那么List集合里就有个元素为false，那么全局事务就认为你这个事务是失败的，它就会进行回滚**，回滚的时候，哪怕你的第二条语句在第一次提交的时候是成功的，它在第二次提交的时候也会回滚，那么第一次的更改也会恢复到之前的状态，这就是二次提交协议。（可以查看一下数据库方面的文档来了解二次提交协议）
# 原文链接
[hibernate中openSession()跟getCurrentSession()方法之间的区别 ](http://www.cnblogs.com/Ant-soldier/p/5051478.html)
[事务-本地事务和全局事务](http://www.cnblogs.com/ysch/p/4234311.html)