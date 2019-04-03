<template>
  <div>
    <tab></tab>
    <div class="tab-h"><h3>如何注册账号：</h3></div>
    <div class="master-box">
        <div class="title-box">
            <span class="title-mobile">手机设备</span>
            <router-link :to="{name:'guideEnrolpc'}">
              <span class="title-pc">电脑设备</span>
            </router-link>
        </div>
        <p>①.进入网站后，首页点击注册按钮或页面左上角‘菜单’选项，在选择‘注册’页面</p>
        <div class="tech-block">
            <img src="./images/enrol/enrol1.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/enrol/enrol2.jpg">
        </div>
        <p>②.根据页面提示，输入您的游戏账号、密码、手机电话号码，输入验证码后，进行提交注册。</p>
        <p class="p-red">（请在提交时，仔细核对您的信息，电话号码注册成功后将无法修改）</p>
        <div class="tech-block">
            <img src="./images/enrol/enrol3.jpg">
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
