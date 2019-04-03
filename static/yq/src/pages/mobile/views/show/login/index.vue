<template>
  <div class="login-box">
    <!-- <headern-nobackground :isBack='false'></headern-nobackground> -->
    <div class="login_logo">
      <img src="/static/images/base/logo-1.png" alt>
    </div>

    <form class="form-ui">
      <div class="menu">
        <span @click="type='phone'" :class="{active:type=='phone'}">手机登录</span>
        <span @click="type='account'" :class="{active:type=='account'}">账号登录</span>
      </div>
      <!-- 手机登录 -->
      <div class="box" v-show="type=='phone'">
        <div class="input-box">
          <div class="ui-input-row">
            <div class="iconbox">
              <i class="iconfont icon-dengluyonghuming"></i>
            </div>
            <input
              v-model="smsData.loginname"
              type="text"
              maxlength="11"
              class="ui-ipt"
              placeholder="请输入手机号码"
            >
          </div>
          <div class="ui-input-row">
            <div class="iconbox">
              <i class="iconfont icon-yanzhengma"></i>
            </div>
            <input
              ref="code"
              type="password"
              class="ui-ipt"
              v-model="smsData.imageCode"
              placeholder="请输入验证码或密码"
            >
            <eyes :dom="$refs.code" style="right:35%;"></eyes>
            <div v-if="timer" class="btn-sms">{{timer}}s</div>
            <div v-else @click="getSmsCode" class="btn-sms">获取验证码</div>
          </div>
        </div>
        <div class="loginBtnItem">
          <a href="javascript:void(0);" @click="loginSms" class="loginBtn">登&nbsp;&nbsp;录</a>
          <router-link class="loginBtn" :to="{name:'guideMenu'}">新手指南</router-link>
        </div>
      </div>
      <!-- 密码登录 -->
      <div class="box" v-show="type=='account'">
        <div class="input-box">
          <div class="ui-input-row">
            <div class="iconbox">
              <i class="iconfont icon-dengluyonghuming"></i>
            </div>
            <input type="text" class="ui-ipt" v-model="loginData.account" placeholder="请输入游戏账号">
          </div>
          <div class="ui-input-row">
            <div class="iconbox">
              <i class="iconfont icon-mima"></i>
            </div>
            <input
              ref="pwd"
              type="password"
              class="ui-ipt"
              v-model="loginData.password"
              placeholder="请输入游戏密码"
            >
            <eyes :dom="$refs.pwd"></eyes>
          </div>
          <div class="ui-input-row">
            <div class="iconbox">
              <i class="iconfont icon-yanzhengma"></i>
            </div>
            <input type="text" class="ui-ipt" v-model="loginData.imageCode" placeholder="请输入验证码">
            <div class="form-img">
              <img :src="validateImage" @click="GET_VALIDATE">
            </div>
          </div>
        </div>
        <div class="loginBtnItem">
          <a href="javascript:void(0);" @click="login" class="loginBtn">登&nbsp;&nbsp;录</a>
          <router-link class="loginBtn" :to="{name:'guideMenu'}">新手指南</router-link>
        </div>
      </div>
    </form>
    <div class="other-box cfx">
      <router-link :to="{name:'register'}" class="register-btn fl">立即注册</router-link>
      <router-link :to="{name:'getAccount'}" class="forget-btn fr">忘记密码？</router-link>
    </div>
  </div>
</template>
<script>
import headernNobackground from "mobile/components/head-nobackground";
import vChoose from "./components/choose";
import { AUTH_NAME } from "@/store/types"; //权限名称
import { loginControl } from "@/controls/auth/loginControl"; // 引入公共业务逻辑
import { mapGetters, mapActions, mapMutations } from "vuex";
import { getAuthImg } from "@/api/authService";

