<template>
  <div class="tab-menu">
    <router-link class="tab-menu-item" :to="{name:'guideWeixin'}">
      <div class="tab-menu-text">存款教程</div>
    </router-link>
    <router-link class="tab-menu-item" :to="{name:'guideWechat'}">
      <div class="tab-menu-text">如何取款</div>
    </router-link>
    <router-link class="tab-menu-item" :to="{name:'guideEbank'}">
      <div class="tab-menu-text">户内转账教程</div>
    </router-link>
    <router-link class="tab-menu-item" :to="{name:'guideForget'}">
      <div class="tab-menu-text">忘记密码</div>
    </router-link>
    <router-link class="tab-menu-item" :to="{name:'guideEnrol'}">
      <div class="tab-menu-text">如何注册账号</div>
    </router-link>
    <router-link class="tab-menu-item" :to="{name:'guideLogin'}">
      <div class="tab-menu-text">如何登陆账号</div>
    </router-link>
    <router-link class="tab-menu-item" :to="{name:'guideFavorable'}">
      <div class="tab-menu-text">如何自助申请优惠</div>
    </router-link>
    <router-link class="tab-menu-item" :to="{name:'guideDownload'}">
      <div class="tab-menu-text">奇幻城APP下载指南</div>
    </router-link>
    
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      cur:1
    };
  },
  props: {
    value: {}
  },
  watch: {},
  methods: {},
  created() {
    //      this.loadData();
  },
  computed: {
    //      ...mapGetters(["tabData", "isAgent"])
  }
};
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
.tab-menu {
  background: #fff;
  margin: 0 0 r(15) 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .tab-menu-item {
    color: #656262;
    display: block;
    margin: 0 r(25);
    padding: r(15) 0;
    border-bottom: solid 4px transparent;
    .iconfont {
      @include f(50px);
      padding-bottom: 2px;
    }
    .tab-menu-text {
      @include f(28px);
    }
    &.active {
      color: #333;
      border-bottom: solid 4px #44A7E0;
    }
    &:before {
      content: "";
      display: block;
      position: absolute;
      height: 85%;
      left: 0;
    }
    &:first-child {
      &:before {
        display: none;
      }
    }
  }
}
</style>
