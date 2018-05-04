!(function($) {
    var _apis = {};

    $.plugin = {
        api: _apis
    };

    $.fn.plugin = function(options, param) {
        if (typeof options == 'string') {
            var action = _apis[options];
            if (typeof action == 'function') {
                return action(this, param);
            }
            return this;
        }

        var func = function() {
            var state = $.data(this, 'plugin');
            var opts;

            if (state) {
                opts = $.extend(state.options, options || {});
                return;
            }

            var t = $(this);
            opts = $.extend({}, _defaults(t[0]), options || {});
            state = $.data(this, 'plugin', {
                options: opts
            });
        };
        return this.each(func);
    };

    //-------------------------------------------------
    // easyui
    //-------------------------------------------------
    // 列表
    _apis.initGrid = function(target, param) {
        var t = $(target);
        var gopt = $.extend({
            height: 400,
            autoRowHeight: false,
            fit: true,
            nowrap: true,
            border: true,
            iconCls: 'icon-edit',
            striped: true,
            pagination: true,
            singleSelect: true,
            rownumbers: true,
            method: 'post',
            //multiSort: true,
            remoteSort: true,
            sortOrder: 'asc',
            pageSize: 20,
            pageList: [20, 50, 100, 200],
            onBeforeLoad: function(para) {
                //var tbarid = t.datagrid('options')['toolbar'];
                //if (tbarid && typeof tbarid == 'string') {
                //    var tb = t.find(tbarid);
                //    //console.log(tb);
                //}
                var rules = [];
                var fr = t.datagrid('options').filterRules || {};
                for (var i = 0; i < fr.length; i++) {
                    var tmp = fr[i];
                    if (!tmp || !tmp.field || !tmp.op || !tmp.value) {
                        continue;
                    }
                    rules.push([tmp.field, tmp.op, tmp.value]);
                }
                
                para = para || {};
                var pc = {
                    //rules: [['id', 'eq', '1188']],
                    //isrule: true,
                    rules: rules,
                    isrule: rules && rules.length > 0,
                    issort: para.sort ? true : false,
                    sortkey: para.sort || '',
                    sortval: para.order || 'asc',
                    pgnum: para.page || 1,
                    pgsize: para.rows || 20
                };
                //para['_pc'] = encodeURIComponent(JSON.stringify(pc));
                para['_pc'] = JSON.stringify(pc);
            },
            /*onLoadSuccess: function(data) {
            },
            onLoadError: function() {
                alert('加载失败!');
            }*/
            loadFilter: function(ret) {
                if (!ret.code) {
                    return {
                        'rows': [],
                        'footer': [],
                        'total': 0
                    };
                }
                var code = ret['code'];
                var msg = ret['msg'];
                var data = ret['data'];
                if (code != '0') {
                    alert('加载失败!' + (msg || ''));
                    return {
                        'rows': [],
                        'footer': [],
                        'total': 0
                    };
                }
                return {
                    'rows': (data && data['rows']) || [],
                    'footer': (data && data['footer']) || [],
                    'total': (data && data['total']) || 0
                };
            }
        }, param || {});

        t.datagrid(gopt);
        
        //filter
        if (param && param.filter) {
            t.datagrid('enableFilter', param.filter);
            if (param.filterIgnore && param.filterIgnore.length > 0) {
                var tds = $('.datagrid-header-row.datagrid-filter-row');
                for (var i = 0; i < param.filterIgnore.length; i++) {
                    tds.find('td[field="' + param.filterIgnore[i] + '"]').css('visibility', 'hidden');
                }
            }
        }

        return t;
    };

    //-------------------------------------------------
    // vue - http://cn.vuejs.org/v2/guide/plugins.html
    //-------------------------------------------------
    _apis.install = function(options) {
        if (!Vue || !Vue.install) {
            console.log('未找到VUE');
            return;
        }
        if (Vue && Vue.prototype.$m) {
            console.log('已初始化..');
            return;
        }

        win.Vue.install(function(Vue, options) {
            //实例变量  
            Vue.prototype.$m = function(options) {}
            /*
            Vue.prototype.$dialog = {
              confirm: Confirm,
              alert: Alert,
              notify: Notify,
              toast: Toast,
              loading: Loading
            };*/

            //mixin
            Vue.mixin({
                components: {
                //'mt-header': Header,
                //'mt-popup': Popup
                },
                // directives: {},
                data: function() {
                    return {}
                },
                computed: {},
                /* render: function(createElement){
                    console.log(this.$slots); 
                    console.log(this.$el); 
                    createElement('h1', 'A headline');
                    createElement(MyComponent, {
                      props: {
                        someProp: 'foobar'
                      }
                    });
                    // return createElement('div', this.$slots.default); 
                    return createElement('h1', 'A headline {{mode}}');
                }, */
                mounted: function() {
                //console.log(this.$el);
                },
                // watch: { '$route'(to, from){ console.log('从' + from.path + '到' + to.path); }},
                methods: {}
            });

            //var MyComponent = Vue.extend({ template: '<div>Hello!</div>' });
            //new MyComponent().$mount('#app');
            //new MyComponent({ el: '#app' });
            //var component = new MyComponent().$mount();
            //document.getElementById('app').appendChild(component.$el);

        });

    }
})(jQuery);
