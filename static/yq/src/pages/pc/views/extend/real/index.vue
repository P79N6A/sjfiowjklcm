<template>
  <div class="real-container">
    <div class="real-content">
        <a class="real-game-item cfx">
          <div class="real-picpart fl">
             <img src="./images/ag-mainpic.jpg">
             <div class="realgame-btns">
                <a class="game-btn play" @click="open(Games.href_ag, 'AG真人', 900, 640, true, islogin)">进入游戏</a>
             </div>
          </div>
          <div class="real-infopart fr">
             <h1 class="title">
               <span class="title-icon">
                  <img src="./images/ag-logo.png">
               </span>
               AG真人&nbsp;>
             </h1>
             <p class="infomation">
                支持设备：电脑/手机安卓客户端
             </p>
             <div class="real-deputypic cfx">
                <img src="./images/ag-deputypic.jpg" class="phoneview">
                <img :src="`/index/generateQRCode.php?qrtext=${Download.agMobile}`" class="qrcode" >
             </div>
          </div>
       </a>
      <a class="real-game-item cfx">
          <div class="real-picpart fl">
             <img src="./images/sunbet-mainpic.jpg">
             <div class="realgame-btns">
                <a class="game-btn play" @click="open(Games.href_sunbet, '申博真人', 900, 640, true, islogin)">进入游戏</a>
             </div>
          </div>
          <div class="real-infopart fr">
             <h1 class="title">
               <span class="title-icon">
                  <img src="./images/sunbet-logo.png">
               </span>
               申博真人&nbsp;>
             </h1>
             <p class="infomation">
                支持设备：电脑/手机网页版
             </p>
             <div class="real-deputypic cfx">
                <img src="./images/sunbet-deputypic.jpg" class="phoneview">
                <!-- <img :src="`/index/generateQRCode.php?qrtext=${href}${Games.href_sunbet}`" class="qrcode" > -->
             </div>
          </div>
       </a>
       <a class="real-game-item cfx">
          <div class="real-picpart fl">
             <img src="./images/og-mainpic.jpg">
             <div class="realgame-btns">
                <a class="game-btn play"  @click="open(Games.href_og, 'OG真人', 900, 640, true, islogin)">进入游戏</a>
             </div>
          </div>
          <div class="real-infopart fr">
             <h1 class="title">
               <span class="title-icon">
                  <img src="./images/og-logo.png">
               </span>
               OG真人&nbsp;>
             </h1>
             <p class="infomation">
                支持设备：电脑/手机网页版
             </p>
             <div class="real-deputypic cfx">
                <img src="./images/og-deputypic.jpg" class="phoneview">
                <!-- <img :src="`/index/generateQRCode.php?qrtext=${href}${Games.href_og}`" class="qrcode" > -->
             </div>
          </div>
       </a>
       <a class="real-game-item cfx">
          <div class="real-picpart fl">
             <img src="./images/bbin-mainpic.jpg">
             <div class="realgame-btns">
                <a class="game-btn play" @click="open(Games.href_bbin, 'BBIN真人', 900, 640, true, islogin)">进入游戏</a>
             </div>
          </div>
          <div class="real-infopart fr">
             <h1 class="title">
               <span class="title-icon">
                  <img src="./images/bbin-logo.png">
               </span>
               BBIN真人&nbsp;>
             </h1>
             <p class="infomation">
               支持设备：电脑/手机网页版
             </p>
             <div class="real-deputypic cfx">
                <img src="./images/bbin-deputypic.jpg" class="phoneview">
             </div>
          </div>
       </a>
        <a class="real-game-item cfx">
          <div class="real-picpart fl">
             <img src="./images/dg-mainpic.jpg">
             <div class="realgame-btns">
                <a class="game-btn play"  @click="open(Games.href_dg_pc, 'DG真人', 900, 640, true, islogin)">进入游戏</a>
             </div>
          </div>
          <div class="real-infopart fr">
             <h1 class="title">
               <span class="title-icon">
                  <img src="./images/dg-logo.png">
               </span>
               DG真人&nbsp;>
             </h1>
             <p class="infomation">
                支持设备：电脑/手机网页版
             </p>
             <div class="real-deputypic cfx">
                <img src="./images/dg-deputypic.jpg" class="phoneview">
                <!-- <img :src="`/index/generateQRCode.php?qrtext=${href}${Games.href_og}`" class="qrcode" > -->
             </div>
          </div>
       </a>
    </div>
  </div>
