package com.genius.shared;

import javax.servlet.http.HttpServletRequest;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;

public class SysInterceptor implements Interceptor{

	@Override
	public void intercept(Invocation ai) {
		Controller ctrl = ai.getController();
		HttpServletRequest request = ctrl.getRequest();
		
		String requestUri = request.getRequestURI();
		String contextPath = request.getContextPath();
		String url = requestUri.substring(contextPath.length());
		
		System.out.println("requestUri:"+requestUri);
		System.out.println("contextPath:"+contextPath);
		System.out.println("url:"+url);
		
		ai.invoke();
		
	}

}
