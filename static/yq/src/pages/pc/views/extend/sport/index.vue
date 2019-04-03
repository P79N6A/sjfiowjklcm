<template>
  <div class="sportPage">
    <div class="sportItems">
      <div class="item shaba">
        <div class="shadow">
          <button class="btn" @click="open(Games.href_sb_pc, '沙巴体育', 900, 640, true, islogin)">进入游戏</button>
        </div>
      </div>
      <div class="item bti">
        <div class="shadow">
          <button class="btn" @click="open(Games.href_bti, 'BTI体育', 900, 640, true, islogin)">进入游戏</button>
        </div>
      </div>
      <div class="item ug">
        <div class="shadow">
          <button class="btn" @click="open(Games.href_ug_pc, '新皇冠体育', 900, 640, true, islogin)">进入游戏</button>
        </div>
      </div>
      <div class="item avia">
        <div class="shadow">
          <button class="btn" @click="open(Games.href_avia, '泛亚电竞', 900, 640, true, islogin)">进入游戏</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    Games
  } from "@/assets/data"
  import openWindow from '@/util/openWindow'
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        Games,
      };
    },
    props: {},
    methods: {
      checkLogin(e) {
        if (!this.$store.getters.islogin) {
          e.preventDefault();
          toast("请先登录")
          this.$store.commit("SHOW_LOGIN", true);
          return false;
        }
      },
      load(){
        alert('loaded')
      },
      play(url,e){
        if (!this.$store.getters.islogin) {
          e.preventDefault();
          toast("请先登录")
          this.$store.commit("SHOW_LOGIN", true);
          return false;
        }
        this.showIframe = false
        this.sportIframeUrl = url
        let ifrm = this.$refs.iframe;
        window.$load.open('加载中...')
        ifrm.onload = ifrm.onreadystatechange = function() {
          if (this.readyState && this.readyState != 'complete') return;
          else {window.$load.close()}
        }
      },
      open(url, title, w, h, needLogin, loginState) {
        openWindow(url, title, w, h, needLogin, loginState)
      },
    },
    computed: {
      ...mapGetters(["islogin"])
    },
    created() {},
    components: {},
  };

</script>
<style lang="scss" scoped>
  .sportPage{
    background: url('./images/bg.jpg') no-repeat;
    background-size: cover;
    background-position: top center;
    width: 100%;
    min-height: 800px;
    padding-top: 630px;
    padding-bottom: 70px;
    .sportItems{
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .item{
        width: 275px;
        height: 370px;
        position: relative;
        &.shaba{
          background: url('./images/saba.png') no-repeat;
          background-size: contain;
          background-position: center;
        }
        &.bti{
          background: url('./images/bti.png') no-repeat;
          background-size: contain;
          background-position: center;
        }
        &.ug{
          background: url('./images/ug.png') no-repeat;
          background-size: contain;
          background-position: center;
        }
        &.avia{
          background: url('./images/avia.png') no-repeat;
          background-size: contain;
          background-position: center;
        }
        .shadow{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba($color: #000000, $alpha: 0.7);
          opacity: 0;
          transition: all 0.5s;
          display: flex;
          align-items: center;
          justify-content: center;
          .btn{
            border-radius: 6px;
            background-image: -moz-linear-gradient( 0deg, rgb(217,142,23) 0%, rgb(248,191,102) 55%, rgb(254,226,175) 100%);
            background-image: -webkit-linear-gradient( 0deg, rgb(217,142,23) 0%, rgb(248,191,102) 55%, rgb(254,226,175) 100%);
            background-image: -ms-linear-gradient( 0deg, rgb(217,142,23) 0%, rgb(248,191,102) 55%, rgb(254,226,175) 100%);
            background-image: linear-gradient( 0deg, rgb(217,142,23) 0%, rgb(248,191,102) 55%, rgb(254,226,175) 100%);
            box-shadow: 0px 3px 3px 0px rgba(66, 41, 3, 0.75),inset 0px 0px 4px 0px rgba(255, 254, 207, 0.004);
            width: 154px;
            height: 49px;
            color: #fff;
            font-size: 18px;
          }
        }
        &:hover{
          .shadow{
            opacity: 1;
            transition: all 0.5s;
          }
        }
      }
    }
  }
</style>
