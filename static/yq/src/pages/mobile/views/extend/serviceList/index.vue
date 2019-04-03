<template>
  <div class="serviceList">
    <router-link :to="{name:'service'}" class="flex menu-list-item">
      <span class="main-ico icon1"></span>
      <span class="menu-text">意见反馈</span>
      <span class="iconcent ct-jiantou"></span>
    </router-link>
    <router-link :to="{name:'serviceLog'}" class="flex menu-list-item">
      <span class="main-ico icon2"></span>
      <span class="menu-text">反馈记录</span>
      <span class="iconcent ct-jiantou"></span>
      <span class="status" v-if="unreadAndReply">{{unreadAndReply}}</span>
    </router-link>
  </div>
</template>
<script>
import { suggestCategories, applySuggestion } from "@/api/user";
import check from "@/util/RegExp";
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  props: {},
  watch: {},
  computed: {
    ...mapGetters(["unreadAndReply"])
  },
  methods: {},
  mounted() {},
  created() {},
  components: {}
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.serviceList {
  background: #fff;
  flex-direction: column;
  width: 100%;
  margin-bottom: r(20);
  .menu-list-item {
    border-bottom: 1px solid #ccc;
    @include f(30px);
    justify-content: space-between;
    align-items: center;
    text-align: center;
    width: 100%;
    height: r(90);
    position: relative;
    .status {
      position: absolute;
      right: r(80);
      top: 50%;
      transform: translateY(-50%);
      background: red;
      padding: r(4) r(8);
      border-radius: 50%;
      color: #fff;
    }
    .main-ico {
      width: r(50);
      height: r(50);
      flex: 1;
      &.icon1 {
        background: url("./images/icon1.png") no-repeat;
        background-size: contain;
        background-position: center;
      }
      &.icon2 {
        background: url("./images/icon2.png") no-repeat;
        background-size: contain;
        background-position: center;
      }
    }
    .menu-text {
      flex: 5;
      text-align: left;
      font-family: PingFangSC-Regular;
      @include f(28px);
      color: #333;
      line-height: r(75);
      position: relative;
    }
    .ct-jiantou {
      color: #c7c7c7;
      @include f(40px);
      flex: 1;
    }
  }
}
</style>
