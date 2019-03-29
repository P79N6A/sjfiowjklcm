<template>
  <div class="winning-list">
    <div class="titleBox">
      <div class="titleText">中奖讯息</div>     	
    </div>
    <div class="list-warp" ref="listwarp">
      <ul :class="{animates:myData.length>5}" :style="animation">
        <li v-for="item in myData" :key="item.ganeName">
          <!-- <i class="iconfont icon-arrow_r"></i> -->
          玩家 {{item.userName}} 在 {{item.gameName}}({{item.platform}})
          投注 {{item.betAmt}} 赢得 {{item.prize}} 元
        </li>
      </ul>
      <ul :class="{animates:myData.length>5}" :style="animation">
        <li v-for="item in myData" :key="item.ganeName">
          <!-- <i class="iconfont icon-arrow_r"></i> -->
          玩家 {{item.userName}} 在 {{item.gameName}}({{item.platform}})
          投注 {{item.betAmt}} 赢得 {{item.prize}} 元
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
          "animation-duration": val.length + 's',
          "-webkit-animation-duration": val.length + 's'
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
    // padding: r(10) r(30) r(30);
    overflow: hidden;
    user-select: none;
    @include f(24px);
    background:$main-bg;
    border-top: 1px solid rgba($color: #556ebc, $alpha: .5);
		border-bottom: 1px solid rgba($color: #556ebc, $alpha: .5);
    .titleBox{
      padding:r(20);
      text-align: left;
      @include f(32px);
      // margin-bottom: r(20);
      color: #e6f3ff;
      position: relative;
      border-bottom: 1px solid rgba($color: #556ebc, $alpha: .5);
      .titleText {
        padding-left: r(20);
        position: relative;
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: r(6);
          height: r(26);
          background: #fd4e5d;
        }
      }
    }
    .animates {
      position: relative;
      animation: animations 6s linear infinite;
    }
    .list-warp {
      height: r(350);
      overflow: hidden;
    }
    li {
      padding: 0 r(20);
      height: r(70);
      line-height: r(70);
      // border-bottom: 1px solid #574740;
      color:#e6f3ff;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      background:#243057;
      &:nth-of-type(2n) {
        background:rgba($color: #485faa, $alpha: .2);
      }
      i.icon-arrow-right {
        display: inline-block;
        width: r(45);
        color: #fff;
      }
    }
    .txt-y {
      color: blue;
    }
    .txt-r {
      color: #ff4200;
    }
    .txt-l {
      color: red;
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
