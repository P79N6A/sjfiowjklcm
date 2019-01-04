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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="800px" :close-on-click-modal="false">
      <el-form ref="dataFormKey" :model="componentTemp" label-position="right" label-width="120px">
        <el-form-item label="*组件名称" prop="name">
          <el-input v-model="componentTemp.name" />
        </el-form-item>

        <el-form-item label="*适用终端" prop="device">
          <el-select v-model="componentTemp.device" placeholder="请选择适用终端">
            <el-option label="PC端" value="pc"></el-option>
            <el-option label="MOBILE端" value="MOBILE"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="数据集合" prop="device">
          <el-select v-model="componentTemp.dataTemp" placeholder="请选择数据集合">
            <el-option :label="item.name" :value="item._id" v-for="item in categoryList" :key="item._id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="编辑数据" v-if="dialogStatus=='update'">
          <el-button v-if="componentTemp.dataDetail">编辑数据</el-button>
          <el-button v-else @click="handleAddData">添加数据</el-button>
        </el-form-item>

        <el-form-item label="组件描述" prop="description">
          <el-input v-model="componentTemp.description" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
        </el-form-item>

        <el-form-item label="组件script" prop="script">
          <el-input v-model="componentTemp.script" type="textarea" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
        </el-form-item>

        <el-form-item label="组件css" prop="css">
          <el-input v-model="componentTemp.css" type="textarea" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
        </el-form-item>

        <el-form-item label="组件html" prop="html">
          <el-input v-model="componentTemp.html" type="textarea" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
        </el-form-item>

        <el-form-item label="组件dist" prop="dist">
          <el-input v-model="componentTemp.dist" type="textarea" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createComponent():updateComponent()">{{
          $t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 内容编辑弹窗,必须用v-if，促发文本域编辑器的重新渲染，可能会有其他问题，后续排查 -->
    <el-dialog class="content-edit" :title="textMap[dialogStatusData]" :visible.sync="dialogVisible" :close-on-click-modal="false"
      width="900px" v-if="dialogVisible">
      <el-card class="box-card" hover v-if="contentTemp">
        <div slot="header" class="clearfix">
          <span>系统参数</span>
        </div>
        <el-form ref="dataFormTemp" :model="contentTemp" label-position="right" label-width="100px">
          <el-form-item label="封面" prop="thumbnail" v-if="modelTemp.system.thumbnail">
            <el-upload class="avatar-uploader" action="/api/media" :show-file-list="false" :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <a v-if="contentTemp.thumbnail&&contentTemp.thumbnail.src" @click="beforeClick('thumbnail',true,true)"
                class="img-view" style="width:120px;height:120px;display:block;" :style="`background-image:url(${cdnurl}${contentTemp.thumbnail.src});`">
                <div class="upload-icon">
                  <i class="el-icon-plus"></i>
                </div>
              </a>
              <i v-else class="el-icon-plus avatar-uploader-icon" @click="beforeClick('thumbnail',true,true)"></i>
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
            <el-input v-model="contentTemp.abstract" />
          </el-form-item>
          <el-form-item label="标签" prop="tags" v-if="modelTemp.system.tags">
            <el-input v-model="contentTemp.tags" />
            <div>标签以空格分开</div>
          </el-form-item>
          <el-form-item label="内容" prop="content" v-if="modelTemp.system.content">
            <tinymce :height="400" v-model="contentTemp.content" />
          </el-form-item>
        </el-form>
      </el-card>
      <br>
      <br>
      <el-card class="box-card" hover v-if="contentTemp">
        <div slot="header" class="clearfix">
          <span>扩展参数</span>
        </div>
        <el-form ref="dataFormTempExtend" :model="contentTemp" label-position="right" label-width="100px">
          <el-form-item :label="extend.name" :prop="extend.key" v-for="(extend,i) in modelTemp.extensions" :key="i">
            <!-- 数字输入框 -->
            <el-input-number controls-position="right" v-model="contentTemp.extensions[extend.key]" :placeholder="`请输入${extend.name}`"
              :min="0" v-if="extend.type=='number'"></el-input-number>
            <!-- 日期-时间输入框 -->
            <el-date-picker v-model="contentTemp.extensions[extend.key]" :placeholder="`请输入${extend.name}`" type="datetime"
              v-if="extend.type=='date'"></el-date-picker>
            <!-- 文本域输入框 -->
            <tinymce :height="400" v-model="contentTemp.extensions[extend.key]" v-if="extend.type=='textarea'"></tinymce>
            <!-- 文本输入框 -->
            <el-input :placeholder="`请输入${extend.name}`" v-model="contentTemp.extensions[extend.key]" v-if="extend.type=='text'"></el-input>
            <!-- 多选 -->
            <el-checkbox-group v-model="contentTemp.extensions[extend.key]" v-if="extend.type=='checkbox'">
              <el-checkbox v-for="(checkbox,i) in extend.mixed.select" :label="checkbox.value" :key="i">{{checkbox.name}}</el-checkbox>
            </el-checkbox-group>
            <!-- 下拉选项 -->
            <el-select v-model="contentTemp.extensions[extend.key]" :placeholder="`请选择${extend.name}`" v-if="extend.type=='select'">
              <el-option v-for="(option,i) in extend.mixed.select" :key="i" :label="option.name" :value="option.value"></el-option>
            </el-select>
            <!-- 颜色选择器 -->
            <el-color-picker v-model="contentTemp.extensions[extend.key]" v-if="extend.type=='color'" color-format="rgb"
              :show-alpha="true"></el-color-picker>

            <el-switch v-if="extend.type=='switch'" v-model="contentTemp.extensions[extend.key]" active-color="#13ce66"
              inactive-color="#ff4949" active-text="是" inactive-text="否"></el-switch>
            <!-- 文件上传框 -->
            <div v-if="extend.type=='media'">
              <el-upload class="avatar-uploader" action="/api/media" :show-file-list="false" :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <a v-if="contentTemp.extensions[extend.key]&&contentTemp.extensions[extend.key].src" @click="beforeClick(extend.key,false,false)"
                  class="img-view medias" style="width:120px;height:120px;display:block;">
                  <div class="upload-icon">
                    <i class="el-icon-plus"></i>
                  </div>
                </a>
                <i v-else class="el-icon-plus avatar-uploader-icon" @click="beforeClick(extend.key,false,false)"></i>
              </el-upload>
              <div class="file-info" v-if="contentTemp.extensions[extend.key]&&contentTemp.extensions[extend.key].src">
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
              <el-upload class="avatar-uploader" action="/api/media" :show-file-list="false" :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <a v-if="contentTemp.extensions[extend.key]&&contentTemp.extensions[extend.key].src" @click="beforeClick(extend.key,false,true)"
                  class="img-view" style="width:120px;height:120px;display:block;" :style="`background-image:url(${cdnurl}${contentTemp.extensions[extend.key].src});`">
                  <div class="upload-icon">
                    <i class="el-icon-plus"></i>
                  </div>
                </a>
                <i v-else class="el-icon-plus avatar-uploader-icon" @click="beforeClick(extend.key,false,true)"></i>
              </el-upload>
              <div class="file-info" v-if="contentTemp.extensions[extend.key]&&contentTemp.extensions[extend.key].src">
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
    </el-dialog>
  </div>
