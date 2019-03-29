<template>
  <div class="payform" v-if="payItem">
    <mcPay :payItem="payItem" v-if="payItem.type=='mcpay' && payItem.platformtype =='mcpay'"></mcPay>
    <mfbPay :payItem="payItem" v-else-if="payItem.platformtype && payItem.platformtype.startsWith('mfb')"></mfbPay>
    <basePay :payItem="payItem" v-else></basePay>
  </div>
</template> 
<script>
  import basePay from './components/basePay.vue';
  import mcPay from './components/mcPay.vue';
  import mfbPay from "./components/mfbPay.vue";
  export default {
    data() {
      return {}
    },
    props:{
      payItem:{
        type:Object
      }
    },

    watch: {
    },
    components:{basePay,mcPay,mfbPay}
  };
</script>
<style lang="scss">
  .deposit-form{
    margin-top: 30px;
    width: 500px;
    .el-select {
      display: block !important;
    }
  }
</style>