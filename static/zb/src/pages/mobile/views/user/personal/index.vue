<template>
  <div class="user-personal-updata">
    <div class="user-personal-update-box">
      <div class="user-personal-update-list">
        <input type="text" class="user-personal-input" v-model="Data.accountName" :readonly="userData.accountName?true:false" placeholder="请输入您的真实姓名">
        <span class="user-personal-label">姓名：</span>
      </div>
      <div class="user-personal-update-list" v-if="isUser">
        <!-- <input type="text" class="user-personal-input" v-model="Data.birthday" :readonly="userData.birthday?true:false" v-show="Data.birthday != ''">
        <input type="date" class="user-personal-input" v-model="Data.birthday" :readonly="userData.birthday?true:false" v-show="Data.birthday == ''">
        <span class="user-personal-label">出生日期：</span> -->
        <div class="dateInputItem">
          <span class="dateLabel">出生日期：</span>
          <input type="text" class="dateInput" v-model="Data.birthday" :readonly="userData.birthday?true:false" v-show="Data.birthday != ''" placeholder="请输入您的生日">
          <input type="date" class="dateInput" v-model="Data.birthday" :readonly="userData.birthday?true:false" v-show="Data.birthday == ''">
        </div>
      </div>
      <div class="user-personal-update-list" v-if="isAgent">
        <input type="text" class="user-personal-input" v-model="Data.referWebsite" :readonly="userData.referWebsite?true:false">
        <span class="user-personal-label">推广网址：</span>
        <span class="user-personal-btn" v-clipboard:copy="userData.referWebsite" v-clipboard:success="onCopy">复制</span>
      </div>
    </div>
    <div class="user-personal-update-box">
      <div class="user-personal-update-list">
        <input type="text" class="user-personal-input" v-model="Data.phone" maxlength="11" :readonly="userData.phone?true:false">
        <span class="user-personal-label">手机号码：</span>
        <router-link class="user-personal-btn" :to="{name:'verify'}" v-if="userData.phoneValidStatus == 0 && isUser">进入验证</router-link>
      </div>
      <div class="user-personal-update-list">
        <input type="text" class="user-personal-input" v-model="Data.email" :readonly="userData.email?true:false" placeholder="请输入您的电子邮箱">
        <span class="user-personal-label">电子邮箱：</span>
        <span class="user-personal-btn" v-if="!userData.email&&!isCompleting" @click="upData('email')">修改</span>
      </div>
      <div class="user-personal-update-list" v-if="isCompleting">
        <input type="text" class="user-personal-input" v-model="Data.bankno" maxlength="19" @input="verifyBankNumber(Data.bankno)" :readonly="userData.bankno?true:false" placeholder="输入16-19位卡号后，系统智能识别">
        <span class="user-personal-label">银行卡号：</span>
      </div>
      <div class="page_content_tip" v-if="!userData.bankno&&isCompleting">{{banktxt}}</div>
    </div>
    <div class="user-personal-update-box">
      <div class="user-personal-update-list">
        <input type="text" class="user-personal-input" v-model="Data.wechat" placeholder="请输入您的微信号">
        <span class="user-personal-label">微信号：</span>
        <span class="user-personal-btn" v-if="!isCompleting" @click="upData('wechat')">修改</span>
      </div>
      <div class="user-personal-update-list">
        <input type="text" class="user-personal-input" v-model="Data.qq"  placeholder="请输入您的QQ号">
        <span class="user-personal-label">QQ号：</span>
        <span class="user-personal-btn" v-if="!isCompleting" @click="upData('qq')">修改</span>
      </div>
    </div>
    <div class="user-personal-update-btn" v-if="isCompleting">
      <button class="btn" @click="submitForm">提交个人信息</button>
    </div>
  </div>
</template>
<script>
  import {modifyCustomerSocialInfo} from '@/api/user';
  import {    mapGetters  } from 'vuex'
  import {    update  } from '@/controls/user/update'
  import {    bank  } from '@/controls/common/bank'
  export default {
    mixins: [update, bank],
    data() {
      return {
        newDetail: {
          qq: "",
          wechat: "",
          email: ''
        },
        oldDetail: {
          qq: "",
          wechat: "",
          email: ''
        }
      };
    },
    methods: {
      onCopy(){
        window.toast('复制成功')
      },
      submitForm(formName) {
        // alert('submit!');
        // 提交完善信息表单
        this.completeSubmit(this.Data).then(res => {
          window.toast(res.message)
          this.$bus.$emit('getBankList')
        }).catch(err => {
          console.log(err)
          window.toast(err.message)
        })
      },
      // 更新某个值
      upData(type) {
        this.modifySubmit({
          [type]: this.Data[type]
        }).then(res => {
          window.toast(res.message)
        }).catch(err => {
          console.log(err)
          window.toast(err.message)
        })
      },
    },
    computed: {
      ...mapGetters(["userData","isUser","isAgent"])
    },
    created() {
      Object.assign(this.Data, this.userData || {})
    },
    activated() {
      // 要用了keep-alive才会有作用
      Object.assign(this.Data, this.userData || {})
    }
  };

</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    font-family: PingFangSC-Regular;
    @include f(26px);
    color: #888;
    line-height: r(32);
  }

  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-family: PingFangSC-Regular;
    @include f(26px);
    color: #888;
    line-height: r(32);
  }

  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-family: PingFangSC-Regular;
    @include f(26px);
    color: #888;
    line-height: r(32);
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    font-family: PingFangSC-Regular;
    @include f(26px);
    color: #888;
    line-height: r(32);
  }
  .user-personal-updata {
    // padding: r(30);
    background: #f7f7f7;
    padding-top: r(20);
    .user-personal-update-box{
      margin-bottom: r(20);
      border-top: 1px solid rgba($color: #ddd, $alpha: .6);
      background: #fff;
      .user-personal-update-list{
        position: relative;
        .user-personal-label{
          position: absolute;
          font-family: PingFangSC-Regular;
          @include f(28px);
          color: #000;
          line-height: r(51);
          top: 50%;
          transform: translateY(-50%);
          left: r(30);
        }
        .user-personal-input{
          width: 100%;
          height: r(90);
          font-family: PingFangSC-Regular;
          @include f(28px);
          color: #000;
          line-height: r(90);
          border: none;
          border-bottom: 1px solid rgba($color: #ddd, $alpha: .6);
          padding: 0 r(30) 0 r(200);
        }
        .user-personal-btn{
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
        .dateInputItem{
          display: flex;
          padding: 0 r(30);
          height: r(90);
          border-bottom: 1px solid rgba($color: #ddd, $alpha: .6);
          .dateLabel{
            font-family: PingFangSC-Regular;
            @include f(28px);
            color: #000;
            line-height: r(90);
            // top: 50%;
            // transform: translateY(-50%);
            // left: r(30);
            flex: 1;
            width: r(190);
          }
          .dateInput{
            flex: 3;
            border: none;
            font-family: PingFangSC-Regular;
            @include f(28px);
            color: #000;
            background: #ffffff;
          }
        }
      }
    }
    .user-personal-update-btn{
      width: 100%;
      // position: absolute;
      // bottom: r(100);
      text-align: center;
      .btn{
        width: 94%;
        // margin: 0 auto;
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
  }
  .user-personal {
    @include f(32px);
  }
    .page_content_tip {
      padding: r(20);
      line-height: 1.4;
      text-align: center;
      color: red;
    }

</style>
