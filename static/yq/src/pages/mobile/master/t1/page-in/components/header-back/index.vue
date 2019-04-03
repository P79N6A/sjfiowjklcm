<template>
<div>
  <header class="header-back">
    <a @click="doClick" class="back-link"><i class="iconfont icon-xingzhuang"></i><span>返回</span></a>
      <slot>
        {{headerTxt||$route.meta.headName||$route.meta.title}}
      </slot>
    <a class="filterbtn" @click="valueRight=true"><img src="./img/head-chat.png" alt=""><span>客服</span></a>
  <tool-barright v-model="valueRight"></tool-barright>
  </header>
  </div>
</template>
<script>
import  {SETTING} from "@/assets/data"
import toolBarright from "mobile/master/t1/show/components/tool-bar-right";
  export default {
    data() {
      return {
        SETTING,   
        headerTxt:null,
        valueRight: false,   
      }
    },
    props: {
      back: {
        type: Function
      }
    },
    created() {
      this.$bus.$on('setHeaderTxt',eventData=>{
        this.headerTxt = eventData
      })
    },
    methods: {
      doClick(){
        this.$router.back();
      },
      doFilter(){
        console.log('筛选')
      }
    },
    components: {
      toolBarright
    },
  };
</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
  .header-back{
    position: fixed;
    top:0;
    width:100%;
    z-index: 999;
    background:$header-bg;
    height: r($header-h);
    line-height: r($header-h);
    color: #ffffff;
    text-align: center;
    @include  f(36px);
    .back-link{
      position: absolute;
      height: 100%;
      left:0;
      // width:r(120);
      top:50%;
      transform:translateY(-50%);
      @include f(40px);
      text-align: center;
      span {
        @include f(32px)
      }
    }
    .filterbtn {
      position: absolute;
      height: 100%;
      right:0;
      width:r(80);
      top:50%;
      transform:translateY(-50%);
      text-align: center;
      @include f(32px);
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      img {
        height: r(50);
      }
      span {
        line-height: 1;
        font-size: 14px;
      }
    }
  }
</style>
