<template>
  <div class="save-sendTip" v-if="userData.birthday==''">
    <i class="iconcent ct-tishi"></i>
    <div class="tips">{{errTips}}</div>
    <div class="user-personal-update-btn">
      <router-link :to="{name:'personal'}" class="btn">去设置生日</router-link>
    </div>
  </div>
  <div class="save-sendTip" v-else-if="userData.phoneValidStatus == '0'">
    <i class="iconcent ct-tishi"></i>
    <div class="tips">{{errTips}}</div>
    <div class="user-personal-update-btn">
      <router-link :to="{name:'verify'}" class="btn">验证手机</router-link>
    </div>
  </div>
  <div class="birthday-gold" v-else>
    <!-- 判断有无设置生日 -->
    <!-- 可以领取生日礼金 -->
    <div class="birthdayItem">
      <span class="cannotbir" v-if="!isBirthday">{{message}}</span>
      <span class="title" v-if="isBirthday">生日快乐</span>
      <span class="footer1" v-if="isBirthday">诚挚祝您生日快乐，财源滚滚!!!</span>
      <form-tip class="formTips">
        <p>1.以您填写的注册生日为准，生日填写后无法修改。</p>
        <p>2.生日礼金需要达到领取要求才能领取，无流水要求。</p>
      </form-tip>
      <div class="user-personal-update-btn">
        <button class="btn" v-show="isBirthday" :disabled="!isBirthday" @click="submit">领取生日礼金</button>
        <button class="btn" v-show="!isBirthday" disabled="disabled">无法领取</button>
      </div>
    </div>
    
  </div>
</template>

<script>
  import formTip from "mobile/components/form-tip1"
  import vButton from "mobile/components/form/button"
  import {mapGetters} from 'vuex'
  import {
    birthday
  } from '@/controls/discount/birthday'
  export default {
    mixins: [birthday],
    data() {
      return {
        errTips: ''
      };
    },
    computed: {
      ...mapGetters(["userData"])
    },
    methods: {
      submit() {
        if (!this.isBirthday) return;
        this.birthSubmit().then(res => {
          window.toast(res.message)
        }).then(err => {
          window.toast(err.message)
        })
      }
    },
    created() {
      this.checkBirthCoupon().then(res => {}).catch(err => {
        console.log(err)
      })
      if (!this.userData.accountName) {
        this.errTips = '您还未设置个人资料'
      } else if (this.userData.phoneValidStatus == '0') {
        this.errTips = '您还未验证手机号码'
      }
    },
    components: {
      formTip, vButton
    }
  };
</script>

<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
  .save-sendTip {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    position: relative;
    background: #fff;
    height: 70vh;
    .user-personal-update-btn{
      position: absolute;
      bottom: r(100);
    }
    .iconcent {
      color: $cl1;
      @include f(85px);
      margin-bottom: r(45);
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .tips {
      font-family: PingFangSC-Regular;
      @include f(24px);
      color: $cl1;
      letter-spacing: 0;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .user-personal-update-btn {
    width: 100%;
    position: absolute;
    bottom: r(70);
    text-align: center;
    padding-bottom: r(30);
      padding-top: r(30);

    .btn {
      width: 94%;
      // margin: 0 auto;
      display: inline-block;
      background-image: linear-gradient(-180deg, #FAEC69 0%, #FFB524 100%);
      border-radius: r(50);
      color: #fff;
      height: r(94);
      line-height: r(94);
      text-align: center;
      @include f(32px);
      letter-spacing: 2px;
      font-family: PingFangSC-Regular;
    }
  }
  .birthday-gold {
    min-height: 100vh;
    text-align: center;
    color:#666;
    @include f(30px);
    .bir-text{
      color:#666;
    }
    .bir-reset{
      @include f(26px);
    }
    .birthdayItem{
    background:url(./images/bg_birthday.png) center center no-repeat;
    background-size: 100% 100%;
      position: relative;
      width: 100%;
      min-height: 100vh;
      .cannotbir{
        position: absolute;
        font-family: PingFangSC-Regular;
        @include f(28px);
        color: #ff8019;
        letter-spacing: 0;
        top: 45%;
        left: 50%;
        transform: translate(-50%,-50%)
      }
      .title{
        font-family: PingFangSC-Regular;
        @include f(48px);
        color: #ff8019;
        letter-spacing: 0;
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%,-50%)
      }
      .footer1{
        font-family: PingFangSC-Regular;
        background: transparent;
        @include f(24px);
        color: #ff8019;
        letter-spacing: 0;
        text-align: center;
        position: absolute;
        width: 100%;
        top: 54%;
        left: 50%;
        transform: translate(-50%,-50%)
      }
      .formTips{
        // background: transparent!important;
        bottom: r(170);
        position: absolute;
        p{
          color: #fff;
        }
      }
    }
  }

</style>
