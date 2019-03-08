<template>
  <div v-if="dialogFormVisible">
    <el-dialog
      class="content-edit"
      title="数据编辑"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="900px"
      v-if="dialogFormVisible"
    >
      <!-- {{modelTemp}} -->
      <!-- <hr> -->
      <!-- {{contentTemp}} -->
      <el-form
        ref="dataFormTempExtend"
        :model="contentTemp"
        label-position="right"
        label-width="100px"
        v-if="contentTemp"
      >
        <el-form-item :label="model.name" :prop="model.key" v-for="(model,i) in modelTemp" :key="i">
          <!-- 数字输入框 -->
          <el-input-number
            controls-position="right"
            v-model="contentTemp.value[model.key]"
            :placeholder="`请输入${model.name}`"
            :min="0"
            v-if="model.type=='number'"
          ></el-input-number>
          <!-- 日期-时间输入框 -->
          <el-date-picker
            v-model="contentTemp.value[model.key]"
            :placeholder="`请输入${model.name}`"
            type="datetime"
            v-if="model.type=='date'"
          ></el-date-picker>
          <!-- 富文本域输入框 -->
          <tinymce :height="400" v-model="contentTemp.value[model.key]" v-if="model.type=='rtf'"></tinymce>
          <!-- 文本域 -->
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            :placeholder="`请输入${model.name}`"
            v-if="model.type=='textarea'"
            v-model="contentTemp.value[model.key]"
          ></el-input>
          <!-- 文本输入框 -->
          <el-input
            :placeholder="`请输入${model.name}`"
            v-model="contentTemp.value[model.key]"
            v-if="model.type=='text'"
          ></el-input>
          <!-- 多选 -->
          <el-select
            v-if="model.type=='checkbox'"
            v-model="contentTemp.value[model.key]"
            multiple
            collapse-tags
            :placeholder="`请选择${model.name}`"
          >
            <el-option
              v-for="(checkbox,i) in model.mixed.select"
              :label="checkbox.name"
              :value="checkbox.value"
              :key="i"
            ></el-option>
          </el-select>
          <!-- 下拉选项 -->
          <el-select
            v-model="contentTemp.value[model.key]"
            :placeholder="`请选择${model.name}`"
            v-if="model.type=='select'"
          >
            <el-option
              v-for="(option,i) in model.mixed.select"
              :key="i"
              :label="option.name"
              :value="option.value"
            ></el-option>
          </el-select>
          <!-- 颜色选择器 -->
          <el-color-picker
            v-model="contentTemp.value[model.key]"
            v-if="model.type=='color'"
            color-format="rgb"
            :show-alpha="true"
          ></el-color-picker>
          <!-- 开关 -->
          <el-switch
            v-if="model.type=='switch'"
            v-model="contentTemp.value[model.key]"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
          ></el-switch>
          <!-- 文件上传框 -->
          <div v-if="model.type=='media'">
            <!-- <a
              v-if="contentTemp.value[model.key]&&contentTemp.value[model.key]"
              @click="editMedia(model.key)"
              class="img-view medias"
              style="width:120px;height:120px;display:block;"
            >
              <div class="upload-icon">
                <i class="el-icon-plus"></i>
              </div>
            </a>-->
            <i
              class="el-icon-plus avatar-uploader-icon"
              @click="editMedia(model.key)"
              :style="`background-image:url('${cdnurl}${contentTemp.value[model.key]}')`"
            ></i>
            <div v-show="contentTemp.value[model.key]">
              <el-tag
                closable
                @close="contentTemp.value[model.key]=''"
                type="success"
              >{{contentTemp.value[model.key]}}</el-tag>
            </div>

            <p></p>
          </div>
          <!-- 图片上传框 -->
        </el-form-item>
        <el-form-item label="在线状态">
          <!-- 开关 -->
          <el-switch
            v-model="contentTemp.online"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="contentId?updateContents():addContents()">
          {{ $t('table.confirm')
          }}
        </el-button>
      </div>
    </el-dialog>
    <imgList></imgList>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getCategoryOne } from "@/api/categories";
import { getModelOne } from "@/api/model";
import { addContents, updateContents, getContentOne } from "@/api/contents";
import Tinymce from "@/components/Tinymce";
import imgList from "@/components/ImgList";

