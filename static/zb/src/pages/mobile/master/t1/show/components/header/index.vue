<template>
  <header class="index-top">
    <i class="iconclass iconbolin iconbolin-sidebar" @click="value=true"></i>
    <a href="/" class="link_logo">
      <img src="/static/images/logo.gif">
    </a>
    <a class="item-href" target="_blank" :href="SETTING.live800">
      <i class="iconclass iconbolin iconbolin-service"></i>
    </a>
    <tool-bar v-model="value"></tool-bar>
  </header>
</template>
<script>
  import toolBar from '../tool-bar';
  import toolBarright from '../tool-bar-right';
  import callBack from 'mobile/views/common/back-Call'
  import  {SETTING} from "@/assets/data"
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        SETTING,
        value:false,
        showHead:true,
        sheetData: [
          {
            name: "在线客服",
            target: "_blank",
            href: SETTING.live800
          },
          {name: "电话回拨", to: {path: "/common/backCall"}},
          {name: SETTING.telAgent, href: "tel:"+SETTING.telAgent}
        ],
        showSheet: false,
        valueRight:false,
      };
    },
    created(){
      // 监听header控制事件
      this.$bus.$on('setHeader',eventData=>{
        this.showHead=eventData
      })
    },
    components:{
      toolBar,
      toolBarright,
    },
     computed: {
      ...mapGetters(["isAgent","islogin"]),
    }
  };
</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
  header.index-top {
    height: r(100);
    width: 100%;
    line-height: r(100);
    background-color: $herder-bg;
    position: fixed;
    top:0;
    border:none;
    text-align: center;
    z-index: 999;
    .iconclass {
      @include f(48px);
      color: #fff;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      display: inline-block;
      vertical-align: middle;
    }
    .iconbolin-sidebar{
      left: r(16);
    }
    .iconbolin-service{
      right: r(16);
    }
    .link_logo{
      display:inline-block;
      height:95%;
      img {
        height:82%;
      }
    }
  }
</style>
