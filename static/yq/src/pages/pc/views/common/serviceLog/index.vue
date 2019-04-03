<template>
  <div class="user-feedback">
    <div class="messagetable">
      <table class="table">
        <thead>
          <tr>
            <th>反馈内容</th>
            <th>反馈类型</th>
            <th>反馈时间</th>
            <th>回复内容</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in data.playerFeedbackList" :key="item.id">
            <td style="width:350px;word-break:break-all;">{{item.content}} <span class="cl-red" v-if="item.replyId">【已回复】</span><span class="cl-blue" v-else>【未回复】</span>  </td>
            <td style="width:120px;">{{item.categoryName}}</td>
            <td style="width:200px;">{{item.createTime}}</td>
            <td style="width:120px;">
              <a href="javascript:void(0);" class="btn" @click="showView(item,i)" v-if="item.status =='READ'">
                <i class="iconfont icon-weibiaoti1"></i>
                已查看
              </a>
              <a href="javascript:void(0);" class="btn" @click="showView(item,i)" v-else-if="item.status =='UNREAD'">
                <i class="iconfont icon-weibiaoti1"></i>
                查看
              </a>
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="searchData.currentPage"
                :page-sizes="[5,10, 20, 50, 100]"
                :page-size="searchData.pageSize"
                layout="total, sizes, prev, pager, next"
                :total="data.totalCount"
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
          <span>回复详情</span>
          <span class="close" @click="close">X</span>
        </div>
        <div class="body">
          <table>
            <tr>
              <td>反馈问题</td>
              <td class="cl-red">{{title}}</td>
            </tr>
            <tr>
              <td>回复时间</td>
              <td>{{time}}</td>
            </tr>
            <tr>
              <td>回复内容</td>
              <td>
                <div class="msgcontent" v-html="html"></div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { getSuggestAndReplyList ,readSuggestReplyInfo} from "@/api/user";
export default {
  data() {
    return {
      data: {}, //records
      showLoadding: true,
      searchData: {
        //查询条件
        pageSize: 10, 
        currentPage: 1 
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
      this.searchData.pageSize = val;
      this.getSuggestAndReplyList(this.searchData);
    },
    // 页号更改回调
    handleCurrentChange(val) {
      this.searchData.currentPage = val;
      this.getSuggestAndReplyList(this.searchData);
    },
    // 读取信息
    showView(item, i) {
      this.showmsg = true;
      this.title = item.content;
      this.time = item.replyCreateTime;
      this.html = item.replyContent;
      if(item.status == 'READ'){
        return false;
      }
      item.status = 'READ'
      readSuggestReplyInfo({id:item.replyId}).then(res => {
        this.$store.commit("READ_ANDREPLY");
      })
    },
    getSuggestAndReplyList(searchData) {
      getSuggestAndReplyList(searchData).then(res =>{
        if (res.success) {
          this.data = res.data;
        }else {
          window.toast(res.message);
        }
      })
    }
  },
  computed: {},
  created() {
    this.getSuggestAndReplyList(this.searchData)
  }
};
</script>
<style lang="scss" scoped>
.user-feedback {
  padding: 40px;
  color: #fff;
  min-height: 400px;
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
      font-size: 16px;
      line-height: 2;
      table {
        width: 100%;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 5px;
        border-spacing: 0;
        border-collapse: collapse;
        td {
          min-width: 100px;
          padding: 10px;
          border: 1px solid #d3d3d3;
        }
      }
    }
  }
}
</style>
