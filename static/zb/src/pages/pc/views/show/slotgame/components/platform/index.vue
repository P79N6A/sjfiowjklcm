<template>
  <ul class="tas-fixed-width tabs">
    <li v-for="item in platformData" :key="item.value" class="tab col"
      >
        <router-link :to="{name:'gameIndex',params:{type:item.value}}">
          {{item.name}}
        </router-link>
      </li>
  </ul>
</template>
<script>
import { mapGetters } from "vuex";
import { Games } from "@/assets/data";
import { platformData } from "@/assets/data/index";
import openWindow from "@/util/openWindow";
export default {
  data() {
    return {
      Games,
      platformData,
      inputVal: "",
      platformData1: [],
      gameMinIndex: 0,
      gameMaxIndex: 5,
      gamelen: ""
    };
  },
  methods: {
    chooseType(item) {
      // PT特殊处理
      // if (item.value == "LG") {
      //   if (this.islogin) {
      //     openWindow("/static/page/lg/index.html", "LG老虎机", "900", "640");
      //   } else {
      //     window.toast("请先登录",'warning');
      //   }
      //   return;
      // } else {
        this.active = item.value;
        this.$bus.$emit("serachGame", "category", item.value);
      // }
    },
    open(url, title, w, h, needLogin) {
      if (needLogin) {
        if (!this.islogin) {
          window.toast("请先登录",'warning');
          return;
        }
      }
      openWindow(url, title, w, h);
    }
  },
  computed: {
    ...mapGetters(["islogin"])
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.tas-fixed-width {
  display: flex;
  padding-left: 0;
  list-style-type: none;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  height: 48px;
  width: 100%;
  background-color: #fff;
  margin: 0 auto;
  white-space: nowrap;
  .tab {
    display: inline-block;
    text-align: center;
    line-height: 48px;
    padding: 0;
    margin: 0;
    text-transform: uppercase;
    flex: 1;
    &.active {
      border-bottom: 2px solid #2293fc;
    }
  }
}
</style>
