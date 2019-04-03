<template>

  <div class="index-banner">
    <annunciate></annunciate>
    <banner :bannerData="bannerData" v-if="bannerData" :showPage="bannerConfig.show" :styleControl="bannerConfig.control"
      :height="bannerConfig.height"></banner>
    <!-- <img class="bannerImg" src="./images/bg.png" alt=""> -->
  </div>
</template>
<script>
  import banner from "pc/components/banner";
  import annunciate from 'pc/components/annunciate'
  import {
    queryBannerList
  } from "@/api/show"

  export default {
    data() {
      return {
        bannerData: [],
        bannerConfig: {
          show: true,
          height: '528',
          control: {
            top: '445px',
            left: '50%',
            width: "1200px",
            transform: 'translateX(-50%)'
          }
        }
      };
    },
    methods: {
      getBannerList(type) {
        queryBannerList({
          bannerType: 0
        }).then(res => {
          if (res.success) {
            this.bannerData = res.data;
          }
        })
      }
    },
    created() {
      this.getBannerList()

    },
    components: {
      banner,annunciate
    }
  };

</script>
<style lang="scss" scoped>
  .index-banner {
    background-color: #000000;
    position: relative;
    padding-bottom: 42px;
    img {
      width: 100%;
    }

    
  }

</style>
