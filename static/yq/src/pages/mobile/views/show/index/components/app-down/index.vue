<template>
  <div>
    <transition name="slideTop">
      <div class="app-down cfx" v-show="showTopApp&&$route.name=='home'">
        <img src="./images/top_1.png" class="close_h_d" @click="close_top_app">
        <img src="./images/top_2.png" class="down-app">
        <a :href="Download.app" v-if="islogin">
          <img src="./images/top_3.png" class="downclick">
        </a>
        <a v-else @click="downapp">
          <img src="./images/top_3.png" class="downclick">
        </a>
      </div>
    </transition>
  </div>
</template>
<script>
  import  {SETTING,Download} from "@/assets/data"
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        SETTING,
        Download,
        value:false,
        download_visible:true,
        sheetData: [
          {
            name: "在线客服",
            target: "_blank",
            href: SETTING.live800
          },
          {name: "电话回拨", to: {path: "/help/backCall"}},
          {name: SETTING.telAgent, href: "tel:"+SETTING.telAgent}
        ],
        showSheet: false,
      };
    },
    methods:{ 
      downapp(){
        if(!this.islogin){
          $alert("您好，请先登录游戏账号，若无账号，请先进入网页注册!");
          // toast("请先登陆");
        }
      },
      close_top_app(val){
        this.$store.commit('SHOW_TOPAPP',false);
      },
    },
    computed:{
      ...mapGetters(["islogin","showTopApp"]),
    }
  };
</script>
<style lang="scss" scoped>

  @import "~mobile/assets/scss/mixin.scss";
  .app-down{
    width:100%;
    height:r(120);
    background:#4db7f4 url(./images/top_bg.png) no-repeat center bottom -1px /100% 100%;
    border-bottom:dashed 2px #bfbfbf;
    padding:0 r(10);
    position: fixed;
    bottom:r(100);
    left:0;
    z-index: 9;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .close_h_d {
      height: r(45);
      margin-top: r(-10);
      margin-left: r(-8);
    }
    .down-app {
      height: r(80);
    }
    .downclick {
      height: r(60);
    }
  }

    
  
</style>
