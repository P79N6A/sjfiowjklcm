<template>
  <div class="fliter-input">
    <div class="filter-type">
      <div class="type-btn" :class="{active:tagSelect==''}" @click="moreSearch('','','');" v-if="!islogin">试玩游戏</div>
      <div class="type-btn" :class="{active:tagSelect=='NEW'}" @click="moreSearch('tag','NEW','NEW');" v-if="!islogin">最新游戏</div>
      <div class="type-btn" :class="{active:tagSelect=='fav'}" @click="moreSearch('fav','yes','fav');" v-if="islogin">我的收藏</div>
      <div class="type-btn" :class="{active:tagSelect=='his'}" @click="moreSearch('his','yes','his');" v-if="islogin">最近玩过</div>
      <div class="type-btn" :class="{active:tagSelect=='HOT'}" @click="moreSearch('tag','HOT','HOT');">热门游戏</div>
      <div class="type-btn" :class="{active:tagSelect=='AMA'}" @click="moreSearch('tag','AMA','AMA');">彩金池</div>
    </div>
    <div class="input-box">
      <input v-model="inputVal" type="text" placeholder="查找游戏">
      <div class="filter-btn1" @click="showbox()">
        <span>筛选</span>
        <i class="iconfont icon-shaixuan"></i>
      </div>
    </div>
    <div class="platformLinks">
      <div class="item" v-for="item in platformData" :class="{active:plt == item.value}" :key="item.value" @click="searchPlt(item)">
        <img class="hotImg" :class="{pt2:item.value == 'PT2TIGER'}" src="./images/hot.png" v-if="item.value == 'PT' || item.value == 'DT' || item.value == 'PT2TIGER'">
        <span v-if="item.value != 'PT2TIGER'">{{item.value == 'AMEBA'?'AE':item.value}}</span>
        <span v-else>{{item.name.substring(0,item.name.length - 1)}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
  import vFilter from "./filter"
  import {platformData} from '@/assets/data'
  export default {
    data() {
      return {
        inputVal: '',
        inputData: [],
        showList:false,
        platformData,
        plt:null,
        tagSelect:null,
      }
    },
    methods: {
      showbox(){
        this.$bus.$emit('showFilter');
      },
      searchPlt(item){
        this.$bus.$emit('serachGame', 'category', item.value);
        this.$bus.$emit('searchPlatform',item.value);
        this.plt = item.value;
      },
      moreSearch(key,value,type){
        this.$bus.$emit('serachInit');
        this.$bus.$emit('serachGame', key, value);
        this.tagSelect=type;
        this.plt = '';
        this.$bus.$emit('searchPlatform','');
      }
    },
    props: {
      value: String
    },
    created(){
      // this.getChoosen
      this.$bus.$on('searchPlatform',eventData => {
        this.plt = eventData;
      })
      //免费试玩跳转默认选中
      if(this.$route.params.plat){
        this.plt  = this.$route.params.plat
      }
    },
    watch: {
      inputVal(val) {
        this.$bus.$emit('searchByInput',this.inputVal);
      }
    },
    computed: {
      ...mapGetters(["islogin"])
    },
    components:{vFilter},  
  }
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";

  .fliter-input {
    @include  f(28px);
    align-items: center;
    .filter-type {
      display: flex;
      justify-content: flex-start;
      padding: r(15) 0;
      .type-btn {
        width: 25%;
        text-align: center;
        border-radius: r(30);
        line-height: 2;
        &.active {
          background: #ff5544;
          color: #fff;
          border-radius: r(30);
        }
      }
    }
    .platformLinks{
      display: flex;
      padding: r(20) r(10) r(10);
      justify-content: flex-start;
      flex-wrap: wrap;
      .item{
        color: #333;
        border-bottom: 1px solid transparent;
        // margin-right: r(20);
        line-height: 2;
        @include  f(32px);
        width: 20%;
        text-align: center;
        position: relative;
        &.active{
          border-bottom: 1px solid #ff4e46;
          color: #ff4e46;
        }
        .hotImg {
          position: absolute;
          right: 0;
          top: r(-10);
          &.pt2 {
            right: r(-20);
          }
        }
      }
    }
    .input-box{
      position: relative;
      flex: 6;
      height:r(66);
      display: flex;
      align-items: center;
    }
    input {
      margin: 0;
      padding: 0 0 0 r(20);
      vertical-align: top;
      width: 78%;
      height:100%;
      border: 1px solid #c8c8c8;
      border-radius: r(8);
      color: #999;
    }
    .filter-btn1{
      // position: relative;
      float:right;
      // border-left: 1px solid #ccc;
      height: r(45);
      line-height: r(45);
      margin-right: r(7.5);
      span{
        vertical-align: middle;
      }
      .iconfont{
        @include f(36px);
        color: #4db7f4;
      }
      flex: 1;
      padding-left:r(30);
      @include f(30px);
      white-space: nowrap;
    }
  }

</style>
