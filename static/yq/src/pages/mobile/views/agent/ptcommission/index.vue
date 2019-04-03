<template>
  <!--佣金报表{-->
  <div class="page_content_wrap ptcommission">
    <div class="layout_form layout_form04">
      <search-form  :data="searchData"   @search="search"></search-form>
      <table-data :thead="thead" :data="data"  @search="search">
        <tr v-for="(item,i) in data.pageContents||[]" :key="i">
          <td>{{(data.pageNumber-1)*data.size+i+1}}</td>
          <td>{{getPlatForm(item.id.platform)}}</td>
          <td>{{item.amount}}</td>
          <td>{{item.id.createdate|Date}}</td>
          <td>{{item.profitall}}</td>
          <td>{{item.couponfee}}</td>
          <td>{{item.ximafee}}</td>
          <td>{{item.platformfee}}</td>
          <td>{{item.betall}}</td>
          <td>{{item.tempExcuteTime|Date}}</td>
        </tr>
      </table-data>
          <!-- <p class="total" v-if="data.pageContents">
            当页总计：{{data.subtotalStatics1}}
          </p>
          <p class="total" v-if="data.pageContents">
            总计：{{data.statics1}}
          </p> -->
    </div>
  </div>
  <!--}佣金报表-->
</template>
<script>
  import tableData from "mobile/components/table-data"
  import searchForm from "mobile/components/search-form"
  import {searchPtCommissionsData} from "@/api/agent"
  import {ptcommission} from '@/controls/agent/ptcommission'
  export default {
    mixins:[ptcommission],
    data () {
      return {
        thead: ['序号','平台','日佣金','数据日期', '输赢额度', '优惠额度', '洗码额度','平台费','投注额', '执行时间'],
        data: {},
        searchData: {
          starttime: "",
          endtime: "",
          size:10,
          pageIndex:1,
        }
      }
    },
    methods: {
      search(index) {
        if(!isNaN(index)){
          // if(index==this.searchData.pageIndex)return
          this.searchData.pageIndex=index
        }
        searchPtCommissionsData(this.searchData).then(res => {
          if (res.success) {
            this.data = res.data;
          }else{
              window.toast(res.message)
          }
        }).catch(err => {
          window.toast("查询错误");
        })
      }
    },
    // created(){
    //   this.searchData.endtime = new Date().addDay(1).format();
    //   this.searchData.starttime = new Date().addDay(-30).format();
    //   this.search();
    // },
    components: {
      tableData,
      searchForm
    }
  }
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .ptcommission{
    // margin:0 r(10);
    .total{
      line-height:2;
      color: $cl5;
      padding-left: r(15);
    }
  }
</style>
