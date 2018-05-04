package com.genius.shared;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.core.Controller;

public class BaseAction extends Controller{
	
	
	protected void loginUser() {
		
	}
	
	
	protected void retOk(Object object) {
		renderJson(Ret.ok(object));
	}
	
	protected void retErr(String msg) {
		renderJson(Ret.err(msg));
	}
	
	protected void retErr(int code,String msg) {
		renderJson(Ret.err(code,msg));
	}
	
	protected void retGrid(long total,List<?> rows) {
		retGrid(total, rows, null);
	}
	
	protected void retGrid(long total,List<?> rows,List<?> footer) {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("total", total);
		jsonObject.put("rows", rows);
		jsonObject.put("footer", footer);
		retOk(jsonObject);
	}
	
	protected void retPage(String url) {
		
	}
	
	protected void redirPage(String url) {
		renderJsp("../admin/"+url+".jsp");
	}

}
