<template>
  <div class="content-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin:10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        {{
        $t('table.add') }}
      </el-button>
      <el-button type="danger" @click="handleSort">保存排序</el-button>
      <span style="float:right;" v-if="categoryTemp">数据集合:{{categoryTemp.name}}</span>
    </div>
    {{modelTemp}}
    <el-table
      v-loading="listLoading"
      :data="contentList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      v-if="modelTemp"
    >
      <el-table-column fixed :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
      <!-- 渲染扩展字段 -->
      <el-table-column
        :label="extend.name"
        align="center"
        v-for="(extend,i) in modelTemp.value"
        :key="i"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.value[extend.key]&&(extend.type=='media'||extend.type=='image')">
            <!-- 普通多媒体 -->
            <el-tooltip
              v-if="extend.type=='media'&&scope.row.value[extend.key].src"
              class="item"
              effect="dark"
              content="访问源文件"
              placement="top-start"
            >
              <a
                target="_blank"
                :href="`${cdnurl}${scope.row.value[extend.key].src}`"
                style="text-align:center;cursor:pointer;margin:0 auto;display:inline-block;width:100%;"
              >
                <svg-icon icon-class="documentation"/>
                <!-- {{scope.row.value[extend.key]}} -->
                {{scope.row.value[extend.key].fileName}}
              </a>
            </el-tooltip>
            <!-- 图片 -->
            <el-tooltip
              v-else-if="extend.type=='image'&&scope.row.value[extend.key].src"
              class="item"
              effect="dark"
              content="访问源文件"
              placement="top-start"
            >
              <a
                target="_blank"
                :href="`${cdnurl}${scope.row.value[extend.key].src}`"
                class="img-view"
                :style="`background-image:url('${cdnurl}${scope.row.value[extend.key].src}');`"
              ></a>
            </el-tooltip>
          </div>
          <div v-else>
            <!-- 富文本 -->
            <el-tooltip
              v-if="extend.type=='rtf'"
              class="item"
              effect="dark"
              content="点击查看内容"
              placement="top-start"
            >
              <span
                @click="hadleView(scope.row.value[extend.key])"
                style="text-align:center;cursor:pointer;margin:0 auto;display:inline-block;width:100%;"
              >
                <svg-icon icon-class="documentation"/>
              </span>
            </el-tooltip>
            <!-- 文本域 -->
            <el-tooltip
              v-if="extend.type=='textarea'"
              class="item"
              effect="dark"
              content="点击查看内容"
              placement="top-start"
            >
              <span
                @click="hadleView(scope.row.value[extend.key])"
                style="text-align:center;cursor:pointer;margin:0 auto;display:inline-block;width:100%;"
              >
                <svg-icon icon-class="documentation"/>
              </span>
            </el-tooltip>
            <!-- 颜色 -->
            <el-tooltip
              v-else-if="extend.type=='color'"
              class="item"
              effect="dark"
              :content="scope.row.value[extend.key]"
              placement="top-start"
            >
              <span
                style="display:block;padding:4px;border-radius:6px;width:100%;height:30px;"
                :style="{background:scope.row.value[extend.key]}"
              ></span>
            </el-tooltip>
            <!-- 时间 -->
            <div
              v-else-if="extend.type=='date'"
            >{{scope.row.value[extend.key]| parseTime('{y}-{m}-{d} {h}:{i}')}}</div>
            <!-- 其他文本 -->
            <div v-else>{{scope.row.value[extend.key]}}</div>
          </div>
        </template>
      </el-table-column>
      <!-- 操作部分 -->
      <el-table-column
        fixed="right"
        :label="$t('table.actions')"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="编辑该数据" placement="top-start">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除该数据" placement="top-start">
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
    <!-- 内容编辑弹窗,必须用v-if，促发文本域编辑器的重新渲染，可能会有其他问题，后续排查 -->
    <!-- 文本预览 -->
    <el-dialog title="内容域预览" :visible.sync="dialogViewVisible" width="1300px">
      <el-tabs type="border-card" v-model="tabActive">
        <el-tab-pane name="device_pc">
          <span slot="label">
            <i class="el-icon-date"></i> 电脑模式预览
          </span>
          <div class="mac">
            <div class="color-picker">
              <div>预览背景</div>
              <el-color-picker v-model="backColor" size="medium"></el-color-picker>
            </div>
            <div class="content" :style="{backgroundColor:backColor}">
              <iframe :ref="`device_pc`" width="100%" height="100%" src frameborder="0"></iframe>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane name="device_mobile">
          <span slot="label">
            <i class="el-icon-date"></i> 手机模式预览
          </span>
          <div class="iphone">
            <div class="color-picker">
              <span class="color-text">预览背景</span>
              <el-color-picker v-model="backColor" size="mini"></el-color-picker>
            </div>
            <div class="content" :style="{backgroundColor:backColor}">
              <iframe :ref="`device_mobile`" width="460" height="100%" src frameborder="0"></iframe>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getContents,
  deleteContents,
  updateContents,
  sortComponents
} from "@/api/contents";
import { getAuthorities } from "@/api/authorities";
import { getCategoryOne } from "@/api/categories";
import waves from "@/directive/waves"; // Waves directive
import Sortable from "sortablejs";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}
export default {
  name: "ComplexTable",
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
      // categoryTemp: {
      //   model: "",
      //   name: "",
      //   path: "",
      //   description: ""
      // },

      categoryTemp: null,
      contentTemp: null,
      modelTemp: null,
      total: 0,
      listQuery: {
        _id: this.$route.query.categoryId,
        currentPage: "1",
        pageSize: "20"
      },
      listLoading: true,
      dialogFormVisible: false,
      dialogViewVisible: false,
      tabActive: "",
      viewContent: "内容预览",
      backColor: "#f7f8fb",
      dialogStatus: "",
      isthumbnail: false,
      contentKey: null,
      mustImg: false,
      textMap: {
        update: "Edit",
        create: "Create"
      }
    };
  },
  created() {
    // 读取数据列表
    this.getContents();
    // 读取数据模型
    this.getCategoryOne();
  },
  methods: {
    // 查询数据分类列表
    getContents() {
      this.listLoading = true;
      getContents(this.listQuery)
        .then(res => {
          this.contentList = res.data.contents;
          this.listLoading = false;
          this.$nextTick(() => {
            this.setSort();
          });
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    // 重置表单模型
    resetContentTemp() {
      let _obj = {};
      _obj.category = this.categoryTemp._id;
      _obj.value = {};
      // 遍历扩展的数据类型
      for (let i = 0; i < this.modelTemp.value.length; i++) {
        if (this.modelTemp.value[i].type == "checkbox") {
          // 多选框
          _obj.value[this.modelTemp.value[i].key] = [];
        } else if (
          this.modelTemp.value[i].type == "media" ||
          this.modelTemp.value[i].type == "image"
        ) {
          // 文件上传框
          _obj.value[this.modelTemp.value[i].key] = {
            _id: "",
            fileName: "",
            src: ""
          };
        } else {
          _obj.value[this.modelTemp.value[i].key] = "";
        }
      }
      console.log(_obj);
      // 数据原始模版，处理完毕
      this.contentTemp = _obj;
    },
    // 重组提交前的数据
    setPostData() {
      this.contentTemp.media = [];
      // 把文件类型的_id提取处理
      // if (this.contentTemp.thumbnail && this.contentTemp.thumbnail._id) {
      //   this.contentTemp.thumbnail = this.contentTemp.thumbnail._id;
      // }
      // 遍历扩展数据的文件
      for (var key in this.contentTemp.value) {
        if (this.contentTemp.value[key]._id) {
          this.contentTemp.media.push(this.contentTemp.value[key]._id);
        }
        // if(!this.contentTemp.value[key]){
        //   delete this.contentTemp.value[key]
        // }
      }
      console.log(this.contentTemp);
    },
    // 获取当前数据集合的数据
    getCategoryOne() {
      getCategoryOne({
        _id: this.$route.query.categoryId
      })
        .then(res => {
          // 保存数据模型
          this.modelTemp = res.data.model;
          // 保存数据集
          this.categoryTemp = res.data;
          // 保存表单模型
          this.resetContentTemp();
        })
        .catch(err => {});
    },
    // 点击创建按钮
    handleCreate() {
      this.resetContentTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    // 点击编辑按钮
    handleUpdate(row) {
      this.resetContentTemp();
      _.mergeWith(this.contentTemp, row, customizer);
      if (this.contentTemp.tags) {
        this.contentTemp.tags = this.contentTemp.tags.join(" ");
      }
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataFormTemp"].clearValidate();
        this.$refs["dataFormTempExtend"].clearValidate();
      });
    },
    // 更新操作
    updateContents() {
      console.log(this.contentTemp);
      // return;
      updateContents(this.contentTemp)
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
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteContents(data).then(res => {
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
    },
    // bug-fixed，为了文件上传后，设置图片封面预览
    beforeClick(key, isthumbnail, mustImg) {
      if (isthumbnail) {
        this.isthumbnail = true;
      } else {
        this.isthumbnail = false;
        this.contentKey = key;
      }
      if (mustImg) {
        this.mustImg = true;
      } else {
        this.mustImg = false;
      }
    },
    // 文件上传成功后
    handleAvatarSuccess(res, file) {
      if (this.isthumbnail) {
        this.contentTemp.thumbnail = {
          _id: res._id,
          fileName: file.name,
          src: res.src
        };
      } else {
        this.contentTemp.value[this.contentKey] = {
          _id: res._id,
          fileName: file.name,
          src: res.src
        };
      }
      // this.siteInfo.value.favicon = res.src;
    },
    // 预览
    hadleView(content) {
      this.dialogViewVisible = true;
      this.viewContent = `<link href="/static/css/scroll.css" rel="stylesheet"></link>${content}`;
      this.tabActive = "device_pc";
    },
    // 文件上传前
    beforeAvatarUpload(file) {
      const isImg = file.type.includes("image");
      if (this.mustImg && !isImg) {
        this.$message.error("只能上传图片类型文件!");
      }
      return (this.mustImg && isImg) || !this.mustImg;
    },
    // 预览iframe
    setiframe(iframe, content) {
      this.$nextTick(() => {
        let ifrm = this.$refs[iframe];
        const doc = ifrm.contentDocument
          ? ifrm.contentDocument
          : ifrm.contentWindow.document;
        doc.open();
        doc.write(content);
        doc.body.style["overflow"] = "hidden";
        doc.body.style["margin"] = 0;
        // 计算高度
        ifrm.style.height = doc.body.scrollHeight + "px";
        doc.close();
      });
    },
    // 保持排序
    handleSort() {
      let sortOps = [];
      for (let i = 0; i < this.contentList.length; i++) {
        sortOps.push({
          _id: this.contentList[i]._id,
          sort: i + 1
        });
      }
      sortComponents({ gameList: sortOps })
        .then(res => {
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
          this.getContents();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 拖拽排序
    setSort() {
      const el = document.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      Sortable.create(el, {
        ghostClass: "sortable-ghost", // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData("Text", "");
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          // 这里特殊处理，真实dom和虚拟dom，否则无法拖拽成功【有待优化】
          // 把数组根据dom的拖拽，做出新的排序
          const targetRow = this.contentList.splice(evt.oldIndex, 1)[0];
          this.contentList.splice(evt.newIndex, 0, targetRow);
          const newArray = this.contentList.slice(0);
          this.contentList = [];
          // 数据变化后再次刷新
          this.$nextTick(() => {
            this.contentList = newArray;
          });
        }
      });
    }
  },
  computed: {
    ...mapGetters(["cdnurl"])
  },
  watch: {
    // tab切换
    tabActive(val) {
      this.setiframe(val, this.viewContent);
    },
    dialogViewVisible() {
      this.setiframe(this.tabActive, this.viewContent);
    }
  }
};
</script>
<style lang="scss">
.content-container {
  padding: 20px;
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

  // mac预览
  .mac {
    background: url(./img/bg_mac.png) center center no-repeat/100% 100%;
    width: 100%;
    height: 729px;
    overflow-y: hidden;
    position: relative;
    .color-picker {
      position: absolute;
      text-align: center;
      line-height: 2;
      top: 20px;
      right: 30px;
    }
    .content {
      width: 896px;
      height: 553px;
      overflow-y: scroll;
      margin-top: 64px;
      margin-left: 167px;
      padding: 10px;
    }
    iframe {
      width: 100%;
      height: 1305px;
      margin: 0 auto;
      display: block;
    }
  }
  .iphone {
    background: url(./img/bg_iphone.png) center center no-repeat/100% 100%;
    width: 380px;
    margin: 0 auto;
    height: 729px;
    overflow-x: hidden;
    overflow-y: hidden;
    position: relative;
    .color-picker {
      position: absolute;
      text-align: center;
      top: 10px;
      left: 36px;
      vertical-align: middle;
      .color-text {
        line-height: 36px;
        vertical-align: middle;
        float: left;
        color: #eee;
        padding-right: 21px;
      }
    }
    .content {
      width: 338px;
      height: 673px;
      overflow-y: scroll;
      margin-top: 41px;
      margin-left: 20px;
      padding: 10px;
      border-radius: 0 0 20px 30px;
    }
    iframe {
      width: 100%;
      height: 1305px;
      margin: 0 auto;
      display: block;
    }
  }
}
.content-edit {
  .avatar-uploader {
    display: inline-block;
  }
  .file-info {
    vertical-align: top;
    display: inline-block;
    margin-left: 10px;
    p {
      margin: 0;
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
    &.medias {
      background-image: url(./img/ico-file.png);
      background-size: 60% auto;
    }
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
  .sortable-ghost {
    opacity: 0.8;
    // color: #fff !important;
    // background: #42b983 !important;
  }
}
</style>