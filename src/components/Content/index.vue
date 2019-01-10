<template>
  <div class="content-container">
    <!-- 内容编辑弹窗,必须用v-if，促发文本域编辑器的重新渲染，可能会有其他问题，后续排查 -->
      <el-card class="box-card" hover v-if="contentTemp">
        <div slot="header" class="clearfix">
          <span>系统参数</span>
        </div>
        <el-form ref="dataFormTemp" :model="contentTemp" label-position="right" label-width="100px">
          <el-form-item label="封面" prop="thumbnail" v-if="modelTemp.system.thumbnail">
            <el-upload
              class="avatar-uploader"
              action="/api/media"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <a
                v-if="contentTemp.thumbnail&&contentTemp.thumbnail.src"
                @click="beforeClick('thumbnail',true,true)"
                class="img-view"
                style="width:120px;height:120px;display:block;"
                :style="`background-image:url(${cdnurl}${contentTemp.thumbnail.src});`"
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
            <div class="file-info" v-if="contentTemp.thumbnail&&contentTemp.thumbnail.src">
              <!-- <p v-if="contentTemp.thumbnail">文 件 名：{{contentTemp.thumbnail.fileName}}</p> -->
              <p>图片尺寸要求</p>
              <p>图片宽度：{{categoryTemp.model.mixed.thumbnailSize.width}} PX</p>
              <p>图片高度：{{categoryTemp.model.mixed.thumbnailSize.height}} PX</p>
              <p v-if="contentTemp.thumbnail.src">
                <a target="_blank" :href="`${cdnurl}${contentTemp.thumbnail.src}`">
                  <i class="el-icon-picture"></i>
                  &nbsp;&nbsp;查看原图{{contentTemp.thumbnail.fileName}}
                </a>
              </p>
            </div>
          </el-form-item>
          <el-form-item label="摘要" prop="abstract" v-if="modelTemp.system.abstract">
            <el-input v-model="contentTemp.abstract"/>
          </el-form-item>
          <el-form-item label="标签" prop="tags" v-if="modelTemp.system.tags">
            <el-input v-model="contentTemp.tags"/>
            <div>标签以空格分开</div>
          </el-form-item>
          <el-form-item label="内容" prop="content" v-if="modelTemp.system.content">
            <tinymce :height="400" v-model="contentTemp.content"/>
          </el-form-item>
        </el-form>
      </el-card>
      <br>
      <br>

      <el-card class="box-card" hover v-if="contentTemp">
        <div slot="header" class="clearfix">
          <span>扩展参数</span>
        </div>
        <el-form
          ref="dataFormTempExtend"
          :model="contentTemp"
          label-position="right"
          label-width="100px"
        >
          <el-form-item
            :label="extend.name"
            :prop="extend.key"
            v-for="(extend,i) in modelTemp.extensions"
            :key="i"
          >
            <!-- 数字输入框 -->
            <el-input-number
              controls-position="right"
              v-model="contentTemp.extensions[extend.key]"
              :placeholder="`请输入${extend.name}`"
              :min="0"
              v-if="extend.type=='number'"
            ></el-input-number>
            <!-- 日期-时间输入框 -->
            <el-date-picker
              v-model="contentTemp.extensions[extend.key]"
              :placeholder="`请输入${extend.name}`"
              type="datetime"
              v-if="extend.type=='date'"
            ></el-date-picker>
            <!-- 文本域输入框 -->
            <tinymce
              :height="400"
              v-model="contentTemp.extensions[extend.key]"
              v-if="extend.type=='textarea'"
            ></tinymce>
            <!-- 文本输入框 -->
            <el-input
              :placeholder="`请输入${extend.name}`"
              v-model="contentTemp.extensions[extend.key]"
              v-if="extend.type=='text'"
            ></el-input>
            <!-- 多选 -->
            <el-checkbox-group
              v-model="contentTemp.extensions[extend.key]"
              v-if="extend.type=='checkbox'"
            >
              <el-checkbox
                v-for="(checkbox,i) in extend.mixed.select"
                :label="checkbox.value"
                :key="i"
              >{{checkbox.name}}</el-checkbox>
            </el-checkbox-group>
            <!-- 下拉选项 -->
            <el-select
              v-model="contentTemp.extensions[extend.key]"
              :placeholder="`请选择${extend.name}`"
              v-if="extend.type=='select'"
            >
              <el-option
                v-for="(option,i) in extend.mixed.select"
                :key="i"
                :label="option.name"
                :value="option.value"
              ></el-option>
            </el-select>
            <!-- 颜色选择器 -->
            <el-color-picker
              v-model="contentTemp.extensions[extend.key]"
              v-if="extend.type=='color'"
              color-format="rgb"
              :show-alpha="true"
            ></el-color-picker>

            <el-switch
              v-if="extend.type=='switch'"
              v-model="contentTemp.extensions[extend.key]"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="是"
              inactive-text="否"
            ></el-switch>
            <!-- 文件上传框 -->
            <div v-if="extend.type=='media'">
              <el-upload
                class="avatar-uploader"
                action="/api/media"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <a
                  v-if="contentTemp.extensions[extend.key]&&contentTemp.extensions[extend.key].src"
                  @click="beforeClick(extend.key,false,false)"
                  class="img-view medias"
                  style="width:120px;height:120px;display:block;"
                >
                  <div class="upload-icon">
                    <i class="el-icon-plus"></i>
                  </div>
                </a>
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                  @click="beforeClick(extend.key,false,false)"
                ></i>
              </el-upload>
              <div
                class="file-info"
                v-if="contentTemp.extensions[extend.key]&&contentTemp.extensions[extend.key].src"
              >
                <p>{{contentTemp.extensions[extend.key].fileName}}</p>
                <p>
                  <a target="_blank" :href="`${cdnurl}${contentTemp.extensions[extend.key].src}`">
                    <i class="el-icon-picture"></i>
                    &nbsp;&nbsp;查看文件
                  </a>
                </p>
              </div>
            </div>
            <!-- 图片上传框 -->
            <div v-if="extend.type=='image'">
              <el-upload
                class="avatar-uploader"
                action="/api/media"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <a
                  v-if="contentTemp.extensions[extend.key]&&contentTemp.extensions[extend.key].src"
                  @click="beforeClick(extend.key,false,true)"
                  class="img-view"
                  style="width:120px;height:120px;display:block;"
                  :style="`background-image:url(${cdnurl}${contentTemp.extensions[extend.key].src});`"
                >
                  <div class="upload-icon">
                    <i class="el-icon-plus"></i>
                  </div>
                </a>
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                  @click="beforeClick(extend.key,false,true)"
                ></i>
              </el-upload>
              <div
                class="file-info"
                v-if="contentTemp.extensions[extend.key]&&contentTemp.extensions[extend.key].src"
              >
                <p>图片尺寸要求</p>
                <p>图片宽度：{{categoryTemp.model.mixed.thumbnailSize.width}} PX</p>
                <p>图片高度：{{categoryTemp.model.mixed.thumbnailSize.height}} PX</p>
                <p>
                  <a target="_blank" :href="`${cdnurl}${contentTemp.extensions[extend.key].src}`">
                    <i class="el-icon-picture"></i>
                    &nbsp;&nbsp;查看原图{{contentTemp.extensions[extend.key].fileName}}
                  </a>
                </p>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?addContents():updateContents()">
          {{ $t('table.confirm')
          }}
        </el-button>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getContents,
  addContents,
  deleteContents,
  updateContents,
} from "@/api/contents";
import Tinymce from "@/components/Tinymce";
import { getModels } from "@/api/model";
import {
  getCategoryOne
} from "@/api/categories";
import waves from "@/directive/waves"; // Waves directive
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}
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
      listLoading: true,
      tabActive: "",
      viewContent: "内容预览",
      backColor: "#f7f8fb",
      dialogStatus: "",
      isthumbnail: false,
      contentKey: null,
      mustImg: false,
    };
  },
  created() {
    // 读取数据

    // 读取数据模型
    // 读取数据模型
    this.getCategoryOne();
  },
  methods: {
    // 重置表单模型
    resetContentTemp() {
      let _obj = {};
      _obj.category = this.categoryTemp._id;
      // 检查系统默认的字段
      if (this.modelTemp.system.thumbnail) {
        _obj.thumbnail = {
          _id: "",
          fileName: "",
          src: ""
        };
      }
      if (this.modelTemp.system.abstract) {
        _obj.abstract = "";
      }
      if (this.modelTemp.system.tags) {
        _obj.tags = "";
      }
      if (this.modelTemp.system.content) {
        _obj.content = "";
      }
      _obj.extensions = {};
      // 遍历扩展的数据类型
      for (let i = 0; i < this.modelTemp.extensions.length; i++) {
        if (this.modelTemp.extensions[i].type == "checkbox") {
          // 多选框
          _obj.extensions[this.modelTemp.extensions[i].key] = [];
        } else if (
          this.modelTemp.extensions[i].type == "media" ||
          this.modelTemp.extensions[i].type == "image"
        ) {
          // 文件上传框
          _obj.extensions[this.modelTemp.extensions[i].key] = {
            _id: "",
            fileName: "",
            src: ""
          };
        } else {
          _obj.extensions[this.modelTemp.extensions[i].key] = "";
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
      for (var key in this.contentTemp.extensions) {
        if (this.contentTemp.extensions[key]._id) {
          this.contentTemp.media.push(this.contentTemp.extensions[key]._id);
        }
        // if(!this.contentTemp.extensions[key]){
        //   delete this.contentTemp.extensions[key]
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
    // 新建数据
    addContents() {
      this.setPostData();
      addContents(this.contentTemp)
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
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
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

        this.contentTemp.extensions[this.contentKey] = {
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
  },
  components: {
    Tinymce
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
}
</style>