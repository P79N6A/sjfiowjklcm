<template>
  <div class="index-page">
    <banner></banner>
    <announce></announce>
    <!-- <jackpot></jackpot> -->
    <game-list></game-list>
    <!-- <welfare></welfare> -->
    <!-- <win-list></win-list> -->
    <!-- <hotgame></hotgame> -->
    <downclient></downclient>
    <alert-tips></alert-tips>
  </div>
</template>
<script>
import banner from "./components/banner";
import announce from "./components/announce";
import jackpot from "./components/jackpot";
import gameList from "./components/game-list";
import winList from "./components/winning-list";
import hotgame from "./components/hot-game";
import welfare from "./components/welfare";
import downclient from "./components/down-client/index";
import alertTips from "./components/alert-tips";

export default {
  data() {
    return {};
  },
  components: {
    banner,
    gameList,
    winList,
    hotgame,
    welfare,
    downclient,
    alertTips,
    announce,
    jackpot
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.index-page {
  background: $body-bg;
}
</style>

