/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.pasteFromWordRemoveFontStyles = false;
	config.pasteFromWordRemoveStyles = false;
	 config.image_previewText=' '; //预览区域显示内容
	 config.filebrowserImageUploadUrl = "/mkt/ad/admodel/addPromoteImg?type=Image"; //图片上传的 controller(action)
};
