<template>
  <div class="accountMenu">
    <!-- <router-link class="accountMenuItem" :to="{name:'money_deposit'}">
      <img src="./img/ico_mine_1.png" alt="">
      <h3>存款</h3>
    </router-link>
    <router-link class="accountMenuItem" :to="{name:'money_drawmoney'}">
      <img src="./img/ico_mine_2.png" alt="">
      <h3>取款</h3>
    </router-link>
    <router-link class="accountMenuItem" :to="{name:'money_transfer'}">
      <img src="./img/ico_mine_3.png" alt="">
      <h3>转账</h3>
    </router-link> -->
    <router-link :to="{name:'money_transfer'}" class="flex menu-list-item">
      <span class="main-ico transfer"></span>
      <span class="menu-text">转账</span>
      <span class="iconcent ct-jiantou"></span>
    </router-link>
    <router-link :to="{name:'money_drawmoney'}" class="flex menu-list-item">
      <span class="main-ico drawmoney"></span>
      <span class="menu-text">取款</span>
      <span class="iconcent ct-jiantou"></span>
    </router-link>
    <router-link :to="{name:'user_log'}" class="flex menu-list-item">
      <span class="main-ico log"></span>
      <span class="menu-text">交易记录</span>
      <span class="iconcent ct-jiantou"></span>
    </router-link>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {

      };
    },
    props: {
      value: {
      }
    },
    watch: {

    },
    methods: {

    },
    created() {
//      this.loadData();
    },
    computed: {
//      ...mapGetters(["userData", "isAgent"])
    }
  }
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .accountMenu{
    background: $main-bg;
    flex-direction: column;
    width: 100%;  
    margin-bottom: r(20);
    .menu-list-item {
      border-bottom: 1px solid $cl7;
      @include f(30px);
      justify-content: space-between;
      align-items: center;
      text-align: center;
      width: 100%;
      height: r(90);
      .menu-ico {
        color: $iconcl;
        @include f(46px);
        flex: 1;
      }
      .tipstxt {
        position: absolute;
        right: r(-20);
        top: 46%;
        transform: translateY(-50%);
        color: #888;
      }
      .menu-text {
        flex: 5;
        text-align: left;
        font-family: PingFangSC-Regular;
        @include f(28px);
        color: #ffffff;
        line-height: r(75);
        position: relative;
      }
      .ct-jiantou {
        color: #c7c7c7;
        @include f(40px);
        flex: 1;
      }
      .main-ico{
        width: r(50);
        height: r(50);
        flex: 1;
      }
      .transfer{
        background: url('./images/tranfer.png') no-repeat ;
        background-size: contain;
        background-position: center;
      }
      .log{
        background: url('./images/xico_list.png') no-repeat ;
        background-size: contain;
        background-position: center;
      }
      .drawmoney{
        background: url('./images/xico_draw.png') no-repeat ;
        background-size: contain;
        background-position: center;
      }
    }
  }

</style>
