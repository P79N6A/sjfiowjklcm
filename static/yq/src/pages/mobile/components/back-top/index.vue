<template>
  <div class="back-top" v-show="show" @click="back">
    <img src="./top.png" alt="">
  </div>
</template>
<script>
  export default {
    name: "",
    data() {
      return {
        show: false
      }
    },
    props: {},
    computed: {},
    watch: {},
    methods: {
      back() {
        document.getElementById("app").scrollTop = 0;
      }
    },
    mounted() {
      let $this = this;
      document.getElementById("app").addEventListener('scroll', function (e) {
        $this.show = e.currentTarget.scrollTop >400;
      }, false)
    },
    components: {}
  }
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";

  .back-top {
    position: fixed;
    z-index: 100;
    bottom: r($footer-h);
    right: 2%;
    height: r(120);
    width: r(120);
    img {
      height: r(120);
      width: r(120);
    }
  }
</style>
