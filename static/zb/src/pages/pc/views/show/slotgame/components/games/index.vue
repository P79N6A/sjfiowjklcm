<template>
  <div class="game-list">
    <div class="game-item" v-for="(item,i) in fillterData" :key="item.category+item.id+i" v-show="fillterData.length>0">
      <div class="game-layer">
        <p class="layer-game-name">{{item.name}}</p>
        <div class="link">
          <a href="javascript:void(0);" class="goGame" @click="playGame(item,$event)" v-if="showPlay(item)">立即游戏</a>
        </div>
        <div class="link">
          <a href="javascript:void(0);" class="goGame" @click="tryGame(item,$event)" v-if="showTry(item)">试玩游戏</a>
        </div>
      </div>
      <div class="game-img">
        <img v-lazy="getImg(item,'pc')" :alt="item.name">
      </div>
      <p class="game-name">{{item.name}}</p>
    </div>
    <div v-show="fillterData.length==0" style="color:#fff;">
        查找不到游戏...
      </div>
  </div>
  <!-- <div class="slot-game-list" v-loading="loading">
      <div class="slot-item" v-for="(item,i) in fillterData" :key="item.category+item.id+i" v-show="fillterData.length>0">
        <img v-lazy="getImg(item,'pc')" :alt="item.name">
        <a target="_blank" href="javascript:void(0);" @click="playGame(item,$event)" class="bg"></a>
        <p class="p1">
          <span></span>
          {{item.name}}({{item.category}})
        </p>
      </div>
      <div v-show="fillterData.length==0" style="color:#fff;">
        查找不到游戏...
      </div>
  </div> -->
</template>
<script>
  import {
    games
  } from "@/controls/games/game";

  export default {
    // games方法
    mixins: [games],
    data() {
      return {
        loading:true
      };
    },
    created() {
      // 获取游戏数据
      this.getGames('pc').then(res=>{
        this.loading=false
      }).catch(err=>{
        console.log(err)
      })
    },
  };

</script>
<style lang="scss" scoped>
  .game-list{
    .game-item{
      .game-layer{
        opacity: 0;
        .link{
          text-align: center;
          .goGame{
            margin-left: 0!important;
            margin: 0 auto;
          }
        }
      }
      &:hover{
        .game-layer{
          opacity: 1!important;
        }
      }
    }
  }
</style>
