<template>
    <div class="formTips">
        <slot></slot>
    </div>
</template>
<script>
export default {
    data(){
        return{
            formTips:[]
        }
    },
    created() {
        this.$bus.$on('getFormTips',eventData=>{
            this.formTips = eventData
        })
    },
    activated() {
        this.$bus.$on('getFormTips',eventData=>{
            this.formTips = eventData
        })
    },
}
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.formTips{
    background: transparent;
    padding: r(30);
    position: relative;
    // .formTipsItem{
    //     padding: r(10);
    //     display: flex;
    //     flex-wrap: wrap;
    //     justify-content: flex-start;
        p{
            font-family: PingFangSC-Regular;
            @include f(28px);
            color: #000;
            letter-spacing: 0;
            line-height: 1.7;
            margin-bottom: r(10);
        }
        span{
            border: 1px solid #a7a7a8;
            background: #303030;
            border-radius: 10px;
            color: #a7a7a8;
        }
    // }
   
}
</style>
