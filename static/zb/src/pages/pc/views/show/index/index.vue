<template>
  <div class="index-main">
    <banner></banner>
    <login></login>
    <annunciate></annunciate>
    <sportPart></sportPart>
    <carousel></carousel>
    <lotteryPart></lotteryPart>
    <!-- <gamesNews></gamesNews> -->
    <!-- <download></download> -->
    <!-- <detail></detail>
    <recommandGames></recommandGames>-->
  </div>
</template>
<script>
import annunciate from "pc/components/annunciate";
import banner from "./components/banner";
import login from "./components/login";
import sportPart from "./components/sportPart";
import detail from "./components/detail";
import carousel from "./components/carousel";
import lotteryPart from "./components/lotteryPart";
import gamesNews from "./components/gamesNews";
import download from "./components/download";
import recommandGames from "./components/recommand-games/";

export default {
  data() {
    return {
      active: 0
    };
  },
  components: {
    annunciate,
    banner,
    login,
    detail,
    recommandGames,
    carousel,
    gamesNews,
    download,
    sportPart,
    lotteryPart
  },
  methods: {},
  created() {},
  mounted() {},
  activated() {}
};
</script>
<style lang="scss" scoped>
.index-main {
  position: relative;
}
</style>
