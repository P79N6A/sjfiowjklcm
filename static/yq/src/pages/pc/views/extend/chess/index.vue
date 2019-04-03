<template>
  <div class="chess-container">
    <div class="chess-content">
        <div class="chess-game">
            <div class="chess-game-item">
                <img src="./images/img_761.png" alt="">
                <div class="chess-mask">
                    <a class="chess-btn" @click="open(Games.href_city761, '761棋牌', 900, 640, true, islogin)">进入游戏</a>
                </div>
            </div>
            <div class="chess-game-item">
                <img src="./images/img_kayuan.png" alt="">
                <div class="chess-mask">
                    <a class="chess-btn" @click="open(Games.href_kyqp, '开元棋牌', 900, 640, true, islogin)">进入游戏</a>
                </div>
            </div>
            <div class="chess-game-item">
                <img src="./images/img_mw.png" alt="">
                <div class="chess-mask">
                    <!-- <a class="chess-btn" @click="open('', '大满贯棋牌', 900, 640, true, islogin)">进入游戏</a> -->
                    <router-link class="chess-btn" :to="{name:'chessHall',params:{type:'MWQP'}}">进入游戏</router-link>
                </div>
            </div>
        </div>     
    </div>
  </div>
</template>
<script>
  import { Games } from "@/assets/data"
  import openWindow from '@/util/openWindow'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        Games
      };
    },
    props: {},
    methods: {
      open(url, title, w, h, needLogin, loginState){
        openWindow(url, title, w, h, needLogin, loginState)
      }
    },
    computed: {
      ...mapGetters(["islogin"])
    },
    created() {
    },
    components: {}
  };
</script>
<style lang="scss" scoped>
.chess-container{
  background: #000 url(./images/img_bj.jpg) no-repeat center top;
  min-height: 1045px;
  .chess-content{
    width: 1200px;
    margin: 0 auto;
    padding: 570px 0 30px;
    .chess-game {
        display:flex;
        justify-content: space-around;
        .chess-game-item{
            position: relative;
            border: 2px solid #fceb8e;
            box-sizing:content-box;
            overflow: hidden;
            &:hover {
                .chess-mask{
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
            .chess-mask {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 0;
                background-color: rgba($color: #000000, $alpha: .5);
                text-align: center;
                transition: all .5s;
                .chess-btn {
                    display:inline-block;
                    width: 162px;
                    height: 58px;
                    line-height: 58px;
                    font-size: 28px;
                    margin-top: 16px;
                    cursor: pointer;
                    background: url(./images/img_btn.png);
                    &:active {
                        background: url(./images/img_btn2.png);
                    }
                }
            }
        }
    }
    
  }
}
</style>