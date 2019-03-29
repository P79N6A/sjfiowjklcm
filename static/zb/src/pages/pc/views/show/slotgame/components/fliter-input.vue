<template>
  <div class="fliter-input">
    <span class="iconfont icon-sousuo"></span>
    <span class="search-title">搜索游戏：</span>
    <input  v-model="inputVal" placeholder="请输入你想查询的游戏名" type="text">
    <button class="seachbtn">搜索</button>
    <button class="seachbtn">重置</button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        inputVal: '',
        inputData: [],
        showList:false,
      }
    },
    watch:{
      inputVal(val){
        this.search(val);
      }
    },
    methods: {
      search() {
        // if (this.inputVal == "") return;//没有数据不查询
        // 调用列表组件的查询事件
        this.$bus.$emit('searchByInput',this.inputVal);
      },
    }
  }
</script>
<style lang="scss" scoped>
  .fliter-input{
    img{
      display: inline-block;
      vertical-align: middle;
      margin-left: 10px;
    }
    input{
      outline: none;
      height: 30px;
      width: 288px;
      border: 1px solid #0181fa;
      background-color: #202020;
      padding-left: 12px;
      border-radius: 5px;
      margin: 0 10px;
    }
    .seachbtn{
      width: 67px;
      height: 30px;
      background-color: #0181fa;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
    }
    .search-title{
      color: #cf3d40;
      font: normal bold 15px "Microsoft yahei";
    }
    .iconfont{
      font-size: 33px;
      color: #cf3d40;
      vertical-align: middle;
    }
  }
  // .fliter-input {
  //   display: inline-block;
  //   padding: 0 20px;
  //   border-radius: 15px;
  //   background: #d7d7d7;
  //   font-size: 15px;
  //   color: #999999;
  //   width:220px;
  //   padding-right: 40px;
  //   position: relative;
  //   span {
  //     cursor: pointer;
  //     position: absolute;
  //     width: 40px;
  //     height: 30px;
  //     top: 0;
  //     right: 0;
  //     text-align: center;
  //     font-size: 25px;
  //   }
  //   input {
  //     display: block;
  //     width: 170px;
  //     background: transparent;
  //     outline: none;
  //     line-height: normal;
  //     height: 30px;

  //   }
  // }
</style>
