<template>
  <div class="auth-form-inline">
    <label class="form-label">
      <slot name="left">
        {{label}}
      </slot>
    </label>
    <div class="form-control">
      <slot></slot>
      <i v-if="select!=''" class="right-info iconfont icon-arrow_r"></i>
    </div>
  </div>
</template>
<script>
  export default {
    name: "",
    data() {
      return {}
    },
    props: {
      select:{
        default:''
      },
      label:{
        type:String
      }
    },
    computed: {},
    watch: {},
    methods: {},
    created() {
    },
    activated() {
    },
    components: {}
  }
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .auth-form-inline {
    position: relative;
    height: r(80);
    line-height: r(78);
    overflow: hidden;
    border: 1px solid #fff;
    padding: 0 r(24);
    border-radius: 50em;
    margin-bottom: r(29);
    background:none;
    display: flex;
    .form-label {
      text-align: right;
      white-space: nowrap;
      display: block;
      text-align: right;
    }
    .form-control {
      @include f(28px);
      height: 100%;
      white-space: nowrap;
      select, input {
        vertical-align: top;
        font-size: inherit;
        background: none;
        border: none;
        color: #fff;
        outline: none;
        height: 100%;
        width: 100%;
      }
      .right-info {
        position: absolute;
        height: 100%;
        top: 0;
        right: r(32);
      }
    }
  }
</style>
