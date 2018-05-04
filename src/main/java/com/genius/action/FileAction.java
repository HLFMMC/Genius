package com.genius.action;

import com.genius.shared.BaseAction;
import com.jfinal.upload.UploadFile;

public class FileAction extends BaseAction{
	
	
	public void upload() {
		UploadFile file = getFile("image");
		System.out.println(file);
		retOk("上传成功！");
	}
}
