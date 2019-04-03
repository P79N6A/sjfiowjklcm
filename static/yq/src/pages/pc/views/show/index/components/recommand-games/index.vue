<template>
  <div class="game_list inblock">
    <div class="section_title clear">
      <h4 class="fl">
        <i class="iconfont icon-remenyouxituijian"></i>热门游戏推荐
      </h4>
      <div class="fr game_tab">
        <ul class="items inblock_fix" id="items-menu">
          <li
            class="inblock"
            v-for="item in platformData"
            :key="item.value"
            :class="{on:active==item.value}"
          >
            <a href="javascript:void(0);" @click="overShow(item.value)" v-if="item.value != 'PT2TIGER'">{{item.value}}</a>
            <a href="javascript:void(0);" @click="overShow(item.value)" v-else>PT国际</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="game-content inblock_fix">
      <div id="arrow_prev" class="arrow inblock" @click="pregame">
        <div class="bg-arrow_left"></div>
      </div>
      <div class="left-items inblock">
        <div class="items">
          <div class="item">
            <dl v-for="(item,i) in filterData1" :key="item.gameId + i">
              <dt>
                <img v-lazy="getImg({pic:item.picPath,category:item.platform})" alt class="lazy">
              </dt>
              <dd class="gamename1">
                <div class="game-play game-play1 tc">
                  <a
                    href="javascript:void(0);"
                    class="j-login play"
                    @click="playGame(extend(item),$event)"
                  >进入游戏</a>
                  <a
                    href="javascript:void(0);"
                    class="btn-try"
                    @click="tryGame(extend(item),$event)"
                  >试玩游戏</a>
                </div>
              </dd>
              <dd class="gamename2">
                <h3>{{item.gameName}}</h3>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div id="arrow_next" class="arrow inblock" @click="nextgame">
        <div class="bg-arrow_right"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { games } from "@/controls/games/game";
import { queryRecommandGamesList } from "@/api/show";
import { platformData } from "@/assets/data";

