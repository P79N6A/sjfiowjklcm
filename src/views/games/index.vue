<template>
  <div class="app-container">
    <div>
      <span>
        <el-select v-model="filterData.device" placeholder="请选择终端类型">
          <el-option label="PC" value="PC"></el-option>
          <el-option label="MOBILE" value="MOBILE"></el-option>
        </el-select>
      </span>
      <span>
        <el-select v-model="filterData.platform" placeholder="请选择游戏平台">
          <el-option
            :label="item.name"
            :value="item.platform"
            v-for="item in platformList"
            :key="item.platform"
          ></el-option>
        </el-select>
      </span>
      <span>
        <el-button type="warning" icon="el-icon-search">搜索</el-button>
      </span>
      <span>
        <el-button type="danger" @click="handleCreate" icon="el-icon-edit">添加</el-button>
      </span>
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
      <el-table-column label="启用的键" min-width="150px" prop="role.authorities">
        <template slot-scope="scope">
          <el-tag v-for="(item,key,i) in scope.row.system" :key="i" v-if="item">{{systemTag[key]}}</el-tag>
          <el-tag v-for="(item,i) in scope.row.extensions" :key="i" type="warning">{{ item.name }}</el-tag>
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
      :title="`游戏数据--${textMap[dialogStatus]}`"
      :visible.sync="dialogFormVisible"
      width="900px"
      :close-on-click-modal="false"
    >
      <el-form ref="dataForm" :model="gameTemp" label-position="right" label-width="80px">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>基本数据</span>
          </div>
          <table style="width:100%;">
            <tbody>
              <tr>
                <td>
                  <el-form-item label="游戏平台" prop="platform">
                    <el-select v-model="gameTemp.platform" placeholder="请选择所属平台">
                      <el-option
                        :label="item.name"
                        :value="item.platform"
                        v-for="item in platformList"
                        :key="item.platform"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="终端类型" prop="device">
                    <el-select v-model="gameTemp.device" placeholder="请选择终端类型">
                      <el-option label="PC" value="PC"></el-option>
                      <el-option label="MOBILE" value="MOBILE"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="ID" prop="id">
                    <el-input v-model="gameTemp.id"/>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="CODE" prop="code">
                    <el-input v-model="gameTemp.code"/>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="moduleid" prop="moduleid" v-if="gameTemp.platform=='MG'">
                    <el-input v-model="gameTemp.moduleid"/>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="MG品牌" prop="mgself" v-if="gameTemp.platform=='MG'">
                    <el-switch
                      v-model="gameTemp.mgself"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="是"
                      inactive-text="否"
                    ></el-switch>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="gameName" prop="gameName" v-if="gameTemp.platform=='TTG'">
                    <el-input v-model="gameTemp.gameName"/>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="gameType" prop="gameType" v-if="gameTemp.platform=='TTG'">
                    <el-input v-model="gameTemp.gameType"/>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="中文名称" prop="name">
                    <el-input v-model="gameTemp.name"/>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="英文名称" prop="eName">
                    <el-input v-model="gameTemp.eName"/>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="在线状态" prop="online">
                    <el-switch
                      v-model="gameTemp.online"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="是"
                      inactive-text="否"
                    ></el-switch>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="支持试玩" prop="try">
                    <el-switch
                      v-model="gameTemp.try"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="是"
                      inactive-text="否"
                    ></el-switch>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <el-form-item label="封面" prop="thumbnail">
                    <el-upload
                      class="avatar-uploader"
                      action="/api/media"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                    >
                      <a
                        v-if="gameTemp.thumbnail&&gameTemp.src"
                        @click="beforeClick('thumbnail',true,true)"
                        class="img-view"
                        style="width:120px;height:120px;display:block;"
                        :style="`background-image:url(${cdnurl}${gameTemp.src});`"
                      >
                        <div class="upload-icon">
                          <i class="el-icon-plus"></i>
                        </div>
                      </a>
                      <i
                        v-else
                        class="el-icon-plus avatar-uploader-icon"
                        @click="beforeClick('thumbnail',true,true)"
                      ></i>
                    </el-upload>
                    <div class="file-info" v-if="gameTemp.thumbnail&&gameTemp.src">
                      <p v-if="gameTemp.thumbnail.src">
                        <a target="_blank" :href="`${cdnurl}${gameTemp.thumbnail.src}`">
                          <i class="el-icon-picture"></i>
                          &nbsp;&nbsp;查看原图{{gameTemp.thumbnail.fileName}}
                        </a>
                      </p>
                    </div>
                  </el-form-item>
                </td>
              </tr>
            </tbody>
          </table>
        </el-card>
        <br>
        <br>

        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>扩展键</span>
          </div>
          <div class="items">
            <el-table
              :data="gameTemp.extensions"
              border
              fit
              highlight-current-row
              style="width: 100%;"
            >
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
  </div>
