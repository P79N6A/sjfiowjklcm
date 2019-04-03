<template>
  <div class="jackpot-num">
    <div class="jackpot-nums">
      <span class="text">老虎机总奖池<br>JACKPOT </span>
      <span class="num numMoney">￥</span>
      <span class="num" :class="`num${toClass(num)}`" v-for="(num,i) in total" :key="i">{{num}}</span>
    </div>
  </div>
</template>
<script>
import { jackpot } from "@/controls/shows/jackpot";
export default {
  mixins: [jackpot],
  data() {
    return {};
  },
  created() {
    this.startNum = 740252258.64;
    this.step = 40.10874;
    this.Start();
    // this.getjackpot("cny")
    //   .then(res => {})
    //   .catch(err => [console.log(err)]);
  }
};
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
.jackpot-num {
  position: relative;
  margin-top: r(25);
  background: $main-bg;
  padding: r(20);
  .jackpot-nums {
    border-radius: r(8);
    background: #4db7f4;
    padding: r(20) 2% r(20) 25%;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .text {
    text-align: right;
    position: absolute;
    left: r(10);
    top: 20%;
    @include f(24px);
    line-height: r(32);
    font-weight: bold;
    color: #fff;
  }
  .num {
    background: #ffffff;
    color: #333;
    @include f(40px);
    margin: 0 r(2);
    display: inline-block;
    width: r(50);
    height: r(70);
    line-height: r(70);
    text-align: center;
    border-radius: r(6);
    // padding: r(10) r(3);
    &.numMoney {
      font-size: r(28);
    }
    &.numcomma ,&.numdot, {
      border-radius: r(4);
    }
  }
}
</style>
