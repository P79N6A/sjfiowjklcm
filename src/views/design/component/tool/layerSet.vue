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
      <el-scrollbar class="shows">
        <el-tabs type="border-card">
          <el-tab-pane label="样式">
            <el-tabs type="border-card">
              <el-tab-pane>
                <span slot="label">
                  <i class="el-icon-date"></i> 普通状态
                </span>
                <el-form :label-position="'left'" label-width="70px" :model="styleForm">
                  <el-collapse v-model="activeNames">
                    <!-- 其他 -->
                    <el-collapse-item title="基础属性" name="3">
                      <!-- 图片元素 -->
                      <el-form-item label="图片内容" prop="content" v-if="layerjson.type==2">
                        <div
                          @click="$bus.$emit('openImgList','ChangeImgUrl')"
                          class="img-view"
                          :style="`background-image:url('${cdnurl}${config.content}')`"
                        >
                          <i class="el-icon-plus"></i>
                        </div>
                        <div class="mt10 tc">
                          <el-button-group>
                            <el-button
                              type="primary"
                              size="mini"
                              @click="config.content='';$bus.$emit('saveHistory','编辑图片内容')"
                            >删除</el-button>
                            <el-button
                              type="danger"
                              size="mini"
                              @click="$bus.$emit('openImgList','ChangeImgUrl')"
                            >修改</el-button>
                          </el-button-group>
                        </div>
                      </el-form-item>
                      <!-- 形状元素 -->
                      <el-form-item label="形状内容" prop="content" v-if="layerjson.type==9">
                        <div @click="$bus.$emit('openSvgList','ChangSvg')" class="img-view">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            x="0px"
                            y="0px"
                            width="100%"
                            height="100%"
                            :viewBox="config.viewBox"
                            xml:space="preserve"
                            preserveAspectRatio="none"
                            v-show="config.content"
                          >
                            <path :d="config.content" :fill="styleForm.text.color"></path>
                          </svg>
                          <i class="el-icon-plus" v-show="!config.content"></i>
                        </div>
                        <div class="mt10 tc">
                          <el-button-group>
                            <el-button
                              type="primary"
                              size="mini"
                              @click="config.content='';$bus.$emit('saveHistory','编辑图标内容')"
                            >删除</el-button>
                            <el-button
                              type="danger"
                              size="mini"
                              @click="$bus.$emit('openSvgList','ChangSvg')"
                            >修改</el-button>
                          </el-button-group>
                        </div>
                      </el-form-item>
                      <!-- 形状元素 -->
                      <el-form-item label="形状颜色" prop="style" v-if="layerjson.type==9">
                        <el-input
                          v-model="styleForm.text.color"
                          placeholder="形状颜色"
                          size="medium"
                          @change="$bus.$emit('saveHistory','更改图标颜色');$bus.$emit('renderStyle')"
                        >
                          <el-color-picker slot="prepend" v-model="styleForm.text.color" show-alpha></el-color-picker>
                        </el-input>
                      </el-form-item>
                      <!-- vue元素 -->
                      <el-form-item label="组件内容" prop="style" v-if="layerjson.type==10">
                        <el-button-group>
                          <el-button type="primary" size="mini" @click="editCom">组件配置</el-button>
                          <el-button
                            type="danger"
                            size="mini"
                            v-show="config.categoryModel"
                            @click="showDataList"
                          >组件数据</el-button>
                        </el-button-group>
                      </el-form-item>
                      <!-- ================ -->
                      <el-form-item label="元素宽度" prop="style">
                        <el-input
                          v-model="styleForm.base.width"
                          placeholder="请输入组件长度"
                          @change="$bus.$emit('saveHistory','更改元素尺寸');$bus.$emit('renderStyle')"
                        >
                          <template slot="append">PX</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="元素高度" prop="style">
                        <el-input
                          v-model="styleForm.base.height"
                          placeholder="请输入组件宽度"
                          @change="$bus.$emit('saveHistory','更改元素尺寸');$bus.$emit('renderStyle')"
                        >
                          <template slot="append">PX</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="透明程度" prop="style">
                        <el-slider
                          v-model="styleForm.base.opacity"
                          :min="0"
                          :max="100"
                          @change="$bus.$emit('saveHistory','更改元素透明度');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                    </el-collapse-item>
                    <!-- 文本 -->
                    <el-collapse-item title="文本" name="1" v-show="layerjson.type==1">
                      <el-form-item label="文字内容" prop="content">
                        <el-input
                          v-model="config.content"
                          placeholder="文字内容"
                          type="textarea"
                          @change="$bus.$emit('saveHistory','更改文本内容');"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="字体类型" prop="bg">
                        <el-select
                          v-model="styleForm.text.fontFamily"
                          placeholder="请选择"
                          @change="$bus.$emit('saveHistory','更改字体字型');$bus.$emit('renderStyle')"
                        >
                          <el-option
                            v-for="(item, i) in fontFamilyOptions"
                            :label="item.label"
                            :value="item.value"
                            :key="i"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="字体大小" prop="border">
                        <el-slider
                          v-model="styleForm.text.fontSize"
                          :min="12"
                          :max="100"
                          @change="$bus.$emit('saveHistory','更改字体大小');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="字体颜色" prop="style">
                        <el-input
                          v-model="styleForm.text.color"
                          placeholder="字体颜色"
                          size="medium"
                          @change="$bus.$emit('saveHistory','更改文本颜色');$bus.$emit('renderStyle')"
                        >
                          <el-color-picker
                            slot="prepend"
                            v-model="styleForm.text.color"
                            show-alpha
                            @change="$bus.$emit('saveHistory','更改文本颜色');$bus.$emit('renderStyle')"
                          ></el-color-picker>
                        </el-input>
                      </el-form-item>

                      <el-form-item label="对齐方式" prop="bg">
                        <el-select
                          v-model="styleForm.text.textAlign"
                          placeholder="请选择"
                          @change="$bus.$emit('saveHistory','更改文本对齐方式');$bus.$emit('renderStyle')"
                        >
                          <el-option label="左对齐" value="left">左对齐</el-option>
                          <el-option label="居中" value="center">居中</el-option>
                          <el-option label="右对齐" value="right">右对齐</el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="行高"
                        prop="border"
                        @change="$bus.$emit('saveHistory','更改文本行高');$bus.$emit('renderStyle')"
                      >
                        <el-slider
                          v-model="styleForm.text.lineHeight"
                          :min="1"
                          :max="10"
                          :step="0.1"
                          :format-tooltip="(val)=>{return val +'倍'}"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="字距" prop="border">
                        <el-slider
                          v-model="styleForm.text.letterSpacing"
                          :min="0"
                          :max="10"
                          :step="0.1"
                          :format-tooltip="(val)=>{return val +'PX'}"
                          @change="$bus.$emit('saveHistory','更改文本字距');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <div class="line-style">
                        <el-tooltip class="item" effect="dark" content="加粗" placement="top">
                          <i
                            class="iconfont icon-jiacu"
                            :class="{active:styleForm.text.fontWeight=='bold'}"
                            @click="styleForm.text.fontWeight?styleForm.text.fontWeight='':styleForm.text.fontWeight='bold';$bus.$emit('saveHistory','更改加粗');$bus.$emit('renderStyle')"
                          ></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="倾斜" placement="top">
                          <i
                            class="iconfont icon-qingxie"
                            :class="{active:styleForm.text.fontStyle=='italic'}"
                            @click="styleForm.text.fontStyle?styleForm.text.fontStyle='':styleForm.text.fontStyle='italic';$bus.$emit('saveHistory','更改斜体');$bus.$emit('renderStyle')"
                          ></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="下划线" placement="top">
                          <i
                            class="iconfont icon-underline"
                            :class="{active:styleForm.text.textDecoration=='underline'}"
                            @click="styleForm.text.textDecoration=='underline'?styleForm.text.textDecoration='':styleForm.text.textDecoration='underline';$bus.$emit('saveHistory','更改下划线');$bus.$emit('renderStyle')"
                          ></i>
                        </el-tooltip>
                        <el-tooltip
                          class="item"
                          effect="dark"
                          content="删除线"
                          placement="line-through"
                        >
                          <i
                            class="iconfont icon-shanchuxian"
                            :class="{active:styleForm.text.textDecoration=='line-through'}"
                            @click="styleForm.text.textDecoration=='line-through'?styleForm.text.textDecoration='':styleForm.text.textDecoration='line-through';$bus.$emit('saveHistory','更改删除线');$bus.$emit('renderStyle')"
                          ></i>
                        </el-tooltip>
                      </div>
                    </el-collapse-item>
                    <!-- 背景 -->
                    <el-collapse-item title="背景" name="2">
                      <el-form-item label="背景图" prop="bg">
                        <div
                          class="img-view"
                          :style="{backgroundImage:`url('${cdnurl}${styleForm.bg.backgroundImage}')`}"
                          @click="$bus.$emit('openImgList','ChangeEleBg')"
                        >
                          <i class="el-icon-plus"></i>
                        </div>
                        <div class="mt10 tc">
                          <el-button-group>
                            <el-button
                              type="primary"
                              size="mini"
                              @click="styleForm.bg.backgroundImage='';$bus.$emit('saveHistory','更改背景图片');$bus.$emit('renderStyle')"
                            >删除</el-button>
                            <el-button
                              type="danger"
                              size="mini"
                              @click="$bus.$emit('openImgList','ChangeEleBg')"
                            >修改</el-button>
                          </el-button-group>
                        </div>
                      </el-form-item>
                      <el-form-item label="背景颜色" prop="bg">
                        <el-input
                          v-model="styleForm.bg.backgroundColor"
                          placeholder="纯色背景"
                          size="medium"
                          @change="$bus.$emit('saveHistory','更改背景颜色');$bus.$emit('renderStyle')"
                        >
                          <el-color-picker
                            slot="prepend"
                            v-model="styleForm.bg.backgroundColor"
                            show-alpha
                            @change="$bus.$emit('saveHistory','更改背景颜色');$bus.$emit('renderStyle')"
                          ></el-color-picker>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="背景对齐" prop="bg">
                        <div style="width:150px;text-align:left;">
                          <el-radio-group
                            v-model="styleForm.bg.backgroundPosition"
                            size="small"
                            @change="$bus.$emit('saveHistory','更改背景对齐');$bus.$emit('renderStyle')"
                          >
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

                          <el-radio-group
                            v-model="styleForm.bg.backgroundPosition"
                            size="small"
                            @change="$bus.$emit('saveHistory','更改背景对齐');$bus.$emit('renderStyle')"
                          >
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

                          <el-radio-group
                            v-model="styleForm.bg.backgroundPosition"
                            size="small"
                            @change="$bus.$emit('saveHistory','更改背景对齐');$bus.$emit('renderStyle')"
                          >
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
                        <el-select
                          v-model="styleForm.bg.backgroundSize"
                          placeholder="请选择"
                          @change="$bus.$emit('saveHistory','更改背景覆盖方式');$bus.$emit('renderStyle')"
                        >
                          <el-option label="原始" value>原始</el-option>
                          <el-option label="平铺" value="cover">平铺</el-option>
                          <el-option label="适配" value="contain">适配</el-option>
                          <el-option label="拉伸" value="100% 100%">拉伸</el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="背景重复" prop="bg">
                        <el-select
                          v-model="styleForm.bg.backgroundRepeat"
                          placeholder="请选择"
                          @change="$bus.$emit('saveHistory','更改背景重复方式');$bus.$emit('renderStyle')"
                        >
                          <el-option label="水平方向重复" value="repeat-x">水平方向重复</el-option>
                          <el-option label="垂直方向重复" value="repeat-y">垂直方向重复</el-option>
                          <el-option label="水平和垂直重复" value="repeat">水平和垂直重复</el-option>
                          <el-option label="不重复" value="no-repeat">不重复</el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="背景固定" prop="bg">
                        <el-select
                          v-model="styleForm.bg.backgroundAttachment"
                          placeholder="请选择"
                          @change="$bus.$emit('saveHistory','更改背景固定方式');$bus.$emit('renderStyle')"
                        >
                          <el-option label="默认" value>默认</el-option>
                          <el-option label="固定" value="fixed">固定</el-option>
                          <el-option label="滚动" value="scroll">滚动</el-option>
                        </el-select>
                      </el-form-item>
                    </el-collapse-item>

                    <!-- 边框 -->
                    <el-collapse-item title="边框" name="4">
                      <el-form-item label="边框类型" prop="border">
                        <el-select
                          v-model="styleForm.border.borderStyle"
                          placeholder="边框类型"
                          @change="$bus.$emit('saveHistory','更改边框类型');$bus.$emit('renderStyle')"
                        >
                          <el-option
                            v-for="(item, i) in borderStyleOptions"
                            :label="item.label"
                            :value="item.value"
                            :key="i"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="边框宽度" prop="border">
                        <el-slider
                          v-model="styleForm.border.borderWidth"
                          :max="100"
                          :min="0"
                          @change="$bus.$emit('saveHistory','更改边框宽度');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="边框圆角" prop="border">
                        <el-slider
                          v-model="styleForm.border.borderRadius"
                          :max="200"
                          :min="0"
                          @change="$bus.$emit('saveHistory','更改边框圆角');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="边框颜色" prop="border">
                        <el-input
                          v-model="styleForm.border.borderColor"
                          placeholder="边框颜色"
                          size="medium"
                          @change="$bus.$emit('saveHistory','更改边框颜色');$bus.$emit('renderStyle')"
                        >
                          <el-color-picker
                            slot="prepend"
                            v-model="styleForm.border.borderColor"
                            show-alpha
                            @change="$bus.$emit('saveHistory','更改边框颜色');$bus.$emit('renderStyle')"
                          ></el-color-picker>
                        </el-input>
                      </el-form-item>
                    </el-collapse-item>
                    <!-- 阴影 -->
                    <el-collapse-item title="阴影" name="5">
                      <el-form-item label="阴影颜色" prop="shadow">
                        <el-input
                          v-model="styleForm.shadow.shadowColor"
                          placeholder="阴影颜色"
                          size="medium"
                          @change="$bus.$emit('saveHistory','更改阴影颜色');$bus.$emit('renderStyle')"
                        >
                          <el-color-picker
                            slot="prepend"
                            v-model="styleForm.shadow.shadowColor"
                            show-alpha
                            @change="$bus.$emit('saveHistory','更改阴影颜色');$bus.$emit('renderStyle')"
                          ></el-color-picker>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="水平偏移" prop="shadow">
                        <el-slider
                          v-model="styleForm.shadow.shadowX"
                          :max="100"
                          :min="-100"
                          @change="$bus.$emit('saveHistory','更改阴影水平偏移');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="垂直偏移" prop="shadow">
                        <el-slider
                          v-model="styleForm.shadow.shadowY"
                          :max="100"
                          :min="-100"
                          @change="$bus.$emit('saveHistory','更改阴影垂直偏移');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="模糊半径" prop="shadow">
                        <el-slider
                          v-model="styleForm.shadow.shadowFuzzy"
                          :max="100"
                          @change="$bus.$emit('saveHistory','更改阴影模糊半径');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="扩散半径" prop="shadow">
                        <el-slider
                          v-model="styleForm.shadow.shadowDire"
                          :max="100"
                          @change="$bus.$emit('saveHistory','更改阴影扩散半径');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="阴影方向">
                        <el-switch
                          v-model="styleForm.shadow.shadowinSet"
                          active-text="朝内"
                          inactive-text="朝外"
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                          @change="$bus.$emit('saveHistory','更改阴影方向');$bus.$emit('renderStyle')"
                        ></el-switch>
                      </el-form-item>
                    </el-collapse-item>
                    <!-- 特殊变化transform -->
                    <el-collapse-item title="特殊变化" name="6">
                      <el-form-item label="水平偏移" prop="transform">
                        <el-slider
                          v-model="styleForm.transform.translateX"
                          :max="100"
                          :min="-100"
                          @change="$bus.$emit('saveHistory','更改水平偏移');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="垂直偏移" prop="transform">
                        <el-slider
                          v-model="styleForm.transform.translateY"
                          :max="100"
                          :min="-100"
                          @change="$bus.$emit('saveHistory','更改垂直偏移');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="水平缩放" prop="transform">
                        <el-slider
                          v-model="styleForm.transform.scaleX"
                          :max="10"
                          :min="-10"
                          :step="0.1"
                          @change="$bus.$emit('saveHistory','更改水平缩放');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="垂直缩放" prop="transform">
                        <el-slider
                          v-model="styleForm.transform.scaleY"
                          :max="10"
                          :min="-10"
                          :step="0.1"
                          @change="$bus.$emit('saveHistory','更改垂直缩放');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="X轴旋转" prop="transform">
                        <el-slider
                          v-model="styleForm.transform.rotateX"
                          :min="-180"
                          :max="180"
                          @change="$bus.$emit('saveHistory','更改X轴旋转');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="Y轴旋转" prop="transform">
                        <el-slider
                          v-model="styleForm.transform.rotateY"
                          :min="-180"
                          :max="180"
                          @change="$bus.$emit('saveHistory','更改Y轴旋转');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="Z轴旋转" prop="transform">
                        <el-slider
                          v-model="styleForm.transform.rotateZ"
                          :min="-180"
                          :max="180"
                          @change="$bus.$emit('saveHistory','更改Z轴旋转');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                    </el-collapse-item>
                  </el-collapse>
                </el-form>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label">
                  <i class="el-icon-date"></i> 鼠标悬浮状态
                </span>
                <el-form :label-position="'left'" label-width="70px" :model="styleFormHover">
                  <el-collapse v-model="activeNames">
                    <!-- 其他 -->
                    <el-collapse-item title="基础属性" name="3">
                      <!-- 形状元素 -->
                      <el-form-item label="形状颜色" prop="style" v-if="layerjson.type==9">
                        <el-input
                          v-model="styleFormHover.text.color"
                          placeholder="形状颜色"
                          size="medium"
                          @change="$bus.$emit('saveHistory','形状图标颜色[hover]');$bus.$emit('renderStyle')"
                        >
                          <el-color-picker
                            slot="prepend"
                            v-model="styleFormHover.text.color"
                            show-alpha
                          ></el-color-picker>
                        </el-input>
                      </el-form-item>
                      <!-- ================ -->
                      <el-form-item label="元素宽度" prop="style">
                        <el-input
                          v-model="styleFormHover.base.width"
                          placeholder="请输入组件长度"
                          @change="$bus.$emit('saveHistory','更改元素尺寸[hover]');$bus.$emit('renderStyle')"
                        >
                          <template slot="append">PX</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="元素高度" prop="style">
                        <el-input
                          v-model="styleFormHover.base.height"
                          placeholder="请输入组件宽度"
                          @change="$bus.$emit('saveHistory','更改元素尺寸[hover]');$bus.$emit('renderStyle')"
                        >
                          <template slot="append">PX</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="透明程度" prop="style">
                        <el-slider
                          v-model="styleFormHover.base.opacity"
                          :min="0"
                          :max="100"
                          @change="$bus.$emit('saveHistory','更改透明度[hover]');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="过渡时间" prop="style">
                        <el-slider
                          v-model="styleForm.transition.duration"
                          :min="0"
                          :max="5"
                          :step="0.1"
                          @change="$bus.$emit('saveHistory','更改过渡时间[hover]');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="速度曲线" prop="style">
                        <el-select v-model="styleForm.transition.timingFunction" placeholder="请选择">
                          <el-option
                            v-for="(item, i) in TimingFunctionOptions"
                            :label="item.label"
                            :value="item.value"
                            :key="i"
                            @change="$bus.$emit('saveHistory','更改速度曲线[hover]');$bus.$emit('renderStyle')"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-collapse-item>

                    <!-- 文本 -->
                    <el-collapse-item title="文本" name="1" v-show="layerjson.type==1">
                      <el-form-item label="字体类型" prop="bg">
                        <el-select
                          v-model="styleFormHover.text.fontFamily"
                          placeholder="请选择"
                          @change="$bus.$emit('saveHistory','更改文本字形[hover]');$bus.$emit('renderStyle')"
                        >
                          <el-option
                            v-for="(item, i) in fontFamilyOptions"
                            :label="item.label"
                            :value="item.value"
                            :key="i"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="字体大小" prop="border">
                        <el-slider
                          v-model="styleFormHover.text.fontSize"
                          :min="12"
                          :max="100"
                          @change="$bus.$emit('saveHistory','更改字体大小[hover]');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="字体颜色" prop="style">
                        <el-input
                          v-model="styleFormHover.text.color"
                          placeholder="字体颜色"
                          size="medium"
                          @change="$bus.$emit('saveHistory','更改文本颜色[hover]');$bus.$emit('renderStyle')"
                        >
                          <el-color-picker
                            slot="prepend"
                            v-model="styleFormHover.text.color"
                            show-alpha
                            @change="$bus.$emit('saveHistory','更改文本颜色[hover]');$bus.$emit('renderStyle')"
                          ></el-color-picker>
                        </el-input>
                      </el-form-item>

                      <el-form-item label="对齐方式" prop="bg">
                        <el-select
                          v-model="styleFormHover.text.textAlign"
                          placeholder="请选择"
                          @change="$bus.$emit('saveHistory','更改文本对齐[hover]');$bus.$emit('renderStyle')"
                        >
                          <el-option label="左对齐" value="left">左对齐</el-option>
                          <el-option label="居中" value="center">居中</el-option>
                          <el-option label="右对齐" value="right">右对齐</el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="行高" prop="border">
                        <el-slider
                          v-model="styleFormHover.text.lineHeight"
                          :min="1"
                          :max="10"
                          :step="0.1"
                          :format-tooltip="(val)=>{return val +'倍'}"
                          @change="$bus.$emit('saveHistory','更改文本行高[hover]');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="字距" prop="border">
                        <el-slider
                          v-model="styleFormHover.text.letterSpacing"
                          :min="0"
                          :max="10"
                          :step="0.1"
                          :format-tooltip="(val)=>{return val +'PX'}"
                          @change="$bus.$emit('saveHistory','更改文本字距[hover]');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <div class="line-style">
                        <el-tooltip class="item" effect="dark" content="加粗" placement="top">
                          <i
                            class="iconfont icon-jiacu"
                            :class="{active:styleFormHover.text.fontWeight=='bold'}"
                            @click="styleFormHover.text.fontWeight?styleFormHover.text.fontWeight='':styleFormHover.text.fontWeight='bold';$bus.$emit('saveHistory','更改文本粗体[hover]');$bus.$emit('renderStyle')"
                          ></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="倾斜" placement="top">
                          <i
                            class="iconfont icon-qingxie"
                            :class="{active:styleFormHover.text.fontStyle=='italic'}"
                            @click="styleFormHover.text.fontStyle?styleFormHover.text.fontStyle='':styleFormHover.text.fontStyle='italic';$bus.$emit('saveHistory','更改文本倾斜[hover]');$bus.$emit('renderStyle')"
                          ></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="下划线" placement="top">
                          <i
                            class="iconfont icon-underline"
                            :class="{active:styleFormHover.text.textDecoration=='underline'}"
                            @click="styleFormHover.text.textDecoration=='underline'?styleFormHover.text.textDecoration='':styleFormHover.text.textDecoration='underline';$bus.$emit('saveHistory','更改文本下划线[hover]');$bus.$emit('renderStyle')"
                          ></i>
                        </el-tooltip>
                        <el-tooltip
                          class="item"
                          effect="dark"
                          content="删除线"
                          placement="line-through"
                        >
                          <i
                            class="iconfont icon-shanchuxian"
                            :class="{active:styleFormHover.text.textDecoration=='line-through'}"
                            @click="styleFormHover.text.textDecoration=='line-through'?styleFormHover.text.textDecoration='':styleFormHover.text.textDecoration='line-through';$bus.$emit('saveHistory','更改文本删除线[hover]');$bus.$emit('renderStyle')"
                          ></i>
                        </el-tooltip>
                      </div>
                    </el-collapse-item>
                    <!-- 背景 -->
                    <el-collapse-item title="背景" name="2">
                      <el-form-item label="背景图" prop="bg">
                        <div
                          class="img-view"
                          :style="{backgroundImage:`url('${cdnurl}${styleFormHover.bg.backgroundImage}')`}"
                          @click="$bus.$emit('openImgList','ChangeEleBgHover')"
                        >
                          <i class="el-icon-plus"></i>
                        </div>
                        <div class="mt10 tc">
                          <el-button-group>
                            <el-button
                              type="primary"
                              size="mini"
                              @click="styleFormHover.bg.backgroundImage='';$bus.$emit('saveHistory','更改背景[hover]');$bus.$emit('renderStyle')"
                            >删除</el-button>
                            <el-button
                              type="danger"
                              size="mini"
                              @click="$bus.$emit('openImgList','ChangeEleBgHover')"
                            >修改</el-button>
                          </el-button-group>
                        </div>
                      </el-form-item>
                      <el-form-item label="背景颜色" prop="bg">
                        <el-input
                          v-model="styleFormHover.bg.backgroundColor"
                          placeholder="纯色背景"
                          size="medium"
                          @change="$bus.$emit('saveHistory','更改背景颜色[hover]');$bus.$emit('renderStyle')"
                        >
                          <el-color-picker
                            slot="prepend"
                            v-model="styleFormHover.bg.backgroundColor"
                            show-alpha
                            @change="$bus.$emit('saveHistory','更改背景颜色[hover]');$bus.$emit('renderStyle')"
                          ></el-color-picker>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="背景对齐" prop="bg">
                        <div style="width:150px;text-align:left;">
                          <el-radio-group
                            v-model="styleFormHover.bg.backgroundPosition"
                            size="small"
                            @change="$bus.$emit('saveHistory','更改背景对齐[hover]');$bus.$emit('renderStyle')"
                          >
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

                          <el-radio-group
                            v-model="styleFormHover.bg.backgroundPosition"
                            size="small"
                            @change="$bus.$emit('saveHistory','更改背景对齐[hover]');$bus.$emit('renderStyle')"
                          >
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

                          <el-radio-group
                            v-model="styleFormHover.bg.backgroundPosition"
                            size="small"
                            @change="$bus.$emit('saveHistory','更改背景对齐[hover]');$bus.$emit('renderStyle')"
                          >
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
                        <el-select
                          v-model="styleFormHover.bg.backgroundSize"
                          placeholder="请选择"
                          @change="$bus.$emit('saveHistory','更改背景覆盖方式[hover]');$bus.$emit('renderStyle')"
                        >
                          <el-option label="原始" value>原始</el-option>
                          <el-option label="平铺" value="cover">平铺</el-option>
                          <el-option label="适配" value="contain">适配</el-option>
                          <el-option label="拉伸" value="100% 100%">拉伸</el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="背景重复" prop="bg">
                        <el-select
                          v-model="styleFormHover.bg.backgroundRepeat"
                          placeholder="请选择"
                          @change="$bus.$emit('saveHistory','更改背景重复方式[hover]');$bus.$emit('renderStyle')"
                        >
                          <el-option label="水平方向重复" value="repeat-x">水平方向重复</el-option>
                          <el-option label="垂直方向重复" value="repeat-y">垂直方向重复</el-option>
                          <el-option label="水平和垂直重复" value="repeat">水平和垂直重复</el-option>
                          <el-option label="不重复" value="no-repeat">不重复</el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="背景固定" prop="bg">
                        <el-select
                          v-model="styleFormHover.bg.backgroundAttachment"
                          placeholder="请选择"
                          @change="$bus.$emit('saveHistory','更改背景固定方式[hover]');$bus.$emit('renderStyle')"
                        >
                          <el-option label="默认" value>默认</el-option>
                          <el-option label="固定" value="fixed">固定</el-option>
                          <el-option label="滚动" value="scroll">滚动</el-option>
                        </el-select>
                      </el-form-item>
                    </el-collapse-item>

                    <!-- 边框 -->
                    <el-collapse-item title="边框" name="4">
                      <el-form-item label="边框类型" prop="border">
                        <el-select
                          v-model="styleFormHover.border.borderStyle"
                          placeholder="边框类型"
                          @change="$bus.$emit('saveHistory','更改边框类型[hover]');$bus.$emit('renderStyle')"
                        >
                          <el-option
                            v-for="(item, i) in borderStyleOptions"
                            :label="item.label"
                            :value="item.value"
                            :key="i"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="边框宽度" prop="border">
                        <el-slider
                          v-model="styleFormHover.border.borderWidth"
                          :max="100"
                          :min="0"
                          @change="$bus.$emit('saveHistory','更改边框宽度[hover]');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="边框圆角" prop="border">
                        <el-slider
                          v-model="styleFormHover.border.borderRadius"
                          :max="200"
                          :min="0"
                          @change="$bus.$emit('saveHistory','更改边框圆角[hover]');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="边框颜色" prop="border">
                        <el-input
                          v-model="styleFormHover.border.borderColor"
                          placeholder="边框颜色"
                          size="medium"
                          @change="$bus.$emit('saveHistory','更改边框颜色[hover]');$bus.$emit('renderStyle')"
                        >
                          <el-color-picker
                            slot="prepend"
                            v-model="styleFormHover.border.borderColor"
                            show-alpha
                            @change="$bus.$emit('saveHistory','更改边框颜色[hover]');$bus.$emit('renderStyle')"
                          ></el-color-picker>
                        </el-input>
                      </el-form-item>
                    </el-collapse-item>
                    <!-- 阴影 -->
                    <el-collapse-item title="阴影" name="5">
                      <el-form-item label="阴影颜色" prop="shadow">
                        <el-input
                          v-model="styleFormHover.shadow.shadowColor"
                          placeholder="阴影颜色"
                          size="medium"
                          @change="$bus.$emit('saveHistory','更改阴影颜色[hover]');$bus.$emit('renderStyle')"
                        >
                          <el-color-picker
                            slot="prepend"
                            v-model="styleFormHover.shadow.shadowColor"
                            show-alpha
                            @change="$bus.$emit('saveHistory','更改阴影颜色[hover]');$bus.$emit('renderStyle')"
                          ></el-color-picker>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="水平偏移" prop="shadow">
                        <el-slider
                          v-model="styleFormHover.shadow.shadowX"
                          :max="100"
                          :min="-100"
                          @change="$bus.$emit('saveHistory','更改阴影水平偏移[hover]');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="垂直偏移" prop="shadow">
                        <el-slider
                          v-model="styleFormHover.shadow.shadowY"
                          :max="100"
                          :min="-100"
                          @change="$bus.$emit('saveHistory','更改阴影垂直偏移[hover]');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="模糊半径" prop="shadow">
                        <el-slider
                          v-model="styleFormHover.shadow.shadowFuzzy"
                          :max="100"
                          @change="$bus.$emit('saveHistory','更改阴影模糊半径[hover]');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="扩散半径" prop="shadow">
                        <el-slider
                          v-model="styleFormHover.shadow.shadowDire"
                          :max="100"
                          @change="$bus.$emit('saveHistory','更改阴影扩散半径[hover]');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="阴影方向">
                        <el-switch
                          v-model="styleFormHover.shadow.shadowinSet"
                          active-text="朝内"
                          inactive-text="朝外"
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                          @change="$bus.$emit('saveHistory','更改阴影朝向[hover]');$bus.$emit('renderStyle')"
                        ></el-switch>
                      </el-form-item>
                    </el-collapse-item>
                    <!-- 特殊变化transform -->
                    <el-collapse-item title="特殊变化" name="6">
                      <el-form-item label="水平偏移" prop="transform">
                        <el-slider
                          v-model="styleFormHover.transform.translateX"
                          :max="100"
                          :min="-100"
                          @change="$bus.$emit('saveHistory','更改水平偏移[hover]');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="垂直偏移" prop="transform">
                        <el-slider
                          v-model="styleFormHover.transform.translateY"
                          :max="100"
                          :min="-100"
                          @change="$bus.$emit('saveHistory','更改垂直偏移[hover]');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="水平缩放" prop="transform">
                        <el-slider
                          v-model="styleFormHover.transform.scaleX"
                          :max="10"
                          :min="-10"
                          :step="0.1"
                          @change="$bus.$emit('saveHistory','更改水平缩放[hover]');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="垂直缩放" prop="transform">
                        <el-slider
                          v-model="styleFormHover.transform.scaleY"
                          :max="10"
                          :min="-10"
                          :step="0.1"
                          @change="$bus.$emit('saveHistory','更改垂直缩放[hover]');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="X轴旋转" prop="transform">
                        <el-slider
                          v-model="styleFormHover.transform.rotateX"
                          :min="-180"
                          :max="180"
                          @change="$bus.$emit('saveHistory','更改X轴旋转[hover]');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="Y轴旋转" prop="transform">
                        <el-slider
                          v-model="styleFormHover.transform.rotateY"
                          :min="-180"
                          :max="180"
                          @change="$bus.$emit('saveHistory','更改Y轴旋转[hover]');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item label="Z轴旋转" prop="transform">
                        <el-slider
                          v-model="styleFormHover.transform.rotateZ"
                          :min="-180"
                          :max="180"
                          @change="$bus.$emit('saveHistory','更改Z轴旋转[hover]');$bus.$emit('renderStyle')"
                        ></el-slider>
                      </el-form-item>
                    </el-collapse-item>
                  </el-collapse>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="动画">
            <el-tabs type="border-card">
              <el-tab-pane>
                <span slot="label">
                  <i class="el-icon-date"></i> 普通状态
                </span>
                <div class="control">
                  <el-button-group>
                    <el-button
                      @click="addAnimate(animateTemp);$bus.$emit('saveHistory','编辑动画');$bus.$emit('renderStyle')"
                    >添加动画</el-button>
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
                          <el-slider
                            v-model="animateTemp[i].animationDuration"
                            :max="100"
                            :step="0.1"
                          ></el-slider>
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
                          <el-button
                            type="danger"
                            @click="removeAnimate(animateTemp,i);$bus.$emit('saveHistory','编辑动画');$bus.$emit('renderStyle')"
                          >删除动画</el-button>
                        </div>
                      </el-form>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label">
                  <i class="el-icon-date"></i> 鼠标悬浮状态
                </span>
                <div class="control">
                  <el-button-group>
                    <el-button
                      @click="addAnimate(animateTempHover);$bus.$emit('saveHistory','编辑动画[hover]');$bus.$emit('renderStyle')"
                    >添加动画</el-button>
                    <el-button @click="preAnimate">预览动画</el-button>
                  </el-button-group>
                </div>
                <div class="animate-list">
                  <el-collapse v-model="activeNames" v-for="(item,i) in animateTempHover" :key="i">
                    <el-collapse-item :title="`动画${i+1}`" :name="i">
                      <el-form :label-position="'left'" label-width="70px" :model="animationName">
                        <el-form-item label="动画">
                          <el-select v-model="animateTempHover[i].animationName" placeholder="请选择">
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
                          <el-slider
                            v-model="animateTempHover[i].animationDelay"
                            :max="100"
                            :step="0.1"
                          ></el-slider>
                        </el-form-item>
                        <el-form-item label="时长">
                          <el-slider
                            v-model="animateTempHover[i].animationDuration"
                            :max="100"
                            :step="0.1"
                          ></el-slider>
                        </el-form-item>
                        <el-form-item
                          label="次数"
                          v-show="animateTempHover[i].animationIterationCount!='infinite'"
                        >
                          <el-input-number
                            v-model="animateTempHover[i].animationIterationCount"
                            :min="1"
                            :max="1000"
                            label="次数"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="循环" v-if="i==animateTempHover.length-1">
                          <el-switch
                            v-model="animateTempHover[i].animationIterationCount"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-value="infinite"
                            inactive-value="1"
                          ></el-switch>
                        </el-form-item>

                        <el-form-item label="动画速度" prop="border">
                          <el-select
                            v-model="animateTempHover[i].animationTimingFunction"
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
                          <el-button
                            type="danger"
                            @click="removeAnimate(animateTempHover,i);$bus.$emit('saveHistory','编辑动画[hover]');$bus.$emit('renderStyle')"
                          >删除动画</el-button>
                        </div>
                      </el-form>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="事件">
            <el-collapse>
              <el-collapse-item title="鼠标点击">
                <div>鼠标点击时触发的事件类型</div>
                <el-select v-model="event.onClick.type" placeholder="时间类型">
                  <el-option
                    v-for="(item, i) in eventOptions"
                    :label="item.label"
                    :value="item.value"
                    :key="i"
                  ></el-option>
                </el-select>
                <div v-show="event.onClick.type=='index'">页面下标
                  <br>
                  <el-select v-model="event.onClick.index" placeholder="页面下标">
                    <el-option v-for="(item, i) in pages" :label="`第${i+1}页`" :value="i" :key="i"></el-option>
                  </el-select>
                </div>
                <div v-show="event.onClick.type=='link'">链接地址
                  <br>
                  <el-input v-model="event.onClick.link" v-show="event.onClick.type=='link'"></el-input>在新窗口打开
                  <el-switch
                    v-show="event.onClick.type=='link'"
                    v-model="event.onClick.target"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="_blank"
                    inactive-value="self"
                  ></el-switch>
                </div>
                <div v-show="event.onClick.type=='scroll'">垂直滚动到指定位置
                  <br>
                  <el-input v-model="event.onClick.scrollY" placeholder="垂直滚动到指定位置">
                    <template slot="append">PX</template>
                  </el-input>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui
