<template>
  <div class="save-sendTip" v-if="!userData.accountName">
    <i class="iconcent ct-tishi"></i>
    <div class="tips">{{errTips}}</div>
    <div class="user-personal-update-btn">
      <router-link :to="{name:'personal'}" class="btn">完善资料</router-link>
    </div>
  </div>
  <div class="save-sendTip" v-else-if="userData.phoneValidStatus == '0'">
    <i class="iconcent ct-tishi"></i>
    <div class="tips">{{errTips}}</div>
    <div class="user-personal-update-btn">
      <router-link :to="{name:'verify'}" class="btn">验证手机</router-link>
    </div>
  </div>
  <div class="user-experience-gold" v-else>
    <!-- 是否可以领取体验金 -->
    <div v-if="canExp">
      <div class="errTips1">
        <p class="p1">可领取体验金</p>
        <p class="p2">{{amount}}元</p>
        <p class="p3">无投注额要求,游戏账户达到{{limitAmount}}元即可提款</p>
      </div>
      <div class="save-send-item">
        <div class="save-send-item-select">
          <select name="platform" class="select" v-model="expData.platform">
            <option value="">选择平台</option>
            <option v-for="(item,i) in platformData" :value="item.value" :key="i">{{item.name}}</option>
          </select>
          <span class="save-send-item-selectTitle">游戏平台</span>
          <!-- <span class="save-send-item-selectTips" v-show="!expData.platform">选择平台</span>
          <i class="iconcent ct-jiantou" v-show="!expData.platform"></i> -->
        </div>
      </div>
      <div class="user-personal-update-btn">
        <button class="btn" @click="submit">领取</button>
      </div>
    </div>
    <div v-else>
      <div class="errTips">
        {{msg}}
      </div>
    </div>
  </div>
</template>
<script>
  import formTip from "mobile/components/form-tip1"
  import {platformData} from "@/assets/data"
  import {mapGetters} from 'vuex'
  import {
    experience
  } from '@/controls/discount/experience'
  export default {
    mixins: [experience],
    data() {
      return {
        platformData,
        errTips:null,
        hasCoupon:null
      };
    },
    methods: {
      submit() {
        if(this.amount < 1){
          window.toast("低于1元无法领取")
        }else {
          this.CouponSubmit(this.expData).then(res => {
          window.toast(res.message)
          }).catch(err => {
            console.log(err)
            window.toast(err.message)
          })
        }
      }
    },
    computed: {
      ...mapGetters(["userData"])
    },
    created() {
      if (!this.userData.accountName) {
        this.errTips = '您还未设置个人资料'
      } else if (this.userData.phoneValidStatus == '0') {
        this.errTips = '您还未验证手机号码'
      }
      this.checkCoupon().then( res=>{
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.hasCoupon = err.success
      })
    },
    components: {formTip}
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
  .user-experience-gold {
    padding: r(30) 0;
    .text_red{
      color:$cl3;
    }
    .errTips{
      margin: 0 r(30);
      background-image: url('./images/pic_remind_red.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: PingFangSC-Regular;
      @include f(26px);
      color: #ff853a;
      letter-spacing: 0;
      text-align: center;
      // width: 100%;
      height: r(490);
      margin-bottom: r(200);
    }
    .errTips1{
      margin: 0 r(30);
      background-image: url('./images/pic_remind_red.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      // display: flex;
      // align-items: center;
      // justify-content: center;
      font-family: PingFangSC-Regular;
      @include f(26px);
      color: #ff853a;
      letter-spacing: 0;
      text-align: center;
      // width: 100%;
      height: r(490);
      position: relative;
      margin-bottom: r(50);
      .p1{
        text-align: left;
        position: absolute;
        top: 32%;
        left: 7vh;
      }
      .p2{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        @include f(56px);
      }
      .p3{
        top: 65%;
        left: 7vh;
        position: absolute;
        @include f(22px);
      }
    }
    .errTips2{
      margin: 0 r(30);
      background-image: url('./images/pic_remind_red_done.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: PingFangSC-Regular;
      @include f(26px);
      color: #ff853a;
      letter-spacing: 0;
      text-align: center;
      // width: 100%;
      height: r(490);
      margin-bottom: r(200);
    }
  }
  .user-personal-update-btn{
      width: 100%;
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
    .save-send-item {
      background: #fff;
      box-shadow: inset 0 -1px 0 0 #ddd;
      margin-bottom: r(20);

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
          left: r(20);
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
    }
</style>
