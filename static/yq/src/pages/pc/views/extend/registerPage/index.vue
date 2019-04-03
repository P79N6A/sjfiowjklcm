<template>
  <!-- 注册弹窗，写在这里 -->
  <div class="bg_content">
    <div class="wp">
      <div>
        <img src="./images/regbanner.jpg">
      </div>

      <div class="reg_step">
        <ul>
          <li>
            <i>1</i>会员登录
          </li>
          <li class="active">
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
          <div class="clear">
            <div class="left_row require">用户名:</div>
            <div class="right_row">
              <input
                type="text"
                maxlength="10"
                v-model="registerForm.account"
                id="loginnameRegister"
                class="input"
                required
              >
              <div>6-10位数字或字母</div>
            </div>
          </div>

          <div class="clear">
            <div class="left_row require">游戏密码:</div>
            <div class="right_row">
              <input
                type="password"
                id="passwordRegister"
                v-model="registerForm.password"
                maxlength="16"
                class="input"
                required
              >
              <eyes :dom="$refs.pwd"></eyes>
              <div>6-16个字母和数字的组合</div>
            </div>
          </div>

          <!-- <div class="clear">
            <div class="left_row require">确认密码:</div>
            <div class="right_row">
              <input type="password" id="confirmPasswordRegister" v-model="registerForm.confirmPassword" maxlength="16"
                class="input" required="">
              <div>请重复您的密码</div>
            </div>
          </div>-->
          <div class="clear">
            <div class="clear fl">
              <div class="left_row require">注册电话:</div>
              <div class="right_row">
                <input
                  type="text"
                  id="phoneRegister"
                  class="input"
                  v-model="registerForm.phone"
                  data-rule-digits="true"
                  maxlength="11"
                  required
                >
                <div>取款唯一凭证，请正确填写手机号</div>
              </div>
            </div>
          </div>

          <!-- <div class="clear two_items">
            <div class="clear fl">
              <div class="left_row require">注册邮箱:</div>
              <div class="right_row email-right">
                <ul class="emailist" style="position: absolute; margin-top: 30px; min-width: 512px; visibility: hidden; z-index: 11;"></ul><input
                  type="email" id="emailRegister" v-model="registerForm.email" class="input inputMailList" name="email"
                  required="" autocomplete="off" maxlength="30">
              </div>
            </div>
          </div>


          <div class="clear">
            <div class="clear fl">
              <div class="left_row">联系QQ:</div>
              <div class="right_row">
                <input type="text" class="input" v-model="registerForm.qq" data-rule-digits="true" maxlength="15" id="qqRegister">
              </div>
            </div>
          </div>

          <div class="clear">
            <div class="left_row">联系微信:</div>
            <div class="right_row">
              <input type="text" class="input" v-model="registerForm.wechat" id="microchannel" maxlength="40">
            </div>
          </div>-->
          <div class="clear" v-if="codeType=='code'">
            <div class="left_row require">验证码:</div>
            <div class="right_row">
              <input
                type="text"
                id="regCode"
                class="input"
                v-model="registerForm.imageCode"
                maxlength="4"
                style="width:430px"
              >
              <img
                :src="validateImage"
                @click="GET_VALIDATE"
                id="imgRegisterTryCode"
                style="width: 77px;height: 30px;"
              >
            </div>
          </div>
          <div class="clear" v-if="codeType=='sms'">
            <div class="left_row require">验证码:</div>
            <div class="right_row">
              <input
                type="text"
                id="regCode"
                class="input"
                v-model="registerForm.imageCode"
                maxlength="40"
                style="width:430px"
              >
              <span v-if="timer" class="btn-sms">{{timer}}s</span>
              <span v-else @click="getSmsCode" class="btn-sms">获取验证码</span>
            </div>
          </div>
          <div class="agree_container">
            <!-- <label class="agree_btn">
              <input id="agreeRegister" v-model="registerForm.userAgree" type="checkbox" style="width: 20px;">
              <span></span>

            </label>-->
            <input
              id="agreeRegister"
              v-model="registerForm.userAgree"
              type="checkbox"
              style="width: 20px;"
            >
            <label for="agreeRegister">本人同意并接受所有
              <!-- <a class="contract-link" target="_blank" href="/aboutus.html?name=xy">
                <span style="color: red;">&nbsp;&nbsp;规则与条款&nbsp;&nbsp;</span>
              </a>（确定无误后请打勾）-->
              <router-link :to="{name:'aboutIndex',params:{tab:'tab2'}}" target="_blank">
                <span style="color: red;">&nbsp;&nbsp;规则与条款&nbsp;&nbsp;</span>
              </router-link>（确定无误后请打勾）
            </label>
          </div>
          <div class="reg_container">
            <input type="button" id="registerBtn" @click="registerClick" value="立刻注册">
            <!-- <input type="hidden" id="registerChkBtn" class="clickable" data-load-remote="/tpl/modal/registerChk.jsp"> -->
          </div>
        </div>
      </div>

      <!-- form end -->
    </div>
    <!-- wp end -->
  </div>
