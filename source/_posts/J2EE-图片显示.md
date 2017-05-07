---
title: J2EE-浏览器中显示图片
categories: J2EE
---
# servlet中的显示图片
## 前端改法
> Jsp中改法如下:
``` jsp
<img  src="${pageContext.request.contextPath}/clientServlet?operation=showImg" />
```

## 后台改法
> `Servlet`改法如下:
``` java
private void showImg(HttpServletRequest req, HttpServletResponse resp) {
		String showImg = req.getParameter("showImg");
		String storePath = getPath(req, resp);//拿到
根路径		try{
			InputStream in = new FileInputStream(new File(storePath+"\\"+showImg));
			OutputStream out = resp.getOutputStream();
			byte[] b = new byte[1024];
			int len = 0;
			while((len = in.read(b))!=-1){
				out.write(b, 0, len);
				out.flush();
			}
			out.close();
			in.close();
		}catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
	}
```

## 详细内容
请参考[JavaWeb将图片显示在浏览器中](http://blog.csdn.net/woshixuye/article/details/19084501)

# struts2框架中的配置
## 前端改法
> Jsp中改法如下:
``` html
<img width="200px" height="100px"
				src="<s:url action='weibo_showImg'>
					<s:param name='id' value='#weibo.id'></s:param>
				</s:url>" />
```

## 后台改法
> `action`中改法如下:
``` java
public String showImg() throws IOException{
		Weibo weibo = service.findWeiboById(model.getId());
		OutputStream out = ServletActionContext.getResponse().getOutputStream();
		InputStream in = new FileInputStream(getFilePath(weibo.getPath(), weibo.getFileName()));
		byte[] b = new byte[1024];
		int len = 0;
		while((len=in.read(b))!=-1){
			out.write(b,0,len);
		}
		out.close();
		in.close();
		return null;
	}
```
> `注意:此方法必须放回null`
> `struts.xml`配置:`<action name="访问action名" class="action类名" method="viewImages"></action>`
> Jsp配置格式:`<img alt="显示图片" src="<s:url action='访问action名'><s:param name='向action传递参数名' value='参数值'></s:param></s:url>"></img>`
