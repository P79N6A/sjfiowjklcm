<template>
  <div class="LayoutDesign-container">
    <!-- 头部工具栏目 -->
    <div class="i-header" v-show="status!='preview'">
      <div class="content">
        <div id="clone">
          <el-button
            v-show="status=='layoutEdit'"
            type="danger"
            class="clone-row"
            @click="addRow(moveEndData.from.rowIndex)"
          >添加区块</el-button>
          <el-button
            v-show="status=='layoutEdit'"
            type="primary"
            @click="addContent(moveEndData.from.rowIndex,moveEndData.from.contentIndex)"
          >添加行</el-button>
          <el-button
            v-show="status=='layoutEdit'"
            type="success"
            @click="addCol(moveEndData.from.rowIndex,moveEndData.from.contentIndex)"
          >添加内容块</el-button>
          <i class="el-icon-question" v-show="status=='layoutEdit'"></i>
        </div>
        <div>
          <el-radio-group v-model="status">
            <el-radio-button label="preview">预览模式</el-radio-button>
            <el-radio-button label="contentEdit">编辑内容</el-radio-button>
            <el-radio-button label="layoutEdit">编辑布局</el-radio-button>
          </el-radio-group>
          <el-button @click="dialogFormVisible=true;" type="primary">页面属性</el-button>
          <el-button @click="editStyle(layoutTemp.value.style)" type="primary">页面样式</el-button>
          <el-button @click="updateLayouts" type="success">保存</el-button>
          <el-button @click="$router.push({name:'layout'})" type="danger">退出</el-button>
        </div>
      </div>
    </div>
    <!-- 预览工具栏 -->
    <el-radio-group
      v-model="status"
      v-show="status=='preview'"
      style="position:fixed;top:30px;left:50%;z-index:9999;transform:translateX(-50%);"
    >
      <el-radio-button label="preview">预览模式</el-radio-button>
      <el-radio-button label="contentEdit">编辑内容</el-radio-button>
      <el-radio-button label="layoutEdit">编辑布局</el-radio-button>
    </el-radio-group>
    <!-- 预览区域 -->
    <div v-if="status=='preview'">
      <!-- 预览模式 -->
      <div v-html=" `<style>${layoutTemp.value.styleText}</style>`"></div>
      <div
        class="drag-box"
        :class="status"
        id="drag"
        ref="imageWrapper"
        :style="getStyle(layoutTemp.value.style)"
        v-if="layoutTemp._id"
      >
        <div
          class="rows"
          v-for="(row,i) in layoutTemp.value.rows"
          :key="i"
          :style="getStyle(row.style)"
        >
          <div
            class="contents"
            v-for="
          (content,j) in row.contents"
            :key="j"
            :style="[getStyle(content.style)]"
          >
            <el-row class="cols">
              <el-col class="box" v-for="(box,k) in content.boxs" :key="k" :span="box.width">
                <div class="view" :style="getStyle(box.style)">
                  <div
                    v-for="(item,l) in box.components"
                    :key="l"
                    style="position:relative;"
                    class="components-col"
                  >
                    <ishow-pre :ishow-id="item._id" :ishow-url="item.url" :short-id="item.shortId"></ishow-pre>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <!-- 编辑内容 -->
    <div v-if="status=='contentEdit'">
      <div
        class="drag-box"
        :class="status"
        id="drag"
        ref="imageWrapper"
        :style="getStyle(layoutTemp.value.style)"
        v-if="layoutTemp._id"
      >
        <div
          class="rows"
          v-for="(row,i) in layoutTemp.value.rows"
          :key="i"
          :class="{active:i==moveEndData.from.rowIndex}"
          @click="moveEndData.from.rowIndex=i"
          :style="getStyle(row.style)"
        >
          <div class="btns-row btn-group">
            <i class="el-icon-edit" @click="editStyle(row.style)"></i>
          </div>
          <div
            class="contents"
            v-for="
          (content,j) in row.contents"
            :key="j"
            :class="{active:moveEndData.from.rowIndex==i&&j==moveEndData.from.contentIndex}"
            @click="moveEndData.from.contentIndex=j"
            :style="[getStyle(content.style),{width:content.fullWidth?'100%':layoutTemp.value.contentWidth+'px'}]"
          >
            <div class="btns-content btn-group">
              <i class="el-icon-edit" @click="editStyle(content.style)"></i>
            </div>
            <el-row class="cols">
              <el-col class="box" v-for="(box,k) in content.boxs" :key="k" :span="box.width">
                <div class="view" :style="getStyle(box.style)">
                  <div
                    v-for="(item,l) in box.components"
                    :key="l"
                    style="position:relative;"
                    class="components-col"
                  >
                    <ishow-pre :ishow-id="item._id" :ishow-url="item.url" :short-id="item.shortId"></ishow-pre>
                    <div class="el-control">
                      <el-button-group>
                        <el-button type="danger" @click="handleEdit(item)" icon="el-icon-setting"></el-button>
                        <el-button
                          type="danger"
                          @click="indexEl(box.components,l,-1)"
                          icon="el-icon-upload2"
                        ></el-button>
                        <el-button
                          type="danger"
                          @click="indexEl(box.components,l,1)"
                          icon="el-icon-download"
                        ></el-button>
                        <el-button
                          type="danger"
                          @click="removeEl(box.components,l)"
                          icon="el-icon-delete"
                        ></el-button>
                      </el-button-group>
                    </div>
                  </div>
                </div>
                <div class="btns-box btn-group">
                  <i class="el-icon-edit" @click="editStyle(box.style)"></i>
                  <i class="el-icon-circle-plus" @click="handleAddComponent(box)"></i>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div v-if="status=='layoutEdit'">
      <div class="drag-box" :class="status" id="drag" ref="imageWrapper">
        <div
          class="rows"
          v-for="(row,i) in layoutTemp.value.rows"
          :key="i"
          :class="{active:i==moveEndData.from.rowIndex}"
          @click="moveEndData.from.rowIndex=i"
        >
          <div class="btns-row btn-group">
            <i class="el-icon-upload2" @click="indexEl(layoutTemp.value.rows,i,-1)"></i>
            <i class="el-icon-download" @click="indexEl(layoutTemp.value.rows,i,1)"></i>
            <!-- <i class="el-icon-plus"></i> -->
            <i
              class="el-icon-circle-close-outline"
              @click="removeRow(i)"
              v-show="status=='layoutEdit'"
            ></i>
            <!-- <input v-model="row.name" v-show="status=='layoutEdit'"> -->
          </div>
          <div
            class="contents"
            v-for="
            (content,j) in row.contents"
            :key="j"
            :style="{width:content.fullWidth?'100%':'90%'}"
            :class="{active:moveEndData.from.rowIndex==i&&j==moveEndData.from.contentIndex}"
            @click="moveEndData.from.contentIndex=j"
          >
            <div class="btns-content btn-group">
              <i class="el-icon-upload2" @click="indexEl(row.contents,j,-1)"></i>
              <i class="el-icon-download" @click="indexEl(row.contents,j,1)"></i>
              <!-- <i
                class="iconfont icon-smaller"
                @click="content.fullWidth=false"
                v-show="status=='layoutEdit'&&content.fullWidth==true"
              ></i>
              <i
                class="iconfont icon-bigger"
                @click="content.fullWidth=true"
                v-show="status=='layoutEdit'&&content.fullWidth==false"
              ></i> -->
              <!-- <i class="el-icon-plus"></i> -->
              <i
                class="el-icon-circle-close-outline"
                @click="removeContent(row,r)"
                v-show="status=='layoutEdit'"
              ></i>
            </div>
            <el-row class="cols">
              <el-col class="box" v-for="(box,k) in content.boxs" :key="k" :span="box.width">
                <el-tag
                  type="success"
                  class="ico-width"
                >{{(layoutTemp.value.contentWidth*box.width/24).toFixed(0)}}PX</el-tag>
                <div class="btns-box btn-group">
                  <i class="el-icon-upload2" @click="indexEl(content.boxs,k,-1)"></i>
                  <i class="el-icon-download" @click="indexEl(content.boxs,k,1)"></i>
                  <i class="el-icon-d-arrow-left" @click="box.width--" v-show="box.width>5"></i>
                  <i class="el-icon-d-arrow-right" @click="box.width++" v-show="box.width<24"></i>
                  <!-- <i class="el-icon-plus"></i> -->
                  <i class="el-icon-circle-close-outline" @click="removeCol(content,k)"></i>
                </div>
                <div class="view">
                  <div
                    v-for="(item,l) in box.components"
                    :key="l"
                    style="position:relative;"
                    :class="{'components-col':viewLayoutsClass}"
                  >
                    <div>{{item.name}}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <!-- 样式编辑 -->
    <StyleEdit class="active" :styleTemp="styleTemp" v-if="layoutTemp._id"></StyleEdit>
    <!-- 组件添加器 -->
    <el-dialog title="添加组件" :visible.sync="dialogComVisible" width="1000px">
      <div class="component-list cfx">
        <el-card
          :body-style="{ padding: '0px' }"
          v-for="item in ishowList"
          :key="item._id"
          class="card"
        >
          <img :src="`${cdnurl}/${item.thumbnail}`" class="image">
          <div style="padding: 14px;">
            <span>{{item.name}}</span>
            <div class="bottom cfx">
              <el-button type="danger" class="button" @click="addCom(item,'ishow')">选中</el-button>
            </div>
          </div>
        </el-card>
      </div>
      <!-- <el-input placeholder="请输入新增组件地址" v-model="layoutTemp.src"></el-input> -->
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogComVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="addCom">{{ $t('table.confirm') }}</el-button>
      </div>-->
    </el-dialog>
    <!-- 高级设置 -->
    <el-dialog title="设置" width="800px" :visible.sync="dialogFormVisible">
      <el-form ref="dataFormKey" :model="layoutTemp" label-position="right" label-width="80px">
        <el-form-item label="封面">
          <el-upload
            class="avatar-uploader"
            action="/api/media"
            :show-file-list="false"
            :on-success="handleAvatarSuccessFav"
            :before-upload="beforeAvatarUploadFav"
          >
            <img
              v-if="layoutTemp.thumbnail"
              :src="`${cdnurl}${layoutTemp.thumbnail}`"
              class="favicon"
              style="width:100%;height:auto;"
            >
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="*名称" prop="name">
          <el-input v-model="layoutTemp.name"/>
        </el-form-item>
        <el-form-item label="*主体宽度">
          <el-input v-model="layoutTemp.value.contentWidth"/>
        </el-form-item>
        <el-form-item label="*主体宽度">
          <el-input
            type="textarea"
            v-model="layoutTemp.value.styleText"
            :autosize="{ minRows: 10, maxRows: 20}"
            placeholder="请粘贴入style样式内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import html2canvas from "html2canvas";
