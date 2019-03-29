<template>
  <div class="index-main2">
    <div>
      <div class="award">
        <jackpot>奖池</jackpot>
        <!-- <winningList>奖品名单</winningList>
        <img src="./images/money-icon.png" class="rt-img"> -->
      </div>
    </div>
  </div>
</template>
<script>
import winningList from "./components/winning-list/"
import jackpot from "pc/components/jackpot/"
export default {
    data(){
        return{}
    },
    components: {
      jackpot,winningList
    }
}
</script>
<style lang="scss" scoped>
    .index-main2{
  // background: url(~pc/assets/images/bg.png) no-repeat center -9px #fff;
  // padding-bottom: 74px;

  > div{
    width: 100%;
    margin: 0 auto;
    display: block;
    position: relative;
  }

  .superiority {
    height:194px;
    background: #fefefe;
    padding: 63px 0 49px 0;
    .superiority-item {
      cursor: pointer;
      border-left: 1px solid #e5e5e5;
      float: left;
      color: #7f7f7f;
      width: 360px;
      padding: 0 75px 0 31px;
      box-sizing: border-box;
      font-weight: lighter;
      white-space: nowrap;
      font-size: 22px;
      &:first-child{border: none;}
      &:hover{ color: #ed7e12; }
      &:hover .active { display: inherit;}
      &:hover img{display: none;}
      .active{  display: none;}
      img{ float: left;}
      h1{ margin-left: 102px;font-weight: lighter;}
      small{ display: block; margin-top: 14px; font-size: 18px;}
    }
  }

  .award {
    min-width: 1200px;
    height: 221px;
    background: url('./images/bg.jpg');
    padding-top: 13px;
    position: relative;
    width: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    .rt-img {
      position: absolute;
      right: -17px;
      top: -42px;
    }
  }

  .prod-recommond{ 
    height:316px; 
    margin-top: 14px; 
    color: #343434;
    font-size: 14px;
    background: #fff;
    div{
      img{ 
        height: 265px;
        width: 100%; 
        vertical-align: top;
      }
      &:hover{
        p{
          background: #ed7e12;
          color:#fff;
        }
      }
    }
    p{
      height: 50px; 
      line-height: 50px; 
      background:#f6f6f6; 
      text-align: center;
      span{
         display: inline-block; 
         font-size:18px; 
         border-right:1px solid #cecece ; 
         line-height: 28px; 
         vertical-align: middle; 
         padding-right: 13px; 
         margin-right: 15px;
      }
    }
    .prod-recommond-item1{ 
      // cursor: pointer; 
      width: 552px;
      float: left;
    }
    .prod-recommond-item2{
      // cursor: pointer;
      width:319px;
      float: left;
      margin-left: 5px;
    }
  }
}
</style>
