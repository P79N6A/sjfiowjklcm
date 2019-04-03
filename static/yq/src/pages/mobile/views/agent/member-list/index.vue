<template>
  <!--会员列表{-->
  <div class="page_content_wrap">
    <div class="layout_form layout_form04">
      <search-form @search="search" :data="searchData"></search-form>
      <table-data :thead="thead" :data="data" @search="search">
        <tr v-for="(item,i) in data.pageContents||[]" :key="i">
          <td>{{(data.pageNumber-1)*data.size+i+1}}</td>
          <td>{{item.loginname}}</td>
          <td>{{!item.flag?"启用":'禁用'}}</td>
          <td>{{item.credit}}</td>
          <td>{{item.tempCreateTime|Date}}</td>
          <td>{{item.howToKnow}}</td>
        </tr>
      </table-data>
    </div>
  </div>
  <!--}会员列表-->
</template>

<script>
  import tableData from "mobile/components/table-data"
  import searchForm from "mobile/components/search-form"
  import {queryAgentSubUserInfoData} from "@/api/agent"
  export default {
    data () {
      return {
        thead: ['序号', '会员帐号', '状态', '账户额度', '	开户日期', '来源网址'],
        data: {},
        searchData: {
          starttime: "",
          endtime: "",
          size: 10,
          pageIndex: 1,
        }
      }
    },
    methods: {
      search(index) {
        if(!isNaN(index)){
          // if(index==this.searchData.pageIndex)return
          this.searchData.pageIndex=index
        }
        queryAgentSubUserInfoData(this.searchData).then(res => {
          if (res.success) {
            this.data = res.data;
          } else {
            window.toast(res.message)
          }
        }).catch(err => {
          window.toast("查询错误");
        })
      },
    },
    components: {
      tableData,
      searchForm
    }
  }
</script>
