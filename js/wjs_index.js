$(function(){
    //工具提示的初始化
    $('[data-toggle="tooltip"]').tooltip();
    var isMoblie = true;
    function init() {
        $.ajax({
            type: 'get',
            url: './data/imgData.json',
            dataType: 'json',
            success: function(result){
                if($(window).width() >= 768){
                    isMoblie = false;
                }else{
                    isMoblie =true;
                }
                var html1 = template('bannerTemp', {'list':result,isMoblie:isMoblie});
                $('.carousel-inner').html(html1);
                var html2 = template('xiaoyuan', {'list':result})
                $('.carousel-indicators').html(html2);
            }
        });
    }
    init();
    $(window).on('resize', function(){
        var winW = $(this).width();
        // console.log(winW);
        if((isMoblie && winW < 768) || (!isMoblie && winW >= 768)){
            isMoblie = winW >= 768 ? false : true;
            init();
        }
    })

    $('.carousel').carousel({
        interval: 2000
      })

    var carousel_inner = $('.carousel-inner')[0];
    // console.log(carousel_inner)
    var strartX, lastX, chaX;
    carousel_inner.addEventListener('touchstart', function(e){
        strartX = e.targetTouches[0].clientX;
    });
    carousel_inner.addEventListener('touchend', function(e){
        lastX = e.changedTouches[0].clientX;
        chaX = lastX - strartX;
        if(chaX > 0){
            $('.carousel').carousel('prev')
        }else{
            $('.carousel').carousel('next')
        }
    });

    // 给ul标签宽度
    var allLi = $('.wjs_product .nav-tabs').find('li')
    var totalWidth = 0
    allLi.each(function(index,value){
        totalWidth += $(value).outerWidth()
        console.log($(value).outerWidth())
    })
    console.log(totalWidth)
    $('.wjs_product .nav-tabs').width(totalWidth+2)
    var myScroll =  new  IScroll('.wjs_parent',{
        scrollX: true,
        scrollY: false 
    })
});