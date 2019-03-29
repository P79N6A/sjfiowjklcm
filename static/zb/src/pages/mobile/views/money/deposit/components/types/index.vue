<template>
  <div class="pay-menu" v-if="payMenus.length>0">
    <ul class="title">
      <li v-for="(item,i) in payMenus" :class="[item==paySelect?'active':'']" @click="setPaytype(item)"
        :key="i">
        <span :class="['iconcent',`ct-${item.type}`]"></span>
        <span class="img_text">{{item.name}}</span>
        <img src="./ico1.png" class="icos" v-if="maxNum(item.data).rate4deputy">
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
      maxNum(item){
        let rate4deputy = item[0].rate4deputy
        let j = 0;
        for (let i = 0; i < item.length; i++) {
          if (rate4deputy < item[i].rate4deputy) {
            rate4deputy = item[i].rate4deputy
            j = i
          }
        }
        return item[j]
      }
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
      background: #ffffff;
      .title {
        display: flex;
        overflow:auto;
        li {
          flex: 1;
          position: relative;
          text-align: center;
          display: inline-block;
          display: flex;
          align-items: center;
          flex-direction: column;
          min-width:25%;
          padding: r(30) 0;
          .iconcent {
            @include f(60px);
            margin-bottom: r(10);
            // 闪存支付       00C0FD
            // 云闪付 银联支付 京东           FF5F57
            // 支付宝  QQ  久安           0B97E7
            // 扫码 微信               33C188
            //其他支付随机 分配颜色
            &.ct-alipay , &.ct-qqpay{
              color: #0B97E7;
            }
            &.ct-wechat , &.ct-unionpay {
              color: #33C188;
            }
            &.ct-ysfpay, &.ct-ebank ,&.ct-jdpay{
              color: #FF5F57;
            }
            &.ct-mcpay {
              color: #00C0FD;
            }
          }
          &.active {
            // color: $cl1;
            &::before {
              content: " ";
              position: absolute;
              bottom: 0;
              left: 0;
              height: r(8);
              width: 100%;
              background: $cl1;
              border-radius: 10em;
            }
          }
        }
      }
    }
  @keyframes start {
    from {
      transform: scale(1)
    }
    to {
      transform: scale(1.1)
    }
  }
    .icos{
      position:absolute;
      right:4px;
      display:inline-block;
      width:r(50);
      height:auto;
      animation: start .4s;
      animation-iteration-count: 999999999;
    }
</style>
