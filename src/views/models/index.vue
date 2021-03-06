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
      :data="modelList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>

      <el-table-column label="使用范围" width="80px">
        <template slot-scope="scope">
          <el-tag type="warning">{{ scope.row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否公开" width="70px">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.isPublic">是</el-tag>
          <el-tag type="primary" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="字段" min-width="150px">
        <template slot-scope="scope">
          <el-tag v-for="(item,i) in scope.row.value" :key="i" type="warning">{{ item.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="description"></el-table-column>
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
    <!-- 翻页,后续加上 -->
    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
    <!-- 编辑弹窗 -->
    <el-dialog
      :title="`数据模型--${textMap[dialogStatus]}`"
      :visible.sync="dialogFormVisible"
      width="700px"
      :close-on-click-modal="false"
    >
      <el-form ref="dataForm" :model="modelTemp" label-position="right" label-width="80px">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>模型信息</span>
          </div>
          <div class="items">
            <el-form-item label="*模型名称" prop="name">
              <el-input v-model="modelTemp.name"/>
            </el-form-item>
            <el-form-item label="*模型备注" prop="description">
              <el-input v-model="modelTemp.description"/>
            </el-form-item>
            <el-form-item label="使用范围" prop="type">
              <el-radio-group v-model="modelTemp.type">
                <el-radio
                  :label="type.value"
                  v-for="type in typeList"
                  :key="type.value"
                >{{type.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否公开" prop="isPublic">
              <el-switch
                v-model="modelTemp.isPublic"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="是"
                inactive-text="否"
              ></el-switch>
            </el-form-item>
          </div>
        </el-card>
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>数据键值</span>
          </div>
          <div class="items">
            <el-table :data="modelTemp.value" border fit highlight-current-row style="width: 100%;">
              <el-table-column :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
              <el-table-column label="名称" prop="name" align="center"></el-table-column>
              <el-table-column label="键名" prop="key" align="center"></el-table-column>
              <el-table-column label="类型" prop="type" align="center">
                <template slot-scope="scope">{{getKeyName(scope.row.type)}}</template>
              </el-table-column>
              <el-table-column label="备注" prop="description" align="center"></el-table-column>
              <el-table-column label="操作" align="center" width="150">
                <template slot-scope="scope">
                  <el-button-group>
                    <el-button
                      type="primary"
                      @click="editKey(scope.row,scope.$index)"
                      size="mini"
                    >编辑</el-button>
                    <el-button type="danger" @click="deleteKey(scope.$index)" size="mini">移除</el-button>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="bottom clearfix">
            <el-button
              type="primary"
              block
              style="width:100%;"
              icon="el-icon-plus"
              @click="handleCreateKey"
            >新增键</el-button>
          </div>
        </el-card>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createModel():updateModel()"
        >{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 添加扩展键 -->
    <el-dialog
      :title="`键值--${textMap[dialogKeyStatus]}`"
      :visible.sync="dialogExtendVisible"
      width="500px"
    >
      <el-form ref="dataFormKey" :model="keyTemp" label-position="right" label-width="80px">
        <el-form-item label="*名称" prop="name">
          <el-input v-model="keyTemp.name"/>
        </el-form-item>
        <el-form-item label="*键名" prop="key">
          <el-input v-model="keyTemp.key"/>
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-input v-model="keyTemp.description"/>
        </el-form-item>
        <el-form-item label="*类型" prop="type">
          <el-select v-model="keyTemp.type" placeholder="请选择">
            <el-option
              v-for="item in keyType"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 选择菜单设置 -->
        <el-form-item label="选项列表" v-if="keyTemp.type=='select'||keyTemp.type=='checkbox'">
          <el-table
            :data="keyTemp.mixed.select"
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
            <el-table-column label="名称" prop="name" align="center"></el-table-column>
            <el-table-column label="值" prop="value" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  @click="deleteKeySelect(scope.$index)"
                >移除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-form
            :model="selectTemp"
            label-position="right"
            label-width="50px"
            class="selectTempForm"
          >
            <el-form-item label="名称" prop="name">
              <el-input v-model="selectTemp.name"/>
            </el-form-item>
            <el-form-item label="值" prop="value">
              <el-input v-model="selectTemp.value"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-plus" @click="addKeySelect">添加</el-button>
            </el-form-item>
          </el-form>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogExtendVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogKeyStatus==='create'?createKey():updateKey()"
        >{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getModels, addModels, deleteModels, updateModels } from "@/api/model";
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
      modelList: null,
      typeList: [
        { name: "组件配置", value: "config" },
        { name: "组件数据", value: "content" }
      ],
      modelTemp: {
        type: "content", // 模型类型
        name: "", // 模型名称
        description: "", // 模型备注
        isPublic: false,
        // 字段数据
        value: [
          {
            name: "数据封面",
            key: "thumbnail",
            type: "media",
            desc: "长x宽"
          },
          {
            name: "内容",
            key: "content",
            type: "rtf",
            desc: "富文本内容"
          },
          {
            name: "数据标题",
            key: "title",
            type: "text",
            desc: "数据标题"
          },
          {
            name: "数据摘要",
            key: "abstract",
            type: "text",
            desc: "数据摘要"
          }
        ]
      },
      selectTemp: {
        // 多选，下拉模型
        name: "",
        value: ""
      },
      // 新键键模型
      keyTemp: {
        key: "",
        name: "",
        type: "",
        description: "",
        mixed: {
          thumbnailSize: {
            width: 300,
            height: 300
          },
          select: []
        }
      },
      // 键值的类型
      keyType: [
        {
          name: "文本框",
          value: "text"
        },
        {
          name: "文本域",
          value: "textarea"
        },
        {
          name: "富文本",
          value: "rtf"
        },
        {
          name: "数字框",
          value: "number"
        },
        {
          name: "日期输入框",
          value: "date"
        },
        {
          name: "多选列表",
          value: "checkbox"
        },
        {
          name: "下拉选择列表",
          value: "select"
        },
        {
          name: "图片上传框",
          value: "image"
        },
        {
          name: "多媒体选项",
          value: "media"
        },
        {
          name: "颜色选择器",
          value: "color"
        },
        {
          name: "开关",
          value: "switch"
        }
      ],
      // 正在编辑的键，更新键用到
      edittingKey: "",
      listLoading: true,
      dialogFormVisible: false,
      dialogExtendVisible: false,
      dialogStatus: "",
      dialogKeyStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      // 不重要的值
      total: 0,

      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      }
    };
  },
  created() {
    this.getModels({});
  },
  methods: {
    /*=========模型相关=========*/
    // 查询用户列表
    getModels() {
      this.listLoading = true;
      getModels()
        .then(res => {
          this.modelList = res.data;
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    // 点击创建模型按钮
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // 点击编辑模型按钮
    handleUpdate(row) {
      this.modelTemp = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // 点击删除模型按钮
    handleDelete(data) {
      this.$confirm("此操作将永久删除该数据模型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteModels(data).then(res => {
            this.getModels();
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
    },
    // 创建模型
    createModel() {
      addModels(this.modelTemp)
        .then(res => {
          this.dialogFormVisible = false;
          this.getModels();
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
        })
        .catch(err => {});
    },
    updateModel() {
      updateModels(this.modelTemp)
        .then(res => {
          this.dialogFormVisible = false;
          this.getModels();
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
        })
        .catch(err => {});
    },
    // 重制模型
    resetTemp() {
      this.modelTemp = {
        type: "content", // 模型类型
        name: "", // 模型名称
        description: "", // 模型备注
        isPublic: false,
        value: [
          {
            name: "数据封面",
            key: "thumbnail",
            type: "media",
            desc: "长x宽"
          },
          {
            name: "内容",
            key: "content",
            type: "rtf",
            desc: "富文本内容"
          },
          {
            name: "数据标题",
            key: "title",
            type: "text",
            desc: "数据标题"
          },
          {
            name: "数据摘要",
            key: "abstract",
            type: "text",
            desc: "数据摘要"
          }
        ]
      };
    },
    /*=====键值相关=====*/
    getKeyName(key) {
      const keyName = this.keyType.find(item => {
        if (item.value == key) return item.value == key;
      });
      return keyName.name;
    },
    // 点击新增键按钮
    handleCreateKey() {
      this.resetKeyTemp();
      this.dialogExtendVisible = true;
      this.dialogKeyStatus = "create";
      this.$nextTick(() => {
        this.$refs["dataFormKey"].clearValidate();
      });
    },
    // 点击编辑键按钮
    editKey($row, $index) {
      this.dialogKeyStatus = "update";
      this.edittingKey = $index;
      this.dialogExtendVisible = true;
      this.resetKeyTemp();
      this.keyTemp = Object.assign(this.keyTemp, $row);
      //模型bug-fixed
      if (!this.keyTemp.mixed.select) {
        this.keyTemp.mixed.select = [];
      }
      if (!this.keyTemp.mixed.thumbnailSize) {
        this.keyTemp.mixed.thumbnailSize = {
          width: 300,
          height: 300
        };
      }
    },
    // 点击删除键按钮
    deleteKey($index) {
      this.modelTemp.value.splice($index, 1);
    },
    // 添加键操作
    createKey() {
      let newKeyTemp = Object.assign({}, this.keyTemp);
      // 查重
      const _index = this.modelTemp.value.findIndex(item => {
        return item.key == newKeyTemp.key;
      });
      if (_index >= 0) {
        this.$notify({
          title: "delete",
          message: "该键名已存在",
          type: "error",
          duration: 2000
        });
        return;
      }
      // 删除多余数据
      if (newKeyTemp.type == "checkbox" || newKeyTemp.type == "select") {
        delete newKeyTemp.mixed.thumbnailSize;
      } else if (newKeyTemp.type == "image") {
        delete newKeyTemp.mixed.select;
      } else {
        delete newKeyTemp.mixed.thumbnailSize;
        delete newKeyTemp.mixed.select;
      }
      this.modelTemp.value.push(newKeyTemp);
      this.resetKeyTemp();
      this.dialogExtendVisible = false;
    },
    // 更新键操作
    updateKey() {
      let newKeyTemp = Object.assign({}, this.keyTemp);
      // 数据调整
      if (newKeyTemp.type == "checkbox" || newKeyTemp.type == "select") {
        delete newKeyTemp.mixed.thumbnailSize;
      } else if (newKeyTemp.type == "image") {
        delete newKeyTemp.mixed.select;
      } else {
        delete newKeyTemp.mixed.thumbnailSize;
        delete newKeyTemp.mixed.select;
      }
      // 更新键值
      this.modelTemp.value.splice(this.edittingKey, 1, newKeyTemp);
      // this.$notify({
      //   title: 'success',
      //   message: '修改成功',
      //   type: 'success',
      //   duration: 2000
      // })
      this.dialogExtendVisible = false;
      return;
    },
    // 重置键模型
    resetKeyTemp() {
      this.keyTemp = {
        key: "",
        name: "",
        type: "",
        description: "",
        mixed: {
          thumbnailSize: {
            width: 300,
            height: 300
          },
          select: []
        }
      };
    },
    /*=====选项列表相关======*/
    // 添加选项列表
    addKeySelect() {
      let newSelectTemp = Object.assign({}, this.selectTemp);
      if (!this.keyTemp.mixed.select) {
        this.keyTemp.mixed.select = [];
      }
      this.keyTemp.mixed.select.push(newSelectTemp);
      this.resetSelectTemp();
    },
    // 删除选项列表
    deleteKeySelect($index) {
      this.keyTemp.mixed.select.splice($index, 1);
    },
    // 重置选项列表模型
    resetSelectTemp() {
      this.selectTemp = {
        name: "",
        value: ""
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.model-table {
  width: 100%;
  table-layout: fixed;

  td {
    padding: 6px;
  }
}

.selectTempForm {
  background: #eee;
  padding: 20px 10px 10px;
}
</style>
