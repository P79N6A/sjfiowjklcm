<template>
  <label class="switch" @click="cheacked=!cheacked">
    <input type="checkbox" v-model="cheacked" style="display: none;" >
    <div class="slider round"></div>
  </label>
</template>
<script>
  export  default {
    props:{
      value:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        cheacked:this.value
      }
    },
    watch:{
      value:(val)=>{
        this.cheacked=val;
      },
      cheacked(val){
        this.$emit("input",val)
      }
    }
  }
</script>
<style lang="scss" scoped="">
  @import "~mobile/assets/scss/mixin.scss";
  .switch {
    position: relative;
    display: inline-block;
    width: r(100);
    height: r(48);
    line-height: r(40);
    vertical-align: middle;
  }
  input:checked + .slider {
    background-color: #f66;
  }
  input:checked+.slider:before {
    left: 100%;
    transform: translate(-103%,-50%);
  }
  /* Rounded sliders */
  .slider.round {
    border-radius: r(68);
  }
  .slider.round:before {
    border-radius: 50%;
  }
  .slider:before {
    position: absolute;
    content: "";
    height:95%;
    width: r(48);
    left: r(4);
    top:50%;
    transform: translateY(-50%);
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }
</style>
