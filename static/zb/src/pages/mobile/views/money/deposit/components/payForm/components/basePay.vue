<template>
  <div class="depost-input">
    <div class="text-title"  v-if="bankCodeData.length>0">选择支付银行</div>
    <div class="item-select" v-if="bankCodeData.length>0">
      <select class="select" v-model="submitData.bankCode">
        <option value="">选择支付银行</option>
        <option v-for='(item,i) in bankCodeData' :value="item.value" :key="i+item.value">
          {{item.name}}
        </option>
      </select>
      <span class="item-selectTitle">选择支付银行</span>
      <i class="iconfont icon-arrow_r"></i>
    </div>

    <div class="text-title" v-if="payItem.type=='directpay'||payItem.type=='offbank'">输入存款姓名</div>
    <div class="item-input1" v-if="payItem.type=='directpay'||payItem.type=='offbank'">
      <span class="item-inputTitle1">姓名：</span>
      <input type="text" class="input1 inputRightPHD" placeholder="请输入存款人姓名" v-model="submitData.order_accountName">  
    </div>

    <div class="text-title">输入存款金额</div>
    <div class="form-group-inline1" v-if="payItem.customParams&&payItem.customParams.enterMode=='FIXED_AMOUNT'">
      <div class="selectItems">
        <div class="selectItem" @click="another(item)" :class="{active:submitData.order_amount==item}" v-for="item in payItem.customParams.defaultAmounts" :key="item">
          {{item}}元
        </div>
      </div>
    </div>
    <div class="item-input" v-else>
      <span class="item-inputTitle">存款金额(元)：</span>
      <div class="inputDiv">
        <input type="text" class="input inputPHD" :placeholder="placeholder" v-model="submitData.order_amount">
        <span class="cny">￥</span>
      </div>     
      <div class="selectItems">
        <div class="selectItem" @click="another(item.value)" :class="{active:submitData.order_amount==item.value}" v-for="item in loadMoney" :key="item.name">
          {{item.value}}元
        </div>
      </div>
    </div>
    
    <div class="submitBox">
      <!--部分电子银行需要该选项-->
      <input type="hidden" v-model="submitData.bankCode" name="bankCode">
      <div class="depositMoney">
        <span>到账金额(元):</span> <br>
        <span class="orderMoney">{{submitData.order_amount || 0}}</span>
      </div>
      <div class="submitBtn" @click="depositPost">提交存款</div>
    </div>
  </div>

</template>
<script>
  import check from '@/util/RegExp'
  import {basePay} from '@/controls/money/basePay'
  export default {
    mixins:[basePay],
    data() {
      return {
        active: 0,
        loadMoney: [{
          name: "20元",
          value: 20
        }, {
          name: "50元",
          value: 50
        }, {
          name: "100元",
          value: 100
        }, {
          name: "200元",
          value: 200
        }, {
          name: "300元",
          value: 300
        }],
      }
    },
    watch: {
      payItem(val) {
        // 变化后去请求获取银行卡
        this.getBankList(val)
        if (val.customParams&&val.customParams.enterMode=='FIXED_AMOUNT') {
          this.submitData.order_amount = val.customParams.defaultAmounts[0]
        }
      },
    },
    methods: {
      // 生成新的订单
      depositPost(e) {
        this.submitData.id=this.payItem.id // 赋值当前支付的id
        // 提交表单
        this.depositPostSubmit(this.submitData,this.payItem).then(res=>{
          window.toast(res.message)
        }).catch(err=>{ 
          console.log(err)
          window.toast(err.message)
        })
      },
      another(value){
        if (value !== '') {
          this.submitData.order_amount = value;
        } else {
          this.submitData.order_amount = '';
        }
      }
    },
    props: {
      payItem: {
        type: Object
      }
    },
    computed: {
      placeholder() {
        if (this.payItem && this.payItem.lowerlimit) {
          return "最少" + this.payItem.lowerlimit + "元，最多" + this.payItem.upperlimit + "元";
        } else {
          return "请输入存款金额";
        }
      }
    },
    created() {
      if (this.payItem.customParams&&this.payItem.customParams.enterMode=='FIXED_AMOUNT') {
        this.submitData.order_amount = this.payItem.customParams.defaultAmounts[0]
      }
    },
  };

