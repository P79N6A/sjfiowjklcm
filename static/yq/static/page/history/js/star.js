/**
 * Created by Alexhu on 2017/12/14.
 */

(function () {
    chkGift();
    getTicketCount();
    audio();
    rightNav();
    toTop();
    secondTab();
    tab();
    starIntro();
    setTimeout("PlaySound()", 2000);
})();


//初始化明星介绍轮播
function starIntro() {

    $('.js-star-intro').click(function () {
        $('.slick').slick({
            dots: false,
            autoplay: true
        });
        $('.slick-next').trigger('click');
    });
}





//右侧导航
function rightNav() {

    $('.js-right-nav').on('click','li',function (e) {

        $('html,body').animate({scrollTop: '500px'},500);

        var type = $(e.target).parent().data('type');

        $('.js-act-tab>li').eq(type).trigger('click');
    });
}



//返回顶部

function toTop() {

    $('.js-toTop').click(function () {
        $('html,body').animate({scrollTop: '0'},500);
    });
}


//二级菜单
function secondTab() {

    $('.js-second-tab').on('click','li',function () {

        var num = $(this).parent().data('num');

        $(this).addClass('active').siblings('.active').removeClass('active');

        $('.js-second-content'+num+'>div').eq($(this).index()).show().siblings().hide();

    });
}



//一级菜单
function tab() {

    $('.js-act-tab').on('click','li',function () {

        $(this).addClass('active').siblings('.active').removeClass('active');

        $('.js-act-content').eq($(this).index()).show().siblings().hide();
    });
}

//是否可以领取判断
function chkGift() {

    $('#get-ticket').click(function () {

        if ($("#checkUserIsLoad").val()) {
            $.post("/asp/isExistSponsor.php", "", function(response){

                var jsonData = response;
                if (jsonData) {
                    $('#j-modal-gift').modal('show');
                } else {
                    alert("活动还没有开始，请查看优惠时间，感谢您的支持和理解！");
                }
            });
        } else {
            alert('请先登录！！');
        }
    });
}

// 领取人数显示
function getTicketCount(){
    $('.js-act-tab li').eq(1).click(function () {

        $.post("/asp/sponsorTicketCount.php", "", function(response){

            var text = response;
            text = text.toString();

            var length = text.length;
            var $target = $("#j-ticket-count ul li");

            if(length == 1){
                $target.eq(2).html(text);
            }
            if(length == 2){
                text = text.split("");
                $target.eq(1).html(text[0]);
                $target.eq(2).html(text[1]);
            }
            if(length == 3){
                text = text.split("");
                $target.eq(0).html(text[0]);
                $target.eq(1).html(text[1]);
                $target.eq(2).html(text[2]);
            }
        });
    });
}