<template>
  <div class="jackpots inblock" :class="{light:islight}">
    <div class="jackpot-title">
      <img src="./images/jockpot.png" alt>
    </div>
    <div id="j-jackpotCount">
      <span class="num-item">¥</span>
      <span class="num-item">{{total|stringSplit}}</span>
    </div>
    <div class="jackpots_model">
      <img src="./images/jack_model2.png">
    </div>
    <div class="jackpots_bar">
      <img src="./images/jack_bar.png">
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
  width: 850px;
  height: 150px;
  position: relative;
  margin: 0 0 0 20px;
  animation: light 1s linear;
  animation-iteration-count: infinite;
  .jackpot-title {
    float: left;
    margin: 47px 1% 47px 12.5%;
  }

  #j-jackpotCount {
    float: left;
    font-weight: 600;
    letter-spacing: 4px;
    font-size: 50px;
    color: #fff;
    line-height: 150px;
  }

  .jackpots_model {
    position: absolute;
    left: -40px;
    top: -32px;
  }

  .jackpots_bar {
    position: absolute;
    right: -60px;
    top: -5px;
  }
}

@keyframes light {
  from {
    background: url(./images/jackpot_in1.jpg) center no-repeat,
      url(./images/jackpot_out1.jpg) no-repeat;
  }
  to {
    background: url(./images/jackpot_in1.jpg) center no-repeat,
      url(./images/jackpot_out2.jpg) no-repeat;
  }
}
.inblock {
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
  letter-spacing: normal;
  zoom: 1;
}
</style>
