<template>
    <div class="tipsDiv">
        <p class="tipsTitle">温馨提示：</p>
        <p class="tipsBox">1、请在户内转账前进行平台激活方可转账成功。</p>
        <p class="tipsBox">2、登录PT游戏客户端时请前缀{{WEBCONFIG.PtBefore}}，例如，游戏账号为{{WEBCONFIG.name}}001，请在登录PT客户端时，需在账号处填写{{WEBCONFIG.PtBefore}}{{WEBCONFIG.name}}001，方可正常登录进入游戏。</p>
        <p class="tipsBox">3、需要申请首存的玩家，申请成功前请勿在此进行转账，请进入我的——账户中心——自助存送优惠，进行申请操作，否则错过无法再次申请。</p>
        <!-- <p class="tipsBox" v-for="item in tips" :key="item">{{item}}</p> -->
    </div>
</template>
<script>
import { WEBCONFIG } from "@/assets/data";
export default {
    data(){
        return{
            WEBCONFIG
        }
    }
}
</script>
<style lang="scss" scoped>
.tipsDiv{
    padding: 0 0 20px 20px;
    font-size: 15px;
    line-height: 30px;
    width: 800px;
    .tipsTitle{
        color: #fff;
    }
    .tipsBox{
        color:#b5b5b5;
    }
}
</style>

