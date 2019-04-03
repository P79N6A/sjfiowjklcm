<template>
    <div class="accountBottom" @click="gopage">
        <!-- <h3 class="text">平台客服热线<br>{{SETTING.Tel}}</h3> -->
    </div>
</template>
<script>
import {
    SETTING
  } from "@/assets/data"
export default {
    data() {
      return {
        SETTING,
      };
    },
    methods:{
        gopage(){
            this.$router.push({name:'cooperation'})
        }
    }
  }
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.accountBottom{
    background: url('./images/pic_list_bg1.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    height: r(180);
    width: 98%;
    margin: 0 auto;
    border-radius: 5px;
    position: relative;
    .text{
        font-family: PingFangSC-Regular;
        @include f(24px);
        color: #000;
        letter-spacing: 0;
        margin: r(10) auto;
        height: r(100);
        line-height: r(45);
        padding-left: r(60);
        padding-top: r(45);
        // font-weight: normal;
    }
}
</style>
