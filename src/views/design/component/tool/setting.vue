<template>
  <el-dialog :visible.sync="dialogFormVisible" title="组件设置" :fullscreen="true">
    <div class="view">
      <div class="preview">
        <el-scrollbar>
          <Ipreview :app-json="appJson" v-if="dialogFormVisible"></Ipreview>
        </el-scrollbar>
      </div>
      <div class="icons">
        <el-tooltip class="item" effect="dark" :content="menuShow?'收起菜单':'展开菜单'" placement="left">
          <span class="item" @click="menuShow=!menuShow">
            <i class="el-icon-caret-right" v-if="menuShow"></i>
            <i class="el-icon-caret-left" v-else></i>
          </span>
        </el-tooltip>
      </div>
      <div class="form" v-show="menuShow">
        <el-form ref="dataForm" label-position="right" label-width="120px" :model="appJson">
          <!-- 图片元素 -->
          <el-form-item label="模块封面">
            <el-upload
              class="avatar-uploader"
              action="/api/media"
              :show-file-list="false"
              :on-success="handleAvatarSuccessFav"
              :before-upload="beforeAvatarUploadFav"
            >
              <img v-if="appJson.thumbnail" :src="`${cdnurl}${appJson.thumbnail}`" class="favicon" style="width:180px;height:auto;">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="*组件名称">
            <el-input v-model="appJson.name" placeholder="组件名"/>
          </el-form-item>
          <el-form-item label="*组件描述">
            <el-input v-model="appJson.description" type="textarea" placeholder="组件描述"/>
          </el-form-item>
          <el-form-item label="自动切换">
            <el-switch
              v-model="appJson.value.pageSetting.autoAnimation"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="是"
              inactive-text="否"
            ></el-switch>
          </el-form-item>
          <el-form-item label="切换间隔(秒)">
            <el-input-number
              v-model="appJson.value.pageSetting.interval"
              :precision="1"
              :step="0.1"
              :min="0"
              :max="100"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="循环播放">
            <el-switch
              v-model="appJson.value.pageSetting.infinite"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="是"
              inactive-text="否"
            ></el-switch>
          </el-form-item>
          <el-form-item label="页面指示器" v-if="false">
            <el-switch
              v-model="appJson.value.indicator.show"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="是"
              inactive-text="否"
            ></el-switch>
          </el-form-item>

          <div v-if="appJson.value.indicator.show">
            <hr>
            <el-form-item label="指示器背景色">
              <el-input v-model="appJson.value.indicator.bg" placeholder="指示器背景色" size="medium">
                <el-color-picker slot="prepend" v-model="appJson.value.indicator.bg" show-alpha></el-color-picker>
              </el-input>
            </el-form-item>
            <el-form-item label="距离底部">
              <el-input v-model="appJson.value.indicator.bottom" placeholder="指示器距离页面底部距离">
                <template slot="append">PX</template>
              </el-input>
            </el-form-item>
            <el-form-item label="左右间隔">
              <el-input v-model="appJson.value.indicator.margin" placeholder="指示器左右间隔">
                <template slot="append">PX</template>
              </el-input>
            </el-form-item>
            <el-form-item label="最小长度">
              <el-input v-model="appJson.value.indicator.width" placeholder="指示器最小长度">
                <template slot="append">PX</template>
              </el-input>
            </el-form-item>
            <el-form-item label="最小高度">
              <el-input v-model="appJson.value.indicator.height" placeholder="最小指示器高度">
                <template slot="append">PX</template>
              </el-input>
            </el-form-item>
            <el-form-item label="圆角">
              <el-slider v-model="appJson.value.indicator.borderRadius" :max="50" :min="0"></el-slider>
            </el-form-item>

            <el-form-item label="按钮颜色">
              <el-input
                v-model="appJson.value.indicator.buttonColor"
                placeholder="按钮颜色"
                size="medium"
              >
                <el-color-picker
                  slot="prepend"
                  v-model="appJson.value.indicator.buttonColor"
                  show-alpha
                ></el-color-picker>
              </el-input>
            </el-form-item>
            <el-form-item label="按钮颜色(激活时)">
              <el-input
                v-model="appJson.value.indicator.buttonColorActive"
                placeholder="按钮颜色(激活时)"
                size="medium"
              >
                <el-color-picker
                  slot="prepend"
                  v-model="appJson.value.indicator.buttonColorActive"
                  show-alpha
                ></el-color-picker>
              </el-input>
            </el-form-item>
            <el-form-item label="显示标题">
              <el-switch
                v-model="appJson.value.indicator.showText"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="是"
                inactive-text="否"
              ></el-switch>
            </el-form-item>
            <el-form-item label="标题颜色" v-if="appJson.value.indicator.showText">
              <el-input
                v-model="appJson.value.indicator.textColor"
                placeholder="指示器颜色"
                size="medium"
              >
                <el-color-picker
                  slot="prepend"
                  v-model="appJson.value.indicator.textColor"
                  show-alpha
                ></el-color-picker>
              </el-input>
            </el-form-item>
            <el-form-item label="标题颜色(激活时)" v-if="appJson.value.indicator.showText">
              <el-input
                v-model="appJson.value.indicator.textColorActive"
                placeholder="标题颜色(激活时)"
                size="medium"
              >
                <el-color-picker
                  slot="prepend"
                  v-model="appJson.value.indicator.textColorActive"
                  show-alpha
                ></el-color-picker>
              </el-input>
            </el-form-item>
            <el-form-item label="字体大小">
              <el-input v-model="appJson.value.indicator.fontSize" placeholder="字体大小">
                <template slot="append">PX</template>
              </el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" @click="$bus.$emit('saveJson')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import Ipreview from "@/components/H5Preview";
