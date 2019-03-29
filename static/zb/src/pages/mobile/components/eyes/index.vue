<template>
  <span class="pubeyes iconay ay-eye-close" @click="checkpwd">
  </span>
</template>
<script>
    export default {
        name: "",
        data() {
            return {}
        },
        props:["dom"],
        computed: {},
        watch: {},
        methods: {
          checkpwd(e){
            e.currentTarget.classToggle("ay-eye-close ay-yanjing");
            let dom= e.currentTarget.previousElementSibling;
            if(['text','password'].indexOf(dom.type)>-1){
              dom.type=dom.type=='password'?"text":"password";
            }else{
              dom=e.currentTarget.nextElementSibling;
              if(['text','password'].indexOf(dom.type)>-1){
                dom.type=dom.type=='password'?"text":"password";
              }
            }
          }
        },
        created() {
        },
        activated() {
        },
        components: {}
    }
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  span.pubeyes {
    position: absolute;
    top: 0;
    right: 5%;
    @include f(48px);
    cursor: pointer;
    height: 100% !important;
    color: $cl6;
  }
</style>
