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
                <el-button type="danger" @click="handleDelete">删除</el-button>
              </el-button-group>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="iframe-view" :class="device">
                <iframe ref="iframeView" src="/#/preview"></iframe>
              </div>
              <!-- 外框 -->
              <!-- <Layout :layoutTemp="selectNode.value.layout"> -->
              <!-- <Layout :layoutTemp="selectNode.value.content"></Layout> -->
              <!-- </Layout> -->
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-card>
    <!-- 页面内容编辑 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="700px">
      <el-form ref="dataForm" :model="pagesTemp" label-position="right" label-width="90px">
        <el-form-item label="*页面名称" prop="name">
          <el-input v-model="pagesTemp.name"/>
        </el-form-item>
        <el-form-item label="页面路径" prop="url">
          <el-input v-model="pagesTemp.path" placeholder="/url (格式)">
            <template slot="prepend">～域名</template>
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="页面外框" prop="layout">
          <el-select v-model="pagesTemp.layout" placeholder="请选择页面外框">
            <el-option :label="item.name" :value="item._id" v-for="(item,i) in layoutList" :key="i"></el-option>
          </el-select>
        </el-form-item>-->
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
        <el-form-item label="用户状态" prop="needLogin">
          <el-switch
            style="display: block"
            v-model="pagesTemp.needLogin"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="需要登陆状态"
            inactive-text="非登陆状态"
          ></el-switch>
        </el-form-item>
        <el-form-item label="页面状态" prop="status">
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
        <el-form-item label="说明" prop="remarks">
          <el-input
            v-model="pagesTemp.remarks"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 10}"
          />
        </el-form-item>
        <hr>
        <el-form-item label="页面标题" prop="title">
          <el-input v-model="pagesTemp.title"/>
        </el-form-item>
        <el-form-item label="页面关键字" prop="keywords">
          <el-input v-model="pagesTemp.keywords"/>
        </el-form-item>
        <el-form-item label="页面描述" prop="description">
          <el-input
            v-model="pagesTemp.description"
            :autosize="{ minRows: 3, maxRows: 10}"
            type="textarea"
          />
        </el-form-item>
        <hr>

        <el-form-item label="头部代码" prop="script">
          <el-input
            :autosize="{ minRows: 3, maxRows: 100}"
            type="textarea"
            v-model="pagesTemp.head"
            placeholder="代码将插入至<head>标签末尾"
          />
        </el-form-item>

        <el-form-item label="底部代码" prop="style">
          <el-input
            :autosize="{ minRows: 3, maxRows: 100}"
            type="textarea"
            v-model="pagesTemp.foot"
            placeholder="代码将插入至<body>标签末尾"
          />
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
import Layout from "./components/Layout";
import { getPages, addPages, updatePages, deletePages } from "@/api/pages";
import { getLayouts } from "@/api/layouts";
import { getToken, setToken, removeToken } from "@/utils/auth";
export default {
  components: {
    Layout
  },
  data() {
    return {
      hideMenu: false,
      pageList: null,
      device: getToken("SiteDevice"),
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
        _id: "",
        // 布局数据
        // layout: "",
        content: "",
        // 页面其余参数
        name: "",
        path: "",
        remarks: "",
        needLogin: "",
        status: "draft",
        // 页头基本配置
        title: "",
        keywords: "",
        description: "",
        // 其他配置
        head: "",
        foot: ""
      },
      layoutList: [],
      contentList: [],
      $iframe: null
    };
  },
  methods: {
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
      this.getContents();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    //点击更新操作，没有用到
    handleUpdate() {
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      // 复制值
      this.pagesTemp = JSON.parse(JSON.stringify(this.selectNode.value));
      this.pagesTemp.layout = this.pagesTemp.layout
        ? this.pagesTemp.layout._id
        : "";
      this.pagesTemp.content = this.pagesTemp.content
        ? this.pagesTemp.content._id
        : "";
      this.pagesTemp._id = this.selectNode.id;
    },
    // 删除数据
    handleDelete() {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deletePages({
            _id: this.selectNode.id
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
        _id: "",
        // 布局数据
        // layout: "",
        content: "",
        // 页面其余参数
        name: "",
        path: "",
        remarks: "",
        needLogin: "",
        status: "draft",
        // device: getToken("SiteDevice"),
        // 页头基本配置
        title: "",
        keywords: "",
        description: "",
        // 其他配置
        head: "",
        foot: ""
      };
    },
    // 获取页面
    getPages() {
      getPages()
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
      updatePages(this.pagesTemp)
        .then(res => {
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
      if (this.$iframe) {
        this.$iframe.postMessage(this.selectNode, "*");
      }
    }
  },
  mounted() {
    this.getPages();
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
    width: 1400px;
    position: relative;
    &.PC {
      width: 1950px;
      height: 1000px;
      background: url("./img/bg_mac.png") no-repeat center top;
      background-size: 100% 100%;
      iframe {
        width: 1440px;
        height: 780px;
        position: absolute;
        top: 80px;
        left: 260px;
      }
    }
    &.MOBILE {
      width: 360px;
      height: 750px;
      margin: 10px auto;
      padding: 10px;
      display: block;
      background: url("./img/bg_iphone.png") no-repeat center top;
      background-size: 100% 100%;
      iframe {
        width: 320px;
        height: 690px;
        position: absolute;
        top: 42px;
        left: 18px;
        border-radius: 0 0 20px 20px;
      }
    }
    iframe {
      border: none;
      background: #fff;
      background-image: linear-gradient(
          45deg,
          #eee 25%,
          transparent 0,
          transparent 75%,
          #eee 0
        ),
        linear-gradient(45deg, #eee 25%, transparent 0, transparent 75%, #eee 0);
      background-position: 0 0, 15px 15px;
      background-size: 30px 30px;
    }
  }
}
</style>
