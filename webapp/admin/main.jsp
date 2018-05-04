<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<script type="text/javascript" src="/asset/lib/jquery2.min.js"></script>
</head>

<script type="text/javascript">
	
	function upload() {
		var formData = new FormData($( "#uploadForm" )[0]);    
	     $.ajax({    
	          url: '/file/upload' ,  /*这是处理文件上传的servlet*/  
	          type: 'POST',    
	          data: formData,    
	          async: false,    
	          cache: false,    
	          contentType:false,  
	          processData: false,    
	          success: function (data) {    
	             consolo.info(data)  
	          },    
	          error: function (err) {    
	              alert(err);    
	          }    
	     });  
	}
</script>
<body>

<form action="/file/upload" method="post" enctype="multipart/form-data" id="uploadForm">
<input type="file" name="image">
<input type="button" value="提交" onclick="upload()">
</form>

<inpu>
</body>
</html>