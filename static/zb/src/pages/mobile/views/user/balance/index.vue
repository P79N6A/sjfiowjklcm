<template>
  <div class="balanceBox">
    <div class="balance">
      <div class="head-top">
        <headern-nobackground :isBack="true"></headern-nobackground>
        <div class="top-money">
          <div class="top-money-half">
            <img src="./images/ico_balance_main.png" alt>
            <br>
            {{wallet['MAIN']}}
            <br>
            <span>主账户余额</span>
          </div>
          <div class="top-money-half">
            <img src="./images/ico_balance_main.png" alt>
            <br>
            {{wallet['DEPUTY']}}
            <br>
            <span>副账户余额</span>
          </div>
        </div>
      </div>

      <div class="balanceItemDiv">
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
        { title: "真人娱乐", data: realData, class: "real" },
        { title: "老虎机", data: platformData, class: "slot" },
        { title: "捕鱼", data: fishData, class: "fish" },
        { title: "体育竞技", data: sportData, class: "sport" },
        { title: "彩票", data: lotteryData, class: "lottery" },
        { title: "棋牌游戏", data: chessData, class: "chess" },
        { title: "电子竞技", data: competitionData, class: "competition" }
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
    background: url(./images/Bitmap@2x.jpg) no-repeat center/100% 100%;
    min-height: r(359);
    .top-money {
      display: flex;
      align-items: center;
      text-align: center;
      color: #fff;
      height: r(280);
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
    top: r(-20);
    z-index: 9;
    background: #ffffff;
    border-radius: r(20) r(20) 0 0;
    .balanceItem {
      background: #ffffff;
      box-shadow: 0 r(-2) r(8) 0 #b0d9f3;
      border-radius: r(20) r(20) 0 0;
      .balanceItemTitle {
        padding: r(20) r(40);
        position: relative;
        @include f(28px);
        border-bottom: 1px solid rgba($color: #ddd, $alpha: 0.6);
        &::before {
          content: "";
          position: absolute;
          left: r(20);
          top: 50%;
          transform: translateY(-50%);
          width: r(5);
          height: r(20);
        }
        &.real {
          color: #fda334;
          &::before {
            background: #fda334;
          }
        }
        &.slot {
          color: #f7583d;
          &::before {
            background: #f7583d;
          }
        }
        &.sport {
          color: #f0506e;
          &::before {
            background: #f0506e;
          }
        }
        &.chess,
        &.fish {
          color: #2ca4e9;
          &::before {
            background: #2ca4e9;
          }
        }
        &.lottery {
          color: #2ca4e9;
          &::before {
            background: #2ca4e9;
          }
        }
        &.competition {
          color: #fda334;
          &::before {
            background: #fda334;
          }
        }
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
          &.chess,
          &.fish {
            color: #2ca4e9;
          }
          &.lottery {
            color: #2ca4e9;
          }
          &.competition {
            color: #fda334;
          }
        }
        .everyName {
          @include f(28px);
          color: #303030;
        }
        .iconcent {
          position: absolute;
          right: r(40);
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
          &.chess,
          &.fish {
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
          &.active {
            &.ct-shuaxin:before {
              -webkit-animation: rotateImg 1s linear infinite;
              animation: rotateImg 1s linear infinite;
              display: inline-block;
            }
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
