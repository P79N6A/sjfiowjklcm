<template>
  <transition name="fade">
    <div class="slotgame-filter" v-show="showFilter" @click.self="showFilter=false">
      <transition name="slideRight">
        <div class="filterbox">
          <div class="filter-btn" v-for="(mydata,i) in data" :key="i">
            <h3>{{mydata.title}}</h3>
            <ul class="filter_item_content cfx">
              <li v-for="(item,i) in mydata.data" :class="[{active:item.value==mydata.active},'filter_item']" :key="item.value">
                <a href="javascript:;" v-if="!item.href&&mydata.filter=='category'" @click="search(item,i,mydata)">
                  <span v-if="item.value != 'PT2TIGER'">{{item.value}}</span>
                  <span v-else>{{item.name.substring(0,item.name.length - 1)}}</span>
                </a>
                <a href="javascript:;" v-else-if="!item.href&&mydata.filter!='category'" @click="search(item,i,mydata)">{{item.name}}</a>
                <a v-else @click="open(item.href, item.name, 900, 640, true, islogin)">{{item.name}}</a>
              </li>
              <!-- <li class="filter_item" v-if="mydata.filter=='category'" @click="open(Games.href_bbslot_h5, 'BBIN老虎机', 900, 640, true)">
                <a>BBIN平台</a>
              </li> -->
            </ul>
            <div class="space_border_wrap">
              <div class="space_border"></div>
            </div>
          </div>
          <div class="buttonBox">
            <button class="reset" @click="reset">重置</button>
            <button class="done" @click="searching">完成</button>
          </div>          
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
  import {Games, platformData } from "@/assets/data"
  import vButton from "mobile/components/form/button"
  import openWindow from '@/util/openWindow'
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        Games,
        showFilter:false,
        data: {
          platform: {
            title: "游戏平台",
            filter: "category",
            active: "",
            data:platformData
          },
          line: {
            title: "赔付线数",
            filter: "line",
            active: "",
            data: [{
              name: "全部",
              value: ""
            }, {
              name: "全赔",
              value: "100-1024"
            }, {
              name: "1-15",
              value: "1-15"
            }, {
              name: "16-40",
              value: "16-140"
            }, {
              name: "41-100",
              value: "41-100"
            }, {
              name: "其它",
              value: "1025-2048"
            }]
          },
          type: {
            title: "游戏类型",
            filter: "tag",
            active: "",
            data: [{
                name: "全部",
                value: ""
              }, {
                name: "热门",
                value: "HOT"
              }, {
                name: "最新",
                value: "NEW"
              }, {
                name: "经典",
                value: "CLA"
              }, {
                name: "彩金池",
                value: "AMA"
              }, {
                name: "多旋转",
                value: "CIR"
              },
              {
                name: "消消乐游戏",
                value: "ETL"
              }
            ]
          },
        }
      }
    },
    methods: {
      open(url, title, w, h, needLogin) {
        if (needLogin) {
          if (!this.islogin) {
            window.toast("请先登录!");
            return;
          }
        }
        openWindow(url, title, w, h);
      },
      search(item, i, filter) {
        if (filter.active == item.value) return;
        filter.active = item.value;
        this.$bus.$emit('serachGame', filter.filter, item.value);
        this.$bus.$emit('searchPlatform',item.value)
      },
      open(url, title, w, h, needLogin, loginState) {
        openWindow(url, title, w, h, needLogin, loginState)
      },
      searching() {
        this.showFilter=false
      },
      reset(){
        this.$bus.$emit('serachGame', "tag", "");
        this.$bus.$emit('serachGame', "line", "");
        this.data.line.active = '';
        this.data.type.active = '';
      }
    },
    computed: {
      ...mapGetters(["islogin"])
    },
    created() {
      //默认选中PT
      // this.data.platform.active = 'PT2TIGER';
      // if (this.$route.params.type) {
      //    this.data.platform.active = this.$route.params.type;
      // }
      this.$bus.$on('showFilter',EventData=>{
        this.showFilter=!this.showFilter
      })
      //免费试玩跳转默认选中
      if(this.$route.params.plat){
        this.data.platform.active = this.$route.params.plat
      }
      //点击平台 和筛选同步
      this.$bus.$on('searchPlatform',EventData=>{
        this.data.platform.active=EventData
      })
    },
    components: {
      vButton
    },
  };

</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";

  .slotgame-filter {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    .filterbox {
      @include f(28px);
      transition: transform 0.5s;
      position: absolute;
      top: 0;
      right: 0;
      text-align: left;
      height: 100%;
      width: 80%;
      color: #ffffff;
      background: url(./images/comm-bg.png) no-repeat center/100% 100%;
      padding-top: r(30);
    }
    .filter-btn {
      @include f(28px);
      white-space: nowrap;
      span{
        vertical-align: middle;
        margin-right: r(16);
      }
      .iconfont{
        @include f(22px);
      }
    }
    h3 {
      padding-left:r(30);
      @include f(30px);
      line-height: 1.3;
      color:  #fff;
      font-weight: normal;
      margin-bottom: r(10);
      // &:before {
      //   content: "";
      //   display: inline-block;
      //   width: r(6);
      //   height: r(26);
      //   background: $iconcl;
      //   margin-right: r(15);
      //   vertical-align: top;
      // }
    }
    .filter_item_content {
      padding: r(10);
    }
    .filter_item_content .filter_item {
      float: left;
      margin: 0 0 r(20) 0;
      padding: 0 r(14);
      width: 33.33%;
      box-sizing: border-box;
      height: r(60);
      line-height: r(60);
    }
    .filter_item_content .filter_item a {
      display: block; 
      background: rgba(0,0,0,.1);
      text-align: center;
      color:#fff;
      @include f(30px);
      border-radius: r(8);
    }
    .filter_item_content .filter_item a:active,
    .filter_item_content .filter_item.active a {
      background:#4db7f4;
      color:#ffffff;
    }

    .space_border {
      margin-bottom: r(20);
      height: 1px;
      width: 100%;
      background:rgba(0,0,0,.1);
    }
    .buttonBox {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      button {
        flex: 1;
        @include f(30px);
        padding: r(20);
        &.done {
          background: #ff3e3e
        }
        &.reset {
          background: rgba(0,0,0,0.20);
        }
      }
    }
  }

</style>
