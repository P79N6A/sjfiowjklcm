<template>
  <div class="platform">
    <ul id="j-gameMenu" class="tab-menu clear">
      <li v-for="item in platformData" :key="item.value">
        <router-link :to="{name:'gameIndex',params:{type:item.value}}">
          <h3 class="bg-pt_icon" v-if="item.value == 'PT' ">PT</h3>
          <h3 class="bg-pt_icon2" v-else-if="item.value == 'PT2TIGER'">PT国际</h3>
          <i class="bg_icon" :class="item.value" v-else></i>
          {{item.name}}
          <img src="./images/hot.png" class="hot-icon1" alt="" v-if="item.value == 'PT' || item.value == 'MG' || item.value == 'DT'|| item.value == 'PT2TIGER'">
        </router-link>
      </li>
    </ul>
  </div>

</template>
<script>
  import {
    Games
  } from "@/assets/data";
  import {
    platformData
  } from "@/assets/data/index"
  import openWindow from "@/util/openWindow";
  export default {
    data() {
      return {
        Games,
        active: "PT2TIGER",
        platformData,
        inputVal: '',
        platformData1: [],
        gameMinIndex: 0,
        gameMaxIndex: 5,
        gamelen: "",
      }
    },
    methods: {
      chooseType(item) {
        // PT特殊处理
        if (item.value == 'PT2TIGER') {
          this.active = 'PT2TIGER'
          this.$bus.$emit('serachGame', 'category', 'PT');
        } else {
          this.active = item.value
          this.$bus.$emit('serachGame', 'category', item.value);
        }

      },
      open(url, title, w, h, needLogin) {
        if (needLogin) {
          if (!this.islogin) {
            window.toast("请先登录!");
            return;
          }
        }
        openWindow(url, title, w, h);
      }
    },
    created() {

    },
  }

</script>
<style lang="scss" scoped>
  .tab-menu {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    li {
      box-sizing: border-box;
      width: 8.3%;
      height: 90px;
      float: left;
      border-top: 1px solid #c1c1c1;
      border-right: 1px dashed #c1c1c1;
      box-shadow: 0 6px 3px -3px #eaeaea;
      flex: 1;

      a{
        &:hover,
      &.active {
        background: #4db7f4;
        color: #fff;

        .bg-pt_icon {
          font-size: 48px;
          line-height: 56px;
        }
        .bg-pt_icon2 {
          font-size: 24px;
          line-height: 56px;
          font-weight: normal;
        }

        .DT {
          width: 53px;
          height: 40px;
          background: url(./images/slot_sprites7.png) -97px -10px;
        }

        .MG {
          width: 38px;
          height: 38px;
          background: url(./images/slot_sprites7.png) -170px -68px;
        }

        .PNG {
          width: 38px;
          height: 38px;
          background: url(./images/slot_sprites7.png) -68px -126px;
        }

        .CQ9 {
          width: 100%;
          height: 37px;
          background: url(./images/cq9-a.png) no-repeat center;
          background-size: 75%;
        }

        .QT {
          width: 38px;
          height: 39px;
          background: url(./images/slot_sprites7.png) -10px -126px;
        }

        .NT {
          width: 46px;
          height: 38px;
          background: url(./images/slot_sprites7.png) -170px -10px;
        }

        .RTG {
          width: 100%;
          height: 37px;
          background: url(./images/rtg-a.png) no-repeat center;
          background-size: 30%;
        }

        .TGP {
          width: 100%;
          height: 37px;
          background: url(./images/tgp-a.png) no-repeat center;
          background-size: 62%;
        }

        .SW {
          width: 100%;
          height: 37px;
          background: url(./images/skywind.png) no-repeat center;
          background-size: 38%;
        }

        .PG {
          width: 84%;
          height: 37px;
          background: url(./images/slot_sprites7.png)  370px -70px;
        }
        .JDBSLOT {
          width: 100%;
          height: 37px;
          background: url(./images/jdb-a.png) no-repeat center;
          background-size: 65%;
        }
        .AMEBA {
          width: 90%;
          height: 37px;
          background: url(./images/slot_sprites51.png)  -367px -229px;
        }
      }
      }

      &:first-child {
        border-left: 1px dashed #c1c1c1;
      }

      a {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;

        i {
          margin: 12px auto 5px;
          display: block;
        }

      }

      .bg-pt_icon {
        font-size: 48px;
        line-height: 56px;
      }
      .bg-pt_icon2 {
        font-size: 24px;
        line-height: 56px;
        font-weight: normal;
      }

      .DT {
        width: 53px;
        height: 40px;
        background: url(./images/slot_sprites51.png) -97px -10px;
      }

      .MG {
        width: 38px;
        height: 38px;
        background: url(./images/slot_sprites51.png) -68px -126px;
      }

      .PNG {
        width: 38px;
        height: 38px;
        background: url(./images/slot_sprites51.png) -126px -126px;
      }

      .CQ9 {
        width: 100%;
        height: 37px;
        background: url(./images/cq9.png) no-repeat center;
        background-size: 75%;
      }

      .QT {
        width: 38px;
        height: 39px;
        background: url(./images/slot_sprites51.png) -10px -126px;
      }

      .NT {
        width: 46px;
        height: 38px;
        background: url(./images/slot_sprites51.png) -170px -68px;
      }

      .RTG {
        width: 100%;
        height: 37px;
        background: url(./images/rtg.png) no-repeat center;
        background-size: 30%;
      }

      .TGP {
        width: 100%;
        height: 37px;
        background: url(./images/tgp.png) no-repeat center;
        background-size: 62%;
      }

      .SW {
        width: 100%;
        height: 37px;
        background: url(./images/skywind-a.png) no-repeat center;
        background-size: 38%;
      }

      .PG {
        width: 84%;
        height: 37px;
        background: url(./images/slot_sprites51.png) -6px -230px;
      }
      .JDBSLOT {
        width: 100%;
        height: 37px;
        background: url(./images/jdb.png) no-repeat center;
        background-size: 65%;
      }
      .AMEBA {
        width: 90%;
        height: 37px;
        background: url(./images/slot_sprites51.png) -77px -502px;
      }
    }
  }

  .clear {
    zoom: 1;
    clear: none !important;

    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }

  .hot-icon1 {
    position: absolute;
    right: 0;
    top: 0;
  }

</style>
