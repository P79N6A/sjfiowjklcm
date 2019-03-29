<template>
  <div class="project-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t('table.add') }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="projectsList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>

      <el-table-column label="项目封面" prop="thumbnail" width="200">
        <template slot-scope="scope">
          <img v-if="scope.row.thumbnail" :src="cdnurl+scope.row.thumbnail" style="width:100%;">
        </template>
      </el-table-column>
      <el-table-column label="终端类型" prop="url">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.device=='PC'" type="danger">电脑桌面端</el-tag>
          <el-tag v-if="scope.row.device=='MOBILE'" type="warning">手机H5端</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="网站名称" prop="name"></el-table-column>
      <el-table-column label="网站拥有者">
        <template slot-scope="scope">
          <el-tag>{{scope.row.author.nickname}}</el-tag>
          <p>
            <a :href="scope.row.author.eamil">{{scope.row.author.email}}</a>
          </p>
        </template>
      </el-table-column>
      <el-table-column label="网站主域名" prop="url">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank">{{scope.row.url}}</a>
        </template>
      </el-table-column>
      <el-table-column label="预览地址">
        <template slot-scope="scope">
          <a
            :href="`https://${scope.row.shortId}.nodercms.com`"
            target="_blank"
          >https://{{scope.row.shortId}}.nodercms.com</a>
        </template>
      </el-table-column>
      <!-- <el-table-column label="状态" prop="type">
        <template slot-scope="scope">
          {{scope.row}}
        </template>
      </el-table-column>-->
      <el-table-column label="项目描述" prop="description"></el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="200"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" @click="handleUpdate(scope.row)" icon="el-icon-edit">编辑</el-button>
            <el-button type="primary" @click="handleEdit(scope.row)" icon="el-icon-setting">管理</el-button>
          </el-button-group>
          <br>
          <br>
          <el-button-group>
            <el-button type="success" @click="handlePush(scope.row)" icon="el-icon-upload">发布</el-button>
            <el-button
              v-if="scope.row.status!='deleted'"
              type="danger"
              @click="handleDelete(scope.row)"
              icon="el-icon-delete"
            >删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 项目设置 -->
    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="600px"
      v-if="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="projectsTemp"
        label-position="right"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="*项目名称" prop="name">
          <el-input v-model="projectsTemp.name"/>
        </el-form-item>

        <el-form-item label="官网域名" prop="url">
          <el-input v-model="projectsTemp.url"/>
        </el-form-item>
        <el-form-item label="项目描述" prop="description">
          <el-input v-model="projectsTemp.description"/>
        </el-form-item>
        <el-form-item label="*适用终端" prop="name">
          <el-radio-group v-model="projectsTemp.device">
            <el-radio
              :label="item.value"
              v-for="item in deviceTypeList"
              :key="item.value"
            >{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="公开为模板" prop="isTemplate">
          <el-switch
            v-model="projectsTemp.isTemplate"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
          ></el-switch>
        </el-form-item>
        <el-form-item label="项目模板" prop="templateId" v-if="dialogStatus=='create'">
          <el-button @click="dialogTempVisible=true">选择模板</el-button>
          <div>
            <el-tag
              v-if="projectsTemp.templateId&&dialogStatus=='create'"
              closable
              @close="resetTemp"
            >{{projectsTemp.name}}</el-tag>
          </div>
        </el-form-item>
        <el-form-item label="项目封面">
          <el-upload
            class="avatar-uploader"
            action="/api/imgs"
            :show-file-list="false"
            :on-success="handleAvatarSuccessFav"
            :before-upload="beforeAvatarUploadFav"
          >
            <img v-if="projectsTemp.thumbnail" :src="cdnurl+projectsTemp.thumbnail" class="favicon">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>只能是图片文件且不超过100KB!
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createProjects():updateProjects()"
        >{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="选择模板"
      :visible.sync="dialogTempVisible"
      width="1000px"
      v-if="dialogTempVisible"
    >
      <div class="project-list">
        <div
          v-for="project in publiceProjectList"
          :key="project._id"
          class="projects"
          @click="setProject(project)"
        >
          <div :class="{active:projectsTemp.templateId==project._id}">
            <div class="img-view" :style="`background-image:url(${cdnurl}${project.thumbnail});`"></div>
            <div>{{project.name}}</div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addProjects,
  getProjects,
  updateProjects,
  deleteProjects,
  rememberProjects,
  pushProjects
} from "@/api/projects";
import waves from "@/directive/waves"; // Waves directive
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import { getToken, setToken, removeToken } from "@/utils/auth";
import { mapGetters } from "vuex";
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
      // 项目列表
      projectsList: null,
      // 项目市场
      publiceProjectList: null,
      // 项目数据模型
      projectsTemp: {
        thumbnail: "",
        name: "",
        device: "",
        url: "",
        description: "",
        templateId: ""
      },
      // 终端列表
      deviceTypeList: [
        {
          name: "电脑桌面端",
          value: "PC"
        },
        {
          name: "手机H5端",
          value: "MOBILE"
        }
      ],
      // loading状态
      listLoading: true,
      // 弹窗
      dialogFormVisible: false,
      dialogTempVisible: false,
      // 弹窗状态
      dialogStatus: "",
      // 标题列表
      textMap: {
        update: "更新项目",
        create: "创建项目"
      }
    };
  },
  computed: {
    ...mapGetters(["cdnurl"])
  },
  created() {
    // 读取项目列表
    this.getProjects();
  },
  methods: {
    // 查询用户列表
    getProjects() {
      this.listLoading = true;
      getProjects()
        .then(res => {
          this.projectsList = res.data;
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    getPbulicProjects() {
      getProjects({
        isTemplate: true
      })
        .then(res => {
          this.publiceProjectList = res.data;
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    // 上线
    handlePush(data) {
      pushProjects(data)
        .then(res => {
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
        })
        .catch(err => {
          this.$notify({
            title: "成功",
            message: err.message,
            type: "success",
            duration: 2000
          });
        });
    },
    setProject(data) {
      this.projectsTemp.templateId = data._id;
      this.projectsTemp.thumbnail = data.thumbnail;
      (this.projectsTemp.name = data.name),
        (this.projectsTemp.device = data.device);
    },
    // 创建项目
    createProjects() {
      addProjects(this.projectsTemp)
        .then(res => {
          this.getProjects();
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
    // 重置数据
    resetTemp() {
      this.projectsTemp = {
        thumbnail: "",
        name: "",
        device: "",
        url: "",
        description: "",
        templateId: ""
      };
    },
    // 点击创建按钮
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.getPbulicProjects();
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // 点击更新按钮
    handleUpdate(row) {
      this.projectsTemp = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // 更新项目
    updateProjects() {
      updateProjects(this.projectsTemp)
        .then(res => {
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
          this.getProjects();
        })
        .catch(err => {});
    },
    // 删除事件
    handleDelete(data) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteProjects(data).then(res => {
            this.getProjects();
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
    // 点击编辑
    handleEdit(row) {
      setToken("SiteId", row._id);
      setToken("SiteDevice", row.device);
      setToken("SiteName", row.name);
      this.$router.push({
        name: "page"
      });
      this.$store.dispatch("setProject", row._id);
      this.$store.dispatch("setProjectName", row.name);
    },
    // 获取终端名称
    getTypeName(val) {
      const device = this.deviceTypeList.find(item => {
        return item.value == val;
      });
      // 如果存在
      if (device) {
        return device.name;
      } else {
        return val;
      }
    },

    handleAvatarSuccessFav(res, file) {
      this.projectsTemp.thumbnail = res.url;
    },
    beforeAvatarUploadFav(file) {
      const isImg = file.type.includes("image");
      const isLt500K = file.size / 1024 < 500;
      if (!isImg) {
        this.$message.error("只能上传图片类型文件!");
      }
      if (!isLt500K) {
        this.$message.error("图片大小不能超过 500 KB!");
      }
      return isImg && isLt500K;
    }
  }
};
</script>
<style lang="scss">
.project-container {
  padding: 15px;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 200px;
    height: 200px;
    line-height: 200px;

    img {
      display: inline-block;
      width: 100%;
    }
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: auto;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .project-list {
    display: flex;
    flex-wrap: wrap;

    .projects {
      width: 20%;
      padding: 10px;

      > div {
        border: solid 1px #eee;
        border-radius: 6px;
        background-color: #eee;
        text-align: center;
        cursor: pointer;
        overflow: hidden;
        transition: all 0.7;
        box-shadow: 0 0 3px 3px #eee;

        &.active {
          box-shadow: 0 0 6px 2px #409eff;
          border: solid 1px #409eff;
        }
      }

      .img-view {
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;
        background-color: #eee;
        width: 100%;
        height: 130px;
        display: inline-block;
        line-height: 2;
      }
    }
  }
}
</style>
