<template>
  <div class="index-menu">
    <router-link class="index-menu-item" :to="{name:'money_deposit'}">
      <img src="./img/ico_home_despoit@2x.png" class="index-menu-ico">
      <div class="index-menu-text">存款</div>
    </router-link>
    <router-link class="index-menu-item" :to="{name:'money_drawmoney'}">
      <img src="./img/ico_home_draw@2x.png" class="index-menu-ico">
      <div class="index-menu-text">取款</div>
    </router-link>
    <router-link class="index-menu-item" :to="{name:'money_transfer'}">
      <img src="./img/ico_home_tranfer@2x.png" class="index-menu-ico">
      <div class="index-menu-text">转账</div>
    </router-link>
    <a href="javascript:void(0);" class="index-menu-item" @click="signIt()">
      <img src="./img/ico_home_agent@2x.png" class="index-menu-ico">
      <div class="index-menu-text">签到</div>
    </a>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {
    doSignRecord
  } from '@/api/user'
  export default {
    data() {
      return {

      };
    },
    props: {
      value: {
      }
    },
    watch: {

    },
    methods: {
      signIt() {
        doSignRecord().then(res => {
          toast(res.message)
        })
      },
    },
    created() {
//      this.loadData();
    },
    computed: {
//      ...mapGetters(["userData", "isAgent"])
    }
  }
</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
  .index-menu{
    display:flex;
    direction: center;
    background-color: $main-cl;
    padding:r(30);
    display: flex;
    flex-direction: row;
    justify-content: space-between;;
    text-align:center;
    .index-menu-item{
      .index-menu-ico{
        width:r(100);
        height:auto;
      }
      .index-menu-text{
        padding-top:r(18);
        @include f(30px);
        color:#494949;
      }
      &:before{
        content:"";
        display:block;
        position:absolute;
        height:85%;
        // border-right:solid 1px #2a344f;
        left:0;
      }
      &:first-child{
        &:before{
          display:none;
        }
      }
    }
  }

</style>
