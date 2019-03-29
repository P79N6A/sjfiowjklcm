<template>
  <div class="grid-row">
    <div class="top-title">设置</div>
    <div v-for="(item,i) in data" :key="i" class="grid-row-item" @click="clickMetod(item,i,$event)">
      <i class="icontest" :class="item.ico"></i>
      <slot>{{item.name}}</slot>
      <i class="iconfont icon-arrow_r"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        index: 0
      }
    },
    methods: {
      clickMetod(item, i, e) {
        this.index = i;
        if (item.to) {
          this.$router.push(item.to);
        }
        else if (item.params) {
          this.$emit("roulist", item, i, e)
        }
      }
    },
    props: {
      data: {
        type: Array
      }
    }
  }
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .grid-row {
    background: $main-bg;
    color: $main-cl;
    border-top: 1px solid $cl7;
    border-bottom: 1px solid $cl7;
    .top-title {
        @include f(30px);
        height: r(80);
        line-height: r(80);
        padding-left: r(40);
        position: relative;
        border-bottom: 1px solid $cl7;
        &::before {
            content: '';
            position: absolute;
            left: r(20);
            top: 50%;
            transform: translateY(-50%);
            width: r(6);
            height: r(26);
            background: #ff3d4b;
        }
    }
    .grid-row-item {
      display: block;
      height: r(50*2);
      cursor: pointer;
      line-height: r(50*2);
      border-bottom: 1px solid $cl7;
      @include f(28px);
      padding: 0 r(20);
      position: relative;
      .icon-arrow_r {
        position: absolute;
        right: r(30);
        top: 50%;
        transform:translateY(-50%);
      }
      .icontest{
        margin-right: 7px;
        display: inline-block; 
        width:r(50); 
        height:r(50); 
        white-space:nowrap; 
        color: transparent;
        vertical-align: middle;
        margin-top: r(-6);
      }
      .iconList1{
        background: url('./images/ico_yongjng@3x.png') no-repeat;
        background-size: 100% 100%;
      }
      .iconList2{
        background: url('./images/ico_vip@3x.png') no-repeat;
        background-size: 100% 100%;
      }
      .iconList3{
        background: url('./images/ico_caiwu@3x.png') no-repeat;
        background-size: 100% 100%;
      }
      .iconList4{
        background: url('./images/ico_limit@3x.png') no-repeat;
        background-size: 100% 100%;
      }
      .iconList5{
        background: url('./images/ico_group@3x.png') no-repeat;
        background-size: 100% 100%;
      }
      .iconList6{
        background: url('./images/ico_draw@3x.png') no-repeat;
        background-size: 100% 100%;
      }
      .iconList7{
        background: url('./images/ico_setting@3x.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
</style>
