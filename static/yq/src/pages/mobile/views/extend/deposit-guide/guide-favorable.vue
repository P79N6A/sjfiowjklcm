<template>
  <div>
    <tab></tab>
    <div class="tab-h"><h3>如何申请自助优惠：</h3></div>
    <div class="master-box">
        <p>登录账户—会员中心—自助优惠，选择您要申请的优惠活动，申请成功，红利实时到账！</p>
        <p>自助优惠主要包括：<span class="yellow">【存送优惠】</span><span class="yellow">【存送/红包优惠券】</span>
        <span class="yellow">【VIP礼金】</span><span class="yellow">【生日礼金】</span></p>

        <div class="title-box">
            <span class="title-mobile">手机设备</span>
            <router-link :to="{name:'guideFavorablepc'}">
              <span class="title-pc">电脑设备</span>
            </router-link>
        </div>
        <h3>存送优惠：</h3>
        <p>登录账户—用户中心—自助优惠—存送优惠</p>
        <p>选择您要申请的游戏平台及优惠活动，输入您的转账金额系统将自动计算红利与流水，提交成功红利实时到账！</p>
        <div class="tech-block">
            <img src="./images/favorable/favorable1.jpg">
        </div>

        <h3>【存送优惠券】及【红包优惠券】：</h3>
        <p>登录账户—用户中心—自助优惠—存送优惠券/红包优惠券</p>
        <p>优惠券代码会以站内信形式发送给您,请注意查看站内信通知</p>
        <div class="tech-block">
            <img src="./images/favorable/favorable2.jpg">
        </div>
        <p>存送优惠券：将代码复制成功后，进入存送优惠券专区，选择您的游戏平台，填写转入金额及优惠代码即可兑换</p>
        <div class="tech-block">
            <img src="./images/favorable/favorable3.jpg">
        </div>
        <p>红包优惠券：将代码复制成功后，进入红包优惠券专区，选择您的游戏平台，填写优惠代码即可兑换</p>
        <div class="tech-block">
            <img src="./images/favorable/favorable4.jpg">
        </div>

        <h3>存送/红包券兑换须知：</h3>
        <p>1、如提示‘优惠券类型不符’，代表您选择的优惠券类型错误</p>
        <p>2、如提示‘优惠不存在’，代表您填写的代码错误，请确认代码是否正确或是否存在空格</p>
        <p>3、如提示‘优惠券已过期’，代表您的优惠券在规定时间内未兑换已失效。</p>
        <p>4、游戏平台账户余额需低于3元及未存在其他优惠流水限制方可使用存送优惠券;</p>

        <h3>VIP礼金：</h3>
        <p>登录账户—用户中心—自助优惠—VIP礼金</p>
        <p>点击‘检测升级’系统将自动对您的账号进行审核，符合条件直接晋级成功，</p>
        <p>晋级礼金将派发至您的副账户，完成10倍流水后方可提款</p>
        <p>会员每月只享有一次晋级机会，且各等级晋级礼金每位玩家只可以获得一次。</p>
        <div class="tech-block">
            <img src="./images/favorable/favorable5.jpg">
        </div>

        <h3>生日礼金：</h3>
        <p>登录账户—用户中心—自助优惠—生日礼金</p>
        <p>申请生日礼金需在青铜VIP及以上会员等级方可申请，每年只能申请一次，</p>
        <p>生日礼金将根据您填写的生日日期，在当天即可进行自助领取，彩金将派发至您的主账户内无流水要求</p>
        <div class="tech-block">
            <img src="./images/favorable/favorable6.jpg">
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
