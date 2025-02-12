$(function () {
    wowInt();
    findTel();
    phoneTargetSelf();
    nav();
    search();
    share();
    foot_link();
    healthyTab2();
    healthyTab3();
    healthyTab4();
    healthyLink();
    // richslider();
    maod();
    $(window).resize();

    if($(window).width()>1024){ 
        $(".share_a a>i").hover(function(){
           $(this).parent("a").addClass("on").siblings().removeClass("on");
        },function() {
          
        })

        $(".share_a").hover(function(){
        },function() {
            $(this).find("a").removeClass("on");
        })


    }
    else{
        $(".share_a a>i").on(function(){
            $(this).parent("a").addClass("on").siblings().removeClass("on");
         })
    }
    


    $(document).on("click",".language dt",function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass("on");
        $(this).siblings().slideToggle();
        $('.search_btn').removeClass('on');
        $('.search_box').removeClass('on');
    })
   
    if($(window).width()>1200){
        $(document).on("click",".language dt",function(e){
            $(".header_website dt").removeClass("on");
            $(".header_website dd").slideUp();
        })
        $(document).click(function(){           
            $(".language dt").removeClass("on");
            $(".language dd").slideUp();
        })
    }

    wowDelay(".index_develop ul",$('.index_develop ul li').length,"0.2");
    wowDelay(".index_03 ul",$('.index_03 ul li').length,"0.2");
    $(document).on("click",".hea_btn span",function(){
        $(window).scroll(function () {
            $(".healthy_02").scrollTop()
        });
    });
    $(document).on("click",".made_body .hea_btn span",function(){
        $(window).scroll(function () {
            $(".healthy_03").scrollTop()
        });
    });

    if($(window).width()>767){
        // ScollText(".gk_in");
        
    }
	if($(window).width()>1023){
        ScollText(".str_driven02 li .edit_con_original");
		ScollText(".healthy_04_items .scroll")
        ScollText(".scl_part4 .cont .scroll")
		ScollText('.str_driven_new ul .desc')
    }

})

function ScollText(obj){
    if($(obj).length>0){
       $(obj).mCustomScrollbar({
            mouseWheelPixels:500,
            autoDraggerLength:false,
            advanced: {
                 autoScrollOnFocus: "" 
              }
       });
    }

}

function nav(){
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('body').addClass('scrollHeader');
           
        } else {
            $('body').removeClass('scrollHeader');
        }
    });




    if($(window).width()>1200){
        $(".nav li").hover(function(){
            $(".header").addClass("hov");
            $(this).find(".nav_list").stop().slideDown();
            $(this).siblings().find(".nav_list").stop().slideUp()
        },function(){
             $(this).find(".nav_list").stop().slideUp()
             $(".header").removeClass("hov");
        })
        $(document).on("click",".nav_list p",function(e){
            $(".nav_list").hide();
        })

        $(".nav>ul").hover(function(){
            $(".header").addClass("submenu_show");
        },function(){
            $(".header").removeClass("submenu_show");
        });

        /*$(".noslide").mouseover(function(){
            $(".bg_hover").addClass("on")
        })
        $(".noslide").mouseout(function(){
            $(".bg_hover").removeClass("on")
        })*/

    }else{

        $(".menu_button").click(function(){
            $("body").toggleClass("navbody");
        })
        $(document).on("click",".menu_close",function(e){
            $("body").removeClass("navbody");
        })
    }
    $(".nav>ul>li>span").click(function(){
        $(this).parent("li").toggleClass("cur");
        // $(this).siblings(".nav_list").slideToggle();
        $(this).parent("li").siblings().removeClass("cur");
        // $(this).parent("li").siblings().find(".nav_list").slideUp();
    })
     $(".return_a").click(function(){
        $(this).parents("li").removeClass("cur");
    })
    if($(window).width()<1200){
        $(".nav").on('touchmove',function(event){
            event.preventDefault();
            event.stopPropagation();
         })
    }
}
function search() {
    if($(window).width()>1200){
        $(document).on("click",".search_btn",function(e){
            e.preventDefault()
            e.stopPropagation()
            $(this).toggleClass('on')
            $(this).siblings('.search_box').toggleClass('on');
            $("body").removeClass("navbody");
            $(".header_website dt,.language dt").removeClass("on");
            $(".header_website dd,.language dd").slideUp();
        })
        $(document).on("click",".search_box",function(e){
            e.preventDefault()
            e.stopPropagation()
        })
        $(document).on("click",".search_box_btn",function(){
            $('.search_btn').removeClass('on');
            $('.search_box').removeClass('on');
        })
        $(document).click(function () {
            $('.search_btn').removeClass('on');
            $('.search_box').removeClass('on');
        })
    }
}

