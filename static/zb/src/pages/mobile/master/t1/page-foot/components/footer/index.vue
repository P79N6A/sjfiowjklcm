<template>
  <footer class="footer" v-if="showFooter">
    <router-link :to="{name:'aindex'}">
      <i class="iconbolin iconbolin-home"></i>
      <div>首页</div>
    </router-link>

    <router-link :to="{name:'promo'}">
      <i class="iconbolin iconbolin-pro"></i>
      <div>优惠</div>
    </router-link>
    
    <router-link :to="{name:'slotgame'}">
      <i class="iconbolin iconbolin-poker"></i>
      <div>游戏</div>
    </router-link>

    <router-link :to="{name:'cooperation'}">
      <i class="iconbolin iconbolin-agent"></i>
      <div>代理</div>
    </router-link>
    
    <router-link :to="account" v-if="islogin">
      <i class="iconbolin iconbolin-mine"></i>
      <div>账户</div>
    </router-link>
    <router-link :to="{name:'login'}" v-else>
      <i class="iconbolin iconbolin-mine"></i>
      <div>登录</div>
    </router-link>
  </footer>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {SETTING} from "@/assets/data"
  export default {
    data() {
      return {
        showFooter:true,
        SETTING
      };
    },
    methods:{
      checkLogin(e) {
        if(!this.$store.getters.islogin) {
          e.preventDefault();
          toast("请先登录")
          return false;
        }
      }
    },
    created(){
      this.$bus.$on('setFooter',eventData=>{
        this.showFooter=eventData
      })
    },
    computed: {
      ...mapGetters(["isAgent","islogin"]),

      account() {
        return this.isAgent ? {name: "agentcenter"} : {name: 'usercenter'};
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin";
  footer.footer {
    position: fixed;
    bottom: 0;
    align-items: center;
    height: r($footer-h);
    z-index: 99;
    width: 100%;
    @include f(28px);
    border-top: 1px solid rgba($color: #556ebc, $alpha: .5);
    color:#6275b8;
    background-color: $footer-bg;
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    text-align:center;
    & > a {
      height: r($footer-h);
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 1.2;
      &.active {
        color: $iconcl;
        border-top-color: #f33;
        .iconay{
          color: $iconcl;
        }
      }
    }
    .iconbolin{
      @include f(48px);
    }
  }
</style>
