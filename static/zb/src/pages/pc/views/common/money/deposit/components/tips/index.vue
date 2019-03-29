<template>
    <div class="tipsDiv">
        <p class="tipsTitle">温馨提示：</p>
        <p class="tipsBox" v-for="item in tips" :key="item">{{item}}</p>
    </div>
</template>
<script>
export default {
    data(){
        return{
            tips:[
                "1.请务必按照填写的姓名和存款金额进行存款，否则您的款项将无法即时到账！",
                "2.如果您的款项5分钟未能到账，请联系24小时在线客服！",
                "3.支付宝转账招商23：00-凌晨01：00有延迟到帐的现象，期间建议您使用其他支付方式！",
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.tipsDiv{
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

