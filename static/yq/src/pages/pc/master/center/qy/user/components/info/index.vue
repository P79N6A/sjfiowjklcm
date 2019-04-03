<template>
  <div class="userInfo-cont">
    <div class="personal-tag">
      <img src="./images/tag.png">
    </div>
    <div class="basic-info-cont">
      <div class="topBox clear">
        <div class="vip-icon-cont">
          <img class="u-avator" v-lazy="userData.avator">
          <!-- <i class="vip-sprite level_0"></i> -->
        </div>
        <div class="vip-level-cont">
          <p class="login-name">{{userData.loginname}}</p>
          <p class="aitem">
            <router-link :to="{name:'vipIndex'}" id="linkVip">
              {{userData.level}}
              <i class="fs iconfont icon-huangguan1"></i>
            </router-link>
            <a href="javascript:void(0);" @click="signIt" class="signBtn">签到</a>
          </p>
        </div>
      </div>
      <div>
        <ul class="js-info-link info-link clear">
          <li data-type="3">
            <router-link :to="{name:'datum'}">
              <i class="iconfont icon-icon"></i>
              <br>个人资料
            </router-link>
          </li>
          <li data-type="4">
            <router-link :to="{name:'banks'}">
              <i class="iconfont icon-yinxingqia"></i>
              <br>银行卡资料
            </router-link>
          </li>

          <li data-type="5">
            <router-link :to="{name:'message'}">
              <span class="email-cont iconfont icon-youjian">
                <s class="circle js-email-count">{{unread}}</s>
              </span>
              <br>站内信
            </router-link>
          </li>
        </ul>
      </div>
      <div class="js-private-qrcode private-qrcode">
        <div>
          <img class="code-img" v-lazy="userData.introIMG">
        </div>
        <div class="tips">
          <p>微信专属客服二维码
            <br>工作时间:周一至周六
            <br>早上10点-晚上7点
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { WEBCONFIG, SETTING } from "@/assets/data";
import { getGameMoney, doSignRecord } from "@/api/user";
import { generateQRCode } from "@/api/show";

export default {
  data() {
    return {
      WEBCONFIG,
      SETTING,
      welfare: {
        qr: "/static/images/wechatQr/CS1.png",
        name: "lkl9990595",
        birthday: "2888",
        free: "588",
        gift: "敬请期待"
      }

      // level:["普通会员","青铜会员","白银会员","黄金会员","铂金会员","钻石会员"]
    };
  },
  props: {},
  methods: {
    ...mapActions(["LOGIN_OUT", "UPDATE_MONEY"]),
    signIt() {
      doSignRecord().then(res => {
        toast(res.message);
      });
    }
  },
  computed: {
    ...mapGetters(["userData", "isUser", "unread", "wallet"])
  },
  created() {
    // this.getVipInfo(this.userData);
  }
};
</script>
<style lang="scss" scoped>
.userInfo-cont {
  background: #fff;
  width: 100%;
  padding: 0 15px;
  border-bottom: 1px solid #dfdfdf;
  .personal-tag {
    height: 33px;
    text-align: right;
  }
  .basic-info-cont {
    padding: 0 15px 15px;
    .topBox {
      display: flex;
      // flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }
    .vip-icon-cont {
      float: left;
      width: 120px;
      height: 80px;
      border-radius: 50%;
      img {
        display: block;
        width: 100%;
      }
    }
    .vip-level-cont {
      float: left;
      margin-left: 15px;
      padding-top: 10px;
      font-size: 16px;
      .login-name {
        margin-bottom: 10px;
        // text-align: center;
      }
      // .aitem{
      //   display: flex;
      //   justify-content: space-between;
      //   align-items: center;
      // }
      #linkVip {
        display: inline-block;
        margin-bottom: 10px;
        i {
          margin-right: 5px;
          font-size: 20px;
          vertical-align: bottom;
        }
      }
      .signBtn {
        padding: 3px 10px;
        color: #fff;
        background: #4db7f4;
        border-radius: 20px;
        border: 1px solid #4db7f4;
        outline: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        font-size: 14px;
        text-align: center;
        // border-radius: 10px;
        // background-image: -moz-linear-gradient( 90deg, rgb(170,106,31) 0%, rgb(227,161,83) 100%);
        // background-image: -webkit-linear-gradient( 90deg, rgb(170,106,31) 0%, rgb(227,161,83) 100%);
        // background-image: -ms-linear-gradient( 90deg, rgb(170,106,31) 0%, rgb(227,161,83) 100%);
        // background-image: linear-gradient( 0deg, rgb(170,106,31) 0%, rgb(227,161,83) 100%);
        // box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);
        // width: 111px;
        // height: 38px;
        // color: #fff;
        // font-size: 16px;
        // text-align: center;
        // cursor: pointer;
        // display: flex;
        // justify-content: center;
        // align-items: center;
      }
    }
    .info-link {
      li {
        float: left;
        width: 33.333%;
        margin: 20px auto;
        text-align: center;
        a {
          transition: all 0.3s;
          display: block;
          height: 100%;
          width: 100%;
          span,
          i {
            font-size: 24px;
            color: #4db7f4;
          }
          .email-cont {
            position: relative;
            .circle {
              position: absolute;
              top: 0;
              right: -12px;
              width: 16px;
              height: 16px;
              line-height: 16px;
              border-radius: 50%;
              background: #ed0000;
              font-size: 10px;
              font-weight: bold;
              text-align: center;
              text-decoration: none;
              color: #fff;
            }
          }
        }
      }
    }
    .private-qrcode {
      width: 200px;
      margin: 0 auto;
      text-align: center;
      .code-img {
        width: 190px;
        height: 190px;
        margin-left: -8px;
        border: 10px #fff solid;
      }
      .tips {
        margin-top: 5px;
        color: #44a7e0;
      }
    }
  }
}
</style>
