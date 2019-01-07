<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        {{
        $t('table.add') }}
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="platformList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="字段" prop="value"></el-table-column>
      <el-table-column label="描述" prop="description"></el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="250"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="编辑该文件" placement="top-start">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除该数据集合" placement="top-start">
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

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
    <!-- 编辑弹窗 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="700px">
      <el-form :model="PlatformTemp" label-position="right" label-width="70px">
        <el-form-item label="平台名称" prop="name">
          <el-input v-model="PlatformTemp.name"/>
        </el-form-item>

        <el-form-item label="平台字段" prop="value">
          <el-input v-model="PlatformTemp.value"/>
        </el-form-item>
        <el-form-item label="平台描述" prop="value">
          <el-input
            v-model="PlatformTemp.description"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?addPlatforms():updatePlatforms()">
          {{ $t('table.confirm')
          }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPlatforms,
  addPlatforms,
  deletePlatforms,
  updatePlatforms
} from "@/api/platforms";

export default {
  name: "ComplexTable",
  data() {
    return {
      platformList: null,
      // 栏目模版
      PlatformTemp: {
        name: "",
        value: "",
        description: ""
      },
      listLoading: true,
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      }
    };
  },
  created() {
    // this.getList()
    this.getPlatforms();
  },
  methods: {
    // 查询数据分类列表
    getPlatforms() {
      this.listLoading = true;
      getPlatforms({ type: "content" })
        .then(res => {
          this.platformList = res.data;
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    // 新建数据分类
    addPlatforms() {
      addPlatforms(this.PlatformTemp)
        .then(res => {
          this.getPlatforms();
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "创建成功",
            type: "success",
            duration: 2000
          });
        })
        .catch(err => {});
    },
    // 重置数据
    resetTemp() {
      this.PlatformTemp = {
        name: "",
        value: "",
        description: ""
      };
    },
    // 点击创建按钮
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    // 点击更新按钮
    handleUpdate(row) {
      this.PlatformTemp = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // g更新操作
    updatePlatforms() {
      updatePlatforms(this.PlatformTemp)
        .then(res => {
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "修改成功",
            type: "success",
            duration: 2000
          });
          this.getPlatforms();
        })
        .catch(err => {});
    },
    // 删除事件
    handleDelete(data) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deletePlatforms(data).then(res => {
            this.getPlatforms();
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
