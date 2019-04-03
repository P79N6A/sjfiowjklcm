<template>
  <div class="deposit-list">
    <classes @selectPayInfo="selectPayInfo" :classes="classesSelect"></classes>
    <payForm :payItem='infoSelect'></payForm>
  </div>
</template>
<script>
  // import types from './components/types'
  import classes from './components/classes'
  import payForm from './components/payForm'
  // import vHeader from 'mobile/master/t1/page-in/components/header-back'
  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'
  export default {
    data() {
      return {
        classesSelect: [],
        infoSelect: {},
        paySelect: 'wechat',
      }
    },
    methods: {
      // setClasses(data) {
      //   this.classesSelect = data;
      //   this.infoSelect = {};
      // },
      selectPayInfo(info) {
        this.infoSelect = info
      }
    },
    created() {
      this.$bus.$on('setClasses',eventData=>{
        this.classesSelect = eventData;
        this.infoSelect = {};
      })
    },
    components: {classes,payForm}
  };
</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";


</style>
