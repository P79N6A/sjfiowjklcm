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
        <div>
          <!-- 操作按钮区域 -->
          <el-button-group>
            <el-button type="primary" round icon="el-icon-edit" @click="handleEdit(item);">编辑</el-button>
            <el-button type="danger" round icon="el-icon-delete" @click="handleDelete(item)">删除</el-button>
          </el-button-group>
        </div>
        <div>{{item.name}}</div>
        <br>
        <div class="frames-content">
          封面预览，未做
          <img :src="item.screenShot" style="display:block;width:100%;">
        </div>
      </div>
    </div>
    <!-- 创建组件 -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="800px"
      :close-on-click-modal="false"
    >
      <el-form ref="dataFormKey" :model="componentTemp" label-position="right" label-width="120px">
        <el-form-item label="*组件名称" prop="name">
          <el-input v-model="componentTemp.name"/>
        </el-form-item>
        <el-form-item label="*适用终端" prop="device">
          <el-select v-model="componentTemp.device" placeholder="请选择适用终端">
            <el-option label="PC端" value="pc"></el-option>
            <el-option label="MOBILE端" value="MOBILE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*数据来源" prop="dataType">
          <el-radio-group v-model="componentTemp.dataType" @change="checkList">
            <el-radio
              :label="item.value"
              v-for="item in dataTypeList"
              :key="item.value"
            >{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="数据集合" prop="device" v-if="componentTemp.dataType=='categories'">
          <el-select v-model="componentTemp.category" placeholder="请选择数据集合">
            <el-option
              :label="item.name"
              :value="item._id"
              v-for="item in categoryList"
              :key="item._id"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="数据模型" prop="device">
          <el-select v-model="componentTemp.model" placeholder="请选择数据模型">
            <el-option
              :label="item.name"
              :value="item._id"
              v-for="item in modelList"
              :key="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="编辑数据" v-if="dialogStatus=='update'">
          <el-button v-if="componentTemp.dataDetail">编辑数据</el-button>
          <el-button v-else @click="handleAddData">添加数据</el-button>
        </el-form-item>-->
        <el-form-item label="组件描述" prop="description">
          <el-input
            v-model="componentTemp.description"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
          ></el-input>
        </el-form-item>

        <el-form-item label="组件script" prop="script">
          <el-input
            v-model="componentTemp.script"
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 20}"
          ></el-input>
        </el-form-item>

        <el-form-item label="组件css" prop="css">
          <el-input
            v-model="componentTemp.css"
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 20}"
          ></el-input>
        </el-form-item>

        <el-form-item label="组件html" prop="html">
          <el-input
            v-model="componentTemp.html"
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 20}"
          ></el-input>
        </el-form-item>

        <el-form-item label="组件dist" prop="dist">
          <el-input
            v-model="componentTemp.dist"
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 20}"
          ></el-input>
        </el-form-item>
      </el-form>
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
import { mapGetters } from "vuex";
import {
  getComponents,
  addComponents,
  updateComponents,
  deleteComponents
} from "@/api/components";
import { getModels } from "@/api/model";

import { getCategories } from "@/api/categories";
export default {
  data() {
    return {
      pageSize: 30,
      pageNum: 1,
      dialogFormVisible: false,
      dialogVisible: false,
      loading: false,
      isthumbnail: false,
      contentKey: null,
      contentTemp: null,
      modelTemp: null,
      categoryTemp: null,
      componentTemp: {
        device: "pc",
        type: "system",
        thumbnail: {
          src: "",
          _id: ""
        },

        name: "",
        description: "",
        // 源码
        script: "",
        css: "",
        html: "",
        dist: "",
        // 数据相关
        dataType: "",
        // category: "", // 集合
        model: "" // 模型
        // content: ""
      },

      componentList: [],
      categoryList: [],
      modelList: [],
      dataTypeList: [
        { name: "数据集合", value: "categories" },
        { name: "单个数据", value: "contents" }
      ],
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "创建"
      }
    };
  },
  components: {
    // picTool
  },
  created() {
    this.getComponents();
    // this.fetchImgList().then(function(data){
    //     this.$refs.picTool.setLoading(false);
    // }.bind(this));
  },
  methods: {
    // 数据类型切换
    checkList() {
      console.log(this.componentTemp.dataType);
      if (this.componentTemp.dataType == "categories") {
        this.getCategories();
      } else if (this.componentTemp.dataType == "contents") {
        this.getModels();
      }
    },
    // 查询数据模型列表
    getModels() {
      this.listLoading = true;
      getModels({ type: "content" })
        .then(res => {
          this.modelList = res.data;
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    // 获取数据集列表
    getCategories() {
      getCategories({
        type: "content"
      })
        .then(res => {
          this.categoryList = res.data;
        })
        .catch(err => {});
    },
    // 获取组件列表
    getComponents() {
      getComponents().then(response => {
        if (response.data && response.data.length) {
          this.componentList = response.data;
        }
      });
    },
    resetTemp() {
      this.componentTemp = {
        device: "pc",
        type: "system",
        thumbnail: {
          src: "",
          _id: ""
        },
        name: "",
        description: "",
        // 源码
        script: "",
        css: "",
        html: "",
        dist: "",
        // 数据相关
        dataType: "",
        // category: "",
        model: ""
        // content: ""
      };
    },
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
    // 添加
    handleAdd() {
      this.dialogStatus = "create";
      this.getCategories();
      this.resetTemp();
      this.dialogFormVisible = true;
    },
    handleEdit(row) {
      this.dialogStatus = "update";
      this.getCategories();
      this.resetTemp();
      Object.assign(this.componentTemp, row);
      this.dialogFormVisible = true;
    },
    // 删除
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
      width: 25%;
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
        overflow: hidden;

        &:hover {
          overflow-y: scroll;
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
}
</style>
