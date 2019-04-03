<template>
  <div class="transferBox">
    <div class="transfer">
      <div class="head-top">
        <div class="top-money">
          {{wallet['MAIN']}}
          <br>
          <span>主账户余额</span>
          <br>
          <span class="transferall" @click="transferAll">资金一键归户</span>
        </div>
      </div>

      <div class="inputs">
        <h4>来源账户</h4>
        <!-- <select v-model="data.transferGameOut"> -->
        <select v-model="selectOut">
          <option value>请选择平台</option>
          <option v-for="(item,i) in Money" :value="item" :key="i">{{item.name}}</option>
        </select>
        <p>{{wallet[data.transferGameOut]}}</p>
      </div>

      <div class="inputs">
        <h4>目标账户</h4>
        <!-- <select v-model="data.transferGameIn"> -->
        <select v-model="selectIn">
          <option value>请选择平台</option>
          <option
            v-for="(item,k) in filterMoney"
            :value="item"
            :key="k"
            v-if="item.value!=data.transferGameOut"
          >{{item.name}}</option>
        </select>
        <p>{{wallet[data.transferGameIn]}}</p>
      </div>

      <div class="inputs">
        <h4>转账金额</h4>
        <input v-model.number="data.transferGameMoney" placeholder="请输入转账金额">
      </div>

      <div class="user-personal-update-btn">
        <button class="btn" @click="transfer">转账</button>
      </div>

      <form-tip>
        <p>1、请在户内转账前进行平台激活方可转账成功。</p>
        <p>2、登录PT游戏客户端时请前缀{{WEBCONFIG.PtBefore}}，例如，游戏账号为{{WEBCONFIG.name}}001，请在登录PT客户端时，需在账号处填写{{WEBCONFIG.PtBefore}}{{WEBCONFIG.name}}001，方可正常登录进入游戏。</p>
        <p>3、需要申请首存的玩家，申请成功前请勿在此进行转账，请进入会员中心——自助存送优惠，进行申请操作，否则错过无法再次申请。</p>
      </form-tip>
    </div>
  </div>
