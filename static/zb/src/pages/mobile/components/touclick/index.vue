<template>
  <div v-show="showDom" ref="verifyWarp" class="touclick">
  </div>
</template>
<script>
  //  import touclicks from 'touclick'
  export default {
    data() {
      return {
        showDom:false,
        touclick:false
      };
    },
    props:{
      value:{
        type:Boolean,
        defulat:false
      }
    },
    watch:{
      value(val){
        this.showDom=val;
      },
      showDom(val){
        val&&this.success();
      }
    },
    created(){
      if(!document.querySelector('#touclick')){
        let $script = document.createElement("script")
        $script.type = "text/javascript";
        $script.id="touclick";
        $script.onload=()=>{
          this.touclick=true;
        }
        $script.src="//js.touclick.com/js.touclick?b=b85d9b8e-adfb-47da-a58d-8f30cef74f1a";
        document.body.appendChild($script);
      }else{
        this.touclick=true;
      }
    },
    methods:{
      success(){
        let _this=this;
        let tc=TouClick(this.$refs.verifyWarp,{
          onSuccess(obj){
            _this.$emit("success",obj,tc);
          },
          onMaskClick(e){
            tc.close();   //点击关闭验证码
            tc.destory();   //点击关闭验证码
            _this.$emit("input",false);
          }
        });
        tc.start()
      }
    }
  };
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .touclick{
    /*transform: scale(1.5);*/
    @include f(28px);
    margin:r(100) auto r(60);
    width:80%;
    .touclick-pub-holder-wrap{
      /*transform: scale(2);*/
      margin: 0 auto;
    }
  }
</style>
