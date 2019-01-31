<template>
  <div class="layer-set">
    <el-dialog :visible.sync="dialogFormVisible" v-el-drag-dialog title="元素属性" width="300px" :modal="false"
      :close-on-click-modal="false">
      <el-scrollbar class="shows">
        <el-tabs type="border-card">
          <el-tab-pane label="样式">
            <el-form :label-position="'left'" label-width="70px" :model="settingForm">
              <el-collapse v-model="activeNames">
                <!-- 文本 -->
                <el-collapse-item title="文本" name="1">
                  <el-form-item label="文字内容" prop="content">
                    <el-input v-model="settingForm.config.content" placeholder="文字内容" type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item label="字体" prop="bg">
                    <el-select v-model="settingForm.text.fontFamily" placeholder="请选择">
                      <el-option v-for="(item, i) in fontFamilyOptions" :label="item.label" :value="item.value" :key="i"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="字体颜色" prop="style">
                    <el-input v-model="settingForm.text.color" placeholder="字体颜色" size="medium">
                      <el-color-picker slot="prepend" v-model="settingForm.text.color" show-alpha></el-color-picker>
                    </el-input>
                  </el-form-item>

                  <el-form-item label="对齐方式" prop="bg">
                    <el-select v-model="settingForm.text.textAlign" placeholder="请选择">
                      <el-option label="左对齐" value="left">左对齐</el-option>
                      <el-option label="居中" value="center">居中</el-option>
                      <el-option label="右对齐" value="right">右对齐</el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="行高" prop="border">
                    <el-slider v-model="settingForm.text.lineHeight" :min="0" :max="10" :step="0.1"></el-slider>
                  </el-form-item>
                  <el-form-item label="字距" prop="border">
                    <el-slider v-model="settingForm.text.letterSpacing" :min="0" :max="10" :step="0.1"></el-slider>
                  </el-form-item>
                  <div class="line-style">
                    <el-tooltip class="item" effect="dark" content="加粗" placement="top">
                      <i class="el-icon-info" :class="{active:settingForm.text.fontWeight=='bold'}" @click="settingForm.text.fontWeight?settingForm.text.fontWeight='':settingForm.text.fontWeight='bold'"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="倾斜" placement="top">
                      <i class="el-icon-info" :class="{active:settingForm.text.fontStyle=='italic'}" @click="settingForm.text.fontStyle?settingForm.text.fontStyle='':settingForm.text.fontStyle='italic'"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="下划线" placement="top">
                      <i class="el-icon-info" :class="{active:settingForm.text.textDecoration=='underline'}" @click="settingForm.text.textDecoration=='underline'?settingForm.text.textDecoration='':settingForm.text.textDecoration='underline'"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除线" placement="line-through">
                      <i class="el-icon-info" :class="{active:settingForm.text.textDecoration=='line-through'}" @click="settingForm.text.textDecoration=='line-through'?settingForm.text.textDecoration='':settingForm.text.textDecoration='line-through'"></i>
                    </el-tooltip>
                  </div>
                </el-collapse-item>
                <!-- 背景 -->
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
                <!-- 其他 -->
                <el-collapse-item title="基础" name="3">
                  <el-form-item label="元素宽度" prop="style">
                    <el-input v-model="settingForm.base.width" placeholder="请输入组件长度">
                      <template slot="append">PX</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="元素高度" prop="style">
                    <el-input v-model="settingForm.base.height" placeholder="请输入组件宽度">
                      <template slot="append">PX</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="透明程度" prop="style">
                    <el-slider v-model="settingForm.base.opacity" :min="0" :max="100"></el-slider>
                  </el-form-item>
                  <el-form-item label="旋转角度" prop="style">
                    <el-slider v-model="settingForm.base.rotate" :min="0" :max="360"></el-slider>
                  </el-form-item>
                </el-collapse-item>
                <!-- 边框 -->
                <el-collapse-item title="边框" name="4">
                  <el-form-item label="边框类型" prop="border">
                    <el-select v-model="settingForm.border.borderStyle" placeholder="边框类型">
                      <el-option v-for="(item, i) in borderStyleOptions" :label="item.label" :value="item.value" :key="i"></el-option>
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
                    <el-input v-model="settingForm.border.borderColor" placeholder="边框颜色" size="medium">
                      <el-color-picker slot="prepend" v-model="settingForm.borderColor" show-alpha></el-color-picker>
                    </el-input>
                  </el-form-item>
                </el-collapse-item>
                <!-- 阴影 -->
                <el-collapse-item title="阴影" name="5">
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
                    <el-switch v-model="settingForm.shadow.shadowinSet" active-text="朝内" inactive-text="朝外"
                      active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
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
                        <el-option-group v-for="(group, index2) in animateOptions" :label="group.label" :key="index2"
                          v-if="(ctype===1&&group.label==='特殊')||group.label!=='特殊'">
                          <el-option v-for="(item, index3) in group.options" :label="item.label" :value="item.value"
                            :disabled="item.disabled" :key="index3"></el-option>
                        </el-option-group>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="延时">
                      <el-slider v-model="animate[i].animationDelay" :max="100" :step="0.1"></el-slider>
                    </el-form-item>
                    <el-form-item label="时长">
                      <el-slider v-model="animate[i].animationDuration" :max="100" :step="0.1"></el-slider>
                    </el-form-item>
                    <el-form-item label="次数" v-show="animate[i].animationIterationCount!='infinite'">
                      <el-input-number v-model="animate[i].animationIterationCount" :min="1" :max="1000" label="次数"></el-input-number>
                    </el-form-item>
                    <el-form-item label="循环" v-if="i==animate.length-1">
                      <el-switch v-model="animate[i].animationIterationCount" active-color="#13ce66" inactive-color="#ff4949"
                        active-value="infinite" inactive-value="1"></el-switch>
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
                  <el-option v-for="(item, i) in eventOptions" :label="item.label" :value="item.value" :key="i"></el-option>
                </el-select>
                <div v-show="event.click.type=='index'">页面下标
                  <el-input v-model="event.click.index"></el-input>
                </div>
                <div v-show="event.click.type=='link'">链接地址
                  <el-input v-model="event.click.link" v-show="event.click.type=='link'"></el-input>在新窗口打开
                  <el-switch v-show="event.click.type=='link'" v-model="event.click.target" active-color="#13ce66"
                    inactive-color="#ff4949" active-value="_blank" inactive-value="self"></el-switch>
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
        settingForm: {
          bg: {
            backgroundImage: "",
            backgroundColor: "",
            backgroundSize: "",
            backgroundRepeat: "",
            backgroundPosition: ""
          },
          text: {
            color: "#ddd",
            textAlign: "center",
            fontFamily: "simon",
            lineHeight: "1.5",
            letterSpacing: "",
            fontSize:"",
            fontWeight: "",
            fontStyle: "italic",
            textDecoration: ""
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
          config:{
            content:''
          }
        },
        event: {
          click: {
            type: "",
            link: "",
            index: "",
            target: ""
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
        console.log(this.layerjson)
        this.settingForm.bg = this.layerjson.style.bg;
        this.settingForm.border = this.layerjson.style.border;
        this.settingForm.shadow = this.layerjson.style.shadow;
        this.settingForm.base = this.layerjson.style.base;
        this.settingForm.text = this.layerjson.style.text;
        this.settingForm.config=this.settingForm.config;
        console.log(this.settingForm.base)
      }
    },
    props: ['layerjson'],
    created() {
      this.$bus.$on("openLayerSet", eventData => {
        this.dialogFormVisible = true;
      });
    },
    watch: {
      layerjson(val) {
        this.initData()
      }
    },
    mounted() {
      this.initData()
    }
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
