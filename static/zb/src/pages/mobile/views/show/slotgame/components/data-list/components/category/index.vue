<template>
    <div class="slot-game-list cfx">
        <div v-if="fillterData.length>0 && !showLoading">
          <div v-for="(item,i) in fillterData" class="slot-game-item" :key="i+item.id +i" > 
              <a class="item-view" href="javascript:;">
              <div :class="{'item-hot':item.tag.includes('HOT')}"></div>
              <div class="item-line">{{item.line?item.line+'线':''}}</div>
              <img class="item-img"  v-lazy="getImg(item,'mobile')">
              </a>
              <div class="item-operations">
              <div class="item-text" >{{item.name}}</div>
              <!--<i  :class="['iconfont icon-heart-full',{faved:getfaved(item)}]" @click.stop="collect(item)"></i>-->
              </div>
              <div class="playBox">
                <a href="javascript:;" class="playbtn playReal" v-show="showPlay(item)" @click="playGame(item,$event, 'mobile')">进入</a>
                <a href="javascript:;" class="playbtn playTry" v-show="showTry(item)" @click="tryGame(item,$event, 'mobile')">试玩</a>
              </div>           
          </div>
        </div>
        <div class="notfind" style="text-align:center;" v-else-if="!fillterData.length && !showLoading"> 
          <img src="./images/gameicon_03.png">
          <p style="color:#bda059;line-height:3;">查询不到游戏</p>
        </div>
        <div v-else>
          <loadding></loadding>
        </div>
        <!-- 开始游戏弹窗 -->
        <!-- <model-game v-model="showModel" :data="curItem"></model-game> -->
    </div>
</template>
<script>
  // import modelGame from "./model-game"
  import {games} from "@/controls/games/game"
  import loadding from "mobile/components/loadding"
  export default {
    // 混合
    mixins: [games],
    data() {
      return {
        showLoading:true
      };
    },
    methods: {
      
    },
    watch:{},
    created() {
      // 获取游戏数据
      this.getGames('mobile').then(()=>{
        this.showLoading = false
      })
    },
    components: {loadding}
  };
</script>
