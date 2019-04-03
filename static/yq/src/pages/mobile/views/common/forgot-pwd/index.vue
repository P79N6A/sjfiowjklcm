<template>
  <div class="forgot-pwd-part">
    <router-link :to="{name:'forgotpwdPhone'}" class="button">
      <i class="forgetPassword-icon forgetPassword-icon1"></i>
      <div class="text">短信找回密码</div>
      <i class="iconfont icon--youjiantou"></i>
    </router-link>
    <router-link :to="{name:'forgotpwdEmail'}" class="button">
      <i class="forgetPassword-icon forgetPassword-icon2"></i>
      <div class="text">邮箱找回密码</div>
      <i class="iconfont icon--youjiantou"></i>
    </router-link>
  </div>
</template>
<script>
import { SETTING } from "@/assets/data";
export default {
  data() {
    return {
      SETTING
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.forgot-pwd-part {
  background: $main-bg;
  .button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: r(100);
    border-bottom: 1px solid #f4f4f4;
    text-align: left;
    color: #333;
    padding: 0 r(30);
    .text {
      flex: 1;
      margin-left: r(20);
      @include f(28px);
    }
    .iconfont {
      @include f(40px);
      color: #999;
    }
    .forgetPassword-icon {
      display: inline-block;
      width: 22px;
      height: 22px;
      background: url(./images/findpassword-sprite1.png) no-repeat 0 0;
      &.forgetPassword-icon1 {
        background-position: 0 0;
      }
      &.forgetPassword-icon2 {
        background-position: 0 -56px;
      }
    }
  }
}
</style>
