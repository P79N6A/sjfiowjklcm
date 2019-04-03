<template>
  <div class="re-page">
    正在跳转
  </div>
</template>
<script>
  import util from "@/util/util"
  export default {
    data() {
      return {
        data: []  //records
      };
    },
    props:{},
    methods:{},
    computed:{},
    created(){
      let redirectUrl=this.$route.query["redirect"];
      if(redirectUrl){
        window.location.href=redirectUrl;
      }
    }
  };
</script>
<style lang="scss">
  .re-page{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
    z-index: 999;
  }
  </style>
