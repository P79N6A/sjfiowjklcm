<template>
  <div class="hot-game" v-if="recommandData.length>0">
    <div class="section-tit">
      <h2>推荐游戏</h2>
    </div>
    <!-- <div class="game-box">
      <div class="game-list">
        <div v-for="(item,i) in recommandData" :key="i" @click="tickGanme(item)" class="hot-item">
          <img class="game_img lazy" v-lazy="getImg(item)">
          <div class="item-title">{{item.name}}</div>
        </div>
      </div>
    </div> -->
    <div class="game-box">
      <swiper style="height:100%;" :options="swiperOption">
        <swiper-slide v-for="(item,i) in recommandData" :key="i" >
          <img v-lazy="getImg(item)" @click="tickGanme(item)" style="width:100%;height:75%;"/>
          <div class="item-title">{{item.name}}</div>
        </swiper-slide>
      </swiper>
    </div>

    <model-game v-model="showModel" :data="curItem"></model-game>
  </div>
</template>
<script>
import { queryRecommandGamesList } from "@/api/show";
import modelGame from "mobile/views/show/slotgame/components/data-list/model-game";
import { games } from "@/controls/games/game";
export default {
  // 混合
  mixins: [games],
  data() {
    return {
      recommandData: [],
      curItem: {},
      showModel: false,
      timer:null,
      index:0,
      count:0,
      swiperOption: {
         slidesPerView: 3,
          spaceBetween: 10,
          slidesPerGroup: 3,
          // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: {
            delay:5000,
            disableOnInteraction:false
          },
          // direction : 'vertical',
          // effect: "coverflow",
          grabCursor: true,
          // setWrapperSize: true,
          // autoHeight: true,
          paginationType: "bullets",
          pagination: '.swiper-pagination',
          paginationClickable: true,
          mousewheelControl: true,
          observeParents: true,
        },
    };
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    tickGanme(item) {
      this.curItem = item;
      this.showModel = true;
    }
  },
  mounted() {
    queryRecommandGamesList({ gameType: 1 }).then(res => {
      if (res.success && res.data) {
        this.recommandData = [];
        for (let i = 0; i < res.data.length; i++) {
          this.recommandData.push({
            category: res.data[i].platform,
            code: res.data[i].code || "",
            eName: res.data[i].gameId,
            id: res.data[i].gameId,
            language: "",
            name: res.data[i].gameName,
            pic: res.data[i].picPath,
            subType: res.data[i].subType || "",
            state: 1,
            tag: []
          });
        }
      }
    });
  },
  activated() {},
  components: {
    modelGame
  }
};
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
.hot-game {
  @include f(28px);
  padding: r(20) r(30);
  background-color: $main-bg;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  margin-top: r(25);
  .section-tit {
    height: 25px;
    position: relative;
    h2 {
      @include f(32px);
      display: inline-block;
      font-weight: 500;
    }
    .icon-fire {
      color: #1e327e;
      margin-right: 0.21333rem;
      font-size: 23px;
      position: absolute;
      left: -3px;
      top: -4px;
    }
  }
  .game-box {
    position: relative;
    overflow: hidden;
    height: r(300);
  }
  .game-list {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    overflow: hidden;
    overflow-x: auto;
    position: absolute;
    left: 0;
    transition: all 1s;
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
  .item-title {
    color: #333;
    width: 100%;
    text-align: center;
    margin: r(15) 0;
  }
}
</style>
