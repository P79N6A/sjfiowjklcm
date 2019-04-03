function getValidateCode() {
    return ajaxPost("/asp/generateVerificationCode.php?r=" + Math.random());
}



//玩家登陆
function login() {
    var str = "";
    var loginname = $("#loginname").val();
    if (str == "" && (loginname == "" || loginname == "帐　号")) {
        str = "账号不能为空！";
    }
    var password = $("#password").val();
    if (str == "" && (password == "" || password == "密　码")) {
        str = "密码不能为空！";
    }

    // var code = $("#code").val();
    // if (str == "" && (code == "" || code == "验证码")) {
    //     str = "验证码不能为空！";
    // }

    if (str != "") {
        alert(str);
    }else {
        openProgressBar();

        //验证码获取
        var code = getValidateCode();

        var returnedData = ajaxPost("/asp/login.php", {
            "loginname": loginname,
            "password": password,
            "imageCode": code
        });

        if (returnedData == "SUCCESS") {
            closeProgressBar();
            sessionStorage.setItem('loginstate', true);
            window.location.reload(true);

        } else {
            closeProgressBar();
            alert(returnedData);
            getValidateCode();
            var str2 = '已被锁';
            if (returnedData.indexOf(str2) > -1) {
                // 开启忘记密码弹窗
                $('#forgetpasswordModal').modal('show');
                $('#forgetpasswordModal .modal-content').load("/tpl/modal/forgetpassword.jsp");
            }
        }
    }
}


//enter键登陆
document.onkeydown=keyDownSearch;
function keyDownSearch(e) {

    var theEvent = e || window.event;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
        if(document.activeElement.id == "pwdLogin") {

            $('.live-login-layer .layui-layer-btn0').click();
        }else{
            $("#loginBtn").click();
        }

        return false;
    }
    return true;
}

//退出系统
function logout() {
    openProgressBar();
    $.post("/asp/logout.php", {}, function (returnedData, status) {
        if ("success" == status) {
            delCookie();
            window.location.href = "/";
        } else {
            alert("登出失败");
        }
    }).fail(function () {
        window.location.href = "/";
    });
}
