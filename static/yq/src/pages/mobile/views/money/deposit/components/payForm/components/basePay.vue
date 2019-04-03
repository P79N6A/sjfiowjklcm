<template>
  <div class="depost-input">
    <div class="inputs" v-if="bankCodeData.length>0">
      <p class="title">支付银行</p>
      <select v-model="submitData.bankCode" placeholder="请选择支付银行">
        <option value>请选择支付银行</option>
        <option
          v-for="(item,i) in bankCodeData"
          :value="item.value"
          :key="i+item.value"
        >{{item.name}}</option>
      </select>
    </div>
    <div class="inputs">
      <p class="title">充值金额</p>
      <input
        type="text"
        v-model="submitData.order_amount"
        :placeholder="placeholder"
        name="order_amount"
      >
    </div>
    <div
      v-if="payItem.customParams&&payItem.customParams.enterMode=='FIXED_AMOUNT'"
      class="select_amount inputs"
    >
      <span
        @click="submitData.order_amount=item"
        v-for="(item,key,i) in payItem.customParams.defaultAmounts"
        class="dep_item"
        :key="i"
        :class="{active:submitData.order_amount==item}"
        v-if="item>=payItem.lowerlimit && item<=payItem.upperlimit"
      >{{item}}</span>
    </div>
    <div v-else class="select_amount inputs">
      <span
        @click="submitData.order_amount=item"
        v-for="(item,key,i) in moneys"
        class="dep_item"
        :key="i"
        :class="{active:submitData.order_amount==item}"
        v-if="item>=payItem.lowerlimit && item<=payItem.upperlimit"
      >{{item}}</span>
    </div>
    <div class="inputs" v-if="payItem.rate4player>0">
      <p class="amountMoneyTips">
        实际到账：
        <span style="color:#ea5048;">{{playerRate||0}}</span>
      </p>
      <p
        class="amountTips"
        v-show="(payItem.type=='alipay'&&payItem.payMethod=='SM')||payItem.payMethod=='ebank'||payItem.payMethod=='unionpay'||payItem.type=='jdpay'"
      >使用此通道，须承担{{payItem.rate4player*100}}%的手续费由第三方收取，若选择的通道无法存款，请点选其他支付通道。</p>
      <!-- <p
        class="amountTips"
        v-show="payItem.type=='wechat'&&payItem.payMethod=='SM'"
      >使用此方式将收取1%-4.5%手续费；不同存款通道，收取的手续费不一样，具体手续费请以第三方为准。</p>-->
    </div>
    <div class="btn_wrap j-btn" @click="depositPost">提交</div>
    <div class="wt-tips">
      <form-tip v-if="payItem.platformtype=='wtwx' || payItem.platformtype=='wtzfb'">
        <p>
          1、此通道单笔最低存款要求
          <span style="color:#ea5048;">{{payItem.lowerlimit}}元</span>，最高
          <span style="color:#ea5048;">{{payItem.upperlimit}}元</span>。
        </p>
        <p>2、此通道必须输入指定的金额才能成功扫码存款，否则无法查看收款码，指定金额有：</p>
        <p style="color:#ea5048;">【10,20,50,100,300,500,600,800,1000,1500,3000,5000】</p>
        <p>3、存款过程中如有遇到任何问题，请及时联系24小时在线客服。</p>
      </form-tip>
    </div>
    <input type="hidden" v-model="submitData.bankCode" name="bankCode">
  </div>
</template>
<script>
// import check from 'util/RegExp'
import { basePay } from "@/controls/money/basePay";
import Big from "big.js";
export default {
  mixins: [basePay],
  data() {
    return {
      active: 0,
      moneys: [10, 50, 100, 200, 500, 1000, 2000, 3000, 5000, 10000, 20000],
      playerRate: null
    };
  },
  watch: {
    payItem(val) {
      // 变化后去请求获取银行卡
      this.getBankList(val);
      // 针对万通支付
      if (
        this.payItem &&
        (this.payItem.platformtype == "wtwx" ||
          this.payItem.platformtype == "wtzfb")
      ) {
        this.submitData.order_amount = "";
      }
    },
    "submitData.order_amount"(val) {
      console.log(val);
      let x = new Big(val || 0);
      let y = new Big(1 - this.payItem.rate4player);
      this.playerRate = parseFloat(x.times(y).toFixed(2));
    }
  },
  methods: {
    // 生成新的订单
    depositPost(e) {
      this.submitData.id = this.payItem.id; // 赋值当前支付的id
      // 提交表单
      this.depositPostSubmit(this.submitData, this.payItem)
        .then(res => {
          window.toast(res.message);
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    }
  },
  props: {
    payItem: {
      type: Object,
      default: {
        platformtype: ""
      }
    }
  },
  computed: {
    placeholder() {
      if (this.payItem && this.payItem.lowerlimit) {
        return (
          "最少" +
          this.payItem.lowerlimit +
          "元，最多" +
          this.payItem.upperlimit +
          "元"
        );
      } else {
        return "请输入存款金额";
      }
    }
  },
  created() {
    if (this.payItem.type == "ebank") {
      this.getBankList(this.payItem);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.depost-input {
  width: 94%;
  margin: 0 auto;
}
.select_amount {
  margin: r(20) 0;
  .dep_item {
    display: inline-block;
    border: solid 1px #efefef;
    border-radius: 5px;
    background: #f8f8f8;
    min-width: r(150);
    text-align: center;
    height: r(80);
    line-height: r(80);
    margin: 0 10px 4px 0;
    padding: 0 r(10);
    margin-bottom: r(10);
    cursor: pointer;
    position: relative;
    @include f(24px);
    border: solid 2px transparent;
    &:hover,
    &.active {
      border: solid 2px #4db7f4;
    }
    .dep_selected {
      line-height: 1;
      position: absolute;
      color: #4db7f4;
      top: -6px;
      right: -8px;
      @include f(24px);
    }
  }
}
.inputs {
  margin-bottom: r(20);
  .title {
    @include f(30px);
    line-height: 2;
    color: #333;
  }
  input,
  select {
    display: block;
    width: 100%;
    height: r(80);
    line-height: r(80);
    border: none;
    background: #fff;
    border: 1px solid #d3d3d3;
    border-radius: r(6);
    padding-left: r(30);
  }
}
.btn_wrap {
  display: block;
  width: 100%;
  height: r(80);
  line-height: r(80);
  text-align: center;
  // background: #4db7f4;
  background: #4db7f4;
  border-radius: r(6);
  color: #fff;
  @include f(30px);
}
.wt-tips {
  margin: r(20);
}
.amountMoneyTips {
  @include f(34px);
  margin-bottom: r(10);
}
.amountTips {
  @include f(24px);
  line-height: r(40);
}
</style>
