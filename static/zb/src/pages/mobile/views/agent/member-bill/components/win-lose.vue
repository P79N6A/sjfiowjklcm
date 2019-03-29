<template>
  <div>
    <table-data :thead="thead" :data="data" @search="search">
      <tr v-for="(item,i) in data.pageContents" :key="i">
        <td>{{(data.pageNumber - 1) * data.size + i + 1}}</td>
        <td>{{item.loginname}}</td>
        <td>{{item.platform}}</td>
        <td>{{item.bettotal}}</td>
        <td>{{item.amount }}</td>
        <td>{{item.tempCreateTime | Date}}</td>
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
  import { searchagprofitData} from "@/api/agent";
  import tableData from "mobile/components/table-data"
  export default {
    name: "",
    data() {
      return {
        thead: ['序号', '会员帐号', '平台', '投注总额', '输赢值', '时间'],
        data: {
          pageContents: []
        }
      }
    },
    props: ["searchData"],
    methods: {
      search(index) {
        if (!isNaN(index)) {
          this.searchData.pageIndex = index
        }
        this.data.pageContents = [];
        searchagprofitData(this.searchData).then(res => {
          if (res.success) {
            this.data = res.data;
          } else {
            this.data.pageContents = [];
            window.toast(res.message)
          }
        }).catch(err => {
          this.data.pageContents = [];
          window.toast("查询失败")
        })
      }
    },
    created(){
      this.searchData.endtime = new Date().addDay(1).format();
      this.searchData.starttime = new Date().addDay(-30).format();
      this.search();
    },
    components: {
      tableData
    }
  }
</script>
<style scoped>


</style>