import { mapGetters } from "vuex";
export default {
  name: "Setting",

  data() {
    return {
      dialogFormVisible: false,
      menuShow: true,
      value: "",
      Setting: {
        name: "",
        description: "",
        autoAnimation: "",
        infinite: false,
        interval: 0,
        fullScreen: false
      }
    };
  },
  created() {
    this.$bus.$on("openSetting", eventData => {
      this.dialogFormVisible = true;
    });
  },
  methods: {
    handleAvatarSuccessFav(res, file) {
      console.log(res);
      this.appJson.thumbnail = res.url;
    },
    beforeAvatarUploadFav(file) {
      const isImg = file.type.includes("image");
      const isLt500K = file.size / 1024 < 500;
      if (!isImg) {
        this.$message.error("只能上传图片类型文件!");
      }
      if (!isLt500K) {
        this.$message.error("图片大小不能超过 500 KB!");
      }
      return isImg && isLt500K;
    }
  },
  computed: {
    ...mapGetters(["cdnurl"])
  },
  props: ["appJson"],
  components: {
    Ipreview
  }
};
</script>
<style lang="scss" scoped>
.view {
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 114px);
  border-top: solid 1px #ccc;
  padding-top: 10px;

  .preview {
    flex: 1;
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
    .el-scrollbar {
      height: 100%;
      width: 100%;
      justify-content: center;
      align-items: start;
    }
    .el-scrollbar__view {
      display: flex;
      justify-content: center;
      align-items: start;
      height: 100%;
    }
  }
  .icons {
    background: #fff;
    border-left: solid 1px #eee;
    border-right: solid 1px #eee;
    height: 100%;
    width: 40px;
    .item {
      display: block;
      width: 40px;
      height: 40px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      &.warning {
        background: #e6a23c !important;
        color: #fff;
      }
      &:hover {
        background: #409eff;
        color: #fff;
      }
    }
  }
  .form {
    width: 300px;
    height: 100%;
    border-left: solid 1px #ccc;
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
}
</style>
