<template>
  <div class="slots">
    <div class="container">
      <jackpot></jackpot>
      <div class="airplane" style="top: 121px; right: -316px;"></div>
      <div class="slots-frame">
        <div class="frame-top cfx">
          <winningList class="fl"></winningList>
          <suggestBox class="fl"></suggestBox>
        </div>
        <div class="frame-content">
          <platform></platform>
          <vFilter></vFilter>
          <div style="clear:both"></div>
          <dadaList></dadaList>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import jackpot from "./components/jackpot"
  import winningList from './components/winning-list'
  import suggestBox from './components/suggest-box'
  import recommandGames from "./components/recommand-games/"
  import filterInput from "./components/filter-input"
  import platform from "./components/platform"
  import dadaList from "./components/games"
  import vFilter from "./components/fliter"
  import {getAllGames} from "@/api/show"
  import {queryGameStatus} from "@/api/user"
  export default {
    data() {
      return {
        showloadding: false,//加载中... 相反的 false=显示
        showNoData: false,//是否显示空数据
        allGames: [],//所有的数据
        fillterData: [], //过滤后 的数据
        filter: { //过滤条件
          category: '', //老虎机平台类型
          type: '',  //老虎机类型 :经典,电动吃角子
          line: '', // 老虎机线性类型
          subType: '', // 第二种类型类型
          tag: '' //热门 最新等
        },
        statusData: []
      };
    },
    components: {
      winningList,jackpot,suggestBox,platform,vFilter, dadaList,recommandGames,filterInput
    },
    methods: {
      
    },
    watch: {
      
    },
    computed: {
      
    },
    created() {
      
    },
  };
