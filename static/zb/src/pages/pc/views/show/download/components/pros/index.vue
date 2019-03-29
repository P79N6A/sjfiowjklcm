<template>
  <div class="col left content-container left">
    <div class="content-block bounceInRight animated" v-show="cur == 'AG'">
      <h2 class="title">AG真人娱乐APP</h2>
      <div class="description">无视空间，时间，随时随地体验AG真人游戏</div>
      <h3 class="sub-title">支持机型</h3>
      <div class="device">
        <!-- <a class="iphone active">
            <img src="./images/IOS1.png">
            <span>iPhone</span>
        </a>-->
        <a class="android">
          <img src="./images/Android1.png">
          <span>Android</span>
        </a>
      </div>
      <h3 class="sub-title">下载方式</h3>
      <div class="download-block">
        <div class="col s4 left">请使用设备默认浏览器打开下列网址，即可自动下载。
          <br>
          <br>
          <br>
          <a target="_blank" :href="Download.agMobile">
            <u>立即下载</u>
          </a>
        </div>
        <div class="col s8 right">
          <div class="qrcode">
            <img :src="generateQRCode(Download.agMobile,140)">
          </div>
          <div class="qrcode-msg">
            <u>扫描二维码，即可快速下载</u>
            <br>
            <br>
            <!-- <span></span>iOS 安装教程</a> -->
          </div>
        </div>
      </div>
    </div>
    <div class="content-block bounceInRight animated" v-show="cur == 'APP'">
      <h2 class="title">众博娛樂手机APP</h2>
      <div class="description">原生态应用，操作体验完胜业界其他产品。全面支持手机在线存款、提款、转账等功能。 体育投注真人娱乐城、快乐彩等产品完美覆盖</div>
      <h3 class="sub-title">支持机型</h3>
      <div class="device">
        <a class="iphone active">
          <img src="./images/IOS1.png">
          <span>iPhone</span>
        </a>
        <a class="android">
          <img src="./images/Android1.png">
          <span>Android</span>
        </a>
      </div>
      <h3 class="sub-title">下载方式</h3>
      <div class="download-block">
        <div class="col s4 left">请使用设备默认浏览器打开下列网址，即可自动下载。
          <br>
          <br>
          <br>
          <!-- <a target="_blank" :href="Download.app"><u>立即下载</u></a> -->
        </div>
        <div class="col s8 right">
          <div class="qrcode">
            <img :src="generateQRCode(Download.app,140)">
            <!-- <img src="/static/images/waiting.png"> -->
          </div>
          <div class="qrcode-msg">
            <u>扫描二维码，即可快速下载</u>
            <br>
            <br>
            <!-- <router-link class="teachBtn col" :to="{name:'downloadTch'}"> iOS 安装教程</router-link> -->
          </div>
        </div>
      </div>
    </div>
    <div class="content-block bounceInRight animated" v-show="cur == 'DT'">
      <h2 class="title">DT老虎机APP</h2>
      <div class="description">Dream Tech 让全世界沉浸在快乐里，致力打造贴合国人文化背景的游戏。细腻的游戏画面，美妙的音乐，唤起玩家沉睡已久的童年记忆。</div>
      <div class="sub-description">注意：DT电脑和手机客户端登录需在账号前加大写字母"ZO"。
        <br>例如：众博娛樂账号bol001，登录DT客户端需输入"AObol001"
      </div>
      <h3 class="sub-title">支持机型</h3>
      <div class="device">
        <a class="iphone active">
          <img src="./images/IOS1.png">
          <span>iPhone</span>
          <div class="qrcode">
            <img
              style="padding:6px;background:#fff;margin-top:10px;"
              :src="generateQRCode(Download.dtIos,140)"
            >
          </div>
        </a>
        <a class="android">
          <img src="./images/Android1.png">
          <span>Android</span>
          <div class="qrcode">
            <img
              style="padding:6px;background:#fff;margin-top:10px;"
              :src="generateQRCode(Download.dtAndroid,140)"
            >
          </div>
        </a>
      </div>
      <h3 class="sub-title">下载方式</h3>
      <div class="download-block">
        <div class="col s4 left">请使用手机扫一扫相应二维码，即可自动下载。
          <br>
          <br>
          <br>
          <!-- <a target="_blank" :href="Download.app"><u>立即下载</u></a> -->
        </div>
      </div>
    </div>
    <div class="content-block bounceInRight animated" v-show="cur == 'PT'">
      <h2 class="title">PT游戏客户端下载</h2>
      <div
        class="description"
      >PlayTech电子游戏平台商自1999年面世至今，提供的产品十分广泛，拥有经认可的检测机构BMM international 和TST颁发的评估证书，并且还是远程电娱协会（RGA）的成员，拥有奥尔德尼岛电娱管理委员会（AGCC）颁发的官方预核证书。同时playtech也得到了代表英国电娱的主要贸易联合会ABB的认证。</div>
      <div class="sub-description">注意：PT电脑和手机客户端登录需在账号前加大写字母"ZO"。
        <br>例如：众博娛樂账号bol001，登录PT客户端需输入"AObol001"
      </div>
      <h3 class="sub-title">下载方式</h3>
      <div class="download-block">
        <div class="col s4 left">
          <a class="pc-downLink" :href="Download.ptpc" target="_blank">电脑版下载</a>
          <a class="android-downLink">安卓手机版本下载</a>
        </div>
        <div class="col s8 right">
          <div class="qrcode">
            <img :src="generateQRCode(Download.ptMobile,140)">
          </div>
          <div class="qrcode-msg">
            <u>扫描二维码，即可快速下载</u>
          </div>
        </div>
      </div>
    </div>
    <div class="content-block bounceInRight animated" v-show="cur == 'LG'">
      <h2 class="title">LG游戏客户端下载</h2>
      <div
        class="description"
      >Lengend Gaming（下简称LG）成立于2016年。凭借着联合创始人的专业经验和团队的惊艳作品，LG一经上市就已取得优异成绩，获得业界同行认可。LG老虎机游戏自2016年上线以来，一直深受玩家的喜爱，凭借丰富刺激的游戏和精致的游戏设计，在玩家圈中一直保持着良好的口碑。</div>
      <div class="sub-description">注意：LG电脑和手机客户端登录需在账号前加大写字母"ZO"。
        <br>例如：众博娛樂账号bol001，登录PT客户端需输入"AObol001"
      </div>
      <h3 class="sub-title">下载方式</h3>
      <div class="download-block">
        <div class="col s4 left">
          <a class="pc-downLink" :href="Download.lg" target="_blank">电脑版下载</a>
          <a class="android-downLink">手机版本下载</a>
        </div>
        <div class="col s8 right">
          <div class="qrcode">
            <img :src="generateQRCode(href+Download.lg,140)">
          </div>
          <div class="qrcode-msg">
            <u>扫描二维码，即可快速下载</u>
          </div>
        </div>
      </div>
    </div>
    <div style="clear:both"></div>
  </div>
