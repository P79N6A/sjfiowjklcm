<template>
  <div class="form-group-inline">
    <label class="form-label">{{label}}</label>
    <div class="form-control" @click="item">
      <slot></slot>
      <div class="right-info">
        <slot name="right">
        </slot>
      </div>
      <i v-if="select" class="right-info iconfont icon-arrow_r"></i>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    props: {
      label: {
        default: "请选择"
      },
      select: {
        default: ''
      }
    },
    computed: {},
    watch: {},
    methods: {
      item() {
        if (this.select) {
//          icon-arrow_t
        }
      }
    },
    created() {

    },
    activated() {
    },
    components: {}
  }
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";

  .form-group-inline {
    position: relative;
    height: r(80);
    line-height: r(80);
    overflow: hidden;
    display: flex;
    margin-bottom: r(29);
    .form-label {
      text-align: right;
      color: #000;
      min-width: 5em;
      max-width: 8em;
      white-space: nowrap;
      margin-right: r(10);
    }
    .form-control {
      height:r(80);
      border-radius: 20em;
      border: 1px solid #666;
      white-space: nowrap;
      overflow: hidden;
      flex: 1;
      position: relative;
      background-color: #fff;
      select, input,.input {
        vertical-align: top;
        font-size: inherit;
        display: inline-block;
        border: none;
        color: #333;
        outline: none;
        padding-left: r(28);
        line-height:r(80);
        height:r(80);
        width: 100%;
        background-color: #fff;
      }
      input[type='date']{
        appearance: none;
      }
      .right-info {
        position: absolute;
        height: 100%;
        top: 0;
        right: r(30);
        &.iconfont {
          color: #5f5e5f
        }
      }
    }
  }
</style>
