<template>
  <div class="app-container">
    <h4>jdkasfhlksfjdslkafj</h4>
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
      :data="contentList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="目录" prop="path"></el-table-column>
      <el-table-column label="内容模型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.model">{{ scope.row.model.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="description"></el-table-column>

      <!-- <el-table-column label="authorities" min-width="150px" prop="role.authorities">
        <template slot-scope="scope">
          <el-tag v-for="(item,i) in scope.row.authorities" :key="i">{{ item }}</el-tag>
        </template>
      </el-table-column>-->
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="primary"
              size="mini"
              @click="handleUpdate(scope.row)"
            >{{ $t('table.edit') }}</el-button>
            <el-button
              v-if="scope.row.status!='deleted'"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              {{
              $t('table.delete') }}
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
    <!-- 编辑弹窗 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="700px">
      <el-form ref="dataFormTemp" :model="categoryTemp" label-position="right" label-width="70px">
        <el-form-item label="集合名称" prop="name">
          <el-input v-model="categoryTemp.name"/>
        </el-form-item>

        <el-form-item label="内容模型" prop="description">
          <el-select v-model="categoryTemp.model" placeholder="请选择">
            <el-option
              v-for="item in modelList"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="外链目录" prop="path">
          <el-input v-model="categoryTemp.path"/>
        </el-form-item>

        <el-form-item label="集合描述" prop="description">
          <el-input v-model="categoryTemp.description"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?addCategories():updateCategories()"
        >
          {{ $t('table.confirm')
          }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getContents,
  addRoles,
  updateRoleOne,
  deleteRoleOne
} from "@/api/contents";
import { getAuthorities } from "@/api/authorities";
import { getModels } from "@/api/model";
import {
  getCategories,
  addCategories,
  deleteCategories,
  updateCategories
} from "@/api/categories";
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
      authorList: null,
      roleList: null,
      contentList: null,
      modelList: null,
      // 栏目模版
      categoryTemp: {
        model: "",
        name: "",
        path: "",
        description: ""
      },

      total: 0,
      listQuery: {
        _id: this.$route.query.categoryId,
        currentPage: "1",
        pageSize: "20"
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
    console.log(this.$route);
    console.log(this.$router);
    this.getContents();
  },
  methods: {
    // 查询数据分类列表
    getContents() {
      this.listLoading = true;
      console.log(this.listQuery);
      getContents(this.listQuery)
        .then(res => {
          this.categoryList = res.data;
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    // 获取模型
    getModels() {
      getModels()
        .then(res => {
          this.modelList = res.data;
        })
        .catch(err => {});
    },
    // 新建数据分类
    addCategories() {
      addCategories(this.categoryTemp)
        .then(res => {
          this.getContents();
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
      this.categoryTemp = {
        model: "",
        name: "",
        path: "",
        description: ""
      };
    },
    // 点击创建按钮
    handleCreate() {
      this.getModels();
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    // 点击更新按钮
    handleUpdate(row) {
      this.getModels();
      this.categoryTemp = Object.assign({}, row); // copy obj
      this.categoryTemp.model = row.model._id;
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // g更新操作
    updateCategories() {
      updateCategories(this.categoryTemp)
        .then(res => {
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "修改成功",
            type: "success",
            duration: 2000
          });
          this.getContents();
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
          deleteCategories(data).then(res => {
            this.getContents();
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
