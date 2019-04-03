<template>
  <div class="user-message">
    <div class="u-head">
      您有
      <span>{{unread}}</span>封未读站内信
    </div>
    <!-- 百叶窗 -->
    <!-- <el-collapse v-if="data.totalRecords>0">
      <el-collapse-item
        v-for="(item,i) in data.pageContents"
        :key="item.id"
        class="message-item"
        @click.native="showView(item,i)"
      >
        <template slot="title">
          <div class="u-m-head">
            <div class="title">
              <span class="iconfont icon-youjian unread" v-if="!item.read"></span>
              <span class="iconfont icon-youjian" v-else></span>
              {{item.title}}
            </div>
            <div class="date">{{item.createDate}}</div>
          </div>
        </template>
        <div class="letter-content">
          <div v-html="item.html" class="html"></div>
        </div>
      </el-collapse-item>
    </el-collapse>-->
    <div class="messagetable">
      <table class="table">
        <thead>
          <tr>
            <th>内容</th>
            <th>时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in data.pageContents" :key="item.id">
            <td>
              <i class="iconfont icon-xinfengdakai" v-if="item.read"></i>
              <i class="iconfont icon-xinfeng" v-else></i>
              {{item.title}}
            </td>
            <td>{{item.createDate}}</td>
            <td>
              <a href="javascript:void(0);" class="btn" @click="showView(item,i)" v-if="item.read">
                <i class="iconfont icon-weibiaoti1"></i>
                已查看
              </a>
              <a href="javascript:void(0);" class="btn" @click="showView(item,i)" v-else>
                <i class="iconfont icon-weibiaoti1"></i>
                查看
              </a>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="searchData.pageIndex"
                :page-sizes="[5,10, 20, 50, 100]"
                :page-size="searchData.size"
                layout="total, sizes, prev, pager, next"
                :total="data.totalRecords"
              ></el-pagination>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 分页 -->
    <div class="msgbox" v-show="showmsg">
      <div class="mainbody">
        <div class="head">
          <span>收件箱详情</span>
          <span class="close" @click="close">X</span>
        </div>
        <div class="body">
          <p class="title">{{title}}</p>
          <p class="time">时间：{{time}}</p>
          <div class="msgcontent" v-html="html"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { getMessageByUser, readMsg } from "@/api/show";
export default {
  data() {
    return {
      active: -1,
      data: {}, //records
      viewList: {},
      showLoadding: true,
      searchData: {
        //查询条件
        size: 10, // true string
        pageIndex: 1 //
      },
      html: null,
      time: null,
      title: null,
      showmsg: false
    };
  },
  methods: {
    close() {
      this.showmsg = false;
    },
    // 每页条数更改回调
    handleSizeChange(val) {
      this.searchData.size = val;
      this.search(this.searchData);
    },
    // 页号更改回调
    handleCurrentChange(val) {
      this.searchData.pageIndex = val;
      this.search(this.searchData);
    },
    // 读取信息
    showView(item, i) {
      this.active = i;
      if (item.hadGet) {
        item.show = !item.show;
        this.showmsg = !this.showmsg;
        return;
      }
      readMsg({
        msgID: item.id
      }).then(res => {
        this.$store.commit("READ_MESSAGE"); // 已读站内信
        let html = res.data.content
          .replace(/\r\n/g, "<br />")
          .replace(/\n/g, "<br />");
        this.$set(item, "html", html);
        this.html = html;
        this.title = res.data.title;
        this.time = res.data.createDate;
        this.showmsg = true;
        item.read = true;
        item.hadGet = true;
      });
    },
    // 拉取站内信列表
    search(searchData) {
      getMessageByUser(searchData).then(res => {
        this.showLoadding = false;
        if (res.success) {
          this.data = res.data;
          this.$store.commit("SET_UNREAD", res.data.unreadCount); // 保存未读站内信
        } else {
          window.toast(res.message);
        }
      });
    }
  },
  computed: {
    ...mapGetters(["unread"])
  },
  created() {
    this.search(this.searchData);
  }
};
</script>
<style lang="scss" scoped>
.user-message {
  padding: 40px;
  color: #fff;
  min-height: 400px;
  .u-head {
    color: #333;
    text-align: center;
    margin: 20px 0;
    span {
      color: red;
    }
  }
  .messagetable {
    width: 100%;
    margin: 10px 0;
    text-align: center;
    .table {
      width: 100%;
      margin: 10px 0;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 5px;
      border-spacing: 0;
      border-collapse: collapse;
    }
    thead {
      tr {
        th {
          background: #4db7f4;
          color: #fff;
          border-bottom: 1px solid #d3d3d3;
          padding: 15px 0;
          &:first-child {
            border-radius: 5p 0 0 0;
          }
          &:not(:nth-of-type(4)) {
            border-right: 1px solid #d3d3dd;
          }
        }
      }
    }
    tbody {
      tr {
        td {
          border-bottom: 1px solid #d3d3d3;
          color: #a3a3a3;
          padding: 15px 0;
          text-align: center;
          &:not(:nth-of-type(1)) {
            color: #999;
          }
          &:nth-child(1) {
            padding: 0 20px;
            text-align: left;
            i {
              color: #a3a3a3;
              margin-right: 5px;
            }
          }
          &:not(:nth-of-type(4)) {
            border-right: 1px solid #d3d3d3;
          }
        }
      }
    }
  }
  .message-item {
    cursor: pointer;
    overflow: visible;
    position: relative;
    .u-m-head {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      .title {
        span {
          font-size: 22px;
          margin-right: 6px;
          vertical-align: middle;
          color: #4db7f4;
          &.unread {
            color: red;
          }
        }
      }
      .date {
        font-size: 12px;
        color: #fff;
        display: block;
      }
    }
    &:hover {
      background: #f8f8f8;
    }
    .letter-content {
      margin: 10px 0;
      // border: solid 3px #25b79e;
      padding: 5px;
      color: #fff;
      line-height: 1.5;
      .html {
        font-size: 16px;
        border: solid 1px #4db7f4;
        padding: 10px 30px;
        color: #333;
      }
    }
  }
}
.el-pagination {
  text-align: center;
}
.msgbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  .mainbody {
    position: relative;
    width: 600px;
    max-height: 800px;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    outline: 0;
    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
    margin: 0 auto;
    .head {
      font-size: 18px;
      position: relative;
      padding: 15px;
      border-bottom: 1px solid #e5e5e5;
      span {
        font-size: 18px;
      }
      .close {
        position: absolute;
        z-index: 1;
        cursor: pointer;
        background: 0 0;
        font-size: 30px;
        font-weight: bold;
        color: #000;
        top: 0;
        right: 10px;
        float: right;
      }
    }
    .body {
      position: relative;
      padding: 20px;
      font-size: 14px;
      line-height: 1.7;
    }
  }
}
</style>
