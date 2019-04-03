<template>
    <div>
        <tab></tab>
        <div class="tab-a">
            <router-link :to="{name:'guideWeixin'}">
                <span class="tab-title-b">微信存款</span>
            </router-link>
            <span class="tab-title-a">支付宝存款</span>
            <router-link :to="{name:'guideBanking'}">
                <span class="tab-title-b">网银存款</span>
            </router-link>
            <router-link :to="{name:'guideJdpay'}">
                <span class="tab-title-b">银联/京东存款</span>
            </router-link>
        </div>
        <div class="master-box">
            <h3>【支付宝转账】</h3>
            <div class="title-box">
                <span class="title-mobile">手机设备</span>
                <router-link :to="{name:'guideAlipaypc'}">
                    <span class="title-pc">电脑设备</span>
                </router-link>
            </div>
            <p>①.登录账号，选择会员中心—存款—支付宝存款—支付宝转银行卡<span class="p-red">（使用此方式存款可获得存款返赠金） </span></p>
            <div class="tech-block">
                <img src="./images/alipay/alipay1.jpg">
            </div>
            <div class="tech-block">
                <img src="./images/alipay/alipay2.jpg">
            </div>
            <p>②.填写您的存款金额后进行提交，页面将出现如下图所示请勾选‘协议1’后，再次提交<span class="p-red">（请务必按照页面提示带有两位小数的存款金额进行支付，方可自动到账）</span></p>
            <div class="tech-block">
                <img src="./images/alipay/alipay3.jpg">
            </div>
            <p>③.提交成功后，可查询我方收款账户，并核对您的存款信息，可复制页面的收款信息,打开您的支付宝，选择‘<span class="p-red">转账至银行卡</span>，存款成功后，点击页面‘我已付款成功’系统将为您自动到账！</p>
            <div class="tech-block">
                <img src="./images/alipay/alipay4.jpg">
            </div>
            <h3>支付宝快捷=支付宝扫码</h3>
            <p>①.登录账号，选择会员中心—存款—支付宝存款；选择您的存款通道：填写存款金额后进行提交； </p>
            <div class="tech-block">
                <img src="./images/alipay/alipay5.jpg">
            </div>
            <p>②.扫一扫二维码 → 完成充值立即到账。</p>
            
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
