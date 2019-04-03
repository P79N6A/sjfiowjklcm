<template>
  <div class="soltmenubox">
    <!-- 游戏框  -->
    <div class="slot-menu">
      <div class="slot-menu-item" v-for="(item,i) in allData" :key="i" :class="item.type">
        <router-link :to="{name:'slotgame',params:{type:item.value,flag:true}}">
          <img v-lazy="getimg(item)">
          <p class="texttype">{{item.name}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      allData: [
        { value: "slot", name: "老虎机游戏", img: "tiger.png" },
        { value: "real", name: "真人娱乐", img: "live.png" },
        { value: "sport", name: "体育游戏", img: "sports.png" },
        { value: "lottery", name: "彩票", img: "lottery.png" },
        { value: "fish", name: "捕鱼", img: "fish.png" },
        { value: "chess", name: "棋牌", img: "chess.png" },
      ]
    };
  },
  methods: {
    getimg(item) {
      return require(`./images/${item.img}`);
    },
    agClick(item, e) {
      if (this.islogin) {
        if (this.isAgent) {
          $alert("代理不能游戏！");
        } else {
          window.open(item.href);
        }
      } else {
        toast("请先登录！");
      }
      //  return item.method&&item.method(e,item,this)
    }
  },
  created() {},
  computed: {
    ...mapGetters(["isAgent", "islogin"]),
    islogin() {
      return this.$store.getters.islogin;
    }
  },
  components: {}
};
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
.soltmenubox {
  background: $main-bg;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  .slot-menu {
    padding: 0 r(14) ;
    @include f(28px);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .slot-menu-item {
      width: 49%;
      a {
        display: block;
        img {
          width: 100%;
        }
        .texttype {
          margin: r(15) 0 r(30);
        }
      }
    }
  }
}
</style>
