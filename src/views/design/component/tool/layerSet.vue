<template>
  <div class="layer-set">
    <el-dialog :visible.sync="dialogFormVisible" v-el-drag-dialog title="元素属性" width="300px" :modal="false"
      :close-on-click-modal="false">
      <el-scrollbar class="shows">
        <el-tabs type="border-card">
          <el-tab-pane label="样式">
            <el-tabs type="border-card">
              <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> 普通状态</span>
                <el-form :label-position="'left'" label-width="70px" :model="settingForm">
                  <el-collapse v-model="activeNames">
                    <!-- 其他 -->
                    <el-collapse-item title="基础属性" name="3">
                      <!-- 图片元素 -->
                      <el-form-item label="图片内容" prop="content" v-if="layerjson.type==2">
                        <div @click="$bus.$emit('openImgList','ChangeImgUrl')" class="img-view" :style="`background-image:url('${cdnurl}${settingForm.config.content}')`">
                          <i class="el-icon-plus"></i>
                        </div>
                        <div class="mt10 tc">
                          <el-button-group>
                            <el-button type="primary" size="mini" @click="settingForm.config.content=''">删除</el-button>
                            <el-button type="danger" size="mini" @click="$bus.$emit('openImgList','ChangeImgUrl')">修改</el-button>
                          </el-button-group>
                        </div>
                      </el-form-item>
                      <!-- 形状元素 -->
                      <el-form-item label="形状内容" prop="content" v-if="layerjson.type==9">
                        <div @click="$bus.$emit('openSvgList','ChangSvg')" class="img-view">
                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                            x="0px" y="0px" width="100%" height="100%" :viewBox="settingForm.config.viewBox" xml:space="preserve"
                            preserveAspectRatio="none" v-show="settingForm.config.content">
                            <path :d="settingForm.config.content" :fill="settingForm.text.color"></path>
                          </svg>
                          <i class="el-icon-plus" v-show="!settingForm.config.content"></i>
                        </div>
                        <div class="mt10 tc">
                          <el-button-group>
                            <el-button type="primary" size="mini" @click="settingForm.config.content=''">删除</el-button>
                            <el-button type="danger" size="mini" @click="$bus.$emit('openSvgList','ChangSvg')">修改</el-button>
                          </el-button-group>
                        </div>
                      </el-form-item>
                      <!-- 形状元素 -->
                      <el-form-item label="形状颜色" prop="style" v-if="layerjson.type==9">
                        <el-input v-model="settingForm.text.color" placeholder="形状颜色" size="medium">
                          <el-color-picker slot="prepend" v-model="settingForm.text.color" show-alpha></el-color-picker>
                        </el-input>
                      </el-form-item>
                      <!-- vue元素 -->
                      <el-form-item label="组件内容" prop="style" v-if="layerjson.type==10">
                        <el-button-group>
                          <el-button type="primary" size="mini" @click="editCom">组件属性</el-button>
                          <el-button type="danger" size="mini" v-show="settingForm.config.categoryModel" @click="showDataList">组件内容</el-button>
                        </el-button-group>
                      </el-form-item>
                      <!-- ================ -->
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
                        <el-slider v-model="settingForm.base.rotate" :min="-180" :max="180"></el-slider>
                      </el-form-item>
                    </el-collapse-item>
                    <!-- 文本 -->
                    <el-collapse-item title="文本" name="1" v-show="layerjson.type==1">
                      <el-form-item label="文字内容" prop="content">
                        <el-input v-model="settingForm.config.content" placeholder="文字内容" type="textarea"></el-input>
                      </el-form-item>
                      <el-form-item label="字体类型" prop="bg">
                        <el-select v-model="settingForm.text.fontFamily" placeholder="请选择">
                          <el-option v-for="(item, i) in fontFamilyOptions" :label="item.label" :value="item.value"
                            :key="i"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="字体大小" prop="border">
                        <el-slider v-model="settingForm.text.fontSize" :min="12" :max="100"></el-slider>
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
                        <el-slider v-model="settingForm.text.lineHeight" :min="1" :max="10" :step="0.1" :format-tooltip="(val)=>{return val +'倍'}"></el-slider>
                      </el-form-item>
                      <el-form-item label="字距" prop="border">
                        <el-slider v-model="settingForm.text.letterSpacing" :min="0" :max="10" :step="0.1"
                          :format-tooltip="(val)=>{return val +'PX'}"></el-slider>
                      </el-form-item>
                      <div class="line-style">
                        <el-tooltip class="item" effect="dark" content="加粗" placement="top">
                          <i class="iconfont icon-jiacu" :class="{active:settingForm.text.fontWeight=='bold'}" @click="settingForm.text.fontWeight?settingForm.text.fontWeight='':settingForm.text.fontWeight='bold'"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="倾斜" placement="top">
                          <i class="iconfont icon-qingxie" :class="{active:settingForm.text.fontStyle=='italic'}"
                            @click="settingForm.text.fontStyle?settingForm.text.fontStyle='':settingForm.text.fontStyle='italic'"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="下划线" placement="top">
                          <i class="iconfont icon-underline" :class="{active:settingForm.text.textDecoration=='underline'}"
                            @click="settingForm.text.textDecoration=='underline'?settingForm.text.textDecoration='':settingForm.text.textDecoration='underline'"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除线" placement="line-through">
                          <i class="iconfont icon-shanchuxian" :class="{active:settingForm.text.textDecoration=='line-through'}"
                            @click="settingForm.text.textDecoration=='line-through'?settingForm.text.textDecoration='':settingForm.text.textDecoration='line-through'"></i>
                        </el-tooltip>
                      </div>
                    </el-collapse-item>
                    <!-- 背景 -->
                    <el-collapse-item title="背景" name="2">
                      <el-form-item label="背景图" prop="bg">
                        <div class="img-view" :style="{backgroundImage:`url('${cdnurl}${settingForm.bg.backgroundImage}')`}"
                          @click="$bus.$emit('openImgList','ChangeEleBg')">
                          <i class="el-icon-plus"></i>
                        </div>
                        <div class="mt10 tc">
                          <el-button-group>
                            <el-button type="primary" size="mini" @click="settingForm.bg.backgroundImage=''">删除</el-button>
                            <el-button type="danger" size="mini" @click="$bus.$emit('openImgList','ChangeEleBg')">修改</el-button>
                          </el-button-group>
                        </div>
                      </el-form-item>
                      <el-form-item label="背景颜色" prop="bg">
                        <el-input v-model="settingForm.bg.backgroundColor" placeholder="纯色背景" size="medium">
                          <el-color-picker slot="prepend" v-model="settingForm.bg.backgroundColor" show-alpha></el-color-picker>
                        </el-input>
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
                      <el-form-item label="背景固定" prop="bg">
                        <el-select v-model="settingForm.bg.backgroundAttachment" placeholder="请选择">
                          <el-option label="默认" value="">默认</el-option>
                          <el-option label="固定" value="fixed">固定</el-option>
                          <el-option label="滚动" value="scroll">滚动</el-option>
                        </el-select>
                      </el-form-item>
                    </el-collapse-item>

                    <!-- 边框 -->
                    <el-collapse-item title="边框" name="4">
                      <el-form-item label="边框类型" prop="border">
                        <el-select v-model="settingForm.border.borderStyle" placeholder="边框类型">
                          <el-option v-for="(item, i) in borderStyleOptions" :label="item.label" :value="item.value"
                            :key="i"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="边框宽度" prop="border">
                        <el-slider v-model="settingForm.border.borderWidth" :max="100" :min="0"></el-slider>
                      </el-form-item>
                      <el-form-item label="边框圆角" prop="border">
                        <el-slider v-model="settingForm.border.borderRadius" :max="200" :min="0"></el-slider>
                      </el-form-item>
                      <el-form-item label="边框颜色" prop="border">
                        <el-input v-model="settingForm.border.borderColor" placeholder="边框颜色" size="medium">
                          <el-color-picker slot="prepend" v-model="settingForm.border.borderColor" show-alpha></el-color-picker>
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
                          active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                      </el-form-item>
                    </el-collapse-item>
                  </el-collapse>
                </el-form>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> 鼠标悬浮状态</span>
                <el-form :label-position="'left'" label-width="70px" :model="settingFormHover">
                  <el-collapse v-model="activeNames">
                    <!-- 其他 -->
                    <el-collapse-item title="基础属性" name="3">
                      <!-- 形状元素 -->
                      <el-form-item label="形状颜色" prop="style" v-if="layerjson.type==9">
                        <el-input v-model="settingFormHover.text.color" placeholder="形状颜色" size="medium">
                          <el-color-picker slot="prepend" v-model="settingFormHover.text.color" show-alpha></el-color-picker>
                        </el-input>
                      </el-form-item>
                      <!-- ================ -->
                      <el-form-item label="元素宽度" prop="style">
                        <el-input v-model="settingFormHover.base.width" placeholder="请输入组件长度">
                          <template slot="append">PX</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="元素高度" prop="style">
                        <el-input v-model="settingFormHover.base.height" placeholder="请输入组件宽度">
                          <template slot="append">PX</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="透明程度" prop="style">
                        <el-slider v-model="settingFormHover.base.opacity" :min="0" :max="100"></el-slider>
                      </el-form-item>
                      <el-form-item label="旋转角度" prop="style">
                        <el-slider v-model="settingFormHover.base.rotate" :min="-180" :max="180"></el-slider>
                      </el-form-item>
                    </el-collapse-item>
                    <!-- 文本 -->
                    <el-collapse-item title="文本" name="1" v-show="layerjson.type==1">
                      <el-form-item label="字体类型" prop="bg">
                        <el-select v-model="settingFormHover.text.fontFamily" placeholder="请选择">
                          <el-option v-for="(item, i) in fontFamilyOptions" :label="item.label" :value="item.value"
                            :key="i"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="字体大小" prop="border">
                        <el-slider v-model="settingFormHover.text.fontSize" :min="12" :max="100"></el-slider>
                      </el-form-item>
                      <el-form-item label="字体颜色" prop="style">
                        <el-input v-model="settingFormHover.text.color" placeholder="字体颜色" size="medium">
                          <el-color-picker slot="prepend" v-model="settingFormHover.text.color" show-alpha></el-color-picker>
                        </el-input>
                      </el-form-item>

                      <el-form-item label="对齐方式" prop="bg">
                        <el-select v-model="settingFormHover.text.textAlign" placeholder="请选择">
                          <el-option label="左对齐" value="left">左对齐</el-option>
                          <el-option label="居中" value="center">居中</el-option>
                          <el-option label="右对齐" value="right">右对齐</el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="行高" prop="border">
                        <el-slider v-model="settingFormHover.text.lineHeight" :min="1" :max="10" :step="0.1"
                          :format-tooltip="(val)=>{return val +'倍'}"></el-slider>
                      </el-form-item>
                      <el-form-item label="字距" prop="border">
                        <el-slider v-model="settingFormHover.text.letterSpacing" :min="0" :max="10" :step="0.1"
                          :format-tooltip="(val)=>{return val +'PX'}"></el-slider>
                      </el-form-item>
                      <div class="line-style">
                        <el-tooltip class="item" effect="dark" content="加粗" placement="top">
                          <i class="iconfont icon-jiacu" :class="{active:settingFormHover.text.fontWeight=='bold'}"
                            @click="settingFormHover.text.fontWeight?settingFormHover.text.fontWeight='':settingFormHover.text.fontWeight='bold'"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="倾斜" placement="top">
                          <i class="iconfont icon-qingxie" :class="{active:settingFormHover.text.fontStyle=='italic'}"
                            @click="settingFormHover.text.fontStyle?settingFormHover.text.fontStyle='':settingFormHover.text.fontStyle='italic'"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="下划线" placement="top">
                          <i class="iconfont icon-underline" :class="{active:settingFormHover.text.textDecoration=='underline'}"
                            @click="settingFormHover.text.textDecoration=='underline'?settingFormHover.text.textDecoration='':settingFormHover.text.textDecoration='underline'"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除线" placement="line-through">
                          <i class="iconfont icon-shanchuxian" :class="{active:settingFormHover.text.textDecoration=='line-through'}"
                            @click="settingFormHover.text.textDecoration=='line-through'?settingFormHover.text.textDecoration='':settingFormHover.text.textDecoration='line-through'"></i>
                        </el-tooltip>
                      </div>
                    </el-collapse-item>
                    <!-- 背景 -->
                    <el-collapse-item title="背景" name="2">
                      <el-form-item label="背景图" prop="bg">
                        <div class="img-view" :style="{backgroundImage:`url('${cdnurl}${settingFormHover.bg.backgroundImage}')`}"
                          @click="$bus.$emit('openImgList','ChangeEleBg')">
                          <i class="el-icon-plus"></i>
                        </div>
                        <div class="mt10 tc">
                          <el-button-group>
                            <el-button type="primary" size="mini" @click="settingFormHover.bg.backgroundImage=''">删除</el-button>
                            <el-button type="danger" size="mini" @click="$bus.$emit('openImgList','ChangeEleBg')">修改</el-button>
                          </el-button-group>
                        </div>
                      </el-form-item>
                      <el-form-item label="背景颜色" prop="bg">
                        <el-input v-model="settingFormHover.bg.backgroundColor" placeholder="纯色背景" size="medium">
                          <el-color-picker slot="prepend" v-model="settingFormHover.bg.backgroundColor" show-alpha></el-color-picker>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="背景对齐" prop="bg">
                        <div style="width:150px;text-align:left;">
                          <el-radio-group v-model="settingFormHover.bg.backgroundPosition" size="small">
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

                          <el-radio-group v-model="settingFormHover.bg.backgroundPosition" size="small">
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

                          <el-radio-group v-model="settingFormHover.bg.backgroundPosition" size="small">
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
                        <el-select v-model="settingFormHover.bg.backgroundSize" placeholder="请选择">
                          <el-option label="原始" value>原始</el-option>
                          <el-option label="平铺" value="cover">平铺</el-option>
                          <el-option label="适配" value="contain">适配</el-option>
                          <el-option label="拉伸" value="100% 100%">拉伸</el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="背景重复" prop="bg">
                        <el-select v-model="settingFormHover.bg.backgroundRepeat" placeholder="请选择">
                          <el-option label="水平方向重复" value="repeat-x">水平方向重复</el-option>
                          <el-option label="垂直方向重复" value="repeat-y">垂直方向重复</el-option>
                          <el-option label="水平和垂直重复" value="repeat">水平和垂直重复</el-option>
                          <el-option label="不重复" value="no-repeat">不重复</el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="背景固定" prop="bg">
                        <el-select v-model="settingFormHover.bg.backgroundAttachment" placeholder="请选择">
                          <el-option label="默认" value="">默认</el-option>
                          <el-option label="固定" value="fixed">固定</el-option>
                          <el-option label="滚动" value="scroll">滚动</el-option>
                        </el-select>
                      </el-form-item>
                    </el-collapse-item>

                    <!-- 边框 -->
                    <el-collapse-item title="边框" name="4">
                      <el-form-item label="边框类型" prop="border">
                        <el-select v-model="settingFormHover.border.borderStyle" placeholder="边框类型">
                          <el-option v-for="(item, i) in borderStyleOptions" :label="item.label" :value="item.value"
                            :key="i"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="边框宽度" prop="border">
                        <el-slider v-model="settingFormHover.border.borderWidth" :max="100" :min="0"></el-slider>
                      </el-form-item>
                      <el-form-item label="边框圆角" prop="border">
                        <el-slider v-model="settingFormHover.border.borderRadius" :max="200" :min="0"></el-slider>
                      </el-form-item>
                      <el-form-item label="边框颜色" prop="border">
                        <el-input v-model="settingFormHover.border.borderColor" placeholder="边框颜色" size="medium">
                          <el-color-picker slot="prepend" v-model="settingFormHover.border.borderColor" show-alpha></el-color-picker>
                        </el-input>
                      </el-form-item>
                    </el-collapse-item>
                    <!-- 阴影 -->
                    <el-collapse-item title="阴影" name="5">
                      <el-form-item label="阴影颜色" prop="shadow">
                        <el-input v-model="settingFormHover.shadow.shadowColor" placeholder="阴影颜色" size="medium">
                          <el-color-picker slot="prepend" v-model="settingFormHover.shadow.shadowColor" show-alpha></el-color-picker>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="水平偏移" prop="shadow">
                        <el-slider v-model="settingFormHover.shadow.shadowX" :max="100" :min="-100"></el-slider>
                      </el-form-item>
                      <el-form-item label="垂直偏移" prop="shadow">
                        <el-slider v-model="settingFormHover.shadow.shadowY" :max="100" :min="-100"></el-slider>
                      </el-form-item>
                      <el-form-item label="模糊半径" prop="shadow">
                        <el-slider v-model="settingFormHover.shadow.shadowFuzzy" :max="100"></el-slider>
                      </el-form-item>
                      <el-form-item label="扩散半径" prop="shadow">
                        <el-slider v-model="settingFormHover.shadow.shadowDire" :max="100"></el-slider>
                      </el-form-item>
                      <el-form-item label="阴影方向">
                        <el-switch v-model="settingFormHover.shadow.shadowinSet" active-text="朝内" inactive-text="朝外"
                          active-color="#13ce66" inactive-color="#ff4949"></el-switch>
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
                <span slot="label"><i class="el-icon-date"></i> 普通状态</span>
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
                            <el-option-group v-for="(group, index2) in animateOptions" :label="group.label" :key="index2"
                              v-if="(ctype===1&&group.label==='特殊')||group.label!=='特殊'">
                              <el-option v-for="(item, index3) in group.options" :label="item.label" :value="item.value"
                                :disabled="item.disabled" :key="index3"></el-option>
                            </el-option-group>
                          </el-select>
                        </el-form-item>

                        <el-form-item label="延时">
                          <el-slider v-model="animateTemp[i].animationDelay" :max="100" :step="0.1"></el-slider>
                        </el-form-item>
                        <el-form-item label="时长">
                          <el-slider v-model="animateTemp[i].animationDuration" :max="100" :step="0.1"></el-slider>
                        </el-form-item>
                        <el-form-item label="次数" v-show="animateTemp[i].animationIterationCount!='infinite'">
                          <el-input-number v-model="animateTemp[i].animationIterationCount" :min="1" :max="1000" label="次数"></el-input-number>
                        </el-form-item>
                        <el-form-item label="循环" v-if="i==animateTemp.length-1">
                          <el-switch v-model="animateTemp[i].animationIterationCount" active-color="#13ce66"
                            inactive-color="#ff4949" active-value="infinite" inactive-value="1"></el-switch>
                        </el-form-item>

                        <el-form-item label="动画速度" prop="border">
                          <el-select v-model="animateTemp[i].animationTimingFunction" placeholder="边框类型">
                            <el-option v-for="(item, i) in TimingFunctionOptions" :label="item.label" :value="item.value"
                              :key="i"></el-option>
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
              <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> 普通状态</span>
                <div class="control">
                  <el-button-group>
                    <el-button @click="addAnimate">添加动画</el-button>
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
                            <el-option-group v-for="(group, index2) in animateOptions" :label="group.label" :key="index2"
                              v-if="(ctype===1&&group.label==='特殊')||group.label!=='特殊'">
                              <el-option v-for="(item, index3) in group.options" :label="item.label" :value="item.value"
                                :disabled="item.disabled" :key="index3"></el-option>
                            </el-option-group>
                          </el-select>
                        </el-form-item>

                        <el-form-item label="延时">
                          <el-slider v-model="animateTempHover[i].animationDelay" :max="100" :step="0.1"></el-slider>
                        </el-form-item>
                        <el-form-item label="时长">
                          <el-slider v-model="animateTempHover[i].animationDuration" :max="100" :step="0.1"></el-slider>
                        </el-form-item>
                        <el-form-item label="次数" v-show="animateTempHover[i].animationIterationCount!='infinite'">
                          <el-input-number v-model="animateTempHover[i].animationIterationCount" :min="1" :max="1000"
                            label="次数"></el-input-number>
                        </el-form-item>
                        <el-form-item label="循环" v-if="i==animateTempHover.length-1">
                          <el-switch v-model="animateTempHover[i].animationIterationCount" active-color="#13ce66"
                            inactive-color="#ff4949" active-value="infinite" inactive-value="1"></el-switch>
                        </el-form-item>

                        <el-form-item label="动画速度" prop="border">
                          <el-select v-model="animateTempHover[i].animationTimingFunction" placeholder="边框类型">
                            <el-option v-for="(item, i) in TimingFunctionOptions" :label="item.label" :value="item.value"
                              :key="i"></el-option>
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
          </el-tab-pane>
          <el-tab-pane label="事件">
            <el-collapse>
              <el-collapse-item title="鼠标点击">
                <div>鼠标点击时触发的事件类型</div>
                <el-select v-model="event.onClick.type" placeholder="时间类型">
                  <el-option v-for="(item, i) in eventOptions" :label="item.label" :value="item.value" :key="i"></el-option>
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
                  <el-switch v-show="event.onClick.type=='link'" v-model="event.onClick.target" active-color="#13ce66"
                    inactive-color="#ff4949" active-value="_blank" inactive-value="self"></el-switch>
                </div>
              </el-collapse-item>
              <!-- <el-collapse-item title="鼠标悬浮">
                <el-select v-model="event.hover.animation" placeholder="请选择">
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
              </el-collapse-item> -->
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="高级">
          <el-input
            type="textarea"
            :autosize="{ minRows: 20, maxRows: 40}"
            placeholder="输入自定义样式"
            v-model="config.styleText">
          </el-input>
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
  import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui
  import {
    addContents
  } from "@/api/contents";
  import {
    mapGetters
  } from "vuex";

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
            content: "",
            "isShow": true,
            "isLock": false,
            "styleText":""
          },
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
          base: {
            width: 0,
            height: 0,
            opacity: 100,
            rotate: 0
          },
          config: {
            content: "",
            "isShow": true,
            "isLock": false,
            "styleText":""
          }
        },
        settingFormHover: {
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
          base: {
            width: 0,
            height: 0,
            opacity: 100,
            rotate: 0
          },
          config: {
            content: "",
            "isShow": true,
            "isLock": false,
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
        eventOptions: [{
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
        animateTemp: [{
          animationDelay: 0,
          animationDuration: 1,
          animationFillMode: "both",
          animationIterationCount: 1,
          animationName: "",
          animationPlayState: "initial",
          animationTimingFunction: "ease"
        }],
        animateTempHover: [{
          animationDelay: 0,
          animationDuration: 1,
          animationFillMode: "both",
          animationIterationCount: 1,
          animationName: "",
          animationPlayState: "initial",
          animationTimingFunction: "ease"
        }],
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
        TimingFunctionOptions: [{
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
        ],
        fontFamilyOptions: [{
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
        // style
        this.settingForm.bg = this.layerjson.style.bg;
        this.settingForm.border = this.layerjson.style.border;
        this.settingForm.shadow = this.layerjson.style.shadow;
        this.settingForm.base = this.layerjson.style.base;
        this.settingForm.text = this.layerjson.style.text;
        this.settingForm.config = this.layerjson.config;
        this.animateTemp = this.layerjson.animate;
        this.event = this.layerjson.event;
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
    props: ["layerjson", "pages"],
    created() {
      this.$bus.$on("openLayerSet", eventData => {
        this.dialogFormVisible = true;
      });
    },
    watch: {
      layerjson(val) {
        if (val) {
          this.initData();
        }
      }
    },
    mounted() {
      this.initData();
      // 图片路径
      this.$bus.$on("ChangeImgUrl", eventData => {
        console.log(eventData.url)
        this.settingForm.config.content = eventData.url;
      });
      // 元素背景
      this.$bus.$on("ChangeEleBg", eventData => {
        console.log(eventData.url)
        this.settingForm.bg.backgroundImage = eventData.url;
      });
      // svg
      this.$bus.$on("ChangSvg", ele => {
        this.settingForm.config.content = ele.value;
        this.settingForm.config.viewBox = ele.viewBox;
      });
      // vue
      this.$bus.$on("ChangeVue", ele => {
        console.log('ChangeVue')
        const _contentTemp = {
          abstract: "",
          category: "",
          content: "",
          thumbnail: "",
          media: [],
          extensions: {},
          isSingle: true
        };
        addContents(_contentTemp)
          .then(res => {
            this.settingForm.config.dataId = res.data._id;
            this.settingForm.config.content = ele.url;
            this.settingForm.config.configModel = ele.configModel;
            this.settingForm.config.categoryModel = ele.categoryModel;
          })
          .catch(err => {
            console.log(err);
          });
      });
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
