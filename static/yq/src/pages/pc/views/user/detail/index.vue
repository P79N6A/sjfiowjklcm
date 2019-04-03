<template>
  <div class="user-detail cfx">
    <div class="welfareItem">
      <div class="welfareItemLeft">
        <div class="title">您享有【{{userData.level}}专属福利】</div>
        <div class="welfareItemcontent">
          <p>每月免费筹码：
            <span class="red">{{welfare.free}}</span>元
          </p>
          <p>每年生日礼金：
            <span class="red">{{welfare.birthday}}</span>元
          </p>
          <p>专属福利：扫描右方二维码咨询您的
            <span class="red">专属客服</span>申请
          </p>
          <p>奇幻城女郎：达到要求将赠与您指定的“
            <span class="red">玩伴</span>”
          </p>
        </div>
      </div>
      <div class="welfareItemRight">
        <div class="info">
          <p>您的专属客服：
            <br>
            <span class="red">{{userData.wechatAccount}}</span>
          </p>
          <p>上班时间为：
            <br>每周一至周六
            <br>10点-19点
          </p>
        </div>
        <div class="qrcode">
          <img v-lazy="userData.introIMG" alt>
        </div>
      </div>
    </div>
    <div class="moneyItem">
      <div class="moneyItemLeft">
        <div class="item">
          <p>主账户余额：</p>
          <p>
            <span class="red">{{wallet['MAIN']}}元</span>
            <i
              class="iconfont icon-shuaxin"
              :class="{xuanzhuan:actived==true}"
              @click="getGameMoney('MAIN')"
            ></i>
          </p>
        </div>
        <div class="item">
          <p>副账户彩金余额：</p>
          <p>
            <span class="red">{{wallet['DEPUTY']}}元</span>
            <i
              class="iconfont icon-shuaxin"
              :class="{xuanzhuan:actived==true}"
              @click="getGameMoney('DEPUTY')"
            ></i>
          </p>
        </div>
        <div class="item">
          <a href="javascript:void(0);" @click="dialogFormVisible=true;" class="btn">各平台余额查询</a>
        </div>
      </div>
      <div class="moneyItemRight">
        <router-link :to="{name:'deposit'}" class="btn">
          <img src="./images/deposit.png" alt>
          充值
        </router-link>
        <router-link :to="{name:'drawmoney'}" class="btn">
          <img src="./images/drawmoney.png" alt>
          取款
        </router-link>
        <router-link :to="{name:'transfer'}" class="btn">
          <img src="./images/transfer.png" alt>
          转账
        </router-link>
      </div>
    </div>
    <el-table :data="betList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="180px"></el-table-column>
      <el-table-column prop="platform" label="游戏平台"></el-table-column>
      <el-table-column prop="bet" label="投注额"></el-table-column>
    </el-table>
    <div class="user-tip">
      <p>温馨提示：</p>
      <p>1、本表格数据为当月数据，每月月底23:59分后系统将会清数据。</p>
      <p>2、每日非时时数据更新，显示数据皆为前一天数据。</p>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" width="830px" v-if="dialogFormVisible">
      <moneys></moneys>
    </el-dialog>
  </div>
