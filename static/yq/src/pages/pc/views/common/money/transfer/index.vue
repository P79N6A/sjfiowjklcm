<template>
  <div class="transfer-info">
    <div class="main-balance">
      <p class="balance-title">主账户余额</p>
      <div class="balance-money">
        ¥
        <span class="transfer-total">{{wallet['MAIN']}}</span>
      </div>
      <p>
        <i class="icobjh bjh-tongzhi"></i>
      </p>
    </div>
    <div class="main-balance1">
      <p class="balance-title">副账户余额</p>
      <div class="balance-money">
        ¥
        <span class="transfer-total">{{wallet['DEPUTY']}}</span>
      </div>
      <p>
        <i class="icobjh bjh-tongzhi"></i>
      </p>
    </div>
    <div class="blocks">
      <div class="step">
        <div>
          <span class="num">1</span>
        </div>
        <div class="line"></div>
      </div>
      <h4 class="block-title">选择转入/转出</h4>
      <div class="block-wallet">
        <div
          @click="data.transferGameOut = 'MAIN';data.transferGameIn = ''"
          :class="{active:data.transferGameOut == 'MAIN'}"
        >
          <img src="./images/transferIn.png">
          <p>转入游戏平台</p>
          <p>(从主账户转入)</p>
        </div>
        <div
          @click="data.transferGameIn = 'MAIN';data.transferGameOut =''"
          :class="{active:data.transferGameIn == 'MAIN'}"
        >
          <img src="./images/transferOut.png">
          <p>转出游戏平台</p>
          <p>(游戏平台转出)</p>
        </div>
        <div
          @click="data.transferGameOut = 'DEPUTY';data.transferGameIn = ''"
          :class="{active:data.transferGameOut == 'DEPUTY'}"
        >
          <img src="./images/sign.png">
          <p>副账户礼金</p>
          <p>(转出至游戏平台)</p>
        </div>
      </div>
    </div>
    <div class="blocks">
      <div class="step">
        <div>
          <span class="num">2</span>
        </div>
        <div class="line"></div>
      </div>
      <h4 class="block-title">选择平台</h4>
      <div class="block-platform">
        <h6>老虎机钱包</h6>
        <div class="block-select">
          <div
            class="block-item"
            v-for="item in platformData"
            :key="item.value"
            :class="{active:data.transferGameOut == item.value||data.transferGameIn == item.value}"
            @click="selectWallet(item)"
          >
            <p class="name">{{item.name}}</p>
            <p
              class="money"
              v-if="wallet[item.value] || wallet[item.value]==0"
            >{{wallet[item.value]}}元</p>
            <p class="money" v-else-if="loading[item.value]">正在刷新...</p>
            <p class="money" v-else>点击查询</p>
          </div>
        </div>
      </div>
      <div class="block-platform">
        <h6>真人/体育/电竞钱包</h6>
        <div class="block-select">
          <div
            class="block-item"
            v-for="item in realData.concat(sportData).concat(competitionData)"
            :key="item.value"
            :class="{active:data.transferGameOut == item.value||data.transferGameIn == item.value}"
            @click="selectWallet(item)"
          >
            <p class="name">{{item.name}}</p>
            <p
              class="money"
              v-if="wallet[item.value] || wallet[item.value]==0"
            >{{wallet[item.value]}}元</p>
            <p class="money" v-else-if="loading[item.value]">正在刷新...</p>
            <p class="money" v-else>点击查询</p>
          </div>
        </div>
      </div>
      <div class="block-platform">
        <h6>彩票/棋牌/捕鱼钱包</h6>
        <div class="block-select">
          <div
            class="block-item"
            v-for="item in lotteryData.concat(chessData).concat(fishData)"
            :key="item.value"
            :class="{active:data.transferGameOut == item.value||data.transferGameIn == item.value}"
            @click="selectWallet(item)"
          >
            <p class="name">{{item.name}}</p>
            <p
              class="money"
              v-if="wallet[item.value] || wallet[item.value]==0"
            >{{wallet[item.value]}}元</p>
            <p class="money" v-else-if="loading[item.value]">正在刷新...</p>
            <p class="money" v-else>点击查询</p>
          </div>
        </div>
      </div>
    </div>
    <div class="blocks">
      <div class="step">
        <div>
          <span class="num">3</span>
        </div>
        <!-- <div class="line"></div> -->
      </div>
      <h4 class="block-title">输入转账金额</h4>
      <el-form :model="data" ref="transferForm" label-width="90px" class="transfer-form">
        <!-- 转账金额 -->
        <el-form-item label="转账金额：" prop="transferGameMoney">
          <el-input
            v-model.number="data.transferGameMoney"
            placeholder="请输入转账金额"
            style="width:400px;"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm1('transferForm')"
            v-if="data.transferGameIn == 'MAIN'"
          >转入至主账户</el-button>
          <el-button type="primary" @click="submitForm('transferForm')" v-else>提交</el-button>
          <el-button type="danger" @click="transferAll()">资金一键归回主账户</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="user-tip">
      <p>温馨提示：</p>
      <p>
        1.【副账户彩金】要求
        <span style="color:#ea5048;">最低转账金额为3元</span>，只支持转入所有游戏平台。不支持与主账户互转以及游戏平台转入副账户。
      </p>
      <p>
        2.请在户内转账前进行
        <span style="color:#ea5048;">平台激活</span>方可转账成功。
      </p>
      <p>
        3.户内转账只支持
        <span style="color:#ea5048;">整数转账</span>。
      </p>
      <p>4.进行户内转账时，请先关闭正在进行的游戏页面，避免出现错误。</p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  Money,
  platformData,
  realData,
  sportData,
  lotteryData,
  chessData,
  competitionData,
  fishData
} from "@/assets/data";
import { transfer } from "@/controls/money/transfer";
import tips from "./components/tips";
import { updateGameMoney } from "@/api/payment";
import openWindow from "@/util/openWindow";
export default {
  mixins: [transfer],
  data() {
    return {
      Money,
      platformData,
      realData,
      sportData,
      fishData,
      competitionData,
      chessData,
      lotteryData,
      otherMoney: [],
      isxuanzhuan: false,
      showDeputy: true,
      platformType: "",
      name: "",
      href: ""
    };
  },

  computed: {
    ...mapGetters(["userData", "wallet", "islogin"])
  },
  methods: {
    submitForm(formName) {
      this.drawSuccess = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.transferSubmit(this.data)
            .then(res => {
              // window.toast(res.message);
              // this.resetForm('transferForm')
              // this.data.transferGameOut = "";
              // this.data.transferGameIn = "";
              // this.data.transferGameMoney = "";
              $confirm("<p>" + res.message + "</p>", "提示", {
                confirmText: "去游戏大厅",
                cancelText: "取消"
              }).then(
                () => {
                  // 确认，废弃并生成新订单
                  switch (this.platformType) {
                    case "slot":
                      this.$router.push({
                        name: "gameIndex",
                        params: { type: this.data.transferGameIn }
                      });
                      break;
                    case "live":
                      // this.$router.push({name:'real'})
                      this.open(
                        this.href,
                        this.name,
                        900,
                        640,
                        true,
                        this.islogin
                      );
                      break;
                    case "sport":
                      // this.$router.push({name:'realSport'})
                      this.open(
                        this.href,
                        this.name,
                        900,
                        640,
                        true,
                        this.islogin
                      );
                      break;
                    case "fish":
                      // this.$router.push({name:'fish'})
                      this.open(
                        this.href,
                        this.name,
                        900,
                        640,
                        true,
                        this.islogin
                      );
                      break;
                    case "lottery":
                      // this.$router.push({name:'ylc'})
                      this.open(
                        this.href,
                        this.name,
                        900,
                        640,
                        true,
                        this.islogin
                      );
                      break;
                    case "chess":
                      // this.$router.push({name:'ylc'})
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
                      break;
                    case "competition":
                      // this.$router.push({name:'realSport'})
                      this.open(
                        this.href,
                        this.name,
                        900,
                        640,
                        true,
                        this.islogin
                      );
                      break;
                  }
                },
                () => {
                  // 取消，查看订单
                  console.log("cancel");
                }
              );
            })
            .catch(err => {
              window.toast(err.message);
            });
        } else {
          return false;
        }
      });
    },
    submitForm1(formName) {
      this.drawSuccess = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.transferSubmit(this.data)
            .then(res => {
              // window.toast(res.message);
              // this.resetForm('transferForm')
              // this.data.transferGameOut = "";
              // this.data.transferGameIn = "";
              // this.data.transferGameMoney = "";
              $confirm("<p>" + res.message + "</p>", "提示", {
                confirmText: "我要提款",
                cancelText: "取消"
              }).then(
                () => {
                  // 确认，废弃并生成新订单
                  this.$router.push({ name: "drawmoney" });
                },
                () => {
                  // 取消，查看订单
                  console.log("cancel");
                }
              );
            })
            .catch(err => {
              window.toast(err.message);
            });
        } else {
          return false;
        }
      });
    },
    selectWallet(item) {
      if (
        this.data.transferGameOut == "MAIN" ||
        this.data.transferGameOut == "DEPUTY"
      ) {
        this.data.transferGameIn = item.value;
      } else if (this.data.transferGameIn == "MAIN") {
        this.data.transferGameOut = item.value;
      }
      this.platformType = item.type;
      this.name = item.name;
      this.href = item.href;
    },
    open(url, title, w, h, needLogin, loginState) {
      openWindow(url, title, w, h, needLogin, loginState);
    },
    resetForm(formName) {
      this.data.transferGameOut = "";
      this.data.transferGameIn = "";
      this.data.transferGameMoney = "";
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
  components: {
    tips
  },
  created() {
    this.data.transferGameOut = "MAIN";
    if (this.Money.length > 0 && this.Money[1].value == "DEPUTY") {
      let arr = new Array();
      arr = this.Money.concat();
      arr.splice(1, 1);
      this.otherMoney = arr;
    }
  }
};
</script>
<style lang="scss" scoped>
.transfer-info {
  position: relative;
  padding: 60px 40px 60px 70px;
  .main-balance {
    position: absolute;
    top: 0;
    right: 215px;
    width: 146px;
    height: 76px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background: url(./images/transfer-bg.png) no-repeat center;
    .transfer-total {
      font-size: 18px;
    }
  }
  .main-balance1 {
    position: absolute;
    top: 0;
    right: 60px;
    width: 146px;
    height: 76px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background: url(./images/transfer-bg.png) no-repeat center;
    .transfer-total {
      font-size: 18px;
    }
  }
  .blocks {
    position: relative;
    .step {
      position: absolute;
      left: -45px;
      top: -6px;
      height: 100%;
      text-align: center;
      .num {
        color: #fff;
        background: #4db7f4;
        border-radius: 20em;
        border: solid 5px #eee;
        display: inline-block;
        width: 30px;
        line-height: 20px;
        text-align: center;
      }
      .line {
        background: #eee;
        width: 10px;
        height: 100%;
        display: inline-block;
        &:before {
          content: "";
          display: inline-block;
          height: 100%;
          width: 2px;
          background: #4db7f4;
        }
      }
    }
    .block-title {
      margin: 20px 0 10px;
      font-size: 16px;
      color: #4db7f4;
    }
    .block-wallet {
      display: flex;
      justify-content: space-between;
      > div {
        width: 31%;
        height: 90px;
        border-radius: 5px;
        text-align: center;
        background: #e8ecf1;
        color: #c2c2c2;
        cursor: pointer;
        transition: all 0.3s;
        padding: 6px 0;
        &:hover,
        &.active {
          background: #fff;
          color: #333;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }
      }
    }
    .block-platform {
      padding: 20px;
      background: #f6f9fa;
      border-radius: 10px;
      h6 {
        font-size: 22px;
        margin-bottom: 10px;
        color: #333;
      }
      .block-select {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .block-item {
          width: 134px;
          min-width: 134px;
          text-align: center;
          width: 134px;
          height: 58px;
          padding-top: 3px;
          border: 1px solid #ddd;
          color: #333;
          background: #f4f4f4;
          margin-bottom: 8px;
          margin-right: 16px;
          font-size: 16px;
          border-radius: 5px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          transition: all 0.4s;
          &:hover,
          &.active {
            color: #fff;
            background: rgb(235, 199, 145); /* Old browsers */
            background: -moz-linear-gradient(
              45deg,
              rgba(235, 199, 145, 1) 0%,
              rgba(223, 184, 115, 1) 40%,
              rgba(215, 170, 89, 1) 100%
            ); /* FF3.6-15 */
            background: -webkit-linear-gradient(
              45deg,
              rgba(235, 199, 145, 1) 0%,
              rgba(223, 184, 115, 1) 40%,
              rgba(215, 170, 89, 1) 100%
            ); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(
              45deg,
              rgba(235, 199, 145, 1) 0%,
              rgba(223, 184, 115, 1) 40%,
              rgba(215, 170, 89, 1) 100%
            ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ebc791', endColorstr='#d7aa59',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
          }
          .name {
          }
        }
      }
    }
    .transfer-form {
      padding: 20px;
      background: #f6f9fa;
      border-radius: 10px;
    }
  }
}
</style>
