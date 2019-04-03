<template>
  <div>
    <tab></tab>
    <div class="tab-h"><h3>如何登陆您的游戏账号：</h3></div>
    <div class="master-box">
        <div class="title-box">
            <span class="title-mobile">手机设备</span>
            <router-link :to="{name:'guideLoginpc'}">
              <span class="title-pc">电脑设备</span>
            </router-link>
        </div>
        <p>①.进入网站后，首页点击‘登陆’按钮或页面左上角‘菜单’选项，在选择‘登陆’进入登陆页面后，输入您的账号与密码进行登录即可</p>
        <div class="tech-block">
            <img src="./images/login/login1.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/login/login2.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/login/login3.jpg">
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
