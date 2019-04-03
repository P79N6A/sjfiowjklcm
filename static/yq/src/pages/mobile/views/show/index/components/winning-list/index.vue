<template>
  <div class="winning-list">
    <div class="titleBox">
      <div class="titleText">大奖排行榜</div>     	
    </div>
    <div class="winningD">
      <span class="w-name">得奖会员</span>
      <span class="w-bet">投注金额</span>
      <span class="w-price">得奖金额</span>
      <span class="w-game">游戏名称</span>
    </div>
    <div class="list-warp" ref="listwarp">
      <ul :class="{animates:myData.length>5}" :style="animation">
        <li v-for="item in myData" :key="item.ganeName">
          <a href="javascript:;">{{item.userName}}</a>
          <a href="javascript:;">{{item.betAmt}}</a>
          <a href="javascript:;" class="txt-r">{{item.prize}}</a>
          <a href="javascript:;" class="a-last"><span>{{item.platform}}{{item.gameName}}</span><img :src="item.link" alt=""></a>
        </li>
      </ul>
      <ul :class="{animates:myData.length>5}" :style="animation">
        <li v-for="item in myData" :key="item.ganeName">
          <a href="javascript:;">{{item.userName}}</a>
          <a href="javascript:;">{{item.betAmt}}</a>
          <a href="javascript:;" class="txt-r">{{item.prize}}</a>
          <a href="javascript:;" class="a-last"><span>{{item.gameName}}</span><img :src="item.link" alt=""></a>
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
    padding: r(10) r(20) 0;
    overflow: hidden;
    user-select: none;
    @include f(24px);
    background:$main-bg;
    margin-top: r(25);
    .titleBox{
      padding:r(20);
      @include f(32px);
      position: relative;
      .titleText {
        padding-left: r(20);
        position: relative;
      }
    }
    .winningD {
      display: flex;
      border-bottom: 1px solid #ddd;
      border-top: 1px solid #ddd;
      padding: r(30) 0;
      span {
        width: 21%;
        @include f(28px);
        &.w-game {
          width: 37%;
          text-align: center;
        }
      }
    }
    .animates {
      position: relative;
      animation: animations 6s linear infinite;
    }
    .list-warp {
      height: r(700);
      overflow: hidden;
    }
    li {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: #333333;
      display: flex;
      border-bottom: 1px solid #dddddd;
      padding: r(20) 0;
      a {
        width: 21%;
        display: flex;
        align-items: center;
        text-align: center;
        &.a-last {
          width: 37%;
          span {
            width: 50%;
            overflow: hidden;
            white-space: normal;
          }
          img {
            width: 50%;
            height: r(120);
          }
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
