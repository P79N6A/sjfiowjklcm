<template>
  <!-- 注册弹窗，写在这里 -->
  <div class="bg_content">
    <div class="wp">
      <div>
        <img src="./images/regbanner.jpg">
      </div>

      <div class="reg_step">
        <ul>
          <li class="active">
            <i>1</i>会员登录
          </li>
          <li>
            <i>2</i>注册申请
          </li>
          <li>
            <i>3</i>注册成功
          </li>
          <li>
            <i>4</i>忘记密码
          </li>
        </ul>
      </div>

      <div class="content inblock_fix">
        <div class="left_block inblock">
          <img src="./images/left_banner.png">
        </div>

        <div id="reg-form" class="right_block inblock">
          <div class="menu">
            <span @click="type='phone'" :class="{active:type=='phone'}">手机登录</span>
            <span @click="type='account'" :class="{active:type=='account'}">账号登录</span>
          </div>
          <div v-show="type=='phone'" class="box">
            <div class="right_row">
              <i data-v-6c7372a0 class="iconfont icon-shouji"></i>
              <input
                v-model="smsData.loginname"
                type="text"
                maxlength="11"
                class="input"
                placeholder="请输入手机号码"
              >
            </div>
            <div class="right_row">
              <i data-v-6c7372a0 class="iconfont icon-yanzhengma"></i>
              <input
                ref="code"
                type="password"
                id="regCode"
                class="input"
                v-model="smsData.imageCode"
                placeholder="请输入验证码或密码"
                maxlength="40"
                style="width:235px"
              >
              <eyes :dom="$refs.code"></eyes>
              <span v-if="timer" class="btn-sms">{{timer}}s</span>
              <span v-else @click="getSmsCode" class="btn-sms">获取验证码</span>
            </div>
          </div>
          <div v-show="type=='account'" class="box">
            <div class="right_row">
              <i data-v-6c7372a0 class="iconfont icon-shouji"></i>
              <input
                type="text"
                maxlength="10"
                v-model="loginData.account"
                placeholder="请输入游戏账号"
                id="loginnameRegister"
                class="input"
                required
              >
            </div>

            <div class="right_row">
              <i data-v-6c7372a0 class="iconfont icon-mima"></i>
              <input
                ref="pwd"
                type="password"
                id="passwordRegister"
                v-model="loginData.password"
                placeholder="请输入游戏密码"
                maxlength="16"
                class="input"
                required
              >
              <eyes :dom="$refs.pwd" style="left:300px;"></eyes>
            </div>

            <div class="right_row">
              <i data-v-6c7372a0 class="iconfont icon-yanzhengma"></i>
              <input
                type="text"
                id="regCode"
                class="input"
                v-model="loginData.imageCode"
                placeholder="请输入验证码"
                maxlength="4"
                style="width:235px"
              >
              <img
                :src="validateImage"
                @click="GET_VALIDATE"
                id="imgRegisterTryCode"
                style="width: 110px;height: 45px;"
              >
            </div>
          </div>

          <div class="reg_container">
            <span class="btn" @click="loginSms" v-show="type=='phone'">登陆</span>
            <span class="btn" @click="login" v-show="type=='account'">登陆</span>
            <a class="btn" href="/static/page/newTutorial/index.html">新手指南</a>
          </div>
          <div class="links">
            <router-link id="regBtn" :to="{name:'registerPage'}">快速注册账号</router-link>|
            <router-link class="forgetpwd" :to="{name:'accountQA'}">忘记密码?</router-link>
          </div>
        </div>
      </div>

      <!-- form end -->
    </div>
    <!-- wp end -->
  </div>
</template>
<script>
import check from "@/util/RegExp";
import { mapGetters, mapActions, mapMutations } from "vuex";
import eyes from "pc/components/eyes";

import { loginControl } from "@/controls/auth/loginControl"; // 引入公共业务逻辑

