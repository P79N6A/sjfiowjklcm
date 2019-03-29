<template>
  <div class='c-banner'>
    <img :src='imgsrc'>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        imgsrc: ''
      };
    },
    props: {},
    methods: {},
    computed: {},
    created() {
      this.imgsrc = require(`./images/advantage.png`);
      this.$bus.$on('agentTagShow', eventData => {
        this.imgsrc = require(`./images/${eventData}.png`)
      });
      if(this.$route.params.type){
        this.imgsrc =  require(`./images/${this.$route.params.type}.png`)
      }  
    }
  }

</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .c-banner {
    img {
      width: 100%;
      display: block;
    }
  }

</style>
