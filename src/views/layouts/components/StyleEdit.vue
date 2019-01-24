<template>
  <div class="editStyle">
    <el-tabs type="border-card">
      <el-tab-pane label="基础属性" :model="setting">
        <el-form ref="form" label-position="top">
          <el-form-item label="添加class">
            <el-input v-model="setting.class"></el-input>
            <div style="color:red;font-size:12px;">(以空格分隔每个class)</div>
          </el-form-item>
          <el-form-item label="添加id">
            <el-input v-model="setting.id"></el-input>
          </el-form-item>
          <el-form-item label="入场动画">
            <el-select v-model="setting.enterAnimation" placeholder="请选择">
              <el-option-group>
                <el-option label="无" value></el-option>
              </el-option-group>
              <el-option-group v-for="(group, i) in animateOptions" :label="group.label" :key="i">
                <el-option
                  v-for="(item, j) in group.options"
                  :label="item.label"
                  :value="item.value"
                  :key="j"
                ></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 基础样式 -->
      <el-tab-pane label="普通样式">
        <el-form label-position="top" :model="style">
          <el-form-item label="定位方式">
            <el-select v-model="style.position" placeholder="请选择">
              <el-option
                v-for="(item, index) in PositionOption"
                :label="item.label"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="左">
            <el-input v-model="style.left"></el-input>
          </el-form-item>
          <el-form-item label="右">
            <el-input v-model="style.right"></el-input>
          </el-form-item>
          <el-form-item label="上">
            <el-input v-model="style.top"></el-input>
          </el-form-item>
          <el-form-item label="下">
            <el-input v-model="style.bottom"></el-input>
          </el-form-item>
          <el-form-item label="宽度">
            <el-input v-model="style.width"></el-input>
          </el-form-item>
          <el-form-item label="高度">
            <el-input v-model="style.heigh"></el-input>
          </el-form-item>
          <el-form-item label="外边距">
            <el-input v-model="style.margin"></el-input>
          </el-form-item>
          <el-form-item label="内边距">
            <el-input v-model="style.padding"></el-input>
          </el-form-item>
          <el-form-item label="旋转角度">
            <el-slider v-model="style.rotate" :min="0" :max="360" :step="1" show-input></el-slider>
          </el-form-item>
          <el-form-item label="透明度">
            <el-slider v-model="style.opacity" :min="0" :max="100" :step="1" show-input></el-slider>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 背景 -->
      <el-tab-pane label="背景设置">
        <el-form label-position="top" :model="bg">
          <el-form-item label="背景图" prop="bg">
            <div
              class="img-view"
              :style="{backgroundImage:bg.backgroundImage}"
              @click="changeImage"
            >
              <i class="el-icon-plus"></i>
            </div>
            <div class="mt10 tl" v-if="bg.backgroundImage">
              <el-button type="default" size="mini" @click="deleteImage">删除图片</el-button>
              <el-button type="default" size="mini" @click="changeImage">修改图片</el-button>
            </div>
          </el-form-item>
          <el-form-item label="固定方式">
            <el-radio-group v-model="bg.backgroundAttachment" size="small">
              <el-radio-button label="fixed">不滚动</el-radio-button>
              <el-radio-button label="scroll">随内容滚动</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="对齐方式">
            <el-radio-group v-model="bg.backgroundPosition" size="small">
              <el-radio-button label="left top">左-上</el-radio-button>
              <el-radio-button label="center top">中-上</el-radio-button>
              <el-radio-button label="right top">右-上</el-radio-button>
            </el-radio-group>

            <el-radio-group v-model="bg.backgroundPosition" size="small">
              <el-radio-button label="left center">左-中</el-radio-button>
              <el-radio-button label="center center">中-中</el-radio-button>
              <el-radio-button label="right center">右-中</el-radio-button>
            </el-radio-group>

            <el-radio-group v-model="bg.backgroundPosition" size="small">
              <el-radio-button label="left bottom">左-下</el-radio-button>
              <el-radio-button label="center bottom">中-下</el-radio-button>
              <el-radio-button label="right bottom">右-下</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="覆盖方式">
            <el-radio-group v-model="bg.backgroundSize" size="small">
              <el-radio-button label>原始</el-radio-button>
              <el-radio-button label="cover">平铺</el-radio-button>
              <el-radio-button label="contain">适配</el-radio-button>
              <el-radio-button label="100% 100%">拉伸</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="重复方式">
            <el-radio-group v-model="bg.backgroundRepeat" size="small">
              <el-radio-button label="repeat-x">水平</el-radio-button>
              <el-radio-button label="repeat-y">垂直</el-radio-button>
              <el-radio-button label="repeat">全重复</el-radio-button>
              <el-radio-button label="no-repeat">不重复</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="背景颜色">
            <el-input v-model="bg.backgroundColor" placeholder="请输入背景颜色" size="medium">
              <el-color-picker slot="prepend" v-model="bg.backgroundColor" show-alpha></el-color-picker>
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 边框 -->
      <el-tab-pane label="边框">
        <el-form label-position="top" :model="border">
          <el-form-item label="边框颜色">
            <el-input v-model="border.borderColor" placeholder="边框颜色" size="medium">
              <el-color-picker v-model="border.borderColor" show-alpha slot="prepend"></el-color-picker>
            </el-input>
          </el-form-item>
          <el-form-item label="边框类型">
            <el-select v-model="border.borderStyle" placeholder="请选择">
              <el-option
                v-for="(item, index) in borderStyleOptions"
                :label="item.label"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="边框宽度">
            <el-input v-model="border.borderWidth" placeholder="边框宽度"></el-input>
            <!-- <el-slider v-model="border.borderWidth" :min="0" :max="100" :step="1" show-input> -->
            <!-- </el-slider> -->
          </el-form-item>
          <el-form-item label="边框圆角">
            <el-input v-model="border.borderRadius" placeholder="边框圆角"></el-input>
            <!-- <el-slider v-model="border.borderRadius" :min="0" :max="100" :step="1" show-input> -->
            <!-- </el-slider> -->
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 阴影 -->
      <el-tab-pane label="阴影">
        <el-form label-position="top" :model="shadow">
          <el-form-item label="阴影颜色">
            <el-input v-model="shadow.shadowColor" shadowColor="阴影颜色" size="medium">
              <el-color-picker v-model="shadow.shadowColor" show-alpha slot="prepend"></el-color-picker>
            </el-input>
          </el-form-item>
          <el-form-item label="阴影大小">
            <el-input v-model="shadow.shadowWidth" shadowColor="阴影颜色" size="medium"/>
          </el-form-item>
          <el-form-item label="模糊半径">
            <el-slider v-model="shadow.shadowRadius" :min="0" :max="100" :step="1" show-input></el-slider>
          </el-form-item>
          <el-form-item label="阴影方向">
            <el-slider v-model="shadow.shadowDire" :min="0" :max="360" :step="1" show-input></el-slider>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- css样式编程模式 -->
      <!-- <el-tab-pane label="编程样式">
        <textarea style="width:100%;height:500px;resize:none;outline:0;" rows="3" cols="20" wrap="soft" placeholder="请在此输入css代码，仅对当前选择元素有效">

        </textarea>
      </el-tab-pane>-->
    </el-tabs>
    <div style="padding:10px;text-align:right;">
    <el-button icon="el-icon-check" type="danger" @click="updateStyle">保存</el-button>
    </div>
    <el-dialog title="媒体列表" :visible.sync="showPicList" width="800px" :append-to-body="true">
      <file-list @select="selectFile"></file-list>
    </el-dialog>
  </div>
