<template>
  <div class="u-c-shows">
    <div class="u-c-box">
      <div class="user-discount">
        <div class="discount-content form-rowbox creditlog">
          <div class="form-box agent-credit">
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

            <el-button
              :loading="loading"
              class="searchbtn"
              icon="el-icon-search"
              @click="search(1)"
            >查询</el-button>
          </div>
          <!-- 表格数据显示区域 -->
          <table class="table">
            <thead>
              <tr>
                <th>序号</th>
                <th>操作类型</th>
                <th>额度变量</th>
                <th>改变前额度</th>
                <th>改变后额度</th>
                <th>加入时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in pageContents" :key="i">
                <td>{{i+1}}</td>
                <td>{{item.type}}</td>
                <td>{{item.remit}}</td>
                <td>{{item.credit}}</td>
                <td>{{item.newCredit}}</td>
                <td>{{item.tempCreateTime|Date}}</td>
              </tr>
              <!-- <tr>
            <td colspan="3"></td>
            <td>当页小计：{{data.subtotalStatics1}}</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="3"></td>
            <td>总计：{{data.statics1}}</td>
            <td></td>
              </tr>-->
            </tbody>
          </table>
          <!-- <el-table :data="pageContents" style="width: 100%" v-loading="loading">

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
          </el-table>-->
          <!-- <p class="total" v-if="data.pageContents.length>0">
            当页总计：{{data.subtotalStatics1}}
          </p>
          <p class="total" v-if="data.pageContents.length>0">
            总计：{{data.statics1}}
          </p>-->
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
import { creditLog } from "@/controls/agent/creditLog";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [creditLog],
  data() {
    return {
      data: {
        pageContents: []
      },
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
    search(index) {
      if (!isNaN(index)) {
        this.searchData.pageIndex = index;
      }
      // this.loading = true
      this.getDatas(this.searchData)
        .then(res => {
          this.loading = false;
          if (res.success) {
            this.data = res.data;
            window.toast(res.message);
          } else {
            window.toast(res.message);
          }
        })
        .catch(err => {
          console.log(err);
          // this.loading=false
          window.toast(err.message);
        });
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

  computed: {
    ...mapGetters(["userData", "isAgent", "unread"])
  },
  created() {
    this.searchData.starttime = new Date().addDay(-30).format();
    this.searchData.endtime = new Date().format();
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.creditlog {
  .ol-account {
    width: 94%;
    margin: 30px 0 0 30px;
    overflow: hidden;

    li {
      float: left;
      margin: 20px 0 0 10px;

      span {
        color: #cc0000;
        font-weight: 600;
      }
    }
  }

  .form-box {
    width: 94%;
    margin: 30px 0 0 30px;

    .row-group {
      padding: 14px 0 5px 0;
    }

    .inputbox {
      display: inline-block;
      margin: 5px 16px 5px 0;
    }
  }
}

.u-c-shows {
  width: 94%;
  min-height: 600px;
  margin: 30px 0 0 30px;
}

.searchbtn {
  background: #4db7f4;
  border: 1px solid #4db7f4;
  color: #fff;
}

.total {
  text-align: center;
  line-height: 2;
  font-size: 12px;
  color: red;
}

.table {
  display: table;
  border-collapse: collapse;
  width: 100%;

  th {
    background: #4db7f4;
    color: #fff;
  }

  td {
    background: #ddd;
  }

  th,
  td {
    text-align: center;
    border: 1px solid #fff;
    padding: 7px;
  }
}
</style>