export default {
  mixins: [games],
  data() {
    return {
      active: "PT2TIGER",
      platformData,
      myData: [],
      platformData1: [],
      gameMinIndex: 0,
      gameMaxIndex: 5,
      gamelen: "",
      filterData:[],
      filterData1:[]
    };
  },
  methods: {
    extend(item) {
      return {
        eName: "",
        name: item.gameName,
        id: item.gameId,
        code: item.code || "",
        category: item.platform,
        type: "SLO",
        line: "",
        state: 1,
        subType: item.subType || "",
        pic: item.picPath,
        tag: []
      };
    },
    pregame() {
      if (this.gameMinIndex == 0) {
        window.toast("已无更多");
        return false;
      } else {
        this.gameMinIndex = this.gameMinIndex - 1;
        this.gameMaxIndex = this.gameMaxIndex - 1;
        this.filterData1 = this.filterData.slice(
          this.gameMinIndex,
          this.gameMaxIndex
        );
      }
    },
    nextgame() {
      console.log(this.gamelen)
      if (this.gameMaxIndex < 5 || this.gameMaxIndex >= this.gamelen) {
        window.toast("已无更多");
        return false;
      } else {
        this.gameMinIndex = this.gameMinIndex + 1;
        this.gameMaxIndex = this.gameMaxIndex + 1;
        this.filterData1 = this.filterData.slice(
          this.gameMinIndex,
          this.gameMaxIndex
        );
      }
    },
    overShow(val) {
      this.active = val;
    }
  },
  watch: {
    'active'(val){
      if (val == "") {
        this.filterData = this.myData.slice(0,6);
      }else{
        this.filterData = this.myData.filter(item=>{
          return item.platform.indexOf(this.active) > -1;
        })
      }
      this.filterData1 = this.filterData.slice(0,5)
      this.gamelen = this.filterData.length
    }
  },
  computed: {
    // filterData() {
    //   if (this.active == "") return this.mydata.slice(0, 6);
    //   return this.myData
    //     .filter(item => {
    //       return item.platform.indexOf(this.active) > -1;
    //     })
    //     .slice(0, 5);
    // }
  },
  created() {
    queryRecommandGamesList({
      gameType: 0
    }).then(res => {
      if (res.success && res.data){
        this.myData = res.data;
        this.filterData = this.myData.filter(item=>{
          return item.platform.indexOf(this.active) > -1;
        })
        this.filterData1 = this.filterData.slice(0,5)
        this.gamelen = this.filterData.length
      }
    });
  },
  activated() {},
  components: {},
};
</script>
<style lang="scss" scoped>
.game_list {
  width: 850px;
  height: 223px;
  margin: 0 0 0 20px;
  background: #fff;

  .section_title {
    padding-left: 20px;
          background: rgb(89, 219, 208); /* Old browsers */
          background: -moz-linear-gradient(
            top,
            rgba(89, 219, 208, 1) 0%,
            rgba(77, 183, 244, 1) 100%
          ); /* FF3.6-15 */
          background: -webkit-linear-gradient(
            top,
            rgba(89, 219, 208, 1) 0%,
            rgba(77, 183, 244, 1) 100%
          ); /* Chrome10-25,Safari5.1-6 */
          background: linear-gradient(
            to bottom,
            rgba(89, 219, 208, 1) 0%,
            rgba(77, 183, 244, 1) 100%
          ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#59dbd0', endColorstr='#4db7f4',GradientType=0 ); /* IE6-9 */

    line-height: 50px;
    color: #fff;
    position: relative;

    h4 {
      font-size: 14px;
      letter-spacing: normal;
      line-height: 50px;
    }

    i {
      margin-right: 3px;
    }

    .game_tab {
      li {
        height: 20px;
        margin: 16px -12px 0 10px;
        padding: 0 12px;
        line-height: 20px;
        color: #fff;
        transition: 0.1s all linear;
        &:last-child {
          margin-right: 10px;
        }

        &.on,
        &:hover {
          background: #fff;
          border-radius: 15px;
          color: #4db7f4;
        }
      }
    }
  }

  .game-content {
    .arrow {
      width: 15px;
      height: 153px;
      margin: 0 7px;
      position: relative;
      font-size: 21px;
      font-weight: 800;
      cursor: pointer;

      .bg-arrow_left {
        width: 15px;
        height: 23px;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        background: url(./images/arrow_sprites.png) -10px -10px;
      }

      .bg-arrow_right {
        width: 15px;
        height: 23px;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        background: url(./images/arrow_sprites.png) -45px -10px;
      }
    }
    .left-items {
      width: 788px;
      overflow: hidden;
      position: relative;
      z-index: 99;
      .items {
        height: 153px;
        padding: 0;
        position: relative;
        left: 0;
        padding: 0;
        .on {
          z-index: 200;
        }
        .item {
          width: 100%;
          height: 174px;
          overflow-x: hidden;
          overflow-y: hidden;
          position: absolute;
          left: 18px;
          top: 0;
          dl {
            width: 133px;
            margin: 20px 8.5px;
            float: left;
            overflow: hidden;
            position: relative;
            dt {
              overflow: hidden;
              img {
                width: 100%;
                height: 110px;
              }
            }
            .gamename1 {
              width: 100%;
              height: 110px;
              position: absolute;
              left: 0;
              top: -100%;
              padding-top: 0;
              background: rgba(0, 0, 0, 0.5);
              -webkit-transition: all 0.3s ease-out;
              -o-transition: all 0.3s ease-out;
              transition: all 0.3s ease-out;
              text-align: center;
              color: #fff;
              font: 400 16px/38px "Microsoft Yahei";
              .play {
                display: block;
                width: 75px;
                height: 30px;
                line-height: 30px;
                background: #fd4747;
                margin: 18px auto 16px;
                border-radius: 5px;
                font-size: 12px;
              }
              .btn-try {
                display: block;
                width: 75px;
                height: 30px;
                line-height: 30px;
                background: #4db7f4;
                margin: 0 auto;
                border-radius: 5px;
                font-size: 12px;
              }
            }
            .gamename2 {
              h3 {
                font-size: 14px;
                text-align: center;
                color: #000;
              }
            }
            &:hover {
              .gamename1 {
                top: 0;
              }
            }
          }
        }
      }
    }
  }
}
.tc {
  text-align: center !important;
}
.inblock {
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
  letter-spacing: normal;
  zoom: 1;
}

.inblock_fix {
  letter-spacing: -4px;
  font-size: 0;
}

.clear {
  zoom: 1;
  clear: none !important;

  &::after {
    content: "";
    display: block;
    clear: both;
  }
}

.fl {
  float: left !important;
}

.fr {
  float: right !important;
}

.inblock_fix {
  letter-spacing: -4px;
  font-size: 0;
}
</style>
