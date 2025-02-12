/**--------------公共变量 begin------------*/
var this_url = window.location.href.toLowerCase();
var regemail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
var regpassword = /^([0-9a-zA-Z]+)$/;
var regtelphone = /(^(\d{11})$|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
var regnum = /^\d+$/;
var regcode = /[1-9]\d{5}(?!\d)/;
var regID = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}x)$/;
var this_protocol = window.location.protocol;
var this_host = window.location.host;
var GetDomain = this_protocol + '//' + this_host;
var showLoading = false;
var hash = {
    'qq.com': 'http://mail.qq.com',
    'gmail.com': 'http://mail.google.com',
    'sina.com': 'http://mail.sina.com.cn',
    '163.com': 'http://mail.163.com',
    '126.com': 'http://mail.126.com',
    'yeah.net': 'http://www.yeah.net/',
    'sohu.com': 'http://mail.sohu.com/',
    'tom.com': 'http://mail.tom.com/',
    'sogou.com': 'http://mail.sogou.com/',
    '139.com': 'http://mail.10086.cn/',
    'hotmail.com': 'http://www.hotmail.com',
    'live.com': 'http://login.live.com/',
    'live.cn': 'http://login.live.cn/',
    'live.com.cn': 'http://login.live.com.cn',
    '189.com': 'http://webmail16.189.cn/webmail/',
    'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
    'yahoo.cn': 'http://mail.cn.yahoo.com/',
    'eyou.com': 'http://www.eyou.com/',
    '21cn.com': 'http://mail.21cn.com/',
    '188.com': 'http://www.188.com/',
    'foxmail.coom': 'http://www.foxmail.com'
};

/*-----------------------------公共变量 End----------------------------*/
/*-----------------------------新闻搜索-------------------------------*/
$(document).on('click', '#btnMenuSearch', function () {
    var cid = $(this).attr('data-cid');
    var key = $('#txtMenuKey').val();
    console.log('cid:' + cid + ',key:' + key + '');
    if ($.trim($("#txtMenuKey").val()) == '' || $.trim($('#txtMenuKey').val()) == '请输入关键字') {
        $('#txtMenuKey').focus();
        layer.msg("请输入关键字！");
        return;
    } else if (cid == 74) {
        window.location = '/news/news.html?key=' + escape(key) + '';
    } else if (cid == 75) {
        window.location = '/news/media.html?key=' + escape(key) + '';
    }
});
function getMenuSearch(key, page) {
    $('#ajaxList').html('');
    $('#ajaxPage').html('');
    var searchKey = unescape(key);
    $('#txtMenuKey').val(searchKey);
    var thisIndex = layer.msg('数据搜索中，请稍后…', {
        time: 0,
        icon: 16
    });
    $('.media_tab li a').map(function () {
        if ($(this).text() == searchKey) {
            $(this).parent().addClass('on');
        }
    });
    var data = "cmd=getMenuSearch&k=" + TDES.encrypt(searchKey) + "&c=" + TDES.encrypt($('#btnMenuSearch').attr('data-cid')) + "&p=" + TDES.encrypt(page) + "";
    ajaxhelpS(data, function (msg) {
        var obj = eval('(' + msg + ')');
        layer.close(thisIndex);
        $('#ajaxList').html(unescape(obj.info));
        $('#ajaxPage').html(unescape(obj.page));
    });
}
/*-----------------------------股票绑定-------------------------------*/
function getStock() {
    var data = "cmd=getStock&code=hk00656,sh600196,hk02196,sh600655,hk01992,hk02696,sh600282,hk01696,sh603919,hk01818,sh600429";
    ajaxhelpS(data, function (msg) {
        var obj = eval('(' + msg + ')');
        if (unescape(obj.state) == 1) {
            var arrStock = unescape(obj.info).split(';');
            for (var i = 0; i < arrStock.length; i++) {
                var arr = arrStock[i].split('~');
                var $this = $('.slider_invest .swiper-slide:eq(' + i + ')');
                $this.find('.hk-price').text(arr[3]);
                $this.find('.change_p02 p:eq(0)').text(arr[4]);
                $this.find('.change_p02 p:eq(1)').text(arr[33]);
                $this.find('.change_p02 p:eq(2)').text(arr[34]);
                $this.find('.change_p02 p:eq(3)').text(arr[5]);
                $this.find('.hk-time').text('时间：' + arr[30]);

                //头部股价
                $('.stock').find('.hk-price').text(arrStock[0].split('~')[3]);
                if (arrStock[0].split('~')[32].indexOf('-') != -1) {
                    $('.stock').addClass('bottom').removeClass('top');
                } else {
                    $('.stock').addClass('top').removeClass('bottom');
                }
                if (arr[32].indexOf('-') != -1) {
                    $this.find('.hk-range').addClass('green').removeClass('red');
                    $this.find('.hk-price').addClass('green').removeClass('red');
                    $this.find('.shares-l').addClass('green').removeClass('red');
                } else {
                    $this.find('.hk-range').addClass('red').removeClass('green');
                    $this.find('.hk-price').addClass('red').removeClass('green');
                    $this.find('.shares-l').addClass('red').removeClass('green');
                }
                $this.find('.hk-range').text(arr[32] + '%');
            }
        }
    });
}
$(function () {
    getStock();
    setInterval(function () {
        getStock();
    }, 15000)
})
/*-----------------------------新全站搜索-----------------------------*/
$(function () {

    $('#btnSearch').click(function () {
        if ($.trim($("#formd_search_id").val()) == '' || $.trim($('#formd_search_id').val()) == '请输入关键词') {
            $('#formd_search_id').focus();
            layer.msg("请输入关键词！");
            return;
        }
        else {
            window.location = "/other/search.html?key=" + escape($.trim($("#formd_search_id").val())) + "";
        }
    });


    $('#btnSearch2').click(function () {
        if ($.trim($("#formd_search_id2").val()) == '' || $.trim($("#formd_search_id2").val()) == '请输入关键词') {
            $('#formd_search_id2').focus();
            layer.msg("请输入关键词！");
            return;
        }
        $('#resultem').text($("#formd_search_id2").val());

        //getList_LB(escape($.trim($("#formd_search_id2").val())), 1);
        //全新搜索
        getLucenesSearch(escape($.trim($("#formd_search_id2").val())), 1);
        //全新搜索加载更多
        //getLucenesSearch_More(escape($.trim($("#formd_search_id2").val())), 1);
    });
})
/*-----------------------------关键字搜索-----------------------------*/
$(document).on('click', '#KeySearch', function () {
    var StrKey = $("#KeyValu").val().trim();//关键字
    if (StrKey.length <= 0) {
        layerMsg("请输入关键字？");
        return;
    }
    getkeysearch(TDES.encrypt(StrKey), 1);
});

function getkeysearch(key, page) {
    data = "cmd=getkeysearch&key=" + key + "&page=" + page;
    ajaxhelpS(data, function (msg) {
        var obj = eval('(' + msg + ')');
        if (unescape(obj.states) == 1) {
            $("#ajaxlist").html(unescape(obj.info));
            if (unescape(obj.count) > 4) {
                $("#ajaxpage").html(unescape(obj.page));
            } else {
                $("#ajaxpage").html("");
            }
        } else {
            $("#ajaxlist").html("");
            $("#ajaxpage").html("");
        }
    });
}
/*-----------------------------信息提示-----------------------------*/
function layerMsg(msg) {
    return layer.msg(msg);
}
/*---------------------------当前位置定位---------------------------*/
$(function () {
    var MenuName = $.trim($("div.site>span").text());
    $('div.nav>ul>li>a').map(function () {
        if ($.trim($(this).text()) == MenuName) {
            $(this).parent().addClass('on').siblings().removeClass('on');
        }
    });
    $('div.policy_tab>a').map(function () {
        if ($.trim($(this).text()) == MenuName) {
            $(this).addClass('on').siblings().removeClass('on');
        }
    });

    MenuName = $.trim($("div.site>a:eq(1)").text());
    $('div.nav>ul>li>a').map(function () {
        if ($.trim($(this).text()) == MenuName) {
            $(this).parent().addClass('on').siblings().removeClass('on');
        }
    });
})
/*-------------------------没有内容自动隐藏-------------------------*/
$(function () {

    $('.IFHide').map(function (index) {
        if ($(this).html().trim().length <= 0) {
            $(this).hide();
            $('.DivHide:eq(' + index + ')').hide();
        }
    });

});
/*-----------------------------列表点赞-----------------------------*/
$(document).on('click', '.Mylike', function () {
    var strid = $(this).attr("data-id");//ID
    var objMylike = $(this);

    var data = "cmd=SetMylike&id=" + strid + "&Fieldlike=E91AD3948CAC48995386DD4F02C8DB76&Type=1&Count=2&ClassID=20000";

    ajaxhelpS(data, function (msg) {
        var obj = eval('(' + msg + ')');

        if (unescape(obj.state) == "1") {
            objMylike.text(Number(objMylike.text()) + Number(1));//点赞数自动加1
            //$('span.Mylikelist').text(Number($('span.Mylikelist').text()) + Number(1))
            $(".Myliketo").text(objMylike.text());
            $(".Mylike").text(objMylike.text());

            //$(".Mylike").addClass("on")
        }
        else {
            layer.msg(unescape(obj.info));
        }
    })
});
/*---------------------------获取列表点赞---------------------------*/
$(function () {
    var ids = '';
    $('.Mylikelist').map(function () {
        ids += $(this).attr('data-id') + ',';
    });

    if (ids.length == 0) {
        return;
    }
    var data = "cmd=GetHitsField&ids=" + TDES.encrypt(ids) + "&Field=E91AD3948CAC48995386DD4F02C8DB76";
    ajaxhelpS(data,
	function (msg) {
	    var obj = eval('(' + msg + ')');

	    if (unescape(obj.state) == 1) {
	        var hits = unescape(obj.info);

	        for (var i = 0; i < hits.split(',').length; i++) {
	            $('.Mylikelist').eq(i).text(hits.split(',')[i]);
	        }
	    }
	});
});
/*---------------------------浏览次数绑定---------------------------*/
$(function () {
    var ids = '';
    $('.hits').map(function () {
        ids += $(this).attr('data-id') + ',';
    });

    if (ids.length == 0) {
        return;
    }
    var data = "cmd=getHits&ids=" + TDES.encrypt(ids) + "";

    ajaxhelpS(data,
	function (msg) {
	    var obj = eval('(' + msg + ')');

	    if (unescape(obj.state) == 1) {
	        var hits = unescape(obj.info);

	        for (var i = 0; i < hits.split(',').length; i++) {
	            $('.hits').eq(i).text(hits.split(',')[i]);
	        }
	    }
	});
});
/*-----------------------------发送邮件-----------------------------*/
function sendemail(name, email, subject, body) {
    var data = "cmd=sendemail&name=" + TDES.encrypt(name) + "&email=" + TDES.encrypt(email) + "&subject=" + TDES.encrypt(subject) + "&body=" + TDES.encrypt(body);
    ajaxhelpS(data, function (msg) {
        var obj = eval('(' + msg + ')');
        layerMsg(unescape(obj.info));
    });
}

