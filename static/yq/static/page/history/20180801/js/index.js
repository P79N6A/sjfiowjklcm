/**
 * Created by 1040170 on 2018/6/14.
 */

$(function () {

    changeTab();
    setTeamList();
    closeModal();
    $('.js-prize-btn').trigger('click');

});

function closeModal() {

    $('.js-myclose-btn').click(function () {

        if(!$('#j-isLogin').val()){

            $('#mymodal').fadeOut();

            // $(this).addClass('clickable').attr("data-load-remote","/tpl/modal/login.jsp");
        }else{
            $('#mymodal').fadeOut();
        }

    });
}
//
function queryGuild() {
    $.post('/asp/queryGuild.php',{"sid": 1},function (data) {

        var guildList = data.guildList;
        var teamHtml ="";
        var personHtml = '<option value="">选战队</option>';

        if (guildList.length > 0) {

            for (var i = 0; i < guildList.length; i++) {

                var guildName = guildList[i].name;

                teamHtml +=  "<li data-id="+guildList[i].id+" class='list'>"+guildName+"</li>";

                personHtml += '<option value='+guildList[i].id+'>'+guildList[i].name+'</option>';
            }

        }
        $('.js-team-items').html(teamHtml);


        $('.js-team-list').html(personHtml);


    })
}

//战队排行
function queryGuildRanking(val) {
    $.post("/asp/queryGuildRanking.php", {"sid": 1},function (data) {

        var listHtml1 ="";
        var dataList = data.length >0 ?data:[];

        if(dataList.length>0){
            var num = dataList.length;
            var pageCount = Math.ceil(dataList.length/10);


            var  prePage = val > 1 ? (parseFloat(val)-1):1;

            var  nextPage = val < pageCount ? (parseFloat(val)+1):pageCount;

            var pageNumHtml = "";

            // for(j=0;j<pageCount;j++){
            //     pageNumHtml += '<option value="'+(j+1)+'">'+(j+1)+'</option>'
            // }

            var countHtml = '共'+num+'条,每页10条,当前'+val+'/'+pageCount+' <span onclick="gopage1(1)">首页</span> <span onclick="gopage1('+ prePage+')">上一页</span> <span onclick="gopage1('+ nextPage+')">下一页</span><span onclick="gopage1('+pageCount+')">末页</span>  ';
                // '到第<select class="js-guild-ranking"  onchange="changePage()">'+pageNumHtml+'</select>页';

            var length = 10*val > num ? num:10*val;

            for(var i = 10*(val-1);i< length;i++){
                // var day = dataList[i].day;
                // if (!day || day == "" || day == "undefined" || typeof day == "undefined") {
                //     day = "";
                // }

                listHtml1 += '<tr>' +
                    '<td>'+dataList[i].name+'</td>' +
                    '<td>'+dataList[i].game +'</td>' +
                    '<td>'+(i+1)+'</td>' +
                    '<td>'+dataList[i].day +'</td>' +
                    '</tr>';
            }

            var head = '<tr><th>战队名称</th><th>投注额度</th> <th>排行榜</th> <th>更新时间</th></tr>';

            $('.js-team-ranklist').html(listHtml1);
            $('.js-team-head').html(head );

            $('.pagination-cont').html(countHtml);


        }else{
            $('.js-team-ranklist').html("暂无数据");
        }

    })
}

//个人排行
function queryGuildDate(val) {

    var selectVal = $('.js-team-list').find('option:selected').val();

    if(selectVal != ""){
        var data ={
            "guildId": selectVal,
            "sid": 1,
            "pageIndex":val,
            "size":10
        };

        $.post("/asp/queryGuildDate.php",data,function (data) {
            var listHtml1 ="";
            var dataList = data.pageContents?data.pageContents:0;

            if(dataList.length>0){
                for(var i=0;i<dataList.length;i++){
                    var day = dataList[i].day;
                    if (!day || day == "" || day == "undefined" || typeof day == "undefined") {
                        day = "";
                    }
                    listHtml1 += '<tr>' +
                                    '<td>'+dataList[i].username+'</td>' +
                                    '<td>'+dataList[i].gameAmount +'</td>' +
                                    '<td>'+(i+1)+'</td>' +
                                    '<td>'+day +'</td>' +
                               '</tr>';
                }

                var head = '<tr><th>会员账号</th> <th>投注额度</th> <th>排行榜</th> <th>更新时间</th></tr>';
                $('.js-personal-rank').html(listHtml1);
                $('.js-person-head').html(head);

                $('.pagination-cont1').html(data.jsPageCode);

            }else{
                $('.js-personal-rank').html("暂无数据");
            }

        })
    }
}

//战队展示
function setTeamList() {
    if ($("#j-isLogin").val() != "") {
        queryGuild();
    }else{
        $('.js-teams').html('请先登录！')
    }

}

//显示报名区域及加入战队
function changeTab() {

    $('.js-prize-btn').click(function () {
        if($("#j-isLogin").val() != ""){
            $('body,html').animate({scrollTop:900},1000);
            $('.js-teams').show();
            $('.js-ranklist-cont').hide();
        }else{
            $('#mymodal').fadeIn();
            $('.js-modal-body').html('请先登录！');
        }
    });

    $('.js-team-items').on("click",".list",function (e) {

        var teamId = $(e.target).data('id');

        $(this).addClass('active').siblings('.active').removeClass('active');

        $.post("/asp/joinGuild.php", {"guildId": teamId},function (data) {

            $('#mymodal').fadeIn();
            $('.js-modal-body').html(data);
        })
    });



    $('.js-act-item').on('click','li',function () {
        var index = $(this).index();

        $('.js-ranklist-cont').show();
        $(this).addClass('active').siblings('.active').removeClass('active');

        $('.js-ranklist-cont>div').eq(index).show().siblings().hide();

        $('.js-teams').hide();

        if(index == "1"){
            if($("#j-isLogin").val() != ""){

                $('.js-tip-new').hide();
                $('.js-require-container1').show();

                queryGuildRanking("1");

            }else{
                $('.js-tip-new').show();
                $('.js-require-container1').hide();
            }

        }else if(index =="2"){
            if($("#j-isLogin").val() != ""){

                $('.js-require-container2').hide();
                $('.js-tip-new2').show().html('暂无数据，请先选择战队！');

                queryGuild();

                $('.js-team-list').change(function () {
                    queryGuildDate("1");

                    $('.js-require-container2').show();
                    $('.js-tip-new2').hide();
                });

            }else{

                $('.js-require-container2').hide();
                $('.js-tip-new2').show();
            }
        }

    });
}


//个人切换页面
function gopage(val) {
    queryGuildDate(val);
}

//团队切换页面
function gopage1(val) {
    queryGuildRanking(val);
}

