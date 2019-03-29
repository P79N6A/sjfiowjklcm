<template>
  <div class="tableList-box">
      <div class="top-title">代理报表</div>
      <div class="tableList">
          <router-link :to="item.to" v-for="(item,i) in data" :key="i" :class="item.ico">
              <span class="span-text">{{item.name}}</span>
          </router-link>
      </div>
  </div>
</template>
<script>
  export  default {
    props: {
      data: {
        type: Array
      }
    },
    data(){
      return {}
    },
  }
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
  .tableList-box {
    background: $main-bg;
    color: $main-cl;
    margin-bottom: r(20);
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
    .tableList {
        display: flex;
        justify-content: space-between;
        padding: r(20);
        a {
            display: block;
            width: 32%;
            height: r(270);
            position: relative;
            &.iconList1 {
                background: url(./images/bg_yongjin@3x.png) no-repeat center center/100% 100%;
            }
            &.iconList2 {
                background: url(./images/bg_huiyuan@3x.png) no-repeat center center/100% 100%;
            }
            &.iconList3 {
                background: url(./images/ico__caiwu@3x.png) no-repeat center center/100% 100%;
            }
            .span-text {
                position: absolute;
                bottom: r(58);
                left: 0;
                width: 100%;
                text-align: center;
                @include f(28px);
            }
        }
    }
  }
</style>