/*-------------------------发送手机动态密码-------------------------*/
$(document).on('click', '#btnSMS', function () {
    //$('#SMSCode').removeClass("required");
    //if (required(true)) {

    var obj = $(".count button");
    if ($("#Phone").val().length <= 0) {
        layer.msg($("#Phone").attr('placeholder'));
        return;
    }
    if (!regtelphone.test($("#Phone").val())) {
        layer.msg(lang.code0004);
        return;
    }
    if ($("#code").val().length <= 0) {
        layer.msg($("#code").attr('placeholder'));
        return;
    }

    var t = $(this), oldValue = t.text(), submiting = t.attr('data-submit-text') || '提交中...';
    var thisIndex = layer.msg(lang.loadingMsg, {
        time: 0,
        icon: 16
    });

    t.attr('disabled', 'disabled').text(submiting);
    var data = "cmd=sendsms&p=" + TDES.encrypt($('#Phone').val()) + "&c=" + TDES.encrypt($('#code').val()) + "";

    ajaxhelpS(data, function (msg) {
        layer.close(thisIndex);
        var obj = eval('(' + msg + ')');
        if (unescape(obj.state) == 1) {
            layerMsg(unescape(obj.info));
            $('#btnSMS').removeAttr('disabled').text(oldValue);
            $('#SMSCode').addClass("required");
            //window.location = '/register/success.html';


            settime(obj);

            //var validCode = true;
            //var time = 60;

            //var code = $('#btnSMS');
            //if (validCode) {
            //    validCode = false;
            //    var tInterval = setInterval(function () {
            //        time--;
            //        code.val(time + "秒");
            //        if (time == 0) {
            //            clearInterval(tIntervalt);
            //            code.val("重新获取");

            //            validCode = true;
            //        }
            //    }, 1000)
            //}

        } else {
            layerMsg(unescape(obj.info));
            t.removeAttr('disabled').text(oldValue);
        }
    })
    //}
});
$(document).on('click', '#btnSMS1', function () {
    //$('#SMSCode').removeClass("required");
    //if (required(true)) {

    var obj = $(".count button");
    if ($("#Phone1").val().length <= 0) {
        layer.msg($("#Phone1").attr('placeholder'));
        return;
    }
    if (!regtelphone.test($("#Phone1").val())) {
        layer.msg(lang.code0004);
        return;
    }
    if ($("#code1").val().length <= 0) {
        layer.msg($("#code1").attr('placeholder'));
        return;
    }

    var t = $(this), oldValue = t.text(), submiting = t.attr('data-submit-text') || '提交中...';
    var thisIndex = layer.msg(lang.loadingMsg, {
        time: 0,
        icon: 16
    });

    t.attr('disabled', 'disabled').text(submiting);
    var data = "cmd=sendsms&p=" + TDES.encrypt($('#Phone1').val()) + "&c=" + TDES.encrypt($('#code1').val()) + "";

    ajaxhelpS(data, function (msg) {
        layer.close(thisIndex);
        var obj = eval('(' + msg + ')');
        if (unescape(obj.state) == 1) {
            layerMsg(unescape(obj.info));
            $('#btnSMS1').removeAttr('disabled').text(oldValue);
            $('#SMSCode1').addClass("required");
            //window.location = '/register/success.html';


            settime(obj);

            //var validCode = true;
            //var time = 60;

            //var code = $('#btnSMS');
            //if (validCode) {
            //    validCode = false;
            //    var tInterval = setInterval(function () {
            //        time--;
            //        code.val(time + "秒");
            //        if (time == 0) {
            //            clearInterval(tIntervalt);
            //            code.val("重新获取");

            //            validCode = true;
            //        }
            //    }, 1000)
            //}

        } else {
            layerMsg(unescape(obj.info));
            t.removeAttr('disabled').text(oldValue);
        }
    })
    //}
});
$(document).on('click', '#btnSMS2', function () {
    //$('#SMSCode').removeClass("required");
    //if (required(true)) {

    var obj = $(".count button");
    if ($("#Phone2").val().length <= 0) {
        layer.msg($("#Phone2").attr('placeholder'));
        return;
    }
    if (!regtelphone.test($("#Phone2").val())) {
        layer.msg(lang.code0004);
        return;
    }
    if ($("#code2").val().length <= 0) {
        layer.msg($("#code2").attr('placeholder'));
        return;
    }

    var t = $(this), oldValue = t.text(), submiting = t.attr('data-submit-text') || '提交中...';
    var thisIndex = layer.msg(lang.loadingMsg, {
        time: 0,
        icon: 16
    });

    t.attr('disabled', 'disabled').text(submiting);
    var data = "cmd=sendsms&p=" + TDES.encrypt($('#Phone2').val()) + "&c=" + TDES.encrypt($('#code2').val()) + "";

    ajaxhelpS(data, function (msg) {
        layer.close(thisIndex);
        var obj = eval('(' + msg + ')');
        if (unescape(obj.state) == 1) {
            layerMsg(unescape(obj.info));
            $('#btnSMS2').removeAttr('disabled').text(oldValue);
            $('#SMSCode2').addClass("required");
            //window.location = '/register/success.html';


            settime(obj);

            //var validCode = true;
            //var time = 60;

            //var code = $('#btnSMS');
            //if (validCode) {
            //    validCode = false;
            //    var tInterval = setInterval(function () {
            //        time--;
            //        code.val(time + "秒");
            //        if (time == 0) {
            //            clearInterval(tIntervalt);
            //            code.val("重新获取");

            //            validCode = true;
            //        }
            //    }, 1000)
            //}

        } else {
            layerMsg(unescape(obj.info));
            t.removeAttr('disabled').text(oldValue);
        }
    })
    //}
});
//倒计时60s
var countdown = 60;
function settime(obj) {
    if (countdown == 0) {
        $('.count button').text('获取验证码').removeAttr('disabled');
        $(".count button").removeAttr("style");
        countdown = 60;
        return;
    } else {
        $('.count button').attr('disabled', true);
        $('.count button').text("(" + countdown + "s)");
        countdown--;
    }
    setTimeout(function () {
        settime(obj)
    }
    , 1000)
}


/*-----------------------------用户注册-----------------------------*/
$(document).on('click', '#btnRegister', function () {
    if (Verification(true)) {
        var attrArgs = "";
        var valArgs = "";
        $('.get:visible').map(function (i) {
            if ($(this).attr('name') != 'invoice') {
                if (getValue($(this)).length != 0) {
                    attrArgs += $(this).attr('name') + ",";
                    valArgs += TDES.encrypt(getValue($(this))) + ","
                } else {
                    attrArgs += $(this).attr('name') + ",";
                    valArgs += TDES.encrypt("") + ","
                }
            }

        });

        var t = $(this), oldValue = t.text(), submiting = t.attr('data-submit-text') || '提交中...';
        var thisIndex = layer.msg(lang.loadingMsg, {
            time: 0,
            icon: 16
        });
        t.attr('disabled', 'disabled').text(submiting);
        var data = "cmd=phonereg&attrArgs=" + TDES.encrypt(attrArgs) + "&valArgs=" + TDES.encrypt(valArgs) + "";



        ajaxhelpS(data, function (msg) {

            layer.close(thisIndex);
            var obj = eval('(' + msg + ')');
            if (unescape(obj.state) == 1) {
                layerMsg(unescape(obj.info));
                //window.location = '/center/login.html';
                //layer.confirm(unescape(obj.info), {
                //    title: '系统提示',
                //    btn: ['确定'] //按钮
                //}, function () {

                //    window.location = '/center/login.html';

                //});

                //清空
                t.removeAttr('disabled').text(oldValue);
                $("input[name='phone'").val("");
                $("input[name='username'").val("");
                $("input[name='company'").val("");

                $("input[name='email'").val("");
                $("input[name='userpwd'").val("");
                $("input[name='userpwd2'").val("");
                $("input[name='code'").val("");

                $(".reg_box,.member_layer,.member_blank").fadeOut();
                $(".bg_layer,.login_box").fadeIn();

            } else {

                layerMsg(unescape(obj.info));
                t.removeAttr('disabled').text(oldValue);
            }
        })
    }
});

function getValue(obj) {
    return $.trim($(obj).val())
}

