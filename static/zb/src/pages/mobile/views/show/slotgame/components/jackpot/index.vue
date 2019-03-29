<template>
  <div class="jackpot-num">
    <div class="jackpot-nums">
      <p class="text">PT老虎机总奖池</p>
      <!-- <span class="num numMoney">￥</span> -->
      <div class="num-box">
        <span class="num" :class="`num${toClass(num)}`" v-for="(num,i) in total" :key="i">{{num}}</span>
      </div>
      
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
  padding: r(20) r(20) r(20) r(0);
  .jackpot-nums {
    border-radius: r(8);
    background: url(./images/jackpot-bg.png);
    background-size: 100% 100%;
    // padding: r(20) 2% r(20) 25%;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .text {
    position: absolute;
    left: 39%;
    top: 13%;
    width: 40%;
    font-size: 15px;
    line-height: 0.42667rem;
    font-weight: bold;
    color: #FCD10D;
    @include f(30px);
  }
  .num-box{
    width: 85%;
    margin-left: r(150);
    .num {
      color: #fff;
      @include f(40px);
      margin: r(40) 0 0 r(-40) ;
      display: inline-block;
      text-align: center;
      padding-left: r(55);
      &.numMoney {
        font-size: r(28);
      }
      &.numcomma ,&.numdot, {
        border-radius: r(4);
      }
    }
  }
  
}
</style>
