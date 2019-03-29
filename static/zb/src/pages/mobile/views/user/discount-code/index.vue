<template>
  <div class="discount-code">
    <div class="save-send-item">
      <div class="save-send-item-select">
        <select v-model="data.couponType" id="couponType" class="select">
          <option value="">选择平台</option>
          <option v-for="item in platformData" :value="item.value" :key="item.value">
            {{item.name}}
          </option>
        </select>
        <span class="save-send-item-selectTitle">游戏平台</span>
        <!-- <span class="save-send-item-selectTips" v-show="!data.couponType">选择平台</span>
        <i class="iconcent ct-jiantou" v-show="!data.couponType"></i> -->
      </div>
    </div>
    <div class="save-send-item">
      <div class="save-send-item-input">
        <span class="save-send-item-inputTitle">转账金额(元)：</span>
        <input type="text" v-model="data.couponRemit" class="input inputPHD" placeholder="请输入金额">
        <span class="cny">￥</span>
      </div>
      <div class="user-personal-update-list">
        <input type="text" class="user-personal-input inputRightPHD" v-model="data.couponCode" placeholder="请输入优惠代码">
        <span class="user-personal-label">优惠代码</span>
      </div>
    </div>
    <div class="user-personal-update-btn">
      <button class="btn" @click="submit">确定转入</button>
    </div>
    <form-tip>
      <p>1.只限对应平台使用，需游戏账户低于5元才能使用存送优惠券，填写红利代码，确认游戏平台，提交后在相关的游戏里面会自动得到优惠礼金。</p>
      <p>2.所有优惠券都有最低转帐金额要求，优惠券需达到有效投注才可进行转出，需小于5元才可申请其他优惠。</p>
      <p>3.优惠券会通发送到您的站内信中，请您注意查收！</p>
    </form-tip>
  </div>
</template>
<script>
  import formTip from "mobile/components/form-tip1"
  // import {
  //   platformData
  // } from "@/assets/data"
  import vInput from "mobile/components/form"
  import vButton from "mobile/components/form/button"

  import {
    coupon
  } from '@/controls/discount/coupon'
  export default {
    mixins: [coupon],
    data() {
      return {
        platformData: [],
      };
    },
    methods: {
      submit() {
        this.couponSubmit(this.data).then(res => {
          window.toast(res.message)
        }).catch(err => {
          console.log(err)
          window.toast(err.message)
        })
      }
    },
    created() {},
    components: {
      formTip,
      vInput,
      vButton
    }
  };

</script>

<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";

  .discount-code {
    padding: r(20) 0;

    .save-send-item {
      background: #fff;
      box-shadow: inset 0 -1px 0 0 #ddd;

      .save-send-item-select {
        box-shadow: inset 0 1px 0 0 #ddd;
        height: r(90);
        position: relative;

        .select {
          width: 100%;
          padding: 0 r(70) 0 r(300);
          height: r(90);
          border: none;
          z-index: 999;
          position: relative;
          direction: rtl;

          &:focus {
            border: none;
            outline-color: transparent;
          }
        }

        .save-send-item-selectTitle {
          font-family: PingFangSC-Regular;
          @include f(28px);
          color: #000;
          line-height: r(90);
          position: absolute;
          left: r(30);
          top: 0;
        }

        .save-send-item-selectTips {
          font-family: PingFangSC-Regular;
          @include f(26px);
          color: #888;
          line-height: r(90);
          position: absolute;
          right: r(70);
          top: 0;
        }

        .iconcent {
          color: #c7c7c7;
          @include f(40px);
          line-height: r(90);
          position: absolute;
          right: r(20);
          top: 0;
        }

        
      }
      .save-send-item-input {
          // box-shadow: inset 0 1px 0 0 #ddd;
          // height: r(105);
          border-bottom: 1px solid rgba($color: #ddd, $alpha: .6);
          position: relative;
          padding: r(20);

          .input {
            width: 100%;
            border: none;
            line-height: r(105);
            @include f(48px);
            padding-left: r(60);
            font-family: STXihei;
            color: #ff3b30;
          }

          .cny {
            color: #ff3b30;
            @include f(48px);
            position: absolute;
            transform: translateY(-50%);
            top: 61%;
          }

          .save-send-item-inputTitle {
            @include f(28px);
            margin-bottom: r(30);
            margin-left: r(10);
          }
        }
    }

    .user-personal-update-list {
      position: relative;

      .user-personal-label {
        position: absolute;
        font-family: PingFangSC-Regular;
        @include f(28px);
        color: #000;
        line-height: r(51);
        top: 50%;
        transform: translateY(-50%);
        left: r(30);
      }

      .user-personal-input {
        width: 100%;
        height: r(90);
        font-family: PingFangSC-Regular;
        @include f(28px);
        color: #000;
        line-height: r(90);
        border: none;
        border-bottom: 1px solid rgba($color: #ddd, $alpha: .6);
        padding: 0 r(30) 0 r(190);
      }

      .user-personal-btn {
        background-image: linear-gradient(-232deg, #ff9d6c 0%, #ff7761 100%);
        background-image: -moz-linear-gradient(-232deg, #ff9d6c 0%, #ff7761 100%);
        background-image: -o-linear-gradient(-232deg, #ff9d6c 0%, #ff7761 100%);
        background-image: -webkit-linear-gradient(-232deg, #ff9d6c 0%, #ff7761 100%);
        color: #fff;
        @include f(24px);
        letter-spacing: 0;
        text-align: center;
        font-family: PingFangSC-Regular;
        line-height: r(60);
        height: r(60);
        width: r(160);
        position: absolute;
        right: r(20);
        top: 50%;
        transform: translateY(-50%);
        border-radius: 8px;
      }
    }

    .user-personal-update-btn {
      width: 100%;
      // position: absolute;
      // bottom: r(100);
      text-align: center;
      padding-bottom: r(30);
      padding-top: r(30);

      .btn {
        width: 94%;
        // margin: 0 auto;
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
