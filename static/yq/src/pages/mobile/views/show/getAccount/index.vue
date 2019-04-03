<template>
  <div class="getAccount-page">
    <div class="tab-buttons">
      <!-- <router-link :to="{name:'forgotpwd'}" class="button">
        <i class="icon1"></i>
        <div class="text">找回账号
          <br>
          <span>通过账号绑定的手机、邮箱找回</span>
        </div>
        <i class="iconfont icon--youjiantou"></i>
      </router-link> -->
      <router-link :to="{name:'forgotpwd'}" class="button">
        <i class="icon2"></i>
        <div class="text">找回密码
          <br>
          <span>通过账号绑定的手机、邮箱找回</span>
        </div>
        <i class="iconfont icon--youjiantou"></i>
      </router-link>
      <a :href="SETTING.live800" target="_blank" class="button">
        <i class="icon4"></i>
        <div class="text">人工帮助
          <br>
          <span>解决账号使用过程中的常见问题</span>
        </div>
        <i class="iconfont icon--youjiantou"></i>
      </a>
    </div>
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
  components: {}
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.getAccount-page {
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
      span {
        display: block;
        color: #999;
        margin-top: r(10);
      }
    }
    .icon1 {
      display: inline-block;
      width: r(44);
      height: r(44);
      background: url(./images/account-i.png) no-repeat center/cover;
    }
    .icon2 {
      display: inline-block;
      width: r(44);
      height: r(44);
      background: url(./images/password-i.png) no-repeat center/cover;
    }
    .icon4 {
      display: inline-block;
      width: r(44);
      height: r(44);
      background: url(./images/customer-i.png) no-repeat center/cover;
    }
    .iconfont {
      @include f(40px);
      color: #999;
    }
  }
}
</style>

