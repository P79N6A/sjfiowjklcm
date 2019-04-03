<template>
  <div>
    <tab></tab>
    <div class="tab-h"><h3>忘记密码如何处理：</h3></div>
    <div class="master-box">
        <div class="title-box">
            <span class="title-mobile">手机设备</span>
            <router-link :to="{name:'guideForgetpc'}">
              <span class="title-pc">电脑设备</span>
            </router-link>
        </div>
        <p>①.进入网站后，选择首页‘登录’功能，选择‘忘记密码’</p>
        <div class="tech-block">
            <img src="./images/forget/forget1.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/forget/forget2.jpg">
        </div>
        <p>②.您可选择‘短信找回’或‘邮箱找回’自助处理<br/>
          输入您的账号，和电话号码或注册邮箱进行验证，新密码将发送至您的电话或邮箱</p>
        <div class="tech-block">
            <img src="./images/forget/forget3.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/forget/forget4.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/forget/forget5.jpg">
        </div>
        <p>③.如您注册电话与注册邮箱已无法使用，请您点击‘在线客服’协助处理</p>
        <div class="tech-block">
            <img src="./images/forget/forget6.jpg">
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
