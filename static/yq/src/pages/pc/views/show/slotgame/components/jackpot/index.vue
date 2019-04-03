<template>
  <div class="jackpots">
    <div id="text6" class="jcount1">{{total|stringSplit}}</div>
    <div id="j-dtCount" class="jcount">
      <span class="num-item" v-for="(str,i) in total1" :key="i">{{str}}</span>
    </div>
  </div>
</template>
<script>
// import { jackpot } from "@/controls/shows/jackpot";
export default {
  // mixins: [jackpot],
  data() {
    return {
      islight: false,
      total: 0,
      total1: 0,
      tickerStartTime: new Date().getTime(),
      startNum: 0,
      step: 0.1,
      interval: null
    };
  },
  methods: {
    randomMoney() {
      let _this = this;
      let x =
        _this.startNum * 1 +
        ((new Date().getTime() - _this.tickerStartTime) / 2689) * _this.step;
      _this.total = x
        .toString()
        .$toFixed()
        .strSplit();
      _this.total1 = (x/1000/2)
        .toString()
        .$toFixed()
        .strSplit();
    },
    Start() {
      let _this = this;
      _this.interval = setInterval(() => {
        _this.randomMoney();
      }, 199);
    }
  },
  created() {
    this.startNum = 740252258.64;
    this.step = 40.10874;
    this.Start();
  },
  beforeDestroy() {
    window.clearInterval(this.interval);
  }
};
</script>
<style lang="scss" scoped>
  .jackpots {
    width: 851px;
    height: 164px;
    position: absolute;
    z-index: 2;
    background: url(../../images/jackpot-light2.png) no-repeat;

    .jcount1 {
      position: absolute;
      top: 48%;
      left: 100px;
      height: 35px;
      width: 351px;
      overflow: hidden;
      line-height: 35px;
      padding: 0 0 0 5px;
      letter-spacing: 15.5px;
      font-size: 19px;
      color: #451804;
      background: url(../../images/rect2.png) no-repeat 1px center;
    }

    #j-dtCount {
      right: 92px;
      top: 80px;
    }

    .jcount {
      position: absolute;
      letter-spacing: 15px;
      font-size: 19px;
      color: #451804;

      .num-item {
        display: inline-block;
        width: 22px;
        height: 35px;
        padding: 0 5px;
        line-height: 35px;
        background: #fec352 linear-gradient(#fec352, #da9306);
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        margin-right: 3px;
      }
    }
  }

</style>
