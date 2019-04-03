<template>
  <div class="pay-update">
    <div class="user-personal-update-box">
      <div class="user-personal-update-list">
        <input ref="pwd" class="user-personal-input" type="password" v-model="pwdForm.password" placeholder="6位数字" maxlength="16">
        <eyes :dom="$refs.pwd" class="eyes"></eyes>
        <span class="user-personal-label">原密码</span>
      </div>
    </div>
    <div class="user-personal-update-box">
      <div class="user-personal-update-list">
        <input ref="pwd1" class="user-personal-input" type="password" v-model="pwdForm.new_password" placeholder="6位数字" maxlength="6">
        <eyes :dom="$refs.pwd1" class="eyes"></eyes>
        <span class="user-personal-label">新密码</span>
      </div>
    </div>
    <div class="user-personal-update-box">
      <div class="user-personal-update-list">
        <input ref="pwd2" class="user-personal-input" type="password" v-model="pwdForm.confirm_password" placeholder="6位数字" maxlength="6">
        <eyes :dom="$refs.pwd2" class="eyes"></eyes>
        <span class="user-personal-label">确认新密码</span>
      </div>
    </div>
    <div class="user-personal-update-btn">
      <button class="btn" @click="submit">修改支付密码</button>
    </div>
    <!-- <input-inline label="原密码">
      <input type="password" ref="pwd" v-model="pwdForm.password" maxlength="6" placeholder="原密码">
      <eyes :dom="$refs.pwd"></eyes>
    </input-inline>
    <input-inline label="新密码">
      <input ref="pwd1" v-model="pwdForm.new_password" type="password" placeholder="新密码（6位数字）" maxlength="6">
      <eyes :dom="$refs.pwd1"></eyes>
    </input-inline>
    <input-inline label="重复新密码">
      <input ref="pwd1" v-model="pwdForm.confirm_password" type="password" placeholder="重复新密码（6位数字）" maxlength="6">
      <eyes :dom="$refs.pwd1"></eyes>
    </input-inline>
    <v-button @click="submit">确定</v-button>
    <router-link :to="{name:'forgotPayword',params:{type:'2'}}" class="cz">重置支付密码</router-link> -->
  </div>
</template>
<script>
  import check from "@/util/RegExp"
  import {
    payword
  } from '@/controls/auth/payword'
  export default {
    mixins: [payword],
    data() {
      return {

      };
    },
    methods: {
      submit() {
        this.changePwd(this.pwdForm).then(res => {
          window.toast(res.message)
        }).catch(err => {
          window.toast(err.message)
        })
      }
    },
    components: {}
  };

</script>

<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";

  .pay-update {
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
      top: 45vh;
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

</style>
