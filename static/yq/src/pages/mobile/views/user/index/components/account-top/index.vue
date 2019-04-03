<template>
  <div class="userTop">
    <div class="header-cont">
      <div class="vip-cont">
        <div id="vip-box2">
          <img v-lazy="userData.avator">
        </div>
        <div class="tips">
          <p>欢迎您！{{userData.loginname}}</p>

          <!--<h1>昵称：234</h1>-->
          <p>等级：{{userData.level}}</p>
          <p class="signbtn" @click="doSignRecord">点击签到</p>
        </div>
      </div>
      <div class="private-qrcode">
        <div class="code-box" @click="showImg = true">
          <img class="code-img" v-lazy="userData.introIMG">
        </div>
        <div class="tips">
          <p>微信专属客服二维码
            <br>工作时间:周一至周六 10:00-19:00
          </p>
        </div>
      </div>
    </div>
    <div class="summary">
      <span>主账户余额:{{wallet['MAIN']}}</span>
      <router-link :to="{name:'balance'}">
        <span class="menu-text">查看各平台余额</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
    </div>
    <div class="transfer-all" @click="transferAll">
      <span class="iconcent ct-jiantou"></span>
      资金一键归回主账户
    </div>

    <!-- 图片 -->
    <div class="overlay1" v-show="showImg" @click="showImg =false">
      <div class="overlay-model1">
        <div class="overlay-panel1">
          <img v-lazy="userData.introIMG" style="width:100%">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getGuestbookCountNew } from "@/api/show";
import { doSignRecord } from "@/api/user";
import { updateGameMoney } from "@/api/payment";
import { SETTING } from "@/assets/data";
export default {
  data() {
    return {
      SETTING,
      newMsg: false,
      showSheet: false,
      value1: false,
      sheetData: [
        { name: "在线客服" },
        { name: "电话回拨" },
        {
          name: "400-2312314",
          method() {}
        }
      ],
      showImg: false
    };
  },
  props: {
    value: {
      default: false
    }
  },
  watch: {
    value(val) {
      this.showSheet = val;
    },
    showSheet(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    loadData() {
      getGuestbookCountNew().then(res => {
        //未读消息
        this.newMsg = res.data > 0;
      });
    },
    doSignRecord() {
      doSignRecord().then(res => {
        window.toast(res.message);
      });
    },
    transferAll() {
      window
        .$confirm(
          '<p style="text-align:left;">1.游戏平台余额只会回收整数部分。<br/>2.领取优惠但未完成流水的游戏余额不会被归集。<br/>3.资金归集可能需要较长时间，请耐心等待。</p>',
          "温馨提示",
          {
            confirmText: "确认",
            cancelText: "取消"
          }
        )
        .then(
          () => {
            // 确认，发出归集请求
            window.setTimeout(() => {
              const postData = {
                transferGameOut: "ALL_V2",
                transferGameIn: "MAIN",
                transferGameMoney: 0
              };
              // 查看进度按钮
              updateGameMoney(postData)
                .then(res => {
                  if (res.success) {
                    this.$bus.$emit("showTransferProce", true);
                    window.toast(res.message);
                  } else {
                    window.toast(res.message);
                  }
                })
                .catch(err => {
                  window.toast(err.message);
                });
            }, 300);
          },
          () => {
            // 取消，查看订单
          }
        );
    }
  },
  created() {},
  activated() {
    this.showImg = false;
  },
  components: {
    // sheet
  },
  computed: {
    ...mapGetters(["userData", "islogin", "isUser", "unread", "wallet"])
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.userTop {
  overflow: hidden;
  background: url(./images/top-bg.png) no-repeat;
  background-size: 100% 100%;
  .header-cont {
    display: flex;
    justify-content: space-between;
    padding: r(20) r(80);
    > div {
      width: 50%;
      text-align: center;
      color: #fff;
      padding: r(20) 0;
      img {
        display: inline-block;
        max-width: 100%;
        margin-bottom: r(10);
      }
      .tips {
        line-height: 1.6;
        @include f(28px);
      }
      .signbtn {
        border: 1px solid #fff;
        border-radius: r(20);
        display: inline-block;
        padding: 0 r(10);
      }
    }
    .private-qrcode {
      border-left: solid 1px rgba(0, 0, 0, 0.2);
      .code-img {
        width: r(160);
      }
    }
  }
  .summary {
    display: flex;
    justify-content: space-between;
    color: #fff;
    background: rgba(0, 0, 0, 0.2);
    line-height: r(80);
    @include f(30px);
    padding: 0 r(20);
  }
  .transfer-all {
    text-align: center;
    background: #44a7e0;
    color: #fff;
    line-height: r(80);
    @include f(30px);
  }
}
.overlay1 {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.9);
  .overlay-model1 {
    width: 80%;
    // height: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    .overlay-panel1 {
      height: 90%;
      overflow-y: auto;
      padding: r(30);
      line-height: 1.8;
      @include f(28px);
    }
  }
}
</style>
