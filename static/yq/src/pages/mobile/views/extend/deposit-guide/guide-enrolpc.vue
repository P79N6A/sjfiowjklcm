<template>
  <div>
    <tab></tab>
    <div class="tab-h"><h3>如何注册账号：</h3></div>
    <div class="master-box">
         <div class="title-box">
            <router-link :to="{name:'guideEnrol'}">
                <span class="title-pc">手机设备</span>
            </router-link>
            <span class="title-mobile">电脑设备</span>
        </div>
        <p>①.进入网站后，点击页面右上角【免费开户】</p>
        <div class="tech-block">
            <img src="./images/enrol/enrolpc1.png">
        </div>
        <p>②.根据页面提示，输入您的游戏账号、密码、手机电话号码，输入验证码后，点击立即注册。</p>
        <p class="p-red">（请在提交时，仔细核对您的信息，电话号码注册成功后将无法修改）</p>
        <div class="tech-block">
            <img src="./images/enrol/enrolpc2.jpg">
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