</template>
<script>
import {
  getBetUpgrateVO // 获取晋级要求
} from "@/api/preferential-terms";
import moneys from "./components/moneys";
import { findCommonConfig, getGameMoney } from "@/api/user";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      betList: [],
      dialogFormVisible: false,
      actived: false,
      welfare: {
        qr: "/static/images/wechatQr/CS1.png",
        name: "lkl9990595",
        birthday: "2888",
        free: "588",
        gift: "敬请期待"
      }
    };
  },
  methods: {
    ...mapActions(["LOGIN_OUT", "UPDATE_MONEY"]),
    getGameMoney(val) {
      this.actived = !this.actived;
      this.UPDATE_MONEY(val)
        .then(res => {
          this.actived = !this.actived;
        })
        .catch(err => {
          toast(res.message);
        });
    },
    getWelfare() {
      findCommonConfig().then(res => {
        if (
          this.userData.intro &&
          res.wechat[this.userData.intro.toLowerCase()]
        ) {
          this.welfare.qr = res.wechat[this.userData.intro.toLowerCase()].qr;
          this.welfare.name =
            res.wechat[this.userData.intro.toLowerCase()].name;
        } else {
          this.welfare.qr = res.wechat.default.qr;
          this.welfare.name = res.wechat.default.name;
        }
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
    },
    getVipInfo(obj) {
      getBetUpgrateVO(obj).then(res => {
        if (res.success) {
          this.betList = res.data.betList;
        }
      });
    }
  },
  computed: {
    ...mapGetters(["wallet", "userData"])
  },
  components: { moneys },
  created() {
    this.getWelfare();
    this.getVipInfo();
  }
};
</script>
<style lang="scss" scoped>
.user-detail {
  background: #f1f1f1;
  .welfareItem {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .welfareItemLeft {
      width: 500px;
      height: 210px;
      border-radius: 5px;
      border: 1px solid #bfbfbf;
      .title {
        background: #4db7f4;
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: 20px;
        line-height: 2.242;
        font-weight: bold;
      }
      .welfareItemcontent {
        font-size: 16px;
        font-family: "Microsoft YaHei";
        color: rgb(29, 29, 29);
        line-height: 2.5;
        text-align: left;
        padding-left: 42px;
      }
    }
    .welfareItemRight {
      background: #4db7f4;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 382px;
      padding-left: 30px;
      border-radius: 5px;
      .info {
        flex: 2;
        p {
          font-size: 16px;
          font-family: "Microsoft YaHei";
          color: rgb(255, 255, 255);
          line-height: 1.7;
          text-align: left;
          margin-bottom: 10px;
        }
      }
      .qrcode {
        flex: 3;
        img {
          width: 195px;
        }
      }
    }
  }
  .moneyItem {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    background: #4db7f4;
    border-radius: 5px;
    height: 115px;
    .moneyItemLeft {
      width: 513px;
      border-right: 1px solid #fff;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .item {
        &:nth-child(1) {
          width: 160px;
          padding-left: 30px;
        }
        &:nth-child(2) {
          width: 170px;
        }
        &:nth-child(3) {
          width: 180px;
        }
        p {
          color: #fff;
          font-size: 18px;
          line-height: 1.7;
        }
        .btn {
          border-radius: 10px;
          background-image: -moz-linear-gradient(
            90deg,
            rgb(170, 106, 31) 0%,
            rgb(227, 161, 83) 100%
          );
          background-image: -webkit-linear-gradient(
            90deg,
            rgb(170, 106, 31) 0%,
            rgb(227, 161, 83) 100%
          );
          background-image: -ms-linear-gradient(
            90deg,
            rgb(170, 106, 31) 0%,
            rgb(227, 161, 83) 100%
          );
          background-image: linear-gradient(
            0deg,
            rgb(170, 106, 31) 0%,
            rgb(227, 161, 83) 100%
          );
          box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);
          width: 159px;
          height: 38px;
          color: #fff;
          font-size: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .moneyItemRight {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 390px;
      .btn {
        border-radius: 10px;
        background-image: -moz-linear-gradient(
          90deg,
          rgb(170, 106, 31) 0%,
          rgb(227, 161, 83) 100%
        );
        background-image: -webkit-linear-gradient(
          90deg,
          rgb(170, 106, 31) 0%,
          rgb(227, 161, 83) 100%
        );
        background-image: -ms-linear-gradient(
          90deg,
          rgb(170, 106, 31) 0%,
          rgb(227, 161, 83) 100%
        );
        background-image: linear-gradient(
          0deg,
          rgb(170, 106, 31) 0%,
          rgb(227, 161, 83) 100%
        );
        box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);
        width: 111px;
        height: 38px;
        color: #fff;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          margin-right: 5px;
        }
      }
    }
  }
  .home-head {
    margin-bottom: 20px;
    .quick-entry {
      height: 104px;
      width: 568px;
      padding: 20px 40px 0;
      border-radius: 5px;
      color: #fff;
      background: -webkit-gradient(
        linear,
        left bottom,
        left top,
        from(#e2c084),
        to(#dab267)
      );
      background: -webkit-linear-gradient(bottom, #e2c084 0%, #dab267 100%);
      background: -o-linear-gradient(bottom, #e2c084 0%, #dab267 100%);
      background: linear-gradient(0deg, #e2c084 0%, #dab267 100%);
    }

    .icon-cont {
      float: left;
      width: 60px;
      height: 60px;
      margin-right: 20px;
      background: url(./images/pocket.png) no-repeat center;
    }

    .account-balance {
      p {
        margin-bottom: 5px;
      }

      .balance-detail {
        display: inline-block;
        width: 40px;
        height: 20px;
        line-height: 18px;
        margin-left: 10px;
        font-size: 12px;
        border: 1px solid #fff;
        border-radius: 3px;
        cursor: pointer;
      }

      .credit {
        font-size: 24px;
        color: #333;
        max-width: 180px;
        overflow: hidden;
      }
    }

    .btns {
      a {
        display: block;
        width: 120px;
        height: 30px;
        line-height: 28px;
        border-radius: 5px;
        border: 1px solid #fff;
        text-align: center;
        letter-spacing: 5px;
        cursor: pointer;

        &:first-child {
          margin-bottom: 8px;
        }
      }
    }

    .integral-balance-cont {
      width: 310px;
      height: 104px;
      padding: 20px 0 0 20px;
      border-radius: 5px;
      background: #fff;
      border: 1px solid #e1dacd;
    }

    .icon-cont-bg2 {
      background: url(./images/jf.png) no-repeat center;
    }

    .account-balance {
      float: left;
      font-size: 14px;
    }

    .credit {
      font-size: 24px;
      color: #fefefe;
      max-width: 180px;
      overflow: hidden;
    }
  }
}
.red {
  color: #ff0000;
}
@keyframes rotateImg {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes rotateImg {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
.xuanzhuan {
  &.icon-shuaxin:before {
    -webkit-animation: rotateImg 1s linear infinite;
    animation: rotateImg 1s linear infinite;
    display: inline-block;
  }
}
</style>
