<template>
  <div>
    <tab></tab>
    <div class="tab-h"><h3>如何取款:</h3></div>
    <div class="master-box">
        <div class="title-box">
            <span class="title-mobile">手机设备</span>
            <router-link :to="{name:'guideWechatpc'}">
              <span class="title-pc">电脑设备</span>
            </router-link>
        </div>
        <p>①.登入会员账号后点击‘会员中心’然后选择‘取款’请在提款前先完善个人资料并绑定银行卡号</p>
        <div class="tech-block">
            <img src="./images/withdrawal/withdrawalpc1.jpg">
        </div>
        <p>②.进入提款页面后→选择提款银行，填写取款金额，点击提交；</p>
        <div class="tech-block">
            <img src="./images/withdrawal/withdrawalpc2.jpg">
        </div>
        <p>③.成功提交后，一般1-3分钟到账，最晚10分钟内到账。</p>
        <h3>取款需知：</h3>
        <p>①.最低提款金额为100；</p>
        <p>②.首次提款会进行电话核实，请您保持电话畅通，以便快速为您核实后出款</p>
        <p>③.存款成功后，未申请任何优惠的情况下，需投注存款金额的 一倍流水方可进行提款</p>
        <p>④.会员绑定的银行卡姓名须与注册姓名一致，如卡号与姓名不相符，无法顺利出款；</p>
        <p>⑤.每位会员最多只能绑定三张银行卡，如需解绑银行账号请您联系24小时【在线客服】</p>
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
