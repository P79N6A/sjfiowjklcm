<template>
    <div>
        <tab></tab>
        <div class="tab-a">
            <router-link :to="{name:'guideEbank'}">
                <span class="tab-title-b">户内转账</span>
            </router-link>
            <span class="tab-title-a">资金一键归户</span>
        </div>
        <div class="master-box">
            <h3>【资金一键归户】功能：</h3>
            <p>主要用于玩家可快速将所有游戏平台账号额度一键转入主账户</p>
            <div class="title-box">
                <span class="title-mobile">手机设备</span>
                <router-link :to="{name:'guideReturnpc'}">
                    <span class="title-pc">电脑设备</span>
                </router-link>
            </div>
            <p>A：登录账号—会员中心—资金一键归户<br/>B：进入户内转账页面，点击页面右上角‘资金一键归户’</p>
            <div class="tech-block">
                <img src="./images/return/return1.jpg">
            </div>
            <div class="tech-block">
                <img src="./images/return/return2.jpg">
            </div>
            <p>②.点击后，页面将出现弹窗提示，请您详细阅读温馨提示内容后，点击‘确定’按钮进行提交</p>
            <div class="tech-block">
                <img src="./images/return/return3.jpg">
            </div>
            <p>③.提交成功后，系统将会自动为您将游戏平台额度转入‘主账户’，回归成功后，您可以选择快速申请提款</p>
            <div class="tech-block">
                <img src="./images/return/return4.jpg">
            </div>
            <p>④.选择‘我要提款’后，将会为您跳转至提款页面快速申请温馨提示：如您并未完善个人资料，请您设置完成后操作提款申请即可。</p>

            <h3>资金一键回归操作须知：</h3>
            <p>1、操作回归时，系统将抓取最近三天内转入游戏平台的记录，如您转账是在3天之前，请您选择户内转账进行单个平台转出</p>
            <p>2、一键回归功能系统设定每5分钟内可操作一次，请您多留意</p>
            <p>3、如您操作转账至主账户后未查询转账金额，请您及时联系24小时在线客服进行咨询。</p>
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
