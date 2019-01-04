<!-- <meta name="viewport" id="viewport" content="width=320, initial-scale=1.2875, maximum-scale=1.2875, user-scalable=no"> -->
<template>
  <div>
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
      title="创建组件"
      :visible.sync="dialogFormVisible"
      width="800px"
      :close-on-click-modal="false"
    >
      <el-form ref="dataFormKey" :model="componentTemp" label-position="right" label-width="120px">
        <el-form-item label="*组件名称" prop="name">
          <el-input v-model="componentTemp.name"/>
        </el-form-item>
        <el-form-item label="*组件终端" prop="device">
          <el-select v-model="componentTemp.device" placeholder="请选择适用终端">
            <el-option label="PC端" value="pc"></el-option>
            <el-option label="MOBILE端" value="MOBILE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*数据来源" prop="device">
          <el-select v-model="componentTemp.dataTemp" placeholder="请选择数据来源">
            <el-option
              :label="item.name"
              :value="item._id"
              v-for="item in categoryList"
              :key="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
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
        <el-button type="primary" @click="createComponent">{{ $t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getActivityList,
  getImgList,
  savePageConfig,
  getIshows,
  deleteIshows
} from "@/api/ishow";
import {
  getComponents,
  addComponents,
  deleteComponents
} from "@/api/components";
import { getCategories } from "@/api/categories";
// import picTool from '@/views/ishow/global/picTool/index.vue';
export default {
  data() {
    return {
      pageSize: 30,
      pageNum: 1,
      dialogFormVisible: false,
      // settingForm.settingPic:'',
      loading: false,
      componentTemp: {
        device: "pc",
        type: "system",
        dataTemp: "",
        thumbnail: {
          src: "",
          _id: ""
        },
        name: "",
        description: "",
        script: "",
        css: "",
        html: "",
        dist: ""
      },
      componentList: [],
      categoryList: []
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
    //保存配置
    fetchPageConfig() {
      let data = {
        id: this.activityId,
        paramJson: JSON.stringify(this.settingForm)
      };
      this.loading = true;
      savePageConfig(data)
        .then(response => {
          this.$message.success("保存成功");
          this.loading = false;
        })
        .catch(err => {
          console.info(err);
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
      getComponents(this.pageSize, this.pageNum).then(response => {
        if (response.data && response.data.length) {
          this.componentList = response.data;
        }
      });
    },
    resetTemp() {
      this.componentTemp = {
        device: "pc",
        type: "system",
        dataTemp: "",
        thumbnail: {
          src: "",
          _id: ""
        },
        name: "",
        description: "",
        script: "",
        css: "",
        html: "",
        dist: ""
      };
    },
    createComponent() {
      addComponents(this.componentTemp)
        .then(res => {
          console.log(res);
          this.getComponents();
        })
        .catch(err => {});
    },
    // 添加
    handleAdd() {
      this.getCategories();
      this.resetTemp();
      this.dialogFormVisible = true;
    },
    handleEdit(row) {
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
    },
    //复制
    copy() {},
    //打开弹层
    showLayer(json) {
      this.dialogVisible = true;
      this.settingForm.settingTitle = json.settingTitle;
      this.settingForm.settingSummary = json.settingSummary;
      this.settingForm.settingPic = json.settingPic;
      this.activityId = json.projectId;
    },
    beforeClose(done) {
      console.info(3333);
      done();
    },
    //新建场景
    linkNewSence() {
      let routeData = this.$router.resolve({
        name: "ishowsDesign"
      });
      window.open(routeData.href, "_blank");
    },
    //编辑h5
    updateH5() {},
    changePic() {
      // this.$refs.picTool.openTool(this.settingForm.settingPic);
    },
    addElementCrop(json) {
      this.settingForm.settingPic = json.url;
      console.info("addElementCrop");
    },
    //获取本地图片
    fetchImgList() {
      return getImgList()
        .then(response => {
          this.picJson = this.changeToArray(response.data);
        })
        .catch(err => {
          console.info(err);
        });
    },
    //json key 值返回
    changeToArray(json) {
      let url,
        result = [];
      for (url in json) {
        result.push(url);
      }
      return result;
    }
  }
};
</script>
<style lang="scss" scope>
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
</style>
