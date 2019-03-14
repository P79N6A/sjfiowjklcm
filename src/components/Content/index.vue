<template>
  <div v-if="dialogFormVisible">
    <el-dialog
      class="content-edit"
      title="数据编辑vue"
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
            v-model="contentTemp[model.key]"
            :placeholder="`请输入${model.name}`"
            :min="0"
            v-if="model.type=='number'"
          ></el-input-number>
          <!-- 日期-时间输入框 -->
          <el-date-picker
            v-model="contentTemp[model.key]"
            :placeholder="`请输入${model.name}`"
            type="datetime"
            v-if="model.type=='date'"
          ></el-date-picker>
          <!-- 富文本域输入框 -->
          <tinymce :height="400" v-model="contentTemp[model.key]" v-if="model.type=='rtf'"></tinymce>
          <!-- 文本域 -->
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            :placeholder="`请输入${model.name}`"
            v-if="model.type=='textarea'"
            v-model="contentTemp[model.key]"
          ></el-input>
          <!-- 文本输入框 -->
          <el-input
            :placeholder="`请输入${model.name}`"
            v-model="contentTemp[model.key]"
            v-if="model.type=='text'"
          ></el-input>
          <!-- 多选 -->
          <el-select
            v-if="model.type=='checkbox'"
            v-model="contentTemp[model.key]"
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
            v-model="contentTemp[model.key]"
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
            v-model="contentTemp[model.key]"
            v-if="model.type=='color'"
            color-format="rgb"
            :show-alpha="true"
          ></el-color-picker>
          <!-- 开关 -->
          <el-switch
            v-if="model.type=='switch'"
            v-model="contentTemp[model.key]"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
          ></el-switch>
          <!-- 文件上传框 -->
          <div v-if="model.type=='media'">
            <!-- <a
              v-if="contentTemp[model.key]&&contentTemp[model.key]"
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
              :style="`background-image:url('${cdnurl}${contentTemp[model.key]}')`"
            ></i>
            <div v-show="contentTemp[model.key]">
              <el-tag
                closable
                @close="contentTemp[model.key]=''"
                type="success"
              >{{contentTemp[model.key]}}</el-tag>
            </div>

            <p></p>
          </div>
          <!-- 图片上传框 -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="saveContents()">
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
      contentId: null,
      editMediaKey: null,
      emitEvent: null // 选择图片后，需要触发的函数
    };
  },
  created() {
    this.$bus.$on("editContent", eventData => {
      this.modelId = eventData.modelId || null; // 数据模型
      if (eventData.contentTemp) {
        _.mergeWith(this.contentTemp, eventData.contentTemp, customizer);
      } else {
        this.contentTemp = {};
      }
      this.emitEvent = eventData.emitEvent || null;
      this.dialogFormVisible = true;
      this.getModelOne();
    });
    this.$bus.$on("changeMedia", eventData => {
      this.contentTemp[this.editMediaKey] = eventData.url;
    });
  },
  mounted() {},
  methods: {
    // 根据模型读取
    getModelOne() {
      getModelOne({
        _id: this.modelId
      })
        .then(res => {
          // 保存数据模型
          this.modelTemp = res.data.value;
          // 保存表单模型
          this.resetContentTemp();
        })
        .catch(err => {});
    },
    // 新增数据
    saveContents() {
      this.$bus.$emit(this.emitEvent, this.contentTemp);
      this.dialogFormVisible = false;
    },
    // 重置表单模型
    resetContentTemp() {
      let _obj = {};
      // _obj.online = false;
      // 遍历扩展的数据类型
      for (let i = 0; i < this.modelTemp.length; i++) {
        if (this.modelTemp[i].type == "checkbox") {
          // 多选框
          _obj[this.modelTemp[i].key] = [];
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
          _obj[this.modelTemp[i].key] = false;
        } else {
          _obj[this.modelTemp[i].key] = "";
        }
      }
      // 数据原始模版，处理完毕
      _.mergeWith(_obj, this.contentTemp, customizer);
      this.contentTemp = _obj;
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