/*----------------------用户登录--------------------------*/
$(document).on('click', '#btnLogin', function () {
    var txtUserName = getValueDefaultError('#txtUserName', '', $('#txtUserName').attr('placeholder'), true);
    if (!txtUserName[1]) {
        return false;
    }
    txtUserName = txtUserName[0];
    /*------------------------------------------*/
    var txtPwd = getValueDefaultError('#txtPwd', '', $('#txtPwd').attr('placeholder'), true);
    if (!txtPwd[1]) {
        return false;
    }
    txtPwd = txtPwd[0];
    /*------------------------------------------*/
    //var txtCode = getValueDefaultError('#txtCode', '', $('#txtCode').attr('placeholder'), true);
    //if (!txtCode[1]) {
    //    return false;
    //}
    //txtCode = txtCode[0];
    /*------------------------------------------*/
    var $loginBtn = $(this);
    $loginBtn.attr('disabled', 'disabled').val($loginBtn.attr('data-submit'));
    var data = "cmd=login&u=" + TDES.encrypt(txtUserName) + "&p=" + TDES.encrypt(txtPwd);
    ajaxhelpS(data, function (msg) {
        $loginBtn.removeAttr('disabled').val($loginBtn.attr('data-default'));
        var obj = eval('(' + msg + ')');
        if (unescape(obj.state) == 1) {
            if (this_url == GetDomain + "/technology/service.html") {
                $("#TIflog").hide();
                $(".bg_layer,.log_reg").fadeOut();
                $("#bntMessage").removeClass("unlogin");
                loginPageCheckLogin();
            } else {
                if (this_url == GetDomain + "/member/forget3.html") {
                    window.location = "/member/index.html";
                } else {
                    window.location = this_url;
                }

            }
        } else {
            layerMsg(unescape(obj.info));
        }
    });
});
/*----------------------用户手机登录--------------------------*/
$(document).on('click', '#btnLoginPhone', function () {
    var vPhone = $("#Phone").val();
    var vSMScode = $("#SMScode").val();
    if (vPhone.length <= 0) {
        layer.msg($("#Phone").attr('placeholder'));
        $("#Phone").focus();
        return;
    }
    if (!regtelphone.test(vPhone)) {
        layer.msg(lang.code0004);
        return;
    }
    if ($("#code").val() <= 0) {
        layer.msg($("#code").attr('placeholder'));
        $("#code").focus();
        return;
    }
    if (vSMScode.length <= 0) {
        layer.msg($("#SMScode").attr('placeholder'));
        $("#SMScode").focus();
        return;
    }


    var $loginBtn = $(this);
    $loginBtn.attr('disabled', 'disabled').val($loginBtn.attr('data-submit'));
    var data = "cmd=loginphone&u=" + TDES.encrypt(vPhone) + "&c=" + TDES.encrypt(vSMScode);
    ajaxhelpS(data, function (msg) {
        $loginBtn.removeAttr('disabled').val($loginBtn.attr('data-default'));
        var obj = eval('(' + msg + ')');

        if (unescape(obj.state) == 1) {
            if (this_url == GetDomain + "/technology/service.html") {
                $("#TIflog").hide();
                $(".bg_layer,.log_reg").fadeOut();
                loginPageCheckLogin();
            } else {
                //window.location = "/member/index.html";
                window.location = this_url;
            }
        } else {
            layerMsg(unescape(obj.info));
        }
    });
});

/*---------------------获取用户登录状态----------------------*/
//<script>$(function () { checkLogin(function () { getSupplierInfo(); }); });</script>
//</head>
//<body style="opacity:0;">

function checkLogin(fn) {
    var data = "cmd=checkLogin";
    ajaxhelpS(data, function (msg) {
        var obj = eval('(' + msg + ')');
        if (unescape(obj.state) == 0) {
            //window.location = "/login/login.html?callback=" + escape(window.location.href) + "";
            $("#bntQuit").hide();
            window.location = '/index.html';
        } else {
            $("#bntQuit").show();
            //$('body').css('opacity', '1');
            if (fn) {
                fn();
            }
        }
    });
}
/*---------------------获取用户登录状态登录页面专用----------------------*/
function loginPageCheckLogin() {

    var data = "cmd=checkLogin";
    ajaxhelpS(data, function (msg) {
        var obj = eval('(' + msg + ')');

        if (unescape(obj.state) == 1) {
            //window.location = '/member/orderlist.html';

            $("#TLongin").html(unescape(obj.username)).removeClass("log");
            $("#TLongin").attr("href", "/member/index.html")
            $("#bntQuit").show();

        }
        else {
            $("#bntQuit").hide();

            $("#TLongin").html("<i class=\"icon-login-report\"></i><span>登录</span>").addClass("log");
            $("#TLongin").attr("href", "javascript:void(0)")

            if (this_url == GetDomain + "/member/index.html") {
                window.location = '/index.html';
            }

        }
    });
}
/*------------------------退出------------------------*/
$(document).on('click', '#bntQuit', function () {
    var data = "cmd=checkquit";
    ajaxhelpS(data, function (msg) {
        var obj = eval('(' + msg + ')');
        $("#TLongin").html("");
        $("#bntQuit").hide();


        window.location = this_url;
    });


});
/*------------------------手机密码找回第一步------------------------*/
$(document).on('click', '#btnSJZHNext', function () {

    if (Verification1(true)) {
        var attrArgs = "";
        var valArgs = "";
        $('.get1:visible').map(function (i) {
            if ($(this).attr('name') != 'invoice') {
                if (getValue($(this)).length != 0) {
                    attrArgs += $(this).attr('name') + ",";
                    valArgs += TDES.encrypt(getValue($(this))) + ","
                } else {
                    attrArgs += $(this).attr('name') + ",";
                    valArgs += TDES.encrypt("") + ","
                }
            }

        });

        var t = $(this), oldValue = t.text(), submiting = t.attr('data-submit-text') || '提交中...';
        var thisIndex = layer.msg(lang.loadingMsg, {
            time: 0,
            icon: 16
        });
        t.attr('disabled', 'disabled').text(submiting);
        var data = "cmd=phoneRetrieve&attrArgs=" + TDES.encrypt(attrArgs) + "&valArgs=" + TDES.encrypt(valArgs) + "";

        ajaxhelpS(data, function (msg) {

            layer.close(thisIndex);
            var obj = eval('(' + msg + ')');

            if (unescape(obj.state) == 1) {

                window.location = '/member/forget2.html';
            } else {

                layerMsg(unescape(obj.info));
                t.removeAttr('disabled').text(oldValue);
            }
        })
    }

});
/*------------------------手机密码找回第二步------------------------*/
$(document).on('click', '#phoneRetrieveSave', function () {

    if (Verification1(true)) {
        var attrArgs = "";
        var valArgs = "";
        $('.get1:visible').map(function (i) {
            if ($(this).attr('name') != 'invoice') {
                if (getValue($(this)).length != 0) {
                    attrArgs += $(this).attr('name') + ",";
                    valArgs += TDES.encrypt(getValue($(this))) + ","
                } else {
                    attrArgs += $(this).attr('name') + ",";
                    valArgs += TDES.encrypt("") + ","
                }
            }

        });


        var t = $(this), oldValue = t.text(), submiting = t.attr('data-submit-text') || '提交中...';
        var thisIndex = layer.msg(lang.loadingMsg, {
            time: 0,
            icon: 16
        });
        t.attr('disabled', 'disabled').text(submiting);
        var data = "cmd=phoneRetrieveSave&attrArgs=" + TDES.encrypt(attrArgs) + "&valArgs=" + TDES.encrypt(valArgs) + "";

        ajaxhelpS(data, function (msg) {

            layer.close(thisIndex);

            var obj = eval('(' + msg + ')');
            if (unescape(obj.state) == 1) {

                layer.confirm(unescape(obj.info), {
                    title: '系统提示',
                    btn: ['确定'] //按钮
                }, function () {

                    window.location = '/member/forget3.html';

                });


            } else {

                layerMsg(unescape(obj.info));
                t.removeAttr('disabled').text(oldValue);
            }
        })
    }

});

/*------------------------邮箱密码找回第一步------------------------*/
$(document).on('click', '#btnEma', function () {
    var tbtnEma = $(this);
    var oldValue = tbtnEma.text(), submiting = tbtnEma.attr('data-submit-text') || '提交中...';
    $('#EmaCode').removeClass("required");
    if (required(true)) {

        var thisIndex = layer.msg(lang.loadingMsg, {
            time: 0,
            icon: 16
        });

        tbtnEma.attr('disabled', 'disabled').text(submiting);
        var data = "cmd=sendEma&p=" + TDES.encrypt($('#Email').val()) + "&c=" + TDES.encrypt($('#code').val()) + "";

        ajaxhelpS(data, function (msg) {
            layer.close(thisIndex);
            var obj = eval('(' + msg + ')');
            if (unescape(obj.state) == 1) {

                //layerMsg(unescape(obj.info));
                $('#btnEma').removeAttr('disabled').text(oldValue);
                $('#EmaCode').addClass("required");
                //window.location = '/register/success.html';
                var validCode = true;
                var time = 60;

                var code = $('#btnEma');
                if (validCode) {
                    validCode = false;
                    var tbtnInterval = setInterval(function () {
                        time--;
                        code.val(time + "秒");
                        if (time == 0) {
                            clearInterval(t);
                            code.val("重新获取");
                            validCode = true;
                        }
                    }, 1000)
                }

            } else {

                layerMsg(unescape(obj.info));
                tbtnEma.removeAttr('disabled').text(oldValue);
            }
        })
    }
});

