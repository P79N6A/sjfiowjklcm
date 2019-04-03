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
            <router-link :to="{name:'guideBanking'}">
                <span class="tab-title-b">网银存款</span>
            </router-link>
            <span class="tab-title-a">银联/京东存款</span>
        </div>
        <div class="master-box">
            <h3>【银联扫码】【京东存款】</h3>
            <div class="title-box">
                <span class="title-mobile">手机设备</span>
                <router-link :to="{name:'guideJdpaypc'}">
                    <span class="title-pc">电脑设备</span>
                </router-link>
            </div>
            <p>①.存款—银联扫码/京东存款—填写您的存款金额后，进行提交；</p>
            <p>②.页面跳转将会为您呈现一个收款二维码</p>
            <p>③.请先将二维码图片截取放入手机相册。</p>
            <p>④.打开相适应的APP进行扫码，点击扫码介面右上方的"..."按钮，选择"从相册选择二维码/条码"。</p>
            <p>⑤.扫码成功即可支付。</p>
            <div class="tech-block">
                <img src="./images/jdpay/jdpay1.jpg">
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
