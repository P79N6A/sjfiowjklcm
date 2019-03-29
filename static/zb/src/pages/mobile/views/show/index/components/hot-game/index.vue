<template>

  <div class="hot-game" v-if="recommandData.length>0">
   <div class="section-tit"><i class="iconfont icon-fire"></i><h2>热门游戏</h2> </div>
    <div class="game-list">
      <div v-for="(item,i) in recommandData" :key="i" @click="tickGanme(item)" class="hot-item">

        <img class="game_img lazy" v-lazy="getImg(item)">

        <div class="item-title">{{item.name}}</div>
      </div>
    </div>
    <model-game v-model="showModel" :data="curItem"></model-game>
  </div>
</template>
<script>
  import {queryRecommandGamesList} from "@/api/show"
  import modelGame from "mobile/views/show/slotgame/components/data-list/model-game"
  import {games} from "@/controls/games/game" 
  export default {
    // 混合
    mixins: [games],
    data() {
      return {
        recommandData: [],
        curItem: {},
        showModel: false
      }
    },
    props: {},
    computed: {},
    watch: {},
    methods: {
      tickGanme(item) {
        this.curItem = item;
        this.showModel = true;
      },
    },
    created() {
      queryRecommandGamesList({gameType: 1}).then(res => {
        if (res.success && res.data){
          this.recommandData = []
          for(let i =0;i<res.data.length;i++){
            this.recommandData.push({
              category:res.data[i].platform,
              code:res.data[i].code||'',
              eName:res.data[i].gameId,
              id:res.data[i].gameId,
              language:"",
              name:res.data[i].gameName,
              pic:res.data[i].picPath,
              subType:res.data[i].subType||'',
              state:1,
              tag:[],

            })
          }
          console.log(this.recommandData)
        }
      })
    },
    activated() {
    },
    components: {
      modelGame
    }
  }
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .hot-game {
    @include f(28px);
    padding: r(20) 0 r(20) r(30);
    background-color:#f5f5f5;
    .game-list {
      display: flex;
      flex-wrap: nowrap;
      width: 100%;
      overflow: hidden;
      overflow-x: auto;
    }
    .hot-item {
      position: relative;
      display: inline-block;
      width: r(215);
      margin-right: r(20);
      margin-bottom: r(20);
      img {
        width: r(220);
        height: r(220);
      }
    }
    .section-tit{
      height: 25px;
      position: relative;
      h2{
        font-size: 18px;
        display: inline-block;
        font-weight: 0;
        font-weight: 500;
        position: absolute;
        left: 22px;
      }
      .icon-fire{
        color: #1e327e;
        margin-right: 0.21333rem;
        font-size: 23px;
        position: absolute;
        left: -3px;
        top: -4px;
      }
    }
    .item-title {
     position: absolute;
     bottom: 0;
     color: #fff;
     width: 103%;
     line-height: 20px;
     text-align: center;
     background: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.9)), color-stop(70%, rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0.4)));
     background: -webkit-linear-gradient(bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.4) 100%);
     background: -moz- oldlinear-gradient(bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.4) 100%);
     background: -o-linear-gradient(bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.4) 100%);
     background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.4) 100%);
    }
  }
</style>
