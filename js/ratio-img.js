

function imgratio() {//图片 ratio方法调用
    $(".ratio-img").each(function (index, element) {
     
        if($(this).is(":visible"))
        {
            $(this).css({height:Math.floor($(this).width()*$(this).data("ratio"))});
        }
    });
}

function imgratio2() {//图片 ratio方法调用
    $(".ratio-img2").each(function (index, element) {
     
        if($(this).is(":visible"))
        {
            $(this).css({minHeight:Math.floor($(this).width()*$(this).data("ratio"))});
        }
    });
}

$(function () {



    imgratio();//初始化图片ratio
    imgratio2();//初始化图片ratio

    setTimeout(function () {
        imgratio();
        imgratio2();
    }, 100)

    $(".ratio-img").each(function (index, element) {
        $(this).attr({ "src": $(this).data("src") });//图片预加载 
    });
    
    //窗口改变大小回调ratio；
    var rtime = new Date();
    var timeout = false;
    var delta = 200;
    $(window).resize(function () {
        rtime = new Date();
        if (timeout === false) {
            timeout = true;
            setTimeout(resizeend, delta); //resize只回调最后一次
        }
    });
    function resizeend() {  //window.resize回调
        if (new Date() - rtime < delta) {
            setTimeout(resizeend, delta);
        } else {
            timeout = false;
            imgratio()//ratio
        }
    }
    //

})

//无图图像

$(function () {
    $(".ratio-img").each(function () {
        if ($(this).attr("src") == "") {
            $(this).attr({ "src": nullimg })
        }
    })
})

$(function(){
if(!placeholderSupport()){   // 判断浏览器是否支持 placeholder
    $('[placeholder]').focus(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function() {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
        }
    }).blur();
};
})
function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}