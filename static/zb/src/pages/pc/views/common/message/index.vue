<template>
  <div class="u-c-shows-message">
    <div class="u-c-box">
      <div class="user-message">
        <!-- 百叶窗 -->
        <el-collapse v-if="data.totalRecords>0">
          <el-collapse-item v-for="(item,i) in data.pageContents" :key="item.id" class="message-item" @click.native="showView(item,i)"> 
            <!-- 头部模板 -->
            <template slot="title">
              <div class="u-m-head">
                <div class="title">
                  <span class="iconyg yg-email  unread" v-if="!item.read"></span>
                  <span class="iconyg yg-ready" v-else></span>
                  {{item.title}}
                </div>
                <div class="date">{{item.createDate}}</div>
              </div>
            </template>
            <!-- 内容 -->
            <div class="letter-content">
              <div v-html="item.html" class="html"></div>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div v-else>
          暂无消息...
        </div>
          <!-- 分页 -->
          <div v-if="data.totalRecords>0">
            <el-pagination 
              @size-change="handleSizeChange" 
              @current-change="handleCurrentChange" 
              :current-page="searchData.pageIndex"
              :page-sizes="[5,10, 20, 50, 100]" 
              :page-size="searchData.size" 
              layout="total, sizes, prev, pager, next" 
              :total="data.totalRecords">
            </el-pagination>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    getMessageByUser,
    readMsg
  } from "@/api/show";
  export default {
    data() {
      return {
        active: -1,
        data: {}, //records
        viewList: {},
        showLoadding: true,
        searchData: { //查询条件
          size: 10, // true string
          pageIndex: 1 //
        }
      };
    },
    methods: {
      // 每页条数更改回调
      handleSizeChange(val){
        this.searchData.size=val
        this.search(this.searchData)
      },
      // 页号更改回调
      handleCurrentChange(val){
        this.searchData.pageIndex=val
        this.search(this.searchData)
      },
      // 读取信息
      showView(item, i) {
        this.active = i;
        if (item.hadGet) {
          item.show = !item.show;
          return;
        }
        readMsg({
          msgID: item.id
        }).then((res) => {
          this.$store.commit("READ_MESSAGE"); // 已读站内信
          let html = res.data.content.replace(/\r\n/g, "<br />").replace(/\n/g, "<br />")
          this.$set(item, 'html', html);
          item.read = true;
          item.hadGet = true;
        });
      },
      // 拉取站内信列表
      search(searchData) {
        getMessageByUser(searchData).then(res => {
          this.showLoadding = false
          if (res.success) {
            this.data = res.data;
            this.$store.commit("SET_UNREAD",res.data.unreadCount); // 保存未读站内信
          } else {
            window.toast(res.message,'warning');
          }
        })
      }
    },
    created() {
      this.search(this.searchData);
    },
  }

</script>
<style lang="scss" scoped>
  .user-message {
    padding: 20px;
    border: 1px solid #303030;
    background-color: rgba(9, 11, 20, 0.70);;
    color: #fff;
    min-height: 400px;
    .message-item {
      cursor: pointer;
      overflow: visible;
      position: relative;
      .u-m-head {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        .title {
          .icobjh {
            font-size: 18px;
            margin-right: 6px;
            vertical-align: middle;
            &.unread{
              font-weight:bold;
              color:rgb(223, 85, 85);
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
          border: solid 1px #84d7fe;
          padding: 10px 30px;

        }
      }

    }

  }
</style>