</template>

<script>
import { getModels, addModels, deleteModels, updateModels } from "@/api/model";
import { getGames } from "@/api/games";
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
      filterData: {
        device: "",
        platform: ""
      },
      platformList: [
        {
          platform: "PT",
          name: "PT老虎机"
        },
        {
          platform: "PT2TIGER",
          name: "PT老虎机(新)"
        },
        {
          platform: "DT",
          name: "DT老虎机"
        },
        {
          platform: "MG",
          name: "MG老虎机"
        },
        {
          platform: "QT",
          name: "QT老虎机"
        },
        {
          platform: "TTG",
          name: "TTG老虎机"
        },
        {
          platform: "NT",
          name: "NT老虎机"
        },
        {
          platform: "PNG",
          name: "PNG老虎机"
        },
        {
          platform: "SW",
          name: "SW老虎机"
        },
        {
          platform: "TGP",
          name: "申博老虎机"
        },
        {
          platform: "CQ9",
          name: "CQ9老虎机"
        },
        {
          platform: "RTG",
          name: "RTG老虎机"
        },
        {
          platform: "AMEBA",
          name: "AMEBA老虎机"
        },
        {
          platform: "PG",
          name: "PG老虎机"
        },
        {
          platform: "MWSLOT",
          name: "MWSLOT老虎机"
        },
        {
          platform: "MWQP",
          name: "MW棋牌"
        },
        {
          platform: "BBSLOT",
          name: "BBSLOT老虎机"
        },
        {
          platform: "YGG",
          name: "YGG老虎机"
        },
        {
          platform: "JDBSLOT",
          name: "JDB老虎机"
        },
        {
          platform: "JDBFISH",
          name: "JDB捕鱼"
        }
      ],
      modelList: null,
      systemTag: {
        // 系统自带键
        abstract: "摘要",
        content: "内容",
        tags: "标签",
        thumbnail: "缩略图"
      },
      gameTemp: {
        type: "content", // 模型类型
        name: "", // 模型名称
        description: "", // 模型备注
        extensions: [], // 扩展键
        mixed: {
          // 封面配置
          thumbnailSize: {
            width: 400,
            height: 300
          }
        },
        // 系统键
        system: {
          thumbnail: true, // 封面
          abstract: true, // 摘要
          content: true, // 内容
          tags: true // 标签
        }
      },
      selectTemp: {
        // 多选，下拉模型
        name: "",
        value: ""
      },
      // 新键模型
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
          name: "数字框",
          value: "number"
        },
        {
          name: "日期输入框",
          value: "date"
        },
        {
          name: "文本域",
          value: "textarea"
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
          name: "文件上传框",
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
    this.getGames({});
  },
  methods: {
    /*=========模型相关=========*/
    // 查询用户列表
    getGames() {
      this.listLoading = true;
      getGames({ type: "content" })
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
      this.gameTemp = Object.assign({}, row); // copy obj
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
            this.getGames();
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
      addModels(this.gameTemp)
        .then(res => {
          this.dialogFormVisible = false;
          this.getGames();
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
      updateModels(this.gameTemp)
        .then(res => {
          this.dialogFormVisible = false;
          this.getGames();
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
      this.gameTemp = {
        type: "content", // 模型类型
        name: "", // 模型名称
        description: "", // 模型备注
        extensions: [], // 扩展键
        mixed: {
          // 封面配置
          thumbnailSize: {
            width: 400,
            height: 300
          }
        },
        // 系统键
        system: {
          thumbnail: true, // 封面
          abstract: true, // 摘要
          content: true, // 内容
          tags: true // 标签
        }
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
      this.gameTemp.extensions.splice($index, 1);
    },
    // 添加键操作
    createKey() {
      let newKeyTemp = Object.assign({}, this.keyTemp);
      // 查重
      const _index = this.gameTemp.extensions.findIndex(item => {
        return item.key == newKeyTemp.key;
      });
      if (_index >= 0 || this.systemTag[newKeyTemp.key]) {
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
      this.gameTemp.extensions.push(newKeyTemp);
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
      this.gameTemp.extensions.splice(this.edittingKey, 1, newKeyTemp);
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
  .img-view {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: #eee;
    width: 60px;
    height: 60px;
    display: inline-block;
    line-height: 2;
  }
  .img-view {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: #eee;
    width: 60px;
    height: 60px;
    display: inline-block;
    line-height: 2;
    &:hover {
      .upload-icon {
        background: none;
      }
    }
    .upload-icon {
      background: rgba(0, 0, 0, 0.1);
      transition: all 0.4s;
      color: #409eff;
      height: 100%;
      line-height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-icon-plus {
        font-size: 50px;
        font-weight: bold;
        width: 120px;
        height: 120px;
        line-height: 120px;
      }
    }
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
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

  .favicon {
    height: 90px;
    display: block;
  }
}
</style>
