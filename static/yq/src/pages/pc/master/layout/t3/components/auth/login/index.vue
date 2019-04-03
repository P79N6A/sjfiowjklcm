<template>
  <!-- <div class="modal fade in" v-if="showLogin"> -->
    <!-- 登录弹窗，写在这里 -->
    <div class="right top-login-block pre-login ng-hide" v-if="showLogin" aria-hidden="true">
      <div class="triangle"></div>
      <a href="javascript:void(0)" class="modal-close close-btn" @click="showLogin = false;">
        <img src="./images/close.png">
      </a>
      <div class="row" style="margin-left: 0rem;margin-right: 0rem">
        <div class="col s12">
          <div id="accountLogin" v-show="loginType == 2" aria-hidden="false" class="active">
            <!-- <form class="ng-pristine ng-valid ng-valid-maxlength"> -->
              <div class="preLogin-account-item">
                <div class="row">
                  <div class="input-field col s12 account-input-field">
                    <input type="text" v-model="loginData.account" tabindex="1" class="ng-pristine ng-valid ng-empty ng-touched input"
                      aria-invalid="false" placeholder="用户名(6-10位数字和字母)" style="">
                    <img v-show="isAccountError" src="./images/rd.png"
                      aria-hidden="true" class="ng-hide">
                    <span v-show="isAccountError" class="error ng-hide" aria-hidden="true">&nbsp;您输入的账号错误</span>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input type="password" v-model="loginData.password" tabindex="2" class="ng-pristine ng-valid ng-empty ng-touched input"
                      aria-invalid="false" style="" placeholder="密   码(6-16位数字或字母）">
                    <img v-show="isPasswordError" src="./images/rd.png"
                      aria-hidden="true" class="ng-hide">
                    <input type="button" class="btn-findPwd" @click="showLogin = false;$bus.$emit('showForget',true)" value="找回密码">
                    <span v-show="isPasswordError" class="error ng-hide" aria-hidden="true">&nbsp;您输入的密码错误</span>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s7">
                    <input type="text" v-model="loginData.imageCode" class="verifyCode ng-pristine ng-valid ng-empty ng-valid-maxlength ng-touched input"
                      maxlength="4" tabindex="3" aria-invalid="false" style="" placeholder="验证码">
                    <img v-show="isVerifyCodeError" src="./images/rd.png"
                      aria-hidden="true" class="ng-hide">
                    <span v-show="isVerifyCodeError" class="error ng-hide" aria-hidden="true">&nbsp;您输入的验证码错误</span>
                  </div>
                  <div class="input-field col s5 image-input-field">
                    <a href="javascript:void(0)" @click="GET_VALIDATE">
                      <img class="verifyImg" :src="validateImage">
                      <span>看不清楚？换张图片</span>
                    </a>
                  </div>
                </div>
                <div class="row">
                  <el-checkbox v-model="isRemember">记住密码</el-checkbox>
                </div>
                <div class="row">
                  <div class="input-field col s12 button-input-field">
                    <input type="submit" class="btn-submit" @click="login();" value="登录" tabindex="5">
                  </div>
                </div>
              </div>
            <!-- </form> -->
          </div>
        </div>
      </div>
    </div>
  <!-- </div> -->
  <!-- </div> -->
