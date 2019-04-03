<template>
  <div class="slots">
    <annunciate></annunciate>
    <div class="wp wp1">
      <div class="main_content">
        <div class="top_info">
          <jackpot></jackpot>
          <winningList></winningList>
        </div>
        <platform></platform>
        <filterInput></filterInput>
      </div>
      <dataList></dataList>
    </div>
  </div>
</template>
<script>
  import winningList from './components/winning-list'
  import annunciate from 'pc/components/annunciate'
  import filterInput from "./components/filter-input"
  import dataList from "./components/games"
  import banner from "./components/banner"
  import jackpot from "./components/jackpot"
  import platform from "./components/platform"
  import {
    getAllGames
  } from "@/api/show"
  import {
    queryGameStatus
  } from "@/api/user"
  export default {
    data() {
      return {
        showloadding: false, //加载中... 相反的 false=显示
        showNoData: false, //是否显示空数据
        allGames: [], //所有的数据
        fillterData: [], //过滤后 的数据
        filter: { //过滤条件
          category: '', //老虎机平台类型
          type: '', //老虎机类型 :经典,电动吃角子
          line: '', // 老虎机线性类型
          subType: '', // 第二种类型类型
          tag: '' //热门 最新等
        },
        statusData: []
      };
    },
    components: {
      winningList,
      dataList,
      banner,
      filterInput,
      annunciate,
      jackpot,
      platform
    },
    methods: {

    },
    watch: {
      'this.$route'(val){
      }
    },
    computed: {

    },
    created() {
    },
  };

</script>
<style lang='scss' scoped>
  .slots {
    position: relative;
    padding: 200px 0 20px;
    background: #f3f2ef url(./images/slotGame_bg.jpg) no-repeat center top;
    .wp {
        width: 1200px;
        margin: 0 auto;
        .main_content {
            margin: 0 auto;
            padding: 20px;
            background: #fff;
            text-align: center;
            color: #787876;
            .top_info {
                height: 164px;
                position: relative;
                margin-bottom: 20px;
            }
        }
    }
    .wp1 {
        background: #fff;
    }
  }

</style>
