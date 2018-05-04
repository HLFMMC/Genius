package com.genius.shared;

import com.alibaba.fastjson.JSONObject;

public class Ret extends JSONObject{

	/**
	 * 
	 */
	private static final long serialVersionUID = 4873301148331267811L;
	private static final String KEY_SUCCESS    = "success";
	private static final String KEY_CODE       = "code";
	private static final String KEY_MSG        = "msg";
	private static final String KEY_DATA       = "data";
	
	
	public Ret(int code,String msg) {
		this(code, msg, null);
	}
	public Ret(int code,String msg,Object data) {
		this(code==0, code, msg, data);
	}
	
	public Ret(boolean success,int code,String msg,Object data) {
		this.success(success).code(code).msg(msg).data(data);
	}
	
	public boolean success() {
		return (boolean) get(KEY_SUCCESS);
	}
	public int code() {
		return (int) get(KEY_CODE);
	}
	public String msg() {
		return (String) get(KEY_MSG);
	}	
	public Object data() {
		return get(KEY_DATA);
	}
	
	public Ret success(boolean success) {
		this.put(KEY_SUCCESS, success);
		return this;
	}
	
	public Ret code(int code) {
		this.put(KEY_CODE, code);
		return this;
	}
	
	public Ret msg(String msg) {
		this.put(KEY_MSG, msg);
		return this;
	}
	
	public Ret data(Object data) {
		this.put(KEY_DATA, data);
		return this;
	}
	
	public static Ret ok(Object data) {
		 return new Ret(0, "操作成功!", data);
	}
	
	public static Ret err(String msg) {
		 return new Ret(0, msg, null);
	}
	
	public static Ret err(int code,String msg) {
		 return new Ret(code, msg, null);
	}
	

}
