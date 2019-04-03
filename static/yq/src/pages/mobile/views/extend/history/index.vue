<template>
  <div class="history-page">
    <div class="page-title">
      <div
        class="title-item"
        v-for="(item,i) in data"
        :key="i"
        :class="{active:curYear == item.year}"
        @click="curYear = item.year;index = i"
      >{{item.year}}</div>
    </div>
    <div class="history-content">
      <div class="history-item" v-for="(list,i) in data[index].list" :key="list.year + i" @click="itemClk(list,i)">
        <div class="imgbox">
          <img :src="list.pic">
        </div>
        <div class="title_wrap">
          <h2>{{list.time}}</h2>
          <p>{{list.title}}</p>
          <div class="icon_with_text">查看详情</div>         
        </div>

        <div class="info" :class="{show:list.id == showOne}">{{list.des}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getHistory } from "@/api/show";
import { Download } from "@/assets/data";

export default {
  data() {
    return {
      data: [
        {'year':'','list':[]}
      ],
      curYear: "2018",
      index:'0',
      infoDes:false,
      showOne: null,
    };
  },
  methods:{
    itemClk(item,i) {
      if(this.showOne == item.id){
        this.showOne = null;
      }else {
        this.showOne = item.id;     
      }
      if(!item.des){
        window.open(item.url)
      }else {
        this.infoDes = true;
      }
    }
  },
  created() {
    getHistory()
      .then(res => {
        this.data = res.data;
        console.log(this.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.history-page {
  padding-top: r(20);
  .page-title {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: r(15);
    .title-item {
      padding: r(15) r(32);
      border-radius: r(40);
      @include f(36px);
      &.active {
        background: #4db7f4;
        color: #ffffff;
      }
    }
  }
  .history-content {
    background: #ffffff;
    padding: r(15) r(20);
  .history-item {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    border: 1px solid #dadada;
    border-radius: r(8);
    background: #f3f3f3;
    padding: r(20);
    margin-bottom: r(15);
  }
  .imgbox {
    width: 50%;
    border-radius: r(6);
    overflow: hidden;
  }
  img {
    display: block;
    width: 100%;
    height: r(180);
  }
  .title_wrap {
    width: 50%;
    position: relative;
    padding: r(10) 0 r(10) r(20);
    h2 {
      @include f(32px);
      font-weight: normal;
      color: #ff0000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p {
      color: #9c6a39;
      line-height: 2;
      @include f(28px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: r(20);
    }
  }
  .icon_with_text {
    display: inline-block;
    margin-right: r(10);
    color: #ffffff;
    background: #4db7f4;
    border-radius: r(8);
    padding: r(10);
    @include f(32px);
  }
  .info {
    height: 0;
    overflow: hidden;
    &.show {
      height: auto;
      padding-top: r(20);
    }
  }
  }
}
</style>
