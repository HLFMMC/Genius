package com.genius.mode;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;

public class SysRes extends Model<SysRes>{
	public static SysRes dao = new SysRes();
	
	public SysRes checkUrl(SysRes sysRes) {
		if(sysRes.get("url") !=null &&!sysRes.get("url").equals("")) {
			String sql = "select * from sys_res where url = ? limit 1";
			SysRes s = dao.findFirst(sql, sysRes.get("url"));
			if(s !=null) return s;
		}
		return null;
	}
	
	
	public void InsertRes(List<SysRes> r) {
		for (SysRes sysRes : r) {
			if(checkUrl(sysRes)==null)
			sysRes.save();
		}
	}

}
