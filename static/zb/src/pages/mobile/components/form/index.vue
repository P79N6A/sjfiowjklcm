<template>
  <div class="form-control-block">
    <slot></slot>
    <i v-if="select!=''" class="right-info iconfont icon-arrow_r"></i>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    props: {
      select:{
        default:''
      }
    },
    methods: {},
    computed: {},
    created() {
    },
    components: {}
  };
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";

  .form-control-block {
    position: relative;
    height: r(80);
    line-height: r(80);
    overflow: hidden;
    border: 1px solid #fff;
    background:#fff;
    padding: 0 r(24);
    border-radius: 50em;
    margin-bottom: r(29);
    @include f(26px);
    &>select,&>input[type='text'],&>input[type='password'],input {
      font-size: inherit;
      border: none;
      color: #333;
      outline: none;
      height: 100%;
      width: 100%;
      vertical-align: top;
      text-indent: 0.5em;
      background: #fff;
    }
    .right-info {
      position: absolute;
      height: 100%;
      top: 0;
      right: r(32);

    }
  }
</style>
