<template>
<div>
  <header class="header-back">
    <a @click="doClick" class="back-link"><i class="iconfont icon-arrow_l"></i>返回</a>
      <slot>
        {{$route.meta.headName||$route.meta.title}}
      </slot>
    <a :href="SETTING.live800" target="_blank" class="filterbtn"><i class="iconcent ct-kefu1"></i></a>
  </header>
  </div>
</template>
<script>
import  {SETTING} from "@/assets/data"
  export default {
    data() {
      return {
        SETTING,      
      }
    },
    props: {
      back: {
        type: Function
      }
    },
    methods: {
      doClick(){
        this.$router.back();
      },
      doFilter(){
        console.log('筛选')
      }
    }
  };
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .header-back{
    position: fixed;
    top:0;
    width:100%;
    z-index: 999;
    background:$herder-bg;
    color: $main-cl;
    height: r(100);
    text-align: center;
    line-height: r(100);
    @include  f(36px);
    .back-link{
      position: absolute;
      height: 100%;
      left:0;
      width:r(120);
      top:50%;
      transform:translateY(-50%);
      text-align: center;
      @include f(32px)
    }
    .filterbtn {
      position: absolute;
      height: 100%;
      right:0;
      width:r(120);
      top:50%;
      transform:translateY(-50%);
      text-align: center;
      @include f(32px);
      .iconcent {
        @include f(44px);
      }
    }
  }
</style>
