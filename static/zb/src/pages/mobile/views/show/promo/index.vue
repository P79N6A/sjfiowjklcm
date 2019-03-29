<template>
  <div class="promo-page">
    <menus></menus>
    <pros></pros>
    <info></info>
  </div>
</template>
<script>
  import {queryLatestPreferential} from '@/api/show'
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
      info,menus,pros
    }
  }
</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
</style>
