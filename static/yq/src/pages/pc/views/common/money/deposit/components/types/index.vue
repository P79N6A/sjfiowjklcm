<template>
  <div class="mainDev">
    <div class="posl" @click="pregame()" v-if="payMenus.length>5">
      <i class="ico-pre"></i>
    </div>
    <div class="payBox">
      <div
        class="gameDev"
        v-for="item in newPayMenus"
        :class="{active:active==item.name}"
        :key="item.name"
        @click="setPaytype(item)"
      >
        <div class="name">
          <i :class="[icos[item.type],item.type]" class="iconfont"></i>
          {{item.name}}
          <!-- <span
            class="rate4deputy"
            v-for="num in maxNum(item.data)"
            :key="num.rate4deputy"
            v-if="num.rate4deputy>0"
          >最多加送{{num.rate4deputy}}%</span>-->
        </div>
      </div>
    </div>
    <div class="posl" @click="nextgame()" v-if="payMenus.length>5">
      <i class="ico-next"></i>
    </div>
  </div>
</template>
<script>
import { depositMenu } from "@/controls/money/deposit";
export default {
  mixins: [depositMenu],
  data() {
    return {
      paySelect: null,
      active: "",
      newPayMenus: [],
      gameMinIndex: 0,
      gameMaxIndex: 5,
      gamelen: "",
      icos: {
        wechat: "iconfont icon-wechat",
        qq: "iconfont icon-QQ",
        alipay: "iconfont icon-big-Pay",
        jdpay: "iconfont icon-jingdong",
        ebank: "iconfont icon-yinxingqia1",
        unionpay: "iconfont icon-saoma",
        directpay: "iconfont icon-zhuanzhang"
      }
    };
  },
  methods: {
    setPaytype(item) {
      if (this.paySelect == item) return;
      this.paySelect = item;
      // this.$emit("setClasses", item);
      this.$bus.$emit("setClasses", item);
      this.active = item.name;
    },
    pregame() {
      if (this.gameMinIndex == 0) {
        window.toast("已无更多");
        return false;
      } else {
        this.gameMinIndex = this.gameMinIndex - 1;
        this.gameMaxIndex = this.gameMaxIndex - 1;
        this.newPayMenus = this.payMenus.slice(
          this.gameMinIndex,
          this.gameMaxIndex
        );
      }
    },
    nextgame() {
      if (this.gameMaxIndex < 5 || this.gameMaxIndex >= this.gamelen) {
        window.toast("已无更多");
        return false;
      } else {
        this.gameMinIndex = this.gameMinIndex + 1;
        this.gameMaxIndex = this.gameMaxIndex + 1;
        this.newPayMenus = this.payMenus.slice(
          this.gameMinIndex,
          this.gameMaxIndex
        );
      }
    },
    maxNum(item) {
      let rate4deputy = item[0].rate4deputy;
      let j = 0;
      for (let i = 0; i < item.length; i++) {
        if (rate4deputy < item[i].rate4deputy) {
          rate4deputy = item[i].rate4deputy;
          j = i;
        }
      }
      return [item[j]];
    }
  },
  created() {
    this.getPaymentConfigInfo({ terminalType: 0, separateMcpay: 1 }).then(
      res => {
        this.setPaytype(res.data[0]);
        this.gamelen = this.payMenus.length;
        if (this.payMenus.length > 5) {
          this.newPayMenus = this.payMenus.slice(0, 5);
        } else {
          this.newPayMenus = this.payMenus;
        }
      }
    );
  }
};
</script>
<style lang="scss" scoped>
.mainDev {
  color: #b2b2b2;
  width: 100%;
  text-align: center;
  border-bottom: solid 20px #f1f1f1;
  display: flex;
  .payBox {
    display: inline-block;
    flex: 1;
    .gameDev {
      cursor: pointer;
      padding: 15px 0;
      width: 20%;
      display: inline-block;
      text-align: center;
      &.active {
        border-bottom: 4px solid #4db7f4;
        color: #4db7f4;
        .name {
          color: #333;
        }
      }
      .name {
        font-size: 14px;
        color: #666;
        position: relative;
        .iconfont {
          font-size: 28px;
          color: #4db7f4;
        }
        .alipay {
          color: #01a7f1;
          // background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#01a7f1), to(#01a7f1));
        }
        .ebank {
          color: #eb6363;
          // background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#eb6363), to(#eb6363));
        }
        .jdpay {
          color: #c81522;
          // background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#c81522), to(#c81522));
        }
        .wechat {
          color: #01a93c;
          // background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#01a93c), to(#01a93c));
        }
        .unionpay {
          color: #01a93c;
          // background-image: url('../../img/unionpay.png');
          // width: r(70);
          // height: r(40);
          // background-repeat: no-repeat;
          // background-position: center center;
          // background-size: cover;
          // display: inline-block;
          // position: absolute;
          // top: 50%;
          // transform: translateY(-50%);
          // left: r(22.5);
        }
        .rate4deputy {
          position: absolute;
          top: -10px;
          right: -10px;
          font-size: 12px;
          border: solid 1px #4db7f4;
          background: #4db7f4;
          color: #fff;
          padding: 2px 3px;
          line-height: 1;
          border-radius: 5px;
          z-index: 2;
        }
      }
      .money {
        color: #ecf4f2;
        font-size: 16px;
        margin-top: 12px;
      }
      .iconfont {
        color: #4db7f4;
      }
    }
  }
  .posl {
    width: 30px;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      width: 0;
      height: 0;
      border: 10px solid;
      font-size: 0;
      &.ico-pre {
        border-color: transparent #4db7f4 transparent transparent;
      }
      &.ico-next {
        border-color: transparent transparent transparent #4db7f4;
      }
    }
  }
}
</style>
