<!-- <meta name="viewport" id="viewport" content="width=320, initial-scale=1.2875, maximum-scale=1.2875, user-scalable=no"> -->
<template>
  <div class="ishow-contain">
    <div class="ishow-headerWrapper">
      <header class="header">自定义组件库
        <div class="ishow-headerBtn">
          <el-button size="small" @click.stop="linkNewSence">新建组件</el-button>
        </div>
      </header>
    </div>
    <div class="ishowList cfx">
      <div class="frames" v-for="(item,i) in activityList" :key="i">
        <h4>{{item.name}}</h4>
        <div class="frames-content">
                      <ishow-pre :ishow-id="item._id"></ishow-pre>
          <div class="control">
            <el-button-group>
              <el-button type="primary" round @click="handleEdit(item);">编辑</el-button>
              <el-button type="danger" round @click="handleDelete(item)">删除</el-button>
            </el-button-group>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="ishowList cfx">
      <div class="frames" v-for="(item,i) in activityList" :key="i">
        <div>
          <el-button-group>
            <el-button type="primary" round icon="el-icon-edit" @click="handleEdit(item);">编辑</el-button>
            <el-button type="danger" round icon="el-icon-delete" @click="handleDelete(item)">删除</el-button>
          </el-button-group>
        </div>
        <div>{{item.name}}</div>
        <br>
        <div class="frames-content">
                      <ishow-pre :ishow-id="item._id"></ishow-pre>
        </div>
      </div>
    </div> -->
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
import IshowPre from "./preview";
// import picTool from '@/views/ishow/global/picTool/index.vue';
export default {
  data() {
    return {
      pageSize: 30,
      pageNum: 1,
      dialogVisible: false,
      settingForm: {
        settingTitle: "",
        settingSummary: "",
        settingPic: ""
      },
      activityId: "",
      activityList: [],
      ruleState: {
        settingTitle: [
          { required: true, message: "标题不能为空", trigger: "blur" }
        ],
        settingSummary: [
          { required: true, message: "简介不能为空", trigger: "blur" }
        ]
      },
      picJson: [],
      // settingForm.settingPic:'',
      loading: false
    };
  },
  components: {
    // picTool
    IshowPre
  },
  created() {
    this.getIshows();
    // this.fetchImgList().then(function(data){
    //     this.$refs.picTool.setLoading(false);
    // }.bind(this));
  },
  methods: {
    handleEdit(item) {
      let routeData = this.$router.resolve({
        name: "design",
        query: { ishowsId: item._id }
      });
      window.open(routeData.href, "_blank");
    },
    //提交表单
    submitSetting(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.fetchPageConfig();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
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
    //获取列表
    getIshows() {
      getIshows(this.pageSize, this.pageNum).then(response => {
        if (response.data && response.data.length) {
          console.info(response.data);
          this.activityList = response.data;
        }
        //console.info(response)
        //console.info(JSON.parse(response.data))
      });
    },
    //删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteIshows({
            _id: row._id
          }).then(res => {
            this.getIshows();
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
      let routeData = this.$router.resolve({ name: "design" });
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
.ishow-contain{
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
}

</style>