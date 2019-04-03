<template>
  <div class='c-show'>
    <component :is="shows[showComponent]"></component>
  </div>
</template>
<script>
  import advantage from "./advantage"
  import proce from "./proce"
  import question from "./question"
  import contact from "./contact"
  import register from "mobile/views/show/register-agent"
  export default {
    data() {
      return {
        showComponent: "advantage",
        shows: {
          advantage: advantage,
          proce: proce,
          question: question,
          contact: contact,
          register: register
        }
      };
    },
    created() {
        this.$bus.$on('agentTagShow',eventData=>{
            this.showComponent = eventData
        })
        if(this.$route.params.type){
          this.showComponent =  this.$route.params.type;
        } 
    }
  }

</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
</style>
