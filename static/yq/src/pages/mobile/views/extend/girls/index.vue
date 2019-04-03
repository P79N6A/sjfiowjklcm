<template>
  <div
    class="girl-contain"
    style="overflow: hidden;-webkit-overflow-scrolling:touch;width:100%;"
  >
    <!-- <iframe
      src="/static/page/girls/mobile.html"
      frameborder="0"
      style="width: 100%; height:100%"
    ></iframe> -->
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {
    if(this.$route.meta.isAPP) {
      location.href = '/static/page/girls/app.html'
    }else {
      location.href = '/static/page/girls/mobile.html'
    }
  }
};
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
.girl-contain {
  height:calc(100vh - 1.33333rem - 1.06667rem) ;
  iframe {
    border: none;
    // width: 100%;
    // height: 100vh;
    background: #fff;
  }
}
</style>
