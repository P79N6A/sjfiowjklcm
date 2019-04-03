<template>
  <div class="payform">
    <mcPay :payItem="payItem" v-if="payItem.platformtype=='mcpay'"></mcPay>
    <mfbPay
      :payItem="payItem"
      v-else-if="payItem.platformtype && payItem.platformtype.startsWith('mfb')"
    ></mfbPay>
    <tlyPay
      :payItem="payItem"
      v-else-if="payItem.platformtype && payItem.platformtype.startsWith('tly')"
    ></tlyPay>
    <basePay :payItem="payItem" v-else></basePay>
  </div>
</template> 
<script>
import basePay from "./components/basePay.vue";
import mcPay from "./components/mcPay.vue";
import mfbPay from "./components/mfbPay.vue";
import tlyPay from "./components/tlyPay.vue";
export default {
  data() {
    return {};
  },
  props: {
    payItem: {
      type: Object
    }
  },

  watch: {
    payItem() {
      // console.log(this.payItem);
    }
  },
  components: { basePay, mcPay, mfbPay, tlyPay }
};
</script>
<style lang="scss">
.deposit-form {
  margin-top: 30px;
  width: 500px;
  .el-select {
    display: block !important;
  }
}
</style>