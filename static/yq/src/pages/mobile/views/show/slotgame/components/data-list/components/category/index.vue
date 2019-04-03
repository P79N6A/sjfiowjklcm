<template>
  <div class="slot-game-list cfx">
    <div v-if="fillterData.length>0 && !showLoading">
      <div v-for="item in fillterData" class="slot-game-item" :key="item.id + item.eName">
        <a class="item-view" href="javascript:;">
          <div :class="{'item-hot':item.tag.includes('HOT')}"></div>
          <!-- <div class="item-line">{{item.line?item.line+'线':''}}</div> -->
          <img class="item-img" v-lazy="getImg(item,'mobile')">
          <div class="item-operations">
            <div class="item-text">{{item.name}}[{{item.category|platform}}]</div>
            <span class="jionfav" @click.stop="collectGame(item)" v-if="islogin">
              <i :class="['iconfont icon-weibiaoti-',{faved:item.fav=='yes'}]"></i>加入收藏
            </span>
          </div>
        </a>

        <div class="playBox">
          <a
            href="javascript:;"
            class="playbtn playReal"
            v-show="showPlay(item)"
            @click="playGame(item,$event, 'mobile')"
          >进入</a>
          <a
            href="javascript:;"
            class="playbtn playTry"
            v-show="showTry(item)"
            @click="tryGame(item,$event, 'mobile')"
          >试玩</a>
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
  </div>
</template>
<script>
// import modelGame from "./model-game"
import { mapGetters } from "vuex";
import { games } from "@/controls/games/game";
import loadding from "mobile/components/loadding";
export default {
  // 混合
  mixins: [games],
  data() {
    return {
      showLoading: true
    };
  },
  computed: {
    ...mapGetters(["islogin"])
  },
  filters: {
    platform: function(key) {
      if (key == "PT2TIGER") {
        return "PT";
      } else if (key == "AMEBA") {
        return "AE";
      } else if (key == "JDBSLOT") {
        return "JDB";
      } else if (key == "MGS") {
        return "MG";
      } else {
        return key;
      }
    }
  },
  methods: {
    collectGame(item) {
      //收藏
      this.setFaved(item)
        .then(res => {
          window.toast(res.message);
        })
        .catch(err => {
          window.toast(err.message);
        });
    }
  },
  watch: {},
  created() {
    // 获取游戏数据
    this.getGames("mobile").then(res => {
      this.showLoading = false;
    });
  },
  components: { loadding }
};
</script>
