<template>
<div>
  <header class="header-back-no">
    <a @click="doClick" class="back-link" v-if="isBack"><i class="iconfont icon-arrow_l"></i>返回</a>
    <a @click="value=true" class="back-link" v-else><i class="iconbolin iconbolin-sidebar"></i></a>
      <slot>
        {{$route.meta.headName||$route.meta.title}}
      </slot>
    <a :href="SETTING.live800" target="_blank" class="filterbtn"><i class="iconcent ct-kefu1"></i></a>
  </header>
   <tool-bar v-model="value"></tool-bar>   
  </div>
</template>
<script>
import toolBar from 'mobile/master/t1/show/components/tool-bar';
import  {SETTING} from "@/assets/data"
  export default {
    data() {
      return {
        SETTING,    
        value:false,  
      }
    },
    props: {
      isBack: {
        type: Boolean
      }
    },
    methods: {
      doClick(){
        this.$router.back();
      }
    },
    components: {
      toolBar
    }
    
  };
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .padding-top{
    height:r(100);
    background:none;
  }
  .header-back-no{
    position: relative;
    width:100%;
    z-index: 99;
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
      @include f(32px);
      .iconbolin {
        @include f(44px);
      }
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
