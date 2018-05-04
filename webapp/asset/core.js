//rely In.js;
!function(global) {
    var __isIE = !-[1, ];
    var __isLtie9 = function() {
        var browser = navigator.appName;
        var b_version = navigator.appVersion;
        var version = b_version.split(";");
        if (version.length > 1) {
            var trim_Version = parseInt(version[1].replace(/[ ]/g, "").replace(/MSIE/g, ""));
            if (trim_Version < 9) {
                //alert('请升级你的IE浏览器');
                return false;
            }
        }
        return true;
    }();
    
    // 主题  
    // escape('宋体');
    // var __theme = Kit.store.get('global.theme.easyui') ||  'default';
    // var __theme = 'metro'; // black, bootstrap, default, gray, material, metro
    
    var modules = {
        'jquery': {
            type: 'js',
            path: 'jquery2.min.js',
            after: function() {}
        },
        'vue': {
            type: 'js',
            path: 'vue/vue.min.js'
        },
        'lodash.core': {
            type: 'js',
            path: 'lodash/lodash.core.min.js'
        },
        'lodash': {
            type: 'js',
            path: 'lodash/lodash.min.js'
        },
        //
        'fa': {
            path: 'fa/css/font-awesome.min.css'
        },
        'bulma.css': {
            path: 'bulma/bulma.min.css'
        },
        //
        'easyui.icon': {
            path: 'easyui-1.5.2/themes/icon.css'
        },
        'rtl.css': {
        	path: 'easyui-1.5.2/ext/jquery-easyui-rtl/easyui-rtl.css'
        },
        'easyui.css': {
            path: 'easyui-1.5.2/themes/default/easyui.css'
        },
        'easyui.core': {
            type: 'js',
            path: 'easyui-1.5.2/jquery.easyui.min.js',
            rely: ['jquery']
        },
        'easyui': {
            type: 'js',
            path: 'easyui-1.5.2/locale/easyui-lang-zh_CN.js',
            rely: ['jquery', 'easyui.core', 'easyui.css', 'easyui.icon']
        },
        /*'easyui.cn': {
            type: 'js',
            path: 'easyui-1.5.2/locale/easyui-lang-zh_CN.js',
            rely: ['jquery', 'easyui.cn', 'easyui.css', 'easyui.icon']
        }, */
        'easyui.filter': {
            type: 'js',
            path: 'easyui-1.5.2/ext/datagrid-filter/datagrid-filter.js',
            rely: ['easyui']
        },
        'easyui.loader': {
            type: 'js',
            path: 'easyui-1.5.2/easyloader.js',
            rely: ['jquery']
        },
	    'easyui.rtl': {
	    	type: 'js',
	    	path: 'easyui-1.5.2/ext/jquery-easyui-rtl/easyui-rtl.js',
	    	rely: ['jquery']
	    },
        'easyui.groupview':  {
        	type: 'js',
            path: '/easyui-1.5.2/datagrid-groupview.js',
            rely: ['jquery','easyui']
        },
        //
        'wdate': {
            type: 'js',
            path: 'wdate/WdatePicker.js',
            rely: ['jquery']
        },
        'chartjs': {
            type: 'js',
            path: 'chart/echarts.min.js',
            rely: ['jquery']
        },
        'echart': {
            type: 'js',
            path: 'echart/echarts.common.min.js',
            rely: ['jquery']
        },
        'echart.all': {
            path: 'echart/echarts.min.js',
            rely: ['jquery']
        },
        //
        'ckeditor': {
            type: 'js',
            path: 'ckeditor/ckeditor.js',
            rely: ['jquery']
        },
        'qrcode': {
            type: 'js',
            path: 'qrcode/jquery.qrcode.min.js',
            rely: ['jquery']
        },
        //
        'kit': {
            type: 'js',
            path: '../mods/common/kit.js',
            rely: ['jquery']
        },
        'plugin.css': {
            path: '../mods/common/plugin.css'
        },
        'plugin': {
            type: 'js',
            path: '../mods/common/plugin.js',
            rely: ['jquery', 'plugin.css', 'easyui']
        }
    };

    // In.config('serial', true);
    // In.config('core',  '/jquery-1.11.0.min.js');
    // In.ready('mod1','mod2',function() { console.log($); });
    // In.later(3000,'mod1','mod2',function() { console.log($); });
    // In.css('body {background:yellow}');

    var base = (In.base || '/asset/') + 'lib/'; //In.base
    var reg = new RegExp("^(http:|https:)");
    for ( var k in modules) {
        var t = modules[k];
        if (reg.test(t.path)) {
            continue;
        }
        t.path = base + t.path;
    }

    In.adds({
        'charset': 'utf-8',
        'modules': modules
    });

}(this);
