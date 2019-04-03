<template>
  <div class="alert-tips" v-show="show" @click.self="close">
    <div class="modal-dialog">
      <div class="huodong-box">
        <div class="quick-login">
          <h2 class="com-title">★快速登录</h2>
          <div class="username">
            <input
              type="text"
              v-model="loginData.account"
              id="loginname1"
              maxlength="15"
              placeholder="请输入用户名"
              required
            >
          </div>
          <div class="password">
            <input
              type="password"
              v-model="loginData.password"
              id="password1"
              maxlength="16"
              placeholder="请输入密码"
              required
            >
          </div>
          <div class="valid">
            <input
              type="text"
              v-model="loginData.imageCode"
              id="imageCode1"
              maxlength="4"
              placeholder="请输入验证码"
              required
            >
            <a href="javascript:void(0)" @click="GET_VALIDATE">
              <img class="verifyImg" :src="validateImage">
            </a>
          </div>
          <input type="hidden" id="code1">
          <div class="login-btn-container">
            <a id="loginBtn" @click="login();">登陆</a>
          </div>
          <div class="login-btn-container">
            <a href="javasctipt:void(0);" id="regBtn" @click="gotoregist">注册</a>
          </div>
          <div class="qrcode">
            <!-- <img :src="generateQRCode(Download.app,140)" alt=""> -->
            <img src="/static/images/base/qrcode.png" alt>
          </div>
        </div>
        <div>
          <div class="huodong-box-text">
            <h3 class="activity-tit tc" id="h3" v-html="title"></h3>
            <div class="text1" id="nr" v-html="conent"></div>
          </div>
          <div class="reg-tip">
            <div
              class="tishi-tip"
              id="ts"
            >近期有不法分子冒用和劫持奇幻城网站进行诱骗，请大家不要上当受骗。奇幻城绝无与其他公司合作合并。请认准官网：【qhc118.com】了解应对措施，点击
              <p>
                <router-link class="btn" :to="{name:'aboutIndex',params:{tab:'tab7'}}">防域名劫持教程</router-link>进行查看。
              </p>
            </div>
          </div>
        </div>
        <div class="quick-promotion">
          <h2 class="com-title">★本月最新优惠</h2>
          <ul class="pro-intro">
            <li v-for="item in promoArr" :key="item.id">
              <a :href="item.activityUrl" v-if="item.activityUrl != ''">
                <img :src="item.activityImageUrl" alt>
              </a>
              <a href="javascript:void(0);" @click="gotopromo(item.id)" v-else>
                <img :src="item.activityImageUrl" alt>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="close" @click="close" data-dismiss="modal" aria-hidden="true"></div>
    </div>
  </div>
