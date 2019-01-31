<template>
  <div class="page-set">
    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialogFormVisible"
      title="页面设置"
      width="250px"
      :modal="false"
      :close-on-click-modal="false"
    >
      <el-scrollbar class="shows">
        <el-form :label-position="'left'" label-width="70px" :model="settingForm">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="背景" name="1">
              <el-form-item label="背景图" prop="bg">
                <div class="img-view" :style="{backgroundImage:settingForm.bg.backgroundImage}">
                  <i class="el-icon-plus"></i>
                </div>
                <div class="mt10 tc">
                  <el-button-group>
                    <el-button type="primary" size="mini" @click="deleteImage">删除</el-button>
                    <el-button type="danger" size="mini" @click="changeImage">修改</el-button>
                  </el-button-group>
                </div>
              </el-form-item>
              <el-form-item label="背景对齐" prop="bg">
                <div style="width:150px;text-align:left;">
                  <el-radio-group v-model="settingForm.bg.backgroundPosition" size="small">
                    <el-radio-button label="left top">
                      <i class="el-icon-arrow-up" style="transform: rotate(-45deg)"></i>
                    </el-radio-button>
                    <el-radio-button label="center top">
                      <i class="el-icon-arrow-up"></i>
                    </el-radio-button>
                    <el-radio-button label="right top">
                      <i class="el-icon-arrow-up" style="transform: rotate(45deg)"></i>
                    </el-radio-button>
                  </el-radio-group>

                  <el-radio-group v-model="settingForm.bg.backgroundPosition" size="small">
                    <el-radio-button label="left center">
                      <i class="el-icon-arrow-left"></i>
                    </el-radio-button>
                    <el-radio-button label="center center">
                      <i class="el-icon-loading"></i>
                    </el-radio-button>
                    <el-radio-button label="right center">
                      <i class="el-icon-arrow-right"></i>
                    </el-radio-button>
                  </el-radio-group>

                  <el-radio-group v-model="settingForm.bg.backgroundPosition" size="small">
                    <el-radio-button label="left bottom">
                      <i class="el-icon-arrow-down" style="transform: rotate(45deg)"></i>
                    </el-radio-button>
                    <el-radio-button label="center bottom">
                      <i class="el-icon-arrow-down"></i>
                    </el-radio-button>
                    <el-radio-button label="right bottom">
                      <i class="el-icon-arrow-down" style="transform: rotate(-45deg)"></i>
                    </el-radio-button>
                  </el-radio-group>
                </div>
              </el-form-item>
              <el-form-item label="背景覆盖" prop="bg">
                <el-select v-model="settingForm.bg.backgroundSize" placeholder="请选择">
                  <el-option label="原始" value>原始</el-option>
                  <el-option label="平铺" value="cover">平铺</el-option>
                  <el-option label="适配" value="contain">适配</el-option>
                  <el-option label="拉伸" value="100% 100%">拉伸</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="背景重复" prop="bg">
                <el-select v-model="settingForm.bg.backgroundRepeat" placeholder="请选择">
                  <el-option label="水平方向重复" value="repeat-x">水平方向重复</el-option>
                  <el-option label="垂直方向重复" value="repeat-y">垂直方向重复</el-option>
                  <el-option label="水平和垂直重复" value="repeat">水平和垂直重复</el-option>
                  <el-option label="不重复" value="no-repeat">不重复</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="背景颜色" prop="bg">
                <el-input v-model="settingForm.bg.backgroundColor" placeholder="纯色背景" size="medium">
                  <el-color-picker
                    slot="prepend"
                    v-model="settingForm.bg.backgroundColor"
                    show-alpha
                  ></el-color-picker>
                </el-input>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="基础" name="2">
              <el-form-item label="页面宽度" prop="width">
                <el-input v-model="settingForm.width" placeholder="请输入组件长度">
                  <!-- <template slot="append">PX</template> -->
                </el-input>
              </el-form-item>
              <el-form-item label="页面高度" prop="height">
                <el-input v-model="settingForm.height" placeholder="请输入组件宽度">
                  <!-- <template slot="append">PX</template> -->
                </el-input>
              </el-form-item>
              <el-form-item label="透明程度" prop="opacity">
                <el-slider v-model="settingForm.opacity" :min="0" :max="100"></el-slider>
              </el-form-item>
              <el-form-item label="旋转角度" prop="rotate">
                <el-slider v-model="settingForm.rotate" :min="0" :max="360"></el-slider>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="边框" name="3">
              <el-form-item label="边框宽度" prop="border">
                <el-input v-model="settingForm.border.borderWidth" placeholder="边框宽度">
                  <!-- <template slot="append">PX</template> -->
                </el-input>
              </el-form-item>
              <el-form-item label="边框圆角" prop="border">
                <el-input v-model="settingForm.border.borderRadius" placeholder="边框圆角">
                  <!-- <template slot="append">PX</template> -->
                </el-input>
              </el-form-item>
              <el-form-item label="边框颜色" prop="border">
                <el-input v-model="settingForm.border.borderColor" placeholder="边框颜色" size="medium">
                  <el-color-picker slot="prepend" v-model="settingForm.borderColor" show-alpha></el-color-picker>
                </el-input>
              </el-form-item>
              <el-form-item label="边框类型" prop="border">
                <el-select v-model="settingForm.border.borderStyle" placeholder="边框类型">
                  <el-option
                    v-for="(item, i) in borderStyleOptions"
                    :label="item.label"
                    :value="item.value"
                    :key="i"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="入/离场" name="4">
              <el-form-item label="入场动画" prop="name">
                <el-select
                  v-model="settingForm.enterAnimation"
                  placeholder="请选择"
                  @change="animateNameChange"
                >
                  <el-option label="无" value></el-option>
                  <el-option
                    v-for="(item, index) in animateOptions"
                    :label="item.label"
                    :key="index"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="入场方向"
                prop="name"
                v-if="settingForm.enterAnimation&&settingForm.enterAnimation.dire"
              >
                <el-select
                  v-model="settingForm.enterAnimationDire"
                  placeholder="请选择"
                  @change="animateNameChange"
                >
                  <el-option
                    v-for="(item, index) in direOptions"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="离场动画" prop="description">
                <el-select
                  v-model="settingForm.leaveAnimation"
                  placeholder="请选择"
                  @change="animateNameChange"
                >
                  <el-option label="无" value></el-option>
                  <el-option
                    v-for="(item, index) in animateOptionsLeave"
                    :label="item.label"
                    :key="index"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="离场方向"
                prop="name"
                v-if="settingForm.leaveAnimation&&settingForm.leaveAnimation.dire"
              >
                <el-select
                  v-model="settingForm.leaveAnimationDire"
                  placeholder="请选择"
                  @change="animateNameChange"
                >
                  <el-option
                    v-for="(item, index) in direOptions"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="阴影" name="5">
              <el-form-item label="阴影颜色" prop="shadow">
                <el-input v-model="settingForm.shadow.shadowColor" placeholder="阴影颜色" size="medium">
                  <el-color-picker
                    slot="prepend"
                    v-model="settingForm.shadow.shadowColor"
                    show-alpha
                  ></el-color-picker>
                </el-input>
              </el-form-item>
              <el-form-item label="阴影大小" prop="shadow">
                <el-slider v-model="settingForm.shadow.shadowWidth" :max="100"></el-slider>
              </el-form-item>
              <el-form-item label="模糊半径" prop="shadow">
                <el-slider v-model="settingForm.shadow.shadowRadius" :max="100"></el-slider>
              </el-form-item>
              <el-form-item label="阴影方向" prop="shadow">
                <el-slider v-model="settingForm.shadow.shadowDire" :max="360"></el-slider>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui

