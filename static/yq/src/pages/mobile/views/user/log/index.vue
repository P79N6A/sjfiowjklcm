<template>
  <div class="user-log">
    <div class="user-log-top" @click="showType = true">
      <div class="user-log-top-l">选择交易类型
        <i class="iconcent ct-down2"></i>
      </div>
      <span>|</span>
      <div class="user-log-top-r">选择交易时间
        <i class="iconcent ct-down2"></i>
      </div>
    </div>
    <!-- 下拉框 -->
    <div class="log-mask" v-show="showType" @click.stop="showType = !showType">
      <div class="mask-content" :class="{active : showType}" @click.stop>
        <div class="select-title">交易类型</div>
        <div class="mask-top">
          <div
            class="mask-top-item"
            v-for="item in filterMenu"
            :value="item.value"
            :key="item.value"
          >
            <span
              :class="{active:searchData.historyType ==item.value}"
              @click.stop="searchData.historyType = item.value"
            >{{item.name}}</span>
          </div>
        </div>
        <div v-show="searchData.historyType=='friend'">
          <div class="select-title">推荐类型</div>
          <div class="frientType">
            <div class="mask-top-item" v-for="item in friends" :key="item.value">
              <span
                :class="{active:searchData.friendtype ==item.value}"
                @click.stop="searchData.friendtype = item.value"
              >{{item.label}}</span>
            </div>
          </div>
        </div>
        <div class="select-title">交易时间</div>
        <div class="mask-time">
          <div class="time-box">
            <!-- <span class="time-span">选择起始时间</span> -->
            <div class="start-time">
              <input type="date" v-model="searchData.starttime" placeholder="选择开始日期">
              <!-- <i class="iconcent ct-rili"></i> -->
            </div>
          </div>
          <div class="time-box">
            <!-- <span class="time-span">选择结束日期</span> -->
            <div class="end-time">
              <input type="date" v-model="searchData.endtime" placeholder="选择结束日期">
              <!-- <i class="iconcent ct-rili"></i> -->
            </div>
          </div>
        </div>
        <div class="mask-btn">
          <div class="btn-no" @click.stop="showType = !showType">取消</div>
          <div class="btn-ok" @click.stop="showType = !showType;search(1)">确定</div>
        </div>
      </div>
    </div>

    <!-- 查询结果list -->
    <div class="user-log-center">
      <div class="center-title">{{title}}</div>
      <div v-if="tableDatas.pageContents && tableDatas.pageContents.length > 0">
        <router-link
          :to="{name:'user_logDetails',params:{data:item,title:title,thead:thead}}"
          class="center-list"
          v-for="(item,i) in tableDatas.pageContents"
          :key="i"
          @click.native="savedata(item)"
        >
          <div class="listOne cfx">
            <span class="typeName fl">{{title}}</span>
            <!-- 接口返回的字段不一样 -->
            <span
              class="typeMoney fr"
            >{{(item.money || item.amount || item.remit || item.ximaAmount) ? '+'+(item.money || item.amount || item.remit || item.ximaAmount) : ''}}</span>
          </div>
          <div class="cfx">
            <span
              class="typeTime fl"
            >{{item.tempCreateTime || item.statisticsTimeRange || item.createtime}}</span>
            <!-- 存款 取款 的状态 -->
            <span
              class="typeFlag fr"
              :class="[{flagOk:item.flag == '成功'},{flagNo:item.flag == '失败'},{flagCancel:item.flag == '已取消'},{flagPending:item.flag == '待审核'}]"
              v-if="searchData.historyType=='deposit' || searchData.historyType=='withdraw'"
            >{{item.flag}}</span>
            <!-- 转账的 状态 -->
            <!-- <span class="typeFlag fr" 
            :class="[{flagOk:item.remark == '转入成功'},{flagNo:item.remark == '失败'},{flagCancel:item.remark == '已取消'},{flagPending:item.remark == '待审核'}]"
            v-else-if="searchData.historyType=='transfer' ">{{item.remark}}</span>-->
            <span
              class="typeTime fr"
              v-else-if="searchData.historyType=='transfer' "
            >{{item.source}}>{{item.target}}</span>
          </div>
        </router-link>
      </div>
      <div class="draw-tips" v-else>
        <i class="iconcent ct-pic_noticex"></i>
        <p>无数据</p>
      </div>
    </div>
    <pageBy :data="pageData" @search="search"></pageBy>
  </div>
