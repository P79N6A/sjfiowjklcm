<template>
  <div class="page_content_wrap thirdPay_type" style="padding-top: 0;">
    <types @setClasses="setClasses"></types>
    <classes @selectPayInfo="selectPayInfo" :classes="classesSelect.data"></classes>
    <payForm :payItem='infoSelect'></payForm>
  </div>
</template>
<script>
  import types from './components/types'
  import classes from './components/classes'
  import payForm from './components/payForm'
  
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
      setClasses(data) {
        this.classesSelect = data;
        this.infoSelect = {};
      },
      selectPayInfo(info) {
        this.infoSelect = info
      }
    },
    components: {types,classes,payForm}
  };
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
</style>
