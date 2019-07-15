/* 静态公用脚本 */
import Vue from 'vue';
import dayjs from 'dayjs';
//  全局对象
var common = {
    href: window.location.href,
    /*
     * 设置layout-content最低高度
     * 顶部marin：50                底部marin：0
     * 边距：0            footfixed：30
     * padding上：0   padding下：10 + footer 10
     */
    autoHeight: window.innerHeight - 90,
    /*
     * 获取地址栏GET参数
     * name 参数名
     */
    getQuery: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    /*
     * JSON对象合并
     * 合并JSON对象   后者覆盖前者  只支持一级嵌套
     */
    JSONextend: function(target, options) {
        var newArr = target;
        for (var name in options) {
            newArr[name] = options[name];
        }
        return newArr;
    },
    //设置cookie
    setCookie: function(cname, cvalue, exdays) {
        var d = new Date();
        exdays = exdays || 365;
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        var expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + '; ' + expires;
    },
    //获取cookie
    getCookie: function(cname) {
        var name = cname + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1)
                return c.substring(name.length, c.length);
        }
        return '';
    },
    //清除cookie
    clearCookie: function(name) {
        // WUYI.setCookie(name, '', -1);
    },
    transToTree: function(dataArr, newArr, root="null") {
        function find_insert(arr, key, data) {
            // 待完善，value不是自定义
            var flag = false;
            function DG_f(arr, key, data) {
                arr.map((item) => {
                    if (item.id == key) {
                        if (item.children) {
                            item.children.push(data);
                        } else {
                            item.children = [];
                            item.children.push(data);
                        }
                        flag = true;
                        return;
                    }
                    if (item.children) {
                        DG_f(item.children, key, data);
                        return;
                    }
                });
            }
            DG_f(arr, key, data);
            return flag;
        }
        // 待完善，pId，空值不是自定义
        for (var i = dataArr.length - 1; i >= 0; i--) {
            if (dataArr[i].pId == root) {
                newArr.push(dataArr[i]);
                dataArr.splice(i, 1);
            }
            if (find_insert(newArr, dataArr[i] && dataArr[i].pId, dataArr[i])) {
                
                dataArr.splice(i, 1);
            }
        }
        // 递归断点
        if (dataArr.length != 0) {
            common.transToTree(dataArr, newArr,root="null");
        }
    },
    //
    mapAndAddChildren: function(array) {
        array.forEach((element, index, self) => {
            if (element.userInfo && element.userInfo.length != 0) {
                if (element.children) {
                    element.children = element.children.concat(
                        element.userInfo
                    );
                } else {
                    element.children = element.userInfo;
                }
            }
            if (element.children) {
                common.mapAndAddChildren(element.children);
            }
        });
    },
    ObjToStamp: function(data, array) {
        if (data.length != 0) {
            data.forEach((i, idx) => {
                array.forEach((item, index) => {
                    i[item] = dayjs(i[item]).toDate();
                });
            });
            return data;
        } else {
            return [];
        }
    },
    rangeObjToTimestamp(array) {
        if (!array || array.length == 0 || array[0]==''&&array[1] =='') {
            return {
                applyTimeStart: 0,
                applyTimeEnd: 0
            };
        } else {
            const [start, end] = array;
            return {
                applyTimeStart: dayjs(start).valueOf(),
                applyTimeEnd:
                    dayjs(dayjs(end).format('YYYY-MM-DD')).valueOf() + 8.64e7
            };
        }
    },
    // 时间字符，时间对象转换为时间戳
    timeParse: function(date) {
        if (!date) return 0;
        if (isNaN(Date.parse(date))) {
            return 0; //非合法时间字符串返回0
        } else {
            return Date.parse(date);
        }
    },
    // 时间戳,时间字符转换为时间对象
    timeParseObj: function(date) {
        if (!date) return 0;
        if (isNaN(Number(new Date(date)))) {
            // 基于ts做了Number的包裹
            return 0; //非合法时间字符串返回0
        } else {
            date = this.fullTimestamp(date);
            return new Date(date);
        }
    },
    //补全时间戳
    fullTimestamp: function(inputTime) {
        if (!/(^[0-9]\d*$)/.test(inputTime)) {
            return 0; //非合法时间戳返回0
        }
        var numLength = 13 - inputTime.toString().length;
        if (numLength != 0) {
            for (let i = 0; i < numLength; i++) {
                inputTime += '0';
            }
        }
        return Number(inputTime);
    },
    formatDateTime: function(inputTime) {
        inputTime = this.fullTimestamp(inputTime);
        var date = new Date(inputTime);
        var y:number | string = date.getFullYear();
        var m:number | string = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d:number | string = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    },
    formatFullDateTime: function(inputTime) {
        inputTime = this.fullTimestamp(inputTime);
        var date = new Date(inputTime);
        var Y:number | string = date.getFullYear();
        var M:number | string = date.getMonth() + 1;
        M = M < 10 ? ('0' + M) : M;
        var D :number | string = date.getDate();
        D = D < 10 ? ('0' + D) : D;
        var h:number | string = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var m:number | string = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        var s:number | string = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
    },
    // 时间相关
    time: (function() {
        var date = new Date();
        var y:number | string = date.getFullYear();
        var m:number | string = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d:number | string = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        var rtnDate: any = {};
        rtnDate.y = y;
        rtnDate.m = m;
        rtnDate.d = d;
        rtnDate.h = h;
        rtnDate.monthfirst = y + '-' + m + '-' + '01';
        rtnDate.monthlast = y + '-' + m + '-' + d;
        rtnDate.nowtime = h + ':00';
        rtnDate.nowtimes = h + ':00' + ':00';
        rtnDate.currentMonFirDayStamp = new Date(
            y + '-' + m + '-' + '01 00:00:00'
        ).getTime(); //当月第一天 00:00:00
        rtnDate.currentMonNowDayStamp = new Date(
            y + '-' + m + '-' + d + ' 00:00:00'
        ).getTime(); //当前日期(当天00：00：00 作为默认显示值使用  请求发送时加上8.64e7)
        rtnDate.currentMonFirDayObj = new Date(rtnDate.currentMonFirDayStamp);
        rtnDate.threeMonBefor = (function get3MonthBefor() {
            var resultDate, year, month;
            var currDate = new Date();
            year = currDate.getFullYear();
            month = currDate.getMonth() + 1;
            switch (month) {
                case 1:
                case 2:
                case 3:
                    month += 9;
                    year--;
                    break;
                default:
                    month -= 3;
                    break;
            }
            month = month < 10 ? '0' + month : month;
            resultDate = year + '-' + month + '-' + '01 00:00:00';
            return resultDate;
        })();
        rtnDate.sixMonBefor = (function get6MonthBefor() {
            var resultDate, year, month;
            var currDate = new Date();
            year = currDate.getFullYear();
            month = currDate.getMonth() + 1;
            switch (month) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    month += 6;
                    year--;
                    break;
                default:
                    month -= 6;
                    break;
            }
            month = month < 10 ? '0' + month : month;
            resultDate = year + '-' + month + '-' + '01 00:00:00';
            return resultDate;
        })();
        rtnDate.currentMonNowDayObj = new Date(rtnDate.currentMonNowDayStamp);
        rtnDate.oneday = 8.64e7; //1天的毫秒数86400*1000
        rtnDate.currentMonNextDayStamp =
            new Date(y + '-' + m + '-' + d + ' 00:00:00').getTime() + 8.64e7; //当前日期的下一天，通常用作日期筛选
        return rtnDate;
    })(),
    // 打开新的标签页
    openNewtab: function(url) {
        var a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('target', '_blank');
        a.setAttribute('id', 'camnpr');
        document.body.appendChild(a);
        a.click();
    }
};
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
(<any>Date.prototype).Format = function(format) {
    var date = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S+': this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(
            RegExp.$1,
            (this.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    }
    for (var k in date) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                    ? date[k]
                    : ('00' + date[k]).substr(('' + date[k]).length)
            );
        }
    }
    return format;
};


