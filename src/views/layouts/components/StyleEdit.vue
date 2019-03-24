<template>
  <div class="layer-set">
    <el-dialog
      :visible.sync="dialogFormVisible"
      v-el-drag-dialog
      title="元素属性"
      width="300px"
      :modal="false"
      :close-on-click-modal="false"
    >
      <el-scrollbar class="shows" v-if="styleTemp">
        <el-tabs type="border-card">
          <el-tab-pane label="样式">
            <el-form :label-position="'left'" label-width="70px" :model="settingForm">
              <el-collapse v-model="activeNames">
                <el-collapse-item title="基础" name="1">
                  <el-form-item label="元素高度" prop="style">
                    <el-input v-model="settingForm.base.height" placeholder="请输入组件高度">
                      <template slot="append">PX</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="水平排列" prop="base">
                    <el-select v-model="settingForm.base.justify" placeholder="水平排列">
                      <el-option label="左对齐" value="flex-start"></el-option>
                      <el-option label="右对齐" value="flex-end"></el-option>
                      <el-option label="居中" value="center"></el-option>
                      <el-option label="靠两边" value="space-between"></el-option>
                      <el-option label="分散对齐" value="space-around"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="垂直排列" prop="base">
                    <el-select v-model="settingForm.base.align" placeholder="垂直排列">
                      <el-option label="顶部对齐" value="flex-start"></el-option>
                      <el-option label="底部对齐" value="flex-end"></el-option>
                      <el-option label="居中" value="center"></el-option>
                      <el-option label="靠顶/底" value="space-between"></el-option>
                      <el-option label="分散对齐" value="space-around"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="层级" prop="style">
                    <el-input v-model="settingForm.base.zIndex" placeholder="层级顺序"></el-input>
                  </el-form-item>
                  <el-form-item label="透明程度" prop="style">
                    <el-slider v-model="settingForm.base.opacity" :min="0" :max="100"></el-slider>
                  </el-form-item>
                  <el-form-item label="旋转角度" prop="style">
                    <el-slider v-model="settingForm.base.rotate" :min="-180" :max="180"></el-slider>
                  </el-form-item>
                  <el-form-item label="超出部分" prop="border">
                    <el-select v-model="settingForm.base.overflow" placeholder="边框类型">
                      <el-option label="显示" value="visible"></el-option>
                      <!-- <el-option label="隐藏" value="hidden"></el-option> -->
                      <el-option label="滚动" value="scroll"></el-option>
                    </el-select>
                  </el-form-item>
                </el-collapse-item>
                <el-collapse-item title="边距" name="2">
                  <el-form-item label="左边距离" prop="border">
                    <el-input v-model="settingForm.padding.left" placeholder="左边距离">
                      <template slot="append">PX</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="右边距离" prop="border">
                    <el-input v-model="settingForm.padding.right" placeholder="右边距离">
                      <template slot="append">PX</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="顶部距离" prop="border">
                    <el-input v-model="settingForm.padding.top" placeholder="顶部距离">
                      <template slot="append">PX</template>
                    </el-input>
                  </el-form-item>

                  <el-form-item label="底部距离" prop="border">
                    <el-input v-model="settingForm.padding.bottom" placeholder="底部距离">
                      <template slot="append">PX</template>
                    </el-input>
                  </el-form-item>
                </el-collapse-item>
                <el-collapse-item title="定位" name="3">
                  <el-form-item label="定位" prop="style">
                    <el-select v-model="settingForm.position.position" placeholder="边框类型">
                      <el-option
                        v-for="(item, i) in positionOptions"
                        :label="item.label"
                        :value="item.value"
                        :key="i"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="左边距离" prop="border">
                    <el-input v-model="settingForm.position.left" placeholder="左边距离">
                      <template slot="append">PX</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="右边距离" prop="border">
                    <el-input v-model="settingForm.position.right" placeholder="右边距离">
                      <template slot="append">PX</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="顶部距离" prop="border">
                    <el-input v-model="settingForm.position.top" placeholder="顶部距离">
                      <template slot="append">PX</template>
                    </el-input>
                  </el-form-item>

                  <el-form-item label="底部距离" prop="border">
                    <el-input v-model="settingForm.position.bottom" placeholder="底部距离">
                      <template slot="append">PX</template>
                    </el-input>
                  </el-form-item>
                </el-collapse-item>

                <el-collapse-item title="背景" name="4">
                  <el-form-item label="背景图" prop="bg">
                    <div
                      class="img-view"
                      :style="`backgroundImage:url('${cdnurl}${settingForm.bg.backgroundImage}')`"
                      @click="$bus.$emit('openImgList','ChangeStyleBg')"
                    >
                      <i class="el-icon-plus"></i>
                    </div>
                    <div class="mt10 tc">
                      <el-button-group>
                        <el-button
                          type="primary"
                          size="mini"
                          @click="settingForm.bg.backgroundImage=''"
                        >删除</el-button>
                        <el-button
                          type="danger"
                          size="mini"
                          @click="$bus.$emit('openImgList','ChangeEleBg')"
                        >修改</el-button>
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
                    <el-input
                      v-model="settingForm.bg.backgroundColor"
                      placeholder="纯色背景"
                      size="medium"
                    >
                      <el-color-picker
                        slot="prepend"
                        v-model="settingForm.bg.backgroundColor"
                        show-alpha
                      ></el-color-picker>
                    </el-input>
                  </el-form-item>
                </el-collapse-item>

                <el-collapse-item title="边框" name="5">
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
                  <el-form-item label="边框宽度" prop="border">
                    <el-slider v-model="settingForm.border.borderWidth" :max="100" :min="0"></el-slider>
                  </el-form-item>
                  <el-form-item label="边框圆角" prop="border">
                    <el-slider v-model="settingForm.border.borderRadius" :max="200" :min="0"></el-slider>
                  </el-form-item>
                  <el-form-item label="边框颜色" prop="border">
                    <el-input
                      v-model="settingForm.border.borderColor"
                      placeholder="边框颜色"
                      size="medium"
                    >
                      <el-color-picker
                        slot="prepend"
                        v-model="settingForm.border.borderColor"
                        show-alpha
                      ></el-color-picker>
                    </el-input>
                  </el-form-item>
                </el-collapse-item>
                <el-collapse-item title="阴影" name="6">
                  <el-form-item label="阴影颜色" prop="shadow">
                    <el-input
                      v-model="settingForm.shadow.shadowColor"
                      placeholder="阴影颜色"
                      size="medium"
                    >
                      <el-color-picker
                        slot="prepend"
                        v-model="settingForm.shadow.shadowColor"
                        show-alpha
                      ></el-color-picker>
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
                    <el-switch
                      v-model="settingForm.shadow.shadowinSet"
                      active-text="朝内"
                      inactive-text="朝外"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    ></el-switch>
                  </el-form-item>
                </el-collapse-item>
              </el-collapse>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="动画">
            <div class="control">
              <el-button-group>
                <el-button @click="addAnimate">添加动画</el-button>
                <el-button @click="preAnimate">预览动画</el-button>
              </el-button-group>
            </div>
            <div class="animate-list">
              <el-collapse v-model="activeNames" v-for="(item,i) in animateTemp" :key="i">
                <el-collapse-item :title="`动画${i+1}`" :name="i">
                  <el-form :label-position="'left'" label-width="70px" :model="animationName">
                    <el-form-item label="动画">
                      <el-select v-model="animateTemp[i].animationName" placeholder="请选择">
                        <el-option label="无" value></el-option>
                        <el-option-group
                          v-for="(group, index2) in animateOptions"
                          :label="group.label"
                          :key="index2"
                          v-if="(ctype===1&&group.label==='特殊')||group.label!=='特殊'"
                        >
                          <el-option
                            v-for="(item, index3) in group.options"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled"
                            :key="index3"
                          ></el-option>
                        </el-option-group>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="延时">
                      <el-slider v-model="animateTemp[i].animationDelay" :max="100" :step="0.1"></el-slider>
                    </el-form-item>
                    <el-form-item label="时长">
                      <el-slider v-model="animateTemp[i].animationDuration" :max="100" :step="0.1"></el-slider>
                    </el-form-item>
                    <el-form-item
                      label="次数"
                      v-show="animateTemp[i].animationIterationCount!='infinite'"
                    >
                      <el-input-number
                        v-model="animateTemp[i].animationIterationCount"
                        :min="1"
                        :max="1000"
                        label="次数"
                      ></el-input-number>
                    </el-form-item>
                    <el-form-item label="循环" v-if="i==animateTemp.length-1">
                      <el-switch
                        v-model="animateTemp[i].animationIterationCount"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-value="infinite"
                        inactive-value="1"
                      ></el-switch>
                    </el-form-item>

                    <el-form-item label="动画速度" prop="border">
                      <el-select
                        v-model="animateTemp[i].animationTimingFunction"
                        placeholder="边框类型"
                      >
                        <el-option
                          v-for="(item, i) in TimingFunctionOptions"
                          :label="item.label"
                          :value="item.value"
                          :key="i"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <div style="padding:5px 0;text-align:center;">
                      <el-button type="danger" @click="removeAnimate(i)">删除动画</el-button>
                    </div>
                  </el-form>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </el-dialog>
    <imgList>图片资源框</imgList>
  </div>
