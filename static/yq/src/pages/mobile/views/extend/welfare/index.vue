<template>
  <div class="welfare">
    <!-- {{welfare}} -->
    <img class="title1" src="./images/title1.png">
    <p class="title-level">您享有《{{userData.level}}专属福利》</p>
    <table class="welfare-table">
      <tr>
        <td>
          <img src="./images/ico3.png">
          <p class="text">
            免费筹码
            <span class="red">{{welfare.free}}</span>元
            <br>可直接提款
          </p>
        </td>
        <td>
          <img src="./images/ico2.png">
          <p class="text">生日礼金
            <br>
            <span class="red">{{welfare.birthday}}</span>元
          </p>
        </td>
        <td>
          <img src="./images/ico1.png">
          <p class="text">{{welfare.gift}}</p>
        </td>
      </tr>
    </table>

    <div class="welfare-box cfx">
      <div class="fl">
        <img src="./images/title2.png">
        <p class="tips">请扫描右方二维码</p>
        <p class="tips">咨询您的专属客服申请</p>
        <p class="tips">微信号：{{userData.wechatAccount}}</p>
      </div>
      <div class="fr" @click="showImg =true">
        <img class="qr-code" :src="userData.introIMG">
      </div>
    </div>

    <div class="welfare-box cfx">
      <router-link :to="{name:'girls'}">
        <img src="./images/girls.jpg">
      </router-link>
    </div>

    <!-- 图片放大 -->
    <div class="overlay1" v-show="showImg" @click="showImg =false">
      <div class="overlay-model1">
        <div class="overlay-panel1">
          <img :src="userData.introIMG" style="width:100%">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SETTING } from "@/assets/data";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { getNewAnnouncement } from "@/api/show";
import { findCommonConfig } from "@/api/user";

export default {
  data() {
    return {
      SETTING,
      welfare: {
        // qr: "/static/images/wechatQr/DEFAULT.png",
        // name: "奇幻城官网微信",
        birthday: "0",
        free: "0",
        gift: "敬请期待"
      },
      showImg: false
    };
  },
  methods: {
    getWelfare() {
      findCommonConfig().then(res => {
        // 设置福利信息
        if (res.welfare[this.userData.levelNumber]) {
          this.welfare.birthday =
            res.welfare[this.userData.levelNumber].birthday;
          this.welfare.free = res.welfare[this.userData.levelNumber].free;
          this.welfare.gift = res.welfare[this.userData.levelNumber].gift;
        } else {
          this.welfare.birthday = res.welfare.default.birthday;
          this.welfare.free = res.welfare.default.free;
          this.welfare.gift = res.welfare.default.gift;
        }
      });
    }
  },
  created() {
    this.$store.dispatch("UPDATE_USERDATA").then(() => {
      this.getWelfare();
    });
  },
  activated() {
    this.showImg = false;
  },
  computed: {
    ...mapGetters(["userData"])
  }
};
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";

.welfare {
  width: 100%;
  height: 17.5rem;
  background: url(./images/bg.jpg) top center no-repeat #0d0200/contain;
  text-align: center;
  img {
    max-width: 100%;
  }
  .title1 {
    width: 75%;
    padding-top: r(50);
  }
  .title-level {
    color: #fcf980;
    background-image: -webkit-gradient(
      linear,
      0 0,
      0 bottom,
      from(#fcf980),
      to(#d0ac2e)
    );
    @include f(45px);
    font-weight: bold;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding-top: r(30);
  }
  .welfare-table {
    table-layout: fixed;
    width: 95%;
    margin: r(30) auto;
    background: url(./images/menu.png) no-repeat;
    background-size: 100% 100%;
    color: #fff;
    td {
      padding: r(20) 0;
    }
    img {
      height: r(100);
      display: inline-block;
      margin-bottom: r(20);
    }
    .text {
      @include f(28px);
      line-height: 1.2;
    }
  }

  .red {
    color: #ff0000;
    font-weight: bold;
  }
  .welfare-box {
    position: relative;
    border: solid 1px #666;
    border-radius: r(6);
    width: 95%;
    margin: r(30) auto;
    .fl,
    .fr {
      width: 50%;
      padding: r(20);
      color: #fff;
      .tips {
        text-align: left;
        line-height: 1.5;
        @include f(30px);
        padding-left: r(60);
      }
    }
    .qr-code {
      width: r(250);
    }
    a {
      display: block;
    }
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
