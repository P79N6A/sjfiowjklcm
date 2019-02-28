<template>
  <div class="components-contain">
    <div class="ishow-headerWrapper">
      <header class="header">系统组件库
        <div class="ishow-headerBtn">
          <el-button size="small" @click.stop="handleAdd">新建组件</el-button>
        </div>
      </header>
    </div>
    <div class="ishowList cfx">
      <div class="frames" v-for="(item,i) in componentList" :key="i">
        <h4>{{item.name}}</h4>
        <div class="frames-content">
          <sync-component :url="`${cdnurl}${item.src}`"></sync-component>
          <!-- <img :src="item.screenShot" style="display:block;width:100%;"> -->
          <div class="control">
            <!-- 操作按钮区域 -->
            <el-button-group>
              <el-button type="primary" round @click="handleEdit(item);">编辑</el-button>
              <el-button type="danger" round @click="handleDelete(item)">删除</el-button>
            </el-button-group>
          </div>
        </div>
      </div>
    </div>
    <!-- 创建组件 -->
    <el-dialog
      :title="textMap[dialogStatus]+'组件'"
      :visible.sync="dialogFormVisible"
      width="800px"
      :close-on-click-modal="false"
    >
      <el-form ref="dataFormKey" :model="componentTemp" label-position="right" label-width="120px">
        <el-form-item label="*系统组件" prop="isSystem">
          <el-switch
            v-model="componentTemp.isSystem"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
        <el-form-item label="*组件名称" prop="name">
          <el-input v-model="componentTemp.name"/>
        </el-form-item>
        <el-form-item label="*适用终端" prop="device">
          <el-select v-model="componentTemp.device" placeholder="请选择适用终端" disabled>
            <el-option label="PC端" value="pc"></el-option>
            <el-option label="MOBILE端" value="MOBILE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*组件类型" prop="type">
          <el-cascader :options="options" v-model="selectedOptions2" @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="组件描述" prop="description">
          <el-input
            v-model="componentTemp.description"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
          ></el-input>
        </el-form-item>

        <hr>
        <el-form-item label="配置数据模型" prop="configModel">
          <el-select v-model="componentTemp.configModel" placeholder="请选择数据模型">
            <el-option
              :label="item.name"
              :value="item._id"
              v-for="item in modelList"
              :key="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据集模型" prop="categoryModel">
          <el-select v-model="componentTemp.categoryModel" placeholder="请选择数据模型">
            <el-option label="无数据集" value></el-option>
            <el-option
              :label="item.name"
              :value="item._id"
              v-for="item in modelList"
              :key="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组件源码" prop="vue">
          <el-input
            v-model="componentTemp.vue"
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 10}"
          ></el-input>
        </el-form-item>

        <el-form-item label="组件dist" prop="dist">
          <el-input
            v-model="componentTemp.dist"
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 10}"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- <div class="preview" v-if="componentTemp.src">
        <sync-component :url="`${cdnurl}${componentTemp.src}`"></sync-component>
      </div>-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createComponent():updateComponent()"
        >
          {{
          $t('table.confirm')}}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import SyncComponent from "vue-async-component";