</template>

<script>
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui
import imgList from "@/components/ImgList";
import { mapGetters } from "vuex";

import { addContents } from "@/api/contents";

export default {
  name: "layerSet",
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
        position: {
          position: "",
          top: "",
          left: "",
          bottom: "",
          right: "",
          zIndex: ""
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
          shadowinSet: ""
        },
        base: {
          width: 0,
          height: 0,
          opacity: 100,
          rotate: 0,
          align:'start',
          justify:'start'
        },
        padding: {
          top: "",
          left: "",
          bottom: "",
          right: ""
        }
      },
      event: {
        onClick: {
          type: "",
          link: "",
          index: "",
          target: ""
        },
        hover: {
          animation: ""
        }
      },
      positionOptions: [
        {
          value: "",
          label: "无"
        },
        {
          value: "static",
          label: "静止"
        },
        {
          value: "relative",
          label: "相对"
        },
        {
          value: "absolute",
          label: "绝对"
        },
        {
          value: "fixed",
          label: "固定"
        }
      ],
      eventOptions: [
        {
          value: "",
          label: "无"
        },
        {
          value: "close",
          label: "关闭模块"
        },
        {
          value: "pre",
          label: "上一场景"
        },
        {
          value: "next",
          label: "下一场景"
        },
        {
          value: "index",
          label: "指定序号页面"
        },
        {
          value: "link",
          label: "超链接"
        }
      ],
      animateTemp: [
        {
          animationDelay: 0,
          animationDuration: 1,
          animationFillMode: "both",
          animationIterationCount: 1,
          animationName: "",
          animationPlayState: "initial",
          animationTimingFunction: "ease"
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
      TimingFunctionOptions: [
        {
          value: "linear",
          label: "均匀线性"
        },
        {
          value: "ease",
          label: "慢-快-慢"
        },
        {
          value: "ease-in",
          label: "慢-快"
        },
        {
          value: "ease-out",
          label: "快-慢"
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
      fontFamilyOptions: [
        {
          value: "",
          label: "系统默认"
        },
        {
          value: "SimSun",
          label: "宋体"
        },
        {
          value: "Microsoft Yahei",
          label: "微软雅黑"
        },
        {
          value: "Arial",
          label: "无衬线字体1"
        },
        {
          value: "Tahoma",
          label: "无衬线字体2"
        },
        {
          value: "Verdana",
          label: "无衬线字体3"
        }
      ]
    };
  },
  methods: {
    // 初始化数据
    initData() {
      if (this.styleTemp) {
        this.settingForm.bg = this.styleTemp.bg;
        this.settingForm.border = this.styleTemp.border;
        this.settingForm.shadow = this.styleTemp.shadow;
        this.settingForm.base = this.styleTemp.base;
        this.settingForm.position = this.styleTemp.position;
        this.settingForm.padding = this.styleTemp.padding;
      }
    },
    removeAnimate(index) {
      this.animateTemp.splice(index, 1);
    },
    addAnimate() {
      this.animateTemp.push({
        animationDelay: 0,
        animationDuration: 1,
        animationFillMode: "both",
        animationIterationCount: 1,
        animationName: "",
        animationPlayState: "initial",
        animationTimingFunction: "ease"
      });
    },
    showDataList() {
      this.$bus.$emit("showDataList", this.settingForm.config);
    },
    preAnimate() {
      this.$bus.$emit("animate-preview");
    },
    editCom() {
      this.$bus.$emit("editData", this.settingForm.config);
    }
  },
  computed: {
    ...mapGetters(["cdnurl"])
  },
  props: ["styleTemp"],
  created() {
    this.$bus.$on("openStyleSet", eventData => {
      this.dialogFormVisible = true;
      this.initData();
    });
    this.$bus.$on("ChangeStyleBg", eventData => {
      console.log(eventData);
      this.settingForm.bg.backgroundImage = eventData.url;
    });
  },
  watch: {
    styleTemp(val) {
      console.log(val);
      if (val) {
        this.initData();
      }
    }
  },
  mounted() {
    // 元素背景
    // this.initData();
  },
  components: { imgList }
};
</script>
<style lang="scss">
.layer-set {
  .el-dialog__wrapper {
    right: auto !important;
    overflow: inherit !important;
    width: 0 !important;
  }

  .el-dialog__body {
    padding: 0;
  }

  .shows {
    height: calc(100vh - 84px);
    overflow-y: hidden;

    .title {
      text-align: center;
    }

    .line-style {
      display: flex;
      justify-content: space-around;
      font-size: 20px;

      i {
        color: #ccc;
        cursor: pointer;
        transition: all 0.2s;

        &.active,
        &:hover {
          color: #409eff;
        }
      }
    }

    .control {
      text-align: center;
      padding: 10px 0;
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
