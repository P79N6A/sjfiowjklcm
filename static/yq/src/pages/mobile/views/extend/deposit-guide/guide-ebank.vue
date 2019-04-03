<template>
    <div>
        <tab></tab>
        <div class="tab-a">
            <span class="tab-title-a">户内转账</span>
            <router-link :to="{name:'guideReturn'}">
                <span class="tab-title-b">资金一键归户</span>
            </router-link>
        </div>
        <div class="master-box">
            <h3>主账户转入游戏平台</h3>
            <div class="title-box">
                <span class="title-mobile">手机设备</span>
                <router-link :to="{name:'guideEbankpc'}">
                    <span class="title-pc">电脑设备</span>
                </router-link>
            </div>
            <p>①.登录账号—会员中心—户内转账</p>
            <div class="tech-block">
                <img src="./images/ebank/ebank1.jpg">
            </div>
            <p>②.以AG为例：<br/>转出：选择主账户 <br/>转入：选择游戏平台，填写您的转账金额后，点击转账</p>
            <div class="tech-block">
                <img src="./images/ebank/ebank2.jpg">
            </div>
            <p>③.转账成功后，您可以点击‘去游戏大厅’,系统将自动为您跳转至您选择的游戏平台</p>
            <div class="tech-block">
                <img src="./images/ebank/ebank3.jpg">
            </div>

            <h3>游戏平台转入主账户</h3>
            <p>①.登录账号—会员中心—户内转账</p>
            <div class="tech-block">
                <img src="./images/ebank/ebank4.jpg">
            </div>
            <p>②.以AG为例：<br/>转出：游戏平台<br/>转入账户：选择主账户 （注：游戏平台只支持转入主账户）填写您的转账金额后点击“转账”</p>
            <div class="tech-block">
                <img src="./images/ebank/ebank5.jpg">
            </div>
            <p>③.户内转账成功后，您可以点击‘我要提款’系统将自动为您跳转至提款页面，您可以选择快速提款（如您暂未完善个人信息，请在完善后操作提款）</p>
            <div class="tech-block">
                <img src="./images/ebank/ebank6.jpg">
            </div>
            <h3>户内转账须知：</h3>
            <p>①.请在户内转账前进行平台激活方可成功转账。进入游戏平台后任意选择游戏进入即可激活</p>
            <p>②.户内转账只支持整数转账，主账户最低转账金额为1元；副账户彩金最低转账金额为3元</p>
            <p>③.进行户内转账时，请您先关闭正在进行的游戏页面，避免出现错误</p>
            <p>④.如无法顺利转账，请及时联系24小时在线客服</p>
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
