<template>
<div class="login-box">
  <headern-nobackground :isBack='true'></headern-nobackground>

  <div class="login_logo">
    <img src="/static/images/logo.gif" alt="">
  </div>

  <form class="form-ui">
    <div class="input-box">
      <div class="ui-input-row rq-value">
        <i class="iconbolin iconbolin-yonghuming"></i>
        <input type="text" class="ui-ipt" v-model="loginData.account" placeholder="请输入游戏账号">
      </div>
      <div class="ui-input-row rq-value">
        <i class="iconbolin iconbolin-mima"></i>
        <input ref="pwd" type="password" class="ui-ipt" v-model="loginData.password" placeholder="请输入游戏密码">
        <eyes :dom="$refs.pwd"></eyes>
      </div>
      <div class="ui-input-row rq-value">
        <i class="iconbolin iconbolin-yanzhengma"></i>
        <input type="text" class="ui-ipt" v-model="loginData.imageCode" placeholder="请输入验证码">
        <div class="form-img">
          <img :src="validateImage" @click="GET_VALIDATE"/>
        </div>
      </div>
    </div>
    
    <div class="login-btn"  @click="login">登录</div>
    <div class="other-box cfx">
      <router-link :to="{name:'register'}" class="register-btn fl">立即注册</router-link>
      <router-link :to="{name:'forgotpwd'}" class="forget-btn fr">忘记密码？</router-link>
    </div>
  
  </form>
  <p class="copyright"> 众博娛樂持有菲律宾 PAGCOR 合法博彩执照 </p>
</div>
</template>
<script type="text/ecmascript-6">
  import headernNobackground from "mobile/components/head-nobackground";
  import vChoose from './components/choose';
  import {AUTH_NAME} from "@/store/types"//权限名称
  import {loginControl} from "@/controls/auth/loginControl"; // 引入公共业务逻辑
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import {getAuthImg} from '@/api/authService';

  export default {
    mixins: [loginControl], // 混合
    data() {
      return {
        errMessage:""
      };
    },
    computed: {
      ...mapGetters(['validateImage'])
    },
    methods: {
      ...mapMutations(['GET_VALIDATE']),
      login() {
        this.loginSubmit(this.loginData).then(res=>{
          if (res.success && res.data.role == "AGENT"){
            this.$router.push({name:"agentcenter"})
          }else {
            this.$router.push({name:"usercenter"})
          }
        }).catch(err=>{
          // console.log(err)
          window.toast(err.message)
          this.errMessage = err.message ;
        })
      },
    },
    components: {
      vChoose , headernNobackground
    },
  };
</script>
<style lang="scss" scoped> 
  @import "~mobile/assets/scss/mixin.scss";
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
    color:#e6f3ff;
  }
  input:-moz-placeholder, textarea:-moz-placeholder { 
    color:#e6f3ff;
  }
  input::-moz-placeholder, textarea::-moz-placeholder { 
    color:#e6f3ff;
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
    color:#e6f3ff;
  }
  .login-box{
    background: url(./images/bg.png) no-repeat center center/100% 100%;
    min-height: 100vh;
    overflow: hidden;
    .login_logo{
      text-align: center;
      img {
        margin: r(60) 0;
        width: 50%;
      }
    }
    .form-ui{
      width:90%; 
      margin:25px auto 10px;
      .ui-input-row {
        position: relative;
        line-height: 46px;
        height: 46px;
        padding: 0 10px;
        background:rgba(63,127,192,0.30);
        border:1px solid rgba(85,110,188,0.70);
        border-radius: r(50);
        margin-bottom: 23px;
        .iconbolin {
          color: #e6f3ff;
          @include f(48px);
        }
      }
      .form-img {
        position: absolute;
        right: r(20);
        top: 50%;
        transform: translateY(-50%);        
        overflow: hidden;
        width: 28%;
        height: 80%;
        img{
          width: 100%;
          height: 100%;
          border-radius: r(5);
          vertical-align: inherit;
        };         
      }
      .input-box {
        border-radius:10px;
        overflow:hidden;
      }
      .ui-ipt {
        display: block;
        font-size:15px;
        color: #ffffff;
        line-height: normal;
        line-height: 41px;
        text-align: left;
        white-space: nowrap;
        border: 0;
        float: right;
        width: 90%;
        margin-top: 3px;
        background:none;
        &:focus {
          outline:none;
        }
      }
    }
    input{outline:none;}
    .copyright {
      text-align: center;
      font-size: 12px;
      color: #fff;
      width: 100%;
      opacity: .4;
      position: fixed;
      bottom: 0;
      line-height: 30px;
      left: 0;
    }
    .login-btn {
      width: 100%;
      background-image:linear-gradient(-51deg, #ff5544 0%, #ff3751 100%);
      border-radius: r(50);
      text-align: center;
      height: r(80);
      line-height: r(80);
      color: #ffffff;
      letter-spacing: 4px;
      @include f(30px);
    }
    .other-box {
      color: #fff;
      padding: r(20) 0 ;
      .register-btn {
        text-align: left;
      }
      .forget-btn {
        text-align: right;
      }
    }
  }
  
</style>