function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}
export default {
  components: {
    Tinymce,
    imgList
  },

  data() {
    return {
      contentTemp: null,
      modelTemp: null,
      dialogFormVisible: false,
      modelId: null,
      categoryId: null,
      contentId: null,
      editMediaKey: null,
      emitEvent: null // 选择图片后，需要触发的函数
    };
  },
  created() {
    this.$bus.$on("editContent", eventData => {
      this.modelId = eventData.modelId || null;
      this.categoryId = eventData.categoryId || null;
      this.contentId = eventData.contentId || null;
      this.emitEvent = eventData.emitEvent || null;
      this.dialogFormVisible = true;
      this.getDatas();
    });
    this.$bus.$on("changeMedia", eventData => {
      this.contentTemp.value[this.editMediaKey] = eventData.url;
    });
  },
  mounted() {},
  methods: {
    // 获取数据
    getDatas() {
      if (this.modelId) {
        this.getModelOne();
      } else if (this.categoryId) {
        this.getCategoryOne();
      }
    },
    // 根据模型读取
    getModelOne() {
      console.log("model");
      getModelOne({
        _id: this.modelId
      })
        .then(res => {
          // 保存数据模型
          this.modelTemp = res.data.value;
          // 保存表单模型
          this.resetContentTemp();
          console.log(this.contentId);
          if (this.contentId) {
            this.getContentOne();
          }
        })
        .catch(err => {});
    },
    // 根据集合读取
    getCategoryOne() {
      console.log("category");
      getCategoryOne({
        _id: this.categoryId
      })
        .then(res => {
          // 保存数据模型
          this.modelTemp = res.data.model.value;
          // 保存表单模型
          this.resetContentTemp();
          if (this.contentId) {
            this.getContentOne();
          }
        })
        .catch(err => {});
    },
    // 读取表单数据
    getContentOne() {
      console.log("get content");
      getContentOne({ _id: this.contentId })
        .then(res => {
          console.log("meger");
          _.mergeWith(this.contentTemp, res.data, customizer);
        })
        .catch(err => {});
    },
    // 新增数据
    addContents() {
      addContents(this.contentTemp)
        .then(res => {
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "创建成功",
            type: "success",
            duration: 2000
          });
          this.$bus.$emit(this.emitEvent, res.data);
        })
        .catch(err => {});
    },
    // 更新数据
    updateContents() {
      updateContents(this.contentTemp)
        .then(res => {
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "修改成功",
            type: "success",
            duration: 2000
          });
          this.$bus.$emit(this.emitEvent, res.data);
        })
        .catch(err => {});
    },
    // 重置表单模型
    resetContentTemp() {
      let _obj = {};
      _obj.category = this.categoryId || "";
      _obj.online = false;
      _obj.value = {};
      // 遍历扩展的数据类型
      for (let i = 0; i < this.modelTemp.length; i++) {
        if (this.modelTemp[i].type == "checkbox") {
          // 多选框
          _obj.value[this.modelTemp[i].key] = [];
        }
        // else if (
        //   this.modelTemp[i].type == "media" ||
        //   this.modelTemp[i].type == "image"
        // ) {
        //   // 文件上传框
        //   _obj.value[this.modelTemp[i].key] = {
        //     _id: "",
        //     fileName: "",
        //     src: ""
        //   };
        // }
        else if (this.modelTemp[i].type == "switch") {
          _obj.value[this.modelTemp[i].key] = false;
        } else {
          _obj.value[this.modelTemp[i].key] = "";
        }
      }
      // 数据原始模版，处理完毕
      this.contentTemp = _obj;
      console.log("reset");
    },
    editMedia(key) {
      this.editMediaKey = key;
      this.$bus.$emit("openImgList", "changeMedia");
    }
  },
  computed: {
    ...mapGetters(["cdnurl"])
  }
};
</script>
<style lang="scss" scoped>
.content-edit {
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
      //   background-image: url(./img/ico-file.png);
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
      border: dashed 1px #ccc;
      .el-icon-plus {
        font-size: 50px;
        font-weight: bold;
        width: 120px;
        height: 120px;
        line-height: 120px;
      }
    }
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
  .avatar-uploader-icon {
    border: dashed 1px #ccc;
    padding: 40px;
    font-size: 30px;
    border-radius: 4px;
    cursor: pointer;

    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
}
</style>
