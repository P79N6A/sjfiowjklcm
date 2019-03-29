<template>
  <div class="u-c-shows">
    <div class="u-c-box">
      <div class="user-discount">
        <div class="discount-content form-rowbox creditlog">
          <div class="form-box agent-credit">

            <div class="inputbox">
              <el-date-picker v-model="searchData.starttime" type="date" placeholder="选择开始日期" :picker-options="pickerOptions" format="yyyy-MM-dd"
                value-format="yyyy-MM-dd" :default-value="new Date()">
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
          <el-table :data="pageContents" style="width: 100%" v-loading="loading">

            <el-table-column label='序号' type="index"></el-table-column>
            <el-table-column prop="type" label="操作类型"></el-table-column>
            <el-table-column prop="remit" label="额度变量"></el-table-column>
            <el-table-column prop="credit" label="改变前额度"></el-table-column>
            <el-table-column prop="newCredit" label="改变后额度"></el-table-column>
            <el-table-column label="加入时间">
              <template slot-scope="scope">
                {{scope.row.tempCreateTime|Date}}
              </template>
            </el-table-column>
          </el-table>
          <!-- 表格分页 -->
          <div v-if="pageContents.length>0">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchData.pageIndex"
              :page-sizes="[10, 20, 50, 100]" :page-size="searchData.size" layout="total, sizes, prev, pager, next" :total="searchData.totalRecords">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {creditLog} from "@/controls/agent/creditLog"
  export default {
    mixins:[creditLog],
    data() {
      return {
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
        }
      }
    },
    methods: {
      search(index) {
        if (!isNaN(index)) {
          this.searchData.pageIndex = index
        }
        // this.loading = true
        this.getDatas(this.searchData).then(res=>{
          this.loading=false
          window.toast(res.message,'success')
        }).catch(err=>{
          console.log(err)
          // this.loading=false
          window.toast(err.message)
        })
      },
      handleSizeChange(val) {
        // 每页条数触发函数
        this.searchData.size = val;
        this.search();
      },
      handleCurrentChange(val) {
        // 翻页触发函数
        this.searchData.pageIndex = val;
        this.search(val);
      }
    },
    created() {
      this.searchData.starttime = new Date().addDay(-30).format();
      this.searchData.endtime = new Date().format();
    },
    components: {
    }
  }
</script>
<style lang="scss" scoped>
  .creditlog {
    .form-box {
      .row-group {
        padding: 14px 0 5px 0;
      }
      .inputbox {
        display: inline-block;
        margin: 5px 16px 5px 0;
      }
    }
  }

  .u-c-shows{
    width: 100%;
  min-height: 600px;
  color: #fff;

  }
  .searchbtn{
  background: #0181fa;
  background: -moz-linear-gradient(to right,#0181fa,#16d6ff);
  background: -webkit-linear-gradient(to right,#0181fa,#16d6ff);
  background: -o-linear-gradient(to right,#0181fa,#16d6ff);
  background: linear-gradient(to right,#0181fa,#16d6ff);
  border: 1px solid #0181fa;
  color: #fff;
}
</style>