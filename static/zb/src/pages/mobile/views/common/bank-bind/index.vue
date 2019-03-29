<template>
  <div class="add-bank-card ">
    <div class="form-box">
      <!-- <input-inline label="银行卡号">
        <input v-model="bindData.cardNo" type="text" placeholder="输入卡号后，系统智能识别银行" maxlength="19" @input="verifyBankNumber(bindData.cardNo)">
      </input-inline> -->
      <div class="card-list">
        <input type="text" v-model="bindData.cardNo" class="input inputRightPHD" placeholder="输入卡号后，系统智能识别银行" maxlength="19" @input="verifyBankNumber(bindData.cardNo)">
        <span class="bankNum">银行卡号</span>
      </div>
      <div class="card-list">
        <span class="span" :class="{spancolor:!banktxt}">{{banktxt || '- -'}}</span>
        <span class="bankNum">银行卡类型</span>
      </div>
    </div>
    <!-- <div class="card-tip">
      {{banktxt}}
    </div> -->   
    <form-tip>
      <p>1.绑定的【银行卡姓名】必须与【注册姓名】一致方可提款，如有乱填写造成无法出款，{{SETTING.name}}概不负责。</p>
      <p>2.请您认真核对正确的银行卡号，系统会自动识别判定银行卡是否有效。</p>
      <p>3.如果有任何疑问请及时联系在线客服</p>
    </form-tip>
    <!-- <v-button @click="submit">保存</v-button> -->
    <div class="user-personal-update-btn">
      <button class="btn" @click="submit">绑定</button>
    </div>
  </div>
</template>
<script>
  import {bindBankNo} from "@/api/payment";
  import check from "@/util/RegExp"
  import {bank} from "@/controls/common/bank"
  import formTip from "mobile/components/form-tip1"
  import {SETTING} from "@/assets/data"
  export default {
    mixins: [bank],
    data() {
      return {
        SETTING,
      };
    },
    methods: {
      submit() {
        this.addBankNo(this.bindData).then(res=>{
          this.bindData.cardNo=''
          window.toast(res.message)
        }).catch(err=>{
          window.toast(err.message)
        })
      }
    },
    components: {
      formTip
    }
  };
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .add-bank-card {
    @include f(32px);
    // padding: r(30) r(30) 0;
    margin-top: r(20);
    .card-tip {
      line-height: 1.3;
      text-align: center;
      color: $cl3;
    }
    .card-list{
      position: relative;
      margin-bottom: r(20);
      border-top: 1px solid rgba($color: #ddd, $alpha: .6);
      border-bottom: 1px solid rgba($color: #ddd, $alpha: .6);
      background: #ffffff;
      .bankNum{
        position: absolute;
        font-family: PingFangSC-Regular;
        @include f(28px);
        color: #000;
        line-height: r(51);
        top: 50%;
        transform: translateY(-50%);
        left: r(30);
      }
      .input{
        width: 100%;
        height: r(90);
        font-family: PingFangSC-Regular;
        @include f(28px);
        color: #000;
        line-height: r(90);
        border: none;
        padding: 0 r(30) 0 r(200);
        text-align: right;
      }
      .span {
        display: inline-block;
        width: 100%;
        height: r(90);
        font-family: PingFangSC-Regular;
        @include f(28px);
        color: #000;
        line-height: r(90);
        border: none;
        padding: 0 r(30) 0 r(200);
        text-align: right;
        &.spancolor {
          color: $cl3;
        }
      }
    }
    .user-personal-update-btn {
      width: 100%;
      text-align: center;
      padding-bottom: r(30);
      padding-top: r(30);
      .btn {
        width: 94%;
        display: inline-block;
        background: $cl1;
        color: #fff;
        height: r(94);
        line-height: r(94);
        text-align: center;
        @include f(32px);
        letter-spacing: 2px;
        font-family: PingFangSC-Regular;
        border-radius: 5px;
      }
    }
  }
</style>
