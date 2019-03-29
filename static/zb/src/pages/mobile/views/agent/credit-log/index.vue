<template>
  <!--额度记录{-->
    <div class="page_content_wrap">
      <div class="layout_form layout_form04">
        <search-form :data="searchData" @search="search" ></search-form>
        <table-data @search="search" :thead="thead" :data="data">
          <tr v-for="(item,i) in data.pageContents||[]" :key="i">
            <td>{{(data.pageNumber-1)*data.size+i+1}}</td>
            <td>{{item.type}}</td>
            <td>{{item.remit}}</td>
            <td>{{item.credit}}</td>
            <td>{{item.newCredit}}</td>
            <td>{{item.tempCreateTime|Date}}</td>
          </tr>
        </table-data>
      </div>
    </div>
  <!--}额度记录-->
</template>
<script>
  import {queryCreditlogs}  from "@/api/user"
  import tableData from "mobile/components/table-data"
  import searchForm from "mobile/components/search-form"
  export default {
    name: 'hello',
    data () {
      return {
        thead: ["序号", '操作类型', '额度变量', '改变前额度', '改变后额度', '加入时间'],
        data: {pageContents:[]},
        searchData: {
          starttime: "", //true string
          endtime: "",// true string
          size: 10, //true string
          pageIndex:1//true string
        }
      }
    },
    methods: {
      search(index){
        if(!isNaN(index)){
          // if(index==this.searchData.pageIndex)return
          this.searchData.pageIndex=index
        }
        queryCreditlogs(this.searchData).then(res => {
          if (res.success) {
              this.data=res.data
          } else {
            window.toast(res.message)
          }
        })
      }
    },
    components: {
      tableData,
      searchForm
    }
  }
</script>
<style>
</style>
