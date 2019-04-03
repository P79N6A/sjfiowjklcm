<template>
  <div class="game_group inblock">
    <div>
      <!-- 老虎机游戏 -->
      <div class="slot_game hoverItem">
        <div class="group_content">
          <ul class="item_list inblock_fix">
            <li class="item inblock">
              <div>
                <div class="radius_btn f16">PT国际</div>
                <div class="f16">PT国际版</div>
              </div>
              <router-link :to="{name:'gameIndex',params:{type:'PT2TIGER'}}">
                <span class="link-spanner"></span>
              </router-link>
            </li>
            <li class="item inblock">
              <div>
                <div class="radius_btn">DT</div>
                <div>DT老虎机</div>
              </div>
              <router-link :to="{name:'gameIndex',params:{type:'DT'}}">
                <span class="link-spanner"></span>
              </router-link>
            </li>
            <li class="item inblock">
              <div>
                <div class="radius_btn">MG</div>
                <div>MG老虎机</div>
              </div>
              <router-link :to="{name:'gameIndex',params:{type:'MG'}}">
                <span class="link-spanner"></span>
              </router-link>
            </li>
            <li class="item inblock">
              <div>
                <div class="radius_btn">PNG</div>
                <div>PNG老虎机</div>
              </div>
              <router-link :to="{name:'gameIndex',params:{type:'PNG'}}">
                <span class="link-spanner"></span>
              </router-link>
            </li>
            <li class="item inblock">
              <div>
                <div class="radius_btn">NT</div>
                <div>NT老虎机</div>
              </div>
              <router-link :to="{name:'gameIndex',params:{type:'NT'}}">
                <span class="link-spanner"></span>
              </router-link>
            </li>
            <li class="item inblock">
              <div>
                <div class="radius_btn">PG</div>
                <div>PG老虎机</div>
              </div>
              <router-link :to="{name:'gameIndex',params:{type:'PG'}}">
                <span class="link-spanner"></span>
              </router-link>
            </li>
            <li class="item inblock">
              <div>
                <div class="radius_btn">CQ9</div>
                <div>CQ9老虎机</div>
              </div>
              <router-link :to="{name:'gameIndex',params:{type:'CQ9'}}">
                <span class="link-spanner"></span>
              </router-link>
            </li>
            <li class="item inblock">
              <div>
                <div class="radius_btn">SW</div>
                <div>SW老虎机</div>
              </div>
              <router-link :to="{name:'gameIndex',params:{type:'SW'}}">
                <span class="link-spanner"></span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="clear">
      <!-- 真人娱乐 -->
      <div class="live_casino hoverItem fl">
        <div class="group_content">
          <ul class="item_list inblock_fix">
            <li class="item inblock">
              <div>
                <div class="radius_btn">AG</div>
                <div>AG真人</div>
              </div>

              <a href="javascript:void(0);" @click="open(Games.href_ag,'AG真人', 900, 640, true, islogin)">


                <span class="link-spanner"></span>
              </a>
            </li>
            <li class="item inblock">
              <div>
                <div class="radius_btn">OG</div>
                <div>OG真人</div>
              </div>

              <a href="javascript:void(0);" @click="open(Games.href_og,'OG真人', 900, 640, true, islogin)">


                <span class="link-spanner"></span>
              </a>

            </li>
            <li class="item inblock">
              <div>
                <div class="radius_btn SUNBET">SUNBET</div>
                <div>申博真人</div>
              </div>
              <a href="javascript:void(0);" @click="open(Games.href_sunbet,'申博真人', 900, 640, true, islogin)">
                <span class="link-spanner"></span>
              </a>
            </li>
            <li class="item inblock">
              <div>
                <div class="radius_btn">BBIN</div>
                <div>BBIN真人</div>
              </div>

              <a href="javascript:void(0);" @click="open(Games.href_bbin,'BBIN真人', 900, 640, true, islogin)">


                <span class="link-spanner"></span>
              </a>
            </li>

          </ul>
        </div>
      </div>
      <!-- 体育赛事 -->
      <div class="sports_events hoverItem fl">
        <div id="group_content" class="group_content">
          <div class="sports_in">
            <router-link :to="{name:'sport'}" target="_blank">进入游戏</router-link>
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- 捕鱼游戏 -->
      <div class="fishing_game hoverItem">
        <div class="group_content">
          <ul class="item_list inblock_fix">
            <li class="item fish-item inblock">
              <div>
                <div class="radius_btn">AG</div>
                <div>AG捕鱼</div>
              </div>

              <a href="javascript:void(0);" @click="open(Games.href_fish_ag,'AG捕鱼', 900, 640, true, islogin)" target="_blank">


                <span class="link-spanner"></span>
              </a>
            </li>
            <li class="item fish-item inblock">
              <div>
                <div class="radius_btn">MW</div>
                <div>MW捕鱼</div>
              </div>
              <a href="javascript:void(0);" @click="open(Games.href_fish_mw,'MW捕鱼', 900, 640, true, islogin)" target="_blank">
                <span class="link-spanner"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    Games
  } from "@/assets/data"
  import openWindow from '@/util/openWindow'
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        Games
      }
    },
    methods: {
      open(url, title, w, h, needLogin, loginState) {
        openWindow(url, title, w, h, needLogin, loginState)
      }
    },
    created() {

    },
    computed: {
      ...mapGetters(["islogin"])
    }
  }