export default {
  mixins: [loginControl],
  data() {
    return {
      showError: false,
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
            this.$router.push({ name: "agent_setting" });
          } else {
            this.$router.push({ name: "user_setting" });
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
            this.$router.push({ name: "agent_setting" });
          } else {
            this.$router.push({ name: "user_setting" });
          }
        })
        .catch(err => {
          window.toast(err.message);
        });
    },
    getSmsCode() {
      this.getMessage()
        .then(res => {
          window.toast("获取验证码成功，请注意查收手机短信!");
        })
        .catch(err => {
          window.toast(err.message);
        });
    }
  },
  components: { eyes }
};
</script>
<style lang="scss" scoped>
.bg_content {
  position: relative;
  padding-bottom: 20px;
  background: #f1f1f1;
  margin: 0 auto;

  .wp {
    width: 1200px;
    margin: 0 auto;

    .reg_step {
      text-align: center;

      ul li {
        display: inline-block;
        margin-right: 30px;
        padding: 10px 0;
        font-weight: bold;
        color: black;
        text-align: center;
        margin-left: -7px;
        font-size: 14px;
        border-bottom: 2px solid transparent;

        &.active {
          border-bottom: 2px solid red;
        }

        i {
          display: inline-block;
          width: 20px;
          height: 20px;
          line-height: 18px;
          margin-right: 5px;
          text-align: center;
          border: 1px solid #939393;
          font-size: 16px;
          color: #939393;
        }
      }
    }

    .content {
      padding: 52px 0 60px;
      background: #fff;
      text-align: center;

      .left_block {
        width: 42%;
        height: 100%;
      }

      .right_block {
        width: 540px;
        min-height: 400px;
        border: solid 10px #cccccc;
        border-radius: 6px;
        margin-top: 10px;
        .menu {
          text-align: center;
          display: flex;
          span {
            transition: all 0.3s;
            display: inline-block;
            width: 50%;
            padding: 20px 0;
            background: #eaeaea;
            font-size: 20px;
            box-shadow: 0 0 8px 1px #ccc inset;
            cursor: pointer;
            &.active {
              background: #fff;
              color: #ff0000;
              box-shadow: none;
            }
          }
        }
        .box {
          width: 350px;
          margin: 0 auto;
          padding-top: 40px;
        }
        .links {
          text-align: center;
          color: #006fb2;
          font-size: 14px;
          margin: 70px 0 40px;
          a {
            margin: 0 5px;
          }
        }
        .reg_container {
          text-align: center;
          width: 350px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          margin-top: 60px;
          .btn {
            display: inline-block;
            width: 45%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: #fff;
            background: #4db7f4;
            border-radius: 6px;
            cursor: pointer;
            font-size: 18px;
          }
        }

        input {
          width: 100%;
          height: 30px;
        }

        .left_row {
          width: 120px;
          padding-right: 10px;
          float: left;
          line-height: 30px;
          text-align: right;
        }

        .right_row {
          width: 350px;
          margin-bottom: 20px;
          position: relative;
          text-align: left;
          .iconfont {
            font-size: 28px;
            color: #797979;
            position: absolute;
            top: 0;
            left: 0;
            height: 45px;
            line-height: 45px;
            width: 45px;
            text-align: center;
          }
          .pubeyes {
            position: absolute;
            top: 0;
            left: 190px;
            font-size: 24px;
            cursor: pointer;
            height: 100% !important;
            color: #f66;
          }
          .input {
            border: solid 1px #eee;
            outline: 0;
            height: 45px;
            line-height: 45px;
            padding-left: 50px;
          }

          > div {
            margin-top: 7px;
            font-size: 12px;
            color: #787876;
          }

          &.email-right {
            .emailist {
              border: 1px solid #bdbdbd;
              border-radius: 4px;
              background-color: #fff;
              color: #666;
              font-size: 14px;
              list-style-type: none;
              padding: 0;
              margin: 0;
              overflow: hidden;

              li {
                padding: 2px 11px;
                cursor: pointer;
              }

              .on,
              li:hover {
                background-color: #eee;
              }
            }
          }
          .btn-sms {
            position: absolute;
            top: 0;
            right: 0;
            width: 100px;
            text-align: center;
            height: 45px;
            line-height: 45px;
            border: solid 1px #4db7f4;
            border-radius: 6px;
            color: #4db7f4;
            cursor: pointer;
          }
        }
      }
    }
    .clear {
      zoom: 1;
      clear: none !important;
    }

    .clear:after {
      content: "";
      display: block;
      clear: both;
    }

    .fl {
      float: left !important;
    }

    .require:before {
      width: 2px;
      height: auto;
      display: inline-block;
      margin-right: 7px;
      content: "*";
      color: red;
      content: "*";
    }

    .inblock_fix {
      letter-spacing: -4px;
      font-size: 0;
    }

    .inblock {
      display: inline-block;
      vertical-align: top;
      font-size: 14px;
      letter-spacing: normal;
      *vertical-align: top;
      zoom: 1;
      *display: inline;
    }
  }
}
</style>
