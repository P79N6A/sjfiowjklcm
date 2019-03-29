<template>
  <div class="fliter-input">
    <div class="input-box">
      <input v-model="inputVal" type="text" placeholder="查找游戏">
      <div class="filter-btn1" @click="showbox()">
        <span>筛选</span>
        <i class="iconfont icon-arrow_d"></i>
      </div>
    </div>
    <div class="platformLinks">
      <div class="item" v-for="item in platformData" :class="{active:plt == item.value}" :key="item.value" @click="searchPlt(item)">
        {{item.title}}
      </div>
    </div>
    <div class="jack-box">
      <jackpot></jackpot>
      <win-list></win-list>
    </div>
  </div>
</template>
<script>
 import jackpot from "./jackpot"
  import winList from "./winning-list"
  import vFilter from "./filter"
  import {platformData} from '@/assets/data'
import openWindow from "@/util/openWindow";
import { mapGetters } from "vuex";
  export default {
    data() {
      return {
        inputVal: '',
        inputData: [],
        showList:false,
        platformData,
        plt:null
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
      }
    },
    props: {
      value: String
    },
    created(){
      // this.getChoosen
    },
    watch: {
      inputVal(val) {
        this.$bus.$emit('searchByInput',this.inputVal);
      }
    },
    computed: {
      ...mapGetters(["islogin"])
    },
    components:{vFilter,jackpot,winList}
  }
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";

  .fliter-input {
    @include  f(28px);
    align-items: center;
    .jack-box{
      position: fixed;
      top: 5rem;
      z-index: 13;
      padding: 0 2%;
      width: 100%;
    }
    .platformLinks{
      display: flex;
      padding: r(10);
      justify-content: flex-start;
      flex-wrap: wrap;
      .item{
        color: #f4faff;
        border-bottom: 1px solid transparent;
        margin-right: r(50);
        line-height: 2;
        &.active{
          border-bottom: 1px solid #ff4e46;
          color: #ff4e46;
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
      border-radius: r(40);
      background: $body-bg;
      color: #f4faff;
    }
    .filter-btn1{
      // position: relative;
      float:right;
      // border-left: 1px solid #ccc;
      height: r(45);
      line-height: r(45);
      margin-right: r(7.5);
      color: $iconcl;
      span{
        vertical-align: middle;
        margin-right: r(16);
      }
      .iconfont{
        @include f(22px);
      }
      flex: 1;
      padding-left:r(30);
      @include f(30px);
      white-space: nowrap;
    }
  }

</style>