</template>
<script>
import { checkConfigSystem, generateQRCode } from "@/api/show";
import { $localStorage, $sessionStorage } from "@/util/storage";
import { loginControl } from "@/controls/auth/loginControl"; // 引入公共业务逻辑
import { promos } from "@/controls/shows/promos";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { Download } from "@/assets/data";
export default {
  mixins: [promos, loginControl],
  data() {
    return {
      Download,
      myData: {
        itemNo: "type002", //true string
        typeNo: "001"
      },
      title: "",
      conent: "",
      show: false,
      loginData: {
        account: "",
        password: "",
        imageCode: ""
      },
      promoArr: []
    };
  },
  watch: {},
  props: {},
  activated() {},
  methods: {
    generateQRCode(url, size) {
      return generateQRCode(url, size);
    },
    ...mapMutations(["GET_VALIDATE"]),
    login() {
      this.loginSubmit(this.loginData)
        .then(res => {
          this.show = false;
          $sessionStorage.set("index_alert", true);
          if (res.data.role == "AGENT") {
            this.$router.push({ name: "agent_summary" });
          } else {
            this.$router.push({ name: "deposit" });
          }
          window.toast(res.message);
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    },
    gotopromo(id) {
      this.$router.push({ name: "promosIndex", query: { showid: id } });
      this.show = false;
    },
    close() {
      this.show = false;
      $sessionStorage.set("index_alert", true);
    },
    gotoregist() {
      this.$router.push({ name: "registerPage" });
      this.show = false;
    }
  },

  computed: {
    ...mapGetters([
      "validateImage",
      "userData",
      "isUser",
      "isAgent",
      "unread",
      "money",
      "wallet"
    ])
  },
  created() {
    this.generateQRCode("text");
    if (!$sessionStorage.get("index_alert")) {
      checkConfigSystem(this.$data)
        .then(res => {
          if (res.success) {
            var arydata = res.data.split("#");
            this.title = arydata[0];
            this.conent = arydata[1];
            this.show = true;
          }
        })
        .catch(err => {});
    }
    this.getPromos("pc")
      .then(res => {
        // 设置菜单
        // this.$bus.$emit("setProMenu", res.data.types);
        if (res.data.records.length > 3) {
          this.promoArr = res.data.records.slice(0, 3);
        } else {
          this.promoArr = res.data.records;
        }
      })
      .catch(err => {
        window.toast(err.message);
      });
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.alert-tips {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  .modal-dialog {
    width: 947px;
    height: 571px;
    background: none;
    margin: 50px auto;
    position: relative;
    .close {
      position: relative;
      top: -571px;
      right: -649px;
      width: 65px;
      height: 65px;
      cursor: pointer;
      float: left;
    }
  }
  .huodong-box {
    position: relative;
    padding: 143px 11px 11px 11px;
    width: 100%;
    height: 100%;
    display: flex;
    background: url(./images/activity-modal5.png) center center no-repeat;
    .quick-login {
      margin-right: 11px;
      margin-left: 4px;
      padding: 22px 11px 0;
      position: relative;
      .com-title {
        margin: 15px 0 4px 0;
        font-size: 23px;
        font-weight: bold;
        color: #4db7f4;
        text-align: center;
      }
      div {
        margin-bottom: 8px;
        input {
          border: 1px solid #4db7f4;
          padding: 4px;
        }
      }
      .valid {
        display: flex;
        input {
          border: 1px solid #4db7f4;
          padding: 2px;
          width: 94px;
        }
      }
      .login-btn-container {
        display: inline-block;
        width: 42%;
        margin-left: 5%;
        cursor: pointer;
        a {
          display: block;
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          color: #fff;
          background: #4db7f4;
          border: none;
        }
      }
      .qrcode {
        position: absolute;
        bottom: 36px;
        left: 31px;
        img {
          width: 140px;
          height: 140px;
        }
      }
    }
    .huodong-box-text {
      width: 480px;
      height: 270px;
      overflow: hidden;
      float: left;
      h3 {
        font-size: 32px;
        font-weight: 900;
        margin: 30px 10px 0;
        color: #4db7f4;
      }
      .text1 {
        height: 210px;
        overflow: auto;
        color: #640004;
        line-height: 35px;
        font-size: 16px;
        text-align: left;
        padding: 20px 0;
      }
    }
    .reg-tip {
      position: absolute;
      top: 427px;
      left: 350px;
      width: 350px;
      line-height: 1.6;
      height: 128px;
      padding-top: 20px;
      overflow: hidden;
      font-size: 16px;
      .icon-tip {
        position: absolute;
        left: 8px;
        top: 8px;
        border: 4px solid #ed7b1a;
        span {
          display: block;
          width: 44px;
          height: 36px;
          text-align: center;
          border: 1px solid #fff;
          background: #ed7b1a;
          color: #fff;
          padding-top: 8px;
        }
      }
      .tishi-tip {
        padding: 2px;
        overflow: hidden;
        height: 100px;
        color: #fff;
        text-align: left;
        font-size: 14px;
        font-weight: bold;
        .btn {
          background: #4db7f4;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          /* line-height: 1.7; */
          border-radius: 5px;
          font-weight: bold;
          margin-right: 5px;
          cursor: pointer;
          padding: 0 5px;
        }
        p {
          text-align: center;
          padding-right: 80px;
        }
      }
    }
    .quick-promotion {
      padding: 12px;
      .pro-intro li {
        margin-bottom: 6px;
        border-radius: 5px;
        img {
          width: 100%;
          height: 106px;
        }
      }
      .com-title {
        margin: 5px auto;
        font-size: 24px;
        font-weight: bold;
        color: #4db7f4;
        text-align: center;
      }
    }
  }
}
.fade {
  opacity: 0;
  filter: alpha(opacity=0);
  -webkit-transition: opacity 0.15s linear;
  transition: opacity 0.15s linear;
  &.in {
    filter: alpha(opacity=100);
    opacity: 1;
    .modal-dialog {
      -ms-transform: translate(0, 0);
      transform: translate(0, 0);
    }
  }
  .modal-dialog {
    -webkit-transition: -webkit-transform 0.3s ease-out;
    transition: transform 0.3s ease-out;
    -ms-transform: translate(0, -25%);
    transform: translate(0, -25%);
  }
}
</style>