</template>
<script>
import { generateQRCode } from "@/api/show";
import { SETTING, WEBCONFIG, Download } from "@/assets/data";
export default {
  name: "",
  data() {
    return {
      SETTING,
      WEBCONFIG,
      Download,
      cur: "APP",
      href:null
      // data:['PT客户端','AG客户端']
    };
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    generateQRCode(url, size) {
      return generateQRCode(url, size);
    }
  },
  created() {
    // this.generateQRCode("text");
    this.$bus.$on("getDownloadPage", eventData => {
      this.cur = eventData;
    });
    this.href = window.location.origin
  },
  activated() {},
  components: {}
};
</script>
<style lang="scss" scoped>
.content-container {
  width: 47%;
  margin-top: 75px;
  margin-left: -15px;
  .content-block {
    color: #efefef;
    a {
      color: #efefef;
    }
    .title {
      font-size: 36px;
      color: #fff;
      &:after {
        content: "";
        display: block;
        width: 60px;
        height: 1px;
        margin-top: 20px;
        background: #efefef;
      }
    }
    .sub-title {
      font-size: 18px;
      margin-top: 45px;
    }
    .sub-description {
      font-size: 12px;
      margin-top: 10px;
      font-size: 16px;
    }
    .prefixBlock {
      margin-top: 10px;
      background: #fff;
      padding: 10px;
      border-radius: 5px;
      .preLeft {
        color: #2293fc;
      }
      .preRight {
        margin-left: 20px;
        color: #787878;
      }
    }
    .device a {
      display: inline-block;
      border: 1px solid #efefef;
      border-radius: 5px;
      padding: 10px 20px;
      margin-right: 15px;
      > * {
        vertical-align: middle;
      }
    }
    .download-block {
      .col {
        padding-left: unset !important;
      }
      .pc-downLink {
        color: #2293fc;
        background: #fff;
      }
      .android-downLink,
      .pc-downLink {
        display: inline-block;
        border: 1px solid #efefef;
        border-radius: 50px;
        padding: 10px 20px;
        margin-right: 15px;
        margin-top: 14px;
        width: 170px;
        text-align: center;
      }
      .right {
        border-left: 1px solid #efefef;
        .qrcode {
          background-color: hsla(0, 0%, 100%, 0) !important;
          background-image: url(./images/qrcode2.png) !important;
          background-repeat: no-repeat !important;
          display: inline-block;
          width: 123px;
          height: 123px;
          background: #fff;
          border-radius: 10px;
          text-align: center;
          line-height: 122px;
          margin-left: 10px;
          float: left;
          img {
            width: 80px;
            height: 80px;
            vertical-align: middle;
          }
        }
        .qrcode-msg {
          margin-left: 10px;
          display: inline-block;
          height: 123px;
          text-align: center;
          float: left;
          .teachBtn {
            margin-top: 39px;
          }
        }
      }
    }
  }
}
</style>
