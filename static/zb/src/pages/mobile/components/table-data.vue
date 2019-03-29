<template>
  <div v-show="thead.length!=0" :class="['grid-warper','m-grid',className]">
    <div class="title" v-show="title">{{title}}</div>
    <div class="grid-table-warp">
      <table class="m-grid-table">
        <thead>
        <tr>
          <th v-for="(item,i) in thead" @click="item.method||null" :class="item.classNmae" :key="i">
            {{ item.name || item }}
          </th>
        </tr>
        </thead>
        <slot></slot>
      </table>
      <div class="txt-center no-data" v-show="!data.hasOwnProperty('totalRecords')">
        尚未查询
      </div>
      <div class="txt-center no-data" v-show="data.totalRecords==0">
        暂无数据
      </div>
    </div>
    <page-By v-if="page" @search="search" :data="data"></page-By>
  </div>
</template>
<script>
  import pageBy from "./page-by.vue";
  export default {
    props: {
      title:String,
      page:{
        type:Boolean,
        default:true
      },
      thead: {
        type: Array,
        default() {
          return [];
        }
      },
      data: {
        type: Object,
        default() {
          return {};
        }
      },
      className: {
        type: String
      }
    },
    methods: {
      search(val) {
        var x = {}
        x.hasOwnProperty()
        this.$emit("search", val)
      }
    },
    components: {
      pageBy
    }
  }
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";

  .grid-warper {
    width: 100%;
    margin-top: 1em;  
    // padding-bottom: r(120);
    
    position: relative;
    .title {
      color: #343434;
      @include  f(28px);
      font-weight: 100;
      margin-top: r(60);
      margin-bottom: r(18);
      @include f(26px);
    }
    .txt-center {
      text-align: center;
      height: r(90);
      line-height: 45px;
    }
    .grid-table-warp {
      overflow-x: auto;
      border-radius: r(10);
      background: $main-cl;
      margin-left:r(15) ;
      margin-right:r(15) ;
      margin-bottom: 1em;  
    }
    .m-grid-table {
      width: 100%;
      text-align: center;
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 1.5em;
      color: $cl2;
      text-align: center;
      th {
        text-align: center;
        height: r(65);
        @include f(20px);
        background: rgba($color:$cl1, $alpha: .1);
        white-space: nowrap;
        padding: 0 r(8);
        border: 1px solid rgba($color: #ddd, $alpha: .6);
      }
      td {
        height: r(56);
        padding: r(20) r(10);
        font-size: 80%;
        @include f(28px);
        border: 1px solid rgba($color: #ddd, $alpha: .6);
        white-space: nowrap;
      }

    }
    .no-data {
      /*padding: 2em;*/
      height: r(350);
      line-height:r(350);
      text-align: center;
      color: #bda059;
    }
  }

</style>
