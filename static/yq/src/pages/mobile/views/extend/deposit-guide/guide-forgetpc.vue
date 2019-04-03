<template>
  <div>
    <tab></tab>
    <div class="tab-h"><h3>忘记密码：</h3></div>
    <div class="master-box">
        <div class="title-box">
            <router-link :to="{name:'guideForget'}">
                <span class="title-pc">手机设备</span>
            </router-link>
            <span class="title-mobile">电脑设备</span>
        </div>
        <p>①.若您忘记登录密码可点击网站右上角免费开户旁边的【忘记密码】功能；可通过您的注册电话号码或注册邮箱进行自助找回；</p>
        <div class="tech-block">
            <img src="./images/forget/forgetpc1.jpg">
        </div>
        <p>②.操作方式：<br/>
          输入您的游戏账号及绑定手机号码/注册邮箱进行提交即可新密码将发送至您的注册电话或注册邮箱，您可使用新密码重新登录账号</p>
        <div class="tech-block">
            <img src="./images/forget/forgetpc2.jpg">
        </div>
        <p>③.如您注册电话与注册邮箱已无法使用，请您点击‘在线客服’协助处理</p>
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
