~(function(global) {
    "use strict";
    var __isIE = !-[1, ];

    var __domLoad = function(fn) {
        var win = global;
        var doc = global.document;
        var done = false, top = true, doc = win.document, root = doc.documentElement, add = doc.addEventListener
                ? 'addEventListener' : 'attachEvent', rem = doc.addEventListener ? 'removeEventListener'
                : 'detachEvent', pre = doc.addEventListener ? '' : 'on', init = function(e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete')
                return;
            (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
            if (!done && (done = true))
                fn.call(win, e.type || e);
        }, poll = function() {
            try {
                root.doScroll('left');
            } catch (e) {
                setTimeout(poll, 50);
                return;
            }
            init('poll');
        };

        if (doc.readyState == 'complete')
            fn.call(win, 'lazy');
        else {
            if (doc.createEventObject && root.doScroll) {
                try {
                    top = !win.frameElement;
                } catch (e) {}
                if (top)
                    poll();
            }
            doc[add](pre + 'DOMContentLoaded', init, false);
            doc[add](pre + 'readystatechange', init, false);
            win[add](pre + 'load', init, false);
        }
    }

    var __getIfr = function(ifrName) {
        if (document.all) {
            return window.frames[ifrName];
        }
        var app = document.getElementById(ifrName);
        return ((app == null) ? null : app.contentWindow);
    };

    var __getIfrContent = function(ifrName) {
        var doc;
        if (document.all) {// IE
            doc = document.frames[ifrName].document;
        } else {// Firefox
            doc = document.getElementById(ifrName).contentDocument;
        }
        return doc.body.innerHTML;
    };

    var __addEvent = function(obj, EventName, callBack) {// 给对象添加事件
        if (obj.addEventListener) { // FF
            obj.addEventListener(EventName, callBack, false);
        } else if (obj.attachEvent) {// IE
            obj.attachEvent('on' + EventName, callBack);
        } else {
            obj["on" + EventName] = callBack;
        }
    };

    var __openWin = function(url, name, sOpt) {
        var fulls = "resizable=yes,location=no,status=no";
        if (window.screen) {
            fulls += "left=0,screenX=0,top=0,screenY=0,scrollbars=1";
            var ah = screen.availHeight - 30;
            var aw = screen.availWidth - 10;
            fulls += ",height=" + ah;
            fulls += ",innerHeight=" + ah;
            fulls += ",width=" + aw;
            fulls += ",innerWidth=" + aw;
        }
        // alwaysLowered | yes/no | 指定窗口隐藏在所有窗口之后
        // alwaysRaised | yes/no | 指定窗口悬浮在所有窗口之上
        // depended | yes/no | 是否和父窗口同时关闭
        // directories
        // alert(fulls);
        window.open(url, name, (sOpt || fulls));
    }

    var __isFullScreen = function() {
        if (window.outerHeigth === screen.heigth && window.outerWidth === screen.width) {
            return true;
        }
        return false;
    }

    var __fullScreen = function() {
        if (!__isIE) {
            var docElm = document.documentElement;
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            } else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
        }
    }

    var __exitFullscreen = function() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }

    var __replaceAll = function(sr, reallyDo, replaceWith, ignoreCase) {
        if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
            return sr.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
        } else {
            return sr.replace(reallyDo, replaceWith);
        }
    }

    var __getParam = function(url) {
        var urlText = url ? url : location.search;
        var theReq = new Object();
        if (urlText.indexOf("?") != -1) {
            var str = urlText.substr(1);
            if (str.indexOf("&") != -1) {
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theReq[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
                }
            } else {
                theReq[str.split("=")[0]] = (str.split("=")[1]);
            }
        }
        return theReq;
    }

    var __fmtDate = function(d, mask, utc) {
        var dateFormat = function() {
            var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g, timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g, timezoneClip = /[^-+\dA-Z]/g, pad = function(val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len)
                    val = "0" + val;
                return val;
            };
            // Regexes and supporting functions are cached through closure
            return function(date, mask, utc) {
                var dF = dateFormat;

                // You can't provide utc if you skip other args (use the "UTC:"
                // mask prefix)
                if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" &&
                        !/\d/.test(date)) {
                    mask = date;
                    date = undefined;
                }
                
                // Passing date through Date applies Date.parse, if necessary
                date = date ? new Date(date) : new Date;
                if (isNaN(date))
                    throw SyntaxError("invalid date");

                mask = String(dF.masks[mask] || mask || dF.masks["default"]);

                // Allow setting the utc argument via the mask
                if (mask.slice(0, 4) == "UTC:") {
                    mask = mask.slice(4);
                    utc = true;
                }

                var _ = utc ? "getUTC" : "get", d = date[_ + "Date"](), D = date[_ + "Day"](), m = date[_ + "Month"](), y = date[_ +
                        "FullYear"](), H = date[_ + "Hours"](), M = date[_ + "Minutes"](), s = date[_ + "Seconds"](), L = date[_ +
                        "Milliseconds"](), o = utc ? 0 : date.getTimezoneOffset(), flags = {
                    d: d,
                    dd: pad(d),
                    ddd: dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    m: m + 1,
                    mm: pad(m + 1),
                    mmm: dF.i18n.monthNames[m],
                    mmmm: dF.i18n.monthNames[m + 12],
                    yy: String(y).slice(2),
                    yyyy: y,
                    h: H % 12 || 12,
                    hh: pad(H % 12 || 12),
                    H: H,
                    HH: pad(H),
                    M: M,
                    MM: pad(M),
                    s: s,
                    ss: pad(s),
                    l: pad(L, 3),
                    L: pad(L > 99 ? Math.round(L / 10) : L),
                    t: H < 12 ? "a" : "p",
                    tt: H < 12 ? "am" : "pm",
                    T: H < 12 ? "A" : "P",
                    TT: H < 12 ? "AM" : "PM",
                    Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };

                return mask.replace(token, function($0) {
                    return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
                });
            };
        }();

        // Some _wrap format strings
        dateFormat.masks = {
            "default": "ddd mmm dd yyyy HH:MM:ss",
            shortDate: "m/d/yy",
            mediumDate: "mmm d, yyyy",
            longDate: "mmmm d, yyyy",
            fullDate: "dddd, mmmm d, yyyy",
            shortTime: "h:MM TT",
            mediumTime: "h:MM:ss TT",
            longTime: "h:MM:ss TT Z",
            isoDate: "yyyy-mm-dd",
            isoTime: "HH:MM:ss",
            isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
            isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
        };

        // Internationalization strings
        dateFormat.i18n = {
            dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday",
                    "Thursday", "Friday", "Saturday"],
            monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January",
                    "February", "March", "April", "May", "June", "July", "August", "September", "October", "November",
                    "December"]
        };

        return dateFormat(d, mask, utc);
    }

    var __proc = function(obj) {
        try {
            var injectObj = window['_NativeJSInjectObj'] || {};
            var func = injectObj['proc'];
            if (!func || typeof func != 'function') {
                return ['-1', '当前客户端不支持此操作!'];
            }

            var pArr = obj['prms'];
            if (typeof pArr == 'object' && pArr.length && pArr.push) {
                pArr = [pArr];
            }
            if (obj['pushCookie']) {
                pArr.push(document.cookie);
                // pArr.push("JSESSIONID=" + getCookie('JSESSIONID')); //cookies
            }

            // 调用java方法的参数 - json格式
            var ret = func(JSON.stringify({
                'clz': obj['clz'] || 'com.hs.applet.BaseApp',
                'method': obj['method'],
                'prms': JSON.stringify(pArr)
            }));

            return JSON.parse(ret);
        } catch (e) {
            return ['-1', 'PRO处理异常!err: ' + e && e.message];
        }
    }

    // ---------------------------------
    var __kit = {
        domLoad: __domLoad,
        getIfr: __getIfr,
        getIfrContent: __getIfrContent,
        // onWinResize :__onWinResize,
        openWin: __openWin,
        fullScreen: __fullScreen,
        exitFullscreen: __exitFullscreen,

        replaceAll: __replaceAll,
        getParam: __getParam,
        fmtDate: __fmtDate,

        proc: __proc
    };

    global.Kit = __kit;
})(this);
