<template>
  <div class="agent-deposit-log">
    <!-- 会员提款 -->
    <div class="withdraw-info">
      <div class="form-box">

        <div class="inputbox">
          <el-date-picker v-model="searchData.starttime" type="date" placeholder="选择开始日期" :picker-options="pickerOptions"
            format="yyyy-MM-dd" value-format="yyyy-MM-dd" :default-value="new Date()">
          </el-date-picker>
        </div>

        <div class="inputbox">
          <el-date-picker v-model="searchData.endtime" align="right" type="date" placeholder="选择结束日期" :picker-options="pickerOptions"
            format="yyyy-MM-dd" value-format="yyyy-MM-dd" :default-value="new Date()">
          </el-date-picker>
        </div>
        <el-button :loading="loading" class="searchbtn" icon="el-icon-search" @click="search(1)">查询
        </el-button>

      </div>
      <!-- 表格数据显示区域 -->
      <table class="table">
        <thead>
          <tr>
            <th>序号</th>
            <th>会员账号</th>
            <th>申请时间</th>
            <th>额度</th>
            <th>申请类型</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in pageContents" :key="i">
            <td>{{i+1}}</td>
            <td>{{item.loginname}}</td>
            <td>{{item.tempCreateTime}}</td>
            <td>{{item.amount}}</td>
            <td>{{item.type}}</td>
          </tr>
          <tr>
            <td colspan="3"></td>
            <td>当页小计：{{data.subtotalStatics1}}</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="3"></td>
            <td>总计：{{data.statics1}}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <!-- <el-table :data="pageContents" style="width: 100%" v-loading="loading">
        <el-table-column label='序号' type="index"></el-table-column>
        <el-table-column prop="loginname" label="会员账户"></el-table-column>
        <el-table-column prop="tempCreateTime" label="申请时间"></el-table-column>
        <el-table-column prop="amount" label="额度"></el-table-column>
        <el-table-column prop="type" label="申请类型"></el-table-column>
      </el-table>
      <p class="total" v-if="pageContents.length>0">
        当页总计：{{data.subtotalStatics1}}
      </p>
      <p class="total" v-if="pageContents.length>0">
        总计：{{data.statics1}}
      </p> -->
      <!-- 表格分页 -->
      <div v-if="pageContents.length>0">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchData.pageIndex"
          :page-sizes="[10, 20, 50, 100]" :page-size="searchData.size" layout="total, sizes, prev, pager, next" :total="searchData.totalRecords">
        </el-pagination>
      </div>
    </div>
  </div>
 
</template>
<script>
  import {
    searchsubuserProposalData
  } from "@/api/agent";
  // import datepicker from "pc/components/datepicker";
  // import tableData from "pc/components/table-data"

  import {
    mapGetters
  } from 'vuex'
  export default {
    name: "",
    data() {
      return {
        thead: ["序号", "会员账户", "申请时间", "额度", "申请类型"],
        data: {
          pageContents: []
        },
        loading: false,
        // 日期控件配置
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        pageContents: [],
        searchData: {
          loginname: "",
          tail: "",
          total: 0,
          starttime: "",
          endtime: "",
          proposalType: "503",
          size: 10,
          pageIndex: 1,
          // totalRecords:0
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        // 每页条数触发函数
        this.searchData.size = val;
        this.search();
      },
      handleCurrentChange(val) {
        // 翻页触发函数
        this.searchData.pageIndex = val;
        this.search(val);
      },
      search(index) {
        if (!isNaN(index)) {
          // if (index == this.searchData.pageIndex) return
          this.searchData.pageIndex = index
        }
        this.pageContents = [];
        searchsubuserProposalData(this.searchData).then(res => {
          if (res.success) {
            this.data = res.data
            this.pageContents = res.data.pageContents
            this.searchData.pageIndex = res.data.pageNumber
            this.searchData.totalRecords = res.data.totalRecords
          } else {
            window.toast(res.message)
          }
        }).catch(err => {
          console.log(err)
          window.toast("查询失败")
        })
      }
    },
    created() {
      this.searchData.starttime = new Date().addDay(-30).format();
      this.searchData.endtime = new Date().format();
      // this.searchData.loginname = this.userData.loginname;

    },
    computed: {
      ...mapGetters(['userData'])
    },
    activated() {},
    components: {
      // tableData, datepicker
    }
  }

</script>
<style spcoed lang="scss">
  .withdraw-info {
    .form-box {
      .row-group {
        padding: 14px 0 5px 0;
      }

      .inputbox {
        display: inline-block;
        margin: 5px 16px 5px 0;
      }
    }

    .total {
      text-align: center;
      line-height: 2;
      font-size: 12px;
      color: red;
    }

    .searchbtn {
      background: #4db7f4;
      border: 1px solid #4db7f4;
      color: #fff;
    }
    .table{
      display: table;
      border-collapse: collapse;
      width: 100%;
      th{
        background: #4db7f4;
        color: #fff;
      }
      td{
        background: #ddd;
      }
      th,td{
        text-align: center;
        border: 1px solid #fff;
        padding: 7px;
      }
    }
  }

</style>
