<template>
  <div class="banners" v-if="bannerData" :style="'height:'+height+'px;'">
    <transition-group name="fade" tag="div">
      <a v-for="(item,i) in bannerData" :key="i" :class="['opacity-item',{active:active==i}]" v-show="active==i" ref="i" :href="item.hyperlinkUrl" :style="`background-image:url(${item.showUrl})`"></a>
    </transition-group>
    <div class="banner-page" v-if="showPage" :style="styleControl">
      <a v-for="(item,i) in bannerData" :key="i" :class="['ban-btn',{active:active==i}]" href="javascript:void(0);" @click="active=i"></a>
    </div>
  </div>
</template>
<script>
  import {queryBannerList} from "@/api/show"
  export default {
    data() {
      return {
        active: 0,
        id: 0
      }
    },
    props:{
      "bannerData":{
        type:Array,
        default:[{
          hyperlinkUrl:'',
          showUrl:''
        }]
      },
      "height":{
        type:String,
        default:"240px"
      },
      "showPage":{
        type:Boolean,
        default:true
      },
      "styleControl":{
        type:Object
      }
    },
    computed: {},
    watch: {
      active(cur, old) {
        this.move(cur, old)
      },
      bannerData(){
          let $this = this;
          if (this.bannerData.length > 1) {
            $this.id = window.setInterval(() => {
              $this.next();
            },5000)
          }
      }
    },
    methods: {
      move(cur, old) {
      },
      next() {
        this.active = (this.active + 1) % this.bannerData.length;
      },
      prev() {
        if (this.active == 0) {
          this.active = this.bannerData.length - 1;
        }else{
          this.active--;
        }
      }
    },
    beforeDestroy() {
      window.clearInterval(this.id)
    },
    mounted() {
    },
    components: {}
  }
</script>
<style lang="scss" spcoed>
  .banners {
    max-width: 1920px;
    height: 500px;
    overflow: hidden;
    position: relative;
    margin: 0 auto;
    .opacity-item {
      position: absolute;
      display:block;
      left: 0;
      top: 0;
      height:100%;
      width:100%;
      background-repeat:no-repeat;
      background-size:cover;
      background-position:center center;
      &.active {
        z-index: 1;
      }
    }
    .banner-page {
      width: 100%;
      text-align: center;
      margin:0 auto;
      z-index: 2;
      top: 15px;
      left: 0;
      position: absolute;

      .ban-btn {
        display: inline-block;
        height: 10px;
        width: 10px;
        margin: 0 5px;
        border-radius: 50%;
        background: #fff;
        cursor:pointer;
        &.active {
          background: #ffd178;
        }
      }
    }
    // 动画
    .fade-enter-active, .fade-leave-active {
      transition: opacity 1.5s
    }
    .fade-enter,.fade-leave-to{
      opacity: 0
    }
  }
</style>
