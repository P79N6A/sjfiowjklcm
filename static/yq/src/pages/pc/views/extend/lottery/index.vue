<template>
  <div class="lotteryPage">
    <div class="bannerItem">
      <img src="./images/banner.png" alt="">
    </div>
    <div class="gamesItems">
      <div class="items">
        <div class="item">
          <img src="./images/vr.png" alt="">
          <div class="buttonItem">
            <button class="btn" @click="open(Games.href_vr, 'VR彩票', 900, 640, true, islogin)">进入游戏</button>
          </div>
        </div>
        <div class="item">
          <img src="./images/bbin.png" alt="">
          <div class="buttonItem">
            <button class="btn" @click="open(Games.href_bbcp, 'BBIN彩票', 900, 640, true, islogin)">进入游戏</button>
          </div>
        </div>
        <div class="item">
          <img src="./images/ssc.png" alt="">
          <div class="buttonItem">
            <button class="btn" @click="open(Games.href_ig_ssc, 'IG时时彩', 900, 640, true, islogin)">进入游戏</button>
          </div>
        </div>
        <div class="item">
          <img src="./images/hkc.png" alt="">
          <div class="buttonItem">
            <button class="btn" @click="open(Games.href_ig_hk, 'IG香港彩', 900, 640, true, islogin)">进入游戏</button>
          </div>
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
      open(url, title, w, h, needLogin, loginState) {
        openWindow(url, title, w, h, needLogin, loginState)
      },
    },
    computed: {
      ...mapGetters(["islogin"])
    },
    created() {},
    components: {}
  };

</script>
<style lang="scss" scoped>
  .lotteryPage {
    width: 100%;
    min-height: 800px;

    .bannerItem {
      width: 100%;

      img {
        width: 100%;
      }
    }

    .gamesItems {
      background: url('./images/bj.png') no-repeat;
      background-position: top center;
      background-size: cover;
      width: 100%;
      padding: 140px 0 ;

      .items {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;

        .item {
          text-align: center;
          &:hover{
            img{
              transform: scale(1.1);
              transition: all 0.3s;
            }
          }
          img{
            transform: scale(1);
            transition: all 0.3s;
          }
          .buttonItem {
            width: 100%;
            margin-top: 30px;

            .btn {
              border-radius: 7px;
              border: 1px solid #b8b8b8;
              background: transparent;
              color: #b8b8b8;
              width: 140px;
              height: 46px;
              font-size: 18px;
              transition: all 0.3s;

              &:hover {
                border-radius: 7px;
                background-image: -moz-linear-gradient(0deg, rgb(217, 142, 23) 0%, rgb(248, 191, 102) 55%, rgb(254, 226, 175) 100%);
                background-image: -webkit-linear-gradient(0deg, rgb(217, 142, 23) 0%, rgb(248, 191, 102) 55%, rgb(254, 226, 175) 100%);
                background-image: -ms-linear-gradient(0deg, rgb(217, 142, 23) 0%, rgb(248, 191, 102) 55%, rgb(254, 226, 175) 100%);
                background-image: linear-gradient(0deg, rgb(217, 142, 23) 0%, rgb(248, 191, 102) 55%, rgb(254, 226, 175) 100%);
                box-shadow: inset 0px 0px 4px 0px rgba(255, 254, 207, 0.004);
                width: 140px;
                height: 46px;
                color: #fff;
                transition: all 0.3s;

              }
            }
          }
        }
      }
    }
  }

</style>
