<template>
  <div class="cooperation-box">   
    <div class="menu-box">
      <c-banner>banner</c-banner>
      <c-menu>菜单</c-menu>
      <c-show></c-show>
    </div>
  </div>
</template>
<script>
import cBanner from "./components/banner"
import cMenu from "./components/menu"
import cShow from "./components/shows"

    export default {
        data() {
            return {};
        },
        computed: {},
        created(){},
        components:{
          cBanner,
          cMenu,
          cShow
        }
    };
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";

</style>
