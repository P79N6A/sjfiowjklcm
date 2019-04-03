<template>
  <div class="gameData-box">
    <p class="gameAmount">
      共有(
      <span>{{fillterData.length}}</span>)款游戏
    </p>
    <div class="game-list">
      <div
        class="game-info box"
        v-for="(item,i) in fillterData"
        :key="item.category+item.id+i"
        v-show="fillterData.length>0"
      >
        <div class="game-pic">
          <img v-lazy="getImg(item,'pc')" width="200" height="200" :alt="item.name">
        </div>
        <div class="name">
          <h4>{{item.name}}[{{item.category|platform}}]</h4>
          <sub>{{item.eName}}</sub>
          <i class="iconfont icon-shoucang-copy" v-if="item.fav=='yes'" @click="Faved(item)"></i>
          <i class="iconfont icon-shoucang" v-else @click="Faved(item)"></i>
        </div>
        <div class="game-brief">
          <div class="btn-wp text-center">
            <a
              class="btn-try"
              href="javascript:void(0);"
              target="_blank"
              @click="tryGame(item,$event)"
              v-if="showTry(item)"
            >试玩游戏</a>
            <a
              href="javascript:void(0);"
              target="DTGame"
              class="j-login play"
              @click="playGame(item,$event)"
              v-if="showPlay(item)"
            >进入游戏</a>
            <i class="jackpot-flag" v-if="item.tag.includes('AMA')"></i>
          </div>
        </div>
      </div>
      <div v-show="fillterData.length==0" style="color:#fff;">查找不到游戏...</div>
    </div>
  </div>
</template>
<script>
import { games } from "@/controls/games/game";

export default {
  // games方法
  mixins: [games],
  data() {
    return {
      loading: true
    };
  },
  methods: {
    Faved(item) {
      this.setFaved(item)
        .then(res => {
          window.toast(res.message);
        })
        .catch(err => {
          window.toast(err.message);
        });
    }
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
  created() {
    // 获取游戏数据
    this.getGames("pc")
      .then(res => {
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="scss" scoped>
.gameAmount {
  text-align: right;
  color: #d7d7d7;
  padding-right: 20px;

  span {
    color: red;
  }
}

.game-list {
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  .game-info {
    overflow: hidden;
    float: left;
    width: 216px;
    padding: 10px 10px;
    margin: 0 10px 20px 10px;
    position: relative;
    cursor: pointer;
    font-size: 14px;
    color: #c1c1c1;
    text-align: left;
    transition: all 0.3s;
    background: #fff;
    border: 1px solid #c9c9c9;
    box-shadow: none;
    &:nth-child(1) {
      animation-delay: 0.4s;
    }
    &:nth-child(-n + 8) {
      animation-duration: 0.8s;
    }
    &:hover {
      transform: translateY(-6px);
    }
    .game-pic {
      width: 200px;
      height: 200px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      height: 54px;
      padding-top: 5px;
      text-align: center;
      transition: background 0.2s;
      -webkit-transition: background 0.2s;
      overflow: hidden;
      position: relative;
      .iconfont {
        position: absolute;
        right: 5px;
        color: red;
      }
      h4 {
        color: #333;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        sub {
          display: block;
          font-size: 12px;
          color: #787876;
          text-transform: uppercase;
        }
      }
    }
    .btn-try {
      width: 91px;
      height: 36px;
      display: inline-block;
      background: #4db7f4;
      line-height: 36px;
      color: #fff;
      border-radius: 7px;
    }
    .play {
      width: 91px;
      height: 36px;
      display: inline-block;
      background: #fd4747;
      line-height: 36px;
      color: #fff;
      border-radius: 7px;
    }
    .jackpot-flag {
      width: 75px;
      height: 81px;
      background: url(./images/jackpot-flag.png) no-repeat center top;
      position: absolute;
      z-index: 99;
      top: 0px;
      right: 0px;
    }
  }
}
.text-center {
  text-align: center;
}
</style>