function wowDelay(box,row,delayTime){
    $(box).children().each(function(index){
        for(var i = 0;i<row;i++){
            if(index%row==i){
                $(this).attr("data-wow-delay",i*delayTime+'s');
            };
        };
    });
};
function wowInt(){
    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 100,
            mobile:false,
            live: true
        });
        wow.init();
    };
}


/*手机端链接改为本窗口打开*/
function phoneTargetSelf(context){  
  if ($(window).width()<1024) {
    if(context==undefined){
      context=$(document);
    }
    $('a',context).each(function(){
      var target=$(this);
      var link=target.attr('target');
      target.attr('target','_self');
    })
  }
}


/*电话链接取消默认事件并添加样式*/
function findTel(context){
  if ($(window).width()>1024) {
    var condition = /^tel\:([0-9\-]+)|tel\:\+([0-9\-]+)$/;
    if(context==undefined){
      context=$(document);
    }
    $('a',context).each(function(index, el) {
      var target=$(this);
      var href=target.attr('href');
      if (condition.test(href)) {
        target.addClass('tel_link');
        target.on('click',function(event){
          event.preventDefault();
        })
      }
    });
  }
}


/*ie9的placeholder包含密码框的兼容*/
$(function() {
    // 如果不支持placeholder，用jQuery来完成
    if(!isSupportPlaceholder()) {
        // 遍历所有input对象, 除了密码框
        $('input').not("input[type='password']").each(
            function() {
                var self = $(this);
                var val = self.attr("placeholder");
                input(self, val);
            }
        );

        /**//* 对password框的特殊处理
     * 1.创建一个text框
     * 2.获取焦点和失去焦点的时候切换
     */
        $('input[type="password"]').each(
            function(i) {
                var pwdField    = $(this);
                var pwdVal      = pwdField.attr('placeholder');
                var pwdId       = pwdField.attr('id');
                // 重命名该input的id为原id后跟1
                pwdField.after('<input id="' + pwdId +''+i+'" type="text" value='+pwdVal+' autocomplete="off" />');
                var pwdPlaceholder = $('#' + pwdId + ''+i+'');
                pwdPlaceholder.show();
                pwdField.hide();

                pwdPlaceholder.focus(function(){
                    pwdPlaceholder.hide();
                    pwdField.show();
                    pwdField.focus();
                });

                pwdField.blur(function(){
                    if(pwdField.val() == '') {
                        pwdPlaceholder.show();
                        pwdField.hide();
                    }
                });
            }
        );
    }
});

// 判断浏览器是否支持placeholder属性
function isSupportPlaceholder() {
    var input = document.createElement('input');
    return 'placeholder' in input;
}

// jQuery替换placeholder的处理
function input(obj, val) {
    var $input = obj;
    var val = val;
    $input.attr({value:val});
    $input.focus(function() {
        if ($input.val() == val) {
            $(this).attr({value:""});
        }
    }).blur(function() {
        if ($input.val() == "") {
            $(this).attr({value:val});
        }
    });
}
//end


function foot_link(){
    $(document).on("click",".f_link dt",function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).siblings("dd").slideToggle();
        $(this).toggleClass("on");
    })
    $(document).click(function () {
        $(".f_link dd").slideUp();
    })
}

