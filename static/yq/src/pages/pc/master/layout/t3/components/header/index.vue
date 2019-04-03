<template>
  <header class="header">
    <div class="top-navbar">
      <ul class="login_after tools clear">
        <li>
          <a href="/static/page/newTutorial/index.html" class="btn_onekeytranfer">新手指南</a>
        </li>
        <li>
          <i class="iconfont icon-qingchuhuancun"></i>
          <a
            href="javascript:;"
            onclick="alert('[提示]开始进行缓存清除，完毕后将会刷新网站！');window.location.reload(true);"
          >清除缓存</a>
        </li>
        <li>
          <i class="iconfont icon-zuikuaixianlu"></i>
          <router-link :to="{name:'domains'}" target="_blank">最快线路</router-link>
        </li>
      </ul>
      <before v-if="!islogin"></before>
      <after v-if="islogin"></after>
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
      nowTime: "",
      personNum: null
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
    showTime() {
      let _this = this;
      setInterval(function() {
        let today = new Date();
        let yyyy = today.getFullYear();
        let MM = today.getMonth() + 1;
        let dd = today.getDate();
        let hh = today.getHours();
        let mm = today.getMinutes();
        let ss = today.getSeconds();
        let shiqu = -today.getTimezoneOffset() / 60;
        if (shiqu > 0) {
          shiqu = "+" + shiqu;
        }
        MM = _this.checkTime(MM);
        dd = _this.checkTime(dd);
        mm = _this.checkTime(mm);
        ss = _this.checkTime(ss);
        let day;
        if (today.getDay() == 0) day = "星期日";
        if (today.getDay() == 1) day = "星期一";
        if (today.getDay() == 2) day = "星期二";
        if (today.getDay() == 3) day = "星期三";
        if (today.getDay() == 4) day = "星期四";
        if (today.getDay() == 5) day = "星期五";
        if (today.getDay() == 6) day = "星期六";
        _this.nowTime =
          "GMT" +
          shiqu +
          "  " +
          yyyy +
          "-" +
          MM +
          "-" +
          dd +
          " " +
          hh +
          ":" +
          mm +
          ":" +
          ss +
          "  ";
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
    const $this = this;
    this.timer = setInterval(() => {
      var num1 = Math.floor(Math.random() * 5) * 1000;
      var num2 = Math.floor(Math.random() * 10) * 100;
      var num3 = Math.floor(Math.random() * 10) * 10;
      var num4 = Math.floor(Math.random() * 10) * 1;
      $this.personNum = (18000 + num1 + num2 + num3 + num4).toString();
    }, 3000);
  },
  components: {
    before,
    after
  }
};
</script>
<style lang="scss" scoped>
.header {
  height: 50px;
  background: #1d1d1d;
}

.top-navbar {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  .login_after.tools {
    float: left;

    li {
      height: 50px;
      margin-right: 10px;
      float: left;
      line-height: 50px;
      color: #fff;
      display: flex;
      align-items: center;

      i {
        font-size: 22px;
        margin-right: 5px;
        vertical-align: sub;
      }

      a {
        color: #fff;
      }

      .btn_onekeytranfer {
        background: rgba(77, 183, 244, 1); /* Old browsers */
        background: -moz-linear-gradient(
          top,
          rgba(77, 183, 244, 1) 0%,
          rgba(89, 219, 208, 1) 100%
        ); /* FF3.6-15 */
        background: -webkit-linear-gradient(
          top,
          rgba(77, 183, 244, 1) 0%,
          rgba(89, 219, 208, 1) 100%
        ); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(
          to bottom,
          rgba(77, 183, 244, 1) 0%,
          rgba(89, 219, 208, 1) 100%
        ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4db7f4', endColorstr='#59dbd0',GradientType=0 ); /* IE6-9 */
        color: #fff;
        display: block;
        width: 80px;
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
    }
  }

  .clear:after {
    content: "";
    display: block;
    clear: both;
  }
}
</style>