/***********vue 过滤器拓展************/

/*
 * 千分位 过滤器
 * value 进参
 * precision  保留几位小数
 * separator分隔符    分隔符 默认为","
 */
Vue.filter('thousands', function(value, precision, separator) {
    var num = value;
    var parts;
    //判断是否为数字
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
        num = Number(num);
        num = (typeof precision !== 'undefined'
            ? num.toFixed(precision)
            : num
        ).toString();
        parts = num.split('.');
        parts[0] = parts[0]
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));
        return parts.join('.');
    }
    return value;
});

// /*
//  * 时间差转换 倒计时 过滤器
//  * value 进参(相差的毫秒数)
//  */

Vue.filter('timesdiff', function(value) {
    if (value == '' || value == 0) {
        return '00:00:00';
    }
    var hour = Math.floor(value / 3600);
    var minute = Math.floor((value - hour * 3600) / 60);
    var second = Math.floor(value - hour * 3600 - minute * 60);
    hour = hour < 10 ? Number('0' + hour) : hour;
    minute = minute < 10 ? Number('0' + minute) : minute;
    second = second < 10 ? Number('0' + second) : second;
    return hour + ':' + minute + ':' + second;
});

// /*
//  * 时间截取 过滤器
//  * value 进参
//  * type 截取类型 默认为1
//  * type 1：2007-07-15 12:00:00  转换为 2007-07-15
//  * type 2：2007-07-15 12:00:00  转换为 2007-07-15 12:00
//  * type 3：2007-07-15 12:00:00  转换为 12:00
//  */
Vue.filter('timesplit', function(value, type) {
    type = type || 1;
    if (value) {
        var arr1 = value.split(' ');
        var arr2 = arr1[1].split(':');
        if (type == 2) {
            return arr1[0] + ' ' + arr2[0] + ':' + arr2[1];
        } else if (type == 3) {
            return arr2[0] + ':' + arr2[1];
        } else {
            return arr1[0];
        }
    } else {
        return '';
    }
});
// /*
//  * 银行卡4位分割 过滤器
//  *  */
Vue.filter('banksplit', function(value) {
    if (!value) return '';
    if (/\S{5}/.test(value)) {
        return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
    } else {
        return value;
    }
    // return value.replace(/[\s]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
});