export default {
  name: "pageSet",
  directives: {
    elDragDialog
  },
  data() {
    return {
      activeNames: ["1"],
      dialogFormVisible: false,
      settingForm: {
        bg: {
          backgroundImage: "",
          backgroundColor: "",
          backgroundSize: "",
          backgroundRepeat: "",
          backgroundPosition: ""
        },
        border: {
          borderWidth: 0,
          borderRadius: 0,
          borderColor: "",
          borderStyle: ""
        },
        shadow: {
          shadowColor: "",
          shadowWidth: 0,
          shadowRadius: 0,
          shadowDire: 0
        },
        width: 0,
        height: 0,
        opacity: 100,
        rotate: 0,

        enterAnimation: "",
        leaveAnimation: ""
      },
      animateSelect: {},
      direName: "",
      animateOptions: [
        {
          value: "fadeIn",
          label: "淡入",
          dire: false
        },
        {
          value: "fadeIn-dire",
          label: "移入",
          dire: true
        },
        {
          value: "bounceIn-dire",
          label: "弹入",
          dire: true
        },
        {
          value: "flipInY",
          label: "翻转进入",
          dire: false
        },
        {
          value: "bounceIn",
          label: "中心弹入",
          dire: false
        },
        {
          value: "zoomIn",
          label: "中心放大"
        },
        {
          value: "rollIn-dire",
          label: "翻滚进入",
          dire: true
        },
        {
          value: "flipInX",
          label: "翻开进入",
          dire: false
        },
        {
          value: "lightSpeedIn-dire",
          label: "光速进入",
          dire: true
        },
        {
          value: "twisterInDown-dire",
          label: "魔幻进入",
          dire: true
        },
        {
          value: "puffIn",
          label: "缩小进入",
          dire: false
        },
        {
          value: "twisterInUp-dire",
          label: "旋转进入",
          dire: true
        }
      ],
      animateOptionsLeave: [
        {
          value: "fadeOut",
          label: "淡出",
          dire: false
        },
        {
          value: "fadeOut-dire",
          label: "移出",
          dire: true
        },
        {
          value: "bounceOut-dire",
          label: "弹出",
          dire: true
        },
        {
          value: "flipOutY",
          label: "翻转消失",
          dire: false
        },
        {
          value: "bounceOut",
          label: "中心消失",
          dire: false
        },
        {
          value: "zoomOut",
          label: "中心缩小",
          dire: false
        },
        {
          value: "rollOut-dire",
          label: "翻滚退出",
          dire: true
        },
        {
          value: "flipOutX",
          label: "翻开消失",
          dire: false
        },
        {
          value: "lightSpeedOut-dire",
          label: "光速退出",
          dire: true
        },
        {
          value: "puffOut",
          label: "放大退出",
          dire: false
        },
        {
          value: "hingeRight-dire",
          label: "悬挂脱落",
          dire: true
        }
      ],
      direOptions: [
        {
          label: "从左到右",
          value: "Right"
        },
        {
          label: "从上到下",
          value: "Down"
        },
        {
          label: "从右到左",
          value: "Left"
        },
        {
          label: "从下到上",
          value: "Up"
        }
      ],
      borderStyleOptions: [
        {
          value: "none",
          label: "--无--"
        },
        {
          value: "solid",
          label: "直线"
        },
        {
          value: "dashed",
          label: "虚线"
        },
        {
          value: "dotted",
          label: "点状线"
        },
        {
          value: "double",
          label: "双划线"
        },
        {
          value: "groove",
          label: "3D凹槽"
        },
        {
          value: "ridge",
          label: "3D垄状"
        },
        {
          value: "inset",
          label: "3D内嵌"
        },
        {
          value: "outset",
          label: "3D外嵌"
        }
      ]
    };
  },
  methods: {},
  created() {
    this.$bus.$on("openPageSet", eventData => {
      this.dialogFormVisible = true;
    });
  },
  props: ["pageSet"],
  watch: {
    pageSet(val) {
      if (this.dialogFormVisible) {
      }
      // style
      this.settingForm.bg = this.pageSet.bg;
      this.settingForm.border = this.pageSet.border;
      this.settingForm.shadow = this.pageSet.shadow;
      // base
      this.settingForm.width = this.pageSet.width;
      this.settingForm.height = this.pageSet.height;
      this.settingForm.opacity = this.pageSet.opacity;
      this.settingForm.rotate = this.pageSet.rotate;
      this.settingForm.enterAnimation = this.pageSet.enterAnimation;
      this.settingForm.leaveAnimation = this.pageSet.leaveAnimation;
      console.log(val);
    }
  }
};
</script>
<style lang="scss">
.page-set {
  .el-dialog__wrapper {
    right: auto !important;
    overflow: inherit !important;
  }
  .el-dialog__body {
    padding: 10px !important;
  }

  .shows {
    height: calc(100vh - 84px);
    overflow-y: hidden;

    .title {
      text-align: center;
    }

    .img-view {
      background-position: center center;
      background-repeat: no-repeat;
      background-size: contain;
      background-color: #eee;
      text-align: center;
      line-height: 160px;
      width: 160px;
      height: 160px;
      display: inline-block;
      font-size: 40px;
      cursor: pointer;
    }
  }
}
</style>