/*------------------------邮箱密码找回第二步------------------------*/
$(document).on('click', '#btnEmaNext', function () {
    if (required(true)) {
        var t = $(this), oldValue = t.text(), submiting = t.attr('data-submit-text') || '提交中...';
        var thisIndex = layer.msg(lang.loadingMsg, {
            time: 0,
            icon: 16
        });

        t.attr('disabled', 'disabled').text(submiting);
        var data = "cmd=btnEmaNext&p=" + TDES.encrypt($('#Email').val()) + "&c=" + TDES.encrypt($('#code').val()) + "&e=" + TDES.encrypt($('#EmaCode').val()) + "";

        ajaxhelpS(data, function (msg) {
            layer.close(thisIndex);
            var obj = eval('(' + msg + ')');
            if (unescape(obj.state) == 1) {

                window.location = '/center/Emapsd.html';

            } else {

                layerMsg(unescape(obj.info));
                t.removeAttr('disabled').text(oldValue);
            }
        })
    }
});
/*------------------------邮箱密码找回第三步------------------------*/
$(document).on('click', '#EmaRetrieveSave', function () {

    if (required(true)) {
        var attrArgs = "";
        var valArgs = "";
        $('.get:visible').map(function (i) {
            if ($(this).attr('name') != 'invoice') {
                if (getValue($(this)).length != 0) {
                    attrArgs += $(this).attr('name') + ",";
                    valArgs += TDES.encrypt(getValue($(this))) + ","
                } else {
                    attrArgs += $(this).attr('name') + ",";
                    valArgs += TDES.encrypt("") + ","
                }
            }

        });

        var t = $(this), oldValue = t.text(), submiting = t.attr('data-submit-text') || '提交中...';
        var thisIndex = layer.msg(lang.loadingMsg, {
            time: 0,
            icon: 16
        });
        t.attr('disabled', 'disabled').text(submiting);
        var data = "cmd=EmaRetrieveSave&attrArgs=" + TDES.encrypt(attrArgs) + "&valArgs=" + TDES.encrypt(valArgs) + "";

        ajaxhelpS(data, function (msg) {

            layer.close(thisIndex);

            var obj = eval('(' + msg + ')');
            if (unescape(obj.state) == 1) {

                layer.confirm(unescape(obj.info), {
                    title: '系统提示',
                    btn: ['确定'] //按钮
                }, function () {

                    window.location = '/center/login.html';

                });
                //window.location = '/center/login.html';


            } else {

                layerMsg(unescape(obj.info));
                t.removeAttr('disabled').text(oldValue);
            }
        })
    }
});
/*-----------------------------回车事件-----------------------------*/
$(function () {
    $(document).on("click", "#btnReset", function () {
        window.location.href = this_url;
    });

    //新全站搜索
    EnterFunction('#formd_search_id', '#btnSearch');
    EnterFunction('#formd_search_id2', '#btnSearch2');
    //关键字搜索
    EnterFunction('#txtMenuKey', '#btnMenuSearch');

    EnterFunction('input[type=Title]', '#btnSubmit');
    EnterFunction('input[type=SingleLine3]', '#btnSubmit');
    EnterFunction('input[type=SingleLine4]', '#btnSubmit');
    EnterFunction('input[type=SingleLine5]', '#btnSubmit');
    EnterFunction('input[type=code]', '#btnSubmit');
    //新闻搜索
    EnterFunction('#txtMenuKey', '#btnMenuSearch');
})

function getSearch(key, page) {
    $('#ajaxList').html('');
    $('#ajaxPage').html('');
    var searchKey = unescape(key);
    var thisIndex = layer.msg('数据搜索中，请稍后…', {
        time: 0,
        icon: 16
    });
    var data = "cmd=getSearch&k=" + TDES.encrypt(searchKey) + "&pi=" + TDES.encrypt(page) + "&lh=" + $('.lucenes>#lh').val() + "&ph=" + $('.lucenes>#ph').val() + "&ps=" + $('.lucenes>#ps').val() + "&pt=" + $('.lucenes>#pt').val() + "&nt=" + $('.lucenes>#nt').val() + "&fs=" + $('.lucenes>#fs').val() + "";
    ajaxhelpS(data, function (msg) {
        layer.close(thisIndex);
        var obj = eval('(' + msg + ')');
        if (unescape(obj.state) == '2') {
            thisIndex = layer.alert(unescape(obj.info), {
                time: 0,
                title: '提示信息',
                closeBtn: 0,
                btn: ['确定'],
                yes: function (index) {
                    window.location = '/';
                }
            });
        } else {
            $('#ajaxList').html(unescape(obj.list));
            $('#ajaxPage').html(unescape(obj.page));
            $("#SearchNum").html(unescape(obj.count));
        }
    });
}
/*-------------------------全文检索通用搜索-------------------------*/
function getLucenesSearch(key, page) {
    if (!checkAjaxSql(unescape(key))) {
        return false;
    }
    $('#ajaxList').html('');
    $('#ajaxPage').html('');
    var searchKey = unescape(key);
    $('#formd_search_id').val(searchKey);
    $('#formd_search_id2').val(searchKey);
    $('#resultem').html(searchKey);

    var thisIndex = layer.msg('数据搜索中，请稍后…', {
        time: 0,
        icon: 16
    });
    var data = "cmd=getLucenesSearch&k=" + TDES.encrypt(searchKey) + "&pi=" + TDES.encrypt(page) + "&lh=" + $('#lh').val() + "&ph=" + $('#ph').val() + "&ps=" + $('#ps').val() + "&pt=" + $('#pt').val() + "&nt=" + $('#nt').val() + "&fs=" + $('#fs').val() + "";
    ajaxhelpS(data, function (msg) {
        layer.close(thisIndex);
        try {
            var obj = eval('(' + msg + ')');
            if (unescape(obj.state) == '2') {
                thisIndex = layer.alert(unescape(obj.info), {
                    time: 0,
                    title: '提示信息',
                    closeBtn: 0,
                    btn: ['确定'],
                    yes: function (index) {
                        window.location = '/';
                    }
                });
            } else {
                $('#ajaxList').html(unescape(obj.list));
                $('#ajaxPage').html(unescape(obj.page));
                $("#SearchNum").html(unescape(obj.count));

                $("html,body").stop().animate({ scrollTop: 0 }, 0);



            }
        } catch (e) {

        }
    });
}
/*----------------------根据查询条件，加载更多----------------------*/
$(document).on('click', '.moreFlye', function () {

    if (Number($('#moreFlye').attr('data-next')) < Number($('#moreFlye').attr('data-max')) + 1) {
        getLucenesSearch_More($('#moreFlye').attr('data-key'), Number($('#moreFlye').attr('data-next')));
    }


});

function getLucenesSearch_More(key, page) {
    if (!checkAjaxSql(unescape(key))) {
        return false;
    }
    $('#ajaxList').html('');
    $('#ajaxPage').html('');
    var searchKey = unescape(key);

    $('#formd_search_id2').val(searchKey);
    $('#resultem').html(searchKey);

    var thisIndex = layer.msg('数据搜索中，请稍后…', {
        time: 0,
        icon: 16
    });
    var data = "cmd=getLucenesSearch&k=" + TDES.encrypt(searchKey) + "&pi=" + TDES.encrypt(page) + "&lh=" + $('.lucenes>#lh').val() + "&ph=" + $('.lucenes>#ph').val() + "&ps=" + $('.lucenes>#ps').val() + "&pt=" + $('.lucenes>#pt').val() + "&nt=" + $('.lucenes>#nt').val() + "&fs=" + $('.lucenes>#fs').val() + "";
    ajaxhelpS(data, function (msg) {
        layer.close(thisIndex);
        var obj = eval('(' + msg + ')');
        if (unescape(obj.state) == '2') {
            thisIndex = layer.alert(unescape(obj.info), {
                time: 0,
                title: '提示信息',
                closeBtn: 0,
                btn: ['确定'],
                yes: function (index) {
                    window.location = '/';
                }
            });
        } else {
            $('#ajaxList').append(unescape(obj.list));
            $('#ajaxPage').append(unescape(obj.page));
            $("#SearchNum").html(unescape(obj.count));

            /*--------------------加载更多------------------------------------------*/
            var intval = Number(page) + Number(1);
            if (Number(intval) <= Number(unescape(obj.count))) {
                $('#more').html("<a href=\"javascript:getLucenesSearch_More(" + key + "," + intval + ")" + "\" data-max=\"" + unescape(obj.count) + "\"></a>")
                $('#moreFlye').attr('data-next', intval).attr('data-max', unescape(obj.count)).attr('data-key', key).show();
            } else {
                $('#more').html("");
                $('#moreFlye').attr('data-next', intval).attr('data-max', unescape(obj.count)).attr('data-key', key).hide();

            }
        }
    });
}

/*------------------------全站搜索功能js方法------------------------*/
function getList(keyserch, page) {
    if (!checkAjaxSql(unescape(keyserch))) {
        return false;
    }
    $('#ajaxList').html(lang.loading);
    $('#ajaxPage').html('');
    var ajaxListDate = $('#ajaxListDate').val();
    var ajaxPageDate = $('#ajaxPageDate').val();
    var ajaxSiteId = $('#ajaxSiteId').val();
    var ajaxGroupId = $('#ajaxGroupId').val();
    var ajaxPageSite = $('#ajaxPageSite').val();

    $('#formd_search_id').val(unescape(keyserch));
    $("#formd_search_id2").val(unescape(keyserch));
    $("#resultem").html(unescape(keyserch));


    var data = "cmd=_saveListAndPageDate&ajaxListDate=" + ajaxListDate + "&ajaxPageDate=" + ajaxPageDate + "&ajaxSiteId=" + ajaxSiteId + "&ajaxGroupId=" + ajaxGroupId + "&ajaxPageSite=" + ajaxPageSite + "";
    ajaxhelpS(data, function () {
        data = "cmd=search&key=" + keyserch + "&page=" + page + "";
        ajaxhelpS(data, function (msg) {
            var obj = eval('(' + msg + ')');
            $('#ajaxList').html(unescape(obj.list));
            $('#ajaxPage').html(unescape(obj.page));

            $("#SearchNum").html(unescape(obj.count));
        });
    });
}

