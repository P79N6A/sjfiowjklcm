<template>
  <div class="warp-public vip-gold">
    <div class="vipTips" v-show="showTips">
      <i class="iconcent ct-tongzhi"></i>
      <span>会员每个月只享有一次晋级的机会</span>
      <i class="iconcent ct-guanbi1" @click="showTips = false"></i>
    </div>
    <div class="vipMoney">
      <div class="userMoney">
        <span class="left">本月总投注额</span>
        <span class="right">{{tips.allbet}}元</span>
      </div>
    </div>
    <div class="vip-step">
      <table>
        <tr>
          <th>序号</th>
          <th>游戏平台</th>
          <th>投注金额</th>
        </tr>
        <tr v-for=" (item,i) in betArr" :key="i">
          <td>{{i+1}}</td>
          <td>{{item.platform}}</td>
          <td>{{item.bet}}</td>
        </tr>
      </table>
    </div>
    <div class="user-personal-update-btn">
      <button class="btn" @click="submit" :class="{btn:canUpgrade,pbtn:!canUpgrade}" :disabled="!canUpgrade">检测升级</button>
    </div>
    <form-tip>
      <p>系统自动晋级。</p>
    </form-tip>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    vipGold
  } from '@/controls/discount/vipGold'
  import formTip from "mobile/components/form-tip1"
  export default {
    mixins: [vipGold],
    name: "",
    data() {
      return {
        disabled: false,
        showTips: true,
        levelCount: 0, //所有的等级数量
        thisMonthMoney: 0 //本月投注额
      };
    },
    methods: {
      submit() {
        this.checkUpgrade().then(res => {
          window.toast(res.message)
        }).catch(err => {
          window.toast(err.message)
        })
      }
    },
    created() {
      this.getVipInfo()
    },
    watch: {
      level(arr) {
        if (arr[0].level == 0) {
          arr.shift();
        }
      }
    },
    components: {
      formTip
    }
  }

</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin";
  .vip-gold {
    .bottom_info_text {
      margin: 1em;
      text-align: center;
      color: $cl6
    }
    .vip-step {
      padding: 0 r(20);
      .titleT {
        height: r(84);
        line-height: r(84);
        color: $cl6;
        text-align: left;
        border-bottom: 1px solid #666;
        margin-bottom: 10px;
        @include f(36px)
      }
      table {
        width: 100%;
        border-spacing: 0;
        text-align: center;
        border-collapse: collapse;
        color: #303030;
        font-family: PingFangSC-Regular;
        table-layout: fixed;
        th {
          background: #fff8f2;
          // padding: r(20) r(40);
          font-weight: 100;
          height: r(91);
          line-height: r(91);
          border: 1px solid #ecd1ba;
          @include f(28px);
        }
        td {
          // padding: r(20) r(40);
          border: 1px solid #ecd1ba;
          @include f(24px);
          height: r(70);
          line-height: r(70);
        }
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
    .pbtn{
      width: 94%;
      // margin: 0 auto;
      display: inline-block;
      background: #ddd;
      color: #bbb;
      height: r(94);
      line-height: r(94);
      text-align: center;
      @include f(32px);
      letter-spacing: 2px;
      font-family: PingFangSC-Regular;
      border-radius: 5px;
    }
  }
  .vipMoney{
    padding: 0 r(20);
    width: 100%;
    margin-top: r(20);
    .userMoney{
      padding: r(30) r(50);
      background: #fbe4e4;
      border-radius: 6px;
      margin: 0 auto r(30);
      width: 100%;
      height: r(120);
      clear: both;
      .left{
        font-family: PingFangSC-Regular;
        @include f(24px);
        color: #c24142;
        letter-spacing: 0;
        float: left;
        line-height: r(60);
      }
      .right{
        font-family: PingFangSC-Regular;
        @include f(24px);
        color: #c24142;
        letter-spacing: 0;
        float: right;
        line-height: r(60);
      }
    }
  }
  .vipTips{
    width: 100%;
    height: r(90);
    background: #fefcec;
    opacity: 0.9;
    font-family: PingFangSC-Regular;
    @include f(28px);
    color: #f76a24;
    line-height: r(90);
    padding: 0 r(20);
    position: relative;
    .ct-guanbi1{
      position: absolute;
      right: r(20);
      @include f(20px);
    }
    .ct-tongzhi{
      @include f(34px)
    }
  }
  }
</style>
