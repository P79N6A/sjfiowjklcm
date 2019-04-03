<template>
  <div>
    <!-- <back-header></back-header> -->
    <div class="hijacking">
      <div class="hijacking-bg">
        <p class="hijacking-title">
          <i class="icot"></i> 防劫持说明 <i class="icot"></i>
        </p>
        <p class="grunt">如果您使用移动设备访问我们网站的地址，打开网页后跳转至其他的网站。应该如何处理？</p>
        <p class="white">这是DNS劫持情况，DNS简称域名劫持，是属于被网络黑客利用了服务器的漏洞，更改了您的域名原IP,然后跳转到其他假网站。可能引起您失误操作，甚至会危害到您的账户和财产安全。</p>
        <p class="hijacking-title">
          <i class="icot"></i> 操作说明 <i class="icot"></i>
        </p>
        <p class="grunt">1.下载【奇幻城官网手机APP]，操作方便快捷，再也不用担心上当受骗啦！</p>
        <p class="app" style="text-align:center;"><a :href="Download.app" target="_blank"><img src="./images/app.png"></a></p>
        <p class="grunt"><a :href="Download.app" target="_blank">【点击下载，即可下载天天领取朋友圈红包！】</a></p>
        <p class="grunt">2.如果您未下载官网APP,根据您使用的设备（苹果手机、安卓手机）进行以下设置操作。</p>

        <div class="hijacking-tabs">
          <span v-for="item in data" :key="item" :class="{active:cur==item}" @click="cur=item">
            {{item}} 
          </span>
        </div>
        
        <div class="content-info" v-show="cur=='苹果手机'">
          <img src="./images/苹果.png" alt="">
        </div>
        <div class="content-info" v-show="cur=='安卓手机'">
          <img src="./images/安卓.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getNewAnnouncement } from "@/api/show";
import { Download } from "@/assets/data";

export default {
  data() {
    return {
      Download,
      cur: "苹果手机",
      data: ["苹果手机", "安卓手机"]
    };
  },
  components: {
    // 'back-header': require("components/header-back"),
  }
};
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";

.hijacking {
  width: 100%;
  height: 100%;
  background: url(./images/bg.png) no-repeat center top;
  background-size: 100% 100%;
  padding: r(25) r(20);
  display: flex;
  .hijacking-bg {
    background: url(./images/bg2.png) no-repeat center;
    background-size: 100% 100%;
    padding: r(40);
    .hijacking-title {
      @include f(30px);
      color: #fafc45;
      text-align: left;
      height: r(40);
      margin: r(60) r(0) r(0) r(0);
      font-weight: 600;
      .icot {
        display: inline-block;
        width: r(20);
        height: r(20);
        background: url(./images/dian.png) no-repeat;
        background-size: 100%;
      }
    }
    .grunt {
      line-height: r(40);
      color: #68f968;
      @include f(27px);
      text-align: left;
      font-weight: 600;
    }
    .white {
      color: #fff;
      line-height: r(40);
      @include f(28px);
      text-align: left;
      text-indent: r(50);
      font-weight: 600;
    }
    .hijacking-tabs {
      width: 100%;
      height: r(180);
      display: flex;
      font-size: r(40);
      span {
        color: #fff;
        display: block;
        background: url(./images/bot.png) no-repeat;
        background-size: 100% 100%;
        margin: r(50) r(20) r(50) r(20);
        width: 47%;
        padding-top: r(20);
        text-align: center;
        &.active {
          background: url(./images/hove.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .content-info img {
      width: 100%;
    }
  }
}
</style>