</template>
<script>
import tableData from "mobile/components/table-data";
import pageBy from "mobile/components/page-by.vue";
import { userLog } from "@/controls/logs/userLog";
import { $sessionStorage } from "@/util/storage";
export default {
  mixins: [userLog],
  data() {
    return {
      pageData: {},
      thead: [], //数据的标题头
      even: [], //数据行 点击显示的数据
      curItem: -1,
      tableDatas: {},
      showType: false
    };
  },
  methods: {
    search(index) {
      // 查询按钮触发函数
      if (!isNaN(index)) {
        this.searchData.pageIndex = index;
      }
      // this.searchData = {historyType: 'transfer',starttime: '',endtime: '2018-10-17',pageIndex: 1,size: 10}
      this.getLog(this.searchData)
        .then(res => {
          this.tableDatas = res.data;
          this.pageData = res.data;
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    },
    savedata(item) {
      let logData = {};
      logData.data = item;
      logData.title = this.title;
      logData.thead = this.thead;
      logData = JSON.stringify(logData);
      $sessionStorage && $sessionStorage.set("logData", logData);
    }
  },
  created() {
    // 初始化，默认查询一周的数据
    const date = new Date();
    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
    this.searchData.starttime = date.format();
    this.searchData.endtime = new Date().format();
    if (this.$route.params.type) {
      // 可能根据路由直接查询某个表
      this.searchData.historyType = this.$route.params.type;
    }
    // 默认先查询在线存款
    this.search(1);
  },
  components: {
    tableData,
    pageBy
  }
};
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
.user-log {
  color: #303030;
  // min-height:94vh;
  position: relative;
  .user-log-top {
    display: flex;
    background: #ffffff;
    border-bottom: 1px solid rgba($color: #ddd, $alpha: 0.6);
    width: 100%;
    height: r(100);
    line-height: r(100);
    margin-bottom: r(20);
    position: relative;
    z-index: 99;
    span {
      color: #dddddd;
    }
    .user-log-top-l,
    .user-log-top-r {
      flex: 1;
      text-align: center;
      color: $cl1;
      .iconcent {
        margin-left: r(10);
        color: #dddddd;
      }
    }
  }
  .user-log-center {
    background: #ffffff;
    @include f(32px);
    .center-title {
      color: $cl1;
      position: relative;
      padding: r(20) r(40);
      border-bottom: 1px solid rgba($color: #ddd, $alpha: 0.6);
      &::before {
        content: "";
        position: absolute;
        left: r(20);
        top: 50%;
        transform: translateY(-50%);
        width: r(4);
        height: r(25);
        background: $cl1;
      }
    }
    .center-list {
      border-bottom: 1px solid rgba($color: #ddd, $alpha: 0.6);
      padding: r(20);
      display: block;
      .listOne {
        margin-bottom: r(20);
      }
      .typeName {
        @include f(30px);
      }
      .typeMoney {
        @include f(30px);
        color: $cl3;
      }
      .typeTime {
        @include f(24px);
        color: #888888;
        padding: r(4) 0;
      }
      .typeFlag {
        @include f(24px);
        color: $cl3;
        width: r(100);
        height: r(40);
        line-height: r(40);
        text-align: center;
        &.flagOk {
          color: #4db7f4;
        }
        &.flagNo {
          color: #ff4b41;
        }
        &.flagPending {
          color: #fda334;
        }
        &.flagCancel {
          color: #a7a7a8;
        }
      }
    }
  }
  .log-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9;
    padding-top: r(200);
    .mask-top {
      background: #ffffff;
      padding: r(30) r(20) 0;
      display: flex;
      flex-flow: row wrap;
      // border-bottom: 1px dashed #dddddd;
      .mask-top-item {
        width: 33.33%;
        text-align: center;
        margin-bottom: r(30);
        span {
          border-radius: 10em;
          border: 1px solid rgba($color: #ddd, $alpha: 0.6);
          width: 90%;
          height: r(60);
          line-height: r(60);
          display: inline-block;
          &.active {
            border: 1px solid $cl1;
            color: $cl1;
            background: rgba($color: $cl1, $alpha: 0.05);
          }
        }
      }
    }
    .mask-time {
      background: #ffffff;
      padding: r(20) r(20) r(30);
      display: flex;
      justify-content: space-between;
      .time-box {
        width: 48%;
        .start-time,
        .end-time {
          border: 1px solid rgba($color: #ddd, $alpha: 0.6);
          border-radius: r(40);
          height: r(60);
          position: relative;
          overflow: hidden;
          margin-top: r(8);
          padding-left: r(20);
          input {
            border: none;
            outline: none;
            width: 100%;
            height: 100%;
            background: #ffffff;
          }
          .iconcent {
            position: absolute;
            right: r(20);
            top: 50%;
            transform: translateY(-50%);
            color: $cl1;
            @include f(38px);
          }
        }
      }
    }
    .mask-btn {
      display: flex;
      height: r(80);
      line-height: r(80);
      text-align: center;
      color: #ffffff;
      .btn-no {
        flex: 1;
        background: #f8fcff;
        color: #888888;
        border-top: 1px solid rgba($color: #ddd, $alpha: 0.6);
      }
      .btn-ok {
        flex: 1;
        background: $cl1;
        border-top: 1px solid $cl1;
      }
    }
  }
  .mask-content {
    background: #ffffff;
    height: 0;
    padding-top: r(20);
    animation: fadeInDown 0.6s;
    &.active {
      height: auto;
    }
    .select-title {
      color: $cl1;
      padding-left: r(50);
      position: relative;
      @include f(30px);
      &::before {
        content: "";
        position: absolute;
        left: r(30);
        top: 50%;
        transform: translateY(-50%);
        width: r(5);
        height: r(25);
        background: $cl1;
      }
    }
  }
  .frientType {
    padding: r(30) r(20) 0;
    display: flex;
    justify-content: space-between;
    // border-bottom: 1px dashed #dddddd;
    .mask-top-item {
      width: 33%;
      text-align: center;
      margin-bottom: r(30);
      span {
        border-radius: 10em;
        border: 1px solid rgba($color: #ddd, $alpha: 0.6);
        width: r(220);
        height: r(60);
        line-height: r(60);
        display: inline-block;
        &.active {
          border: 1px solid $cl1;
          color: $cl1;
          background: rgba($color: $cl1, $alpha: 0.05);
        }
      }
    }
  }
  .draw-tips {
    color: $cl1;
    text-align: center;
    padding: r(100) 0;
    @include f(28px);
    .iconcent {
      @include f(100px);
      margin-bottom: r(20);
      display: inline-block;
    }
  }
}
</style>