</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
  
  .form-group-inline1{
    position: relative;
    display: flex;
    margin-bottom: r(29);
    padding: r(20) r(30);
    background: #ffffff;   
    border-top:1px solid rgba($color: #ddd, $alpha: .6);
    border-bottom:1px solid rgba($color: #ddd, $alpha: .6);
    .form-label {
      text-align: right;
      color: #727272;
      min-width: 5em;
      max-width: 8em;
      white-space: nowrap;
      display: block;
      margin-right: r(10);
    }   
  }
  .item-input1 {   
      border-top: 1px solid rgba($color: #ddd, $alpha: .6);
      border-bottom: 1px solid rgba($color: #ddd, $alpha: .6);
      margin-bottom: r(20);
      position: relative;
      background: #ffffff;
      .input1 {
        width: 100%;
        border: none;
        line-height: r(90);
        @include f(28px);
        font-family: STXihei;
        padding: 0 r(40) 0 r(200);
      }
      .item-inputTitle1 {
        position: absolute;
        top: 52%;
        left: r(40);
        transform: translateY(-50%);
        font-family: PingFangSC-Regular;
        @include f(28px);
      }
    }
  .selectItems{
    line-height: r(60);
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;   
    background: #ffffff;     
    .selectItem{      
      border: 1px solid rgba($color: #ddd, $alpha: .6);
      margin: 0 r(20) r(20) 0;
      width: r(120);
      border-radius: 5px;
      text-align: center;
      &:nth-child(5n){
        margin: 0 0 r(20) 0;
      }
      &.active{
        border: 1px solid $cl1;
        background: $cl1;
        color: #ffffff;
      }
    }
  }
  .text-title {
    padding-left: r(30);
    font-family: PingFangSC-Regular;
    @include f(24px);
    color: #888888;
    margin-bottom: r(10);
  }
  .submitBox {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: r(120);
    background: #ffffff;
    display: flex;
    .depositMoney {
      flex: 1;
      padding:r(20) r(30);
      overflow: hidden;
      .orderMoney {
        display: inline-block;
        color: #FF4B41;
        @include f(48px);
        padding-top: r(10);
      }
    }
    .submitBtn {
      width: r(350);
      color: #ffffff;
      background: $cl1;
      border-radius: r(80) 0 0 0;
      text-align: center;
      letter-spacing: 2px;
      line-height: r(120);
      @include f(36px);
    }
  }
  .item-input {
    border-top:1px solid rgba($color: #ddd, $alpha: .6);
    border-bottom:1px solid rgba($color: #ddd, $alpha: .6);
    margin-bottom: r(20);
    position: relative;
    padding: r(20) r(30) r(10);
    background: #ffffff;
    .inputDiv {
      position: relative;
      border-bottom: 1px solid rgba($color: #ddd, $alpha: .6);
      margin-bottom: r(20);
    }

    .input {
      width: 100%;
      border: none;
      line-height: r(90);
      @include f(48px);
      padding-left: r(60);
      font-family: STXihei;
      color: #ff3b30;
    }

    .cny {
      color: #ff3b30;
      @include f(48px);
      position: absolute;
      bottom: 20%;
      left: 0;
    }

    .item-inputTitle {
      @include f(28px);
      margin-bottom: r(30);
    }
  }
  .item-select {
    border-top:1px solid rgba($color: #ddd, $alpha: .6);
    border-bottom:1px solid rgba($color: #ddd, $alpha: .6);
    margin-bottom: r(20);
    height: r(90);
    position: relative;
    background: #ffffff;
    display: flex;
    align-items: center;
    .icon-arrow_r {
      position: absolute;
      right: r(30);
      top: 50%;
      transform: translateY(-50%);
      margin-top: r(3);
    }
    .select {
      width: 100%;
      padding: 0 r(70) 0 r(300);
      height: r(90);
      line-height: r(90);
      border: none;
      z-index: 999;
      position: relative;
      direction: rtl;
      &:focus {
        border: none;
        outline-color: transparent;
      }
    }

    .item-selectTitle {
      font-family: PingFangSC-Regular;
      @include f(28px);
      color: #000;
      line-height: r(90);
      position: absolute;
      left: r(20);
      top: 0;
    }
  }
</style>
