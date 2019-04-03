<template>
  <div class="payform" v-if="payItem">
    <mcPay :payItem="payItem" v-if="payItem.platformtype=='mcpay'"></mcPay>
    <mfbPay :payItem="payItem" v-else-if="payItem.platformtype && payItem.platformtype.startsWith('mfb')"></mfbPay>
    <mfbPay :payItem="payItem" v-else-if="payItem.platformtype && payItem.platformtype.startsWith('tly')"></mfbPay>
    <ysfPay :payItem="payItem" v-else-if="payItem.platformtype=='ysfpay'"></ysfPay>
    <basePay :payItem="payItem" v-else></basePay>
  </div>
</template> 
<script>
import basePay from "./components/basePay.vue";
import mcPay from "./components/mcPay.vue";
import ysfPay from "./components/ysfPay.vue";
import mfbPay from "./components/mfbPay.vue";
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
  },
  components: { basePay, mcPay, ysfPay, mfbPay }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.deposit-form {
  margin-top: 30px;
  width: 500px;
  .el-select {
    display: block !important;
  }
}
.payform {
  padding-bottom: r(100);
}
</style>