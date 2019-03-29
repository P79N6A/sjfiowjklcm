<template>
  <div class="gameListBox">
    <router-link
      :to="{name:'slotgame',params:{type:item.type,flag:true}}"
      class="gameList"
      :class="[item.type]"
      v-for="item in allData"
      :key="item.type"
    >
      <p class="titleCH-p">{{item.title}}</p>
      <p class="titleEN-p">{{item.title_EN}}</p>
      <div class="gameLabel">
        <i class="iconbolin iconbolin-label"></i>
        <span v-for="(val,i) in item.value" :key="i">{{val}}</span>
      </div>
    </router-link>
  </div>
</template>
<script>
import { Games } from "@/assets/data";
import { mapGetters } from "vuex";

let allData = [
  {
    title: "老虎机游戏",
    title_EN: "SLOT GAMES",
    type: "slot",
    value: ["PT", "MG", "DT", "PNG", "NT", "CQ9", "MW", "BBIN", "TGP", "LG", "JDB"]
  },
  {
    title: "现场荷官",
    title_EN: "LIVE DEALER",
    type: "real",
    value: ["AG真人", "OG真人", "申博真人", "BBIN真人", "DG真人"]
  },
  {
    title: "体育游戏",
    title_EN: "SPORTS GAME",
    type: "sport",
    value: ["沙巴体育", "新皇冠体育"]
  },
  {
    title: "彩票游戏",
    title_EN: "LOTTERY GAMES",
    type: "lottery",
    value: ["VR彩票", "BBIN彩票", "IG彩票", "彩播彩票"]
  },
  {
    title: "电子竞技",
    title_EN: "E-SPORTS",
    type: "esport",
    value: ["泛亚电竞"]
  },
  {
    title: "棋牌游戏",
    title_EN: "CHESS GAMES",
    type: "chess",
    value: ["761棋牌", "开元棋牌", "MW棋牌", "BY棋牌"]
  },
  {
    title: "捕鱼游戏",
    title_EN: "FISH GAMES",
    type: "fish",
    value: ["AG捕鱼", "MW捕鱼", "JDB捕鱼"]
  }
  
];

export default {
  data() {
    return {
      allData: allData
    };
  },
  methods: {},
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
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.gameListBox {
  padding: r(10);
  .gameList {
    display: block;
    height: r(160);
    margin-bottom: r(10);
    padding: 3vh 0 0 28vw;
    color:#e4e7ed;
    &.sport {
      background: url(./images/sport.png) center/100% 100%;
    }
    &.esport {
      background: url(./images/esport.png) center/100% 100%;
    }
    &.real {
      background: url(./images/real.png) center/100% 100%;
    }
    &.slot {
      background: url(./images/slot.png) center/100% 100%;
    }
    &.lottery {
      background: url(./images/lottery.png) center/100% 100%;
    }
    &.fish {
      background: url(./images/fish.png) center/100% 100%;
    }
    &.chess {
      background: url(./images/chess.png) center/100% 100%;
    }
    .titleCH-p {
      @include f(34px);
      margin-bottom: r(15);
    }
    .titleEN-p {
      @include f(24px);
      margin-bottom: r(25);
    }
    .gameLabel {
      color: #cccccc;
      width: r(500);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      span {
        margin-right: r(10);
      }
    }
  }
}
</style>
