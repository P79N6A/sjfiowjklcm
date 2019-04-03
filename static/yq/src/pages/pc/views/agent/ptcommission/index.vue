<template>
  <div class="u-c-shows">
    <div class="u-c-box">
      <div class="user-discount">
        <div class="discount-content form-rowbox ptcommission">
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
                <th>平台</th>
                <th>日佣金</th>
                <th>数据日期</th>
                <th>输赢额度</th>
                <th>优惠额度</th>
                <th>洗码额度</th>
                <th>平台费</th>
                <th>投注额</th>
                <th>执行时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in pageContents" :key="i">
                <td>{{i+1}}</td>
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
              <tr>
                <td colspan="2"></td>
                <td>当页小计：{{data.subtotalStatics1}}</td>
                <td colspan="7"></td>
              </tr>
              <tr>
                <td colspan="2"></td>
                <td>总计：{{data.statics1}}</td>
                <td colspan="7"></td>
              </tr>
            </tbody>
          </table>
          <!-- <el-table :data="pageContents" style="width: 100%" v-loading="loading">

            <el-table-column label='序号' type="index"></el-table-column>
            <el-table-column label="平台">
              <template slot-scope="scope">
                {{getPlatForm(scope.row.id.platform)}}
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="日佣金"></el-table-column>
            <el-table-column label="数据日期">
              <template slot-scope="scope">
                {{scope.row.id.createdate|Date}}
              </template>
            </el-table-column>
            <el-table-column prop="profitall" label="输赢额度"></el-table-column>
            <el-table-column prop="couponfee" label="优惠额度"></el-table-column>
            <el-table-column prop="ximafee" label="洗码额度"></el-table-column>
            <el-table-column prop="platformfee" label="平台费"></el-table-column>
            <el-table-column prop="betall" label="投注额"></el-table-column>
            <el-table-column label="执行时间">
              <template slot-scope="scope">
                {{scope.row.tempExcuteTime|Date}}
              </template>
            </el-table-column>
          </el-table>
          <p class="total" v-if="pageContents.length>0">
            当页总计：{{data.subtotalStatics1}}
          </p>
          <p class="total" v-if="pageContents.length>0">
            总计：{{data.statics1}}
          </p>-->
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

          <div class="botton-tip">
            <!-- <p class="r">温馨提示：</p> -->
            <p>日结标准：所有老虎机代理享受日结佣金，每个工作日18点结算（周末顺延至周一结算）</p>
            <p>注：享受日结的代理如果连续两个月没有新增一位活跃会员，将在第三个月的时候取消日结模式，如果在第三个月有开发会员，在次月开启月结</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ptcommission } from "@/controls/agent/ptcommission";
export default {
  mixins: [ptcommission],
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
  computed: {
    ...mapGetters(["userData", "isAgent", "unread"])
  },
  methods: {
    search(index) {
      // 是否有设置页数
      if (!isNaN(index)) {
        this.searchData.pageIndex = index;
      }
      // 加载数据
      // this.loading=true;
      this.getDatas(this.searchData)
        .then(res => {
          window.toast(res.message);
          // this.loading=false
        })
        .catch(err => {
          // this.loading=false
          console.log(err);
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
  created() {
    this.searchData.starttime = new Date().addDay(-30).format();
    this.searchData.endtime = new Date().format();
  }
};
</script>
<style lang="scss" scoped>
// .u-c-shows
.botton-tip {
  padding: 10px 10px 30px 10px;
  margin: 20px auto 0 auto;
  clear: both;
  border-top: solid 1px #bfbfbf;

  p.r {
    padding-bottom: 5px;
    color: #343434;
    font-weight: bold;
  }

  p {
    padding: 2px 0;
    line-height: 20px;
    font-size: 14px;
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

.ptcommission {
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

  .total {
    text-align: right;
    line-height: 2;
    font-size: 12px;
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
}
</style>
