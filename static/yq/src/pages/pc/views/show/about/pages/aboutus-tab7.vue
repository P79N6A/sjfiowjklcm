<template>
  <div class="content-info">
    <h2>防劫持说明</h2>
    <p class="cl-black">如果您使用移动设备访问我们网站的地址，打开网页后跳转至其他的网站。应该如何处理？</p>
    <p style="font-size:15px;">这是DNS劫持情况，DNS简称域名劫持，是属于被网络黑客利用了服务器的漏洞，更改了您的域名原IP，然后跳转到其他假网站。可能引起您失误操作，甚至会危害到您的账户和财产安全。</p>
    
    <h2>操作说明</h2>
    <p class="cl-green">1.下载【奇幻城官网手机APP]，操作方便快捷，再也不用担心上当受骗啦！</p>
    <div class="code-box">
      <img class="img-ios" src="./images/icon4.png" alt="">
      <img class="img-android" src="./images/icon3.png" alt="">
      <br/>
      <img class="img-code" src="/static/images/base/qrcode.png" alt="">
      <p>【扫一扫，即可下载天天领取朋友圈红包！】</p>
    </div>
    <p class="cl-green">2.如果您未下载官网APP,根据您使用的设备（苹果手机、安卓手机、电脑设备）进行以下设置操作。</p>
    <button v-for="(item,i) in option" :key="i" :class="{active:cur == item}" @click="cur = item">{{item}}</button>
    <div class="div-content cfx" v-show="cur == '苹果手机'">
      <div class="content-item-ios fl">
        <span class="num">1</span>
        <div class="text textone">打开您苹果手机里的"设置"</div>
        <img class="ios-img" src="./images/ios1.png" alt="">
        <img class="ios-arrow" src="./images/ios-arrow.png" alt="">
      </div>
      <div class="content-item-ios fl">
        <span class="num">2</span>
        <div class="text texttwo">打开后找到无线网络"Wi-Fi"</div>
        <img class="ios-img" src="./images/ios2.png" alt="">
        <img class="ios-arrow" src="./images/ios-arrow.png" alt="">
      </div>
      <div class="content-item-ios fl">
        <span class="num">3</span>
        <div class="text textthree">打开已连接的网络</div>
        <img class="ios-img" src="./images/ios3.png" alt="">
      </div>
      <div class="content-item-ios fl">
        <span class="num">4</span>
        <div class="text textfour">配置DNS</div>
        <img class="ios-img" src="./images/ios4.png" alt="">
        <img class="ios-arrow" src="./images/ios-arrow.png" alt="">
      </div>
      <div class="content-item-ios fl">
        <span class="num">5</span>
        <div class="text textfive">添加DNS 1 为8.8.8.8 <br> 添加DNS 2 为114.114.114.114 设置完成后点击存储</div>
        <img class="ios-img" src="./images/ios5.png" alt="">
      </div>
    </div>
    <div class="div-content cfx" v-show="cur == '安卓手机'">
      <div class="content-item-android fl">
        <span class="num">1</span>
        <div class="text textone">打开您安卓手机里的"设置"</div>
        <img class="ios-img" src="./images/android1.png" alt="">
        <img class="ios-arrow" src="./images/ios-arrow.png" alt="">
      </div>
      <div class="content-item-android fl">
        <span class="num">2</span>
        <div class="text texttwo">打开后找到无线网络"Wi-Fi"</div>
        <img class="ios-img" src="./images/android2.png" alt="">
        <img class="ios-arrow" src="./images/ios-arrow.png" alt="">
      </div>
      <div class="content-item-android fl">
        <span class="num">3</span>
        <div class="text textthree">打开已连接的网络</div>
        <img class="ios-img" src="./images/android3.png" alt="">
      </div>
      <div class="content-item-android fl">
        <span class="num">4</span>
        <div class="text textfour">打开静态IP</div>
        <img class="ios-img" src="./images/android4.png" alt="">
        <img class="ios-arrow" src="./images/ios-arrow.png" alt="">
      </div>
      <div class="content-item-android fl">
        <span class="num">5</span>
        <div class="text textfive">添加DNS 1 为8.8.8.8 <br> 添加DNS 2 为114.114.114.114 <br>点击"保存"</div>
        <img class="ios-img" src="./images/android5.png" alt="">
      </div>
    </div>
    <div class="div-content cfx" v-show="cur == '电脑设备'">
      <div class="content-item-win fl">
        <div class="win-text"><span class="win-num">1</span>点击网络,打开"网络和Internet"设置</div>
        <img class="win-img" src="./images/win1.png" alt="">
        <img class="win-arrow" src="./images/ios-arrow.png" alt="">
      </div>
      <div class="content-item-win fl">
        <div class="win-text"><span class="win-num">2</span>点击以太网 > 更改适配器选项</div>
        <img class="win-img" src="./images/win2.png" alt="">
      </div>
      <div class="content-item-win fl">
        <div class="win-text"><span class="win-num">3</span>双击以太网</div>
        <img class="win-img" src="./images/win3.png" alt="">
        <img class="win-arrow" src="./images/ios-arrow.png" alt="">
      </div>
      <div class="content-item-win fl">
        <div class="win-text"><span class="win-num">4</span>点击属性</div>
        <img class="win-img" src="./images/win4.png" alt="">
      </div>
      <div class="content-item-win fl">
        <div class="win-text text-other"><span class="win-num num-other">5</span>找到并点击"internet协议版本(TCP/IPv4)" > 属性</div>
        <img class="win-img" src="./images/win5.png" alt="">
        <img class="win-arrow" src="./images/ios-arrow.png" alt="">
      </div>
      <div class="content-item-win fl">
        <div class="win-text text-other"><span class="win-num num-other">6</span>添加DNS 1 为8.8.8.8 <br> 添加DNS 2 为114.114.114.114</div>
        <img class="win-img" src="./images/win6.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import { SETTING } from "@/assets/data";