// /*
//  * 银行卡截取后4位
//  *  */
Vue.filter('banksubstr', function(value) {
    if (!value) return '';
    return value.substr(value.length - 4);
});

// /*
//  * 身份证隐藏
//  * frontLen：前面保留位数
//  * endLen：后面保留位数
//  *  */
Vue.filter('idcard', function(value, frontLen, endLen) {
    frontLen = frontLen || 4;
    endLen = endLen || 4;
    if (value) {
        var len = value.length - frontLen - endLen;
        var xing = '';
        for (var i = 0; i < len; i++) {
            xing += '*';
        }
        return (
            value.substring(0, frontLen) +
            xing +
            value.substring(value.length - endLen)
        );
    } else {
        return '';
    }
});

// /*
// 时间戳转普通日期
// */

// console.log(Vue)
// Vue.filter('stamp2TextDate', function(value) {
//     if (!value || value == '') return '';
//     var date = new Date(value);
//     var y = date.getFullYear();
//     var m = date.getMonth() + 1;
//     m = m < 10 ? Number('0' + m) : m;
//     var d = date.getDate();
//     d = d < 10 ? Number('0' + d) : d;
//     return y + '-' + m + '-' + d;
// });
// Vue.filter('stamp2TextHours', function(value) {
//     if (!value || value == '') return '';
//     var date = new Date(value);
//     var y = date.getFullYear();
//     var m = date.getMonth() + 1;
//     m = m < 10 ? Number('0' + m) : m;
//     var d = date.getDate();
//     d = d < 10 ? Number('0' + d) : d;
//     var h = date.getHours();
//     h = h < 10 ? Number('0' + h) : h;
//     return y + '-' + m + '-' + d + ' ' + h + ':00:00';
// });
// /*
// 时间戳转普通日期(full)
// */
// Vue.filter('stamp2TextDateFull', function(value) {
//     if (!value || value == '') return '';
//     var date = new Date(value);
//     var y = date.getFullYear();
//     var m = date.getMonth() + 1;
//     m = m < 10 ? Number('0' + m) : m;
//     var d = date.getDate();
//     d = d < 10 ? Number('0' + d) : d;
//     var h = date.getHours();
//     var min = date.getMinutes();
//     var sec = date.getSeconds();
//     h = h < 10 ? Number('0' + h) : h;
//     min = min < 10 ? Number('0' + min) : min;
//     sec = sec < 10 ? Number('0' + sec) : sec;
//     return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + sec;
// });

// Vue.filter('Timestamp', function(value) {
//     return Date.parse(value);
// });

// // 金额大写过滤器
// Vue.filter('bigMoney', function(value) {
//     if (value == '' || value == 0) {
//         return '零元整';
//     }
//     var fraction = ['角', '分'];
//     var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
//     var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
//     var head = value < 0 ? '欠' : '';
//     value = Math.abs(value);
//     var s = '';
//     for (var i = 0; i < fraction.length; i++) {
//         s += (
//             digit[Math.floor(value * 10 * Math.pow(10, i)) % 10] + fraction[i]
//         ).replace(/零./, '');
//     }
//     s = s || '整';
//     value = Math.floor(value);
//     for (var i = 0; i < unit[0].length && value > 0; i++) {
//         var p = '';
//         for (var j = 0; j < unit[1].length && value > 0; j++) {
//             p = digit[value % 10] + unit[1][j] + p;
//             value = Math.floor(value / 10);
//         }
//         s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
//     }
//     return (
//         head +
//         s
//             .replace(/(零.)*零元/, '元')
//             .replace(/(零.)+/g, '零')
//             .replace(/^整$/, '零元整')
//     );
// });

/*
 * 判断IE浏览器版本是否低于IE10
 */
var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
var isOpera = userAgent.indexOf('Opera') > -1; //判断是否Opera浏览器
var isIE =
    userAgent.indexOf('compatible') > -1 &&
    userAgent.indexOf('MSIE') > -1 &&
    !isOpera; //判断是否IE浏览器
if (isIE) {
    var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp['$1']);
    if (fIEVersion < 10) {
        //alert("您的浏览器版本太低，建议更换chrome或IE10及以上浏览器");
        window.location.href = './static/browser.html';
    }
}

export default common;