/*------------------------全站列表功能js方法------------------------*/
function getList_LB(key, page) {
    if (!checkAjaxSql(unescape(key))) {
        return false;
    }

    var _ajaxlist = "ajaxList";
    var _ajaxpage = "ajaxPage";

    var listidx = "", listcls = "", pageidx = "", pagecls = "";//列表索引 列表Class 分页索引 分页Class

    if ($('#ajaxListIndex').val() != undefined) {
        listidx = $.trim($('#ajaxListIndex').val());
    }
    if ($('#ajaxListClass').val() != undefined) {
        listcls = $.trim($('#ajaxListClass').val());
    }
    if ($('#ajaxPageIndex').val() != undefined) {
        pageidx = $.trim($('#ajaxPageIndex').val());
    }
    if ($('#ajaxPageClass').val() != undefined) {
        pagecls = $.trim($('#ajaxPageClass').val());
    }

    var bon = false;//是否是切换类型
    var dataBon = false;
    //如果列表索引 列表Class 分页索引 分页Class都不为空时 则是切换类型
    if (listidx != '' && listcls != '' && pageidx != '' && pagecls != '') {
        bon = true;
    }

    var listi = 0;
    var pagei = 0;
    //判断是否加载数据
    if (bon) {
        $('.' + listcls).map(function () {
            if (listi == listidx && ((($.trim($(this).html()) == lang.loading || $.trim($(this).html()) == lang.loading) && page == -1) || page >= 1)) {
                if (page == -1) page = 1;
                dataBon = true;
            }
            listi++;
        });
    }
    else {
        $('#' + _ajaxlist).html(lang.loading);
        $('#' + _ajaxlist).html('');
        $('#' + _ajaxpage).html('');
        dataBon = true;
    }
    var ajaxListDate = $('#ajaxListDate').val();
    var ajaxPageDate = $('#ajaxPageDate').val();
    var ajaxSiteId = $('#ajaxSiteId').val();
    var ajaxGroupId = $('#ajaxGroupId').val();
    var ajaxPageSite = $('#ajaxPageSite').val();

    var ajaxClassId = $('#ajaxClassId').val();
    var ajaxXgid = $('#ajaxXgid').val();
    var ajaxCategory = $('#ajaxCategory').val();
    var ajaxAboutDownload = $('#ajaxAboutDownload').val();
    var ajaxParentId = $('#ajaxParentId').val();
    if (dataBon) {

        var data = "cmd=_saveListAndPageDate_LB&ajaxListDate=" + ajaxListDate + "&ajaxPageDate=" + ajaxPageDate + "&ajaxSiteId=" + ajaxSiteId + "&ajaxGroupId=" + ajaxGroupId + "&ajaxPageSite=" + ajaxPageSite + "&ajaxClassId=" + ajaxClassId + "&ajaxXgid=" + ajaxXgid + "&ajaxCategory=" + ajaxCategory + "&ajaxAboutDownload=" + ajaxAboutDownload + "&ajaxParentId=" + ajaxParentId + "";
        ajaxhelpS(data, function () {
            data = "cmd=search_LB&key=" + key + "&page=" + page + "";
            ajaxhelpS(data, function (msg) {
                var obj = eval('(' + msg + ')');
                if (bon) {
                    listi = 0;
                    $('.' + listcls).map(function () {
                        if (listi == listidx && ($.trim($(this).html()) == lang.loading || page >= 1)) {
                            $(this).html(unescape(obj.list));
                        }
                        listi++;
                    });
                    pagei = 0;
                    $('.' + pagecls).map(function () {
                        if (pagei == pageidx && ($.trim($(this).html()) == '' || page >= 1)) {
                            $(this).html(unescape(obj.page));
                        }
                        pagei++;
                    });

                } else {
                    $('#' + _ajaxlist).html(unescape(obj.list));
                    $('#' + _ajaxpage).html(unescape(obj.page));
                    $("#SearchNum").html(unescape(obj.count));
                }

                try {

                    var scriptStr = "<script src=\"/javascript/lightbox.js\"></script>";
                    $('#ajaxScriptCallback').html(scriptStr);
                } catch (e) {

                }
            }, false);
        });
    }
}

function getList_FC(key, page) {
    if (!checkAjaxSql(unescape(key))) {
        return false;
    }
    var _ajaxlist = "ajaxList";
    var _ajaxpage = "ajaxPage";

    var listidx = "", listcls = "", pageidx = "", pagecls = "";//列表索引 列表Class 分页索引 分页Class

    if ($('#ajaxListIndex').val() != undefined) {
        listidx = $.trim($('#ajaxListIndex').val());
    }
    if ($('#ajaxListClass').val() != undefined) {
        listcls = $.trim($('#ajaxListClass').val());
    }
    if ($('#ajaxPageIndex').val() != undefined) {
        pageidx = $.trim($('#ajaxPageIndex').val());
    }
    if ($('#ajaxPageClass').val() != undefined) {
        pagecls = $.trim($('#ajaxPageClass').val());
    }

    var bon = false;//是否是切换类型
    var dataBon = false;
    //如果列表索引 列表Class 分页索引 分页Class都不为空时 则是切换类型
    if (listidx != '' && listcls != '' && pageidx != '' && pagecls != '') {
        bon = true;
    }

    var listi = 0;
    var pagei = 0;
    //判断是否加载数据
    if (bon) {
        $('.' + listcls).map(function () {
            if (listi == listidx && ((($.trim($(this).html()) == lang.loading || $.trim($(this).html()) == lang.loading) && page == -1) || page >= 1)) {
                if (page == -1) page = 1;
                dataBon = true;
            }
            listi++;
        });
    }
    else {
        $('#' + _ajaxlist).html(lang.loading);
        $('#' + _ajaxlist).html('');
        $('#' + _ajaxpage).html('');
        dataBon = true;
    }
    var ajaxListDate = $('#ajaxListDate').val();
    var ajaxPageDate = $('#ajaxPageDate').val();
    var ajaxSiteId = $('#ajaxSiteId').val();
    var ajaxGroupId = $('#ajaxGroupId').val();
    var ajaxPageSite = $('#ajaxPageSite').val();

    var ajaxClassId = $('#ajaxClassId').val();
    var ajaxXgid = $('#ajaxXgid').val();
    var ajaxCategory = $('#ajaxCategory').val();
    var ajaxAboutDownload = $('#ajaxAboutDownload').val();
    var ajaxParentId = $('#ajaxParentId').val();
    if (dataBon) {

        var data = "cmd=_saveListAndPageDate_LB&ajaxListDate=" + ajaxListDate + "&ajaxPageDate=" + ajaxPageDate + "&ajaxSiteId=" + ajaxSiteId + "&ajaxGroupId=" + ajaxGroupId + "&ajaxPageSite=" + ajaxPageSite + "&ajaxClassId=" + ajaxClassId + "&ajaxXgid=" + ajaxXgid + "&ajaxCategory=" + ajaxCategory + "&ajaxAboutDownload=" + ajaxAboutDownload + "&ajaxParentId=" + ajaxParentId + "";
        ajaxhelpS(data, function () {
            var data = "cmd=SaveCiphertexDate_FC&Ciphertext=" + $('#ajaxCiphertext').val() + "&CiphertextField=" + $('#ajaxCiphertextField').val();
            ajaxhelpS(data, function () {
                data = "cmd=search_FC&key=" + key + "&page=" + page;
                ajaxhelpS(data, function (msg) {
                    var obj = eval('(' + msg + ')');

                    if (bon) {
                        listi = 0;
                        $('.' + listcls).map(function () {
                            if (listi == listidx && ($.trim($(this).html()) == lang.loading || page >= 1)) {
                                $(this).html(unescape(obj.list));
                            }
                            listi++;
                        });
                        pagei = 0;
                        $('.' + pagecls).map(function () {
                            if (pagei == pageidx && ($.trim($(this).html()) == '' || page >= 1)) {
                                $(this).html(unescape(obj.page));
                            }
                            pagei++;
                        });

                    } else {

                        $('#' + _ajaxlist).html(unescape(obj.list));

                        $('#' + _ajaxpage).html(unescape(obj.page));
                    }

                });
            }, false);
        }, false);
    }

}

