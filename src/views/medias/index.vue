<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-plus"
        @click="handleCreate"
      >
        {{
        $t('table.add') }}
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="mediaList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
      <el-table-column label="缩略图" prop="name">
        <template slot-scope="scope">
          <a
            target="_blank"
            v-if="scope.row.type.includes('image')"
            :href="`${cdnurl}${scope.row.url}`"
            class="img-view"
            :style="`background-image:url('${cdnurl}${scope.row.url}');`"
          ></a>
          <a
            v-else
            class="file-view"
          >{{scope.row.fileName.substr(scope.row.fileName.lastIndexOf('.') + 1)}}</a>
        </template>
      </el-table-column>
      <el-table-column label="文件名" prop="fileName">
        <template slot-scope="scope">
          <a target="_blank" :href="`${cdnurl}${scope.row.url}`">{{scope.row.fileName}}</a>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="description"></el-table-column>
      <el-table-column label="上传日期" prop="date">
        <template slot-scope="scope">{{scope.row.date| parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </el-table-column>
      <el-table-column label="文件大小" prop="size">
        <template slot-scope="scope">{{(scope.row.size/1024).toFixed(2)}}kb</template>
      </el-table-column>
      <!-- <el-table-column label="引用次数" prop="quotes">
        <template slot-scope="scope">
          {{scope.row.quotes.length}}
        </template>
      </el-table-column>-->
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="250"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button-group>
            <!-- <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button> -->
            <el-tooltip class="item" effect="dark" content="编辑该文件" placement="top-start">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="在线预览" placement="top-start">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-view"
                @click="handleOpen(`${cdnurl}${scope.row.url}`)"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="复制外链地址" placement="top-start">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-printer"
                v-clipboard:copy="`${cdnurl}${scope.row.url}`"
                v-clipboard:success="clipboardSuccess"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除该文件" placement="top-start">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)"
                icon="el-icon-delete"
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
      @pagination="getMedias"
      :autoScroll="false"
    />

    <!-- 上传弹窗 -->
    <el-dialog :visible.sync="dialogVisible" width="400px">
      <el-upload
        :multiple="true"
        ref="upload"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        action="/api/media"
        list-type="text"
        drag
        :auto-upload="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
      <el-button
        style="width:100%;margin-top:10px;"
        size="medium"
        @click="$refs.upload.submit()"
        type="primary"
      >上传</el-button>
    </el-dialog>
    <!-- 编辑文件名和文件描述 -->
    <el-dialog title="文件描述" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="mediaTemp"
        label-position="right"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <!-- <el-form-item label="文件名" prop="fileName">
          <el-input v-model="mediaTemp.name">
            <template slot="append">{{mediaTemp.type}}</template>
          </el-input>
        </el-form-item>-->
        <!-- <el-form-item label="文件描述" prop="description"> -->
        <el-input v-model="mediaTemp.description" type="textarea"/>
        <!-- </el-form-item>  -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updateFile">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getMedias, deleteMedias, updateMedias } from "@/api/media";
import waves from "@/directive/waves"; // Waves directive
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import clip from "@/utils/clipboard"; // use clipboard directly
import clipboard from "@/directive/clipboard/index.js"; // use clipboard by v-directive

export default {
  name: "ComplexTable",
  components: {
    Pagination
  },
  directives: {
    waves,
    clipboard
  },
  data() {
    return {
      mediaList: null,
      total: 0,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        totals: 100,
        pages: 0
      },
      listLoading: true,
      dialogFormVisible: false,
      mediaTemp: {
        name: "",
        description: "",
        type: "",
        fileName: ""
      },
      // uploadFile
      dialogVisible: false,
      listObj: {},
      fileList: [],
      hadUpload: false
    };
  },
  created() {
    this.getMedias();
  },
  methods: {
    // 预览文件
    handleOpen(url) {
      window.open(url);
    },
    // 复制文件
    clipboardSuccess() {
      this.$message({
        message: "已复制到剪贴板",
        type: "success",
        duration: 1500
      });
    },
    // 查询媒体列表
    getMedias() {
      this.listLoading = true;
      getMedias(this.listQuery)
        .then(res => {
          this.mediaList = res.data.media;
          this.listLoading = false;
          this.listQuery.totals = res.data.totals;
          this.listQuery.pages = res.data.pages;
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    // 点击创建按钮
    handleCreate() {
      this.dialogVisible = true;
    },
    // 点击更新按钮
    handleUpdate(row) {
      this.mediaTemp = Object.assign({}, row); // copy obj
      this.mediaTemp.description = row.description ? row.description : "";
      // str.lastIndexOf("/")
      // str.substr(）
      this.mediaTemp.name = row.fileName.substr(
        0,
        row.fileName.lastIndexOf(".")
      );
      this.mediaTemp.type = row.fileName.substr(
        row.fileName.lastIndexOf(".") + 1
      );
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // 更新文件数据
    updateFile() {
      const postData = {
        _id: this.mediaTemp._id,
        description: this.mediaTemp.description,
        fileName: this.mediaTemp.name + "." + this.mediaTemp.type
      };
      updateMedias(postData)
        .then(res => {
          this.getMedias();
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
        })
        .catch(err => {});
    },
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
    // fileUpload
    // 确认所有文件是否上传完毕
    checkAllSuccess() {
      this.hadUpload = true;
      return Object.keys(this.listObj).every(
        item => this.listObj[item].hasSuccess
      );
    },
    // 文件确认上传完毕
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v]);
      if (!this.checkAllSuccess()) {
        this.$message(
          "请等待所有文件上传成功,或出现了网络问题，请刷新页面重新上传！"
        );
        return;
      }
      this.$emit("successCBK", arr);
      this.listObj = {};
      this.fileList = [];
      this.dialogVisible = false;
      //有上传文件，更新列表
      if (this.hadUpload) {
        this.hadUpload = false;
        this.getMedias();
      }
    },
    // 文件上传成功
    handleSuccess(response, file) {
      const uid = file.uid;
      const objKeyArr = Object.keys(this.listObj);
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.url;
          this.listObj[objKeyArr[i]].hasSuccess = true;
          return;
        }
      }
    },
    // 文件删除前
    handleRemove(file) {
      const uid = file.uid;
      const objKeyArr = Object.keys(this.listObj);
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]];
          return;
        }
      }
    },
    // 文件上传前
    beforeUpload(file) {
      const _self = this;
      const _URL = window.URL || window.webkitURL;
      const fileName = file.uid;
      this.listObj[fileName] = {};
      _self.listObj[fileName] = {
        hasSuccess: false,
        uid: file.uid,
        width: this.width,
        height: this.height
      };
      return;
    }
  },
  watch: {
    // 上传对话框关闭，清空已上传文件列表，并刷新系统文件泪奔
    dialogVisible(val) {
      if (!val) {
        this.handleSubmit();
      }
    }
  },
  computed: {
    ...mapGetters(["cdnurl"])
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
