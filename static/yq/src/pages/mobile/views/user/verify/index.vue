<template>
    <div class="verifyPage">
        <div v-show="step==0">
            <div class="user-personal-update-box">
                <div class="user-personal-update-list">
                    <input type="text" class="user-personal-input" v-model="code">
                    <span class="user-personal-label">手机验证码：</span>
                    <span class="user-personal-btn" @click="success" v-show="forbidtime == 0">获取验证码</span>
                    <span class="user-personal-btn1" v-show="forbidtime != 0">{{forbidtime}}秒后可重新获取</span>
                </div>
            </div>
            <div class="tips">
                点击获取验证码，系统将向您的注册手机号发送一个验证码
            </div>
            <div class="user-personal-update-btn">
                <button class="btn" @click="verify">验证</button>
            </div>
        </div>
        <div v-show="step==1">
            <div class="step2">
                <div style="line-height: 1.4;text-align: center;padding-top: 2rem;">
                    请使用注册时填写的手机，<br>发送短信“<span class="red">{{reverse.code}}</span>”到<span class="red">
                    {{reverse.showGet}}
                    </span><br>
                    发送成功<span class="red">15</span>秒后,点击<span class="red">验证</span>
                </div>
            </div>
            <div class="user-personal-update-btn">
                <button class="btn" @click="verifyTo">验证</button>
            </div>
        </div>
    </div>
</template>
<script>
  import {sendSms4TYJ, checkPhoneCode, getPhoneAndCode} from '@/api/user';
  import {mapGetters} from 'vuex'
export default {
    data() {
      return {
        forbidtime: 0,
        interval: null,
        code: "",
        showVerify: false,
        step: 0,
        myData: {
          sid: "",//true string
          check_address: "", //true string
          check_key: "", //true string
        },
        reverse: {
          code: "0000",
          showGet: ""
        },
      };
    },
    methods: {
      getPhoneAndCode() {
        getPhoneAndCode().then(res => {
          if (res.success) {
            this.step = 2;
            switch (res.data.type) {
              case "sms":
                this.step =0;
                break;
              case "reverse-sms":
                this.reverse.showGet = res.data.phone;
                this.reverse.code = res.data.code;
                this.step = 1;
                break;
              default :
                this.step = 0;
                break;
            }
          } else {
            window.toast(res.message)
          }
        }).catch(err => {
          window.toast("获取验证方式失败");
        })
      },
      success(obj, tc) {
        // tc.destory();
        this.showVerify = false;
        this.myData.check_key = obj.token;
        this.myData.check_address = obj.checkAddress;
        this.myData.sid = obj.sid;
        sendSms4TYJ(this.myData).then(res => {
          window.toast(res.message);
          if (res.success) {
            this.forbidtime = 120;

            let self = this;
            this.interval = setInterval(function(){
              self.forbidtime --;
              if (self.forbidtime == 0) {
                clearInterval(self.interval);
              }
            }, 1000);
          }
        }).catch(err => {
          window.toast("发送失败")
        });
      },
      verifyTo() {
        checkPhoneCode().then(res => {
          window.toast(res.message)
        }).catch(err => {
          window.toast("验证失败");
        })
      },

      verify() {
        if (this.code == "") return window.toast("请填写验证码");
        checkPhoneCode({code: this.code}).then(res => {
          window.toast(res.message)
          if (res.success) {
            this.$store.commit("SET_USERDATA", {phoneValidStatus: 1});
            this.$emit("input", false)
          }
        }).catch(err => {
          window.toast("验证失败");
        })
      }
    },
    beforeDestroy() {
      window.clearInterval(this.interval)
    },
}
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.verifyPage{
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
          height: r(120);
          font-family: PingFangSC-Regular;
          @include f(28px);
          color: #000;
          line-height: r(120);
          border: none;
          border-bottom: 1px solid rgba($color: #ddd, $alpha: .6);
          padding: 0 r(30) 0 r(190);
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
        .user-personal-btn1{
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
          width: r(300);
          position: absolute;
          right: r(20);
          top: 50%;
          transform: translateY(-50%);
          border-radius: 8px;
        }
      }
    }
    .user-personal-update-btn{
      width: 100%;
      position: absolute;
      bottom: r(100);
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
    .tips{
        font-family: PingFangSC-Regular;
        @include f(20px);
        color: #ff3b30;
        line-height: r(30);
        height: r(65);
        padding: r(10) r(30);
        background: #fff;
    }
    .step2{
        background: #fff;
    }
}
</style>
