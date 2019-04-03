<template>
  <div class="pay-menu" v-if="payMenus.length>0">
    <ul class="title">
      <li v-for="(item,i) in payMenus" :class="[item==paySelect?'active':'']" @click="setPaytype(item)"
        :key="i">
        <span :class="['icobjh',`bjh-${item.type}`]"></span>
        <span class="img_text">{{item.name}}</span>
      </li>
    </ul>
  </div>

</template>
<script>
  import {
    depositMenu
  } from '@/controls/money/deposit'
  export default {
    mixins: [depositMenu],
    data() {
      return {
        paySelect: null,
      }
    },
    methods: {
      setPaytype(item) {
        if (this.paySelect == item) return
        this.paySelect = item;
        this.$emit('setClasses', item);
      },
    },
    created() {
      this.getPaymentConfigInfo({terminalType: 1}).then(res=>{
        // 默认选中第一个
        this.setPaytype(res.data[0])
      }).catch(err=>{
        console.log(err)
      })
    },
  };

</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
    .pay-menu {
      padding: r(30) 0;
      border-bottom: 1px solid #ddd;
      background: #eee;
      .title {
        display: flex;
        overflow:auto;
        flex-wrap: wrap;
        justify-content: flex-start;
        li {
          // flex: 1;
          position: relative;
          padding-bottom: r(10);
          text-align: center;
          display: inline-block;
          display: flex;
          align-items: center;
          flex-direction: column;
          min-width:25%;
          .icobjh {
            @include f(60px);
            margin-bottom: r(10);
          }
          &.active {
            color: #FF7E28;
          }
        }
      }
    }
</style>
