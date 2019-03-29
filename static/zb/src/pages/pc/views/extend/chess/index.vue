<template>
  <div class="chess">
    <div class="container">
      <div class="chess-game">
        <el-carousel :interval="3000" type="card" height="450px">
          <el-carousel-item v-for="(item,i) in carousel" :key="i">
            <div class="oneItem">
              <img id="animationImg" class="img-rightItem" src="./images/chessImg1.png">
              <div class="right-Item">
                <span style="font-size:26px;color:white">{{item.name}}</span>
                <br>
                <hr class="hr-Item" style="margin:0 auto;">
                <span class="text1">{{item.desc}}</span>
                <br>
                <br>
                <a
                  :href="item.href"
                  @click="checkLogin($event)"
                  class="go-game-btn"
                  target="_blank"
                >开始游戏</a>
                <br>
                <br>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>
<script>
import { Games } from "@/assets/data";
import openWindow from "@/util/openWindow";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      Games,
      carousel: [
        {
          name: "开元棋牌",
          desc: "创新玩法 , 新鲜不断",
          href: Games.href_kyqp
        },
        {
          name: "761棋牌",
          desc: "相当丰富的棋牌模式",
          href: Games.href_city761
        },
        {
          name: "MW棋牌",
          desc: "随时随地开房，画面精美",
          href: Games.href_mw
        },
        {
          name: "BY棋牌",
          desc: "超多游戏任你挑选",
          href: Games.href_by
        }
      ]
    };
  },
  props: {},
  methods: {
    checkLogin(e) {
      if (!this.$store.getters.islogin) {
        e.preventDefault();
        window.toast("请先登录",'warning');
        this.$store.commit("SHOW_LOGIN", true);
        return false;
      }
    },
    open(url, title, w, h, needLogin, loginState) {
      openWindow(url, title, w, h, needLogin, loginState);
    }
  },
  computed: {
    ...mapGetters(["islogin"])
  },
  created() {},
  components: {}
};
</script>
<style lang="scss">
.chess {
  width: 100%;
  height: 937px;
  background: linear-gradient(
    339deg,
    #313de1,
    #2b9cd8,
    #354ee8,
    #2b9dd9,
    #313de1,
    #2b9cd8,
    #354ee8,
    #2b9dd9,
    #313de1,
    #2b9cd8,
    #354ee8,
    #2b9dd9
  );
  background-size: 800% 800%;
  overflow: hidden;
  -webkit-animation: ocean-wave 15s ease infinite;
  animation: ocean-wave 15s ease infinite;
  .chess-game {
    position: absolute;
    margin: 160px 0 0;
    width: 1100px;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    .oneItem {
      position: relative;
      text-align: center;
    }
    .hr-Item {
      color: #fff;
      width: 85px;
      height: 2px;
      background-color: #fff;
      margin: 0;
    }
    .text1 {
      font-size: 14px;
      color: white;
      margin-top: 10px;
      display: inline-block;
    }
    .oneItem:hover #animationImg {
      -webkit-animation-name: bounce;
      animation-name: bounce;
      -webkit-animation-duration: 1s;
      animation-duration: 1s;
      -vendor-animation-iteration-count: 2;
      -webkit-animation-iteration-count: 2;
      animation-iteration-count: 2;
    }
    .right-Item {
      position: absolute;
      left: 50%;
      top: 100px;
      transform: translateX(-50%);
      text-align: center;
    }
  }
  .go-game-btn {
    text-align: center;
    line-height: 36px;
    display: inline-block;
    width: 155px;
    padding: 0 3rem;
    cursor: pointer;
    border: none;
    color: #59f;
    // background: url(./images/btn.png) no-repeat;
    background: #fff;
    border-radius: 5px;
  }
  .el-carousel__mask {
    display: none !important;
  }
}
@-webkit-keyframes ocean-wave {
  0% {
    background-position: 0 55%;
  }
  50% {
    background-position: 100% 46%;
  }
  to {
    background-position: 0 55%;
  }
}
@keyframes ocean-wave {
  0% {
    background-position: 0 55%;
  }
  50% {
    background-position: 100% 46%;
  }
  to {
    background-position: 0 55%;
  }
}
</style>
