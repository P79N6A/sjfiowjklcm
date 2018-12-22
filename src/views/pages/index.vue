<template>
  <div class="pages-container">
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>站点基本配置</span>
      </div>
      <el-container class="views">
        <el-aside width="200px" style="background:#eee;">
          <div class="bottom cfx" style="margin:10px 0;">
            <el-button icon="el-icon-plus" type="primary" @click="handleCreate" style="width:100%;">添加页面</el-button>
          </div>
          <el-tree :data="treeData" node-key="id" :expand-on-click-node="true" :icon-class="'=='" default-expanded-keys="pc"
            :highlight-current="true" @node-click="nodeClick">
          </el-tree>
        </el-aside>
        <el-main>
          <el-row>
            <el-col :span="12">
              <div class="page-img">
                <img src="https://itgo88.com/static/index/images/pc/t38/1.jpg">
              </div>
            </el-col>
            <el-col :span="12" v-if="selectNode&&selectNode.value">
              <div class="page-edit">
                <el-form ref="dataForm" :model="selectNode.value" label-position="right" label-width="90px">
                  <el-form-item label="*页面名称" prop="name">
                    <el-input v-model="selectNode.value.name" />
                  </el-form-item>
                  <el-form-item label="页面路径" prop="url">
                    <el-input v-model="selectNode.value.path" />
                  </el-form-item>
                  <el-form-item label="说明" prop="remarks">
                    <el-input v-model="selectNode.value.remarks" />
                  </el-form-item>
                  <el-form-item label="状态" prop="status">
                    <el-switch style="display: block" v-model="selectNode.value.status" active-color="#13ce66" inactive-color="#ff4949"
                      active-text="发布" inactive-text="草稿" active-value="pushed" inactive-value="draft"></el-switch>
                  </el-form-item>
                  <el-form-item label="适配终端" prop="device">
                    <el-select v-model="selectNode.value.device" placeholder="请选择页面适用终端">
                      <el-option label="PC端" value="pc"></el-option>
                      <el-option label="MOBILE端" value="MOBILE"></el-option>
                    </el-select>
                  </el-form-item>
                  <hr>
                  <el-form-item label="页面标题" prop="title">
                    <el-input v-model="selectNode.value.title" />
                  </el-form-item>
                  <el-form-item label="页面关键字" prop="keywords">
                    <el-input v-model="selectNode.value.keywords" />
                  </el-form-item>
                  <el-form-item label="页面描述" prop="description">
                    <el-input v-model="selectNode.value.description" />
                  </el-form-item>
                  <hr>
                  <el-form-item label="页面脚本" prop="script">
                    <el-input :autosize="{ minRows: 10, maxRows: 100}" type="textarea" v-model="pagesTemp.script" />
                  </el-form-item>
                  <el-form-item label="页面样式" prop="style">
                    <el-input :autosize="{ minRows: 10, maxRows: 100}" type="textarea" v-model="pagesTemp.style" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="uplatePages">更新</el-button>
                    <el-button type="danger" @click="handleDelete">删除</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>

    </el-card>

    <div>{{selectNode}}</div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="700px">
      <el-form ref="dataForm" :model="pagesTemp" label-position="right" label-width="90px">
        <el-form-item label="*页面名称" prop="name">
          <el-input v-model="pagesTemp.name" />
        </el-form-item>
        <el-form-item label="页面路径" prop="url">
          <el-input v-model="pagesTemp.path" />
        </el-form-item>
        <el-form-item label="说明" prop="Remarks">
          <el-input v-model="pagesTemp.Remarks" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch style="display: block" v-model="pagesTemp.status" active-color="#13ce66" inactive-color="#ff4949"
            active-text="发布" inactive-text="草稿" active-value="pushed" inactive-value="draft"></el-switch>
        </el-form-item>
        <el-form-item label="适配终端" prop="device">
          <el-select v-model="pagesTemp.device" placeholder="请选择页面适用终端">
            <el-option label="PC端" value="pc"></el-option>
            <el-option label="MOBILE端" value="MOBILE"></el-option>
          </el-select>
        </el-form-item>
        <hr>
        <el-form-item label="页面标题" prop="title">
          <el-input v-model="pagesTemp.title" />
        </el-form-item>
        <el-form-item label="页面关键字" prop="keywords">
          <el-input v-model="pagesTemp.keywords" />
        </el-form-item>
        <el-form-item label="页面描述" prop="description">
          <el-input v-model="pagesTemp.description" />
        </el-form-item>
        <hr>
        <el-form-item label="页面脚本" prop="script">
          <el-input :autosize="{ minRows: 10, maxRows: 100}" type="textarea" v-model="pagesTemp.script" />
        </el-form-item>
        <el-form-item label="页面样式" prop="style">
          <el-input :autosize="{ minRows: 10, maxRows: 100}" type="textarea" v-model="pagesTemp.style" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createPages():updatePages()">{{ $t('table.confirm')
          }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import treeTable from "./components/TreeTable";
  import {
    getPages,
    addPages,
    updatePages,
    deletePages,
    rememberPages
  } from "@/api/pages";
  export default {
    components: {
      treeTable
    },
    data() {
      return {
        pageList: null,
        columns: [{
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
        treeData: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        data: [{
            name: "首页",
            url: "/index",
            createTime: "2018-12-12",
            description: "无"
          },
          {
            name: "老虎机大厅",
            url: "/slot",
            createTime: "2018-12-12",
            description: "无"
          },
          {
            name: "真人大厅",
            url: "/real",
            createTime: "2018-12-12",
            description: "无"
          },
          {
            name: "体育大厅",
            url: "/sport",
            createTime: "2018-12-12",
            description: "无"
          },
          {
            name: "棋牌大厅",
            url: "/chess",
            createTime: "2018-12-12",
            description: "无"
          },
          {
            name: "彩票",
            url: "/lottery",
            createTime: "2018-12-12",
            description: "无"
          },
          {
            name: "优惠大厅",
            url: "/promos",
            createTime: "2018-12-12",
            description: "无"
          },
          {
            name: "下载中心",
            url: "/download",
            createTime: "2018-12-12",
            description: "无"
          },
          {
            name: "vip专属福利",
            url: "/vip",
            createTime: "2018-12-12",
            description: "无"
          },
          {
            name: "代理加盟",
            url: "/Cooperation",
            createTime: "2018-12-12",
            description: "无"
          },
          {
            name: "关于我们",
            url: "/about",
            createTime: "2018-12-12",
            description: "无",
            children: [{
                name: "平台介绍",
                url: "/aboutus",
                createTime: "2018-12-12",
                description: "无"
              },
              {
                name: "服务优势",
                url: "/service",
                createTime: "2018-12-12",
                description: "无"
              },
              {
                name: "隐私保护",
                url: "/protect",
                createTime: "2018-12-12",
                description: "无"
              },
              {
                name: "理性博彩",
                url: "/play",
                createTime: "2018-12-12",
                description: "无"
              },
              {
                name: "女郎福利",
                url: "/girls",
                createTime: "2018-12-12",
                description: "无"
              }
            ]
          }
        ],
        selectNode: {},
        dialogFormVisible: false,
        dialogStatus: "create",
        textMap: {
          update: "更新页面信息",
          create: "创建新页面"
        },
        pagesTemp: {
          name: "",
          path: "",
          Remarks: "",
          status: "draft",
          device: "",
          title: "",
          keywords: "",
          description: "",
          script: "",
          style: ""
        }
      };
    },
    methods: {
      // 点击创建操作
      handleCreate() {
        this.dialogStatus = "create";
        this.resetPageTemp();
        this.dialogFormVisible = true;
      },
      //点击更新操作，没有用到
      handleUpdate(data) {
        this.dialogStatus = "update";
        this.dialogFormVisible = true;
        Object.assign(this.pagesTemp, data);
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
          name: "",
          path: "",
          Remarks: "",
          status: 'draft',
          device: "",
          title: "",
          keywords: "",
          description: "",
          script: "",
          style: ""
        };
      },
      // 获取页面
      getPages() {
        getPages({
            device: 'pc'
          })
          .then(res => {

            this.treeData = res.data;
          })
          .catch(err => {});
      },
      // 创建页面
      createPages() {
        addPages(this.pagesTemp)
          .then(res => {
            this.$notify({
              title: "成功",
              message: "操作成功",
              type: "success",
              duration: 2000
            });
            this.dialogFormVisible=false
            this.getPages()
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 更新页面
      uplatePages() {
        updatePages(this.selectNode.value)
          .then(res => {
            console.log(res);
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
        this.resetPageTemp()
        Object.assign(this.pagesTemp, $obj.value)
      }
    },
    mounted() {
      this.getPages();
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
  }

</style>
