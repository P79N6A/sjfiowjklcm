<template>
    <!-- 手機版隱藏 -->
    <div class="right top-login-block">
      <a href="javascript:void(0);" @click="$bus.$emit('showLogin',true)" style="color: #3EC1FE !important">登录</a>
      <span class="split-line" style="color: #3EC1FE !important">|</span>
      <a href="javascript:void(0);" @click="$bus.$emit('showRegister',true)" ui-sref="register" style="color: #3EC1FE !important">注册</a>
      
    <!-- 用户登录弹窗 -->
    <v-login></v-login>
    </div>
</template>
<script>
  import {
    loginControl
  } from "@/controls/auth/loginControl"; // 引入公共业务逻辑
  import {
    mapGetters,
    mapActions,
    mapMutations
  } from 'vuex'
  import {
    SETTING
  } from '@/assets/data'
  import vLogin  from 'pc/master/layout/t3/components/auth/login'
  export default {
    mixins: [loginControl], // 混合
    data() {
      return {
        SETTING,
        showRig: false,
        ImgCode: "",
        showPass: false,
        showQRcode: false,
        isShowLoginModal: false
      }
    },
    computed: {
      ...mapGetters(['validateImage'])
    },
    components:{
      vLogin
    },
    methods: {
      ...mapMutations(['GET_VALIDATE']),
      login() {
        this.loginSubmit(this.loginData).then(res => {
          window.toast(res.message,'success')
        }).catch(err => {
          console.log(err)
          window.toast(err.message)
        })
      },
      registerIt() {
        this.$bus.$emit('showRegister', true)
        console.log('ToshowRegister');
      },
      showQR(){
        this.showQRcode = true;
      },
      hideQR(){
        this.showQRcode = false;
      }
    },
  };

</script>
<style lang="scss" scoped>
 .top-login-block {
      margin-top: 3px;
      position: relative;
      img {
        vertical-align: middle;
      }
      a, span {
        font-size: 14px;
      }
      a img, span img {
        vertical-align: middle;
        height: 23px;
      }
      .split-line {
        margin: 0 15px;
      }
      
    }
    a, span {
      color: #b7b7b7;
    }
</style>
