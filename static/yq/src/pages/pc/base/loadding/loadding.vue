<template>
  <div :class="['load-box',className]" v-show="show">
    <div v-show="data==null" class="load-gif">
      <img src="./load.gif">
      <p>{{text}}</p>
    </div>
    <solt v-show="show">
    </solt>
  </div>
</template>
<script>
//  import cover from '@/base/cover/cover';
  export default {
    data() {
      return {};
    },
    props:{
      show:{
        type:Boolean,
        default:false
      },
      text:{
        type:String,
        default:""
      },
      className:""
    },
    methods:{
    }
  };
</script>
<style lang="scss">
  @import "~@/assets/scss/mixin.scss";
  .load-gif {
    padding-top: 20px;
    text-align: center;
     @include f(32px);
  }
</style>
