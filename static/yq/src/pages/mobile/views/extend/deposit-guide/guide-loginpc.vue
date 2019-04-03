<template>
  <div>
    <tab></tab>
    <div class="tab-h"><h3>如何登陆您的游戏账号：</h3></div>
    <div class="master-box">
        <div class="title-box">
            <router-link :to="{name:'guideLogin'}">
                <span class="title-pc">手机设备</span>
            </router-link>
            <span class="title-mobile">电脑设备</span>
        </div>
        <p>①.进入网站后，在页面右上角，输入您的账号、密码后及验证码后点击“登录”。</p>
        <div class="tech-block">
            <img src="./images/login/loginpc1.jpg">
        </div>
        <p>②.若您输入错误密码，系统将弹出错误提示，请您重新确认正确的登录密码。</p>
        <div class="tech-block">
            <img src="./images/login/loginpc2.jpg">
        </div>
        <p>③如您连续5次输入错误密码，为保证您的账号安全，系统将会为您临时冻结，您可以点击‘忘记密码’通过注册电话/邮箱自助解冻，或联系24小时在线客服处理</p>
        <div class="tech-block">
            <img src="./images/login/loginpc3.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/login/loginpc4.jpg">
        </div>
    </div>
  </div>
</template>
<script>
import tab from "./components/tab"
export default {
    data(){
        return{

        }
    },

    components: {
      tab
    }
}
</script>
<style lang="scss" scoped>
  @import "./style.scss";
</style>
