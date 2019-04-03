$(function(){
    $(document).on("click", ".grab-ticket", function(){
        getNewYearCoupon();
    });
});

function getNewYearCoupon(){

    var TEST_MODE = 0;

    if(TEST_MODE == 1){
        // var bgImg = '/qy-ydpm/images/redenvelopes/modal.png';
        // var jsonData = {"redCouponMoney":"123", "msg":"test"};
        // var data = jsonData;
        //
        // $("#modal-red .huodong-box").css('background','url('+bgImg+') no-repeat 0 0');
        // $('#modal-red .text1').text(data.redCouponMoney);
        // $('#modal-red').modal('show');
    } else {
        $.ajax({
            url: "/asp/isNewYearCoupon.php",
            type: "post",
            dataType: "json",
            cache: false,
            success: function(data) {
                if(!data || data == ""){
                    alert("请登录网站！");
                } else {
                    if (data.reach) {
                          // var bgImg = '/qy-ydpm/images/redenvelopes/modal.png';
                          // $('<img/>').attr('src', bgImg).load(function() {
                          //     $(this).remove();
                          //     $("#modal-red .huodong-box").css('background','url('+bgImg+') no-repeat 0 0');
                          //     $('#modal-red .text1').text(data.redCouponMoney);
                          //     $('#modal-red').modal('show');
                          // });
                        alert("领取成功!");
                        console.log(data.redCouponMoney);
                    } else {
                        alert(data.msg);
                    }
                }
            }
        });
    }

    // 顯示獲得多少錢
    // var msg = ajaxPost("/asp/newYearCoupon.php", "");
    // if (msg > 0){
    //     var bgImg = '/qy-ydpm/images/redenvelopes/modal.png';
    //     $('<img/>').attr('src', bgImg).load(function() {
    //         $(this).remove();
    //         $("#modal-red .huodong-box").css('background','url('+bgImg+') no-repeat 0 0');
    //         $('#modal-red .text1').text(msg);
    //         $('#modal-red').modal('show');
    //     });
    // } else{
    //     alert(msg);
    // }

}

