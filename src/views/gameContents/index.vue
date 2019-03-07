


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
      <span style="float:right;" v-if="categoryTemp">数据集合:{{categoryTemp.name}}</span>
    </div>
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
      <!-- 渲染系统内置数据 -->
      <el-table-column align="center" label="封面" prop="thumbnail" width="80">
        <template slot-scope="scope">
          <a
            target="_blank"
            v-if="scope.row.thumbnail&&scope.row.thumbnail.src"
            :href="`${cdnurl}${scope.row.thumbnail.src}`"
            class="img-view"
            :style="`background-image:url(${cdnurl}${scope.row.thumbnail.src});`"
          ></a>
        </template>
      </el-table-column>
      <el-table-column label="平台" align="center" prop="platform"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column label="CODE" align="center" prop="code"></el-table-column>
      <el-table-column label="CODE" align="center" prop="code"></el-table-column>
      <el-table-column label="标签" align="center" prop="tags" v-if="modelTemp.system.tags">
        <template slot-scope="scope">
          <el-tag v-for="(tag,i) in scope.row.tags" :key="i">{{tag}}</el-tag>
        </template>
      </el-table-column>

      <!-- 渲染扩展字段 -->
      <el-table-column
        :label="extend.name"
        align="center"
        v-for="(extend,i) in modelTemp.extensions"
        :key="i"
      >
        <template slot-scope="scope">
          <div
            v-if="scope.row.extensions[extend.key]&&(extend.type=='media'||extend.type=='image')"
          >
            <!-- 普通多媒体 -->
            <el-tooltip
              v-if="extend.type=='media'&&scope.row.extensions[extend.key].src"
              class="item"
              effect="dark"
              content="访问源文件"
              placement="top-start"
            >
              <a
                target="_blank"
                :href="`${cdnurl}${scope.row.extensions[extend.key].src}`"
                style="text-align:center;cursor:pointer;margin:0 auto;display:inline-block;width:100%;"
              >
                <svg-icon icon-class="documentation"/>
                <!-- {{scope.row.extensions[extend.key]}} -->
                {{scope.row.extensions[extend.key].fileName}}
              </a>
            </el-tooltip>
            <!-- 图片 -->
            <el-tooltip
              v-else-if="extend.type=='image'&&scope.row.extensions[extend.key].src"
              class="item"
              effect="dark"
              content="访问源文件"
              placement="top-start"
            >
              <a
                target="_blank"
                :href="`${cdnurl}${scope.row.extensions[extend.key].src}`"
                class="img-view"
                :style="`background-image:url(${cdnurl}${scope.row.extensions[extend.key].src});`"
              ></a>
            </el-tooltip>
          </div>
          <div v-else>
            <!-- 文本域 -->
            <el-tooltip
              v-if="extend.type=='textarea'"
              class="item"
              effect="dark"
              content="点击查看内容"
              placement="top-start"
            >
              <span
                @click="hadleView(scope.row.extensions[extend.key])"
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
              :content="scope.row.extensions[extend.key]"
              placement="top-start"
            >
              <span
                style="display:block;padding:4px;border-radius:6px;width:100%;height:30px;"
                :style="{background:scope.row.extensions[extend.key]}"
              ></span>
            </el-tooltip>
            <!-- 时间 -->
            <div
              v-else-if="extend.type=='date'"
            >{{scope.row.extensions[extend.key]| parseTime('{y}-{m}-{d} {h}:{i}')}}</div>
            <!-- 其他文本 -->
            <div v-else>{{scope.row.extensions[extend.key]}}</div>
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
            <!-- <el-tooltip class="item" effect="dark" content="预览该详情" placement="top-start">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-view"
                @click="handleOpen(`${cdnurl}${scope.row.src}`)"
              ></el-button>
            </el-tooltip>-->
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
    <el-dialog
      class="content-edit"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="900px"
      v-if="dialogFormVisible"
    >
      <el-card class="box-card" hover v-if="contentTemp">
        <div slot="header" class="clearfix">
          <span>系统参数</span>
        </div>
        <el-form ref="dataFormTemp" :model="contentTemp" label-position="right" label-width="100px">
          <el-form-item label="封面" prop="thumbnail">
            <el-upload
              class="avatar-uploader"
              action="/api/media"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <!-- {{contentTemp}} -->
              <!-- {{contentTemp.thumbnail}} -->
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
          <el-form-item label="在线状态" prop="online">
            <el-switch
              v-model="contentTemp.online"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="是"
              inactive-text="否"
            ></el-switch>
          </el-form-item>
          <el-form-item label="游戏平台" prop="platform">
            <el-input v-model="contentTemp.platform"/>
          </el-form-item>
          <el-form-item label="游戏ID" prop="id">
            <el-input v-model="contentTemp.id"/>
          </el-form-item>
          <el-form-item label="游戏CODE" prop="code">
            <el-input v-model="contentTemp.code"/>
          </el-form-item>
          <el-form-item label="中文名" prop="name">
            <el-input v-model="contentTemp.name"/>
          </el-form-item>
          <el-form-item label="英文名" prop="eName">
            <el-input v-model="contentTemp.eName"/>
          </el-form-item>
          <el-form-item label="线注" prop="line">
            <el-input-number
              controls-position="right"
              v-model="contentTemp.line"
              :placeholder="`请输入线注`"
              :min="0"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="试玩" prop="try">
            <el-switch
              v-model="contentTemp.try"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="是"
              inactive-text="否"
            ></el-switch>
          </el-form-item>
          <el-form-item label="标签" prop="tags">
            <el-input v-model="contentTemp.tags"/>
            <div>标签以空格分开</div>
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
            <!-- 开关 -->
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
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getContents,
  addContents,
  deleteContents,
  updateContents,
  addRoles,
  updateRoleOne,
  deleteRoleOne
} from "@/api/contents";
import Tinymce from "@/components/Tinymce";
import { getAuthorities } from "@/api/authorities";
import { getModels } from "@/api/model";
import {
  getCategories,
  getCategoryOne,
  addCategories,
  deleteCategories,
  updateCategories
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
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    // 重置表单模型
    resetContentTemp() {
      1;
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
      if (this.modelTemp.system.id) {
        _obj.id = "";
      }
      if (this.modelTemp.system.code) {
        _obj.code = "";
      }
      if (this.modelTemp.system.platform) {
        _obj.platform = "";
      }
      if (this.modelTemp.system.name) {
        _obj.name = "";
      }
      if (this.modelTemp.system.eName) {
        _obj.eName = "";
      }
      if (this.modelTemp.system.line) {
        _obj.line = "";
      }
      if (this.modelTemp.system.try) {
        _obj.try = fals;
      }
      if (this.modelTemp.system.tags) {
        _obj.tags = [];
      }
      if (this.modelTemp.system.online) {
        _obj.online = false;
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
    // 获取模型
    getModels() {
      getModels()
        .then(res => {
          this.modelList = res.data;
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
        console.log(res);
        console.log(file);
        console.log(this.contentTemp.extensions);
        console.log(this.contentKey);
        // this.$set(this.contentTemp.extensions[this.contentKey], {
        //   _id: res._id,
        //   fileName: file.name,
        //   src: res.src
        // });
        this.contentTemp.extensions[this.contentKey] = {
          _id: res._id,
          fileName: file.name,
          src: res.src
        };
        console.log(this.contentTemp.extensions[this.contentKey]);
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
<style lang="scss" scoped>
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
        width: 100%;
        height: 100%;
        line-height: 120px;
        font-weight: bold;
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