// 数据集合操作
import { addCategories, deleteCategories } from "@/api/categories";
// 单个数据操作
import { addContents, deleteContents } from "@/api/contents";
// 获取自定义组件
import { getIshows } from "@/api/ishow";
// 布局操作
import { getLayoutsOne, updateLayouts, getLayoutsShortId } from "@/api/layouts";
// 组件
import StyleEdit from "./components/StyleEdit";
import IshowPre from "@/components/H5Preview";
import Sortable from "sortablejs";

import { getToken, setToken, removeToken } from "@/utils/auth";
const byId = function(id) {
  return document.getElementById(id);
};
export default {
  name: "Page401",
  data() {
    return {
      status: "preview", //contentEdit,preview,layoutEdit
      moveEndData: {
        from: {
          rowIndex: 0,
          contentIndex: 0,
          elIndex: 0
        },
        to: {
          rowIndex: 0,
          contentIndex: 0,
          elIndex: 0
        }
      },
      dialogFormVisible: false,
      //======old======//
      edittingData: null,
      styleTemp: {},
      styleBg: {},
      styleStyle: {},
      styleBorder: {},
      styleShadow: {},
      // 功能组件
      componentList: [],
      ishowList: [],
      // 当前el编辑的样式对象
      EditStyle: {
        color: ""
      },
      viewLayoutsClass: "layoutEdit",
      EditStyleShow: false,
      EditType: 1, //根据这个样式编辑弹窗的菜单
      textMap: {
        layout: "整站布局",
        page: "页面布局"
      },
      layoutTemp: {
        _id: "",
        name: "new frame",
        device: getToken("SiteDevice"),
        screenShot: "",
        type: "",
        value: [],
        thumbnail: ""
      },
      editCol: null,
      leftActive: false,
      rightActive: false,
      editting: true,
      dialogVisible: false, // 样式编辑弹窗
      dialogComVisible: false, // 样式编辑弹窗
      dialogContentVisible: false, // 组件配置编辑
      dialogCategoryVisible: false, // 数据集合
      dialogStyleVisible: false, // 高级样式
      newList: [],
      dataURL: "",
      EditModelId: "",
      EditContentId: "",
      EditCategoryId: ""
    };
  },
  mounted() {
    if (this.$route.query.layoutId) {
      getLayoutsOne({
        _id: this.$route.query.layoutId
      })
        .then(res => {
          // this.layoutTemp = res.data;
          Object.assign(this.layoutTemp, res.data);
          this.$nextTick(() => {
            // this.colMoveSet();
          });
        })
        .catch(err => {});
    } else if (this.$route.query.shortId) {
      getLayoutsShortId({
        shortId: this.$route.query.shortId
      })
        .then(res => {
          this.layoutTemp = res.data;
          this.$nextTick(() => {
            // this.colMoveSet();
          });
        })
        .catch(err => {});
    } else {
      this.$route.go(-1);
    }
  },
  methods: {
    handleAvatarSuccessFav(res, file) {
      this.layoutTemp.thumbnail = res.url;
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
    },
    // 新建数据分类
    addCategories() {
      addCategories(this.categoryTemp)
        .then(res => {
          this.getCategories();
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "创建成功",
            type: "success",
            duration: 2000
          });
        })
        .catch(err => {});
    },
    //获取ishow列表
    getIshows() {
      getIshows().then(response => {
        if (response.data && response.data.length) {
          this.ishowList = response.data;
        }
        //console.info(response)
        //console.info(JSON.parse(response.data))
      });
    },
    // 编辑布局样式
    handleEditStyle(data) {
      this.edittingData = data;
      this.EditStyleShow = true;
      this.styleTemp = JSON.parse(JSON.stringify(data.styleTemp || {}));
      this.styleBg = JSON.parse(JSON.stringify(data.styleBg || {}));
      this.styleStyle = JSON.parse(JSON.stringify(data.styleStyle || {}));
      this.styleBorder = JSON.parse(JSON.stringify(data.styleBorder || {}));
      this.styleShadow = JSON.parse(JSON.stringify(data.styleShadow || {}));
    },
    updataStyle(styleData) {
      this.edittingData.styleTemp = JSON.parse(
        JSON.stringify(styleData.styleTemp)
      );
      this.edittingData.styleBg = JSON.parse(JSON.stringify(styleData.styleBg));
      this.edittingData.styleStyle = JSON.parse(
        JSON.stringify(styleData.styleStyle)
      );
      this.edittingData.styleBorder = JSON.parse(
        JSON.stringify(styleData.styleBorder)
      );
      this.edittingData.styleShadow = JSON.parse(
        JSON.stringify(styleData.styleShadow)
      );
    },

    addContent(rowIndex, contentIndex) {
      const newRow = {
        fullWidth: true,
        name: "新内容区块",
        boxs: [],
        config: {
          animation: "",
          id: "",
          class: ""
        },
        style: {
          bg: {
            backgroundImage: "", // 图片
            backgroundColor: "", // 颜色
            backgroundSize: "", // 大小
            backgroundRepeat: "", // 重复
            backgroundPosition: "", // 位置
            backgroundAttachment: "" // 滚动
          },
          border: {
            borderWidth: 0, // 大小
            borderRadius: 0, // 圆角
            borderColor: "", // 边框颜色
            borderStyle: "" // 边框样式
          },
          shadow: {
            shadowColor: "", // 颜色
            shadowWidth: "",
            shadowRadius: "",
            shadowDire: "",
            justify: "",
            align: ""
          },
          base: {
            width: "", // 长
            height: "", // 高
            opacity: 100, // 透明
            rotate: "", // 选装
            cursor: "",
            overflow: ""
          },
          position: {
            position: "",
            top: "",
            left: "",
            bottom: "",
            right: "",
            zIndex: ""
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      };
      this.layoutTemp.value.rows[rowIndex].contents.splice(
        contentIndex + 1,
        0,
        newRow
      );
      if (this.layoutTemp.value.rows[rowIndex].contents.length > 1) {
        this.moveEndData.from.contentIndex = contentIndex + 1;
      } else {
        this.moveEndData.from.contentIndex = 0;
      }
      this.$nextTick(() => {
        // this.colMoveSet();
      });
    },
    /**
     * 删除行
     * block，block数组
     * i，当前行在block里的序号
     *  */
    removeContent(block, index) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        block.contents.splice(index, 1);
      });
    },
    // 移动组件
    moveComponent(components, index, type) {
      if (Math.abs(type)) {
        const targetBlock = components.splice(index, 1)[0];
        components.splice(index + type, 0, targetBlock);
      } else {
        return;
      }
    },
    updateCategory(categoryId) {
      this.edittingData.categoryId = categoryId;
    },
    // 删除组件
    removeComponent(components, index) {
      components.splice(index, 1)[0];
    },
    // 预览布局
    viewLayouts() {},
    // 转换成图片
    toImage() {
      this.viewLayoutsClass = "";
      this.$nextTick(() => {});
      html2canvas(this.$refs.imageWrapper, {
        backgroundColor: null
      })
        .then(canvas => {
          let dataURL = canvas.toDataURL("image/png");
          this.dataURL = dataURL;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 添加组件点击
    handleAddComponent(col) {
      this.editCol = col;
      this.getIshows();
      this.dialogComVisible = true;
    },
    // 添加组件逻辑
    addCom(item, type) {
      item.type = type;
      // 选中的是系统组件库

      // ishow，直接添加
      const _ishow = {
        type: "ishow",
        _id: item._id,
        url: item.url,
        shortId: item.shortId,
        name: item.name
      };
      this.editCol.components.push(Object.assign({}, _ishow));
      this.dialogComVisible = false;
    },
    // 调整组件顺序
    indexEl(arr, index, type) {
      if (
        (index == 0 && type == -1) ||
        (index == arr.length - 1 && type == 1)
      ) {
        // 数组边界
      } else {
        const targetCol = arr.splice(index, 1)[0];
        arr.splice(index + type, 0, targetCol);
        const newCol = arr;
        arr = [];
        this.$nextTick(() => {
          arr = newCol;
        });
      }
    },
    // 删除组件
    removeEl(arr, index) {
      arr.splice(index, 1)[0];
    },
    // 更新当前布局
    updateLayouts() {
      this.viewLayoutsClass = "";
      this.$nextTick(() => {
        window.setTimeout(() => {
          html2canvas(this.$refs.imageWrapper, {
            backgroundColor: null
          })
            .then(canvas => {
              let dataURL = canvas.toDataURL("image/png");
              this.dataURL = dataURL;
              this.layoutTemp.screenShot = dataURL;
              updateLayouts(this.layoutTemp)
                .then(res => {
                  this.$notify({
                    title: "成功",
                    message: "操作成功",
                    type: "success",
                    duration: 2000
                  });
                  this.viewLayoutsClass = "layoutEdit";
                  // this.$router.push({name:'layout'})
                })
                .catch(err => {});
            })
            .catch(err => {
              console.log(err);
            });
        }, 500);
      });
    },
    // 预览
    viewLayouts() {
      this.viewLayoutsClass = "";
    },
    // 框架结构
    // 移动位置
    moveBlock(index, type) {
      if (Math.abs(type)) {
        const targetBlock = this.layoutTemp.value.splice(index, 1)[0];
        this.layoutTemp.value.splice(index + type, 0, targetBlock);
        // this.$nextTick(() => {
        //   this.colMoveSet();
        // });
      } else {
        return;
      }
    },
    /**
     * index，当前区块位置
     * 删除当前区块
     *  */
    removeBlock(index) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.layoutTemp.value.splice(index, 1)[0];
      });
    },
    /** move row
     *
     */
    moveRow(block, index, type) {
      if (Math.abs(type)) {
        const targetBlock = block.rows.splice(index, 1)[0];
        block.rows.splice(index + type, 0, targetBlock);
      } else {
        return;
      }
    },
    /**
     * 删除行
     * block，block数组
     * i，当前行在block里的序号
     *  */
    removeRow(index) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.layoutTemp.value.rows.splice(index, 1)[0];
      });
    },
    /** 添加 */
    addRow(rowIndex) {
      const newBlock = {
        config: {
          animation: "",
          id: "",
          class: ""
        },
        name: "区块new",
        contents: [],
        style: {
          bg: {
            backgroundImage: "", // 图片
            backgroundColor: "", // 颜色
            backgroundSize: "", // 大小
            backgroundRepeat: "", // 重复
            backgroundPosition: "", // 位置
            backgroundAttachment: "" // 滚动
          },
          border: {
            borderWidth: 0, // 大小
            borderRadius: 0, // 圆角
            borderColor: "", // 边框颜色
            borderStyle: "" // 边框样式
          },
          shadow: {
            shadowColor: "", // 颜色
            shadowWidth: "",
            shadowRadius: "",
            shadowDire: "",
            justify: "",
            align: ""
          },
          base: {
            width: "", // 长
            height: "", // 高
            opacity: 100, // 透明
            rotate: "", // 选装
            cursor: "",
            overflow: ""
          },
          position: {
            position: "",
            top: "",
            left: "",
            bottom: "",
            right: "",
            zIndex: ""
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      };

      this.layoutTemp.value.rows.splice(rowIndex + 1, 0, newBlock);
      if (this.layoutTemp.value.rows.length > 1) {
        this.moveEndData.from.rowIndex = rowIndex + 1;
      } else {
        this.moveEndData.from.rowIndex = 0;
      }
      this.$nextTick(() => {
        // this.colMoveSet();
      });
    },
    // 移动格子
    moveCol(row, index, type) {
      if (Math.abs(type)) {
        const targetCol = row.cols.splice(index, 1)[0];
        console.log(targetCol);
        row.cols.splice(index + type, 0, targetCol);
      } else {
        return;
      }
    },
    /**
     * col，当前栅栏object
     * 栅栏缩小
     * */
    smaller(col) {
      if (col.width > 3) {
        col.width--;
      }
    },
    /**
     * col，当前栅栏object
     * 栅栏加宽
     */
    bigger(col) {
      if (col.width < 24) {
        col.width++;
      }
    },
    /**
     * 删除栅栏
     * row，row数组
     * i，当前栅栏的序号
     *  */
    removeCol(col, index) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        col.boxs.splice(index, 1);
      });
      // this.layout.splice(evt.newIndex, 0, targetRow)
    },
    /** 添加 */
    addCol(rowIndex, contentIndex) {
      let newCol = {
        name: "新内容",
        width: 24,
        components: [],
        style: {
          bg: {
            backgroundImage: "", // 图片
            backgroundColor: "", // 颜色
            backgroundSize: "", // 大小
            backgroundRepeat: "", // 重复
            backgroundPosition: "", // 位置
            backgroundAttachment: "" // 滚动
          },
          border: {
            borderWidth: 0, // 大小
            borderRadius: 0, // 圆角
            borderColor: "", // 边框颜色
            borderStyle: "" // 边框样式
          },
          shadow: {
            shadowColor: "", // 颜色
            shadowWidth: "",
            shadowRadius: "",
            shadowDire: "",
            justify: "",
            align: ""
          },
          base: {
            width: "", // 长
            height: "", // 高
            opacity: 100, // 透明
            rotate: "", // 选装
            cursor: "",
            overflow: ""
          },
          position: {
            position: "",
            top: "",
            left: "",
            bottom: "",
            right: "",
            zIndex: ""
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      };
      this.layoutTemp.value.rows[rowIndex].contents[contentIndex].boxs.push(
        newCol
      );
      this.$nextTick(() => {
        // this.colMoveSet();
      });
    },
    handleEdit(item) {
      if (getToken("SiteDevice").toUpperCase() == "PC") {
        let routeData = this.$router.resolve({
          name: "design",
          query: {
            ishowsId: item._id
          }
        });
        window.open(routeData.href, "_blank");
      } else {
        let routeData = this.$router.resolve({
          name: "designMobile",
          query: {
            ishowsId: item._id
          }
        });
        window.open(routeData.href, "_blank");
      }
    },
    editStyle(style) {
      this.styleTemp = style;
      this.$bus.$emit("openStyleSet");
    },
    getStyle(style) {
      return {
        // 基础
        // width: style.base.width + "px",
        height: style.base.height ? style.base.height + "px" : "auto",
        transform: `rotate(${style.base.rotate}deg)`,
        opacity: style.base.opacity / 100,
        overflow: style.base.overflow,
        zIndex: style.base.zIndex,
        justifyContent: style.base.justify,
        alignContent: style.base.align,
        // 定位
        position: style.position.position,
        left: style.position.left + "px",
        right: style.position.right + "px",
        top: style.position.top + "px",
        bottom: style.position.bottom + "px",
        // 边框
        borderWidth: style.border.borderWidth + "px",
        borderRadius: style.border.borderRadius + "px",
        borderColor: style.border.borderColor,
        borderStyle: style.border.borderStyle,
        // 背景
        backgroundImage: `url('${this.cdnurl}${style.bg.backgroundImage}')`,
        backgroundColor: style.bg.backgroundColor,
        backgroundSize: style.bg.backgroundSize,
        backgroundRepeat: style.bg.backgroundRepeat,
        backgroundPosition: style.bg.backgroundPosition,
        backgroundAttachment: style.bg.backgroundAttachment,
        // 阴影
        boxShadow: `${style.shadow.shadowColor} ${style.shadow.shadowX}px ${
          style.shadow.shadowY
        }px ${style.shadow.shadowFuzzy}px ${style.shadow.shadowDire}px ${
          style.shadow.shadowinSet ? "inset" : ""
        }`,
        paddingTop: style.padding.top + "px",
        paddingRight: style.padding.right + "px",
        paddingBottom: style.padding.bottom + "px",
        paddingLeft: style.padding.left + "px"
      };

      return `background:blue;`;
    }
  },
  computed: {
    ...mapGetters(["cdnurl"])
  },
  watch: {
    dialogContentVisible(val) {
      if (!val && this.dialogCategoryVisible) {
        this.$refs.contentList.getContents();
      }
    }
  },
  components: {
    StyleEdit,
    IshowPre
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.iconfont {
  font-size: 12px !important;
}

.LayoutDesign-container {
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 84px);
  .i-header {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fafafa;
    border-bottom: solid 1px #ccc;
    height: 60px;

    .content {
      width: 1200px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    input {
      border: none;
      border-bottom: solid 1px #eee;
      margin-right: 20px;
      background: none;
      outline: none;
      padding: 4px;
    }
  }

  // .layout-view {
  //   .el-row {
  //     position: relative;
  //   }
  // }

  .drag-box {
    min-height: calc(100vh - 60px);
    width:320px;
    margin:0 auto;
    border:dashed 1px #eee;
    .btn-group {
      background: #337ab7;
      color: #fff;
      border-radius: 4px;
      display: inline-block;

      i {
        padding: 4px;
        cursor: pointer;
        transition: all 0.3s;
      }
    }

    // 预览模式
    &.preview {
      .rows {
        position: relative;
        display: flex;
        flex-flow: column;
        align-items: center;

        .contents {
          position: relative;
          width:100%;
          .box {
            position: relative;

            .view {
              overflow: hidden;
              display: flex;
              flex-wrap: wrap;
              justify-content: flex-start;
              align-content: flex-start;

              .components-col {
                display: flex;
                width: 100%;
              }
            }
          }
        }
      }
    }

    // 编辑内容模式
    &.contentEdit {
      .rows {
        position: relative;
        display: flex;
        flex-flow: column;
        align-items: center;
        transition: all 0.1s;
        min-height: 100px;
        &:hover {
          padding-top: 30px !important;
          box-shadow: 0 0 2px 2px #67c23a !important;

          .btns-row {
            display: block;
          }
        }

        .btns-row {
          display: none;
          position: absolute;
          left: 4px;
          top: 4px;
          background: #67c23a;
        }

        .contents {
          position: relative;
          transition: all 0.1s;
          min-height: 80px;
          &:hover {
            padding-top: 25px !important;
            box-shadow: 0 0 2px 2px #337ab7 !important;

            .btns-content {
              display: block;
            }
          }

          .btns-content {
            display: none;
            right: 5px;
            top: 1px;
            position: absolute;
            z-index: 9999;
          }

          .box {
            position: relative;
            min-height: 90px;
            transition: all 0.1s;
            box-shadow: 0 0 2px 2px #ccc inset !important;

            .view {
              overflow: hidden;
              display: flex;
              flex-wrap: wrap;
              align-content: flex-start;
              justify-content: flex-start;

              .components-col {
                display: flex;
                width: 100%;

                &:hover {
                  .el-control {
                    opacity: 1;
                  }
                }

                .el-control {
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: rgba(0, 0, 0, 0.1);
                  opacity: 0;
                  display: flex;
                  justify-content: center;
                  padding-top: 30px;
                  // align-content: center;
                  // flex-direction: column;
                  // align-items: center;
                }
              }
            }

            &:hover {
              box-shadow: 0 0 2px 2px #f56c6c inset !important;
              padding-bottom: 30px !important;

              .btns-box {
                opacity: 1;
              }
            }

            .btns-box {
              opacity: 0;
              display: inline-block;
              position: absolute;
              bottom: 4px;
              left: 50%;
              transform: translateX(-50%);
              background: #f56c6c;
            }
          }
        }
      }
    }

    // 框架编辑状态
    &.layoutEdit {
      width: 460px;
      margin: 0 auto;

      .rows {
        position: relative;
        margin-bottom: 15px;
        display: flex;
        flex-flow: column;
        align-items: center;
        background: #f7f8fb;
        padding: 8px;
        transition: all 0.2s;

        &:hover,
        &.active {
          box-shadow: 0 0 1px 1px red;
          padding-top: 30px;

          > .btns-row {
            display: block;
          }
        }

        > .btns-row {
          display: none;
          position: absolute;
          background: red;
          top: 5px;
          left: 5px;
          z-index: 9999;
        }

        .contents {
          position: relative;
          transition: all 0.2s;

          &:hover,
          &.active {
            box-shadow: 0 0 1px 1px blue;
            padding-top: 20px;

            > .btns-content {
              display: block;
            }
          }

          > .btns-content {
            right: 5px;
            top: 1px;
            position: absolute;
            display: none;
            z-index: 9999;
          }

          .box {
            position: relative;
            padding: 6px;

            &:hover {
              > .btns-box {
                display: block;
              }

              .view {
                border: dashed 1px green;
                padding-top: 30px;
              }

              .ico-width {
                display: block;
              }
            }

            > .btns-box {
              left: 10px;
              top: 10px;
              position: absolute;
              display: none;
              background: #ccc;
            }

            .ico-width {
              right: 10px;
              top: 10px;
              position: absolute;
              display: none;
            }

            .view {
              overflow: hidden;
              min-height: 30px;
              border: dashed 1px #ccc;
              transition: all 0.2s;

              .text-input {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                font-size: 14 px;
                width: 50%;
                height: 60%;
                text-align: center;
              }

              .components-col {
                background: rgb(216, 228, 188);
                margin: 4px;
                padding: 4px;

                &:hover {
                  .el-control {
                    opacity: 1;
                  }
                }

                .el-control {
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: rgba(0, 0, 0, 0.1);
                  opacity: 0;
                  display: flex;
                  justify-content: center;
                  align-content: center;
                  flex-direction: column;
                  align-items: center;
                  // justify-items: center;
                }
              }
            }
          }
        }
      }
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 180px;
    height: 180px;
    line-height:180px;
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

  // 选取组件模块
  .component-list {
    .card {
      width: 180px;
      float: left;
      margin: 6px;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      float: right;
    }

    .image {
      width: 100%;
      display: block;
    }
  }
}
</style>
