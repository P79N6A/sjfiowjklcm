<template>
  <div class="modal fade in" v-if="showRegister">
    <div class="alert-tips">
    <div class="registerBox">
      <div class="registerbox-title">
        <span>注册成为会员</span>
        <i class="iconay ay-guanbi1 iclose" @click="showRegister=false"></i>
      </div>
      <div class="registerbox-content">
        <div class="form-box">
          <div class="form-group">
            <i class="iconay ay-denglu2"></i>
            <input type="text" class="ps-input ps-input1" v-model="registerForm.account" placeholder="用户名(6-10位数字和字母)" maxlength="20">
          </div>
          <div class="form-group">
            <i class="iconay ay-mima3"></i>
            <input ref="pwd" type="password" autocomplete="off" class="ps-input inpt-pwd" v-model="registerForm.password" placeholder="密   码(6-16位数字或字母）"
              maxlength="16">
            <eyes :dom="$refs.pwd"></eyes>

          </div>
          <div class="form-group">
            <i class="iconay ay-shouji2"></i>
            <input type="text" class="ps-input ps-input1" v-model="registerForm.phone" placeholder="取款唯一凭证，请正确填写手机号" maxlength="11">
          </div>
          <div class="form-group">
            <i class="iconay ay-yanzhengma2"></i>
            <input type="text" class="ps-input ps-input2" v-model="registerForm.imageCode" placeholder="验证码" maxlength="4">
            <a href="javascript:;" class="captcha-code icon_popup" @click="GET_VALIDATE">
              <img :src="validateImage">
            </a>
          </div>
          <span class="validate"></span>
          <input type="submit" class="submit" @click.prevent="registerClick" id="submit_user" value="提交">
        </div>
      </div>
    </div>
    </div>
    <!-- 注册弹窗，写在这里 -->
    <!-- <div class="alert-tips">
        <div class="alert-tips-content">
          <i class="iconfont icon-guanbi iclose" @click="showRegister=false"></i>
          <div class="content-info">
            <div class="title">免费成为会员</div>
            <div class="conent">
              <h2>注册成为会员</h2>
              <div class="form-box">
                <div class="form-group">
                  <i class="iconay yg-gerenxinxi"></i>
                  <input type="text" class="ps-input ps-input1" v-model="registerForm.account" placeholder="用户名(6-10位数字和字母)"
                        maxlength="20">
                </div>
                <div class="form-group">
                  <i class="iconay yg-mima1"></i>
                  <input ref="pwd" type="password" autocomplete="off" class="ps-input inpt-pwd"
                        v-model="registerForm.password" placeholder="密   码(6-16位数字或字母）" maxlength="16">
                  <eyes :dom="$refs.pwd"></eyes>

                </div>
                <div class="form-group">
                  <i class="iconay yg-shouji"></i>
                  <input type="text" class="ps-input ps-input1" v-model="registerForm.phone"
                        placeholder="取款唯一凭证，请正确填写手机号" maxlength="11">
                </div>
                <div class="form-group">
                  <i class="iconay yg-yanzhengma"></i>
                  <input type="text" class="ps-input ps-input2" v-model="registerForm.imageCode" placeholder="验证码"
                        maxlength="4">
                  <a href="javascript:;" class="captcha-code icon_popup" @click="GET_VALIDATE">
                    <img :src="validateImage"></a>
                </div>
                <span class="validate"></span>
                <input type="submit" class="submit" @click.prevent="registerClick" id="submit_user" value="提交">
            </div>
          </div>
        </div>
      </div>
    </div> -->
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
        this.register(this.registerForm).then(res => {
          window.toast(res.message)
        }).catch(err => {
          console.log(err)
          window.toast(err.message)
        })
      }
    },
    components: {
      eyes
    }
  }

</script>
<style lang="scss" scoped>
  // .register-ruleForm{
  //   width:450px;
  //   margin:0 auto;
  // }
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #959393;
  }

  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #959393;
  }

  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #959393;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #959393;
  }
  .alert-tips{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 99;
    text-align: center;
    .registerBox{
      background: #1e1e1e;
      width: 637px;
      height: 380px;
      display: block;
      margin: 10% auto 0;
      color: #fff;
      position: relative;
      .registerbox-title{
        width: 100%;
        height: 54px;
        background: #131313;
        color: #fff;
        position: relative;
        text-align: center;
        padding: 19px 0;
        line-height: 14px;
        span{
          font-size: 28px;
        }
        .iclose{
          position: absolute;
          right: 7px;
          top: 50%;
          font-size: 28px;
          transform: translateY(-50%);
          cursor: pointer;
        }
      }
      .registerbox-content{
        .form-box {
            width: 300px;
            margin: 20px auto;
            .form-group {
              height: 34px;
              line-height: 34px;
              position: relative;
              margin-bottom: 20px;
              width: 100%;
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
              background: 0 0;
              border-bottom: 1px solid #fff;
              outline: 0;
              line-height: 34px;
              font-size: 16px;
              color: #fff;
              padding: 0 20px 0 30px;
            }
            .ps-input2 {
              width: 210px;
              float: left;
              height: 34px;
              border-bottom: 1px solid #fff;
              outline: 0;
              line-height: 34px;
              font-size: 16px;
              color: #fff;
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
              color: #983839;
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
              height: 40px;
              background: #983839;
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
