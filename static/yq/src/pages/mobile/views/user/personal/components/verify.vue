<template>
  <div class="verify-code">
    <v-button @click="getPhoneAndCode">手机验证</v-button>

    <div v-show="step==0">
      <div class="flex form-code">
        <div class="flex-2"><i class="iconfont icon-fasongyoujian" style="font-size:1.5rem;color:#ccc"></i></div>
        <div class="flex-3 ">
          <p>点击获取验证码，系统将向您的注册手机号发送一个验证码</p>
          <div class="form-box">
            <input-inline label="验证码:">
              <input type="text" v-model="code" placeholder="请输入验证码" maxlength="6">
            </input-inline>
          </div>
          <div class="btn-getcode" @click="success" v-show="forbidtime == 0">获取验证码</div>
          <a href="javascript:void(0);" v-show="forbidtime != 0"><span class="red">{{forbidtime}}</span>秒后可重新获取</a>
        </div>
      </div>
      <v-button @click="verify">验证</v-button>
    </div>

    <div v-show="step==1">
      <div style="line-height: 1.4;text-align: center;margin:1em;">
        请使用注册时填写的手机，<br>发送短信“<span class="red">{{reverse.code}}</span>”到<span class="red">
          {{reverse.showGet}}
        </span><br>
        发送成功<span class="red">15</span>秒后,点击<span class="red">验证</span>
      </div>
      <v-button @click="verifyTo">验证</v-button>
    </div>
  </div>
</template>
<script>
  import vButton from "mobile/components/form/button"
  import {sendSms4TYJ, checkPhoneCode, getPhoneAndCode} from '@/api/user';
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        forbidtime: 0,
        interval: null,
        code: "",
        showVerify: false,
        step: -1,
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
    props: {
      value: Boolean
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
    components: {
    }
  };
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";

  .verify-code {
    margin-top: 1em;
    .flex-2 {
      align-self: center;
      text-align: center;
      img {
        width: 80%;
      }
    }
    .form-code {
      margin-top: 1em;
      line-height: 1.4;
    }
    .btn-getcode {
      background: #fff;
      border-radius: r(10);
      text-align: center;
      display: inline-block;
      color: $btn-bg1;
      line-height: r(68);
      width: 60%;
      border: 1px solid $btn-bg1;
    }
  }
</style>
