<template>
  <div class="pages-container">
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>站点基本配置</span>
      </div>
      <el-container class="views">
        <el-aside :width="hideMenu?'56px':'200px'" style="background:#eee;">
          <div class="bottom cfx">
            <el-button-group>
              <el-button
                v-show="!hideMenu"
                icon="el-icon-plus"
                type="primary"
                @click="handleCreate"
                style="width:145px;"
              >添加页面</el-button>
              <el-button @click="hideMenu=!hideMenu">
                <span v-if="hideMenu">展开</span>
                <span v-else>隐藏</span>
              </el-button>
            </el-button-group>
          </div>
          <el-tree
            v-show="!hideMenu"
            :data="treeData"
            node-key="id"
            :expand-on-click-node="true"
            :icon-class="'=='"
            default-expanded-keys="pc"
            :highlight-current="true"
            @node-click="nodeClick"
          ></el-tree>
        </el-aside>
        <el-main>
          <el-row>
            <el-col :span="24">
              <el-button-group>
                <el-button type="success" @click="handleUpdate">编辑</el-button>
                <el-button type="danger">删除</el-button>
              </el-button-group>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <iframe ref="iframeView" src="/#/preview" class="iframe-view"></iframe>
              <!-- 外框 -->
              <!-- <Layout :layoutTemp="selectNode.value.layout"> -->
              <!-- <Layout :layoutTemp="selectNode.value.content"></Layout> -->
              <!-- </Layout> -->
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-card>

    <!-- <div>{{selectNode}}</div> -->
    <!-- 页面内容编辑 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="700px">
      {{pagesTemp}}
      <el-form ref="dataForm" :model="pagesTemp" label-position="right" label-width="90px">
        <el-form-item label="*页面名称" prop="name">
          <el-input v-model="pagesTemp.name"/>
        </el-form-item>
        <el-form-item label="页面路径" prop="url">
          <el-input v-model="pagesTemp.path">
            <template slot="prepend">～域名</template>
          </el-input>
        </el-form-item>
        <el-form-item label="页面外框" prop="layout">
          <el-select v-model="pagesTemp.layout" placeholder="请选择页面外框">
            <el-option :label="item.name" :value="item._id" v-for="(item,i) in layoutList" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="页面内容" prop="layout">
          <el-select v-model="pagesTemp.content" placeholder="请选择页面内容">
            <el-option
              :label="item.name"
              :value="item._id"
              v-for="(item,i) in contentList"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说明" prop="Remarks">
          <el-input v-model="pagesTemp.Remarks" :autosize="{ minRows: 10, maxRows: 100}"/>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            style="display: block"
            v-model="pagesTemp.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="发布"
            inactive-text="草稿"
            active-value="pushed"
            inactive-value="draft"
          ></el-switch>
        </el-form-item>
        <el-form-item label="适配终端" prop="device">
          <!-- 这个其实可以废弃，从cookie获取 -->
          <el-select v-model="pagesTemp.device" placeholder="请选择页面适用终端">
            <el-option label="PC端" value="pc"></el-option>
            <el-option label="MOBILE端" value="MOBILE"></el-option>
          </el-select>
        </el-form-item>
        <hr>
        <el-form-item label="页面标题" prop="title">
          <el-input v-model="pagesTemp.title"/>
        </el-form-item>
        <el-form-item label="页面关键字" prop="keywords">
          <el-input v-model="pagesTemp.keywords"/>
        </el-form-item>
        <el-form-item label="页面描述" prop="description">
          <el-input v-model="pagesTemp.description"/>
        </el-form-item>
        <hr>
        <el-form-item label="页面脚本" prop="script">
          <el-input
            :autosize="{ minRows: 10, maxRows: 100}"
            type="textarea"
            v-model="pagesTemp.script"
          />
        </el-form-item>
        <el-form-item
          :label="`外链脚本${i+1}`"
          prop="styleList"
          v-for="(item,i) in pagesTemp.scriptList"
          :key="i"
        >
          <el-input v-model="pagesTemp.scriptList[i]">
            <el-button
              slot="append"
              icon="el-icon-delete"
              type="danger"
              @click="deleteScriptList(i)"
            ></el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="addScriptList" type="warning">添加</el-button>
        </el-form-item>
        <hr>
        <el-form-item label="页面样式" prop="style">
          <el-input
            :autosize="{ minRows: 10, maxRows: 100}"
            type="textarea"
            v-model="pagesTemp.style"
          />
        </el-form-item>
        <el-form-item
          :label="`外链样式${i+1}`"
          prop="styleList"
          v-for="(item,i) in pagesTemp.styleList"
          :key="i"
        >
          <el-input v-model="pagesTemp.styleList[i]">
            <el-button
              slot="append"
              icon="el-icon-delete"
              type="danger"
              @click="deleteStyleList(i)"
            ></el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="addStyleList" type="warning">添加</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createPage():updatePage()">
          {{ $t('table.confirm')
          }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Layout from "@/components/Layout";
import {
  getPages,
  addPages,
  updatePages,
  deletePages,
  rememberPages
} from "@/api/pages";
import { getLayouts } from "@/api/layouts";
export default {
  components: {
    Layout
  },
  data() {
    return {
      hideMenu: false,
      pageList: null,
      columns: [
        {
          text: "页面地址",
          value: "url",
          width: 200
        },
        {
          text: "名称",
          value: "name"
        },
        {
          text: "创建时间",
          value: "createTime"
        },
        {
          text: "备注",
          value: "description"
        }
      ],
      treeData: [],
      selectNode: {},
      dialogFormVisible: false,
      dialogStatus: "create",
      textMap: {
        update: "更新页面信息",
        create: "创建新页面"
      },
      pagesTemp: {
        // 布局数据
        layout: "",
        content: "",
        // 页面其余参数
        name: "",
        path: "",
        Remarks: "",
        status: "draft",
        device: "",
        // 页头基本配置
        title: "",
        keywords: "",
        description: "",
        // 其他配置
        scriptList: [""],
        styleList: [""],
        script: "",
        style: ""
      },
      layoutList: [],
      contentList: [],
      $iframe: null
    };
  },
  methods: {
    // 获取布局列表
    getLayouts() {
      getLayouts({ type: "layout" })
        .then(res => {
          this.layoutList = res.data;
        })
        .catch(err => {});
    },
    // 获取页面列表
    getContents() {
      getLayouts({ type: "page" })
        .then(res => {
          this.contentList = res.data;
        })
        .catch(err => {});
    },
    // 点击创建操作
    handleCreate() {
      this.resetPageTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    //点击更新操作，没有用到
    handleUpdate() {
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.pagesTemp = JSON.parse(JSON.stringify(this.selectNode.value));
      this.pagesTemp.layout = this.pagesTemp.layout
        ? this.pagesTemp.layout._id
        : "";
      this.pagesTemp.content = this.pagesTemp.content
        ? this.pagesTemp.content._id
        : "";
      // Object.assign(this.pagesTemp, this.selectNode);
      console.log(this.pagesTemp);
    },
    // 删除数据
    handleDelete() {
      // console.log(selectNode)
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deletePages({
            _id: this.selectNode._id
          }).then(res => {
            this.getPages();
            this.$notify({
              title: "成功",
              message: "操作成功",
              type: "success",
              duration: 2000
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 重置页面模型
    resetPageTemp() {
      this.pagesTemp = {
        // 布局数据
        layout: "",
        content: "",
        // 页面其余参数
        name: "",
        path: "",
        Remarks: "",
        status: "draft",
        device: "",
        // 页头基本配置
        title: "",
        keywords: "",
        description: "",
        // 其他配置
        scriptList: [""],
        styleList: [""],
        script: "",
        style: ""
      };
    },
    // 获取页面
    getPages() {
      getPages({
        device: "pc"
      })
        .then(res => {
          this.treeData = res.data;
        })
        .catch(err => {});
    },
    // 创建页面
    createPage() {
      addPages(this.pagesTemp)
        .then(res => {
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
          this.dialogFormVisible = false;
          this.getPages();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 更新页面
    updatePage() {
      this.selectNode.value._id = this.selectNode.id;
      updatePages(this.selectNode.value)
        .then(res => {
          console.log(res);
          this.getPages();
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击树节点
    nodeClick($obj, $node, $el) {
      this.selectNode = $obj;
      this.resetPageTemp();
      Object.assign(this.pagesTemp, $obj.value);
      if (this.$iframe) {
        this.$iframe.postMessage(this.selectNode, "*");
      }
    },
    // 添加外链样式
    addStyleList() {
      console.log(this.pagesTemp.styleList);
      this.pagesTemp.styleList.push("");
      console.log(this.pagesTemp.styleList);
    },
    // 删除外链样式
    deleteStyleList(i) {
      this.pagesTemp.styleList.splice(i, 1);
    },
    // 添加外链脚本
    addScriptList() {
      this.pagesTemp.scriptList.push("");
    },
    // 删除外链脚本
    deleteScriptList(i) {
      this.pagesTemp.scriptList.splice(i, 1);
    }
  },
  mounted() {
    this.getPages();
    this.getLayouts();
    this.getContents();
    this.$iframe = this.$refs["iframeView"].contentWindow;
  }
};
</script>
<style lang="scss">
.pages-container {
  padding: 20px;

  .views {
    border: solid 1px #eee;

    .page-img {
      img {
        display: block;
        width: 100%;
      }
    }

    .page-edit {
      padding: 10px;
      background: #eee;
    }
  }

  .el-tree {
    background: transparent;
  }
  .el-main {
    padding: 0;
  }
  .iframe-view {
    border: none;
    width: 1500px;
    min-height: 100vh;
  }
}
</style>
