<template>
  <div class="bank-list">
    <div :class="['bank-item']" v-for="(item,i) in list" :key="i">
      <div class="bank-name"><img src="" alt=""> {{item.bankname}}</div>
      <div class="bank-number">**** **** **** {{item.bankno}}</div>
      <!-- <div class="username">限额：单笔50000元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日累计50000元</div> -->
      <!--{{userData.accountName}}-->
    </div>
    <router-link class="bank-item bank-item-add" :to="{name:'addbank'}" v-if="list.length<3" tag="div">
      <i class="iconfont icon-jia"></i>
      <p>请绑定银行卡储蓄卡</p>
    </router-link>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {bank} from "@/controls/common/bank"
  export default {
    mixins: [bank],
    data() {
      return {

      }
    },
    methods: {
    },
    created() {
      this.getBankList()
      this.$bus.$on('getBankList',eventData=>{
        this.getBankList()
      })
    },
    activated(){
      this.getBankList()
    }
  }
</script>

<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
  .bank-list {
    padding: 0 r(37);
    color: #fff;
    .bank-item {
      position: relative;
      height: r(258);
      padding:0 r(18);
      background: url("./img/07.jpg") no-repeat center center;
      background-size:100% 100%;
      line-height: 1;
      display: flex;
      flex-direction: column;
      margin-top: r(22);
      text-align: center;
      align-self: center;
      border-radius: r(20);
      .bank-name{
        line-height: r(70);
        text-align: left;
      }
      .bank-number{
        height: r(80);
        line-height:r(70);
        @include  f(45px)
      }
      .username{
        border-top:1px solid  #ac3b8b;
        line-height: r(56);
      }
    }
    .bank-item-add {
      color: #fff;
      padding-top: r(30);
      .iconfont{
        @include  f(90px);
        margin-bottom: r(20);
      }
      text-align: center;
    }
  }
</style>