</template>

<script>
import fileList from "@/components/FileList";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showPicList: false,
      setting: {
        class: "",
        id: "",
        enterAnimation: "" // 入场动画
      },
      bg: {
        backgroundImage: "",
        backgroundPosition: "",
        backgroundSize: "",
        backgroundRepeat: "",
        backgroundColor: "",
        backgroundAttachment: ""
      },
      style: {
        position: "",
        left: "",
        right: "",
        top: "",
        bottom: "",
        opacity: 100,
        margin: 0,
        padding: 0,
        rotate: 0,
        width: "",
        height: ""
      },
      border: {
        borderWidth: 0,
        borderColor: "",
        borderStyle: "",
        borderRadius: 0
      },
      shadow: {
        shadowWidth: 0,
        shadowRadius: 0,
        shadowDire: 0,
        shadowColor: ""
      },
      PositionOption: [
        {
          name: "静止",
          value: "static"
        },
        {
          name: "相对",
          value: "relative"
        },
        {
          name: "绝对",
          value: "fixed"
        },
        {
          name: "固定",
          value: "absolute"
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
      ],
      animateOptions: [
        {
          label: "强调",
          options: [
            {
              value: "bounce",
              label: "弹跳"
            },
            {
              value: "flash",
              label: "flash"
            },
            {
              value: "pulse",
              label: "pulse"
            },
            {
              value: "rubberBand",
              label: "rubberBand"
            },
            {
              value: "shake",
              label: "shake"
            },
            {
              value: "headShake",
              label: "headShake"
            },
            {
              value: "swing",
              label: "swing"
            },
            {
              value: "tada",
              label: "tada"
            },
            {
              value: "wobble",
              label: "wobble"
            },
            {
              value: "jello",
              label: "jello"
            }
          ]
        },
        {
          label: "进入",
          options: [
            {
              value: "bounceIn",
              label: "bounceIn"
            },
            {
              value: "bounceInDown",
              label: "bounceInDown"
            },
            {
              value: "bounceInLeft",
              label: "bounceInLeft"
            },
            {
              value: "bounceInRight",
              label: "bounceInRight"
            },
            {
              value: "bounceInUp",
              label: "bounceInUp"
            },
            {
              value: "bounceOut",
              label: "bounceOut"
            },
            {
              value: "bounceOutDown",
              label: "bounceOutDown"
            },
            {
              value: "bounceOutLeft",
              label: "bounceOutLeft"
            },
            {
              value: "bounceOutRight",
              label: "bounceOutRight"
            },
            {
              value: "bounceOutUp",
              label: "bounceOutUp"
            },
            {
              value: "fadeIn",
              label: "fadeIn"
            },
            {
              value: "fadeInDown",
              label: "fadeInDown"
            }
          ]
        }
      ]
    };
  },
  components: {
    fileList
  },
  props: {
    styleSetting: Object,
    styleBg: Object,
    styleStyle: Object,
    styleBorder: Object,
    styleShadow: Object
  },
  methods: {
    deleteImage() {},
    changeImage() {
      this.showPicList = true;
    },
    selectFile(file) {
      this.bg.backgroundImage = `url(${this.cdnurl}${file.src})`;
      this.showPicList = false;
    },
    updateStyle() {
      this.$emit("updataStyle", {
        styleSetting: JSON.parse(JSON.stringify(this.setting)),
        styleBg: JSON.parse(JSON.stringify(this.bg)),
        styleStyle: JSON.parse(JSON.stringify(this.style)),
        styleBorder: JSON.parse(JSON.stringify(this.border)),
        styleShadow: JSON.parse(JSON.stringify(this.shadow))
      });
    }
  },
  computed: {
    ...mapGetters(["cdnurl"])
  },
  watch: {
    value(val) {
      if (val) {
        Object.assign(
          this.setting,
          JSON.parse(JSON.stringify(this.styleSetting))
        );
        Object.assign(this.bg, JSON.parse(JSON.stringify(this.styleBg)));
        Object.assign(this.style, JSON.parse(JSON.stringify(this.styleStyle)));
        Object.assign(
          this.border,
          JSON.parse(JSON.stringify(this.styleBorder))
        );
        Object.assign(
          this.shadow,
          JSON.parse(JSON.stringify(this.styleShadow))
        );
      } else {
        // console.log("emit");
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editStyle {
}

.img-view {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #eee;
  text-align: center;
  line-height: 60px;
  width: 60px;
  height: 60px;
  display: inline-block;
}
</style>
