<template>
  <div class="page-set">
    <el-dialog v-el-drag-dialog :visible.sync="dialogFormVisible" title="页面设置" width="250px" :modal="false"
      :close-on-click-modal="false">
      <el-scrollbar class="shows">
        <el-form :label-position="'left'" label-width="70px" :model="settingForm">
          <el-collapse v-model="activeNames" @change="handleChange">
            <!-- 背景配置 -->
            <el-collapse-item title="背景" name="1">
              <el-form-item label="背景图" prop="bg">
                <div class="img-view" :style="`background-image:${settingForm.bg.backgroundImage}`">
                  <i class="el-icon-plus"></i>
                </div>
                <div class="mt10 tc">
                  <el-button-group>
                    <el-button type="primary" size="mini" @click="settingForm.bg.backgroundImage=''">删除</el-button>
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
                  <el-color-picker slot="prepend" v-model="settingForm.bg.backgroundColor" show-alpha></el-color-picker>
                </el-input>
              </el-form-item>
            </el-collapse-item>
            <!-- 基本样式 -->
            <el-collapse-item title="基础" name="2">
              <el-form-item label="页面宽度" prop="width">
                <el-input v-model="settingForm.base.width" placeholder="请输入组件长度">
                  <template slot="append">PX</template>
                </el-input>
              </el-form-item>
              <el-form-item label="页面高度" prop="height">
                <el-input v-model="settingForm.base.height" placeholder="请输入组件宽度">
                  <template slot="append">PX</template>
                </el-input>
              </el-form-item>
              <el-form-item label="透明程度" prop="opacity">
                <el-slider v-model="settingForm.base.opacity" :min="0" :max="100"></el-slider>
              </el-form-item>
              <el-form-item label="旋转角度" prop="rotate">
                <el-slider v-model="settingForm.base.rotate" :min="-180" :max="180"></el-slider>
              </el-form-item>
            </el-collapse-item>
            <!-- 边框 -->
            <el-collapse-item title="边框" name="3">
              <el-form-item label="边框宽度" prop="border">
                <el-slider v-model="settingForm.border.borderWidth" :max="100" :min="0"></el-slider>
              </el-form-item>
              <el-form-item label="边框圆角" prop="border">
                <el-slider v-model="settingForm.border.borderRadius" :max="500" :min="0"></el-slider>
              </el-form-item>
              <el-form-item label="边框颜色" prop="border">
                <el-input v-model="settingForm.border.borderColor" placeholder="边框颜色" size="medium">
                  <el-color-picker slot="prepend" v-model="settingForm.borderColor" show-alpha></el-color-picker>
                </el-input>
              </el-form-item>
              <el-form-item label="边框类型" prop="border">
                <el-select v-model="settingForm.border.borderStyle" placeholder="边框类型">
                  <el-option v-for="(item, i) in borderStyleOptions" :label="item.label" :value="item.value" :key="i"></el-option>
                </el-select>
              </el-form-item>
            </el-collapse-item>
            <!-- 阴影 -->
            <el-collapse-item title="阴影" name="4">
              <el-form-item label="阴影颜色" prop="shadow">
                <el-input v-model="settingForm.shadow.shadowColor" placeholder="阴影颜色" size="medium">
                  <el-color-picker slot="prepend" v-model="settingForm.shadow.shadowColor" show-alpha></el-color-picker>
                </el-input>
              </el-form-item>
              <el-form-item label="水平偏移" prop="shadow">
                <el-slider v-model="settingForm.shadow.shadowX" :max="100" :min="-100"></el-slider>
              </el-form-item>
              <el-form-item label="垂直偏移" prop="shadow">
                <el-slider v-model="settingForm.shadow.shadowY" :max="100" :min="-100"></el-slider>
              </el-form-item>
              <el-form-item label="模糊半径" prop="shadow">
                <el-slider v-model="settingForm.shadow.shadowFuzzy" :max="100"></el-slider>
              </el-form-item>
              <el-form-item label="扩散半径" prop="shadow">
                <el-slider v-model="settingForm.shadow.shadowDire" :max="100"></el-slider>
              </el-form-item>
              <el-form-item label="阴影方向">
                <el-switch v-model="settingForm.shadow.shadowinSet" active-text="朝内" inactive-text="朝外" active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-collapse-item>
            <!-- 入场动画 -->
            <el-collapse-item title="入场动画" name="5">
              <el-form-item label="入场动画" prop="name">
                <el-select v-model="settingForm.animate.enterAnimation" placeholder="请选择">
                  <el-option-group>
                    <el-option label="无" value></el-option>
                  </el-option-group>
                  <el-option-group v-for="(group, i) in animateOptions" :label="group.label" :key="i">
                    <el-option v-for="(item, j) in group.options" :label="item.label" :value="item.value" :key="j"></el-option>
                  </el-option-group>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="离场动画" prop="description">
                <el-select v-model="settingForm.animate.leaveAnimation" placeholder="请选择">
                  <el-option-group>
                    <el-option label="无" value></el-option>
                  </el-option-group>
                  <el-option-group v-for="(group, i) in animateOptions" :label="group.label" :key="i">
                    <el-option v-for="(item, j) in group.options" :label="item.label" :value="item.value" :key="j"></el-option>
                  </el-option-group>
                </el-select>
              </el-form-item> -->
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
            shadowX: 0,
            shadowY: 0,
            shadowFuzzy: 0,
            shadowDire: 0,
            shadowinSet: ''
          },
          base: {
            width: 0,
            height: 0,
            opacity: 100,
            rotate: 0,
          },
          animate: {
            enterAnimation: "",
            leaveAnimation: ""
          }
        },
        animateOptions: [{
            label: "强调",
            options: [{
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
            options: [{
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
        ],
        animateOptionsLeave: [{
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
        borderStyleOptions: [{
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
    methods: {
      // 初始化数据
      initData() {
        // style
        this.settingForm.bg = this.pageSet.bg;
        this.settingForm.border = this.pageSet.border;
        this.settingForm.shadow = this.pageSet.shadow;
        this.settingForm.base = this.pageSet.base;
        this.settingForm.animate = this.pageSet.animate
      }
    },
    created() {
      this.$bus.$on("openPageSet", eventData => {
        this.dialogFormVisible = true;
      });
    },
    props: ["pageSet"],
    watch: {
      pageSet(val) {
        this.initData()
      }
    },
    mounted() {
      this.initData()
    }
  };

</script>
<style lang="scss">
  .page-set {
    .el-dialog__wrapper {
      right: auto !important;
      overflow: inherit !important;
      width:0!important;
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
        line-height: 150px;
        width: 150px;
        height: 150px;
        display: inline-block;
        font-size: 40px;
        cursor: pointer;
      }
    }
  }

</style>