</template>
<script>
import { register } from "@/api/authService";
import eyes from "pc/components/eyes";
import check from "@/util/RegExp";
import { mapGetters, mapActions, mapMutations } from "vuex";

import { registerControl } from "@/controls/auth/registerControl"; // 引入公共业务逻辑

export default {
  mixins: [registerControl],
  data() {
    return {
      inputName1: "",
      inputName2: "",
      inputName3: "",
      inputName4: "",
      inputName5: "",
      showError: false
    };
  },
  created() {
    this.checkCodeType();
  },
  computed: {
    ...mapGetters(["validateImage"])
  },
  methods: {
    ...mapMutations(["GET_VALIDATE"]),
    registerClick() {
      if (!this.registerForm.userAgree) {
        window.toast("未选中用户协议！");
        return false;
      }
      if (this.showError) {
        window.toast("两次输入密码不一致！");
        return false;
      }
      // if (this.registerForm.email == '') {
      //     window.toast('请输入正确的邮箱地址！')
      //     return false;
      // }
      this.register(this.registerForm)
        .then(res => {
          window.toast(res.message);
          this.$router.push({
            name: "registerSucces"
          });
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    },
    focusLabel(val) {
      switch (val) {
        case "account":
          this.inputName1 = val;
          break;
        case "password":
          this.inputName2 = val;
          break;
        case "confirmPassword":
          this.inputName5 = val;
          break;
        case "phone":
          this.inputName3 = val;
          break;
        default:
          this.inputName4 = val;
          break;
      }
    },
    blurLabel(val) {
      switch (val) {
        case "account":
          if (this.registerForm.account == "") {
            this.inputName1 = "";
          }
          break;
        case "password":
          if (this.registerForm.password == "") {
            this.inputName2 = "";
          }
          break;
        case "confirmPassword":
          if (this.registerForm.confirmPassword == "") {
            this.inputName5 = "";
          }
          break;
        case "phone":
          if (this.registerForm.phone == "") {
            this.inputName3 = "";
          }
          break;
        case "imageCode":
          if (this.registerForm.imageCode == "") {
            this.inputName4 = "";
          }
          break;
      }
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
  components: {
    eyes
  },
  watch: {
    "registerForm.confirmPassword"(val) {
      if (val.length > 0) {
        if (val != this.registerForm.password) {
          this.showError = true;
        } else {
          this.showError = false;
        }
      }
    }
  }
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
        width: 58%;
        height: 100%;
        padding-right: 20px;

        > div {
          margin-bottom: 18px;
          text-align: left;

          &.agree_container,
          &.reg_container {
            text-align: center;
          }
          &.agree_container {
            vertical-align: middle;
            display: flex;
            align-items: center;
            input {
              width: 17px;
              height: 17px;
            }
            label {
              line-height: 18px;
            }
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
          width: 512px;
          float: left;
          position: relative;

          .input {
            -webkit-appearance: textfield;
            background-color: white;
            -webkit-rtl-ordering: logical;
            cursor: text;
            padding: 1px;
            border-width: 2px;
            border-style: inset;
            border-color: initial;
            border-image: initial;
            text-rendering: auto;
            color: initial;
            letter-spacing: normal;
            word-spacing: normal;
            text-transform: none;
            text-indent: 0px;
            text-shadow: none;
            display: inline-block;
            text-align: start;
            font: 14px/1.6 Helvetica, "Hiragino Sans GB", "Microsoft Yahei",
              微软雅黑, Arial, sans-serif;
            outline: 0;

            &:focus {
              outline-offset: -2px;
            }
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
            width: 80px;
            text-align: center;
            height: 30px;
            line-height: 30px;
            background: #4db7f4;
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }

    .agree_container,
    .reg_container {
      padding-left: 80px;

      .agree_btn {
        cursor: pointer;

        input {
          display: none;
        }

        span {
          width: 14px;
          height: 14px;
          display: inline-block;
          vertical-align: middle;
          background: #fff;
          border: 1px solid #c9c9c9;
        }

        input:checked + span {
          background: #59dbd0;
          border: 1px solid #59dbd0;
        }
      }
    }

    #registerBtn {
      width: 380px;
      height: 40px;
      background: #4db7f4;
      color: #fff;
      line-height: 40px;
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