</template>
<script>
import { updateGameMoney, getTransferOnceProgress } from "@/api/payment";
import { getGameMoney } from "@/api/user";
import { platformData, Money, WEBCONFIG, otherMoney } from "@/assets/data";
import { transfer } from "@/controls/money/transfer";
import { mapGetters, mapActions, mapMutations } from "vuex";
import openWindow from "@/util/openWindow";
import formTip from "mobile/components/form-tip1";
import headernNobackground from "mobile/components/head-nobackground";
import headerBack2 from "mobile/master/t1/page-in";
export default {
  mixins: [transfer],
  data() {
    return {
      otherMoney,
      WEBCONFIG,
      step: 1,
      Money,
      newMoney: [],
      gamelen: "",
      showIn: true,
      data: {
        transferGameOut: "",
        transferGameIn: "",
        transferGameMoney: ""
      },
      isxuanzhuan: false,
      filterMoney: Money,
      selectOut: "",
      selectIn: "",
      jumpType: "",
      href: "",
      name: ""
    };
  },
  methods: {
    ...mapActions(["UPDATE_MONEY"]),
    open(url, title, w, h, needLogin, loginState) {
      openWindow(url, title, w, h, needLogin, loginState);
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
    },
    transfer() {
      this.transferSubmit(this.data)
        .then(res => {
          //从主账户/副账户转至游戏平台 成功后去对应的游戏大厅
          if (
            this.data.transferGameOut == "MAIN" ||
            this.data.transferGameOut == "DEPUTY"
          ) {
            window
              .$confirm(res.message, "提示", {
                confirmText: "去游戏大厅",
                cancelText: "关闭"
              })
              .then(
                () => {
                  if (this.jumpType == "slot") {
                    this.$router.push({
                      name: "slotgame",
                      params: {
                        type: this.jumpType,
                        flag: true,
                        plat: this.data.transferGameIn
                      }
                    });
                  } else {
                    if (this.data.transferGameIn == "DTQP") {
                      this.$router.push({
                        name: "chessHall",
                        params: { type: "DTQP" }
                      });
                    } else {
                      this.open(
                        this.href,
                        this.name,
                        900,
                        640,
                        true,
                        this.islogin
                      );
                    }
                  }
                },
                () => {}
              );
          } else {
            window
              .$confirm(res.message, "提示", {
                confirmText: "我要提款",
                cancelText: "关闭"
              })
              .then(
                () => {
                  this.$router.push({ name: "money_drawmoney" });
                },
                () => {}
              );
          }
          // this.step = 2;
        })
        .catch(err => {
          window.toast(err.message);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    refresh(val) {},
    chooseIt(item) {
      this.data.transferGameOut = item.value;
      this.isxuanzhuan = true;
    }
  },
  computed: {
    ...mapGetters(["userData", "isUser", "unread", "wallet", "islogin"])
    // filterMoney() {
    //   return this.Money.filter((item)=>{
    //     return item.value!=this.data.transferGameOut ;
    //   })
    // }
  },
  created() {
    console.log(this.Money);
  },
  watch: {
    "data.transferGameOut"(val) {
      if (val == "MAIN" || val == "DEPUTY") {
        this.filterMoney = otherMoney;
      } else {
        this.filterMoney = [{ name: "主账户", value: "MAIN" }];
      }
    },
    "data.transferGameIn"(val) {
      this.data.transferGameMoney = "";
    },
    selectOut(val) {
      this.data.transferGameOut = val.value;
    },
    selectIn(val) {
      this.data.transferGameIn = val.value;
      this.jumpType = val.type;
      if (val.type == "live") {
        this.jumpType = "real";
      } else if (val.type == "competition") {
        this.jumpType = "sport";
      }
      this.name = val.name;
      this.href = val.href;
      if (val.value == "SUNBET") {
        this.href = "/game/gameSUNBET.php?type=1";
      } else if (val.value == "MW") {
        this.href = "/game/gameMW.php?gameId=1051&deviceType=mobile&isfun=0";
      } else if (val.value == "SB") {
        this.href = "/game/loginSBH5.php";
      } else if (val.value == "UG") {
        this.href = "/game/gameUG.php?deviceType=mobile";
      } else if (val.value == "IG") {
        this.href = "/game/gameIG.php?gameId=1&deviceType=mobile";
      }
    }
  },
  components: { formTip, headernNobackground, headerBack2 }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.transfer {
  .head-top {
    background: url(./images/balance-bg1.png) no-repeat center/100% 100%;
    height: r(180);
    margin-bottom: r(20);
    .top-money {
      text-align: center;
      color: #fff;
      @include f(48px);
      padding-top: r(60);
      position: relative;
      span {
        @include f(28px);
      }
    }
    .transferall {
      background: #ff3e3e;
      border-radius: r(15);
      padding: r(15) r(20);
      position: absolute;
      right: r(30);
      bottom: r(30);
    }
  }
  .inputs {
    margin: 0 r(20);
    position: relative;
    @include f(32);
    h4,
    p {
      line-height: r(80);
      font-weight: normal;
    }
    input,
    select {
      width: 100%;
      height: r(80);
      border: solid 1px #dedede;
      border-radius: 6px;
      background: #fff;
      border-radius: 4px;
      text-indent: r(20);
      color: #303030;
      &.readonly {
        background: #eee;
      }
    }
    .i-btn {
      position: absolute;
      bottom: 0;
      border-radius: 0 4px 4px 0;
      right: 0;
      background: #ff3e3e;
      line-height: r(80);
      height: r(80);
      color: #fff;
      @include f(30);
      padding: 0 r(20);
    }
  }
  // old
}
.user-personal-update-btn {
  width: 100%;
  text-align: center;
  padding-bottom: r(30);
  padding-top: r(30);
  .btn {
    width: 94%;
    display: inline-block;
    background: $cl1;
    color: #fff;
    height: r(94);
    line-height: r(94);
    text-align: center;
    @include f(32px);
    letter-spacing: 2px;
    font-family: PingFangSC-Regular;
    border-radius: 5px;
  }
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
</style>
