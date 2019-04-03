<template>
  <div class="ui-balance">
    <div class="blocks">
      <div class="block-platform">
        <h6>老虎机钱包</h6>
        <div class="block-select">
          <div
            class="block-item"
            v-for="item in platformData"
            :key="item.value"
            @click="selectWallet(item.value)"
          >
            <p class="name">{{item.name}}</p>
            <p class="money" v-if="loading[item.value]">正在刷新...</p>
            <p
              class="money"
              v-else-if="wallet[item.value] || wallet[item.value]==0"
            >{{wallet[item.value]}}元</p>
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
            @click="selectWallet(item.value)"
          >
            <p class="name">{{item.name}}</p>
            <p class="money" v-if="loading[item.value]">正在刷新...</p>
            <p
              class="money"
              v-else-if="wallet[item.value] || wallet[item.value]==0"
            >{{wallet[item.value]}}元</p>
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
            @click="selectWallet(item.value)"
          >
            <p class="name">{{item.name}}</p>
            <p class="money" v-if="loading[item.value]">正在刷新...</p>
            <p
              class="money"
              v-else-if="wallet[item.value] || wallet[item.value]==0"
            >{{wallet[item.value]}}元</p>
            <p class="money" v-else>点击查询</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
export default {
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
      loading: {}
    };
  },
  computed: {
    ...mapGetters(["userData", "wallet"])
  },
  methods: {
    ...mapActions(["UPDATE_MONEY"]),
    selectWallet(val) {
      this.$set(this.loading, val, true);
      this.UPDATE_MONEY(val)
        .then(res => {
          this.$set(this.loading, val, false);
        })
        .catch(err => {
          this.$set(this.loading, val, false);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.ui-balance {
  .blocks {
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
      padding: 10px;
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
          text-align: center;
          width: 120px;
          height: 58px;
          padding-top: 3px;
          border: 1px solid #ddd;
          color: #333;
          background: #f4f4f4;
          margin: 4px;
          font-size: 14px;
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
