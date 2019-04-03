<template>
  <div class="promo-page" id="promotion">
    <annunciate></annunciate>
    <div class="wp">
      <menus></menus>
      <pros></pros>
      <info></info>
    </div>
  </div>
</template>
<script>
  import annunciate from 'pc/components/annunciate'
  import banner from './components/banner'
  import menus from './components/menus'
  import pros from './components/pros'
  import info from './components/info'
  export default {
    name: "",
    data() {
      return {
      }
    },
    created() {

    },
    components: {
      info,menus,banner,pros,annunciate
    }
  }
</script>
<style lang="scss" scoped>
  #promotion{
    padding: 100px 0 40px;
    background: url(./images/pro_bg.jpg) no-repeat, #f1f1f1;
    position: relative;
    .wp{
      width: 1200px;
      margin: 0 auto;
    }
  }
</style>
