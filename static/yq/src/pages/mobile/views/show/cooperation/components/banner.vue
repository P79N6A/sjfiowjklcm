<template>
  <div class='c-banner'>
    <swiper style="height:100%;" :options="swiperOption">
      <swiper-slide v-for="(item,i) in bannerList" :key="i">
        <a class="banner-item">
          <img :src="item.showUrl" />
        </a>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    data() {
      return {
        imgsrc: '',
        swiperOption: {
          // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: {
            delay:3000,
            disableOnInteraction:false
          },
          // direction : 'vertical',
          effect: "coverflow",
          grabCursor: true,
          setWrapperSize: true,
          // autoHeight: true,
          paginationType: "bullets",
          pagination: '.swiper-pagination',
          paginationClickable: true,
          mousewheelControl: true,
          observeParents: true,
        },
        bannerList:[
          {showUrl:require(`./images/img1.jpg`)},
          {showUrl:require(`./images/img2.jpg`)},
          {showUrl:require(`./images/img3.jpg`)},
        ]
      };
    },
    props: {},
    methods: {},
    computed: {},
    created() {}
  }

</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .c-banner {
    position: relative;
    height: r(400);
    margin:0 auto;
    .banner-item{
      display:block;
      width:100%;
      img{
        display:block;
        width:100%;
      }
    }
  }

</style>
