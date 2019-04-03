<template>
  <div class="page_content_wrap">
    <div class="page_content_wrap_tab">
      <div class="tab" @click="selectTab('hongbao')" :class="{act:type=='hongbao'}">红包优惠券</div>
      <div class="tab" @click="selectTab('coupon')" :class="{act:type=='coupon'}">存送优惠券</div>
    </div>
    <div class="page_content_wrap_hongbao" v-if="type == 'hongbao'">
      <redEnvelope></redEnvelope>
    </div>
    <div class="page_content_wrap_hongbao" v-if="type == 'coupon'">
      <discountCode></discountCode>
    </div>
  </div>
</template>
<script>
  import formTip from "mobile/components/form-tip1"
  import redEnvelope from "mobile/views/user/red-envelope"
  import discountCode from "mobile/views/user/discount-code"
  import {
    couponRed
  } from "@/controls/discount/couponRed"
  import {
    coupon
  } from '@/controls/discount/coupon'
  export default {
    mixins: [couponRed, coupon],
    data() {
      return {
        platformData: [],
        type: 'hongbao'
      }
    },
    methods: {
      selectTab(val) {
        this.type = val
      },
      submit() {
        this.couponSubmit(this.data).then(res => {
          window.toast(res.message)
        }).catch(err => {
          console.log(err)
          window.toast(err.message)
        })
      },
      submit1() {
        this.couponSubmit(this.data).then(res => {
          window.toast(res.message)
        }).catch(err => {
          console.log(err)
          window.toast(err.message)
        })
      }
    },
    components: {
      formTip,
      redEnvelope,
      discountCode
    },
    created() {
      if (this.$route.params && this.$route.params.type) {
        this.type = this.$route.params.type
      }
    },
    watch: {
      '$route'(val) {
        if (this.$route.params && this.$route.params.type) {
          this.type = this.$route.params.type
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
  .page_content_wrap {
    .page_content_wrap_tab {
      height: r(120);
      background: #fff;
      box-shadow: inset 0 -1px 0 0 #DDDDDD;
      display: flex;

      .tab {
        font-family: PingFangSC-Regular;
        flex: 1;
        @include f(30px);
        color: #303030;
        text-align: center;
        line-height: r(120);
        border-bottom: 2px solid transparent;

        &.act {
          border-bottom: 2px solid $cl1;
          color:  $cl1;
        }
      }
    }

  }

</style>
