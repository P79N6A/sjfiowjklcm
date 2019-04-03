<template>
  <!-- 注册弹窗，写在这里 -->
  <div class="modal fade in" v-if="showRegister">
    <div class="alert-tips">
      <div class="registerBox">
        <div class="registerbox-title">
          <span class="title">注册成为会员</span>
          <i class="iconay ay-guanbi1 iclose" @click="showRegister=false"></i>
        </div>
        <div class="registerbox-content">
          <div class="form-box">
            <div class="form-group">
              <i class="iconay ay-denglu2"></i>
              <input type="text" id="account" class="ps-input ps-input1" v-model="registerForm.account" placeholder="用户名(6-10位数字或字母)"
                maxlength="20">
              <!-- <label :class="{inputActive:inputName1 == 'account'}" for="account">用户名(6-10位数字或字母)</label> -->
            </div>
            <div class="form-group">
              <i class="iconay ay-mima3"></i>
              <input ref="pwd" id="password" type="password" autocomplete="off" class="ps-input inpt-pwd" v-model="registerForm.password"
                placeholder="密码(6-16位数字和字母）" maxlength="16">
              <eyes :dom="$refs.pwd"></eyes>
              <!-- <label :class="{inputActive:inputName2 == 'password'}" for="password">密码(6-16位数字和字母）</label> -->
              
            </div>
            <!-- <div class="form-group">
              <i class="iconay ay-mima3"></i>
              <input ref="pwd" id="confirmPassword" type="password" autocomplete="off" class="ps-input inpt-pwd" v-model="registerForm.confirmPassword"
                maxlength="16" placeholder="确认密码">
              <eyes :dom="$refs.pwd"></eyes>
              <span class="errorTxt" v-show="showError">两次输入密码不正确</span>
            </div> -->
            <div class="form-group">
              <i class="iconay ay-shouji2"></i>
              <input type="text" id="phone" class="ps-input ps-input1" v-model="registerForm.phone" placeholder="请输入手机号"
                maxlength="11">
              <!-- <label :class="{inputActive:inputName3 == 'phone'}" for="phone">请输入手机号</label> -->
            </div>
            <div class="form-group">
              <i class="iconay ay-yanzhengma2"></i>
              <input type="text" class="ps-input ps-input2" id="imageCode" v-model="registerForm.imageCode" placeholder="验证码"  maxlength="4">
              <!-- <label :class="{inputActive:inputName4 == 'imageCode'}" for="imageCode">验证码</label> -->
              <a href="javascript:;" class="captcha-code icon_popup" @click="GET_VALIDATE">
                <img :src="validateImage">
              </a>
            </div>
            <span class="validate"></span>
            <input type="submit" class="submit" @click.prevent="registerClick" id="submit_user" value="立即注册">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    register
  } from '@/api/authService';
  import eyes from "pc/components/eyes"
  import check from "@/util/RegExp"
  import {
    mapGetters,
    mapActions,
    mapMutations
  } from 'vuex'

  import {
    registerControl
  } from "@/controls/auth/registerControl" // 引入公共业务逻辑


  export default {
    mixins: [registerControl],
    data() {
      return {
        showRegister: false,
        inputName1: '',
        inputName2: '',
        inputName3: '',
        inputName4: '',
        inputName5: '',
        showError:false
      }
    },
    created() {
      this.$bus.$on('showRegister', eventData => {
        console.log('showRegisterGet');
        this.showRegister = eventData
      })
    },
    computed: {
      ...mapGetters(['validateImage'])
    },
    methods: {
      ...mapMutations(['GET_VALIDATE']),
      registerClick() {
        if (!this.showError) {
          this.register(this.registerForm).then(res => {
            this.showRegister = false
            window.toast(res.message)
            this.$router.push({name:'user_setting'})
          }).catch(err => {
            console.log(err)
            window.toast(err.message)
          })
        }
      },
      focusLabel(val) {
        switch (val) {
          case 'account':
            this.inputName1 = val
            break;
          case 'password':
            this.inputName2 = val
            break;
          case 'confirmPassword':
            this.inputName5 = val
            break;
          case 'phone':
            this.inputName3 = val
            break;
          default:
            this.inputName4 = val
            break;
        }
      },
      blurLabel(val) {
        switch (val) {
          case 'account':
            if (this.registerForm.account == '') {
              this.inputName1 = ''

            }
            break;
          case 'password':
            if (this.registerForm.password == '') {
              this.inputName2 = ''
            }
            break;
          case 'confirmPassword':
            if (this.registerForm.confirmPassword == '') {
              this.inputName5 = ''
            }
            break;
          case 'phone':
            if (this.registerForm.phone == '') {
              this.inputName3 = ''
            }
            break;
          case 'imageCode':
            if (this.registerForm.imageCode == '') {
              this.inputName4 = ''
            }
            break;
        }
      }
    },
    components: {
      eyes
    },
    watch:{
      'registerForm.confirmPassword'(val){
        if (val.length>0) {
          if (val != this.registerForm.password) {
            this.showError = true
          }else{
            this.showError = false
          }
        }
      }
      
    }
  }