//--------------点击分享
function share(){
    //  $(".share_facebook").click(function () {//Facebook
    //     var url = $(this).data("txt");
    //     var url = window.location.href;
    //     var title = document.title;
    //     var op = "https://www.facebook.com/sharer.php?s=100&p[title]=" + title + "&p[summary]=!&p[url]=" + encodeURIComponent(url) + ""
    //     window.open(op)
    // })
    $(".share_dy").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(".dy_box").show();
        $(".weixin").remove();
    })
    $(".share_wx").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(".weixin").show();
        $(".dy_box").hide();
    })
    $(".dy_box .c").click(function () {
        $(".dy_box").hide();
    })
    $(document).click(function(){           
        $(".dy_box").hide();
        $(".weixin").remove();
    })

    // $(".share_twitter").click(function () {//Twitter
    //     var url = $(this).data("txt");
    //     var url = window.location.href;
    //     var title = document.title;
    //     var op = "https://www.tumblr.com/login?redirect_to=https://www.tumblr.com/widgets/share/tool?shareSource=legacy&canonicalUrl=&url=" + encodeURIComponent(url) + "&title=" + title + "";
    //     window.open(op)
    // })

    $(".share_wb").click(function () {//微博
        var url = $(this).data("txt");
        var url = window.location.href;
        // var title = document.title;
        var title = $(".d_title h1").text();
        var op = "https://service.weibo.com/share/share.php?title=" + title + "&url=" + encodeURIComponent(url) + "";
        window.open(op)
    })
    $(".share_qqkj").click(function () {//腾讯微博
        var url = $(this).data("txt");
        var url = window.location.href;
        var title = document.title;
        var op = "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=" + title + "&url=" + encodeURIComponent(url) + "";
        window.open(op)
    })

    $(".share_qq").click(function () {//QQ
        var url = $(this).data("txt");
        var url = window.location.href;
        var title = document.title;
        var op = "https://connect.qq.com/widget/shareqq/index.html?url=" + encodeURIComponent(url) + "";
        window.open(op);
    })

    $(".share_douban").click(function () {//豆瓣
        var url = $(this).data("txt");
        var url = window.location.href;
        var title = document.title;
        var op = "https://www.douban.com/share/service?title=" + title + "&url=" + encodeURIComponent(url) + "";
        window.open(op);
    })

    $(".share_bd").click(function () {//百度贴吧
        var url = $(this).data("txt");
        var url = window.location.href;
        var title = document.title;
        var op = "https://s.share.baidu.com/mshare?url=" + title + "&url=" + encodeURIComponent(url) + "";
        window.open(op);
    })

    //微信
    $(".share_wx").attr("data-qrcode","https://www.xinhongru.com/qrcode/qrcode.php?content="+window.location.href);

    $(".share_wx").click(function () {//微信
        //var url = "/qrCode/Index.aspx?url=" + window.location.href;
        var url = $(this).attr("data-qrcode")
        console.log(url)
        var title = ""
        title += "<div class='weixin'>"
        title += "<i class='c'>x</i>"
        title += "<h2>微信二维码</h2>"
        title += "<div class='img'><img src='" + url + "' width='100px;' height='100px;'></div>"
        title += "<p>扫一扫</p>"
        title += "</div>"
        $("body").remove(".weixin");
        $("body").append(title)
    })
    $(document).on("click", ".weixin .c", function () {
        $(".weixin").remove();
    })
}