</template>
<script>
  import {
    getContents,
    getContentOne,
    addContents,
    deleteContents,
    updateContents,
    addRoles,
    updateRoleOne,
    deleteRoleOne
  } from "@/api/contents";
  import Tinymce from "@/components/Tinymce";
  import {
    getCategoryOne
  } from "@/api/categories";
  import {
    mapGetters
  } from "vuex";
  import {
    getComponents,
    addComponents,
    updateComponents,
    deleteComponents
  } from "@/api/components";
  import {
    getCategories
  } from "@/api/categories";
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
          dataTemp: "",
          dataDetail: '',
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
        categoryList: [],
        dialogStatus: "",
        dialogStatusData:"",
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
      // 添加表单数据
      handleAddData(){
        this.getCategoryOne()
        this.dialogStatusData='create'
        this.dialogVisible=true;
      },
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
      getContentOne() {
        if (this.componentTemp.dataDetail) {
          getContentOne({
            _id: this.componentTemp.dataDetail
          }).then(res => {
            console.log(res);
          }).catch(err => {
            console.log(err);
          })
        }
      },
      // 重组提交前的数据
      setPostData() {
        this.contentTemp.media = [];
        // 遍历扩展数据的文件
        for (var key in this.contentTemp.extensions) {
          if (this.contentTemp.extensions[key]._id) {
            this.contentTemp.media.push(this.contentTemp.extensions[key]._id);
          }
        }
      },
      // 获取当前数据集合的数据
      getCategoryOne() {
        getCategoryOne({
            _id: this.componentTemp.dataTemp
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
          })
          .catch(err => {});
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
      // 文件上传前
      beforeAvatarUpload(file) {
        const isImg = file.type.includes("image");
        if (this.mustImg && !isImg) {
          this.$message.error("只能上传图片类型文件!");
        }
        return (this.mustImg && isImg) || !this.mustImg;
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
          dataTemp: "",
          dataDetail: '',
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
      updateComponent() {
        updateComponents(this.componentTemp)
          .then(res => {
            this.getComponents();
            this.dialogFormVisible = false;
          })
          .catch(err => {});
      },
      // 添加
      handleAdd() {
        this.dialogStatus = 'create'
        this.getCategories();
        this.resetTemp();
        this.dialogFormVisible = true;
      },
      handleEdit(row) {
        this.dialogStatus = 'update'
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
    },
    computed: {
      ...mapGetters(["cdnurl"])
    },
    components: {
      Tinymce
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