</script>
<style lang="scss" scoped>
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #787878;
  }

  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #787878;
  }

  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #787878;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #787878;
  }

  .alert-tips {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 99;
    text-align: center;
    .registerBox {
      background: #141414;
      width: 700px;
      height: 370px;
      display: block;
      margin: 10% auto 0;
      color: #fff;
      position: relative;
      border-radius: 15px;
      border: 1px solid #a18543;
      .iclose {
        position: absolute;
        right: 7px;
        color: #131313;
        font-size: 32px;
        top: 7px;
        cursor: pointer;

      }
      .registerbox-title {
        width: 100%;
        height: 54px;
        background: #000;
        color: #fff;
        position: relative;
        text-align: center;
        padding: 19px 0;
        line-height: 14px;
        border-radius: 15px 15px 0 0;
        span {
          font-size: 28px;
        }
        .iclose {
          position: absolute;
          right: 7px;
          top: 50%;
          font-size: 28px;
          transform: translateY(-50%);
          cursor: pointer;
          color: #fff;
        }
      }
      .registerbox-content {
        padding: 10px 0;
        .form-box {
          position: relative;
          width: 300px;
          margin: 0 auto;
          .form-group {
            height: 34px;
            line-height: 34px;
            position: relative;
            margin-bottom: 10px;
            width: 100%;
            .errorTxt{
              font-size: 13px;
              color: red;
              position: absolute;
              right: 0;
            }
            label {
              left: 32px;
              color: #9e9e9e;
              font-size: 16px;
              position: absolute;
              cursor: text;
              top: -11px;
              transition: -webkit-transform .2s ease-out;
              transition: transform .2s ease-out;
              transform-origin: 0 100%;
              text-align: initial;
              -webkit-transform: translateY(12px);
              transform: translateY(12px);
              &::after {
                display: block;
                content: "";
                position: absolute;
                top: 100%;
                left: 0;
                opacity: 0;
                transition: opacity .2s ease-out, color .2s ease-out;
              }
            }
            .inputActive {
              transform: translate(-32px, -21px);
              color: #787878;
              transition: all .2s ease-out; // transition: transfrom .2s ease-out;
              // top: -10px;
              transform-origin: 0 0;
            }
          }
          .validate {
            display: block;
            margin: 10px 0;
            font-size: 12px;
            color: #13a1ca;
            min-height: 16px;
            text-align: center;
          }
          p {
            text-align: center;
            color: #999;
          }
          .captcha-code {
            width: 90px;
            height: 34px;
            float: left;
            display: block;
            position: relative;
            background: no-repeat;

            img {
              height: 34px;
              width: 90px;
              vertical-align: top;
            }
          }
          .ps-input {
            width: 300px;
            height: 34px;
            border: 0;
            background: 0 0; // border-bottom: 1px solid #fff;
            outline: 0;
            line-height: 34px;
            font-size: 16px;
            color: #f5f5f5;
            padding: 0 20px 0 30px;
            border-bottom: 1px solid #ccc;
          }
          .ps-input2 {
            width: 210px;
            float: left;
            height: 34px;
            border-bottom: 1px solid #ccc;
            outline: 0;
            line-height: 34px;
            font-size: 16px;
            color: #f5f5f5;
            padding: 0 20px 0 30px;
          }
          i.iconay {
            position: absolute;
            height: 100%;
            line-height: 34px;
            top: 0;
            left: 0;
            font-size: 24px;
            display: inline-block;
            color: #f7f194;
          }
          span.iconay {
            position: absolute;
            top: 0;
            right: 10px;
            font-size: 24px;
            cursor: pointer;
            line-height: 34px;
            height: 100% !important;
            color: #f66;
          }
          .submit {
            width: 300px;
            height: 40px; // background: #983839;
            background: #e2b85a;
            // background: -moz-linear-gradient(to right, #2394fc, #53c8d6);
            // background: -o-linear-gradient(to right, #2394fc, #53c8d6);
            // background: linear-gradient(to right, #2394fc, #53c8d6);
            // background: -webkit-linear-gradient(to right, #2394fc, #53c8d6);
            text-align: center;
            line-height: 40px;
            cursor: pointer;
            font-size: 16px;
            color: #fff;
            text-align: center;
            display: block;
            border-radius: 4px;
          }
        }
      }
    }
  }

</style>
