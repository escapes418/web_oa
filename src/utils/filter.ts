
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