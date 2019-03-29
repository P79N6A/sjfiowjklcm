<template>
  <div class="winning-list">
    <div class="titleBox">
      <div class="titleText">中奖信息</div>     	
    </div>
    <div class="winningD">
      <span class="w-name">用户名</span>
      <span class="w-game">游戏名称</span>
      <span class="w-price">得奖金额</span>
      
    </div>
    <div class="list-warp" ref="listwarp">
      <ul :class="{animates:myData.length>2}" :style="animation">
        <li v-for="item in myData" :key="item.ganeName">
          <a href="javascript:;">{{item.userName}}</a>
          <a href="javascript:;" class="a-last">{{item.platform}}{{item.gameName}}</a>
          <a href="javascript:;">{{item.prize}}</a>
        </li>
      </ul>
      <ul :class="{animates:myData.length>2}" :style="animation">
        <li v-for="item in myData" :key="item.ganeName">
          <a href="javascript:;">{{item.userName}}</a>
          <a href="javascript:;" class="a-last">{{item.gameName}}</a>
          <a href="javascript:;">{{item.prize}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {getCarouselListAll} from "@/api/show"

  export default {
    data() {
      return {
        myData: [],
        id: 0,
        animation: {}
      }
    },
    watch: {
      myData(val) {
        this.animation = {
          "animation-duration": val.length*2 + 's',
          "-webkit-animation-duration": val.length*2 + 's'
        }
      },

    },
    methods: {
      setStatus(val){
        this.animation = {
          "animation-duration": this.myData.length + 's',
          "-webkit-animation-duration": this.myData.length + 's',
          'animation-play-state:paused':val,
          '-webkit-animation-play-state': val
        };
      }
    },
    created() {
      getCarouselListAll().then(res => {
        if (res.success) {
          this.myData = res.data || [];
        }
      })
    }, mounted() {

      this.$refs.listwarp.addEventListener('touchstart', () => {
        this.setStatus('paused')
      }, false)
      this.$refs.listwarp.addEventListener('touchend', () => {
        this.setStatus('initial')
      }, false)
    }
  }
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";

  .winning-list {
    margin: r(0) r(20) 0 0;
    overflow: hidden;
    user-select: none;
    height: 2.1rem;
    border-radius: 5px;
    @include f(24px);
    background:#1B2958;
    position: relative;
    .titleBox{
      padding:r(15) r(45) r(25) r(45);
      @include f(29px);
      width: 2rem;
      background: url(./images/lf-bg.png)no-repeat;
      background-size: 100% 100%;
      display: inline-block;
      position: absolute;
      top: 0;
      .titleText {
        padding-left: r(20);
        position: relative;
        line-height: r(32);
      }
    }
    .winningD {
      display: flex;
      padding: r(7) r(0) r(7) r(100);
      span {
        width: 30%;
        @include f(28px);
        text-align: right;
        height: r(45);
        line-height: r(45);
      }
    }
    .animates {
      position: relative;
      animation: animations 6s linear infinite;
    }
    .list-warp {
      height: r(700);
      overflow: hidden;
      width: 74%;
      margin-left: 28%;
    }
    li {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: #2682D7;
      display: flex;
      line-height: r(50);
      a {
        width: 30%;
        display: flex;
        align-items: center;
         @include f(25px);
        &:nth-child(1){
          margin-left: 2%;
        }
        &:nth-child(2){
          margin-left: -2%;
        }
        &:nth-child(3){
          margin-left: 4%;
        }
      }     
    }
    .txt-y {
      color: blue;
    }
    .txt-r {
      color: #ff3e3e;
    }
  }

  @keyframes animations {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }
</style>
