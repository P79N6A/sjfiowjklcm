<template>
  <div>
    <header class="header-back-no">
      <i class="iconclass left-icon" @click="value=true" v-if="!$route.meta.isBack"></i>
      <i class="iconclass iconfont icon-xingzhuang" @click="$router.back();" v-else></i>

      <slot>{{$route.meta.headName||$route.meta.title}}</slot>
      
      <a class="item-href" @click="valueRight=true">
        <i class="iconclass right-icon"></i>
      </a>
      <tool-bar v-model="value"></tool-bar>
      <tool-barright v-model="valueRight"></tool-barright>
    </header>
  </div>
</template>
<script>
import toolBar from "mobile/master/t1/show/components/tool-bar";
import toolBarright from "mobile/master/t1/show/components/tool-bar-right";
import { SETTING } from "@/assets/data";
export default {
  data() {
    return {
      SETTING,
      value: false,
      valueRight: false,
    };
  },
  props: {
    isBack: {
      type: Boolean
    }
  },
  methods: {},
  components: {
    toolBar,toolBarright
  }
};
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
.header-back-no {
  position: relative;
  width: 100%;
  z-index: 999;
  color: #fff;
  height: r($header-h);
  line-height: r($header-h);
  text-align: center;
  @include f(36px);
    .iconclass {
    @include f(48px);
    color: #fff;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: inline-block;
    vertical-align: middle;
  }
  .left-icon {
    left: r(16);
    width: r(58);
    height: r(48);
    background: url(./images/other-sprite.png) no-repeat top r(5) left/100% ;
  }
  .right-icon {
    right: r(16);
    width: r(52);
    height: r(52);
    background: url(./images/cs2.png) no-repeat center/100%;
  }
  .link_logo {
    display: inline-block;
    height: 80%;
    img {
      height: 90%;
    }
  }
  .head-title {
    @include f(36px);
    color: #fff;
  }
}
</style>
