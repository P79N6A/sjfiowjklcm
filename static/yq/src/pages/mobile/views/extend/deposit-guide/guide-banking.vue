<template>
    <div>
        <tab></tab>
        <div class="tab-a">
            <router-link :to="{name:'guideWeixin'}">
                <span class="tab-title-b">微信存款</span>
            </router-link>
            <router-link :to="{name:'guideAlipay'}">
                <span class="tab-title-b">支付宝存款</span>
            </router-link>
            <span class="tab-title-a">网银存款</span>
            <router-link :to="{name:'guideJdpay'}">
                <span class="tab-title-b">银联/京东存款</span>
            </router-link>
        </div>
        <div class="master-box">
            <h3>【网银转账】</h3>
            <p>网银转账是通过公司指定的银行卡号进行存款支付，可使用【网银转账、手机银行转账】的方式支付；</p>
            <p class="yellow">收款账户不定时更新，每次存款务必登入官网查看【最新银行卡】</p>
            <div class="title-box">
                <span class="title-mobile">手机设备</span>
                <router-link :to="{name:'guideBankingpc'}">
                    <span class="title-pc">电脑设备</span>
                </router-link>
            </div>
            <p>①.登陆账号，选择会员中心—存款—网银存款—手机银行转账/网上银行转账，填写存款姓名及金额后进行提交</p>
            <div class="tech-block">
                <img src="./images/banking/banking1.jpg">
            </div>
            <div class="tech-block">
                <img src="./images/banking/banking2.jpg">
            </div>
            <p>②.提交后页面将呈现收款信息，请您复制<span class="p-red">我方收款账户</span>后打开您的手机银行或登录网上银行进行转账，交易成功后，点击‘已完成支付’，系统将为您自动到账！</p>
            <div class="tech-block">
                <img src="./images/banking/banking3.jpg">
            </div>
            
            <h3>如何操作手机银行转账</h3>
            <p>①：登录您的手机银行，点击“转账”</p>
            <p>②：点击银行账号转账</p>
            <p>③：输入奇幻城收款账户信息和金额（注：务必依照填写金额存款系统方可自动匹配到账）</p>
            <p>④：点击下一步，输入您的支付密码后完成付款</p>
            <div class="tech-block">
                <img src="./images/banking/banking4.jpg">
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