export default {
  name: "",
  data() {
    return {
      SETTING,
      cur: "电脑设备",
      // cur : 'ios',
      // option:[{en:'ios',ch:'苹果手机'},
      //         {en:'android',ch:'安卓手机'},
      //         {en:'win',ch:'电脑设备'}]
      option: ["电脑设备", "苹果手机", "安卓手机"]
    };
  },
  props: {},
  computed: {},
  watch: {},
  methods: {},
  created() {},
  activated() {},
  components: {}
};
</script>
<style lang='scss' spcoed>
.cl-black {
  color: #000;
  font-size: 15px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
}
.cl-green {
  color: #42a042;
  font-weight: bold;
  font-size: 15px;
}
.code-box {
  // padding-left: 158px;
  text-align: center;
  width: 500px;
  .img-ios {
    margin-right: 10px;
    // margin-left: 40px;
  }
  .img-code {
    margin-top: 15px;
    // display: block;
    width: 140px;
    // margin: 10px auto 0;
  }
}
button {
  // background: url(./images/tab.png) no-repeat center;
  background: #4db7f4;
  width: 149px;
  height: 44px;
  color: #ffffff;
  font-size: 22px;
  margin-left: 40px;
  margin-top: 30px;
  position: relative;
  outline: 0;
  &.active {
    // background: url(./images/tab-active.png) no-repeat center;
    background: #68f968;
    color: #fff;
    &::before {
      content: "";
      position: absolute;
      left: 50%;
      bottom: -20px;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 20px solid #4db7f4;
    }
  }
}
.div-content {
  margin-top: 19px;
  background-color: #4db7f4;
  border-radius: 10px;
  padding: 20px 146px;
  .content-item-ios {
    width: 29%;
    height: 500px;
    background: url(./images/ios-bg.png) no-repeat center center/100% 100%;
    position: relative;
    margin-bottom: 50px;
    padding: 74px 20px;
    &:nth-child(3n - 1) {
      margin: 0 6%;
    }
  }
  .content-item-android {
    width: 29%;
    height: 500px;
    background: url(./images/android-bg.png) no-repeat center center/100% 100%;
    position: relative;
    margin-bottom: 50px;
    padding: 51px 9px 50px 10px;
    &:nth-child(3n - 1) {
      margin: 0 6%;
    }
  }
  .num {
    position: absolute;
    left: -8px;
    top: -10px;
    width: 55px;
    height: 55px;
    line-height: 54px;
    border-radius: 50%;
    background-color: #9a6d44;
    font-size: 36px;
    text-align: center;
    border: 1px solid #ffffff;
    color: #fff;
  }
  .ios-arrow {
    position: absolute;
    top: 50%;
    right: -40px;
    transform: translateY(-50%);
  }
  .text {
    position: absolute;
    left: -10px;
    bottom: 0px;
    width: 260px;
    height: 78px;
    background-color: #9a6d44;
    border: 1px solid #ffffff;
    border-radius: 10px;
    text-align: center;
    font-size: 22px;
    padding: 0 16px;
    color: #fff;
    &.textthree {
      line-height: 78px;
    }
    &.textfour {
      line-height: 78px;
    }
    &.textfive {
      font-size: 16px;
      text-align: left;
    }
  }
  .content-item-win {
    width: 48%;
    height: 350px;
    position: relative;
    &:nth-child(2n) {
      margin-left: 4%;
    }
    .win-text {
      background-color: #9a6d44;
      font-size: 20px;
      position: relative;
      border: 1px solid #ffffff;
      border-radius: 10px;
      padding: 2px 0px 2px 50px;
      margin-bottom: 20px;
      color: #fff;
      &.text-other {
        height: 55px;
        line-height: 1.2;
        border-radius: 20px 10px 10px 20px;
      }
      .win-num {
        position: absolute;
        left: -10px;
        top: -10px;
        width: 55px;
        height: 55px;
        line-height: 54px;
        border-radius: 50%;
        background-color: #9a6d44;
        font-size: 36px;
        text-align: center;
        border: 1px solid #ffffff;
        &.num-other {
          top: 0;
        }
      }
    }
    .win-img {
      width: 100%;
      height: 230px;
    }
    .win-arrow {
      position: absolute;
      top: 50%;
      right: -30px;
      transform: translateY(-50%);
    }
  }
}
</style>
