<template>
    <div class="header-agent-login">
        <div class="username">
            <input type="text" id="loginname" v-model="loginData.account" @keyup.enter="login" maxlength="15" placeholder="用户名">
        </div>
        <div class="password">
          <input type="password" id="password" maxlength="16" v-model="loginData.password" @keyup.enter="login" placeholder="密码">
          <a href="javascript:void(0);" @click="$bus.$emit('showForget',true)">忘记密码？</a>
        </div>
        <div class="codeimg">
            <input type="text" class="validimg" maxlength="4" @keyup.enter="login" v-model="loginData.imageCode" placeholder="验证码">
            <img class="verifyImg" :src="validateImage" @click="GET_VALIDATE">
        </div>
        <div class="forsub">
            <input type="button" value="登录" class="sub" @click.enter="login()">
        </div>
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
export default {
    mixins: [loginControl], // 混合
    data() {
        return {
            showRig: false,
            ImgCode: "",
            showPass: false,
            showQRcode: false,
            isShowLoginModal: false
        }
    },
    computed: {
      ...mapGetters(['validateImage',"isUser",'isAgent'])
    },
    methods: {
      ...mapMutations(['GET_VALIDATE']),
      login() {
        this.loginSubmit(this.loginData).then(res => {
          window.toast(res.message)
          console.log(this.isUser)
          if (res.data.role == 'AGENT') {
              this.$router.push({name:'agent_summary'})
          }else{
              this.$router.push({name:'user'})
          }
        }).catch(err => {
          console.log(err)
          window.toast(err.message)
        })
      },
    },
}
</script>
<style lang="scss" scoped>
    .header-agent-login{
        width: auto;
        max-width: 738px;
        height: 32px;
        float: right;
        padding: 6px 0 0 0;
        div{
            width: auto;
            position: relative;
            height: 32px;
            float: left;
            margin-right: 11px;
            input{
                width: 155px;
                height: 24px;
                line-height: 24px;
                padding: 0 0 0 5px;
                color: #8f6a3e;
                font-size: 12px;
                border-radius: 2px;
            }
        }
        .password{
            a{
                height: 20px;
                padding: 0 4px;
                line-height: 20px;
                position: absolute;
                top: 2px;
                right: 0;
                color: #fff;
                border-radius: 2px;
                background: #888;
            }
        }
        .codeimg{
            img{
                position: absolute;
                top: 2px;
                right: 2px;
                margin-top: 1px;
            }
        }
        .forsub{
            input{
                background: #8b3160;
                font-size: 16px;
                max-width: 100px;
                height: 28px;
                line-height: 28px;
                float: left;
                padding: 0;
                color: #fff;
                cursor: pointer;
                border: 1px solid transparent;
            }
        }
    }
</style>
