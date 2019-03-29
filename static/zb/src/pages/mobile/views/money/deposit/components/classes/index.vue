<template>
  <div class="classes" v-if="showClasses">
    <div class="text-title">选择支付方式</div>
    <div class="classesBox">
      <div
        class="classes-item"
        v-for="(item,key,i) in classes"
        :key="i"
        @click="selectPayInfo(item)"
        :class="{active:payMethod == item.remark}"
        v-if="item.id!='zfb'&&item.id!='new_zfb'"
      >{{item.remark}}</div>
      <div
        class="classes-item"
        v-if="hasZfb"
        :class="{active:payMethod == '支付宝转账'}"
        @click="selectPayInfo({id:'zfb',type:'mcpay',rate4deputy:classes[0].rate4deputy})"
      >支付宝转账</div>
    </div>
    <!-- 支付通道 -->
    <div class="text-title" v-if="showZfb && payMethod == '支付宝转账'">选择支付通道</div>
    <div class="classesBox" v-if="showZfb && payMethod == '支付宝转账'">
      <div
        class="classes-item"
        v-for="(item,key,i) in classes"
        :key="i"
        v-if="(item.id=='zfb')||(item.id=='new_zfb')"
        @click="selectZfbItem(item)"
        :class="{active:payMethodPass == item.remark}"
      >{{item.remark}}</div>
    </div>
  </div>
</template>
<script>
import { getPaymentConfigInfo } from "@/api/payment";
import { payTypes, mcTypech } from "@/assets/data/deposit";
export default {
  data() {
    return {
      showZfb: false,
      hasZfb: false,
      payMethod: null,
      payMethodPass: null,
      showClasses: true
    };
  },
  methods: {
    // 逻辑有点混乱
    selectPayInfo(info) {
      if (!info) {
        info = this.classes[0];
      }
      if (info.id == "zfb" || info.id == "new_zfb") {
        this.showZfb = true;
        this.payMethod = "支付宝转账";
      } else {
        this.showZfb = false;
        this.payMethod = info.remark;
        this.$emit("selectPayInfo", info);
      }
    },

    selectZfbItem(info) {
      console.log(info);
      this.payMethodPass = info.remark;
      this.$emit("selectPayInfo", info);
    },
    // 选择支付宝
    selectZfb() {
      this.classes.some(item => {
        if (item.id == "zfb" || item.id == "new_zfb") {
          // 选中该支付方式
          this.selectPayInfo({
            id: "zfb",
            type: "mcpay",
            rate4deputy: this.classes[0].rate4deputy
          });
          this.selectZfbItem(item);
        }
        return item.id == "zfb" || item.id == "new_zfb";
      });
    }
  },
  watch: {
    classes(val) {
      // 先检查是否有支付宝
      this.hasZfb = val.some(item => {
        return item.id == "zfb" || item.id == "new_zfb";
      });
      // if (this.hasZfb) {
      //   this.selectZfb();
      // } else {
      //   this.selectPayInfo(val[0]);
      //   this.payMethod = val[0].remark;
      // }
      this.selectPayInfo(val[0]);
      this.payMethod = val[0].remark;
    }
  },
  props: {
    classes: {
      type: Array
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.classes {
  margin: r(30) 0;
  .rate4deputy {
    position: absolute;
    top: r(20);
    right: r(100);
    @include f(24px);
    border: solid 1px #f24408;
    background: #fce36e;
    color: #f24408;
    padding: 2px 3px;
    line-height: 1;
    border-radius: 5px;
    z-index: 2;
  }
  .text-title {
    padding-left: r(30);
    font-family: PingFangSC-Regular;
    @include f(24px);
    color: #888888;
    margin-bottom: r(10);
  }
  .classesBox {
    background: #ffffff;
    padding: r(30) r(60) 0;
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
    margin-bottom: r(20);
    border-top: 1px solid rgba($color: #ddd, $alpha: 0.6);
    border-bottom: 1px solid rgba($color: #ddd, $alpha: 0.6);
    .classes-item {
      width: 45%;
      height: r(64);
      line-height: r(64);
      border-radius: r(32);
      border: 1px solid rgba($color: #ddd, $alpha: 0.6);
      text-align: center;
      margin-bottom: r(20);
      &:nth-child(2n + 1) {
        margin-right: 10%;
      }
      &.active {
        background: $cl1;
        border: 1px solid rgba($color: $cl1, $alpha: 0.6);
        color: #ffffff;
      }
    }
  }
}
</style>