</template>
<script>
  import {
    loginControl
  } from "@/controls/auth/loginControl"; // 引入公共业务逻辑
  import eyes from "pc/components/eyes"
  import {
    mapGetters,
    mapActions,
    mapMutations
  } from 'vuex'
  import {
    SETTING
  } from '@/assets/data'
  import {
  $localStorage
} from '@/util/storage'
  export default {
    mixins: [loginControl], // 混合
    data() {
      return {
        SETTING,
        showLogin: false,
        loginType:2,
        loginData:{
          account: '',
          password: '',
          imageCode: ''
        },
        isVerifyCodeError:false,
        isPasswordError:false,
        isAccountError:false
      }
    },
    computed: {
      ...mapGetters(['validateImage', 'islogin'])
    },
    methods: {
      ...mapMutations(['GET_VALIDATE']),
      login() {
        this.loginSubmit(this.loginData).then(res => {
          this.showLogin = false
          if (this.isRemember) {
            // 是否要记住登录密码
            let enpwd = this.str_encrypt(this.loginData.password)
            $localStorage.set('isRememberPwd', enpwd)
          } else {
            $localStorage.remove('isRememberPwd')
          }
          window.toast(res.message)
        }).catch(err => {
          console.log(err)
          window.toast(err)
        })
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
      this.$bus.$on('showLogin', eventData => {
        this.showLogin = eventData
      })
      if ($localStorage.get('isRememberPwd')) {
        this.isRemember = true
        let depwd = this.str_decrypt($localStorage.get('isRememberPwd'))
        this.loginData.password = depwd
      }
    },
    components: {
      eyes
    }
  };

</script>
<style lang="scss" scoped>
.pre-login {
      box-shadow: 1px 4px 80px 12px #5e5a5a;
      height: 455px;
      width: 400px;
      margin: 37px 0 0;
      // margin-left: 997px;
      top: 0;
      right: 0;
      transform: translateX(11%);
      background: url(./images/bg.png) no-repeat;
      background-size: 100%;
      position: absolute;
      z-index: 1000;
      border: 1px solid #efefef;
      border-radius: 6px;
      border-radius: 15px 15px 15px 15px;
      transition: all .2s linear;
      .input{
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #9e9e9e;
        border-radius: 0;
        outline: none;
        height: 3rem;
        width: 100%;
        font-size: 1rem;
        margin: 0 0 20px;
        padding: 0;
        -webkit-box-shadow: none;
        box-shadow: none;
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
        -webkit-transition: all .3s;
        transition: all .3s;
      }
      .triangle {
        position: relative;
        &:before {
          top: -11px;
          border-bottom: 10px solid #efefef;
        }
        &:after, &:before {
          position: absolute;
          content: "";
          left: 258px;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
        }
        &:after {
          top: -9px;
          border-bottom: 10px solid #fff;
        }
      }
      label {
        margin-top: -1px;
        margin-left: 1rem !important;
      }
      ul {
        box-shadow: inset 0 -2px 0 #66b3ff;
      }
      .input-field {
        margin-top: 6px;
      }
      input {
        margin: 0;
      }
      .active-right-li {
        right: -1px;
        left: 174px;
        color: #66b3ff;
      }
      .active-left-li {
        left: 0;
        right: 189px;
        color: #66b3ff;
      }
      .tabs {
        background: transparent;
        .tab a {
          font-size: 16px;
          color: #b7b7b7;
          position: relative;
          &.active, &:hover {
            color: #66b3ff;
          }
          &:after {
            content: "";
            display: block;
            width: 100%;
            height: 2px;
            position: absolute;
            background: #b7b7b7;
            bottom: 0;
            left: 0;
          }
        }
        .indicator {
          background: #66b3ff;
        }
      }
      .close-btn {
        float: right;
        position: relative;
        right: 5px;
        top: 6px;
        img {
          width: 20px;
          height: 20px;
          &:hover {
            -webkit-animation-name: rotateIn;
            animation-name: rotateIn;
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
          }
        }
      }
      .preLogin-qrcode-item {
        text-align: center;
        .qrcode {
          padding-right: 0;
          margin-left: auto;
          margin-right: auto;
          display: block;
          // width: 150px;
        }
        span {
          color: #787878;
        }
      }
      .preLogin-account-item {
        margin: 13px;
        a, span {
          color: #d9006c;
        }
        .checkbox-item {
          float: left;
          span {
            color: #9e9e9e;
            vertical-align: middle;
          }
          img {
            vertical-align: middle;
          }
        }
        .image-input-field {
          img {
            float: right;
            width: 120px;
            text-align: right;
          }
          span {
            font-size: 12px;
            margin-right: 6px;
            text-align: right;
            float: right;
          }
        }
        .error {
          position: relative;
          color: red;
          text-align: left;
        }
        .btn-findPwd {
          outline: none;
          top: 6px;
          right: 30px;
          position: absolute;
          text-align: center;
          width: 80px;
          height: 25px;
          display: inline-block;
          color: #d9006c;
          border: none;
          background: url(./images/for.png) no-repeat;
          background-size: 80px 25px;
          &:hover {
            // background: url(../assets/images/preLogin/for_02.png) no-repeat;
            // background-size: 80px 25px;
            opacity: .7;
            color: #000;
          }
        }
      }
      .btn-submit {
        outline: none;
        text-align: center;
        width: 351px;
        height: 45px;
        color: #fff;
        border: none;
        background: url(./images/button.png) no-repeat;
        background-size: 351px 45px;
        &:hover {
          // background: url(../assets/images/preLogin/button_01.png) no-repeat;
          // background-size: 351px 45px;
          opacity: .7;
        }
      }
    }
</style>
