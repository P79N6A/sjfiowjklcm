<template>
  <div class="index-page">
    <banner></banner>
    <announce></announce>
    <account-menu></account-menu>
    <jackpot></jackpot>
    <game-list></game-list>
    <hotgame></hotgame>
    <win-list></win-list>
    <!-- <downclient></downclient> -->
    <!-- <welfare></welfare> -->
    <app-down></app-down>
    <alert-tips></alert-tips>
  </div>
</template>
<script>
  import banner from "./components/banner"
  import announce from "./components/announce"
  import accountMenu from "./components/account-menu"
  import jackpot from "./components/jackpot"
  import gameList from "./components/game-list"
  import hotgame from "./components/hot-game"
  import winList from "./components/winning-list"
  // import welfare from "./components/welfare"
  // import downclient from "./components/down-client/index"
  import appDown from "./components/app-down/index";
  import alertTips from "./components/alert-tips"

  export default {
    data() {
      return {
      };
    },
    components: {
      banner, 
      announce,
      accountMenu,
      jackpot,
      gameList, 
      hotgame, 
      winList, 
      // welfare,
      // downclient,
      appDown,
      alertTips,
    }
  };
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.index-page {
  background: $body-bg;
}
</style>

