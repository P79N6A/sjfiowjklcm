<template>
      <div class="jackpot-num cfx">
      	<div class="jackpot-nums"> 
      		<span class="num" v-for="(item,i) in total" :key="i"
                  :class="i==3||i==7?'':('num'+item)"
            >{{item}}</span>
      	</div>
           
      </div>
</template>
<script>
  export default {
    data() {
      return {
        total: 0,
        tickerStartTime: (new Date()).getTime(),
        startNum: 0,
        step: 0.1,
        interval: null
      };
    },
    beforeDestroy() {
      window.clearInterval(this.interval)
    },
    methods: {
      randomMoney() {
        let _this = this;
        let x = _this.startNum * 1 + ( (((new Date()).getTime() - _this.tickerStartTime) / 5009) * _this.step);
        _this.total = x.toString().$toFixed().strSplit();
      },
      Start() {
        let _this = this;
        _this.interval = setInterval(() => {
          _this.randomMoney();
        }, 59)
      }
    },
    created() {
      this.startNum =740252258.64;
      this.step = 40.10874;
      this.Start();
    }
  }
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
	.jackpot-num{
		position: relative;
    text-align: center;
    padding: r(20);
	}
    .jackpot-nums{
      background: url(./images/bg_back.png) no-repeat center center/100% 100%;
      width:100%;
      text-align:center;
      padding: r(30) 0;
    }
    .num{
      color: #ffffff;
      @include f(56px);
    }
    @for $i from 0 through 9 {
      .num#{$i} {
        background: url(./images/bg_no.png) no-repeat center center / 100% 100%;
        margin: 0 r(3);
        display:inline-block;
        padding: r(25) r(8);
      }
    }
</style>
