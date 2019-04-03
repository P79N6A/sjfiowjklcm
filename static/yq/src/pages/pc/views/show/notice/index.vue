<template>
  <div class="notice-page">
    <annunciate></annunciate>
    <banner></banner>
    <notices></notices>
  </div>
</template>
<script>
  import annunciate from 'pc/components/annunciate'
  import banner from "./components/banner"
  import menus from "pc/components/contact"
  import notices from "./components/notices"
  export default {
    data() {
      return {};
    },
    components: {
      banner,
      menus,
      notices,
      annunciate
    },
  }

</script>
<style lang="scss" >
  .notice-page {
    width: 100%;
    position: relative;
    padding-bottom: 1px;
    background: #f1f1f1;
    margin-right: auto;
    margin-left: auto;
    font-size: 18px;
  }

</style>
