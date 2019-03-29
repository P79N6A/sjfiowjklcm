<template>
  <transition name="fade">
    <div class="leftTool" v-show="isshow">
      <router-link :to="{name:'vIndex'}" class="top1">VIP尊享</router-link>
      <router-link :to="{name:'promosIndex'}" class="top2">自助优惠申请</router-link>
      <div class="top3">
        <!-- <img :src="generateQRCode(href)" alt=""> -->
        <img :src="generateQRCode(Download.app)" alt="">
        <!-- <img src="/static/images/base/app.png" alt=""> -->
      </div>
      <router-link :to="{name:'downloadIndex'}" class="top4"><img src="./images/iph.png" alt="">APP下载</router-link>
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
    width: 137px;
    height: 369px;
    background: url('./images/bg.png') no-repeat;
    background-size: cover;
    background-position: top center;
    position: fixed;
    top: 26vh;
    // top: 50%;
    // transform: translateY(-50%);
    left: 20px;
    z-index: 999;
    .top1 {
      display: block;
      // height: 64px;
      line-height: 64px;
      color: #fff000;
      font-size: 26px;
      padding-left: 5px;
      text-align: center;
      padding-top: 60px;
      img {
        width: 48px;
      }
    }
    .top2 {
      display: block;
      height: 64px;
      line-height: 64px;
      color: #fff000;
      font-size: 20px;
      text-align: center;
    }
    .top3 {
      text-align: center;
      padding: 10px 0;
      img {
        width: 100px;
        border: 2px solid #fff;
      }
    }
    .top4 {
      display: block;
      padding-left: 5px;
      color: #fff000;
      font-size: 18px;
      padding-top: 5px;
      img {
        margin-right: 4px;
      }
    }
    .close {
      background: url('./images/close.png') no-repeat;
      background-size: contain;
      background-position: center;
      position: absolute;
      width: 112px;
      height: 34px;
      display: block;
      right: 13px;
      cursor: pointer;
      bottom: -32px;
    }
  }

</style>
