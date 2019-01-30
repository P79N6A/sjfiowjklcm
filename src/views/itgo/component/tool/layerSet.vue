<template>
  <div class="layer-set">
    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialogFormVisible"
      title="页面设置"
      width="300px"
      :modal="false"
      :close-on-click-modal="false"
    >
      <el-scrollbar class="shows">
        <el-tabs type="border-card">
          <el-tab-pane label="样式">
            <el-form :label-position="'left'" label-width="70px" :model="settingForm">
              <el-collapse v-model="activeNames">
                <el-collapse-item title="文本" name="1">
                  <el-form-item label="文字内容" prop="content">
                    <el-input v-model="settingForm.content" placeholder="文字内容" type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item label="字体" prop="bg">
                    <el-select v-model="settingForm.font.fontFamily" placeholder="请选择">
                      <el-option
                        v-for="(item, i) in fontFamilyOptions"
                        :label="item.label"
                        :value="item.value"
                        :key="i"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="字体颜色" prop="style">
                    <el-input v-model="settingForm.font.color" placeholder="字体颜色" size="medium">
                      <el-color-picker slot="prepend" v-model="settingForm.style.color" show-alpha></el-color-picker>
                    </el-input>
                  </el-form-item>

                  <el-form-item label="对齐方式" prop="bg">
                    <el-select v-model="settingForm.font.textAlign" placeholder="请选择">
                      <el-option label="左对齐" value="left">左对齐</el-option>
                      <el-option label="居中" value="center">居中</el-option>
                      <el-option label="右对齐" value="right">右对齐</el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="行高" prop="border">
                    <el-slider v-model="settingForm.font.lineHeight" :min="0" :max="10" :step="0.1"></el-slider>
                  </el-form-item>
                  <el-form-item label="字距" prop="border">
                    <el-slider
                      v-model="settingForm.font.letterSpacing"
                      :min="0"
                      :max="10"
                      :step="0.1"
                    ></el-slider>
                  </el-form-item>
                  <div class="line-style">
                    <el-tooltip class="item" effect="dark" content="加粗" placement="top">
                      <i
                        class="el-icon-info"
                        :class="{active:settingForm.font.fontWeight=='bold'}"
                        @click="settingForm.font.fontWeight?settingForm.font.fontWeight='':settingForm.font.fontWeight='bold'"
                      ></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="倾斜" placement="top">
                      <i
                        class="el-icon-info"
                        :class="{active:settingForm.font.fontStyle=='italic'}"
                        @click="settingForm.font.fontStyle?settingForm.font.fontStyle='':settingForm.font.fontStyle='italic'"
                      ></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="下划线" placement="top">
                      <i
                        class="el-icon-info"
                        :class="{active:settingForm.font.textDecoration=='underline'}"
                        @click="settingForm.font.textDecoration=='underline'?settingForm.font.textDecoration='':settingForm.font.textDecoration='underline'"
                      ></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除线" placement="line-through">
                      <i
                        class="el-icon-info"
                        :class="{active:settingForm.font.textDecoration=='line-through'}"
                        @click="settingForm.font.textDecoration=='line-through'?settingForm.font.textDecoration='':settingForm.font.textDecoration='line-through'"
                      ></i>
                    </el-tooltip>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="背景" name="2">
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
                        <el-radio-button label="left top">1</el-radio-button>
                        <el-radio-button label="center top">2</el-radio-button>
                        <el-radio-button label="right top">3</el-radio-button>
                      </el-radio-group>

                      <el-radio-group v-model="settingForm.bg.backgroundPosition" size="small">
                        <el-radio-button label="left center">4</el-radio-button>
                        <el-radio-button label="center center">5</el-radio-button>
                        <el-radio-button label="right center">6</el-radio-button>
                      </el-radio-group>

                      <el-radio-group v-model="settingForm.bg.backgroundPosition" size="small">
                        <el-radio-button label="left bottom">7</el-radio-button>
                        <el-radio-button label="center bottom">8</el-radio-button>
                        <el-radio-button label="right bottom">9</el-radio-button>
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
                <el-collapse-item title="边框" name="3">
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
                    <el-input v-model="settingForm.border.borderWidth" placeholder="边框宽度">
                      <template slot="append">PX</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="边框圆角" prop="border">
                    <el-input v-model="settingForm.border.borderRadius" placeholder="边框圆角">
                      <template slot="append">PX</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="边框颜色" prop="border">
                    <el-input
                      v-model="settingForm.border.borderColor"
                      placeholder="边框颜色"
                      size="medium"
                    >
                      <el-color-picker slot="prepend" v-model="settingForm.borderColor" show-alpha></el-color-picker>
                    </el-input>
                  </el-form-item>
                </el-collapse-item>
                <el-collapse-item title="阴影" name="5">
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
                <el-collapse-item title="其他" name="4">
                  <el-form-item label="元素宽度" prop="style">
                    <el-input v-model="settingForm.style.width" placeholder="请输入组件长度">
                      <template slot="append">PX</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="元素高度" prop="style">
                    <el-input v-model="settingForm.style.height" placeholder="请输入组件宽度">
                      <template slot="append">PX</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="透明程度" prop="style">
                    <el-slider v-model="settingForm.style.opacity" :min="0" :max="100"></el-slider>
                  </el-form-item>
                  <el-form-item label="旋转角度" prop="style">
                    <el-slider v-model="settingForm.style.rotate" :min="0" :max="360"></el-slider>
                  </el-form-item>
                </el-collapse-item>
              </el-collapse>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="动画">
            <div class="control">
              <el-button-group>
                <el-button>添加动画</el-button>
                <el-button>预览动画</el-button>
              </el-button-group>
            </div>
            <div class="animate-list">
              <el-collapse v-model="activeNames" v-for="(item,i) in animate" :key="i">
                <el-collapse-item :title="`动画${i+1}`" :name="i">
                  <el-form :label-position="'left'" label-width="70px" :model="settingForm">
                    <el-form-item label="动画">
                      <el-select v-model="animate[i].animationTimingFunction" placeholder="请选择">
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
                      <el-slider v-model="animate[i].animationDelay" :max="100" :step="0.1"></el-slider>
                    </el-form-item>
                    <el-form-item label="时长">
                      <el-slider v-model="animate[i].animationDuration" :max="100" :step="0.1"></el-slider>
                    </el-form-item>
                    <el-form-item
                      label="次数"
                      v-show="animate[i].animationIterationCount!='infinite'"
                    >
                      <el-input-number
                        v-model="animate[i].animationIterationCount"
                        :min="1"
                        :max="1000"
                        label="次数"
                      ></el-input-number>
                    </el-form-item>
                    <el-form-item label="循环" v-if="i==animate.length-1">
                      <el-switch
                        v-model="animate[i].animationIterationCount"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-value="infinite"
                        inactive-value="1"
                      ></el-switch>
                    </el-form-item>
                    <div style="padding:5px 0;text-align:center;">
                      <el-button type="danger">删除动画</el-button>
                    </div>
                  </el-form>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-tab-pane>
          <el-tab-pane label="事件">
            <el-collapse>
              <el-collapse-item title="鼠标点击">
                <div>点击时触发事件</div>
                <el-select v-model="event.click.type" placeholder="时间类型">
                  <el-option
                    v-for="(item, i) in eventOptions"
                    :label="item.label"
                    :value="item.value"
                    :key="i"
                  ></el-option>
                </el-select>
                <div v-show="event.click.type=='index'">页面下标
                  <el-input v-model="event.click.index"></el-input>
                </div>
                <div v-show="event.click.type=='link'">链接地址
                  <el-input v-model="event.click.link" v-show="event.click.type=='link'"></el-input>在新窗口打开
                  <el-switch
                    v-show="event.click.type=='link'"
                    v-model="event.click.target"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="_blank"
                    inactive-value="self"
                  ></el-switch>
                </div>
              </el-collapse-item>
              <!-- <el-collapse-item title="鼠标悬浮"></el-collapse-item> -->
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui

