<template>
  <div class="recommand-game">
    <div class="cfx game-title">
      <ul class="game-menu fl">
        <li v-for="(item,i) in platformData1" :key="item.name + i" :class="{on:active==item.value}" @click="active=item.value">
          <p>{{item.name}}<br><span :class="`${item.value}`"></span></p>
        </li>
      </ul>
    </div>
    <div class="game-list game-content">
      <ul class="bd">
        <li v-for="(item,i) in filterData" :key="item.gameId">
          <a target="_blank" href="javascript:void(0);" @click="playGame(extend(item),$event)" class="game-in">
            <img :src="getImg({pic:item.picPath,category:item.platform})">
            <a href="" class="bg"></a>
            <p class="p1">
              <i></i>
              {{item.gameName}}
            </p>
          </a>
        </li>
      </ul>
    </div>
  </div>

</template>
<script>
  import {games} from "@/controls/games/game";
  import {queryRecommandGamesList } from "@/api/show"
  import {platformData} from "@/assets/data"

  export default {
    mixins: [games],
    data() {
      return {
        active: "PT",
        platformData,
        myData: [],
        platformData1:[]
      };
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
          subType:item.subType||'',
          "pic": item.picPath,
          "tag": []
        }
      }
    },
    computed: {
      filterData() {
        if (this.active == '')
          return this.mydata.slice(0, 6);
        return this.myData.filter(item => {
          return item.platform.indexOf(this.active)>-1;
        }).slice(0, 5)
      }
    },
    created() {
      queryRecommandGamesList({gameType: 0}).then(res => {
        if(res.success&&res.data)this.myData = res.data;
      });
      let arr = this.platformData
      this.platformData1 = arr.slice(0,5)
    },
    activated() {
    },
    components: {},
    watch:{
      platformData(arr){
        let $this = this
      }
    }
  }
</script>
<style lang="scss" spcoed>
.recommand-game{
  min-width: 1110px;
  background: #2b2a26;
  overflow: hidden;
  .game-title{
    margin: 0 auto;
    width: 1200px;
    overflow: hidden;
    li{
      height: 140px;
      width: 220px;
      font-size: 14px;
      cursor: pointer;
      float: left;
      color: #454545;
      text-align: center;
      p{
        margin-top: 30px;
      }
      span{
        width: 100%;
        height: 36px;
        -webkit-transition: all .3s;
        transition: all .3s;
        display: block;
        margin-bottom: 5px;
        margin-top: 18px;
      }
      .PT{
        background:url(./images/game-icon1.png) no-repeat center bottom;
      }
      .DT{
        background:url(./images/game-icon9.png) no-repeat center bottom;
      }
      .MG{
        background:url(./images/game-icon2.png) no-repeat center bottom;
      }
      .QT{
        background:url(./images/game-icon5.png) no-repeat center bottom;
      }
      .TTG{
        background:url(./images/game-icon6.png) no-repeat center bottom;
      }
      .PNG{
        background:url(./images/game-icon11.png) no-repeat center bottom;
      }
      .NT{
        background:url(./images/game-icon4.png) no-repeat center bottom;
      }
      .TGP{
        background:url(./images/game-icon8.png) no-repeat center bottom;
      }
      .CQ9{
        background:url(./images/game-icon10.png) no-repeat center bottom;
      }
    }
    .on{
      background: url(./images/bg001.png) no-repeat center top;
      background-size: 100%;
      color: #fff;
    }
  }
  .game-list {
    width: 100%;
    height: 262px;
    background: #e2b85a;
    .bd{
      width: 1200px;
      padding-top: 10px;
      margin: 0 auto;
    }
    li{
      float: left;
      width: 200px;
      margin-left: 12px;
      height: 240px;
      overflow: hidden;
      position: relative;
      img{
        width: 200px;
        height: 200px;
        display: block;
      }
      .bg{
        cursor: pointer;
        display: none;
        width: 200px;
        height: 200px;
        position: absolute;
        top: 0;
        left: 0;
        background: url(./images/vodeo.png) no-repeat center center rgba(0, 0, 0, 0.5);
      }
      .p1{
        color: #fff;
        line-height: 40px;
        font-size: 16px;
        position: absolute;
        height: 40px;
        text-align: center;
        background: #7d2124;
        bottom: 0;
        width: 100%;
        left: 0;
        span{
          display: inline-block;
          position: relative;
          left: -55px;
          width: 22px;
          height: 19px;
          vertical-align: middle;
          background: url(./images/icon03.png) center -19px;
        }
      }
    }
  }
}


</style>
