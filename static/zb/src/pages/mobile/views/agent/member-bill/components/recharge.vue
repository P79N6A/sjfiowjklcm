<template>
  <div>
    <table-data :thead="thead" :data="data" @search="search">
      <tr v-for="(item,i) in data.pageContents||[]" :key="i">
        <td>{{(data.pageNumber - 1) * data.size + i + 1}}</td>
        <td>{{item.loginname}}</td>
        <td>{{item.tempCreateTime}}</td>
        <td>{{item.money || item.amount}}</td>
        <td>{{item.type}}</td>
      </tr>
    </table-data>
    <p class="total" v-if="data.pageContents.length>0">
      当页总计：{{data.subtotalStatics1}}
    </p>
    <p class="total" v-if="data.pageContents.length>0">
      总计：{{data.statics1}}
    </p>
  </div>
</template>
<script>
  import {
    searchsubuserProposalData
  } from "@/api/agent";
  import tableData from "mobile/components/table-data"

  export default {
    name: "",
    data() {
      return {
        thead: ["序号", "会员账户", "申请时间", "额度", "申请类型"],
        data: {
          pageContents: []
        },
        // searchData: {
        //   loginname: "",
        //   tail: "",
        //   total: 0,
        //   starttime: "",
        //   endtime: "",
        //   proposalType: "-1",
        //   size: 10,
        //   pageIndex: 1
        // }
      }
    },
    props: ["searchData"],
    methods: {
      search(index) {
        if (!isNaN(index)) {
          this.searchData.pageIndex = index
        }
        this.data.pageContents = [];
        searchsubuserProposalData(this.searchData).then(res => {
          if (res.success) {
            this.data = res.data
          } else {
            window.toast(res.message)
          }
        }).catch(err => {
          this.data.pageContents = [];
          window.toast("查询失败")
        })
      }
    },
    components: {
      tableData
    }
  }

</script>
<style>


</style>
