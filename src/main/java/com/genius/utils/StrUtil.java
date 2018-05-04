package com.genius.utils;

import java.util.List;
import java.util.Set;

public class StrUtil {
	
	public static int BEFORE_FORMT=1;
	public static int Arft_FORMT=2;
	
	public static String format(int format,String str,int length) {
		int strLen = str.length();
		if(format == BEFORE_FORMT) {
			String fm="%0"+length+"d";
			str = String.format(fm, str);
		} else if(format == Arft_FORMT) {
			while (strLen < length) {
				StringBuffer sb = new StringBuffer();
				sb.append(str).append("0");
	            str = sb.toString();
	            strLen = str.length();
		     }
		}
		return str;
	}
	
	public static boolean isEmpty(Object object) {
		if(object == null) return true;
		if(object instanceof List) {
			return ((List)object).size() == 0;
		}
		if(object instanceof Set) {
			return ((Set)object).size() == 0;
		}
		return false;
	}
}
