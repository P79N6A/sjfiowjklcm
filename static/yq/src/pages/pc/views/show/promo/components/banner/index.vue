<template>
  <div class="promo-banner">
    <img class="bannerImg" src="./images/banner.png" alt="">
  </div>
</template>
<script>
import annunciate from 'pc/components/annunciate'
  export default {
    name: "",
    data() {
      return {}
    },
    props: {},
    created() {},
    methods:{},
    components:{
      annunciate
    }
  }
</script>
<style lang="scss" scoped>
  .promo-banner {
    // height: 54px;
    color: #787878 ;
    line-height: 54px;
    font-size:14px;
    min-width: 1200px;
    .bannerImg {
      width: 100%;
    }
  }
</style>
