<template>
  <div class="u-c-shows-log">
    <div class="u-c-box">
      <div class="user-log">
        <div class="log-info">
          <div class="form-box">
            <div class="inputbox">
              <el-date-picker
                v-model="searchData.starttime"
                type="date"
                placeholder="选择开始日期"
                :picker-options="pickerOptions"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :default-value="new Date()"
              ></el-date-picker>
            </div>

            <div class="inputbox">
              <el-date-picker
                v-model="searchData.endtime"
                align="right"
                type="date"
                placeholder="选择结束日期"
                :picker-options="pickerOptions"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :default-value="new Date()"
              ></el-date-picker>
            </div>

            <el-button :loading="loading" icon="el-icon-search" @click="search(1)" type="danger">查询</el-button>
          </div>
          <!-- 表格数据显示区域 -->
          <el-table :data="pageContents" style="width: 100%" v-loading="loading">
            <el-table-column
              v-for="col in thead"
              :key="col.value"
              :label="col.name"
              :width="col.width"
            >
              <template slot-scope="scope">{{scope.row[col.value]}}</template>
            </el-table-column>
          </el-table>
          <!-- 表格分页 -->
          <div v-if="pageContents.length>0">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="searchData.pageIndex"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="searchData.size"
              layout="total, sizes, prev, pager, next"
              :total="searchData.totalRecords"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { userLog } from "@/controls/logs/userLog";
export default {
  mixins: [userLog],
  data() {
    return {
      loading: false,
      // 日期控件配置
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
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
      // 查询按钮触发函数
      if (!isNaN(index)) {
        this.searchData.pageIndex = index;
      }
      this.getLog(this.searchData)
        .then(res => {
          // window.toast(res.message)
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    }
  },
  created() {
    // 初始化，默认查询一周的数据
    const date = new Date();
    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
    this.searchData.starttime = date.format();
    this.searchData.endtime = new Date().format();
    this.searchData.historyType = "withdraw";
    this.search(1);
  }
};
</script>
<style lang="scss" scoped>
.user-log {
  width: 100%;
  padding: 20px;

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

.u-c-router {
  padding: 0 15px !important;
}
</style>
