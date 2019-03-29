<template>
  <div class="user-security">
     <!-- 先确认是否已经设置过支付密码 -->
     <pay-update >
       <!-- 首次设置支付密码 -->
     </pay-update>
     <pay-set>
       <!-- 二次设置支付密码 -->
     </pay-set>
  </div>
</template>
<script>
  import paySet from "./component/pay-set" 
  import payUpdate from "./component/pay-update"

  export default {
    data() {
      return {
      }
    },
    components: {
      paySet, payUpdate
    },
    computed: {
    },
  };
</script>
