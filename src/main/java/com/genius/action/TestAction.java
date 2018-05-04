package com.genius.action;

import java.lang.reflect.Method;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.genius.shared.BaseAction;
import com.genius.shared.Func;
import com.genius.utils.StrUtil;
import com.google.common.base.Joiner;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.jfinal.core.Action;
import com.jfinal.core.JFinal;
import com.jfinal.plugin.activerecord.Record;

public class TestAction extends BaseAction{
	
    //资源类型
    public static final String TYPE_SECTION = "section";
    public static final String TYPE_VIEW    = "view";
    public static final String TYPE_FUNC    = "func";
	
    public static final String CODE_SPLITOR = "/";

    //------------------------------------------------------------
    private static String parseParent(String name) {
        int idx = name.lastIndexOf(CODE_SPLITOR);
        return idx > 0 ? name.substring(0, idx) : "";
    }

    private static String parseLabel(String name) {
        int idx = name.lastIndexOf(CODE_SPLITOR);
        return idx > 0 ? name.substring(idx + 1) : name;
    }
    
    private static String parseCode(String code) {
    	String ret = code.replaceAll("/", "");
    	return StrUtil.format(StrUtil.Arft_FORMT, ret,7);
    }
    

	@Func(value="测试/测试返回值/压力测试",code="1010101")
	public void test() {
		retOk("ok");
	}
	
	@Func(value="测试/页面",type="view",code="1010102")
	public void page() {
		redirPage("main");
	}
	@Func(value="测试/导出",code="1010103")
	public void importRes() {
		JFinal jfinal = JFinal.me();
		List<String> allActionKeys = jfinal.getAllActionKeys();
		
		List<Record> ret = Lists.newArrayList();
		Set<String> codes = new HashSet<>();
		List<Record> errRed = Lists.newArrayList();
        for (String key : allActionKeys) {
            Action action = jfinal.getAction(key, new String[0]);
            if (action == null) {
                continue;
            }
            Method method = action.getMethod();
            Func func = method.getDeclaredAnnotation(Func.class);
            if (func == null) {
                continue;
            }
            String _code = func.code();
            String code = parseCode(_code);
            if(codes.contains(code)) {
            	 Record record = new Record();
            	 record.set("name", func.value());
     	       	 record.set("url", action.getActionKey());
     	       	 record.set("code",code);
            	 errRed.add(record);
            	continue;
            }
            codes.add(code);
            Record record = new Record();
	       	record.set("name", func.value());
	       	record.set("url", action.getActionKey());
	       	record.set("type", func.type());
	       	record.set("label",parseLabel(func.value()));
	       	record.set("parent",parseParent(func.value()));
	       	record.set("code",code);
	       	record.set("pcode",_code);
	       	 
	       	ret.add(record);
        }
        
        Set<String> parentCodes = new HashSet<>();
        Map<String, Record> resMap = Maps.newHashMap();
        for (Record t : ret) {
            String code = t.getStr("code");
            String name = t.getStr("name");
            resMap.put(code, t);
            parentCodes.add(parseParent(name));
        }
        for (String code : parentCodes) {

            //
            List<String> tmp = Lists.newArrayList(code.split(CODE_SPLITOR));
            for (int i = 0; i < tmp.size(); i++) {
                String c = Joiner.on(CODE_SPLITOR).join(tmp.subList(0, i + 1));
                if (c!=null && !resMap.containsKey(c)) {
                    Record record = new Record();
                    record.set("type", TYPE_SECTION);
                    record.set("name", c);
                    record.set("label", parseLabel(c));
                    record.set("parent", parseParent(c));
                    record.set("url", "");
                    record.set("code", parseCode(parseParent(c)));
                    resMap.put(code, record);
                    ret.add(record);
                }
            }
        }
        retOk(ret);
	}
	
	
	public static void main(String[] args) {
		String code = TestAction.parseCode("101");
		System.out.println(code);
	}
	
	
}
