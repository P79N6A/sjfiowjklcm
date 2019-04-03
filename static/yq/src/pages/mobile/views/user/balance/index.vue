<template>
  <div class="balanceBox">
    <div class="balance">
      <div class="head-top">
        <div class="top-money">
          <div class="top-money-half">
            <!-- <img src="./images/ico_balance_main.png" alt> -->
            {{wallet['MAIN']}}
            <br>
            <span>主账户余额</span>
          </div>
          <div class="top-money-half">
            <!-- <img src="./images/ico_balance_main.png" alt> -->
            {{wallet['DEPUTY']}}
            <br>
            <span>副账户余额</span>
          </div>
        </div>
      </div>
      <div class="transfer-all" @click="transferAll">
        <span class="iconcent ct-jiantou"></span>
        资金一键归回主账户
      </div>
      <div class="balanceItemDiv">
        <div class="title">游戏平台余额</div>
        <div class="balanceItem" v-for="item in itemData" :key="item.class">
          <div class="balanceItemTitle" :class="item.class">{{item.title}}</div>
          <div class="balanceItemList">
            <div
              class="balanceEvery"
              v-for="(every,i) in item.data"
              :key="i"
              :class="[item.class,clca(i,item.data.length)]"
            >
              <p class="everyName">{{every.name}}</p>
              <p
                class="everyMoney"
              >{{(wallet[every.value] || wallet[every.value] == 0) ? wallet[every.value] : '- -'}}</p>
              <i
                class="iconcent ct-shuaxin"
                :class="[item.class,{active:every.value==actived}]"
                @click="getGameMoney(every)"
              ></i>
              <!-- <router-link
                :to="{name:'money_transfer'}"
                class="iconcent ct-weibiaoti--"
                :class="[item.class]"
              ></router-link>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  platformData,
  realData,
  sportData,
  lotteryData,
  chessData,
  competitionData,
  fishData
} from "@/assets/data";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { updateGameMoney } from "@/api/payment";
import headernNobackground from "mobile/components/head-nobackground";
import headerBack2 from "mobile/master/t1/page-in";
export default {
  data() {
    return {
      platformData,
      realData,
      sportData,
      lotteryData,
      chessData,
      competitionData,
      fishData,
      itemData: [
        { title: "老虎机", data: platformData, class: "slot" },
        { title: "真人娱乐", data: realData, class: "real" },
        { title: "体育竞技", data: sportData, class: "sport" },
        { title: "电子竞技", data: competitionData, class: "competition" },
        { title: "彩票", data: lotteryData, class: "lottery" },
        { title: "棋牌游戏", data: chessData, class: "chess" },
        { title: "捕鱼游戏", data: fishData, class: "fish" }
      ],
      actived: "1"
    };
  },
  methods: {
    ...mapActions(["UPDATE_MONEY"]),
    getGameMoney(item) {
      this.actived = item.value;
      this.UPDATE_MONEY(item.value)
        .then(res => {
          this.actived = "1";
        })
        .catch(err => {
          this.actived = "1";
          window.toast(err.message);
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
    },
    clca(val, length) {
      let className = "";
      if (length <= 2) {
        className = "noborder";
      } else {
        if (length % 2 == 0 && length - 2 <= val) {
          className = "noborder";
        } else if (length % 2 != 0 && length - 2 < val) {
          className = "noborder";
        }
      }
      return className;
    }
  },
  computed: {
    ...mapGetters(["userData", "isUser", "unread", "wallet"])
  },
  created() {},
  components: { headernNobackground, headerBack2 }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.balanceBox {
  .head-top {
    background: url(./images/balance-bg.png) no-repeat center/100% 100%;
    min-height: r(150);
    .top-money {
      display: flex;
      align-items: center;
      text-align: center;
      color: #fff;
      height: r(180);
      .top-money-half {
        flex: 1;
        @include f(48px);
        span {
          @include f(30px);
        }
        img {
          width: r(68);
          margin-bottom: r(20);
        }
      }
    }
  }
  .balanceItemDiv {
    position: relative;
    z-index: 9;
    background: #f5f5f5;
    // border-radius: r(20) r(20) 0 0;
    .title {
      @include f(28px);
      color: #000;
      height: r(80);
      line-height: r(80);
      padding-left: r(20);
    }
    .balanceItem {
      background: #ffffff;
      margin-bottom: r(30);
      // box-shadow: 0 r(-2) r(8) 0 #b0d9f3;
      // border-radius: r(20) r(20) 0 0;
      .balanceItemTitle {
        padding: r(20);
        position: relative;
        @include f(28px);
        border-bottom: 1px solid rgba($color: #ddd, $alpha: 0.6);
        color: #000;
        // &::before {
        //   content: "";
        //   position: absolute;
        //   left: r(20);
        //   top: 50%;
        //   transform: translateY(-50%);
        //   width: r(5);
        //   height: r(20);
        // }
        // &.real {
        //   color: #fda334;
        //   &::before {
        //     background: #fda334;
        //   }
        // }
        // &.slot {
        //   color: #f7583d;
        //   &::before {
        //     background: #f7583d;
        //   }
        // }
        // &.sport {
        //   color: #f0506e;
        //   &::before {
        //     background: #f0506e;
        //   }
        // }
        // &.chess {
        //   color: #2ca4e9;
        //   &::before {
        //     background: #2ca4e9;
        //   }
        // }
        // &.lottery {
        //   color: #2ca4e9;
        //   &::before {
        //     background: #2ca4e9;
        //   }
        // }
        // &.competition {
        //   color: #fda334;
        //   &::before {
        //     background: #fda334;
        //   }
        // }
        // &.fish {
        //   color: #fda334;
        //   &::before {
        //     background: #fda334;
        //   }
        // }
      }
      .balanceItemList {
        display: flex;
        flex-flow: row wrap;
        .balanceEvery {
          width: 50%;
          border-bottom: 1px solid rgba($color: #ddd, $alpha: 0.6);
          padding: r(20);
          position: relative;
          &:nth-child(2n-1) {
            border-right: 1px solid rgba($color: #ddd, $alpha: 0.6);
          }

          &.real {
            color: #fda334;
          }
          &.slot {
            color: #f7583d;
          }
          &.sport {
            color: #f0506e;
          }
          &.chess {
            color: #2ca4e9;
          }
          &.lottery {
            color: #2ca4e9;
          }
          &.competition {
            color: #fda334;
          }
          &.fish {
            color: #fda334;
          }
        }
        .everyName {
          @include f(28px);
          color: #303030;
        }
        .ct-shuaxin {
          position: absolute;
          right: r(20);
          top: r(20);
          width: r(40);
          height: r(40);
          line-height: r(40);
          text-align: center;
          border-radius: 50%;
          &.real {
            color: #fda334;
            background: rgba($color: #fda334, $alpha: 0.2);
          }
          &.slot {
            color: #f7583d;
            background: rgba($color: #f7583d, $alpha: 0.2);
          }
          &.sport {
            color: #f0506e;
            background: rgba($color: #f0506e, $alpha: 0.2);
          }
          &.chess {
            color: #2ca4e9;
            background: rgba($color: #2ca4e9, $alpha: 0.2);
          }
          &.lottery {
            color: #2ca4e9;
            background: rgba($color: #2ca4e9, $alpha: 0.2);
          }
          &.competition {
            color: #fda334;
            background: rgba($color: #fda334, $alpha: 0.2);
          }
          &.fish {
            color: #fda334;
            background: rgba($color: #fda334, $alpha: 0.2);
          }
          &.active {
            &.ct-shuaxin:before {
              -webkit-animation: rotateImg 1s linear infinite;
              animation: rotateImg 1s linear infinite;
              display: inline-block;
            }
          }
        }
        .ct-weibiaoti-- {
          position: absolute;
          right: r(20);
          top: r(20);
          width: r(40);
          height: r(40);
          line-height: r(40);
          text-align: center;
          border-radius: 50%;
          &.real {
            color: #fda334;
            background: rgba($color: #fda334, $alpha: 0.2);
          }
          &.slot {
            color: #f7583d;
            background: rgba($color: #f7583d, $alpha: 0.2);
          }
          &.sport {
            color: #f0506e;
            background: rgba($color: #f0506e, $alpha: 0.2);
          }
          &.chess {
            color: #2ca4e9;
            background: rgba($color: #2ca4e9, $alpha: 0.2);
          }
          &.lottery {
            color: #2ca4e9;
            background: rgba($color: #2ca4e9, $alpha: 0.2);
          }
          &.competition {
            color: #fda334;
            background: rgba($color: #fda334, $alpha: 0.2);
          }
          &.fish {
            color: #fda334;
            background: rgba($color: #fda334, $alpha: 0.2);
          }
        }
        .everyMoney {
          @include f(30px);
          margin-top: r(20);
        }
      }
    }
  }
  .noborder {
    border-bottom: none !important;
  }
  .transfer-all {
    text-align: center;
    background: #59dbd0;
    color: #fff;
    line-height: r(80);
    @include f(30px);
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
