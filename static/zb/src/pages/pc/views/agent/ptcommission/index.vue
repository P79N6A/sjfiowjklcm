<template>
  <div class="u-c-shows">
    <div class="u-c-box">
      <div class="user-discount">
        <div class="discount-content form-rowbox ptcommission">
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
          </p>
          <!-- 表格分页 -->
          <div v-if="pageContents.length>0">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchData.pageIndex"
              :page-sizes="[10, 20, 50, 100]" :page-size="searchData.size" layout="total, sizes, prev, pager, next" :total="searchData.totalRecords">
            </el-pagination>
          </div>
          <div class="botton-tip">
            <!-- <p class="r">温馨提示：</p> -->
            <p>
              日结标准：所有老虎机代理享受日结佣金，每个工作日18点结算（周末顺延至周一结算）
            </p>
            <p>注：享受日结的代理如果连续两个月没有新增一位活跃会员，将在第三个月的时候取消日结模式，如果在第三个月有开发会员，在次月开启月结</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    ptcommission
  } from '@/controls/agent/ptcommission'
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
        // 是否有设置页数
        if (!isNaN(index)) {
          this.searchData.pageIndex = index
        }
        // 加载数据
        // this.loading=true;
        this.getDatas(this.searchData).then(res => {
          window.toast(res.message,'warning')
          // this.loading=false
        }).catch(err => {
          // this.loading=false
          console.log(err)
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
  }

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
    width: 100%;
    min-height: 600px;
    color: #fff;
  }

  .searchbtn {
    background: #0181fa;
    background: -moz-linear-gradient(to right, #0181fa, #16d6ff);
    background: -webkit-linear-gradient(to right, #0181fa, #16d6ff);
    background: -o-linear-gradient(to right, #0181fa, #16d6ff);
    background: linear-gradient(to right, #0181fa, #16d6ff);
    border: 1px solid #0181fa;
    color: #fff;
  }

  .ptcommission {
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
      text-align: right;
      line-height: 2;
      font-size: 12px;
    }
  }

</style>
