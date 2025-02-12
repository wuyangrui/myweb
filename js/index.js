$(function(){
    index_01slide();
    
    //indexslider();
    banner();

    var viewSwiper = new Swiper('.view .swiper-container', {
        effect : 'fade',
        onSlideChangeStart: function() {
                updateNavPosition()
        }
    })
    
    $('.view .swiper-button-prev,.preview .swiper-button-prev').on('click', function(e) {
        e.preventDefault()
        if (viewSwiper.activeIndex == 0) {
            viewSwiper.slideTo(viewSwiper.slides.length - 1, 1000);
            return
        }
        viewSwiper.slidePrev()
    })
    $('.view .swiper-button-next,.preview .swiper-button-next').on('click', function(e) {
        e.preventDefault()
        if (viewSwiper.activeIndex == viewSwiper.slides.length - 1) {
            viewSwiper.slideTo(0, 1000);
            return
        }
        viewSwiper.slideNext()
    })
    
    var previewSwiper = new Swiper('.preview .swiper-container', {
        //visibilityFullFit: true,
        slidesPerView : 4,
        spaceBetween: 2,
        allowTouchMove: false,
        onTap: function() {
                viewSwiper.slideTo(previewSwiper.clickedIndex)
        },
        breakpoints: {
            1023:{
                slidesPerView : 3,
                spaceBetween: 0,
            },
            767:{
              slidesPerView : 1,
              spaceBetween: 0,
            }
        }
    })
    
    function updateNavPosition() {
            $('.preview .on').removeClass('on')
            var activeNav = $('.preview .swiper-slide').eq(viewSwiper.activeIndex).addClass('on')
            if (!activeNav.hasClass('swiper-slide-visible')) {
                if (activeNav.index() > previewSwiper.activeIndex) {
                    var thumbsPerNav = Math.floor(previewSwiper.width / activeNav.width()) - 1
                    previewSwiper.slideTo(activeNav.index() - thumbsPerNav)
                } else {
                    previewSwiper.slideTo(activeNav.index())
                }
            }
        }
    
})
/*
function indexslider(){
    var brand3Swiper = new Swiper('.index_slide_t .swiper-container', {
        effect : 'fade',
        autoplay : false,
        loop: true,
        pagination: '.index_slide_t .swiper-pagination',
        paginationClickable :true,
        autoplayDisableOnInteraction : false,
        prevButton:'.index_slide_t .swiper-button-prev',
        nextButton:'.index_slide_t .swiper-button-next',
        onInit: function(swiper){
            slide=swiper.slides.eq(0);
            slide.addClass('ani-slide');

        },
        onTransitionStart: function(swiper){
            for(i=0;i<swiper.slides.length;i++){
                slide=swiper.slides.eq(i);
                slide.removeClass('ani-slide');
            }

        },
        onSlideChangeEnd: function(swiper) {
            slide=swiper.slides.eq(swiper.activeIndex);
            slide.addClass('ani-slide');

            slide2=swiper.slides.eq(swiper.activeIndex).attr("data-swiper-slide-index");
            
            $(".index_slide_b li").eq(slide2).addClass("on").siblings().removeClass("on");
            
        }


    })

    
    $(".index_slide_b li").click(function () {
        var index=$(this).index()
        console.log(index)
        $(this).addClass("on").siblings().removeClass("on")
        brand3Swiper.slideTo(index+1)
    })

}
*/


function index_01slide(){
    var index_0Swiper = new Swiper('.index_img .swiper-container', {
        effect : 'fade',
        autoplay : false,
        loop: true,
        //pagination: '.index_img .swiper-pagination',
        //paginationClickable :true,
        autoplayDisableOnInteraction : false,
        //prevButton:'.index_img .swiper-button-prev',
        //nextButton:'.index_img .swiper-button-next',
        onInit: function(swiper){
            slide=swiper.slides.eq(0);
            slide.addClass('ani-slide');
        },
        onTransitionStart: function(swiper){
            for(i=0;i<swiper.slides.length;i++){
                slide=swiper.slides.eq(i);
                slide.removeClass('ani-slide');
            }
        },
        onSlideChangeEnd: function(swiper) {
            slide=swiper.slides.eq(swiper.activeIndex);
            slide.addClass('ani-slide');

            slide2=swiper.slides.eq(swiper.activeIndex).attr("data-swiper-slide-index");
            
            $(".index_slide_b li").eq(slide2).addClass("on").siblings().removeClass("on");
            
        }


    })
    $(".index_develop li").hover(function(){
        $(this).addClass("on").siblings().removeClass("on")
        //$(".index_img li").eq($(this).index()).show().siblings().hide();

        var index=$(this).index()
        //$(".index_img li").eq($(this).index()).addClass("on").siblings().removeClass("on");
        index_0Swiper.slideTo(index+1)
    })
}



