<template>
  <div class="find-email">
    <input-inline label="游戏帐号">
      <input v-model="email.name" type="text" placeholder="请输入您的游戏账号">
    </input-inline>
    <input-inline label="绑定邮箱">
      <input v-model="email.yxdz" type="text" placeholder="请输入绑定的邮箱">
    </input-inline>

    <input-inline label="验证码">
      <input v-model="email.code" type="text" placeholder="请输入验证码" maxlength="4">
      <span class="right-info right_label" style="height: 100%">
            <img width="100" :src="validateImage" @click="GET_VALIDATE"/>
          </span>
    </input-inline>
    <v-button @click="submitEmail">验证</v-button>
  </div>
</template>
<script>
  import check from "@/util/RegExp"
  import {loginForgot} from '@/controls/auth/loginForgot'
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  export default {
    mixins:[loginForgot],
    data() {
      return {
      };
    },
    computed:{
      ...mapGetters(['validateImage'])
    },
    methods: {
      ...mapMutations(['GET_VALIDATE']),
      submitEmail(){
        this.getbackPwdByEmail(this.email).then(res=>{
          window.toast(res.message)
        }).catch(err=>{
          console.log(err)
          window.toast(err.message)
        })
      }
    }
  };
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .find-email{
    padding:0.5rem;
    .right_label {
      right: 0 !important;
      height: 100%;
      position: absolute;
      img {
        vertical-align: middle;
        border-radius: 20em;
        height:100%;
        width: auto;
      }
    }
  }
</style>