function healthyTab2(){
    /*setTimeout(function () {
        $(".healthy_tab2 .healthy_tab li").eq(0).click();
    }, 200);*/
    if($(window).width()>767){
        if($(".healthy_tab2 .healthy_tab li").length>2){
            $(".healthy_tab2 .healthy_tab .but_pub").show()
        }
    }else{
        if($(".healthy_tab2 .healthy_tab li").length>1){
            $(".healthy_tab2 .healthy_tab .but_pub").show()
        }
    }
    
    if($(".healthy_tab2 .healthy_tab li").length>1){
        var pro3 = new Swiper('.healthy_tab2 .healthy_tab .swiper-container', {
            nextButton: '.healthy_tab2 .healthy_tab .swiper-button-next',
            prevButton: '.healthy_tab2 .healthy_tab .swiper-button-prev',
            slidesPerView: 2,
            slidesPerGroup: 1,
            paginationClickable: true,
            spaceBetween: 0,
            noSwiping : true,
            onInit: function(swiper){
                var i = $('.healthy_tab2 .healthy_tab .swiper-slide.on').index();
                swiper.slideTo(i-1);
            },
         
            breakpoints: {
                
                767: {
                    slidesPerView: 1,
                    
                }
            }
        });
    }

    var _ind = 0;
    var _len = $(".healthy_tab2 .healthy_tab .swiper-slide").length;
    var url = $(".healthy_tab2 .healthy_tab .swiper-slide").eq(0).data("src");
    btnJudge();


    $(".healthy_tab2 .healthy_tab .swiper-slide").click(function(){
          var url = $(this).data("src");
            if(url == ""){
                return false;
            }else{
                indexAjax(".healthy_ajax",url)
            }

        _ind = $(this).index();
        
        $(this).addClass("on").siblings().removeClass("on");
        
        btnJudge();

        imgratio();
        


    })

    var _ind2 = GetQueryString("index");
	if(_ind2){
		$(".healthy_tab2 .healthy_tab .swiper-slide:eq(" + _ind2 + ")").click();
	}else{
		$(".healthy_tab2 .healthy_tab .swiper-slide:eq(0)").click();
	}


    $(".healthy_tab2 .healthy_tab .swiper-button-prev").click(function() {
        _ind--;
        btnJudge()
        $(".healthy_tab2 .healthy_tab .swiper-slide").eq(_ind).addClass("on").siblings().removeClass("on");
        $(".healthy_tab2 .healthy_tab .swiper-slide.on").click();
        
        // var srcurl=$(".healthy_tab2 .healthy_tab .swiper-slide").eq(_ind).find("img").attr("src");
        // console.log(srcurl)
        // $(".pro_bigimg img").attr("src",srcurl)

        imgratio();
        


        

    })
    //点击又按钮，实现_ind自加1
    $('.healthy_tab2 .healthy_tab .swiper-button-next').click(function() {
        _ind++;
        btnJudge()
        $(".healthy_tab2 .healthy_tab .swiper-slide").eq(_ind).addClass("on").siblings().removeClass("on");
        $(".healthy_tab2 .healthy_tab .swiper-slide.on").click();
        
        // var srcurl=$(".healthy_tab2 .healthy_tab .swiper-slide").eq(_ind).find("img").attr("src");
        // console.log(srcurl)
        // $(".pro_bigimg img").attr("src",srcurl);

        imgratio();
        

    })

    function btnJudge() {
        if(_ind >= _len - 1) {
            $('.healthy_tab2 .healthy_tab .swiper-button-next').addClass("disabled")
            _ind = _len - 1;
        } else {
            $('.healthy_tab2 .healthy_tab .swiper-button-next').removeClass("disabled")
        }
        if(_ind <= 0) {
            $(".healthy_tab2 .healthy_tab .swiper-button-prev").addClass("disabled")
            _ind = 0;
        } else {
            $(".healthy_tab2 .healthy_tab .swiper-button-prev").removeClass("disabled")
        }
    }
}
function healthyTab3(){
    /*setTimeout(function () {
        $(".healthy_tab3 .healthy_tab li").eq(0).click();
    }, 200);*/
    if($(window).width()>767){
        if($(".healthy_tab3 .healthy_tab li").length>3){
            $(".healthy_tab3 .healthy_tab .but_pub").show()
        }
    }else{
        if($(".healthy_tab3 .healthy_tab li").length>1){
            $(".healthy_tab3 .healthy_tab .but_pub").show()
        }
    }
    
    if($(".healthy_tab3 .healthy_tab li").length>1){
        var pro3 = new Swiper('.healthy_tab3 .healthy_tab .swiper-container', {
            nextButton: '.healthy_tab3 .healthy_tab .swiper-button-next',
            prevButton: '.healthy_tab3 .healthy_tab .swiper-button-prev',
            slidesPerView: 3,
            slidesPerGroup: 1,
            paginationClickable: true,
            spaceBetween: 0,
            noSwiping : true,
            onInit: function(swiper){
                var i = $('.healthy_tab3 .healthy_tab .swiper-slide.on').index();
                swiper.slideTo(i-1);
            },
         
            breakpoints: {
                
                767: {
                    slidesPerView: 1,
                    
                }
            }
        });
    }

    var _ind = 0;
    var _len = $(".healthy_tab3 .healthy_tab .swiper-slide").length;
    var url = $(".healthy_tab3 .healthy_tab .swiper-slide").eq(0).data("src");
    btnJudge();


    $(".healthy_tab3 .healthy_tab .swiper-slide").click(function(){
          var url = $(this).data("src");
            if(url == ""){
                return false;
            }else{
                indexAjax(".healthy_ajax",url)
            }

        _ind = $(this).index();
        
        $(this).addClass("on").siblings().removeClass("on");
        
        btnJudge();

        imgratio();
        


    })

    var _ind3 = GetQueryString("index");
	if(_ind3){
		$(".healthy_tab3 .healthy_tab .swiper-slide:eq(" + _ind3 + ")").click();
	}else{
		$(".healthy_tab3 .healthy_tab .swiper-slide:eq(0)").click();
	}



    $(".healthy_tab3 .healthy_tab .swiper-button-prev").click(function() {
        _ind--;
        btnJudge()
        $(".healthy_tab3 .healthy_tab .swiper-slide").eq(_ind).addClass("on").siblings().removeClass("on");
        $(".healthy_tab3 .healthy_tab .swiper-slide.on").click();
        
        // var srcurl=$(".healthy_tab3 .healthy_tab .swiper-slide").eq(_ind).find("img").attr("src");
        // console.log(srcurl)
        // $(".pro_bigimg img").attr("src",srcurl)

        imgratio();
    })
    //点击又按钮，实现_ind自加1
    $('.healthy_tab3 .healthy_tab .swiper-button-next').click(function() {
        _ind++;
        btnJudge()
        $(".healthy_tab3 .healthy_tab .swiper-slide").eq(_ind).addClass("on").siblings().removeClass("on");
        $(".healthy_tab3 .healthy_tab .swiper-slide.on").click();
        
        // var srcurl=$(".healthy_tab3 .healthy_tab .swiper-slide").eq(_ind).find("img").attr("src");
        // console.log(srcurl)
        // $(".pro_bigimg img").attr("src",srcurl);

        imgratio();
        

    })

    function btnJudge() {
        if(_ind >= _len - 1) {
            $('.healthy_tab3 .healthy_tab .swiper-button-next').addClass("disabled")
            _ind = _len - 1;
        } else {
            $('.healthy_tab3 .healthy_tab .swiper-button-next').removeClass("disabled")
        }
        if(_ind <= 0) {
            $(".healthy_tab3 .healthy_tab .swiper-button-prev").addClass("disabled")
            _ind = 0;
        } else {
            $(".healthy_tab3 .healthy_tab .swiper-button-prev").removeClass("disabled")
        }
    }
}
function healthyTab4(){
    /*setTimeout(function () {
        $(".healthy_tab4 .healthy_tab li").eq(0).click();
    }, 200);*/
    if($(window).width()>1024){
        if($(".healthy_tab4 .healthy_tab li").length>4){
            $(".healthy_tab4 .healthy_tab .but_pub").show()
        }
    }

    if($(window).width()<1025){
        if($(".healthy_tab4 .healthy_tab li").length>3){
            $(".healthy_tab4 .healthy_tab .but_pub").show()
        }
    }
    if($(window).width()<=767){
        if($(".healthy_tab4 .healthy_tab li").length>1){
            $(".healthy_tab4 .healthy_tab .but_pub").show()
        }
    }
    
    if($(".healthy_tab4 .healthy_tab li").length>1){
        var pro3 = new Swiper('.healthy_tab4 .healthy_tab .swiper-container', {
            nextButton: '.healthy_tab4 .healthy_tab .swiper-button-next',
            prevButton: '.healthy_tab4 .healthy_tab .swiper-button-prev',
            slidesPerView: 4,
            slidesPerGroup: 1,
            paginationClickable: true,
            spaceBetween: 0,
            noSwiping : true,
            onInit: function(swiper){
                var i = $('.healthy_tab4 .healthy_tab .swiper-slide.on').index();
                swiper.slideTo(i-1);
            },
         
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    
                },
                767: {
                    slidesPerView: 1,
                    
                }
            }
        });
    }

    var _ind = 0;
    var _len = $(".healthy_tab4 .healthy_tab .swiper-slide").length;
    var url = $(".healthy_tab4 .healthy_tab .swiper-slide").eq(0).data("src");
    btnJudge();


    $(".healthy_tab4 .healthy_tab .swiper-slide").click(function(){
          var url = $(this).data("src");
            if(url == ""){
                return false;
            }else{
                indexAjax(".healthy_ajax",url)
            }

        _ind = $(this).index();
        
        $(this).addClass("on").siblings().removeClass("on");
        
        btnJudge();

        imgratio();
        


    })

    var _ind4 = GetQueryString("index");
	if(_ind4){
		$(".healthy_tab4 .healthy_tab .swiper-slide:eq(" + _ind4 + ")").click();
	}else{
		$(".healthy_tab4 .healthy_tab .swiper-slide:eq(0)").click();
	}


    $(".healthy_tab4 .healthy_tab .swiper-button-prev").click(function() {
        _ind--;
        btnJudge()
        $(".healthy_tab4 .healthy_tab .swiper-slide").eq(_ind).addClass("on").siblings().removeClass("on");
        $(".healthy_tab4 .healthy_tab .swiper-slide.on").click();
        
        // var srcurl=$(".healthy_tab4 .healthy_tab .swiper-slide").eq(_ind).find("img").attr("src");
        // console.log(srcurl)
        // $(".pro_bigimg img").attr("src",srcurl)

        imgratio();
        


        

    })
    //点击又按钮，实现_ind自加1
    $('.healthy_tab4 .healthy_tab .swiper-button-next').click(function() {
        _ind++;
        btnJudge()
        $(".healthy_tab4 .healthy_tab .swiper-slide").eq(_ind).addClass("on").siblings().removeClass("on");
        $(".healthy_tab4 .healthy_tab .swiper-slide.on").click();
        
        // var srcurl=$(".healthy_tab4 .healthy_tab .swiper-slide").eq(_ind).find("img").attr("src");
        // console.log(srcurl)
        // $(".pro_bigimg img").attr("src",srcurl);

        imgratio();
        

    })

    function btnJudge() {
        if(_ind >= _len - 1) {
            $('.healthy_tab4 .healthy_tab .swiper-button-next').addClass("disabled")
            _ind = _len - 1;
        } else {
            $('.healthy_tab4 .healthy_tab .swiper-button-next').removeClass("disabled")
        }
        if(_ind <= 0) {
            $(".healthy_tab4 .healthy_tab .swiper-button-prev").addClass("disabled")
            _ind = 0;
        } else {
            $(".healthy_tab4 .healthy_tab .swiper-button-prev").removeClass("disabled")
        }
    }
}


