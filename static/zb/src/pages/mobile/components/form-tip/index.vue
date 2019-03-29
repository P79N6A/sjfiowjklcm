<template>
  <div class="form-tip">
    <div class="title">{{title}}</div>
    <slot></slot>
    <slot name="link">
    </slot>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    props: {
      title: {
        type: String,
        default: "温馨提示"
      }
    },
    components: {}
  };
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .form-tip {
    @include f(24px);
    position: relative;
    text-align: left;
    margin: 2em 0;
    padding: r(20);
    background: #666;
    line-height: r(44);
    color: #d7b26c;
    border-radius: r(20);
    line-height: r(50);
    .title {
      position: absolute;
      height: r(34);
      line-height: r(34);
      background: #999;
      top: r(-17);
      border-radius: r(17);
      left: 50%;
      min-width: r(204);
      text-align: center;
      transform: translateX(-50%);
    }
  }
</style>