</template>
<script>
  import { Games ,Download} from "@/assets/data"
  import openWindow from '@/util/openWindow'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        Games,
        Download,
        href:window.location.origin
      };
    },
    props: {},
    methods: {
      open(url, title, w, h,needLogin ){
        if(needLogin){
          if(!this.islogin){
            window.toast('请先登录!')
            return
          }
        }
        openWindow(url, title, w, h)
      }
    },
    computed: {
      ...mapGetters(["islogin"])
    },
    created() {
    },
    components: {}
  };
</script>
<style lang="scss" scoped>
.real-container{
  background: #000 url(./images/real-bg.jpg) no-repeat center top;
  min-height: 990px;
  .real-content{
     width: 1145px;
     margin: 0 auto;
     padding: 440px 0 30px;
  }
  .real-game-item{
    display:inline-block;
    box-sizing:border-content;
    width: 1150px;
    height: 300px;
    background: url(./images/real-itembg.jpg) no-repeat center center;
    background-size:100% 100%;
    margin-bottom: 39px;
    border-radius:6px;
    overflow:hidden;
  }
  .real-picpart{
    width: 602x;
    margin:15px;
    position: relative;
    cursor: pointer;
    &:hover .realgame-btns {
      opacity: 1;
      transform: scale(1);
    }
    img{
      box-shadow:1px 1px 3px 3px #8a6424;
    }
  }
  .realgame-btns{
    position: absolute;
    top: 0px;
    bottom: 0px;
    left:0px;
    right: 0px;
    background: rgba(0, 0, 0, 0.6);
    opacity: 0;
    transform: scale(0);
    transition: all 0.4s;
    padding-top: 190px;
  }
  .realgame-btns .game-btn {
      display: block;
      width: 290px;
      height: 50px;
      line-height: 50px;
      color: #343434;
      font-size: 25px;
      margin: 0 auto 20px;
      text-align: center;
      border-radius:6px;
      background: rgb(255, 236, 183);
      /* Old browsers */
      background: -moz-linear-gradient(top, rgba(255, 236, 183, 1) 0%, rgba(255, 209, 120, 1) 100%);
      /* FF3.6-15 */
      background: -webkit-linear-gradient(top, rgba(255, 236, 183, 1) 0%, rgba(255, 209, 120, 1) 100%);
      /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(to bottom, rgba(255, 236, 183, 1) 0%, rgba(255, 209, 120, 1) 100%);
      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffecb7', endColorstr='#ffd178', GradientType=0);
      /* IE6-9 */
  }

  .real-infopart{
    width: 445px;
    height:270px;
    margin:15px;
    position:relative;
    .title{
        height: 60px;
        margin-bottom: 12px;
        font-size: 36px;
        font-weight: normal;
        color: #fff;
      }
    .title-icon{
        display: inline-flex;
        width: 198px;
        height: 60px;
        background: #fff;
        border-radius: 20em;
        text-align: center;
        align-items: center;
        justify-content: center;
        img{
          display:inline-block;
          max-width:198px;
          max-height:60px;
          height:auto;
          vertical-align: -webkit-baseline-middle;
        }
      }
    .infomation{
        font-size: 18px;
        color: #ffffff;
        height: 54px;
        line-height: 40px;
        border-top: 1px solid #a5824b;
        width: 93%;
      }
    .qrcode{
      display:inline-block;
      position:absolute;
      width:130px;
      height:130px;
      border:solid 5px #8a6424;
    }
    .phoneview{
      position:absolute;
      width:164px;
      height:94px;
      right: 46px;
      bottom: 12px;
    }
  }

  
}
</style>