</script>
<style lang='scss'>
  .slots {
  display: block;
  background: url(./images/background.jpg) no-repeat top, url(./images/bg2.jpg) repeat-y 50%;
  width: 100%;
  min-height: 1654px;
  color: #b7b7b7;
  overflow: hidden;
  position: relative;
  padding-top: 87px;
  > .container {
    position: relative;
    width: 1280px;
  }
  .pt-jackpot {
    text-align: center;
    padding-top: 198px;
    color: #fff;
    font-size: 42px;
    height: 261px;
  }
  .airplane {
    position: absolute;
    right: -1200px;
    top: 500px;
    width: 575px;
    height: 558px;
    display: block;
    background: url(./images/warships.png) no-repeat;
  }
  .slots-frame {
    min-height: 1175px;
    padding: 0 25px;
    padding-top: 130px;
    bottom: 0;
    background-size: 100% 100%;
    margin-top: 129px;
    .frame-content .game-list .game-item, .frame-top .game-list .game-item {
      display: block;
      margin-left: 15px;
      margin-top: 5px;
      height: 260px;
      float: left;
      position: relative;
    }
    .frame-content .game-list .game-item .game-layer, .frame-top .game-list .game-item .game-layer {
      width: 228px;
      height: 175px;
      position: absolute;
      background: rgba(34, 147, 252, 0.8);
      transition: opacity .3s ease;
      display: block;
      opacity: 0;
      top: 0;
      left: 0;
      color: #fff;
    }
    .frame-content .game-list .game-item .game-layer a, .frame-top .game-list .game-item .game-layer a {
      color: #fff;
    }
    .frame-content .game-list .game-item .game-layer .layer-game-name, .frame-top .game-list .game-item .game-layer .layer-game-name {
      margin-top: 27px;
      font-size: 16px;
    }
    .frame-content .game-list .game-item .game-layer .layer-jackpot, .frame-top .game-list .game-item .game-layer .layer-jackpot {
      margin-top: 20px;
    }
    .frame-content .game-list .game-item .game-layer .link, .frame-top .game-list .game-item .game-layer .link {
      margin-top: 25px;
    }
    .frame-content .game-list .game-item .game-layer .link .goGame, .frame-top .game-list .game-item .game-layer .link .goGame {
      margin-left: 20px;
      margin-top: 20px;
      padding: 8px 40px;
      border: 1px solid #fff;
      border-radius: 50px;
    }
    .frame-content .game-list .game-item .game-layer .link .goGame:hover, .frame-top .game-list .game-item .game-layer .link .goGame:hover {
      background: #fff;
      color: rgba(34, 147, 252, 0.8);
    }
    .frame-content .game-list .game-item .game-layer .link .like, .frame-top .game-list .game-item .game-layer .link .like {
      margin-left: 5px;
      line-height: 20px;
    }
    .frame-content .game-list .game-item .game-layer .link .like img, .frame-top .game-list .game-item .game-layer .link .like img {
      vertical-align: bottom;
    }
    .frame-content .game-list .game-item .game-img:hover ~ .game-layer, .frame-top .game-list .game-item .game-img:hover ~ .game-layer {
      opacity: 1;
    }
    .frame-content .game-list .game-item .game-img img, .frame-top .game-list .game-item .game-img img {
      width: 228px;
      height: 175px;
    }
    .frame-content .game-list .game-item p, .frame-top .game-list .game-item p {
      text-align: center;
      margin: 5px;
      font-size: 12px;
    }
    .frame-content .game-list .game-item p.game-name {
      font-size: 14px;
      color: #fff;
    }
    .frame-top {
      .game-list .game-item p.game-name {
        font-size: 14px;
        color: #fff;
      }
      .suggest-box {
        display: inline-block;
      }
      .winning-box {
        display: inline-block;
        width: 300px;
        .winning-data {
          ul {
            width: 100%;
            display: table;
            list-style: none;
          }
          .scrollTitle {
            background: rgba(34, 147, 252, 0.22);
            width: 295px;
            // margin-top: -15px;
            background-size: cover;
            -moz-background-size: cover;
            color: #2293fc;
            ul {
              color: #2293fc;
            }
            li {
              height: 40px;
              padding-left: 10px;
            }
          }
          .scrollContent {
            width: 295px;
            // margin-top: -10px;
            background: rgba(0, 0, 0, 0.33);
            // position: absolute;
            height: 27px;
            overflow: hidden;
            ul {
              margin-top: 0;
            }
            li {
              height: 40px;
              padding-left: 10px;
            }
          }
          #winningScroll {
            height: 167px;
          }
          .winning-list-item {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            padding: 10px 0;
          }
          .position {
            padding-right: 1em;
            text-align: center;
          }
          span {
            width: 100px;
          }
          .winning-list-item .length {
            color: #cacaca;
            margin-left: auto;
          }
        }
      }
      .suggest-box {
        margin-left: 10px;
        .game-list {
          display: block;
          height: 218px;
          background: rgba(0, 0, 0, 0.33);
          padding: 18px 13px 0 0;
          .game-item {
            .game-img img, .game-layer {
              width: 200px;
              height: 150px;
            }
          }
        }
      }
    }
    .frame-content {
      background: rgba(0, 0, 0, 0.33);
      margin-top: 20px;
      .tabs {
        background: transparent;
        .tab a {
          padding: 0 20px;
          color: #b7b7b7;
          &.active, &:hover {
            color: #2293fc;
            border-bottom: 2px solid #2293fc;
          }
        }
        .indicator {
          background: #2293fc;
        }
      }
      .menu-container {
        height: 60px;
        .menu_box {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          float: left;
          width: 80%;
          li {
            text-align: center;
            margin-right: 20px;
            padding: 8px 15px;
            outline: none;
            cursor: pointer;
            border: 1px solid transparent;
            border-radius: 50px;
            &.active, &:hover {
              border: 1px solid #2293fc;
              color: #2293fc;
            }
          }
        }
        .search_container {
          float: left;
          width: 19%;
          .searchbox {
            margin-top: 13px;
            position: relative;
            input {
              &::-ms-clear {
                display: none;
              }
              color: #fff;
              border-radius: 50px;
            }
            .search {
              position: absolute;
              right: 15px;
              top: 8px;
            }
          }
        }
      }
      .more {
        text-align: center;
        padding-bottom: 20px;
        padding-top: 12px;
        .btn-more {
          color: #fff;
          padding: 10px 15px;
          border: 1px solid #fff;
          border-radius: 50px;
          &.active, &:hover {
            border: 1px solid #2293fc;
            background: #2293fc;
          }
        }
      }
    }
  }
}

</style>
