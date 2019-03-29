<template>
  <div class="login-update">
    <div class="user-personal-update-box">
      <div class="user-personal-update-list">
        <input ref="pwd" class="user-personal-input" type="password" v-model="pwdForm.password" placeholder="6-16位数字和字母" maxlength="16">
        <eyes :dom="$refs.pwd" class="eyes"></eyes>
        <span class="user-personal-label">原密码</span>
      </div>
    </div>
    <div class="user-personal-update-box">
      <div class="user-personal-update-list">
        <input ref="pwd1" class="user-personal-input" type="password" v-model="pwdForm.new_password" placeholder="6-16位数字和字母" maxlength="16">
        <eyes :dom="$refs.pwd1" class="eyes"></eyes>
        <span class="user-personal-label">新密码</span>
      </div>
    </div>
    <div class="user-personal-update-box">
      <div class="user-personal-update-list">
        <input ref="pwd2" class="user-personal-input" type="password" v-model="pwdForm.confirm_password" placeholder="6-16位数字和字母" maxlength="16">
        <eyes :dom="$refs.pwd2" class="eyes"></eyes>
        <span class="user-personal-label">确认新密码</span>
      </div>
    </div>
    <div class="user-personal-update-btn">
      <button class="btn" @click="submit">修改登录密码</button>
    </div>
    <!-- <div class="form-box">
      <input-inline label="原密码">
        <input ref="pwd" v-model='pwdForm.password' placeholder="原密码（6-16位数字和字母）" type="password">
        <eyes :dom="$refs.pwd"></eyes>
        
      </input-inline>
      <input-inline label="新密码">
        <input ref="pwd1" v-model='pwdForm.new_password' type="password" placeholder="新密码（6-16位数字和字母）">
        <eyes :dom="$refs.pwd1"></eyes>
        
      </input-inline>
      <input-inline label="确认新密码">
        <input ref="pwd2" v-model='pwdForm.confirm_password' type="password" placeholder="确认新密码（6-16位数字和字母）">
        <eyes :dom="$refs.pwd2"></eyes>
        
      </input-inline>
    </div>
    <v-button @click="submit">确定</v-button> -->
  </div>
</template>
<script>
  import {changepws} from "@/api/payment";
  import {loginUpdate} from '@/controls/auth/loginUpdate'

  export default {
    mixins:[loginUpdate],    
    data() {
      return {
      };
    },
    props: {},
    methods: {

      submit() {
            this.submitPwd(this.pwdForm).then(res=>{
              window.toast(res.message)
              this.$store.dispatch('LOGIN_OUT')
              // window.reload()
              this.$router.push({name:"login"})
            }).catch(err=>{
              console.log(err)
              window.toast(err.message)
            })
      }
    },
    components: {
    }
  };
</script>

<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";

  .login-update {
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
          padding: 0 r(30) 0 r(230);
        }
        .eyes{
          display: flex;
          align-items: center;
          justify-content: center;
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
    .form-box {
      padding: r(30) r(30) 0;
    }
  }
</style>
