<template>
  <div class="portrait">
    <div class="portrait-img">
      <img :src="src" alt="">
    </div>
  </div>
</template>
<script>
  export default {
    name: "",
    data() {
      return {}
    },
    props: {
        src:{
          type:String,
          default(){
            return require("./tx.png")
          }
        }
    },
    computed: {},
    watch: {},
    methods: {},
    created() {
    },
    activated() {
    },
    components: {}
  }
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .portrait {
    border: solid 3px #643257;
    border-radius: 100px;
    height: r(143);
    width: r(143);
    margin: 0 auto;
    padding: r(5);
    text-align: center;
    line-height: r(143);
    .portrait-img {
      @include f(100px);
      height:100%;
      width:100%;
      border: 3px solid #ffdf00;
      border-radius: 50%;
      display: inline-block;
      vertical-align: top;
      overflow: hidden;
      img {
        vertical-align: top;
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
