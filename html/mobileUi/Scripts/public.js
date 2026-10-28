function GetDate(datetime) {
    var html;
    if (datetime == null) {
        html = "";
    }
    else {
        var date = new Date(parseInt(datetime.replace("/Date(", "").replace(")/", ""), 10));
        var y = date.getFullYear();
        var M = date.getMonth() + 1;
        var d = date.getDate();
        html = y + "-";
        if (M < 10) {
            html += "0";
        }
        html += M + "-";

        if (d < 10) {
            html += "0";
        }
        html += d;
    }
    return html;
}
function isValidDate(date) {
    return date instanceof Date && !isNaN(date.getTime())
}
function GetTime(val) {
    if (val != null) {
        var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
        if (!isValidDate(date))
            return val;
        else {
            //月份为0-11，所以+1，月份小于10时补个0
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            var currentHour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var currentSecond = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            var currentMinute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            return date.getFullYear() + "-" + month + "-" + currentDate + " " + currentHour + ":" + currentMinute + ":" + currentSecond;
        }
    }
}
//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
//获取当前时间，格式 yyyy-mm-dd HH:MM:ss
function getNowFormatTime() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (h >= 1 && h <= 9) {
        h = "0" + h;
    }
    if (m >= 0 && m <= 9) {
        m = "0" + m;
    }
    if (s >= 0 && s <= 9) {
        s = "0" + s;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate + " " + h + seperator2 + m + seperator2 + s;
    return currentdate;
}
var keydownTime = 0;
function keyup(obj) {
    var date = new Date();
    var nowTime = date.getTime();
    if (obj.value.length > 2) {
        keydownTime = nowTime;
    } if (nowTime - keydownTime > 2000) {
        obj.value = '';
    }
}

function getMobileInfo() {
    var browser = {
        versions: function () {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return {
                mobile: !!u.match(/AppleWebKit.*Mobile.*/),
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
                iPhone: u.indexOf("iPhone") > -1,
                iPad: u.indexOf("iPad") > -1,
                isWinPhone: (/Windows Phone|ZuneWP7/i).test(u),
                broswerType: getBrowerType()
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };

    return browser;
}

function getBrowerType() {
    var ex = navigator.userAgent,
        bUA;
    if (ex.indexOf("MSIE") >= 0) {
        bUA = "Internet Explorer 10  Or Earlier"; //IE
    } else if (ex.indexOf("Firefox") >= 0) {
        bUA = "Firefox";
    } else if (ex.indexOf("Chrome") >= 0) {
        bUA = "Chrome";
        if (ex.indexOf("360SE") >= 0) { //360安全浏览器
            bUA = "360SE";
        } else if (ex.indexOf("360EE") >= 0) { //360急速浏览器
            bUA = "360EE";
        } else if (ex.indexOf("SE") >= 0 && ex.indexOf("360SE") == -1) { //搜狗浏览器
            bUA = "SouGou";
        } else if (ex.indexOf("Maxthon") >= 0) { //遨游浏览器
            bUA = "Maxthon";
        }
    } else if (ex.indexOf("UCBrowser") >= 0 || ex.indexOf("UCWEB") >= 0) { // UC浏览器
        bUA = "UCBrowser";
    } else if (ex.indexOf("Opera") >= 0) {
        bUA = "Opera";
    } else if (ex.indexOf("Safari") >= 0) { // 苹果浏览器
        bUA = "Safari";
    } else if (ex.indexOf("Netscape") >= 0) {
        bUA = "Netscape";
    } else if (ex.indexOf("like Gecko") >= 0 && ex.indexOf("Trident") >= 0) {
        bUA = "Internet Explorer 11 Or Later"; //IE11 以后，不再用 MSIE
    } else {
        bUA = "Other Broswer";
    }

    return bUA;
}