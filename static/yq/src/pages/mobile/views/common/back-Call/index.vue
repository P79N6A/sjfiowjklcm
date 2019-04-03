<template>
  <div style="padding: 0.5rem">
    <input-inline label="联系号码">
      <input v-model="backCallData.phone" type="text" placeholder="输入联系号码" maxlength="16">
    </input-inline>
    <v-button @click="submit">电话回拨</v-button>
  </div>
</template>
<script>
  import check from "@/util/RegExp"
  import {backCall} from "@/controls/common/backCall"
  export default {
    mixins:[backCall],
    data() {
      return {
      };
    },
    methods:{
      submit(){
        // 调用回拨
        this.backCall(this.backCallData).then(res=>{
          window.toast(res.message)
        }).catch(err=>{
          window.toast(err.message)
        })
      }
    },
    components:{}
  };
</script>
<style>
</style>
