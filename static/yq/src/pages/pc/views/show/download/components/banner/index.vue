<template>
  <div class="bannerItem">
    <div class="href"></div>
  </div>
</template>
<script>
  import {
    WEBCONFIG,
  } from "@/assets/data"
  export default {
    name: "",
    data() {
      return {
        WEBCONFIG,
        cur:'OPE'
      }
    },
    created() {
      this.$bus.$on('getDownloadPage', eventData => {
        this.cur = eventData
      })
    },

  }

</script>
<style lang="scss" scoped>
.bannerItem {
    width: 100%;
    height: 521px;
    background: url(./images/banner2.jpg) no-repeat center top, #fff;
    position: relative;
    .href{
      width: 55px;
      color: #000;
      position: absolute;
      top: 298px;
      right: 704px;
      font-size: 18px;
    }
  }
</style>
