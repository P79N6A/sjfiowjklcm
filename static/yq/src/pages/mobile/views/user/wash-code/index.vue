<template>
  <div class="user-wash-code">
    <div class="save-send-item">
      <div class="save-send-item-select">
        <select name="platform" class="select" v-model="type">
          <option value="">选择平台</option>
          <option v-for="(item,i) in platformData" :value="item.value" :key="i">{{item.name}}</option>
        </select>
        <span class="save-send-item-selectTitle">游戏平台</span>
        <!-- <span class="save-send-item-selectTips" v-show="!type">选择平台</span> -->
        <!-- <i class="iconcent ct-jiantou" v-show="!type"></i> -->
      </div>
    </div>
    
    <div class="save-send-item">
      <div class="save-send-item-select">
        <span class="save-send-item-selectTitle">开始时间</span>
        <span class="save-send-item-selectTips" :class="{addcolor : !data.startDate}">{{data.startDate || '--'}}</span>
      </div>
      <div class="save-send-item-select">
        <span class="save-send-item-selectTitle">结束时间</span>
        <span class="save-send-item-selectTips" :class="{addcolor : !data.endDate}">{{data.endDate || '--'}}</span>
      </div>
      <div class="save-send-item-select">
        <span class="save-send-item-selectTitle">总有效投注额</span>
        <span class="save-send-item-selectTips" :class="{addcolor : !data.validAmount}">{{data.validAmount || '--'}}</span>
      </div>
      <div class="save-send-item-select">
        <span class="save-send-item-selectTitle">洗码比率</span>
        <span class="save-send-item-selectTips" :class="{addcolor : !data.rate}">{{data.rate || '--'}}</span>
      </div>
      <div class="save-send-item-select">
        <span class="save-send-item-selectTitle">返水金额</span>
        <span class="save-send-item-selectTips" :class="{addcolor : !data.ximaAmount}">{{data.ximaAmount || '--'}}</span>
      </div>
    </div>
    <div class="user-personal-update-btn">
      <button class="btn" @click="doXima" v-if="show">洗码</button>
    </div>
    <form-tip>
      <p>1、自助返水不限平台，最低金额为10元（要是您没有达到自助返水的最低金额是不能自助返水的）。</p>
      <p>2、每天的23:00-01:00为系统结算时间，暂时不能使用自助返水。每个平台自助结算的是有效投注，未自助返水的投注将通过系统进行返水。</p>
      <p>3、自助返水无次数限制，自助返水申请提交后，会在5分钟内通过审核，返水金额会自动添加到您的游戏账号中。</p>
    </form-tip>
  </div>
</template>

<script>
  import vButton from "mobile/components/form/button"
  import vInput from "mobile/components/form"
  import {    platformData  } from "@/assets/data"
  import {    washCode  } from '@/controls/discount/washCode'
  import formTip from "mobile/components/form-tip1" 
  import {
    mapGetters
  } from 'vuex'
  export default {
    mixins: [washCode],
    data() {
      return {
        platformData,
      };
    },
    methods: {
      search(type) {
        
      },
      doXima() {
        if(!this.show){
          return
        }
        this.doXimaSubmit({
          gameId: this.type
        }).then(res => {
            window.toast(res.message)
          // if (res.code != '20000') {
          //   window.toast(res.message)
          // }
        }).catch(err => {
          console.log(err)
          window.toast(err.message)
        })
      }
    },
    watch:{
      type(val){
        if(val){
          this.searchSubmit({gameId:val}).then(res => {
            // window.toast(res.message)
          }).catch(err => {
            console.log(err)
            window.toast(err.message)
          })
        }
      }
    },
    components: {
      vInput,
      vButton,
      formTip
    },
    created() {
    },
    computed: {
      ...mapGetters(["userData"]),
    },
  };

</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
  .save-sendTip{
    position: relative;
    background: #fff;
    height: 70vh;
    .user-personal-update-btn{
      position: absolute;
      bottom: r(100);
    }
    .iconcent{
      color: $cl1;
      @include f(85px);
      margin-bottom: r(45);
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .tips{
      font-family: PingFangSC-Regular;
      @include f(24px);
      color: $cl1;
      letter-spacing: 0;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }
  .user-wash-code {
    background: #f7f7f7;
    padding: r(20) 0;
    .save-send-item{
      background: #fff;
      box-shadow:  inset 0 -1px 0 0 #ddd;
      margin-bottom: r(20);
      .save-send-item-select{
        box-shadow: inset 0 1px 0 0 #ddd;
        height: r(90);
        position: relative;
        .select{
          width: 100%;
          padding: 0 r(70) 0 r(300);
          height: r(90);
          border: none;
          z-index: 99;
          position: relative;
          direction: rtl;
          &:focus{
            border: none;
            outline-color: transparent;
          }
        }
        .save-send-item-selectTitle{
          font-family: PingFangSC-Regular;
          @include f(28px);
          color: #000;
          line-height: r(90);
          position: absolute;
          left: r(20);
          top: 0;
        }
        .save-send-item-selectTips{
          font-family: PingFangSC-Regular;
          @include f(26px);
          color: #888;
          line-height: r(90);
          position: absolute;
          right: r(70);
          top: 0;
          &.addcolor {
            color: $cl3;
          }
        }
        .iconcent{
          color: #c7c7c7;
          @include f(40px);
          line-height: r(90);
          position: absolute;
          right: r(20);
          top: 0;
        }
      }
      .save-send-item-input{
        box-shadow: inset 0 1px 0 0 #ddd;
        // height: r(105);
        position: relative;
        padding: r(20);
        .input{
          width: 100%;
          border: none;
          line-height: r(105);
          @include f(48px);
          padding-left: r(60);
          font-family: STXihei;
          color: #ff3b30;
        }
        .cny{
          color: #ff3b30;
          @include f(48px);
          position: absolute;
          transform: translateY(-50%);
          top: 61%;
        }
        .save-send-item-inputTitle{
          @include f(28px);
          margin-bottom: r(30);
        }
      }
    }
  }
  .user-personal-update-btn{
      width: 100%;
      // position: absolute;
      // bottom: r(100);
      text-align: center;
      padding-bottom: r(30);
      padding-top: r(30);
      .btn{
        width: 94%;
        // margin: 0 auto;
        display: inline-block;
        background:$cl1;
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

</style>