/*----------------------根据查询条件，加载更多----------------------*/
function getList_FC_More(key, page) {
    if (!checkAjaxSql(unescape(key))) {
        return false;
    }
    var _ajaxlist = "ajaxList";
    var _ajaxpage = "ajaxPage";

    var listidx = "", listcls = "", pageidx = "", pagecls = "";//列表索引 列表Class 分页索引 分页Class

    if ($('#ajaxListIndex').val() != undefined) {
        listidx = $.trim($('#ajaxListIndex').val());
    }
    if ($('#ajaxListClass').val() != undefined) {
        listcls = $.trim($('#ajaxListClass').val());
    }
    if ($('#ajaxPageIndex').val() != undefined) {
        pageidx = $.trim($('#ajaxPageIndex').val());
    }
    if ($('#ajaxPageClass').val() != undefined) {
        pagecls = $.trim($('#ajaxPageClass').val());
    }

    var bon = false;//是否是切换类型
    var dataBon = false;
    //如果列表索引 列表Class 分页索引 分页Class都不为空时 则是切换类型
    if (listidx != '' && listcls != '' && pageidx != '' && pagecls != '') {
        bon = true;
    }

    var listi = 0;
    var pagei = 0;
    //判断是否加载数据
    if (bon) {
        $('.' + listcls).map(function () {
            if (listi == listidx && ((($.trim($(this).html()) == lang.loading || $.trim($(this).html()) == lang.loading) && page == -1) || page >= 1)) {
                if (page == -1) page = 1;
                dataBon = true;
            }
            listi++;
        });
    }
    else {
        //$('#' + _ajaxlist).html(lang.loading);
        //$('#' + _ajaxlist).html('');
        //$('#' + _ajaxpage).html('');
        dataBon = true;
    }
    var ajaxListDate = $('#ajaxListDate').val();
    var ajaxPageDate = $('#ajaxPageDate').val();
    var ajaxSiteId = $('#ajaxSiteId').val();
    var ajaxGroupId = $('#ajaxGroupId').val();
    var ajaxPageSite = $('#ajaxPageSite').val();

    var ajaxClassId = $('#ajaxClassId').val();
    var ajaxXgid = $('#ajaxXgid').val();
    var ajaxCategory = $('#ajaxCategory').val();
    var ajaxAboutDownload = $('#ajaxAboutDownload').val();
    var ajaxParentId = $('#ajaxParentId').val();
    if (dataBon) {

        var data = "cmd=_saveListAndPageDate_LB&ajaxListDate=" + ajaxListDate + "&ajaxPageDate=" + ajaxPageDate + "&ajaxSiteId=" + ajaxSiteId + "&ajaxGroupId=" + ajaxGroupId + "&ajaxPageSite=" + ajaxPageSite + "&ajaxClassId=" + ajaxClassId + "&ajaxXgid=" + ajaxXgid + "&ajaxCategory=" + ajaxCategory + "&ajaxAboutDownload=" + ajaxAboutDownload + "&ajaxParentId=" + ajaxParentId + "";
        ajaxhelpS(data, function () {
            data = "cmd=search_FC&key=" + key + "&page=" + page + "";
            ajaxhelpS(data, function (msg) {
                var obj = eval('(' + msg + ')');

                if (bon) {
                    listi = 0;
                    $('.' + listcls).map(function () {
                        if (listi == listidx && ($.trim($(this).html()) == lang.loading || page >= 1)) {
                            $(this).html(unescape(obj.list));
                        }
                        listi++;
                    });
                    pagei = 0;
                    $('.' + pagecls).map(function () {
                        if (pagei == pageidx && ($.trim($(this).html()) == '' || page >= 1)) {
                            $(this).html(unescape(obj.page));
                        }
                        pagei++;
                    });

                } else {

                    $('#' + _ajaxlist).append(unescape(obj.list));

                    $('#' + _ajaxpage).append(unescape(obj.page));

                    /*--------------------加载更多------------------------------------------*/
                    var intval = Number(page) + Number(1);
                    if (Number(intval) <= Number(unescape(obj.count))) {
                        $('#more').html("<a href=\"javascript:getList_FC_More(" + key + "," + intval + ")" + "\" data-max=\"" + unescape(obj.count) + "\"></a>")
                        $('#moreFlye').attr('data-next', intval).attr('data-max', unescape(obj.count)).attr('data-key', key).show();
                    } else {
                        $('#more').html("");
                        $('#moreFlye').attr('data-next', intval).attr('data-max', unescape(obj.count)).attr('data-key', key).hide();

                    }

                }


            });
        });
    }
}

function getList_CZ(key, page) {
    if (!checkAjaxSql(unescape(key))) {
        return false;
    }
    var _ajaxlist = "ajaxList";
    var _ajaxpage = "ajaxPage";

    var listidx = "", listcls = "", pageidx = "", pagecls = "";//列表索引 列表Class 分页索引 分页Class

    if ($('#ajaxListIndex').val() != undefined) {
        listidx = $.trim($('#ajaxListIndex').val());
    }
    if ($('#ajaxListClass').val() != undefined) {
        listcls = $.trim($('#ajaxListClass').val());
    }
    if ($('#ajaxPageIndex').val() != undefined) {
        pageidx = $.trim($('#ajaxPageIndex').val());
    }
    if ($('#ajaxPageClass').val() != undefined) {
        pagecls = $.trim($('#ajaxPageClass').val());
    }

    var bon = false;//是否是切换类型
    var dataBon = false;
    //如果列表索引 列表Class 分页索引 分页Class都不为空时 则是切换类型
    if (listidx != '' && listcls != '' && pageidx != '' && pagecls != '') {
        bon = true;
    }

    var listi = 0;
    var pagei = 0;
    //判断是否加载数据
    if (bon) {
        $('.' + listcls).map(function () {
            if (listi == listidx && ((($.trim($(this).html()) == lang.loading || $.trim($(this).html()) == lang.loading) && page == -1) || page >= 1)) {
                if (page == -1) page = 1;
                dataBon = true;
            }
            listi++;
        });
    }
    else {
        $('#' + _ajaxlist).html(lang.loading);
        $('#' + _ajaxlist).html('');
        $('#' + _ajaxpage).html('');
        dataBon = true;
    }
    var ajaxListDate = $('#ajaxListDate').val();
    var ajaxPageDate = $('#ajaxPageDate').val();
    var ajaxSiteId = $('#ajaxSiteId').val();
    var ajaxGroupId = $('#ajaxGroupId').val();
    var ajaxPageSite = $('#ajaxPageSite').val();

    var ajaxClassId = $('#ajaxClassId').val();
    var ajaxXgid = $('#ajaxXgid').val();
    var ajaxCategory = $('#ajaxCategory').val();
    var ajaxAboutDownload = $('#ajaxAboutDownload').val();
    var ajaxParentId = $('#ajaxParentId').val();
    if (dataBon) {

        var data = "cmd=_saveListAndPageDate_LB&ajaxListDate=" + ajaxListDate + "&ajaxPageDate=" + ajaxPageDate + "&ajaxSiteId=" + ajaxSiteId + "&ajaxGroupId=" + ajaxGroupId + "&ajaxPageSite=" + ajaxPageSite + "&ajaxClassId=" + ajaxClassId + "&ajaxXgid=" + ajaxXgid + "&ajaxCategory=" + ajaxCategory + "&ajaxAboutDownload=" + ajaxAboutDownload + "&ajaxParentId=" + ajaxParentId + "";
        ajaxhelpS(data, function () {
            data = "cmd=search_CZ&key=" + key + "&page=" + page + "";
            ajaxhelpS(data, function (msg) {
                var obj = eval('(' + msg + ')');

                if (bon) {
                    listi = 0;
                    $('.' + listcls).map(function () {
                        if (listi == listidx && ($.trim($(this).html()) == lang.loading || page >= 1)) {
                            $(this).html(unescape(obj.list));
                        }
                        listi++;
                    });
                    pagei = 0;
                    $('.' + pagecls).map(function () {
                        if (pagei == pageidx && ($.trim($(this).html()) == '' || page >= 1)) {
                            $(this).html(unescape(obj.page));
                        }
                        pagei++;
                    });

                } else {

                    $('#' + _ajaxlist).html(unescape(obj.list));

                    $('#' + _ajaxpage).html(unescape(obj.page));
                }

                try {

                    var scriptStr = "<script src=\"/javascript/lightbox.js\"></script>";
                    $('#ajaxScriptCallback').html(scriptStr);
                } catch (e) {

                }
            });
        });
    }
}

/*---------------------------过滤危险字符---------------------------*/
$(function () {
    $(document).on('keyup', 'input[type=text],textarea,input[type=password]', function () {
        var val = $(this).val();
        //    //});
        //$('input[type=text],textarea,input[type=password]').keyup(function () {
        if (!checkAjaxSql(val)) {
            alert('不能包含危险字符!');
            $(this).val('');
        }
    });
})
function checkAjaxSql(val) {
    var otherKey = " and | exec | count | chr | mid | master | or | truncate | char | declare | join |<|>|*|/*|*/|;|\\u|insert|select|delete|update|create|drop|script|javascript|alert";
    for (var i = 0; i < otherKey.split('|').length ; i++) {
        if (val.indexOf(otherKey.split('|')[i]) != -1) {
            return false;
        }
    }
    return true;
}

/*----------------回车事件-------------*/
eval(function (p, a, c, k, e, d) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) d[e(c)] = k[c] || e(c); k = [function (e) { return d[e] }]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('8 3(2, 1) {    $(6).b(\'a\',2,8 (7) {        c 5 = 7.d;        9 (5 == 0) {            $(1).4()        }    })}', 62, 14, '13|ElementBtn|ElementInput|EnterFunction|click|curKey|document|e|function|if|keydown|on|var|which'.split('|'), 0, {}));

