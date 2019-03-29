<template>
  <div class="register-content">
    <div class="login_logo">
      <img src="/static/images/logo.gif" alt="">
    </div>

    <form class="form-ui">
      <div class="input-box">
        <div class="ui-input-row rq-value">
          <i class="iconbolin iconbolin-yonghuming"></i>
          <input type="text" class="ui-ipt" v-model="registerForm.account" placeholder="用户名(6-10位数字或字母)">
        </div>
        <div class="ui-input-row rq-value">
          <i class="iconbolin iconbolin-mima"></i>
          <input ref="pwd" type="password" class="ui-ipt" v-model="registerForm.password" placeholder="密 码(6-16位数字和字母)">
          <eyes :dom="$refs.pwd"></eyes>
        </div>
        <div class="ui-input-row rq-value">
          <i class="iconbolin iconbolin-mobile"></i>
          <input type="text" class="ui-ipt" v-model="registerForm.phone" placeholder="取款唯一凭证,请正确填写手机号">
        </div>
        <div class="ui-input-row rq-value">
          <i class="iconbolin iconbolin-yanzhengma"></i>
          <input type="text" class="ui-ipt" v-model="registerForm.imageCode" placeholder="请输入验证码">
          <div class="form-img">
            <img :src="validateImage" @click="GET_VALIDATE"/>
          </div>
        </div>
      </div>

    <div class="login-btn"  @click="submitForm">注册</div>
    <div class="other-box cfx">
      <router-link :to="{name:'cooperation'}" class="register-btn fl">注册代理账号</router-link>
      <router-link :to="{name:'login'}" class="forget-btn fr">已有账户？</router-link>
    </div>

      <!-- <div class="btns">
        <span class="btn block btn-blue" @click="submitForm">立即开户</span>
        <router-link :to="{name:'login'}" class="btn block btn-red">立即登录</router-link>
      </div> -->
    </form>
  </div>
</template>
<script>
import { register } from "@/api/authService";
import { registerControl } from "@/controls/auth/registerControl"; // 引入公共业务逻辑
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  mixins: [registerControl],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["validateImage"])
  },
  methods: {
    ...mapMutations(["GET_VALIDATE"]),
    submitForm() {
      // 提交动作
      this.register(this.registerForm)
        .then(res => {
          window.toast(res.message);
          this.$router.replace({ name: "usercenter" });
        })
        .catch(err => {
          window.toast(err.message);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #e6f3ff;
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  color: #e6f3ff;
}
input::-moz-placeholder,
textarea::-moz-placeholder {
  color: #e6f3ff;
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: #e6f3ff;
}
.register-content {
  background: url(./images/bg.png) no-repeat center center/100% 100%;
  min-height: 92vh;
  overflow: hidden;
  .login_logo {
    text-align: center;
    img {
      margin: r(60) 0;
      width: 50%;
    }
  }

  .form-ui {
    width: 90%;
    margin: 25px auto 10px;
    .ui-input-row {
      position: relative;
      line-height: 46px;
      height: 46px;
      padding: 0 10px;
      background: rgba(63, 127, 192, 0.3);
      border: 1px solid rgba(85, 110, 188, 0.7);
      border-radius: r(50);
      margin-bottom: 23px;
      .iconbolin {
        color: #e6f3ff;
        @include f(48px);
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
    .input-box {
      border-radius: 10px;
      overflow: hidden;
    }
    .ui-ipt {
      display: block;
      font-size: 15px;
      color: #ffffff;
      line-height: normal;
      line-height: 41px;
      text-align: left;
      white-space: nowrap;
      border: 0;
      float: right;
      width: 90%;
      margin-top: 3px;
      background: none;
      &:focus {
        outline: none;
      }
    }
  }
  input {
    outline: none;
  }
  .copyright {
    text-align: center;
    font-size: 12px;
    color: #fff;
    width: 100%;
    opacity: 0.4;
    position: fixed;
    bottom: 0;
    line-height: 30px;
    left: 0;
  }
  .login-btn {
    width: 100%;
    background-image: linear-gradient(-51deg, #ff5544 0%, #ff3751 100%);
    border-radius: r(50);
    text-align: center;
    height: r(80);
    line-height: r(80);
    color: #ffffff;
    letter-spacing: 4px;
    @include f(30px);
  }
  .other-box {
    color: #fff;
    padding: r(20) 0;
    .register-btn {
      text-align: left;
    }
    .forget-btn {
      text-align: right;
      text-decoration: underline;
    }
  }
}
</style>
