<template>
  <div class="platform">
    <!-- <div class="logo" :class="{active:cur == item.value}" @click="choosePlatform(item.value)" v-for="item in chessData" :key="item.value">
            <img :src="getImg(item.value)" alt="" v-if="cur != item.value">
            <img :src="getImg1(item.value)" alt="" v-else>
    </div>-->
    <div
      class="logo"
      :class="[{active:cur == item.value},item.value]"
      @click="choosePlatform(item.value)"
      v-for="item in filterChessData"
      :key="item.value"
    >
      <span class="text">{{item.name}}</span>
      <!-- <i class="tuijian" v-if="item.value == 'KYQP'">推</i> -->
    </div>
    <div class="logo">
      <a class="text" @click="open(Games.href_by, 'BY棋牌', 900, 640, true, islogin);" target="_blank">BY棋牌</a>
    </div>
    {{cur}}
  </div>
</template>
<script>
import { chessData, Games } from "@/assets/data/index";
import openWindow from "@/util/openWindow";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      chessData,
      Games,
      // chessData:[{name:'大满贯棋牌',value:'MWQP'}],
      cur: "City761"
    };
  },
  computed:{
    ...mapGetters(["islogin"]),
    filterChessData(){
      return this.chessData.filter((item)=>{
        return item.value != "BY"
      })
    }
  },
  methods: {
    getImg(val) {
      return require(`./images/${val}.png`);
    },
    getImg1(val) {
      return require(`./images/${val}_active.png`);
    },
    choosePlatform(val) {
      // this.$bus.$emit('selectChessPlatform',val)
      this.$router.push({ name: "chessHall", params: { type: val } });
      this.cur = val.toUpperCase();
    },
    open(url, title, w, h, needLogin, loginState){
      openWindow(url, title, w, h, needLogin, loginState)
    }
  },
  watch: {
    "$route.params.type"(val) {
      if(val){
        this.cur = val;
      }
    }
  },
  created(){
    this.$router.push({ name: "chessHall", params: { type: 'City761' } });
  }
};
</script>
<style lang="scss" scoped>
.platform {
  width: 100%;
  background: #110b06;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 20px;
  .logo {
    margin-right: 15px;
    padding: 10px 20px;
    cursor: pointer;
    width: 240px;
    height: 60px;
    color: #fff;
    background-color: #3eb2f2;
    border-radius: 4px;
    font-size: 28px;
    border-width: 1px;
    border-style: solid;
    text-align: center;
    font-weight: bold;
    font-style: normal;
    opacity: 1;
    position: relative;
    &.active {
      background-color:#fff;
      color: #3eb2f2;
    }
    .tuijian {
      width: 38px;
      height: 38px;
      right: 10px;
      top: 10px;
      z-index: 12;
      color: #fff;
      background-color: #e51c23;
      font-size: 18px;
      padding: 0px;
      border-width: 1px;
      border-style: solid;
      text-align: center;
      line-height: 26px;
      font-weight: bold;
      font-style: normal;
      opacity: 1;
      position: absolute;
      display: block;
      border-radius: 50%;
      line-height: 38px;
    }
  }
}
</style>