import { mapGetters } from "vuex";
import {
  getComponents,
  addComponents,
  updateComponents,
  deleteComponents
} from "@/api/components";
import { getModels } from "@/api/model";
export default {
  data() {
    return {
      pageSize: 30,
      pageNum: 1,
      dialogFormVisible: false,
      dialogPreviewVisible: false,
      dialogVisible: false,
      loading: false,
      isthumbnail: false,
      contentKey: null,
      contentTemp: null,
      modelTemp: null,
      categoryTemp: null,
      componentTemp: {
        isSystem: false,
        device: "pc",
        type: "",
        class: "",
        key: "",
        thumbnail: {
          src: "",
          _id: ""
        },
        name: "",
        description: "",
        // 源码
        vue: "",
        dist: "",
        // 数据相关
        categoryModel: "", // 数据集和模型
        configModel: "" // 组件配置模型
      },
      componentList: [],
      categoryList: [],
      modelList: [],
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "创建"
      },
      options: [
        {
          value: "view",
          label: "展示型组件",
          children: [
            {
              value: "text",
              label: "文本"
            },
            {
              value: "img",
              label: "图片"
            },
            {
              value: "imgtext",
              label: "图文"
            }
          ]
        },
        {
          value: "func",
          label: "功能型组件",
          children: [
            {
              value: "user",
              label: "用户相关",
              children: [
                {
                  value: "login",
                  label: "登陆"
                },
                {
                  value: "register",
                  label: "注册"
                },
                {
                  value: "findback",
                  label: "找回密码"
                },
                {
                  value: "datumn",
                  label: "完善资料"
                },
                {
                  value: "bank",
                  label: "银行卡"
                },
                {
                  value: "pwd",
                  label: "登录密码"
                },
                {
                  value: "payword",
                  label: "支付密码"
                }
              ]
            },
            {
              value: "money",
              label: "金流相关",
              children: [
                {
                  value: "deposit",
                  label: "存款"
                },
                {
                  value: "withdraw",
                  label: "提款"
                },
                {
                  value: "transfer",
                  label: "转账"
                }
              ]
            }
          ]
        }
      ],
      selectedOptions2: ""
    };
  },
  components: {
    // picTool
    SyncComponent
  },
  created() {
    this.getComponents();
    // this.fetchImgList().then(function(data){
    //     this.$refs.picTool.setLoading(false);
    // }.bind(this));
  },
  methods: {
    handleChange(value) {
      this.componentTemp.type = value[0] || "";
      this.componentTemp.class = value[1] || "";
      this.componentTemp.key = value[2] || "";
    },
    // 查询数据模型列表
    getModels() {
      this.listLoading = true;
      getModels({
        type: "content"
      })
        .then(res => {
          this.modelList = res.data;
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
        });
    },

    // 获取组件列表
    getComponents() {
      getComponents().then(response => {
        if (response.data && response.data.length) {
          this.componentList = response.data;
        }
      });
    },
    // 重置表单
    resetTemp() {
      this.componentTemp = {
        isSystem: false,
        device: "pc",
        type: "",
        class: "",
        key: "",
        thumbnail: {
          src: "",
          _id: ""
        },
        name: "",
        description: "",
        // 源码
        vue: "",
        dist: "",
        // 数据相关
        categoryModel: "", // 数据集和模型
        configModel: "" // 组件配置模型
      };
    },
    // 创建组件
    createComponent() {
      addComponents(this.componentTemp)
        .then(res => {
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
          this.dialogFormVisible = false;
          this.getComponents();
        })
        .catch(err => {});
    },
    // 更新组件
    updateComponent() {
      updateComponents(this.componentTemp)
        .then(res => {
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
          this.getComponents();
          this.dialogFormVisible = false;
        })
        .catch(err => {});
    },
    // 添加点击事件
    handleAdd() {
      this.getModels();
      this.dialogStatus = "create";
      this.resetTemp();
      this.dialogFormVisible = true;
    },
    // 编辑点击事件
    handleEdit(row) {
      this.getModels();
      this.dialogStatus = "update";
      this.resetTemp();
      Object.assign(this.componentTemp, row);
      console.log(this.componentTemp);
      console.log(
        this.componentTemp.type,
        this.componentTemp.class,
        this.componentTemp.key
      );
      this.selectedOptions2 = [
        this.componentTemp.type,
        this.componentTemp.class,
        this.componentTemp.key
      ];

      this.dialogFormVisible = true;
    },
    // 删除点击事件
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteComponents({
            _id: row._id
          }).then(res => {
            this.getComponents();
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
    }
  },
  computed: {
    ...mapGetters(["cdnurl"])
  }
};
</script>
<style lang="scss" scope>
.components-contain {
  .ishowList {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;

    .frames {
      text-align: center;
      padding: 6px;
      cursor: pointer;

      &.active {
        .frames-content {
          border-color: #409eff;
          box-shadow: 0 0 4px 2px #ccc;
        }
      }

      .rows {
        background: #eee;
        margin-bottom: 2px;
      }

      .frames-content {
        padding: 6px;
        display: block;
        border: solid 1px #ccc;
        border-radius: 6px;
        font-size: 12px;
        transition: all 0.6s;
        height: 200px;
        width: 200px;
        overflow: hidden;
        position: relative;

        &:hover {
          overflow-y: scroll;

          .control {
            opacity: 1;
          }
        }

        .control {
          position: absolute;
          z-index: 999;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.3);
          opacity: 0;
          transition: all 0.4s;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .cols {
        padding: 2px;
        box-sizing: border-box;

        div {
          border: dashed 1px #ccc;
          padding: 2px 0;
        }
      }
    }
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

  .preview {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    background-image: linear-gradient(
        45deg,
        #eee 25%,
        transparent 0,
        transparent 75%,
        #eee 0
      ),
      linear-gradient(45deg, #eee 25%, transparent 0, transparent 75%, #eee 0);
    background-position: 0 0, 15px 15px;
    background-size: 30px 30px;
    padding: 10px;
    > div {
      flex: 1;
    }
  }
}
</style>
