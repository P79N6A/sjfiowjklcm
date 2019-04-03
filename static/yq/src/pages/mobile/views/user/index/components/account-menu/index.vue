<template>
  <div class="accountMenu">
    <router-link :to="{name:'money_depositMenu'}" class="menu-item">
      <span class="main-ico deposit"></span>
      <p class="menu-text">存款</p>
    </router-link>
    <router-link :to="{name:'money_drawmoney'}" class="menu-item">
      <span class="main-ico drawmoney"></span>
      <p class="menu-text">取款</p>
    </router-link>
    <router-link :to="{name:'money_transfer'}" class="menu-item">
      <span class="main-ico transfer"></span>
      <p class="menu-text">户内转账</p>
    </router-link>

    <router-link :to="{name:'message'}" class="menu-item">
      <span class="main-ico message"></span>
      <p class="menu-text">站内信</p>
    </router-link>
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
  created() {
    //      this.loadData();
  },
  computed: {
    //      ...mapGetters(["userData", "isAgent"])
  }
};
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
.accountMenu {
  background: #eee;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: r(10) 0;
  .menu-item {
    width: 25%;
    text-align: center;
    .main-ico {
      display: inline-block;
      width: 50px;
      height: 45px;
      &.deposit {
        background: url("./images/money-icon-sprite.png") no-repeat 0 0;
        background-position: 6px 0;

      }
      &.transfer {
        background: url("./images/money-icon-sprite.png") no-repeat 0 0;
        background-position: 6px -88px;
      }
      &.message {
        background: url("./images/money-icon-sprite.png") no-repeat 0 0;
        background-position: 5px -132px;
      }
      &.drawmoney {
        background: url("./images/money-icon-sprite.png") no-repeat 0 0;
        background-position: 6px -44px;
      }
    }
    .menu-text {
      line-height: 1.5;
      color: #333;
    }
  }
}
</style>
