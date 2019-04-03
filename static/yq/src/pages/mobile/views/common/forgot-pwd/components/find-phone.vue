<template>
  <div class="phoneGet">
    <div class="input-group">
      <label>您的账号</label>
      <input v-model="phone.name" type="text" placeholder="请输入您的游戏账号">
    </div>
    <div class="input-group">
      <label>手机号码</label>
      <input v-model="phone.phone" type="text" placeholder="请输入绑定手机号码">
    </div>
    <p class="cl-red">*请输入正确的电话号码</p>
    <div class="btn_wrap">
      <v-button href="javascript:void(0);" @click="submitPhone" v-show="forbidtime == 0">找回密码</v-button>
      <p class="txt-center" v-show="forbidtime != 0">
        <span class="cl-red">{{forbidtime}}</span>秒后可重新获取验证码
      </p>
    </div>
  </div>
</template>
<script>
import check from "@/util/RegExp";
import { loginForgot } from "@/controls/auth/loginForgot";
export default {
  mixins: [loginForgot],
  data() {
    return {
      forbidtime: 0,
      interval: null // 计时器
    };
  },
  methods: {
    submitPhone() {
      this.getbackPwdByDx_dc(this.phone)
        .then(res => {
          window.toast(res.message);
          this.phoneTimer();
        })
        .catch(err => {
          window.toast(err.message);
          console.log(err);
        });
    },
    phoneTimer() {
      this.forbidtime = 120;
      let self = this;
      this.interval = setInterval(function() {
        self.forbidtime--;
        if (self.forbidtime == 0) {
          clearInterval(self.interval);
        }
      }, 1000);
    }
  },
  beforeDestroy() {
    window.clearInterval(this.interval);
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.phoneGet {
  padding: r(20);
  .input-group {
    margin-bottom: r(30);
    label {
      display: block;
      margin-bottom: r(20);
      color: #5a5a5a;
      @include f(32px);
      margin-top: r(30);
    }
    input {
      width: 100%;
      height: r(80);
      line-height: r(80);
      border: 1px solid #dedede;
      border-radius: 4px;
      padding: 0 r(20);
      color: #787876;
    }
  }

  .btn_wrap {
    margin-bottom: r(12);
    text-align: center;
  }
}
</style>