</script>
<style lang="scss" scoped>
  .game_group {
    margin: 0 0 0 20px;

    a {
      width: 100%;
      height: 100%;
      display: block;
      text-align: center;
    }

    .hoverItem {
        &:hover {
          .group_content {
            transform: scale(1.1);
            &::before{
              display: block;
              content: "";
              height: 100%;
              width: 100%;
              position: absolute;
              top: 0;
              left: 0;
              background-color: rgba(0, 0, 0, 0.6);
              -webkit-transition: all .3s ease;
              -o-transition: all .3s ease;
              transition: all .3s ease;
            }
            &:hover{
              background-color: rgba(0, 0, 0, 0.6);
            }
          }

          .item_list {
            display: block!important;
          }

          .sports_in {
            display: block;
          }
      }

      .group_content {
        height: 100%;
        width: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        -webkit-transition: all .3s ease;
        -o-transition: all .3s ease;
        transition: all .3s ease;

        .radius_btn {
          width: 64px;
          height: 64px;
          border-radius: 99em;
          border: 1px solid #fff;
          font-size: 18px;
          line-height: 64px;
          text-align: center;
          margin-bottom: 10px;
          transition: all .5s ease;
          &.SUNBET{
            font-size: 13px;
          }
        }

        .item_list {
          display: none;
          position: relative;
          text-align: center;

          .item {
            position: relative;
            padding-top: 50px;
            color: #fff;
            font-size: 14px;
          }

          .fish-item:not(:last-child) {
            margin-right: 64px;
          }
        }

        li:hover .radius_btn {
          background: #fd4747;
          border: 1px solid #fd4747;
          transform: rotate(360deg);
          transition: transform .5s ease;
        }
      }
    }

    .slot_game {
      width: 850px;
      height: 200px;
      margin-bottom: 20px;
      overflow: hidden;
      position: relative;

      li {
        margin: 0 13px;
      }

      .group_content {
        background-image: url(./images/slot_game.jpg);

      }
    }

    .live_casino {
      width: 559px;
      height: 180px;
      margin-right: 21px;
      overflow: hidden;
      position: relative;

      .group_content {
        background-image: url(./images/live_casino.jpg);
      }

      li {
        margin: 0 15px;
      }
    }

    .sports_events {
      width: 270px;
      height: 180px;
      overflow: hidden;
      position: relative;

      .group_content {
        background-image: url(./images/sports_events.jpg);
      }
    }

    .fishing_game {
      width: 850px;
      height: 180px;
      margin-top: 10px;
      overflow: hidden;
      position: relative;

      .group_content {
        background-image: url(./images/fishing_game.jpg);
      }
    }

    .sports_in {
      width: 140px;
      height: 40px;
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background: #fd4747;
      font-size: 16px;
      color: #fff;
      line-height: 40px;
    }
  }

  .inblock {
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
    letter-spacing: normal;
    zoom: 1;
  }

  .inblock_fix {
    letter-spacing: -4px;
    font-size: 0;
  }

  .link-spanner {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .clear {
    zoom: 1;

    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }

  .fl {
    float: left !important;
  }
  .f16 {
    font-size: 14px !important;
  }

</style>
