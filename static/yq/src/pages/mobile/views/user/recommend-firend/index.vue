<template>
  <div class="recommend-firend">
    <div class="item-select">
      <div class="select">{{money}}元</div>
      <span class="item-selectTitle">推荐奖金</span>
    </div>
    <div class="item-input">
      <span class="item-inputTitle">转账金额(元)：</span>
      <input v-model.number="myData.money" type="text" class="input inputPHD" placeholder="最小转账金额为1元且为整数金额">
      <span class="cny">￥</span>
    </div>
    <div class="item-select">
      <select class="select" v-model="myData.platform">
        <option value="">选择平台</option>
        <option v-for="item in platformData" :value="item.value" :key="item.value">
          {{item.name}}
        </option>
      </select>
      <span class="item-selectTitle">推荐奖金转平台</span>
      <i class="iconfont icon-arrow_r"></i>
    </div>
    <div class="item-select">
      <span class="link-href1">推荐网址:</span>
      <span class="link-href2">{{friendLink}}</span>
      <span class="link-href3" v-clipboard:copy="friendLink" v-clipboard:success="onCopy">复制网址</span>
    </div>
    <div class="user-personal-update-btn">
      <button class="btn" @click="submit">确定转入</button>
    </div>
    <form-tip>
      <p>1、好友必须在您的专属链接下注册。</p>
      <p>2、如有任何问题请及时联系在线客服。</p>
    </form-tip>
  </div> 
</template>
<script>
import vButton from "mobile/components/form/button";
import vInput from "mobile/components/form";
import formTip from "mobile/components/form-tip1";
import { platformData } from "@/assets/data";
import { recommendFriend } from "@/controls/discount/recommendFriend";
export default {
  mixins: [recommendFriend],
  data() {
    return {
      platformData,
      step: 1
    };
  },
  methods: {
    onCopy() {
      window.toast("复制成功");
    },
    submit() {
      this.friendSubmit(this.myData)
        .then(res => {
          window.toast(res.message);
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    }
  },
  created() {
    this.getFriendBonue();
  },
  activated() {
    this.step = 1;
  },
  components: {
    formTip,
    vInput,
    vButton
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.recommend-firend {
  padding: r(20) 0;
  @include f(28px);
  position: relative;
  .item-select {
    border-top: 1px solid rgba($color: #ddd, $alpha: .6);
    border-bottom: 1px solid rgba($color: #ddd, $alpha: .6);
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
      z-index: 99;
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

    .link-href1 {
      padding-left: r(20);
    }
    .link-href2 {
      flex: 1;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .link-href3 {
      margin-right: r(30);
      background-image: linear-gradient(-232deg, #ff7761 0%, #ff9d6c 100%);
      border-radius: r(10);
      width: r(160);
      height: r(60);
      line-height: r(60);
      color: #ffffff;
      text-align: center;
    }
  }

  .item-input {
    border-top: 1px solid rgba($color: #ddd, $alpha: .6);
    border-bottom: 1px solid rgba($color: #ddd, $alpha: .6);
    margin-bottom: r(20);
    position: relative;
    padding: r(20);
    background: #ffffff;

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
      transform: translateY(-50%);
      top: 61%;
    }

    .item-inputTitle {
      @include f(28px);
      margin-bottom: r(30);
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
