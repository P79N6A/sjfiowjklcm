<template>
  <transition name="fade">
    <div class="leftTool" v-show="isshow">
      <p class="welcome">欢迎光临</p>
      <p class="line">
        <img src="./images/line.png" alt="">
      </p>
      <p class="imgItem">
        <img :src="generateQRCode(href)">
        <span class="qrTips">手机WEB版</span>
      </p>
      <p class="line">
        <img src="./images/line.png" alt="">
      </p>
      <p class="btns">
        <!-- <router-link :to="{name:'aboutIndex'}" class="btnRoute">注册送体验金</router-link> -->
        <a href="javascript:void(0);" class="btnRouteAgent" @click="$bus.$emit('showRegister', true)"></a>
        
        <router-link :to="{name:'promosIndex'}" class="btnRoute">优惠活动</router-link>
      </p>
      <p class="logos">
        <img src="./images/logo.png" alt="">
      </p>
      <i class="close" @click="isshow = false"></i>
    </div>
  </transition>
</template>
<script>
  import {SETTING,Download,WEBCONFIG} from "@/assets/data"
  import check from "@/util/RegExp"
  import {scrolltool} from "@/vue-extend/scrolltool"
  import {backCall} from "@/controls/common/backCall"
  import {generateQRCode} from "@/api/show"
  export default {
    mixins: [scrolltool, backCall],
    name: "",
    data() {
      return {
        SETTING,
        showMyself: true,
        ishover: true,
        Download,
        hover: false,
        isshow: true,
        href: window.location.origin + '/mobile',
      }
    },
    methods: {
      generateQRCode(url, size) {
        return generateQRCode(url, size)
      }
    },
  }

</script>
<style lang="scss" scoped>
  .leftTool {
    width: 106px;
    height: 378px;
    background: url('./images/bg.png') no-repeat;
    background-size: cover;
    background-position: top center;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    z-index: 999;

    .welcome {
      font-size: 22px;
      font-family: "Microsoft YaHei";
      font-weight: bold;
      line-height: 1.2;
      text-align: center;
      color: #fbf687;
      padding-top: 40px;
    }

    .href {
      font-size: 18px;
      font-family: "Microsoft YaHei";
      line-height: 1.2;
      text-align: center;
      color: #fbf687;

    }

    .line {
      width: 100%;
      text-align: center;
    }

    .imgItem {
      width: 100%;
      text-align: center;
      img {
        width: 82%;
        border: 1px solid #fff;
      }
      .qrTips {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        line-height: 1.7;
        text-align: center;
        color: #fbf687;
        display: block;

      }
    }

    .btns {
      text-align: center;

      .btnRoute {
        background-image: -moz-linear-gradient(90deg, rgb(200, 143, 60) 0%, rgb(239, 210, 84) 100%);
        background-image: -webkit-linear-gradient(90deg, rgb(200, 143, 60) 0%, rgb(239, 210, 84) 100%);
        background-image: -ms-linear-gradient(90deg, rgb(200, 143, 60) 0%, rgb(239, 210, 84) 100%);
        background-image: linear-gradient(90deg, #c88f3c 0%, #efd254 100%);
        display: block;
        margin: 0 auto 5px;
        width: 89px;
        height: 23px;
        font-family: "PingFangSC";
        line-height: 1.7;
        text-shadow: 0px 1px 0px rgba(255, 230, 88, 0.004);
        text-align: center;
        color: #48290d;
        font-size: 14px;
        border-radius: 20px;
        font-weight: bold;
      }
      
      .btnRouteAgent{
        background: url('./images/regist.gif');
        background-size: cover;
        background-position: top center;
        display: block;
        margin: 0 auto 5px;
        width: 89px;
        height: 23px;
        font-family: "PingFangSC";
        line-height: 1.7;
        text-shadow: 0px 1px 0px rgba(255, 230, 88, 0.004);
        text-align: center;
        color: #48290d;
        font-size: 14px;
        border-radius: 20px;
        font-weight: bold;
      }
    }


    .logos {
      margin-top: 10px;
      text-align: center;

      img {
        width: 60%;
        margin: 0 auto;
      }
    }

    .close {
      background: url('./images/close.png') no-repeat;
      background-size: contain;
      background-position: center;
      position: absolute;
      width: 20px;
      height: 20px;
      display: block;
      right: -5px;
      cursor: pointer;
      bottom: -5px;
    }
  }

</style>
