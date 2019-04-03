<template>
<div>
  <footer class="footer">
    <router-link :to="{name:'home'}">
      <span class="imgbox i1"></span>
      <!-- <div>首页</div> -->
    </router-link>
    <router-link :to="{name:'promo'}" v-if="islogin">
      <span class="imgbox i5"></span>
      <!-- <div>优惠</div> -->
    </router-link>
    <router-link :to="{name:'slotgame',params:{type:'slot',flag:true}}">
      <span class="imgbox i2"></span>
      <!-- <div>游戏大厅</div> -->
    </router-link>
    <router-link :to="{name:'download'}" v-if="!islogin">
      <span class="imgbox i3"></span>
      <!-- <div>下载APP</div> -->
    </router-link>
    <router-link :to="{name:'welfare'}" v-if="islogin">
      <span class="imgbox i6"></span>
      <!-- <div>专属福利</div> -->
    </router-link>
    <router-link :to="{name:'cooperation'}" v-if="!islogin">
      <span class="imgbox i4"></span>
      <!-- <div>代理合作</div> -->
    </router-link>
    <router-link :to="account" v-if="islogin">
      <span class="imgbox i7" :class="isUser ? 'usercenter':'agentcenter'"></span>
      <!-- <div>个人中心</div> -->
    </router-link>
  </footer>
  </div>
</template>
<script>
import { SETTING } from "@/assets/data";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      SETTING
    };
  },
  methods: {
    downapp() {
      if (!this.isLogin) {
        $alert("您好，请先登录游戏账号，若无账号，请先进入网页注册!");
        // toast("请先登陆");
      }
    }
  },
  computed: {
    ...mapGetters(["userData", "islogin", "isUser"]),
    account() {
      return this.$store.getters.isAgent
        ? { name: "agentcenter" }
        : { name: "usercenter" };
    }
  }
};
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin";
footer.footer {
  position: fixed;
  bottom: 0;
  height: r($footer-h);
  z-index: 99;
  width: 100%;
  @include f(28px);
  color: $cl2;
  border-top: 1px solid #ccc;
  background: $footer-bg;
  display: flex;
  align-items: center;
  justify-content: center;
  & > a {
    // float:left;
    height: r($footer-h);
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.2;
    color: #7bc1ff;
    font-weight: 600;
    .imgbox {
      width: r(60);
      height: r(90);
      display: inline-block;
      &.i1 {
        background: url(./images/icon1.png) no-repeat center;
        background-size: 100% 100%;
      }
      &.i2 {
        width: r(100);
        background: url(./images/icon2.png) no-repeat center;
        background-size: 100% 100%;
      }
      &.i3 {
        width: r(100);
        background: url(./images/icon3.png) no-repeat center;
        background-size: 100% 100%;
      }
      &.i4 {
        width: r(100);
        background: url(./images/icon4.png) no-repeat center;
        background-size: 100% 100%;
      }
      &.i5 {
        background: url(./images/icon5.png) no-repeat center;
        background-size: 100% 100%;
      }
      &.i6 {
        width: r(100);
        background: url(./images/icon6.png) no-repeat center;
        background-size: 100% 100%;
      }
      &.i7 {
        width: r(100);
        background: url(./images/icon7.png) no-repeat center;
        background-size: 100% 100%;
      }
      &.agentcenter {
        background: url(./images/agent.png) no-repeat center;
        background-size: 100%  100%;
      }
    }
    &.active {
      color: #0085d2;
      .i1 {
        background: url(./images/icon8-1.png) no-repeat center;
        background-size: 100% 100%;
      }
      .i2 {
        background: url(./images/icon2-1.png) no-repeat center;
        background-size: 100%  100%;
      }
      .i3 {
        background: url(./images/icon3-1.png) no-repeat center;
        background-size: 100%  100%;
      }
      .i4 {
        background: url(./images/icon4-1.png) no-repeat center;
        background-size: 100%  100%;
      }
      .i5 {
        background: url(./images/icon5-1.png) no-repeat center;
        background-size: 100%  100%;
      }
      .i6 {
        background: url(./images/icon6-1.png) no-repeat center;
        background-size: 100%  100%;
      }
      .i7 {
        background: url(./images/icon7-1.png) no-repeat center;
        background-size: 100%  100%;
      }
      &.agentcenter {
        background: url(./images/agent2.png) no-repeat center;
        background-size: 100%  100%;
      }
    }
    img {
      height: r(60);
    }
  }
  .iconfont {
    @include f(58px);
  }
}
</style>
