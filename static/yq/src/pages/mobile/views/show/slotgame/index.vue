<template>
  <div class="slot-game-box">
    <slotgameMenu @fromMenu="activiedMenu"></slotgameMenu>
    <div class="filter-box" v-show="chooseMenu == 'slot'">
      <fliter-input v-model="chooseMenu" style="flex: 5"></fliter-input>
      <v-filter></v-filter>
    </div>
    <dada-list :value="chooseMenu" v-model="chooseMenu"></dada-list>
  </div>
</template>
<script>
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
    created(){
      if(this.$route.params.type){
          this.chooseMenu = this.$route.params.type
        }
    },
    components: {
      vFilter, dadaList, fliterInput, slotgameMenu
    }
  };
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .slot-game-box {
    // background: $main-bg;
    .filter-box {
      display: flex;
      // min-height: r(210);
      line-height: r(86);
      background: $body-bg;
      // position: fixed;
      // top: r(180);
      // z-index: 99;
      margin-top: r(100);
      padding:0 r(20) r(20);
      width: 100%;
    }
    .slot_game_result{text-align: center;line-height: 1.5; margin: 1em 0; @include  f(28px);}
  }

</style>
