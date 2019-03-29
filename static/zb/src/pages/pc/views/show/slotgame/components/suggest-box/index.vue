<template>
  <div class="suggest-box">
    <div class="header"><img src="../../images/recommend.png"></div>
    <div class="game-list">
      <div class="list-box" ref="lists" style="position: relative;display:flex;">
        <div class="game-item" v-for="(item,i) in myData" :key="i">
          <div class="game-layer">
            <p class="layer-game-name ng-binding">{{item.gameName}}</p>
            <p></p>
            <div class="link">
              <a href="javascript:void(0);" class="goGame" @click="playGame(extend(item),$event)">立即游戏</a>
            </div>
          </div>
          <div class="game-img">
              <img :src="getImg({pic:item.picPath,category:item.platform})">
          </div>
          <p class="game-name">{{item.gameName}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {games} from "@/controls/games/game";
  import {queryRecommandGamesList} from "@/api/show"
export default {
    mixins: [games],
    data() {
      return {
        myData: [],
        id:0
      };
    },
    watch:{
      myData(val){
        if (val.length>4) {
          this.id=window.setInterval(() => {
            this.move();
          }, 3500)
        }
      }
    },
    methods: {
      extend(item) {
        return {
          "eName": "",
          "name": item.gameName,
          "id": item.gameId,
           "code": item.code||'',
          "category": item.platform,
          "type": "SLO",
          "line": "",
          "state": 1,
          subType:item.subType || "",
          "pic": item.picPath,
          "tag": []
        }
      },
      move() {
        let $this = this;
        Velocity(this.$refs.lists, {
          left: "-215px;"
        }, {
          duration: 1000,
          complete() {
            if ($this.$refs.lists.childNodes) {
              $this.$refs.lists.appendChild($this.$refs.lists.childNodes[0])
              $this.$refs.lists.style.left = 0;
            }
          }
        })
      }
    },
    beforeDestroy(){
      window.clearInterval(this.id)
    },
    created() {
      queryRecommandGamesList({gameType: 0}).then(res => {
        if (res.success) {
          if (res.data) {
            this.myData = res.data;
          }
        }
      });
    },
    activated() {
    },
    components: {}
  }
</script>
<style lang="scss" scoped>
// .suggest-box{
//   min-height: 329px;
// }
  .game-list{
    overflow: hidden;
    width: 875px;
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