function banner(){
    var swiperFlag = false;
    $(".banner li").eq(0).addClass("ani-slide");
    if($(".banner li").length>1){
        var mySwiper = new Swiper('.banner .swiper-container', {
            autoplay: 5000, 
            speed:1000,
            autoHeight: true,
            loop: true,
            noSwiping : false,
            prevButton:'.banner .swiper-button-prev',
            nextButton:'.banner .swiper-button-next',
            autoplayDisableOnInteraction : false,
            pagination: '.banner .swiper-pagination',
            paginationClickable :true,
            onInit: function(swiper){
                slide=swiper.slides.eq(0);
                slide.addClass('ani-slide');
                      
            },onTransitionStart: function(swiper){
                for(i=0;i<swiper.slides.length;i++){
                  slide=swiper.slides.eq(i);
                  slide.removeClass('ani-slide');
                }

            },
            onSlideChangeEnd: function(swiper) {
                slide=swiper.slides.eq(swiper.activeIndex);
                slide.addClass('ani-slide');
                
                var _this = $('.banner .swiper-slide').eq(swiper.activeIndex);
                if(!swiperFlag) {
                    swiperFlag = true;
                } else {
                    videoSelect(_this);
                }
            }
        })
    }else{
        $(".banner .swiper-pagination").hide();
        var mySwiper = new Swiper('.banner .swiper-container', {
            autoplay: false, 
            speed:1000,
            autoHeight: true,
            loop: false,
            prevButton:'.banner .swiper-button-prev',
            nextButton:'.banner .swiper-button-next',
            autoplayDisableOnInteraction : false,
            pagination: '.banner .swiper-pagination',
            paginationClickable :true,
            onInit: function(swiper){
                slide=swiper.slides.eq(0);
                slide.addClass('ani-slide');
                      
            },onTransitionStart: function(swiper){
                for(i=0;i<swiper.slides.length;i++){
                  slide=swiper.slides.eq(i);
                  slide.removeClass('ani-slide');
                }

            },
            onSlideChangeEnd: function(swiper) {
                slide=swiper.slides.eq(swiper.activeIndex);
                slide.addClass('ani-slide');
                
                var _this = $('.banner .swiper-slide').eq(swiper.activeIndex);
                if(!swiperFlag) {
                    swiperFlag = true;
                } else {
                    videoSelect02(_this);
                }
            }
        })
    }

    $(".banner .swiper-pagination-bullet").click(function(){
        // mySwiper.slideNext();
        mySwiper.startAutoplay();
    })
    
    if ($(window).width()>767) {
        if($(".banner li").length>1){
            videoSelect($('.banner .swiper-slide.swiper-slide-active'));
        }else{
            videoSelect02($('.banner .swiper-slide.swiper-slide-active'));
        }
        
    }else{
        
    }
    
    function videoSelect(_this) {
        var flag = true;
        var cc = _this.hasClass('ban_video');
        if(cc) {
            
            mySwiper.stopAutoplay();
            var videos =
                '<video src="' + _this.data('video') + '" autoplay="autoplay" muted class="vv" style="display:none;"></video>';
            _this.append(videos);
 
            var aaa = setInterval(function() {
                if(!isNaN($(".vv").get(0).duration) && flag) {
                    clearInterval(aaa);
                    flag = false;
                    setTimeout(function() {
                        _this.find('video').css("display", "block");
                    }, 500)
                }
            }, 10);
 
            _this.find('video').bind('ended', function() {
                mySwiper.slideNext();
                mySwiper.startAutoplay();
            });
        } else {
            $('.vv').remove();
        }
    }

    function videoSelect02(_this) {
        var flag = true;
        var cc = _this.hasClass('ban_video');
        if(cc) {
            
            mySwiper.stopAutoplay();
            var videos =
                '<video src="' + _this.data('video') + '" autoplay="autoplay" loop="loop" muted class="vv" style="display:none;"></video>';
            _this.append(videos);
 
            var aaa = setInterval(function() {
                if(!isNaN($(".vv").get(0).duration) && flag) {
                    clearInterval(aaa);
                    flag = false;
                    setTimeout(function() {
                        _this.find('video').css("display", "block");
                    }, 500)
                }
            }, 10);
 
            _this.find('video').bind('ended', function() {
                mySwiper.slideNext();
                mySwiper.startAutoplay();
            });
        } else {
            $('.vv').remove();
        }
    }


    if($(".banner li").length>1){
        $(".banner .but").show();
    }else{
        $(".banner .but").hide();
    }
}




