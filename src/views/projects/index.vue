<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
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
      <el-table-column label="终端类型" prop="url">
        <template slot-scope="scope">
          <el-tag>{{getTypeName(scope.row.device)}}</el-tag>
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
            <el-button type="primary" @click="handleUpdate(scope.row)" icon="el-icon-edit">信息</el-button>
            <el-button type="warning" @click="handleEdit(scope.row)" icon="el-icon-setting">管理</el-button>
            <el-button
              v-if="scope.row.status!='deleted'"
              type="danger"
              @click="handleDelete(scope.row)"
              icon="el-icon-delete"
            >{{ $t('table.delete') }}</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 项目设置 -->
    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="500px"
      v-if="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="projectsTemp"
        label-position="right"
        label-width="80px"
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
        <el-form-item label="页面模板" prop="templateId">
          <el-select v-model="projectsTemp.templateId">
            <el-option label="空白模板" value></el-option>
            <el-option
              v-for="(item,i) in projectsList"
              :key="i"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
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
  </div>
</template>

<script>
import {
  addProjects,
  getProjects,
  updateProjects,
  deleteProjects,
  rememberProjects
} from "@/api/projects";
import waves from "@/directive/waves"; // Waves directive
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import { getToken, setToken, removeToken } from "@/utils/auth";
export default {
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      // 项目列表
      projectsList: null,
      // 项目数据模型
      projectsTemp: {
        name: "",
        devide: "",
        url: "",
        description: "",
        templateId: ""
      },
      // 终端列表
      deviceTypeList: [
        { name: "电脑桌面端", value: "PC" },
        { name: "手机端", value: "MOBILE" }
      ],
      // loading状态
      listLoading: true,
      // 弹窗
      dialogFormVisible: false,
      // 弹窗状态
      dialogStatus: "",
      // 标题列表
      textMap: {
        update: "更新项目",
        create: "创建项目"
      }
    };
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
        name: "",
        devide: "",
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
      this.$router.push({ name: "Dashboard" });
      this.$store.dispatch("setProject",row._id);

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
    }
  }
};
</script>