eval(function (p, a, c, k, e, r) { e = String; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('function getValue(0){return $.trim($(0).val())}', [], 1, 'obj'.split('|'), 0, {}));

//eval(function (p, a, c, k, e, r) { e = function (c) { return c.toString(36) }; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0-9a-g]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('function getValueDefaultError(3,6,7,5,4,8){9 1=true;9 0=$.trim($(3).val());2(0==6||0==\'\'){a.b(7);1=c;2(5){$(3).d()}}2((4!=""||4!=null)&&0!=\'\'){2(0.length<4){a.b(8);1=c;2(5){$(3).d()}}e f g(0,1)}e f g(0,1)}', [], 17, 'Temp|Validator|if|Element|Length|Focus|DefaultVal|ErrorInfo|LengthErrorInfo|var|layer|alert|false|focus|return|new|Array'.split('|'), 0, {}));

eval(function (p, a, c, k, e, r) { e = String; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0-7]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('function getLengthDefaultError(1,3,4,5){6 2=true;6 0=$.trim($(1).val());7(0.length<3||0==\'\'){alert(4);2=false;7(5){$(1).focus()}}return new Array(0,2)}', [], 8, 'Temp|Element|Validator|DefaultVal|ErrorInfo|Focus|var|if'.split('|'), 0, {}));
/*------------取元素value值  end-----------*/

/*----------------取元素text值-------------*/
eval(function (p, a, c, k, e, r) { e = String; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('function getText(0){return $.trim($(0).text())}', [], 1, 'obj'.split('|'), 0, {}));

eval(function (p, a, c, k, e, r) { e = String; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0-7]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('function getTextDefaultError(0,3,4,5){6 1=true;6 2=$.trim($(0).val());7(2==3){alert(4);1=false;7(5){$(0).focus()}}return new Array(2,1)}', [], 8, 'Element|Validator|Temp|DefaultVal|ErrorInfo|Focus|var|if'.split('|'), 0, {}));

/*--------------验证元素输入的电话号码|手机号码格式是否正确-------------------*/
eval(function (p, a, c, k, e, r) { e = String; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('function IsTelOrPhone(0){if(!regtelphone.test($(0).val())){alert(lang.telformat);$(0).focus()}}', [], 1, 'obj'.split('|'), 0, {}));
/*-----------------元素输入的数字格式,如果输入非数字的字符 将默认设置为1------------*/

eval(function (p, a, c, k, e, d) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) d[e(c)] = k[c] || e(c); k = [function (e) { return d[e] }]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('$(6 () {    $(\'.1>8\').9(6 (5) {        d 7 = $(\'.1>8\').7($(b));        $(\'#2\').c($(b).3("4-0"));        a(7);    });});', 62, 14, 'ClassId|ajaxBQQH|ajaxClassId|attr|data|e|function|index|li|mouseover|setListAndPageHtml|this|val|var'.split('|'), 0, {}));

eval(function (p, a, c, k, e, d) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) d[e(c)] = k[c] || e(c); k = [function (e) { return d[e] }]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('6 e(a) {    $(\'#3\').h(a);    $(\'#4\').h(a);    9 ($.g($(\'.\' + $(\'#2\').h()).5(a).f()).c == 0) {        $(\'.\' + $(\'#2\').h()).5(a).8(b.d);    }    7("", -1);}', 62, 18, '||ajaxListClass|ajaxListIndex|ajaxPageIndex|eq|function|getList_LB|html|if|index|lang|length|loading|setListAndPageHtml|text|trim|val'.split('|'), 0, {}));

/*---------------退订 订阅信息 begin----------*/
/*------------取元素value值-----------*/
//eval(function (p, a, c, k, e, r) { e = function (c) { return c.toString(36) }; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0-9a-l]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('a getValue(i){5 $.b($(i).c())}a getValueDefaultError(2,6,7,4,8,j){9 1=k;9 0=$.b($(2).c());3(0==6||0==\'\'){d(7);1=e;3(4){$(2).f()}}3((8!=""||8!=null)&&0!=\'\'){3(0.l<8){d(j);1=e;3(4){$(2).f()}}5 g h(0,1)}5 g h(0,1)}a getLengthDefaultError(2,6,7,4){9 1=k;9 0=$.b($(2).c());3(0.l<6||0==\'\'){d(7);1=e;3(4){$(2).f()}}5 g h(0,1)}', [], 22, 'Temp|Validator|Element|if|Focus|return|DefaultVal|ErrorInfo|Length|var|function|trim|val|alert|false|focus|new|Array|obj|LengthErrorInfo|true|length'.split('|'), 0, {}));
eval(function (p, a, c, k, e, d) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) d[e(c)] = k[c] || e(c); k = [function (e) { return d[e] }]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('b d(k) {    l $.m($(k).o())}b e(2, 1, 3, 4, 5, 6) {    p 8 = n;    p 7 = $.m($(2).o());    f (7 == 1 || 7 == \'\') {        g(3);        8 = 9;        f (4) {            $(2).a()        }    }    f ((5 != "" || 5 != j) && 7 != \'\') {        f (7.h < 5) {            g(6);            8 = 9;            f (4) {                $(2).a()            }        }        l i 0(7, 8)    }    l i 0(7, 8)}b c(2, 1, 3, 4) {    p 8 = n;    p 7 = $.m($(2).o());    f (7.h < 1 || 7 == \'\') {        g(3);        8 = 9;        f (4) {            $(2).a()        }    }    l i 0(7, 8)}', 62, 26, 'Array|DefaultVal|Element|ErrorInfo|Focus|Length|LengthErrorInfo|Temp|Validator|false|focus|function|getLengthDefaultError|getValue|getValueDefaultError|if|layerMsg|length|new|null|obj|return|trim|true|val|var'.split('|'), 0, {}))

/*----------------取元素text值-------------*/
eval(function (p, a, c, k, e, r) { e = function (c) { return c.toString(36) }; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0-9a-c]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('3 getText(4){5 $.6($(4).7())}3 getTextDefaultError(0,8,9,a){b 1=true;b 2=$.6($(0).7());c(2==8){alert(9);1=false;c(a){$(0).focus()}}5 new Array(2,1)}', [], 13, 'Element|Validator|Temp|function|obj|return|trim|text|DefaultVal|ErrorInfo|Focus|var|if'.split('|'), 0, {}));

