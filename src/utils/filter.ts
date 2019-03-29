Number.prototype.toFixed = function (n) {
    if (n > 20 || n < 0) {
        throw new RangeError('tofixed()数字参数必须是0和20之间');
    }
    const number = this;
    if (isNaN(number) || number >= Math.pow(10, 21)) {
        return number.toString();
    }
    if (typeof (n) == 'undefined' || n == 0) {
        return (Math.round(number)).toString();
    }

    let result = number.toString();
    const arr = result.split('.');

    // 整数的情况
    if (arr.length < 2) {
        result += '.';
        for (let i = 0; i < n; i += 1) {
            result += '0';
        }
        return result;
    }

    const integer = arr[0];
    const decimal = arr[1];
    if (decimal.length == n) {
        return result;
    }
    if (decimal.length < n) {
        for (let i = 0; i < n - decimal.length; i += 1) {
            result += '0';
        }
        return result;
    }
    result = integer + '.' + decimal.substr(0, n);
    const last = decimal.substr(n, 1);

    // 四舍五入，转换为整数再处理，避免浮点数精度的损失
    if (parseInt(last, 10) >= 5) {
        const x = Math.pow(10, n);
        result = (Math.round((parseFloat(result) * x)) + 1) / x;
        result = result.toFixed(n);
    }

    return result;
};
/*
时间戳转普通日期
*/
const stamp2TextDate = function(value) {
    if (!value || value == '') return '';
    var date = new Date(value);
    var y:number | string = date.getFullYear();
    var m:number | string = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d:number | string = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
}
const stamp2TextHours = function(value) {
    if (!value || value == '') return '';
    var date = new Date(value);
    var y:number | string = date.getFullYear();
    var m:number | string = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d:number | string = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h:number | string = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    return y + '-' + m + '-' + d + ' ' + h + ':00:00';
}
/*
时间戳转普通日期(full)
*/
const stamp2TextDateFull =  function(value) {
    if (!value || value == '') return '';
    var date = new Date(value);
    var y:number | string= date.getFullYear();
    var m:number | string= date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d:number | string= date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h:number | string = date.getHours();
    var min:number | string = date.getMinutes();
    var sec:any = date.getSeconds();
    h = h < 10 ? ('0' + h) : h;
    min = min < 10 ? ('0' + min) : min;
    sec = sec < 10 ? ('0' + sec) : sec;
    return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + sec;
};

export default {stamp2TextDate,stamp2TextHours,stamp2TextDateFull} 