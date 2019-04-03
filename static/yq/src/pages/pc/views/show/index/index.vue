<template>
  <div class="index-main">
    <banner></banner>
    <div class="content">
      <div class="top_section inblock_fix">
        <download></download>
        <jackpot></jackpot>
      </div>
      <div class="bottom_section inblock_fix">
        <winningList></winningList>
        <carousel></carousel>
      </div>
      <div class="mid_section inblock_fix">
        <others></others>
        <recommandGames></recommandGames>
      </div>
    </div>
  </div>
</template>
<script>
  import annunciate from 'pc/components/annunciate'
  import banner from "./components/banner";
  import jackpot from "./components/jackpot";
  import carousel from "./components/carousel"
  import download from "./components/download"
  import recommandGames from "./components/recommand-games/"
  import winningList from './components/winning-list'
  import others from './components/others'
  
  export default {
    data() {
      return {
            active: 0,
      };
    },
    components: {
      annunciate,
      banner,
      recommandGames,
      carousel,
      download,
      winningList,
      jackpot,
      others
    },
    methods: {
    },
    created() {

    },
    mounted() {
    },
    activated() {
    },
  };

</script>
<style lang="scss" scoped>
.index-main{
  background: #f1f1f1;
  .content{
    padding-top: 22px;
    width: 1200px;
    margin: 0 auto;
    .inblock_fix{
      letter-spacing: -4px;
      font-size: 0;
    }
    .bottom_section{
      margin-top: 20px;
    }
    .mid_section {
      margin: 20px 0;
      position: relative;
      z-index: 2;
    }
  }
}
</style>