/*--------------验证元素输入的电话号码|手机号码格式是否正确-------------------*/
eval(function (p, a, c, k, e, r) { e = String; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('function IsTelOrPhone(0){if(!regtelphone.test($(0).val())){alert(\'电话号码格式不正确!\');$(0).focus()}}', [], 1, 'obj'.split('|'), 0, {}));

/*-----------------元素输入的数字格式,如果输入非数字的字符 将默认设置为1------------*/
eval(function (p, a, c, k, e, r) { e = String; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0-2]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('function IsNum(0,1){if(!regnum.test($(0).2())){$(0).2(1)}}', [], 3, 'obj|obj2|val'.split('|'), 0, {}));

/*-点击次数*/
$(function () {
    UpdateCrt('#views')
});
function UpdateCrt(obj) {
    var this_href = window.location.href;
    var reg = /\d{1,}_(\d{1,})\.html/;
    if (reg.test(this_href)) {
        var data = "cmd=updatecrt&id=" + TDES.encrypt(reg.exec(this_href)[1]) + "";
        ajaxhelpS(data,
		function (msg) {
		    $(obj).text('浏览量：' + msg)
		})
    } else {
        var data = "cmd=updateMenuCrt&cid=" + TDES.encrypt(getClassID()) + "&id=" + TDES.encrypt(getInfoID()) + "";
        ajaxhelpS(data,
		function (msg) { })
    }
}

/*-重置按钮*/
eval(function (p, a, c, k, e, r) { e = String; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '^$' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('$(document).on("click","#btnReset",function(){window.location.href=this_url});', [], 1, ''.split('|'), 0, {}));
/*-----------------------身份证号码真伪验证-----------------------------
**返回结果
**0   表示身份证号码正确
**1   表示非法身份证号
**2   表示非法地区
**3   表示非法生日
*/

eval(function (p, a, c, k, e, r) { e = function (c) { return (c < 62 ? '' : e(parseInt(c / 62))) + ((c = c % 62) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[579bcefhjl-wyzA-F]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('function cardValid(s){7 t={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};7 l=0;7 5=s;7 u=5.v;9(!/^\\d{17}(\\d|x)$/i.w(5)&&!/^\\d{15}$/i.w(5)){b 1}9(t[y(5.c(0,2))]==null){b 2}9(u==15){e="19"+5.c(6,2)+"-"+h(5.c(8,2))+"-"+h(5.c(10,2));7 d=f m(e.n(/-/g,"/"));7 z=d.o().toString()+"-"+(d.A()+1)+"-"+d.B();9(e!=z){b 3}5=5.p(0,6)+"19"+5.p(6,15);5=5+GetVerifyBit(5)}7 C=f m();7 q=C.o();7 D=q-150;7 r=5.p(6,10);9(r<D||r>q){b 3}5=5.n(/x$/i,"a");e=5.c(6,4)+"-"+h(5.c(10,2))+"-"+h(5.c(12,2));7 d=f m(e.n(/-/g,"/"));9(e!=(d.o()+"-"+(d.A()+1)+"-"+d.B())){b 3}E(7 i=17;i>=0;i--){l+=(Math.pow(2,i)%11)*y(5.charAt(17-i),11)}9(l%11!=1){b 1}7 j=f F();j=f F("11111119111111111","12121219121212121","123456789087654321");E(7 k=0;k<j.v;k++){9(5.indexOf(j[k])!=-1){b 1}}b 0}', [], 42, '|||||strIDno||var||if||return|substr||sBirthday|new||Number||words||iSum|Date|replace|getFullYear|substring|nowYear|year|cardID|aCity|idCardLength|length|test||parseInt|dd|getMonth|getDate|nowDate|oldYear|for|Array'.split('|'), 0, {}));

/*-------------------取消字符串中出现的所有字符 StrClear("123,456,789",",","") -----------------*/
eval(function (p, a, c, k, e, r) { e = String; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0-2]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('function StrClear(0,1,2){0=0.replace(eval(\'/\'+1+\'/g\'),2);return 0}', [], 3, 'str|repstr|repval'.split('|'), 0, {}))
/*-------------------公共校验调用方法 Verification -----------------*/
eval(function (p, a, c, k, e, d) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) d[e(c)] = k[c] || e(c); k = [function (e) { return d[e] }]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('L 6 = h () {    L k = I;    L 4 = f;    $(\'.i:M\').p(h () {        m (k) {            4 = f;            L K = j($(H));            L v = $(H).7(\'v\');            m ($(H).l(\'D\')) {                m (K.o == 0 || $(H).K() == v) {                    m (v != \'\' && v != J) {                        n.s(v)                    } d {                        n.s(\'请输入必填信息!\')                    }                    $(H).g();                    k = f                } d m (K.o == 1 && K == "0") {                    L v = $(H).7(\'v\');                    m (v != \'\') {                        n.s(v)                    } d {                        n.s(\'请输入必填信息!\')                    }                    $(H).g();                    k = f                }                4 = I            }            m (!k) {                E f            }            m (!4) {                m (K != J && K.o > 0 && K != v) {                    4 = I                }            }            m ($(H).l(\'F\')) {                m (4 && !C.G($(H).K())) {                    n.s(\'您输入电话的格式错误!\');                    $(H).g();                    k = f                }            } d m ($(H).l(\'8\')) {                m (4 && 9($(H).K()) != 0) {                    n.s(\'您输入的身份证号码格式不正确!\');                    $(H).g();                    k = f                }            } d m ($(H).l(\'e\')) {                m (4 && !z.G($(H).K())) {                    n.s(\'您输入邮箱的格式错误!\');                    $(H).g();                    k = f                }            } d m ($(H).l(\'u\')) {                m (4 && !B.G($(H).K())) {                    n.s(\'密码只能由数字与字母组成!\');                    $(H).g();                    k = f                }                m (4 && ($(H).K().o < 3 || $(H).K().o > 2)) {                    n.s(\'密码长度必须为3-2位!\');                    $(H).g();                    k = f                }            } d m ($(H).l(\'a\')) {                m (4 && $(H).K() != $($(H).7(\'c-b\')).K()) {                    n.s(\'确认密码与密码不一致!!\');                    $(H).g();                    k = f                }            } d m ($(H).l(\'w\')) {                m (4 && !x.G($(H).K())) {                    n.s(\'您输入的邮政编码格式不正确!\');                    $(H).g();                    k = f                }            } d m ($(H).l(\'t\')) {                m (4 && !A.G($(H).K())) {                    n.s(\'您输入的不是正整数!\');                    $(H).g();                    k = f                }                m (4 && $(H).7(\'r\')) {                    m (5($(H).K().o) < 5($(H).7(\'r\'))) {                        n.s(\'您输入的值过小!\');                        $(H).g();                        k = f                    }                }                m (4 && $(H).7(\'q\')) {                    m (5($(H).K().o) > 5($(H).7(\'q\'))) {                        n.s(\'您输入的值过大!\');                        $(H).g();                        k = f                    }                }            } d m ($(H).l(\'o\')) {                m (4 && $(H).7(\'r\')) {                    m (5($(H).K().o) < 5($(H).7(\'r\'))) {                        n.s(\'您输入值的长度,不能小于\' + $(H).7("r") + \'位!\');                        $(H).g();                        k = f                    }                }                m (4 && $(H).7(\'q\')) {                    m (5($(H).K().o) > 5($(H).7(\'q\'))) {                        n.s(\'您输入值的长度，不能大于\' + $(H).7("q") + \'位!\');                        $(H).g();                        k = f                    }                }            } d m ($(H).l(\'N\')) {                m (4 && !y.G($(H).K())) {                    n.s(\'您输入的网址格式不正确!\');                    $(H).g();                    k = f                }            }        }    });    E k}', 62, 50, '||12|6|IsRunReg|Number|Verification|attr|card|cardValid|compare|comparefrom|data|else|email|false|focus|function|get|getValue|goon|hasClass|if|layer|length|map|max|min|msg|number|password|placeholder|postalcode|regPcode|regUrl|regemail|regnum|regpassword|regtelphone|required|return|tel|test|this|true|undefined|val|var|visible|weburl'.split('|'), 0, {
}));
eval(function (p, a, c, k, e, r) { e = function (c) { return c.toString(36) }; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[2-57-9a-q]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('i Verification1=n(){i 5=m;i 7=8;$(\'.get1:visible\').map(n(){3(5){7=8;i 4=getValue($(2));i d=$(2).c(\'d\');3($(2).f(\'required\')){3(4.g==0||$(2).4()==d){3(d!=\'\'&&d!=o){9.a(d)}e{9.a(\'请输入必填信息!\')}$(2).b();5=8}e 3(4.g==1&&4=="0"){i d=$(2).c(\'d\');3(d!=\'\'){9.a(d)}e{9.a(\'请输入必填信息!\')}$(2).b();5=8}7=m}3(!5){p 8}3(!7){3(4!=o&&4.g>0&&4!=d){7=m}}3($(2).f(\'tel\')){3(7&&!regtelphone.j($(2).4())){9.a(\'您输入电话的格式错误!\');$(2).b();5=8}}e 3($(2).f(\'card\')){3(7&&cardValid($(2).4())!=0){9.a(\'您输入的身份证号码格式不正确!\');$(2).b();5=8}}e 3($(2).f(\'email\')){3(7&&!regemail.j($(2).4())){9.a(\'您输入邮箱的格式错误!\');$(2).b();5=8}}e 3($(2).f(\'password\')){3(7&&!regpassword.j($(2).4())){9.a(\'密码只能由数字与字母组成!\');$(2).b();5=8}3(7&&($(2).4().g<6||$(2).4().g>q)){9.a(\'密码长度必须为6-q位!\');$(2).b();5=8}}e 3($(2).f(\'compare\')){3(7&&$(2).4()!=$($(2).c(\'data-comparefrom\')).4()){9.a(\'确认密码与密码不一致!!\');$(2).b();5=8}}e 3($(2).f(\'postalcode\')){3(7&&!regPcode.j($(2).4())){9.a(\'您输入的邮政编码格式不正确!\');$(2).b();5=8}}e 3($(2).f(\'number\')){3(7&&!regnum.j($(2).4())){9.a(\'您输入的不是正整数!\');$(2).b();5=8}3(7&&$(2).c(\'k\')){3(h($(2).4().g)<h($(2).c(\'k\'))){9.a(\'您输入的值过小!\');$(2).b();5=8}}3(7&&$(2).c(\'l\')){3(h($(2).4().g)>h($(2).c(\'l\'))){9.a(\'您输入的值过大!\');$(2).b();5=8}}}e 3($(2).f(\'g\')){3(7&&$(2).c(\'k\')){3(h($(2).4().g)<h($(2).c(\'k\'))){9.a(\'您输入值的长度,不能小于\'+$(2).c("k")+\'位!\');$(2).b();5=8}}3(7&&$(2).c(\'l\')){3(h($(2).4().g)>h($(2).c(\'l\'))){9.a(\'您输入值的长度，不能大于\'+$(2).c("l")+\'位!\');$(2).b();5=8}}}e 3($(2).f(\'weburl\')){3(7&&!regUrl.j($(2).4())){9.a(\'您输入的网址格式不正确!\');$(2).b();5=8}}}});p 5}', [], 27, '||this|if|val|goon||IsRunReg|false|layer|msg|focus|attr|placeholder|else|hasClass|length|Number|var|test|min|max|true|function|undefined|return|12'.split('|'), 0, {}))
/*------------------AJAX 一个页面多个分页 分页外层容器添加class="ajaxLoadPage" data-url="/social/news.html";  go按钮上需要包含类似 class="go" data-file="news" data-maxpage="4"----------------------------*/
eval(function (p, a, c, k, e, d) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) d[e(c)] = k[c] || e(c); k = [function (e) { return d[e] }]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('$(k () {    /*初始加载*/    $(\'.8\').y(k () {        L $H = $(G);        L x = $H.9(\'c-J\');        q (x != I) {            s(x, $H);        }    });    /*分页6链接点击加载*/    $(d).B(\'a\', \'.8 .C 6\', k () {        L $H = $(G).D(\'.8\');        L x = $(G).9(\'o\');        q (x != I && x.w > 0 && x != "r:M(0);") {            s(x,$H);        }        E g;    });    /*分页l按钮点击加载*/    $(d).B(\'a\', \'.8 .C .l\', k () {        L $H = $(G).D(\'.8\');        t($H);        E g;    });    /*分页输入框回车事件加载*/    $(d).B(\'u\', \'.8 .C #n\', k (e) {        L b = e.N;        q (b == 2) {            L $H = $(G).D(\'.8\');            t($H);            E g;        }    });    /*3页面加载*/    k s(x, $H) {        $.7({            J: x,            F: k (c) {                $H.p(c);            }        });    }    /*l按钮与分页输入框回车事件加载*/    k t($H) {        L i = $H.j(\'.l\').9(\'c-h\');        L z = $H.j(\'.l\').9(\'c-A\');        L m = $H.j(\'#n\').K();        q (!4(m)) {            v(\'请输入数字！\');        } f {            q (4(m) > z) {                v(\'输入的数字太大!\');            } f {                L x = i + (m == 1 ? \'.p\' : (\'5\' + 4(m) + \'.p\'));                s(x, $H);            }        }    }   })', 62, 50, '||13|Ajax|Number|_|a|ajax|ajaxLoadPage|attr|click|curKey|data|document||else|false|file|filePath|find|function|go|goPage|gotopage|href|html|if|javascript|jumpAjax|jumpPage|keydown|layerMsg|length|loadUrl|map|maxPage|maxpage|on|page|parents|return|success|this|thisBox|undefined|url|val|var|void|which'.split('|'), 0, {}));

/*-------------------公共ajax调用方法-----------------*/
eval(function (p, a, c, k, e, d) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) d[e(c)] = k[c] || e(c); k = [function (e) { return d[e] }]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('d 6(9, c) {    r n = -1;    h (l) {        n = i.j(\'数据请求中，请稍后…\', {            o: 0,            g: 2        });    }    $.5({        "p": "k",        "q": "" + e() + "/3/4.7",        "9": 9,        "a": "f",        "m": d (j) {            h (l) {                i.8(n);            }            h (c) {                c(j)            }        },        "b": d () {            h (l) {                i.8(n)            }        }    })}', 62, 28, '||16|Ajax|AjaxHandler_FXJT|ajax|ajaxhelpS|ashx|close|data|datatype|error|fn|function|getRootPath|html|icon|if|layer|msg|post|showLoading|success|thisIndex|time|type|url|var'.split('|'), 0, {}))
