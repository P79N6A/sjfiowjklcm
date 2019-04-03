<template>
  <div class="winner_list inblock">
    <div class="section_title">
      <h4>
        <i class="iconfont icon-zhongjiangmingdan"></i>中奖名单
      </h4>
    </div>
    <div class="topLoop">
      <div class="bd">
        <div class="tempWrap" style="overflow:hidden; position:relative; height:600px">
          <ul
            class="infoList clear"
            style="position: relative; padding: 0px; margin: 0px; top: -128px;"
            :class="{animates:myData.length>2}"
          >
            <li
              class="clear clone item"
              style="height: 78px;"
              v-for="item in myData"
              :key="item.id"
            >
              <a href="javascript:void(0);" target="_blank">
                <div class="gamepic">
                  <img :src="item.link" alt>
                </div>
                <div class="wintext">
                  <div>
                    恭喜会员{{item.userName}}在{{item.platform}}游戏{{item.gameName}}
                    <span>{{item.betAmt}}</span>元击中奖池
                  </div>
                  <div>
                    喜提￥
                    <span>{{item.prize}}</span>元！
                  </div>
                </div>
              </a>
            </li>
          </ul>
          <ul
            class="infoList clear"
            style="position: relative; padding: 0px; margin: 0px; top: -128px;"
            :class="{animates:myData.length>2}"
          >
            <li
              class="clear clone item"
              style="height: 78px;"
              v-for="item in myData"
              :key="item.id"
            >
              <a href="javascript:void(0);" target="_blank">
                <div class="gamepic">
                  <img :src="item.link" alt>
                </div>
                <div class="wintext">
                  <div>
                    恭喜会员{{item.userName}}在{{item.platform}}游戏{{item.gameName}}
                    <span>{{item.betAmt}}</span>元击中奖池
                  </div>
                  <div>
                    喜提￥
                    <span>{{item.prize}}</span>元！
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCarouselListAll } from "@/api/show";
export default {
  data() {
    return {
      myData: [],
      id: 0,
      animation: {}
    };
  },

  methods: {},
  created() {
    getCarouselListAll().then(res => {
      if (res.success) {
        this.myData = res.data;
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.winner_list {
  width: 330px;
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
    letter-spacing: normal;

    h4 {
      font-size: 14px;
      font-weight: normal;
      line-height: 50px;
    }

    i {
      margin-right: 3px;
      font-size: 16px;
    }
  }

  .topLoop {
    height: 540px !important;
    overflow: hidden;

    .infoList {
      li {
        height: 100px !important;
        padding: 20px 20px 0;
        border-bottom: 2px solid #f1f1f1;

        .gamepic {
          width: 66px;
          height: 66px;
          float: left;
          margin-right: 15px;

          img {
            width: 66px;
            height: 66px;
          }
        }

        .wintext {
          width: 200px;
          text-align: left;
          float: left;
          font-size: 12px;
          letter-spacing: normal;

          span {
            color: red;
          }
        }
      }
    }
  }
}

.inblock {
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
  zoom: 1;
}

.animates {
  position: relative;
  animation: animations 20s linear infinite;
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
