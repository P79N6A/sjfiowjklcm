<template>
    <div>
        <tab></tab>
        <div class="tab-a">
            <span class="tab-title-a">微信存款</span>
            <router-link :to="{name:'guideAlipay'}">
                <span class="tab-title-b">支付宝存款</span>
            </router-link>
            <router-link :to="{name:'guideBanking'}">
                <span class="tab-title-b">网银存款</span>
            </router-link>
            <router-link :to="{name:'guideJdpay'}">
                <span class="tab-title-b">银联/京东存款</span>
            </router-link>
        </div>
        <div class="master-box">
            <h3>微信转银行卡</h3>
            <div class="title-box">
                <span class="title-mobile">手机设备</span>
                <router-link :to="{name:'guideWeixinpc'}">
                    <span class="title-pc">电脑设备</span>
                </router-link>
            </div>
            <p>①.会员中心-存款—微信存款—微信转账，输入您的存款金额后进行提交<span class="p-red">（使用此方式存款可获得存款返赠金）</span></p>
            <div class="tech-block">
                <img src="./images/weixin/weixin1.jpg">
            </div>
            <div class="tech-block">
                <img src="./images/weixin/weixin2.jpg">
            </div>
            <p>②.提交后，勾选‘协议1’再次进行提交<span class="p-red">（请务必按照页面提示带有两位小数的存款金额进行支付，方可自动到账）</span></p>
            <div class="tech-block">
                <img src="./images/weixin/weixin3.jpg">
            </div>
            <p>③.提交成功后，可查询我方收款账户，并核对您的存款信息，可复制页面的收款信息</p>
            <div class="tech-block">
                <img src="./images/weixin/weixin4.jpg">
            </div>
            <p>④.打开您的微信，点击“<span class="p-red">我</span>”进入“<span class="p-red">钱包</span>” </p>
            <div class="tech-block">
                <img src="./images/weixin/weixin5.jpg">
            </div>
            <p>⑤.点击“<span class="p-red">收付款</span>” </p>
            <div class="tech-block">
                <img src="./images/weixin/weixin6.jpg">
            </div>
            <p>⑥.选择“<span class="p-red">转账到银行卡</span>” </p>
            <div class="tech-block">
                <img src="./images/weixin/weixin7.jpg">
            </div>
            <p>⑦.填写我方“<span class="p-red">收款人姓名/卡号/收款银行</span>”点击下一步</p>
            <div class="tech-block">
                <img src="./images/weixin/weixin8.jpg">
            </div>
            <!-- <p>⑧.输入“<span class="p-red">系统指定附有小数的金额</span>”，点击转账即可</p>
            <div class="tech-block">
                <img src="./images/weixin/weixin9.jpg">
            </div> -->
            <h3>微信扫码支付</h3>
            <p>①.会员中心-存款—微信存款—微信支付，选择您的存款金额后，进行提交；打开微信扫一扫二维码 → 完成充值立即到账！</p>
            <div class="tech-block">
                <img src="./images/weixin/weixin9.jpg">
            </div>
            <div class="tech-block">
                <img src="./images/weixin/weixin10.jpg">
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
