<template>
  <div class="download-bg">
    <annunciate></annunciate>
    <banner></banner>
    <menus></menus>
    <pros></pros>
  </div>
</template>
<script>
  import {
    queryLatestPreferential
  } from '@/api/show'
  import annunciate from 'pc/components/annunciate'
  import banner from './components/banner'
  import menus from './components/menus'
  import pros from './components/pros'
  export default {
    name: "",
    data() {
      return {}
    },
    created() {

    },
    components: {
      menus,
      banner,
      pros,
      annunciate
    }
  }

</script>
<style lang="scss" scoped>
 .download-bg{
    position: relative;
    width: 100%;
    background-color: #f1f1f1;
 }
</style>