import { addCategories } from "@/api/categories";
import { mapGetters } from "vuex";

export default {
  name: "layerSet",
  directives: {
    elDragDialog
  },
  data() {
    return {
      activeNames: ["1"],
      dialogFormVisible: false,
      config: {
        isShow: true,
        isLock: false,
        content: "",
        categoryModel: "",
        categoryId: "",
        configModel: "",
        configId: "",
        styleText: "",
        class: ""
      },
      styleForm: {
        base: {
          width: 0,
          height: 0,
          opacity: 100,
          rotate: 0
        },
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
          fontSize: "",
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
          shadowinSet: ""
        },

        transition: {
          duration: 0,
          timingFunction: "ease"
        },
        transform: {
          translateX: "",
          translateY: "",
          scaleX: "",
          scaleY: "",
          rotateX: "",
          rotateY: "",
          rotateZ: "",
          skewX: "",
          skewY: ""
        }
      },
      styleFormHover: {
        base: {
          width: 0,
          height: 0,
          opacity: 100,
          rotate: 0
        },
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
          fontSize: "",
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
          shadowinSet: ""
        },
        transform: {
          translateX: "",
          translateY: "",
          scaleX: "",
          scaleY: "",
          rotateX: "",
          rotateY: "",
          rotateZ: "",
          skewX: "",
          skewY: ""
        }
      },
      event: {
        onClick: {
          type: "",
          link: "",
          index: "",
          target: "",
          scrollX: 0,
          scrollY: 0
        },
        hover: {
          animation: ""
        }
      },
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
        },
        {
          value: "scroll",
          label: "页面滚动"
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
      animateTempHover: [
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
    styleChange() {
      console.log("skldfj");
    },
    // 初始化数据
    initData() {
      console.log(this.layerjson);
      // style
      this.config = this.layerjson.config;
      // 基础样式
      this.styleForm.base = this.layerjson.style.base;
      this.styleForm.bg = this.layerjson.style.bg;
      this.styleForm.border = this.layerjson.style.border;
      this.styleForm.shadow = this.layerjson.style.shadow;
      this.styleForm.text = this.layerjson.style.text;
      this.styleForm.transition = this.layerjson.style.transition;
      this.styleForm.transform = this.layerjson.style.transform;
      // 悬浮样式
      this.styleFormHover.base = this.layerjson.hoverStyle.base;
      this.styleFormHover.bg = this.layerjson.hoverStyle.bg;
      this.styleFormHover.border = this.layerjson.hoverStyle.border;
      this.styleFormHover.shadow = this.layerjson.hoverStyle.shadow;
      this.styleFormHover.text = this.layerjson.hoverStyle.text;
      this.styleFormHover.transform = this.layerjson.hoverStyle.transform;
      // 动画
      this.animateTemp = this.layerjson.animate;
      this.animateTempHover = this.layerjson.hoverAnimate;
      this.event = this.layerjson.event;
    },
    removeAnimate(_array, index) {
      _array.splice(index, 1);
    },
    addAnimate(_array) {
      _array.push({
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
      this.$bus.$emit("showDataList", {
        modelId: this.config.categoryModel,
        dataList: this.config.category,
        emitEvent: "ChangeVueData"
      });
    },
    preAnimate() {
      this.$bus.$emit("animate-preview");
    },
    editCom() {
      this.$bus.$emit("editContent", {
        modelId: this.config.configModel,
        contentTemp: this.config.config,
        emitEvent: "ChangeVueConfig"
      });
    }
  },
  computed: {
    ...mapGetters(["cdnurl"])
  },
  props: ["layerjson", "pages"],
  created() {
    this.$bus.$on("openLayerSet", eventData => {
      this.dialogFormVisible = true;
    });
    // 图片路径
    this.$bus.$on("ChangeImgUrl", eventData => {
      this.config.content = eventData.url;
    });
    // 元素背景
    this.$bus.$on("ChangeEleBg", eventData => {
      console.log(eventData.url);
      this.styleForm.bg.backgroundImage = eventData.url;
    });
    // 元素背景Hover
    this.$bus.$on("ChangeEleBgHover", eventData => {
      console.log(eventData.url);
      this.styleFormHover.bg.backgroundImage = eventData.url;
    });
    // svg
    this.$bus.$on("ChangSvg", ele => {
      this.config.content = ele.value;
      this.config.viewBox = ele.viewBox;
    });
    // vue
    this.$bus.$on("ChangeVueConfig", data => {
      this.config.config = data;
      this.$bus.$emit("animate-preview");
    });
    this.$bus.$on("ChangeVueData", data => {
      this.config.category = data;
      this.$bus.$emit("animate-preview");
    });
  },
  watch: {
    layerjson(val) {
      if (val) {
        this.initData();
        console.log("layerjson");
        console.log(val);
      }
    },
    styleForm(val) {
      console.log("lksdfjlk");
    }
  },
  mounted() {
    this.initData();
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
