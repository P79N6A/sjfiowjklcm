<template>
  <div class="dataList">
    <div class="gameItem" v-for="item in fliterGames" :key="item.id+item.name" :class="[{city761:cur == 'City761'},{kyqp:cur == 'KYQP'}]" @click="play(item,$event)">
      <img v-lazy="getImg(item,'PC')" alt="">
      <p class="name">{{item.name}}</p>
      <a href="javascript:void(0);" class="btn">立即游戏</a>
    </div>
  </div>
</template>
<script>
  import {chessGames} from '@/controls/games/chessGames'
  export default {
    mixins: [chessGames],
    data() {
      return {
        
      }
    },
    methods: {
      
    },
    computed: {
    },
    created() {
      this.getGames('pc')
    },
    watch: {

    }
  }

</script>
<style lang="scss" scoped>
  .dataList {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .gameItem {
      width: 220px;
      // height: 250px;
      padding: 15px;
      margin-right: 10px;
      margin-bottom: 10px;
      background: #000;
      cursor: pointer;

      &:hover {
        .btn {
          border: 1px solid #e2b85a;
          color: #e2b85a;
        }
      }

      .name {
        color: #e2b85a;
        text-align: center;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        line-height: 1.2;
        margin: 10px auto;
      }

      .btn {
        width: 128px;
        height: 32px;
        border: 1px solid #fff;
        margin: 0 auto 10px;
        color: #fff;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        line-height: 1.7;
        display: block;
        text-align: center;
        cursor: pointer;
        background: transparent;
        border-radius: 20px;

      }
    }

    img {
      width: 100%;
    }


  }

</style>
