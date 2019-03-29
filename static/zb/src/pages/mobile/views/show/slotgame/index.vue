<template>
  <div class="slot-game-box">
    <slotgameMenu @fromMenu="activiedMenu"></slotgameMenu>
    <div class="filter-box" v-show="chooseMenu == 'slot'">
      <fliter-input v-model="chooseMenu" style="flex: 5">
        
      </fliter-input>
      <v-filter></v-filter>
    </div>
    <!-- <div class="jack-box">
      <jackpot></jackpot>
      <win-list></win-list>
    </div> -->
    
    <dada-list :value="chooseMenu" v-model="chooseMenu"></dada-list>
  </div>
</template>
<script>
  import jackpot from "./components/jackpot"
  import winList from "./components/winning-list"
  import vFilter from "./components/filter"
  import slotgameMenu from "./components/menu/index"
  import dadaList from "./components/data-list/index"
  import fliterInput from "./components/fliter-input"
  import {mapGetters} from 'vuex';
  export default {
    data() {
      return {
        chooseMenu:'slot'
      };
    },
    methods: {
      activiedMenu(val){
        this.chooseMenu = val
      }
    },
    components: {
      vFilter, dadaList, fliterInput, slotgameMenu,jackpot,winList
    }
  };
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .slot-game-box {
    .filter-box {
      display: flex;
      min-height: 7rem;
      line-height: r(86);
      background: #111b39;
      position: fixed;
      top: r(200);
      z-index: 12;
      padding: 0 2%;
      width: 100%;
    }
    .slot_game_result{text-align: center;line-height: 1.5; margin: 1em 0; @include  f(28px);}
    .jack-box{
      position: fixed;
      top: 5rem;
      z-index: 13;
      padding: 0 2%;
      width: 100%;
    }
  }

</style>
