<template>
  <div class="find-email">
    <div class="input-group">
      <label>您的账号</label>
      <input v-model="email.name" type="text" placeholder="请输入您的游戏账号">
    </div>
    <div class="input-group">
      <label>注册邮箱</label>
      <input v-model="email.yxdz" type="text" placeholder="请输入绑定的邮箱">
    </div>
    <p class="cl-red">*请输入您注册的邮箱</p>
    <div class="input-group">
      <label>验证码</label>
      <input v-model="email.code" type="text" placeholder="请输入验证码" maxlength="4">
      <img class="code" :src="validateImage" @click="GET_VALIDATE">
    </div>
    <v-button @click="submitEmail">找回密码</v-button>
  </div>
</template>
<script>
import check from "@/util/RegExp";
import { loginForgot } from "@/controls/auth/loginForgot";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  mixins: [loginForgot],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["validateImage"])
  },
  methods: {
    ...mapMutations(["GET_VALIDATE"]),
    submitEmail() {
      this.getbackPwdByEmail(this.email)
        .then(res => {
          window.toast(res.message);
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.find-email {
  padding: r(20);
  .input-group {
    position: relative;
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
    .code {
      position: absolute;
      right: 0;
      bottom: 0;
      height: r(80);
    }
  }
}
</style>
