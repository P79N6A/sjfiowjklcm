<template>
  <div class="winner_list">
    <div class="section_title clear">
        <div class="fl bg-winner_icon"></div>
        <div class="fl">中奖名单</div>
    </div>
    <div class="topLoop" style="overflow:hidden;">
      <div class="bd">
        <div class="tempWrap" style="overflow:hidden; position:relative; height:100px">
          <ul class="infoList clear" style="position: relative; padding: 0px; margin: 0px; top: -128px;" :class="{animates:myData.length>2}">
            <li class="clear clone item" style="height: 78px;" v-for="item in myData" :key="item.id">
              <a href="javascript:void(0);" target="_blank">
                <div class="gamepic"><img :src="item.link" alt=""></div>
                <div class="wintext">
                  <div>恭喜会员{{item.userName}}在{{item.platform}}游戏{{item.gameName}}<span>{{item.betAmt}}</span>元击中奖池</div>
                  <div>喜提￥<span>{{item.prize}}</span>元！</div>
                </div>
              </a>
            </li>
          </ul>
          <ul class="infoList clear" style="position: relative; padding: 0px; margin: 0px; top: -128px;" :class="{animates:myData.length>2}">
            <li class="clear clone item" style="height: 78px;" v-for="item in myData" :key="item.id">
              <a href="javascript:void(0);" target="_blank">
                <div class="gamepic"><img :src="item.link" alt=""></div>
                <div class="wintext">
                  <div>恭喜会员{{item.userName}}在{{item.platform}}游戏{{item.gameName}}<span>{{item.betAmt}}</span>元击中奖池</div>
                  <div>喜提￥<span>{{item.prize}}</span>元！</div>
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
  watch: {
    myData(val) {
      this.animation = {
        "animation-duration": val.length * 2.5 + 's',
        "-webkit-animation-duration": val.length *2.5 + 's'
      }
    }
  },
  methods: {},
  beforeDestroy() {},
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
  position: absolute;
  margin-top: 13px;
  right: 0;
  background: #f8f1e8;
  border: 1px solid #4db7f4;
  .section_title {
    padding-left: 20px;
    background: #4db7f4;
    line-height: 50px;
    height: 50px;
    color: #fff;
  }
  .bg-winner_icon {
      width: 21px;
      height: 20px;
      margin: 12px 10px 0 0;
      background: url(../../images/content_sprites.png) -10px -115px;
  }
  .slide-group .bd {
    padding: 0 30px;
  }
  .infoList li {
    height: 100px !important;
    padding: 20px 20px 0;
    border-bottom: 1px solid #c9c9c9;
    .gamepic {
      width: 66px;
      height: 66px;
      float: left;
      margin-right: 15px;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .wintext {
      width: 200px;
      text-align: left;
      float: left;
      font-size: 12px;
      span {
        color: red;
      }
    }
  }
  .animates {
    position: relative;
    animation: animations 20s linear infinite;
  }
}
.clear {
    zoom: 1;
    clear: none !important;
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
