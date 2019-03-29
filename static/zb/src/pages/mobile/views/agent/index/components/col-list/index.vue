<template>
  <div  :class="['grid-col-new',className]">
    <div v-for="(item,i) in data" :key="item.name+i" @click="item.method||null" class="grid-col-item">
      <div class="iconyg" :class="item.ico"></div>
      <span class="col-item-red">{{item.view}}</span>
      <span class="col-item-name">{{item.name}}</span>
    </div>
  </div>
</template>
<script>
  export  default {
    props: {
      data: {
        type: Array
      },
      className:{
        type:String
      }
    },
    data(){
      return {}
    },
  }
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
  .grid-col-new {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background: $main-bg;
    margin-bottom: r(20);
    .iconyg{
        // @include f(50px);
        width: r(60);
        height: r(60);
        margin: 0 auto;
      }
      .iconImg1{
        background: url('./images/ico_win@3x.png') no-repeat;
        background-size: 100% 100%;
      }
      .iconImg2{
        background: url('./images/ico_back@3x.png') no-repeat;
        background-size: 100% 100%;
      }
      .iconImg3{
        background: url('./images/ico_pro@3x.png') no-repeat;
        background-size: 100% 90%;
      }
      .iconImg4{
        background: url('./images/ico_merber@3x.png') no-repeat;
        background-size: 100% 90%;
      }
      .iconImg5{
        background: url('./images/ico_login@3x.png') no-repeat;
        background-size: 100% 95%;
      }
      .iconImg6{
        background: url('./images/ico_bet@3x.png') no-repeat;
        background-size: 100% 100%;
      }
    .grid-col-item {
      &:nth-child(3n) {
        border-right: none;
      }
      width: 33.33%;
      padding:r(20*2);
      /*flex:1;*/
      box-sizing: border-box;;
      border-right: 1px solid rgba($color: #fff, $alpha: .1) ;      
      border-bottom: 1px solid rgba($color: #fff, $alpha: .1) ;  
      display: flex;
      flex-direction: column;
      text-align: center;
      .col-item-red {       
        color:#e6f3ff;
        line-height: r(50);
        @include f(32px);
        margin-top: 10px;
      }
      .col-item-name{
        @include f(24px);
        color: rgba($color: #fff, $alpha: .5);
      }
    }
  }
</style>
