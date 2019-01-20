<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
        v-if="authorities.includes(100000)"
      >
        {{
        $t('table.add') }}
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="messageList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
      <el-table-column label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.unRead">未读</el-tag>
          <el-tag type="success" v-else>已读</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center" prop="title"></el-table-column>
      <el-table-column label="发件人" align="center">
        <template slot-scope="scope">{{scope.row.author.nickname}}</template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <el-tag type="primary">{{scope.row.type}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发件时间" align="center" prop="createDate"></el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="250"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button-group>
            <!-- <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button> -->
            <!-- <el-tooltip class="item" effect="dark" content="回复" placement="top-start">
              <el-button size="mini" type="primary" icon="el-icon-printer" @click="handleUpdate(scope.row)"></el-button>
            </el-tooltip>-->
            <el-tooltip class="item" effect="dark" content="查看" placement="top-start">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-view"
                @click="handleView(scope.row)"
              ></el-button>
            </el-tooltip>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 列表翻页 -->
    <pagination
      v-show="listQuery.pages>0"
      :total="listQuery.totals"
      :page.sync="listQuery.currentPage"
      :limit.sync="listQuery.pageSize"
      @pagination="getMessages"
      :autoScroll="false"
    />

    <!-- 发送需求弹窗 -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      width="800px"
      v-if="dialogFormVisible&&authorities.includes(100000)"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="messageTemp"
        label-position="right"
        label-width="70px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="messageTemp.title"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="messageTemp.type"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <tinymce :height="400" v-model="messageTemp.content"/>
        </el-form-item>
        <el-form-item label="收件人" prop="recId">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <!-- {{recId}} -->
          <el-checkbox-group v-model="messageTemp.recId" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="rec in recId" :label="rec._id" :key="rec._id">{{rec.nickname}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?addMessage():updateMessage()">
          {{ $t('table.confirm')
          }}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="messageTemp.title"
      :visible.sync="dialogViewVisible"
      width="800px"
      v-if="messageTemp.author&&messageTemp.author.nickname"
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <!-- <div>标题：{{messageTemp.title}}</div> -->
          <!-- <el-button style="float: right;" type="danger">回复</el-button> -->
          <div>发件人：{{messageTemp.author.nickname}}</div>
          <div>时间：{{messageTemp.createDate}}</div>
          <div>类型：
            <el-tag type="primary">{{messageTemp.type}}</el-tag>
          </div>
        </div>
        <div v-html="messageTemp.content">需求详情部分</div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Tinymce from "@/components/Tinymce";
// import { getMedias, deleteMedias, updateMedias } from "@/api/media";
import {
  getMessages,
  getMessageOne,
  addMessages,
  updateMessages,
  deleteMessages
} from "@/api/message";
import { getUsers } from "@/api/user";
import waves from "@/directive/waves"; // Waves directive
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "ComplexTable",
  components: {
    Pagination
  },
  directives: {
    waves
  },
  data() {
    return {
      messageList: null,
      total: 0,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        totals: 100,
        pages: 0
      },
      listLoading: true,
      dialogStatus: "create",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      dialogViewVisible: false,
      dialogFormVisible: false,
      messageTemp: {
        author: {
          _id: "",
          nickname: ""
        },
        title: "",
        content: "",
        type: "",
        recId: []
      },
      recId: [],
      checkAll: false,
      isIndeterminate: true
    };
  },
  created() {
    this.getMessages();
  },
  methods: {
    // 预览文件
    handleOpen(url) {
      window.open(url);
    },
    // 查询需求列表
    getMessages() {
      this.listLoading = true;
      getMessages(this.listQuery)
        .then(res => {
          this.listLoading = false;
          this.messageList = res.data.messages;
          this.listQuery.totals = res.data.totals;
          this.listQuery.pages = res.data.pages;
        })
        .catch(err => {
          // this.listLoading = false;
        });
    },
    // 设置收件列表
    getUsers() {
      getUsers()
        .then(res => {
          this.recId = res.data;
          console.log(this.recId);
        })
        .then(err => {});
    },
    // 点击创建按钮
    handleCreate() {
      this.getUsers();
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
      this.messageTemp = {
        title: "",
        content: "",
        type: "",
        recId: []
      };
    },
    handleView(row) {
      this.dialogViewVisible = true;
      this.messageTemp = row;
      row.unRead = false;
      // this.messageTemp.content=''
      getMessageOne({ _id: row._id })
        .then(res => {
          this.$nextTick(() => {
            // this.messageTemp.content=res.data.content
            this.$set(this.messageTemp, "content", res.data.content);
            // console.log(this.messageTemp)
          });
        })
        .catch(err => {});
    },
    // 点击更新按钮
    handleUpdate(row) {
      this.messageTemp = Object.assign({}, row); // copy obj
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // 发送需求
    addMessage() {
      addMessages(this.messageTemp)
        .then(res => {
          this.getMessages();
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
        })
        .catch(err => {});
    },
    // // 更新文件数据
    // updateFile() {
    //   const postData = {
    //     _id: this.messageTemp._id,
    //     description: this.messageTemp.description,
    //     fileName: this.messageTemp.name + "." + this.messageTemp.type
    //   };
    //   updateMedias(postData)
    //     .then(res => {
    //       this.getMedias();
    //       this.$notify({
    //         title: "成功",
    //         message: "操作成功",
    //         type: "success",
    //         duration: 2000
    //       });
    //     })
    //     .catch(err => {});
    // },
    // 删除事件
    handleDelete(data) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteMedias(data).then(res => {
            this.getMedias();
            this.$notify({
              title: "成功",
              message: "操作成功",
              type: "success",
              duration: 2000
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 全选
    handleCheckAllChange(val) {
      this.messageTemp.recId = val
        ? this.recId.map(item => {
            return item._id;
          })
        : [];
      this.isIndeterminate = false;
    },
    // 单选
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.recId.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.recId.length;
    }
  },
  computed: {
    ...mapGetters(["authorities"])
  },
  components: {
    Tinymce
  }
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.img-view {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #eee;
  width: 60px;
  height: 60px;
  display: inline-block;
}

.file-view {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #eee;
  width: 60px;
  height: 60px;
  display: inline-block;
  text-align: center;
  line-height: 60px;
  font-size: 18px;
  font-weight: bold;
}

.editor-slide-upload {
  margin-bottom: 20px;

  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
