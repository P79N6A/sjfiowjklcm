<template>
  <div>
    <div class="free-bg">
      <img src="./images/index-info.png" alt class="info">
      <div class="content">
        <div class="gameItem" v-for="item in list" :key="item.name">
          <img :src="getimg(item.img)" alt class="leftimg">
          <div class="logoItem">
            <img :src="getimg(item.logo)" alt class="logo">
            <p class="des">{{item.des}}</p>
          </div>
          <button class="btn" @click="playGame(item)">免费试玩</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SETTING, Games } from "@/assets/data";

export default {
  data() {
    return {
      Games,
      SETTING,
      list: [
        {
          name: "AGreal",
          img: "agreal1",
          logo: "agreal",
          url: Games.href_ag_test,
          des: "真人娱乐，美女荷官"
        },
        {
          name: "AGfish",
          img: "agfish1",
          logo: "agfish",
          url: Games.href_fish_ag_test,
          des: "全民捕鱼，弹无虚发"
        },
        // {name:'PT',img:'pt1',logo:'PT',url:'',des:'业界领先，游戏种类多'},
        {
          name: "DT",
          img: "dt1",
          logo: "DT",
          url: "",
          des: "劲爆刺激，大奖不断"
        },
        {
          name: "MG",
          img: "mg1",
          logo: "MG",
          url: "",
          des: "优质画面，丰富奖金池"
        },
        {
          name: "QT",
          img: "qt1",
          logo: "qt",
          url: "",
          des: "奖池丰富，好运势不可挡"
        },
        {
          name: "NT",
          img: "nt1",
          logo: "nt",
          url: "",
          des: "顶尖画面，视觉享受"
        },
        {
          name: "PNG",
          img: "png1",
          logo: "PNG",
          url: "",
          des: "随时随地，自由畅玩"
        },
        {
          name: "RTG",
          img: "rtg1",
          logo: "rtg",
          url: "",
          des: "激情PK，让热血再次燃烧"
        }
      ]
    };
  },
  methods: {
    getimg(url) {
      return require(`./images/${url}.png`);
    },
    playGame(item) {
      if (item.url.length > 0) {
        if (this.islogin) {
          if (this.isAgent) {
            $alert("代理不能游戏！");
          } else {
            window.open(item.url);
          }
        } else {
          window.open(item.url);
        }
      } else {
        this.$router.push({
          name: "slotgame",
          params: { type: "slot", flag: true, plat: item.name }
        });
      }
    }
  },
  components: {}
};
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
.free-bg {
  width: 100%;
  min-height: calc(100vh - 1.06667rem - 1.33333rem);
  background: url(./images/free-bg.jpg);
  background-size: 100%;
  padding-top: r(10);
  .info {
    width: 32%;
    margin-left: r(90);
    z-index: 2;
  }
  .content {
    padding: r(30) r(20);
    background: #fff;
    margin: r(-20) r(30) r(20) r(30);
    border-radius: r(35);
    .gameItem {
      box-shadow: 0px 8px 27px 0px #cca3524f;
      background: #fff;
      border-radius: r(30);
      width: 100%;
      height: r(200);
      display: flex;
      margin-bottom: r(20);
      padding: r(10) r(15);
      align-items: center;
      .leftimg {
        width: r(170);
        height: r(170);
      }
      .logoItem {
        flex: 1;
        text-align: center;
        .logo {
          width: r(200);
          display: block;
          margin-bottom: r(20);
          margin: 0 auto r(20);
        }
        .des {
          font-family: "Adobe Heiti Std";
          color: #747474;
          -moz-transform: matrix(
            1.12316715542522,
            0,
            0,
            1.12389380530973,
            0,
            0
          );
          -webkit-transform: matrix(
            1.12316715542522,
            0,
            0,
            1.12389380530973,
            0,
            0
          );
          -ms-transform: matrix(1.12316715542522, 0, 0, 1.12389380530973, 0, 0);
          @include f(18px);
          font-weight: bold;
        }
      }
      .btn {
        background: #4db7f4;
        border-radius: r(25);
        width: r(135);
        height: r(50);
        color: #fff;
        font-family: "Adobe Heiti Std";
        -moz-transform: matrix(1.12316715542522, 0, 0, 1.12389380530973, 0, 0);
        -webkit-transform: matrix(
          1.12316715542522,
          0,
          0,
          1.12389380530973,
          0,
          0
        );
        -ms-transform: matrix(1.12316715542522, 0, 0, 1.12389380530973, 0, 0);
        @include f(24px);
        font-weight: bold;
      }
    }
  }
  .free-box-bg2 {
    height: r(80);
    margin: r(-60) r(30) r(20) r(30);
    border-bottom-left-radius: r(35);
    border-bottom-right-radius: r(35);
    background: #fff;
    opacity: 0.4;
    -webkit-box-shadow: 0px 5px 37px 0px #38b4f0b8;
    -moz-box-shadow: 0px 5px 37px 0px #38b4f0b8;
    box-shadow: 0px 5px 37px 0px #38b4f0b8;
  }
}
</style>
