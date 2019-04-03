<template>
  <div class="slotgameContent">
    <div
      class="slotgameBox"
      v-for="item in data"
      :class="{active:cur==item.value}"
      @click="search(item.value)"
      :key="item.value"
    >{{item.name}}</div>
  </div>
</template>

<script>
import { Games } from "@/assets/data";
export default {
  data() {
    return {
      cur: "slot",
      data: {
        slot: {
          name: "老虎机",
          value: "slot"
        },
        real: {
          name: "真人",
          value: "real"
        },
        sport: {
          name: "体育/电竞",
          value: "sport"
        },
        lottery: {
          name: "彩票",
          value: "lottery"
        },
        chess: {
          name: "棋牌",
          value: "chess"
        },
        fish: {
          name: "捕鱼",
          value: "fish"
        }

        // download:{
        //     name: "客户端下载",
        //     value: 'download',
        // }
      }
    };
  },
  watch: {
    $route(val) {
      if (val.params.type) {
        this.cur = val.params.type;
        this.search(val.params.type);
      } else {
        this.cur = "slot";
        this.search("slot");
      }
    }
  },
  methods: {
    search(item) {
      console.log(item);
      this.cur = item;
      this.$emit("fromMenu", item);
      //默认查询全部
      // this.$bus.$emit('serachGame', 'category', '');
    }
  },
  created() {
    let type = this.data.slot.value;
    if (this.$route.params.type) {
      type = this.$route.params.type;
    }
    this.search(type);
  }
};
</script>

<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.slotgameContent {
  width: 100%;
  height: r(100);
  text-align: center;
  position: fixed;
  top: r($header-h);
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 r(20);
  background: $main-bg;
  .slotgameBox {
    // width: 19%;
    padding: r(15) 0;
    display: inline-block;
    @include f(28px);
    color: #090e1d;
    // background:#f4faff;
    // border-radius: r(25);
    &.active {
      color: #ff5544;
      border-bottom: 1px solid #ff5544;
    }
  }
}
</style>