function GetQueryString(parm) {
    var reg = new RegExp("(^|&)"+ parm +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    console.log(r);//["&name=222", "&", "222", "", index: 4, input: "id=1&name=222"]
    if(r!=null) {
		return  unescape(r[2]); 
	} else {
		return null;
	}
}

function healthyLink() {
    var _ind = 0;
    var _len = $(".gk_slider .swiper-slide").length;
    var histopbox_swiper = new Swiper('.gk_slider .swiper-container', {
        nextButton: '.gk_slider .swiper-button-next',
        prevButton: '.gk_slider .swiper-button-prev',
        slidesPerView:4,
        spaceBetween : 10,
        noSwiping : true,
        breakpoints: { 
            1024: {
                slidesPerView: 3,
              },
            767: {
                slidesPerView: 1,
                
              }
        }
    });
    btnJudge();
    $(".gk_slider .swiper-button-prev").click(function() {
        _ind--;
        btnJudge()
        $(".gk_slider .swiper-slide").eq(_ind).addClass("on").siblings().removeClass("on");
        $(".gk_slider .swiper-slide.on").click();
        $(".gk_pro li").eq(_ind).addClass("on").siblings().removeClass("on");
        imgratio();
    })
    $('.gk_slider .swiper-button-next').click(function() {
        _ind++;
        btnJudge()
        $(".gk_slider .swiper-slide").eq(_ind).addClass("on").siblings().removeClass("on");
        $(".gk_slider .swiper-slide.on").click();
        $(".gk_pro li").eq(_ind).addClass("on").siblings().removeClass("on");
        imgratio();
    })
    $(".gk_slider .swiper-slide").click(function(){
        _ind = $(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        btnJudge();
        $(".gk_pro li").eq(_ind).addClass("on").siblings().removeClass("on");
        imgratio();
        
    })
    $(".gk_slider .swiper-slide").eq(0).click();
    function btnJudge() {
        if(_ind >= _len - 1) {
            $('.gk_slider .swiper-button-next').addClass("disabled")
            _ind = _len - 1;
        } else {
            $('.gk_slider .swiper-button-next').removeClass("disabled")
        }
        if(_ind <= 0) {
            $(".gk_slider .swiper-button-prev").addClass("disabled")
            _ind = 0;
        } else {
            $(".gk_slider .swiper-button-prev").removeClass("disabled")
        }
    }


  

    if($(window).width()<=767){
         if($(".gk_slider li").size()>1){            
            $(".gk_slider .but_pub").show();
            
         }
    }
    else if($(window).width()>1024){ 
         if($(".gk_slider li").size()>4){            
            $(".gk_slider .but_pub").show();
         }
    }
    else if(767<$(window).width()<=1024){ 
        if($(".gk_slider li").size()>3){            
            $(".gk_slider .but_pub").show();
         }
    }

}

function richslider(){
    // setTimeout(function () {
    //     $(".rich_tab li").eq(0).click();
    // }, 200);
    $(".rich_slider").eq(0).addClass("on");
    $(".rich_tab li").click(function(){
        $(this).addClass("on").siblings().removeClass("on");
        $(this).prev().addClass("none").siblings().removeClass("none");
        $(".rich_slider").eq($(this).index()).addClass("on").siblings().removeClass("on");
    

    })
    
    for(var i=0; i<$(".rich_slider").size(); i++){

        if($(window).width()>767){
            if($(".rich_slider").eq(i).find(" li").length>2){
                $(".rich_slider").eq(i).find(".but_pub").show()
            }
        }else{
            if($(".rich_slider").eq(i).find(" li").length>1){
                $(".rich_slider").eq(i).find(".but_pub").show()
            }
        }
        
        $(".rich_slider").eq(i).find(".swiper-container").addClass("swiper-container"+i)
        $(".rich_slider").eq(i).find(".swiper-button-prev").addClass("swiper-button-prev"+i)
        $(".rich_slider").eq(i).find(".swiper-button-next").addClass("swiper-button-next"+i)
        var brand3Swiper = new Swiper('.rich_slider .swiper-container'+i, {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 30,
            speed:1000,
            noSwiping : false,
            prevButton:'.rich_slider .swiper-button-prev'+i,
            nextButton:'.rich_slider .swiper-button-next'+i,
            breakpoints: {
                1440: {
                    spaceBetween:20,  
                },
                767: {
                    slidesPerView: 1,
                    spaceBetween:0,   
                }
            }
            
        })
    }

}

function indexAjax(str,url){
    if (url.indexOf('?') == -1) {
        url += '?tm=' + Math.random();
    } else {
       url += '&tm=' + Math.random();
    }

    $.ajax({
        url:url,
        success:function(msg){
            $(str).html("");
            $(str).append(msg);
            
            healthyLink();
            richslider();
            if($(window).width()>767){
                ScollText(".gk_in");
            }
            imgratio();

        }
    });
}

function richAjax(str,url){
    if (url.indexOf('?') == -1) {
        url += '?tm=' + Math.random();
    } else {
       url += '&tm=' + Math.random();
    }

    $.ajax({
        url:url,
        success:function(msg){
            $(str).html("");
            $(str).append(msg);
            richslider();
            imgratio();

        }
    });
}

function maod(){
    $(document).on("click", ".hea_btn span[link]", function() {
       
        var id = $(this).attr("link")
        var topH = 80;
        var headH = 80;
        var divH = $("#" + id).offset().top - topH - headH;
        if($(window).width()>1024){
            var divH = $("#" + id).offset().top - 140;
        }else{
            var divH = $("#" + id).offset().top - 110;
        }

        $('html,body').animate({
            scrollTop : divH
        }, 500);
    })
}
