package com.genius.route;

import com.genius.action.FileAction;
import com.genius.action.TestAction;
import com.jfinal.config.Routes;

public class TestRoute extends Routes {

	@Override
	public void config() {
		add("test",TestAction.class);
		add("file",FileAction.class);
	}

}