export default {
  mixins: [loginControl], // 混合
  data() {
    return {
      errMessage: "",
      type: "phone" // phone/account
    };
  },
  computed: {
    ...mapGetters(["validateImage"])
  },
  methods: {
    ...mapMutations(["GET_VALIDATE"]),
    login() {
      this.loginSubmit(this.loginData)
        .then(res => {
          if (res.success && res.data.role == "AGENT") {
            this.$router.push({ name: "agentcenter" });
          } else {
            this.$router.push({ name: "usercenter" });
          }
        })
        .catch(err => {
          // console.log(err)
          window.toast(err.message);
          this.errMessage = err.message;
        });
    },
    loginSms() {
      this.loginSubmitSms(this.smsData)
        .then(res => {
          // window.toast(res.message)
          if (res.success && res.data.role == "AGENT") {
            this.$router.push({ name: "agentcenter" });
          } else {
            this.$router.push({ name: "usercenter" });
          }
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    },
    getSmsCode() {
      this.getMessage()
        .then(res => {
          window.toast("获取验证码成功，请注意查收手机短信!");
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    }
  },
  components: {
    vChoose,
    headernNobackground
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #a8a8a8;
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  color: #a8a8a8;
}
input::-moz-placeholder,
textarea::-moz-placeholder {
  color: #a8a8a8;
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: #a8a8a8;
}
.login-box {
  // background: url(./images/login-bg1.png) no-repeat center center/100% 100%;
  background: #f0f2f5;
  min-height: calc(100vh - 1.06667rem - 1.33333rem);
  overflow: hidden;
  padding: r(15);

  .login_logo {
    text-align: center;
    img {
      margin: 15% 0;
      width: 45%;
    }
  }
  .form-ui {
    box-shadow: 0 0 8px 2px #cedff0;
    border-radius: 8px;
    overflow: hidden;
    .menu {
      text-align: center;
      display: flex;
      span {
        transition: all 0.3s;
        display: inline-block;
        padding: r(30);
        width: 50%;
        background: #eaeaea;
        @include f(34px);
        box-shadow: 0 0 8px 1px #ccc inset;
        &.active {
          background: #fff;
          color: #4db7f4;
          box-shadow: none;
        }
      }
    }
    .box {
      padding: r(25) r(10);
    }
    .ui-input-row {
      position: relative;
      line-height: 46px;
      height: 46px;
      background: #fff;
      border-radius: r(8);
      margin-bottom: 23px;
      display: flex;
      overflow: hidden;
      .iconbox {
        width: r(88);
        height: 100%;
        background: #4db7f4;
        text-align: center;
        .iconfont {
          color: #e6f3ff;
          @include f(48px);
        }
      }
    }
    .form-img {
      position: absolute;
      right: r(20);
      top: 50%;
      transform: translateY(-50%);
      overflow: hidden;
      width: 28%;
      height: 80%;
      img {
        width: 100%;
        height: 100%;
        border-radius: r(5);
        vertical-align: inherit;
      }
    }
    .btn-sms {
      width: 28%;
      position: absolute;
      right: 0.26667rem;
      top: 50%;
      transform: translateY(-50%);
      color: #eee;
      background: #4db7f4;
      border-radius: 5px;
      text-align: center;
      display: block;
      height: 36px;
      line-height: 36px;
      @include f(24px);
    }
    .input-box {
      // border-radius:10px;
      overflow: hidden;
    }
    .ui-ipt {
      display: block;
      font-size: 15px;
      color: #a8a8a8;
      line-height: normal;
      line-height: 41px;
      text-align: left;
      white-space: nowrap;
      border: 0;
      width: 90%;
      background: none;
      padding-left: r(20);
      &:focus {
        outline: none;
      }
    }
  }
  input {
    outline: none;
  }
  .login-btn {
    width: 100%;
    border-radius: r(8);
    text-align: center;
    height: r(80);
    line-height: r(80);
    color: #333333;
    letter-spacing: 4px;
    @include f(30px);
    background: #4db7f4;
  }
  .other-box {
    color: #333333;
    padding: r(30) 0;
    @include f(30px);
    .register-btn {
      text-align: left;
    }
    .forget-btn {
      text-align: right;
    }
  }
  .loginBtnItem {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .loginBtn {
      width: 45%;
      color: #eee;
      background: #4db7f4;
      border-radius: r(10);
      text-align: center;
      display: block;
      height: r(78);
      line-height: r(78);
      @include f(28px);
    }
  }
}
</style>
