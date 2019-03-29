<template>
  <header class="header">
    <div class="top-navbar">
      <div class="container">
        <div class="hide-on-small-only left top-login-block">
          <span class="time">美东时间{{nowTime}}|</span>
          <a id="qrcodeMobileLink" href="javascript:void(0);" style="color: #3ec1fe;">
            <img src="./images/phone_d.png">手机客户端 |
            <div id="qrcodeMobile">
              <div class="center-align">
                <!-- <span>敬请期待</span> -->
                <img :src="generateQRCode(Download.app,140)">
                <!-- <img src="/static/images/base/app.png" alt=""> -->
              </div>
            </div>
          </a>
          <a target="_blank" :href="SETTING.live800" class="kefu">
            <i class="iconay ay-xiaotuziCduan-"></i>
            在线客服 |
          </a>
          <router-link :to="{name:'domains'}" target="_blank" class="kefu">域名检测 |</router-link>
          <a href="javascript:void(0);" @click="AddFavorite()" class="kefu">
            收藏网址 |
          </a>
          <a href="javascript:void(0);" @click="setIndex($event)" class="kefu">
            设为首页 |
          </a>
          <a href="javascript:;" @click="cleanCach()" class="kefu">
            清除缓存
          </a>
          <span id="volumeBlock">
            <div class="volume" title="Set volume" style="display: none">
              <span class="volumeBar" style="width: 50%;"></span>
            </div>
          </span>
        </div>
        <before v-if="!islogin"></before>
        <after v-if="islogin"></after>
      </div>
    </div>
  </header>
</template>
<script>
import before from "./component/before";
import after from "./component/after";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { SETTING, Download } from "@/assets/data";
import openWindow from "@/util/openWindow";
import { getNewAnnouncement } from "@/api/show";
import { getGameMoney } from "@/api/user";
import { generateQRCode } from "@/api/show";
export default {
  data() {
    return {
      SETTING,
      Download,
      showPass: false,
      showQRcode: false,
      isShowLoginModal: false,
      nowTime: ""
    };
  },
  computed: {
    ...mapGetters(["userData", "islogin", "isAgent", "isUser", "showLogin"])
  },
  methods: {
    ...mapActions(["UPDATE_USERDATA"]),
    toCs() {
      openWindow(SETTING.live800, "在线客服", 700, 640);
    },
    generateQRCode(url, size) {
      return generateQRCode(url, size);
    },
    AddFavorite() {
       let title = '众博娱乐'
       let url = location.href
        try {
          console.log('1');
          window.external.addFavorite(url, title);
        }
        catch (e) {
            try {
                console.log('2');
                window.sidebar.addPanel(title, url, "");
            }
            catch (e) {
          console.log('3');
                window.toast("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
            }
        }
    },
    setIndex(e) {
      let obj = e.target,
        url = window.location.origin;
      try {
        obj.style.behavior = "url(#default#homepage)";
        obj.setHomePage(url);
      } catch (e) {
        if (window.netscape) {
          try {
            netscape.security.PrivilegeManager.enablePrivilege(
              "UniversalXPConnect"
            );
          } catch (e) {
            window.toast(
              "抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'"
            );
          }
        } else {
          window.toast(
            "抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【" +
              url +
              "】设置为首页。"
          );
        }
      }
    },
    cleanCach(){
        let firstLocation = window.location.href.split("?v=")[0]; 
        window.location.replace(firstLocation + "?v=" + Math.random());
      },
    registerIt() {
      this.$bus.$emit("showRegister", true);
      console.log("ToshowRegister");
    },
    showQR() {
      this.showQRcode = true;
    },
    hideQR() {
      this.showQRcode = false;
    },
    getLocalTime(i) {
      // https://www.cnblogs.com/manfredHu/p/4523640.html
      //参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
      if (typeof i !== "number") return;
      var d = new Date();
      //得到1970年一月一日到现在的秒数
      var len = d.getTime();
      //本地时间与GMT时间的时间偏移差
      var offset = d.getTimezoneOffset() * 60000;
      //得到现在的格林尼治时间
      var utcTime = len + offset;
      // console.log(new Date(utcTime + 3600000 * i));
      return new Date(utcTime + 3600000 * i);
    },
    showTime() {
      let _this = this;
      setInterval(() => {
        let today = _this.getLocalTime(-5);
        let yyyy = today.getFullYear();
        let MM = today.getMonth() + 1;
        let dd = today.getDate();
        let hh = today.getHours();
        let mm = today.getMinutes();
        let ss = today.getSeconds();

        MM = _this.checkTime(MM);
        dd = _this.checkTime(dd);
        mm = _this.checkTime(mm);
        ss = _this.checkTime(ss);
        _this.nowTime =
          yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss + "  ";
      }, 1000);
    },
    checkTime(val) {
      if (val < 10) {
        val = "0" + val;
      }
      return val;
    }
  },
  created() {
    // 更新一次用户信息
    this.UPDATE_USERDATA()
      .then(res => {})
      .catch(err => {});
    this.showTime();
    this.generateQRCode("text");
  },
  components: {
    before,
    after
  }
};
</script>
<style lang="scss" scoped>
.top-navbar {
  background-color: #151620;
  position: relative;
  z-index: 999;
  .container {
    height: 40px;
    line-height: 25px;
    position: relative;
    .top-login-block {
      margin-top: 5px;
    }
    .time {
      color: #3ec1fe;
    }
    .kefu {
      color: #3ec1fe;
      .iconay {
        font-size: 18px;
        vertical-align: middle;
      }
    }
    #qrcodeMobileLink {
      &:hover {
        #qrcodeMobile {
          display: inline-block;
        }
      }
    }
    #qrcodeMobile {
      display: none;
      position: absolute;
      top: 12px;
      left: 188px;
      transform: translateX(-22%);
      width: 190px;
      height: 190px;
      background-color: hsla(0, 0%, 100%, 0) !important;
      background-image: url(./images/mobile_down.png) !important;
      background-repeat: no-repeat !important;
      background-size: cover;
      img {
        margin-top: 10px;
        margin-right: 0px;
        width: 80px;
        height: 80px;
      }
      div:not(:first-child) {
        margin-top: 82px;
        margin-right: 87px;
        span {
          color: #2293fc !important;
        }
      }
      div {
        position: absolute;
        top: 39%;
        margin: 0 auto;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .volume {
      position: relative;
      display: inline-block;
      cursor: pointer;
      width: 100px;
      height: 15px;
      top: 5px;
      background-color: hsla(0, 0%, 100%, 0.4);
    }
    .volumeBar {
      height: 15px;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #fff;
      z-index: 10;
      width: 100px;
    }
  }
}
</style>
