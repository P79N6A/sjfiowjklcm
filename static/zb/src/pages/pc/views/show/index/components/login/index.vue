<template>
  <div class="login-box" v-if="!islogin">
    <!-- 登录弹窗，写在这里 -->
    <div class="top-login-block pre-login ng-hide">
      <div class="row" style="margin-left: 0rem;margin-right: 0rem">
        <div class="col s12">
          <div id="accountLogin" class="active">
            <div class="preLogin-account-item">
              <div class="input-field col s12 account-input-field">
                <i class="iconay ay-denglu2"></i>
                <input
                  type="text"
                  v-model="loginData.account"
                  tabindex="1"
                  class="ng-pristine ng-valid ng-empty ng-touched input"
                >
              </div>
              <div class="input-field col s12">
                <i class="iconay ay-mima3"></i>
                <input
                  type="password"
                  v-model="loginData.password"
                  tabindex="2"
                  class="ng-pristine ng-valid ng-empty ng-touched input"
                >
                <input
                  type="button"
                  class="btn-findPwd"
                  @click="showLogin = false;$bus.$emit('showForget',true)"
                  value="忘记密码?"
                >
              </div>
              <!-- </div> -->
              <div class="">
                <div class="input-field col s7">
                  <i class="iconay ay-yanzhengma2"></i>
                  <input
                    type="text"
                    v-model="loginData.imageCode"
                    class="verifyCode ng-pristine ng-valid ng-empty ng-valid-maxlength ng-touched input"
                    maxlength="4"
                    tabindex="3"
                    placeholder="验证码"
                  >
                </div>
                <div class="input-field col s5 image-input-field" style="margin-top: 8px;">
                  <a href="javascript:void(0)" @click="GET_VALIDATE" class="imgcode">
                    <img class="verifyImg" :src="validateImage">
                    <span>看不清楚？换张图片</span>
                  </a>
                </div>
              </div>
              <div class="checBbox">
                <el-checkbox v-model="isRemember" style="color:#eee;">记住密码</el-checkbox>
              </div>
              <div class="">
                <div class="input-field col s12 button-input-field">
                  <input type="submit" class="btn-submit" @click="login();" value="立即登录" tabindex="5">
                  <!-- <input type="submit" class="btn-register" @click="$bus.$emit('showRegister', true)" value="注册" tabindex="6"> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { loginControl } from "@/controls/auth/loginControl"; // 引入公共业务逻辑
import eyes from "pc/components/eyes";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { SETTING } from "@/assets/data";
import { $localStorage } from "@/util/storage";
export default {
  mixins: [loginControl], // 混合
  data() {
    return {
      SETTING,
      loginData: {
        account: "",
        password: "",
        imageCode: ""
      }
    };
  },
  computed: {
    ...mapGetters(["validateImage", "islogin"])
  },
  methods: {
    ...mapMutations(["GET_VALIDATE"]),
    login() {
      this.loginSubmit(this.loginData)
        .then(res => {
          if (this.isRemember) {
            // 是否要记住登录密码
            let enpwd = this.str_encrypt(this.loginData.password);
            $localStorage.set("isRememberPwd", enpwd);
          } else {
            $localStorage.remove("isRememberPwd");
          }
          window.toast(res.message,'success');
        })
        .catch(err => {
          console.log(err.message);
          window.toast(err.message);
        });
    },
    str_encrypt(str) {
      var c = String.fromCharCode(str.charCodeAt(0) + str.length);

      for (var i = 1; i < str.length; i++) {
        c += String.fromCharCode(str.charCodeAt(i) + str.charCodeAt(i - 1));
      }

      return encodeURIComponent(c);
    },
    str_decrypt(str) {
      str = decodeURIComponent(str);
      var c = String.fromCharCode(str.charCodeAt(0) - str.length);

      for (var i = 1; i < str.length; i++) {
        c += String.fromCharCode(str.charCodeAt(i) - c.charCodeAt(i - 1));
      }
      return c;
    }
  },
  created() {
    if ($localStorage.get("isRememberPwd")) {
      this.isRemember = true;
      let depwd = this.str_decrypt($localStorage.get("isRememberPwd"));
      this.loginData.password = depwd;
    }
  },
  components: {
    eyes
  }
};
</script>
<style lang="scss" scoped>
input::-webkit-input-placeholder {
  color: #888;
}
input:-moz-placeholder {
  color: #888;
}
input::-moz-placeholder {
  color: #888;
}
input:-ms-input-placeholder {
  color: #888;
}
.login-box {
  width: 83vw;
  height: 484px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9;
  .pre-login {
    width: 362px;
    height: 381px;
    background: url(./images/login_bg.png) no-repeat;
    z-index: 1000;
    margin-top: 103px;
    transition: all 0.2s linear;
    .input {
      background-color: #fbfafa;
      border-radius: 5px;
      outline: none;
      height: 35px;
      width: 88%;
      font-size: 1rem;
      padding: 0;
      -webkit-box-shadow: none;
      box-shadow: none;
      -webkit-box-sizing: content-box;
      box-sizing: content-box;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
      color: #000;
      padding-left: 34px;
    }
    .input-field {
      margin-top: 15px;
      i{
        position: absolute;
        left: 20px;
        top: 7px;
      }
    }
    .imgcode {
      display: block;
      height: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    input {
      margin: 0;
    }

    .preLogin-account-item {
      margin: 98px 12px 0 10px;

      a,
      span {
        color: #ffeb00;
      }

      .checkbox-item {
        float: left;

        span {
          color: #fff;
          vertical-align: middle;
        }

        img {
          vertical-align: middle;
        }
      }

      .image-input-field {
        img {
          width: 100%;
        }

        span {
          font-size: 12px;
          // margin-right: 6px;
          text-align: right;
          float: right;
        }
      }
      .btn-findPwd {
        outline: none;
        position: absolute;
        top: 50%;
        right: 30px;
        transform: translateY(-50%);
        text-align: center;
        width: 80px;
        height: 25px;
        display: inline-block;
        color: #000;
      }
    }

    .button-input-field {
      text-align: center;
    }
    .btn-register {
      outline: none;
      text-align: center;
      width: 48%;
      height: 36px;
      color: #fff;
      border: none;
      background: url(./images/button.png) no-repeat center/100% 100%;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    .btn-submit {
      outline: none;
      text-align: center;
      width: 48%;
      height: 36px;
      color: #44cbf6;
      border: 1px solid #44cbf6;
      border-radius: 5px;
      font-size: 18px;
      &:hover {
        // background: url(../assets/images/preLogin/button_01.png) no-repeat;
        // background-size: 351px 45px;
        opacity: 0.8;
      }
    }
    .checBbox {
      margin: 0 0 0px 17px;
    }
  }
}
 @media (max-width: 1470px) {
   .login-box{
     width: 1050px;
  }
}
@media (max-width: 1280px) {
   .login-box{
     width: 900px;
  }
}
</style>
