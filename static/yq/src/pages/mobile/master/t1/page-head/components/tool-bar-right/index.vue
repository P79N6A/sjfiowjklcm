<template>
  <transition name="fade">
    <div class="tool-warp" v-show="myValue" @click.self="myValue=false">
      <transition name="slideRight">
        <div v-show="myValue" class="tool-bar">
          <a class="tool-item-href" target="_blank" :href="SETTING.live800">
            <i class="cs-sprite c1"></i>
            <br>在线客服 / 与客服对话
          </a>
          <router-link class="tool-item-href" :to="{name:'backCall'}">
            <i class="cs-sprite c3"></i>
            <br>电话回拨
          </router-link>
          <a class="tool-item-href" target="_blank" :href="'mailto:'+SETTING.email">
            <i class="cs-sprite c4"></i>
            <br>客服邮箱
            <br>
            {{SETTING.email}}
          </a>
          <div class="tool-item-href">          
            <div>
              <img src="/static/images/wechatQr/DEFAULT.png" style="width:100%;">
            </div>
            微信客服
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
import { SETTING } from "@/assets/data";
import { mapGetters } from "vuex";
import { backCall } from "@/controls/common/backCall";

export default {
  data() {
    return {
      SETTING,
      myValue: false,
      searchData: {
        //查询条件
        total: "10", //true string
        v: "", //true string
        size: "10", // true string
        pageIndex: "1" //
      }
    };
  },
  props: ["value"],
  computed: {
    ...mapGetters(["userData", "islogin", "isUser"])
  },
  watch: {
    value(val) {
      this.myValue = val;
    },
    myValue(val) {
      this.$emit("input", val);
    }
  },
  methods: {},
  created() {}
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.tool-warp {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  .tool-bar {
    @include f(28px);
    transition: transform 0.5s;
    position: absolute;
    top: 0;
    right: 0;
    text-align: left;
    height: 100%;
    width: r(360);
    color: #ffffff;
    background-color: #59dbd0;
    // padding-top: r(300);
    &.active {
      display: block;
      transform: translateX(0);
    }
    .tool-item-href {
      display: block;
      padding: r(24);
      border-bottom: 1px solid #ae904f;
      line-height: 1.4;
      text-align: center;
      .cs-sprite {
        display: inline-block;
        background: url(./images/cs-sprite2.png) no-repeat center;
        background-size: cover;
        width: 40px;
        height: 49px;
        position: relative;
        &.c1 {
          background-position: 0 10px;
        }
        &.c3 {
          background-position: 0 -75px;
          height: r(90);
        }
        &.c4 {
          background-position: 0 -117px;
        }
      }
    }
    .tool-item-href:first-child {
      border-top: 1px solid #bda059;
    }
  }
}
</style>