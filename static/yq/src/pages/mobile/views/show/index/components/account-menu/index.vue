<template>
  <div class="account-menu">
    <div class="top-login" v-if="!islogin">
      <router-link :to="{name:'login'}" class="btn-login">登录</router-link>
      <router-link :to="{name:'register'}" class="btn-register">注册</router-link>
    </div>
    <div class="index-menu">
      <router-link class="index-menu-item" :to="{name:'free'}" v-if="!islogin">
        <img src="./images/agent2.png" class="index-menu-ico">
        <div class="index-menu-text">免费试玩</div>
      </router-link>
      <!-- <router-link class="index-menu-item" :to="{name:'history'}">
      <img src="./images/history2.png" class="index-menu-ico">
      <div class="index-menu-text">奇幻城风采</div>
      </router-link>-->
      <router-link class="index-menu-item" :to="{name:'promo'}" v-if="!islogin">
        <img src="./images/integral2.png" class="index-menu-ico">
        <div class="index-menu-text">优惠福利</div>
      </router-link>
      <router-link class="index-menu-item" :to="{name:'vip'}">
        <img src="./images/vip2.png" class="index-menu-ico">
        <div class="index-menu-text">尊享VIP</div>
      </router-link>
      <router-link class="index-menu-item" :to="{name:'girls'}">
        <img src="./images/lgf2.png" class="index-menu-ico">
        <div class="index-menu-text">喜爱夜蒲</div>
      </router-link>
      <router-link class="index-menu-item" :to="{name:'cooperation'}" v-if="islogin">
        <img src="./images/index.png" class="index-menu-ico">
        <div class="index-menu-text">加盟合作</div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    value: {}
  },
  watch: {},
  methods: {},
  created() {},
  computed: {
    ...mapGetters(["islogin"])
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.account-menu {
  background: $main-bg;
  .top-login {
    display: flex;
    justify-content: space-between;
    padding: 0 r(30);
    > a {
      width: 48%;
      text-align: center;
      color: #fff;
      // padding: r(40) 0;
      @include f(33px);
      // font-weight: 600;
      letter-spacing: 2px;
      border-radius: r(36);
    }
  }
  .btn-login {
    // background: #4db7f4;
    background-image: -moz-linear-gradient(
      0deg,
      rgb(255, 218, 131) 0%,
      rgb(255, 197, 59) 100%
    );
    background-image: -webkit-linear-gradient(
      0deg,
      rgb(255, 218, 131) 0%,
      rgb(255, 197, 59) 100%
    );
    background-image: -ms-linear-gradient(
      0deg,
      rgb(255, 218, 131) 0%,
      rgb(255, 197, 59) 100%
    );
    background-image: linear-gradient(
      90deg,
      rgb(255, 218, 131) 0%,
      rgb(255, 197, 59) 100%
    );
    height: r(80);
    line-height: r(80);
  }
  .btn-register {
    // background: #ff665a;
    background-image: -moz-linear-gradient(
      0deg,
      rgb(255, 125, 113) 0%,
      rgb(255, 76, 59) 100%
    );
    background-image: -webkit-linear-gradient(
      0deg,
      rgb(255, 125, 113) 0%,
      rgb(255, 76, 59) 100%
    );
    background-image: -ms-linear-gradient(
      0deg,
      rgb(255, 125, 113) 0%,
      rgb(255, 76, 59) 100%
    );
    background-image: linear-gradient(
      90deg,
      rgb(255, 125, 113) 0%,
      rgb(255, 76, 59) 100%
    );
    height: r(80);
    line-height: r(80);
  }
}
.index-menu {
  display: flex;
  direction: center;
  background-color: $main-bg;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  padding: r(20) r(30);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  .index-menu-item {
    .index-menu-ico {
      width: r(100);
      height: auto;
    }
    .index-menu-text {
      padding-top: r(18);
      @include f(28px);
      color: #494949;
    }
  }
}
</style>
