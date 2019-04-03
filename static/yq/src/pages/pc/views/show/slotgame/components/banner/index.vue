<template>
  <div class="slot-banner">
    <img class="bannerImg" src="./images/banner.png" alt="">
    <!-- <annunciate></annunciate> -->
    <div class="jackpot-box">
      <span class="titlePT">PT</span>
      <span class="textMoney">CNY</span>
      <span class="num" :class="`num${toClass(num)}`" v-for="(num,i) in total" :key="i">{{num}}</span>
    </div>
  </div>
</template>
<script>
import annunciate from 'pc/components/annunciate'
import {jackpot} from '@/controls/shows/jackpot'
  export default {
    mixins:[jackpot],
    name: "",
    data() {
      return {}
    },
    props: {},
    created() {
      this.getjackpot('cny').then(res=>{
      }).catch(err=>[
        console.log(err)
      ])
    },
    methods:{},
    components:{annunciate}
  }
</script>
<style lang="scss" scoped>
  .slot-banner {
    // height: 54px;
    min-width: 1200px;
    background: #000000;
    position: relative;
    .bannerImg {
      width: 100%;
    }

    .jackpot-box {
      position: absolute;
      left: 27%;
      bottom: 17%;
      border-radius: 20px;
      width: 330px;
      height: 40px;
      line-height: 40px;
      font-size: 24px;
      color: #fffc00;
      background: rgba($color: #000000, $alpha: .7);
      letter-spacing: 2px;
      .titlePT {
        display: inline-block;
        border-radius: 50%;
        background: #ea0f26;
        color: #ffffff;
        font-size: 20px;
        height: 40px;
        width: 40px;
        text-align: center;
        letter-spacing: 0;
      }
    }
  }
</style>