export default {
  name: "layerSet",
  directives: {
    elDragDialog
  },
  data() {
    return {
      activeNames: ["1"],
      dialogFormVisible: false,
      activeNames: ["1"],
      activeAnimat: [],
      dialogFormVisible: false,
      settingForm: {
        content: "",
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
        font: {
          color: "",
          textAlign: "",
          fontFamily: "",
          lineHeight: "",
          letterSpacing: "",
          fontWeight: "", //'normal'|'bold'
          fontStyle: "italic", // 'normal'|italic'
          textDecoration: "" // ''|'underline','line-through'
        },
        style: {
          width: 0,
          height: 0,
          opacity: 100,
          rotate: 0
        },
        enterAnimation: {},
        enterAnimationDire: "",
        leaveAnimation: {},
        leaveAnimationDire: ""
      },
      event: {
        click: {
          type: "",
          link: "",
          index: "",
          target: ""
        }
      },
      animate: [
        {
          animationDelay: 0,
          animationDuration: 1,
          animationFillMode: "both",
          animationName: "",
          animationPlayState: "initial",
          animationTimingFunction: "fadeIn"
        },
        {
          animationDelay: 0,
          animationDuration: 1,
          animationFillMode: "both",
          animationName: "",
          animationPlayState: "initial",
          animationTimingFunction: "fadeIn"
        },
        {
          animationDelay: 0,
          animationDuration: 1,
          animationFillMode: "both",
          animationName: "",
          animationPlayState: "initial",
          animationTimingFunction: "fadeIn"
        }
      ],
      animateSelect: {},
      direName: "",
      animateOptions: [
        {
          label: "进入",
          options: [
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
          ]
        },
        {
          label: "强调",
          options: [
            {
              value: "wobble",
              label: "摇摆",
              dire: false
            },
            {
              value: "rubberBand",
              label: "抖动",
              dire: false
            },
            {
              value: "rotateIn",
              label: "旋转",
              dire: false
            },
            {
              value: "flip",
              label: "翻转",
              dire: false
            },
            {
              value: "swing",
              label: "悬摆",
              dire: false
            },
            {
              value: "flash",
              label: "闪烁",
              dire: false
            },
            {
              value: "tada",
              label: "放大抖动",
              dire: false
            },
            {
              value: "jello",
              label: "倾斜摆动",
              dire: false
            },
            {
              value: "slideDown",
              label: "下滑",
              dire: false
            },
            {
              value: "slideUp",
              label: "上滑",
              dire: false
            }
          ]
        },
        {
          label: "退出",
          options: [
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
          ]
        },
        {
          label: "特殊",
          options: [
            {
              value: "j-typewriter",
              label: "打字机",
              dire: false
            }
          ]
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
      ],
      fontFamilyOptions: [
        {
          value: "Arial, sans-serif",
          label: "无衬线字体"
        },
        {
          value: "Times, Times New Roman, serif",
          label: "衬线字体"
        },
        {
          value: "Andale Mono, monospace",
          label: "等宽字体"
        }
      ],
      eventOptions: [
        {
          value: "",
          label: "无"
        },
        {
          value: "close",
          label: "关闭组件"
        },
        {
          value: "pre",
          label: "上一页"
        },
        {
          value: "next",
          label: "下一页"
        },
        {
          value: "index",
          label: "指定页"
        },
        {
          value: "link",
          label: "超链接"
        }
      ]
    };
  },
  methods: {},
  created() {
    this.$bus.$on("openLayerSet", eventData => {
      this.dialogFormVisible = true;
    });
  }
};
</script>
<style lang="scss">
.layer-set {
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
