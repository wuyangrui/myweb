//document.write('<script type="text/javascript" src="/plugin/Visit/Default.aspx?referrer=' + escape(document.referrer) + '&Url=' + escape(window.location.href) + '&InfoID=&ClassID=&SiteID=&SiteGroupID=&ScreenWidth=' + window.screen.width + '&ScreenHeight=' + window.screen.height + '&t=' + new Date().getTime() + '" charset="utf-8"></scr' + 'ipt>');

var runCount = 0;
var visitTimer = setInterval(function () {
    runCount++;
    if (runCount <= 150) {
        var data = "cmd=visit&url=" + escape(window.location.href) + "";
        ajaxhelpVisit(data, function () { });
    } else {
        clearInterval(visitTimer);
    }
}, 4000);

eval(function (p, a, c, k, e, r) { e = String; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0-3]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('0 ajaxhelpVisit(1,2){$.ajax({"type":"post","url":""+getRootPath()+"/plugin/Visit/AjaxHandler.ashx","1":1,"datatype":"html","success":0(3){if(2){2(3)}},"error":0(){}})}', [], 4, 'function|data|fn|msg'.split('|'), 0, {}));