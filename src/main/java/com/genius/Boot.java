package com.genius;

import java.io.File;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.genius.mode.SysUser;
import com.genius.route.TestRoute;
import com.genius.shared.BaseAction;
import com.genius.shared.SysInterceptor;
import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.kit.PathKit;
import com.jfinal.kit.PropKit;
import com.jfinal.log.ILogFactory;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.activerecord.SqlReporter;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.render.ViewType;
import com.jfinal.template.Engine;

public class Boot extends JFinalConfig {
	public static final Logger LOG = LoggerFactory.getLogger(Boot.class);
	public static class IdCtrl extends BaseAction {
		public void index() {
			renderJsp("/index.jsp");
		}
	}

	@Override
	public void configConstant(Constants me) {
		String cfg = "";
		File tmpFile = new File(PathKit.getRootClassPath()+File.separator+"conf.properties");
		if (tmpFile.exists()) {
			cfg = "conf.properties";
		} else {
			throw new RuntimeException("未找到JFinal启动配置文件!");
		}
		
		LOG.info("\n[程序配置文件]: " + cfg + "\n");
		loadPropertyFile(cfg);
		PropKit.use(cfg);
		LOG.debug("[Prop] using confile file: " + cfg);
		me.setDevMode(getPropertyToBoolean("devMode", true));

//		me.setLogFactory(new ILogFactory());
		me.setEncoding("utf-8");
		me.setViewType(ViewType.JSP);
	}

	@Override
	public void configRoute(Routes me) {
		me.add("/", IdCtrl.class);
		
		me.add(new TestRoute());
	}

	@Override
	public void configEngine(Engine me) {
		
	}

	@Override
	public void configPlugin(Plugins me) {
		
		SqlReporter.setLog(true);
		/*数据源*/
		String driver = PropKit.get("ds.driver");
		String url    = PropKit.get("ds.url");
		String user   = PropKit.get("ds.user");
		String pwd    = PropKit.get("ds.pwd");
		
		DruidPlugin ds = new DruidPlugin(url, user, pwd, driver);
		me.add(ds);
		
		ActiveRecordPlugin arp = new ActiveRecordPlugin(ds);
		arp.addMapping("sys_user", SysUser.class);
		arp.addMapping("sys_res", SysUser.class);
		
		me.add(arp);
		
		
	}

	@Override
	public void configInterceptor(Interceptors me) {
		me.add(new SysInterceptor());
	}

	@Override
	public void configHandler(Handlers me) {
		
	}

}
