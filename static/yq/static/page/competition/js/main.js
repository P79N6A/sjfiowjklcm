var codeImgUrl = "/mobi/validateImage.php"; // 验证码接口域名地址
var loginUrl = "/mobi/login.php"; // 登录地址
var checkLogin = "/user/ajaxGetSessionPersonalData.php"; // 检查登陆状态
var querySeasonInfo = "/youhui/querySeasonInfo.php"; // 排位赛期数及日期范围
var queryTableInfo = "/youhui/queryTableInfo.php"; // 排位赛的表格数据
var $rankid = 3
var $length;
var $loginName = 'test'
var $pageIndex = 1
var $tableListCount
$(function () {
  $(document).on('click', '.cycle', function () {
    console.log('fasdfasf')
    var rankId = $(this).attr("data-id")
    //   getTableInfo($rankId)
    // rankId = 7
    getTableInfo(rankId)
    $(".rankId").val(rankId)
  })
  Init();

  function Init() {
    // rankid = window.location.href.split('?')
    CheckLogin();
    getSeasonInfo();
  }

  function getSeasonInfo() {
    var postData = {
      rankId: $rankid
    }
    $.post(querySeasonInfo, postData, function (res, status) {
      if (res.code == "10000") {
        var temp = ""
        var options = ""
        for (let i = 0; i < res.data.timeGap.length; i++) {
          temp +=
            "<div class='cycle flex flex-align' data-id='" + res.data.timeGap[i].seasonNumber + "'>" +
            "<div class='tipsBox'> " +
            "<p class='cycleTitle'>" +
            res.data.timeGap[i].seasonName +
            "</p>" +
            "<p class='cycleTime'>" +
            res.data.timeGap[i].seasonGap +
            "</p>" +
            "</div>" +
            "</div>"
          options +=
            "<option value='" + i + "'>" + res.data.timeGap[i].seasonNumber + "</option>"
        }
        $('.goTime').html(temp)
        $('#select').html(options)
        $length = res.data.timeGap.length

      } else {
        alert(res.message)
      }
    })
  }

  function getTableInfo(val) {
    var postData = {
      rankId: val,
      loginName: $loginName,
      pageIndex: $pageIndex,
      pageSize: 10
    }
    $.post(queryTableInfo, postData, function (res, status) {
      if (res.code == "10000") {
        var temp = ""
        for (let i = 0; i < res.data.tableList.length; i++) {
          if (i == 0) {
            temp +=
              "<tr><td>" +
              res.data.tableList[i].index +
              "</td><td>" +
              res.data.tableList[i].loginname +
              "</td><td>" +
              res.data.tableList[i].amount +
              "</td><td rowspan='" + res.data.tableList.length + "'>" +
              res.data.calculateSeason +
              "</td></tr>"
          } else {
            temp +=
              "<tr><td>" +
              res.data.tableList[i].index +
              "</td><td>" +
              res.data.tableList[i].loginname +
              "</td><td>" +
              res.data.tableList[i].amount +
              "</td></tr>"
          }

        }
        $('.tbody ').html(temp)
        $('.totals').text(res.data.tableListCount)
        $('.pageindex').text($pageIndex)
        $tableListCount = res.data.tableListCount
      } else {
        alert(res.message)
      }
    })
  }
  // 登陆成功状态的操作
  function LoginSuccess() {
    // 读取存款额度配置
    isLogin = true;
  }
  // 用户登录
  function Login() {
    var postData = {
      account: $("#j-account").val(),
      password: $("#j-password").val(),
      imageCode: $("#j-imageCode").val()
    };
    // check
    if (!postData.account) {
      alert("请输入用户名");
      return;
    } else if (!postData.password) {
      alert("请输入登录密码");

      return;
    } else if (!postData.imageCode) {
      alert("请输入验证码");

      return;
    }

    $.post(loginUrl, postData, function (res, status) {
      if (res.code == "10000") {
        // 继续其他逻辑
        $(".login-box").animate({
          top: "-1800px",
          opacity: "0.5"
        });
        $(".to-login").fadeOut(800);
        CheckLogin();
      } else {
        //注册失败
        alert(res.message);

        $(".j-code-img").attr("src", codeImgUrl + "?v=" + new Date().getTime());
      }
    });
  }
  // 判断登陆状态
  function CheckLogin() {
    $.get(checkLogin, function (res, status) {
      if (res.code != "10000") {
        // 无登陆状态
        // $(".login-box").animate({
        //   opacity: "1",
        //   top: "0"
        // });
        $(".j-code-img").attr("src", codeImgUrl + "?v=" + new Date().getTime());
        // $(".to-login")
        //   .fadeIn(800)
        //   .animate({
        //     opacity: "1"
        //   });
      } else {
        // 有登陆状态
        LoginSuccess();
        // $(".j-loginname").text(res.data.loginname)
      }
    });
  }
  // 关闭登陆
  $(".j-close-login").click(function () {
    $(".login-box").animate({
      top: "-1800px",
      opacity: "0.5"
    });
    $(".to-login").fadeOut(800);
  });
  // 更新验证码事件
  $(".j-code-img").click(function () {
    // 更新验证码
    $(this).attr("src", codeImgUrl + "?v=" + new Date().getTime());
  });
  // 登录
  $(".j-post-login").click(function () {
    Login();
  });
  $(".ranking").click(function () {
    console.log('fas')
    $(".to-login")
      .fadeIn(800)
      .animate({
        opacity: "1"
      });
    $(".login-box").animate({
      top: "0",
      opacity: "1"
    });
  })
  $(".next").click(function () {
    if ($pageIndex == $tableListCount) {
      alert('无下一页')
    } else {
      $pageIndex++
      var rankId = $('.rankId').val()
      getTableInfo(rankId)
    }
  })
  $(".prev").click(function () {
    if ($pageIndex == 1) {
      alert('无上一页')
    } else {
      $pageIndex--
      var rankId = $('.rankId').val()
      getTableInfo(rankId)
    }
  })
  $("#select").change(function () {
    var rankId = $(this).children('option:selected').val()
    $('.rankId').val(rankId)
    getTableInfo(rankId)
  })
})
