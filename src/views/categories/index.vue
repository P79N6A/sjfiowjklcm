<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{
        $t('table.add') }}</el-button>
    </div>

    <el-table v-loading="listLoading" :data="categoryList" border fit highlight-current-row style="width: 100%;">
      <el-table-column :label="$t('table.id')" type="index" align="center" width="50">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.isShow?'开启':'关闭' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name">
      </el-table-column>
      <el-table-column label="目录" prop="path">
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <el-tag>{{ categoryType[scope.row.type]}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="内容模型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.model">{{ scope.row.model.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="description">
      </el-table-column>

      <!-- <el-table-column label="authorities" min-width="150px" prop="role.authorities">
        <template slot-scope="scope">
          <el-tag v-for="(item,i) in scope.row.authorities" :key="i">{{ item }}</el-tag>
        </template>
      </el-table-column> -->

      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row)">{{
            $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
    <!-- 编辑弹窗 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="700px">
      <el-tabs type="border-card" v-model="activeTemp">
        <el-tab-pane label="频道" name="channel">
          <el-form ref="dataFormChannel" :model="channelTemp" label-position="right" label-width="90px">
            <el-form-item label="频道名称" prop="name">
              <el-input v-model="channelTemp.name" />
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="channelTemp.sort" />
            </el-form-item>
            <hr />
            <el-form-item label="显示在导航" prop="isShow">
              <el-switch style="display: block" v-model="channelTemp.isShow" active-color="#13ce66" inactive-color="#ff4949"
                active-text="显示" inactive-text="隐藏">
              </el-switch>
            </el-form-item>
            <el-form-item label="目录" prop="path">
              <el-input v-model="channelTemp.path" />
            </el-form-item>
            <el-form-item label="布局模版" prop="views">
              <el-input v-model="channelTemp.views.layout" />
            </el-form-item>
            <el-form-item label="频道页模版" prop="description">
              <el-input v-model="channelTemp.views.channel" />
            </el-form-item>
            <hr />
            <el-form-item label="频道标题" prop="title">
              <el-input v-model="channelTemp.title" />
            </el-form-item>
            <el-form-item label="频道关键词" prop="keywords">
              <el-input v-model="channelTemp.keywords" />
            </el-form-item>
            <el-form-item label="频道描述" prop="description">
              <el-input v-model="channelTemp.description" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="栏目" name="column">
          <el-form ref="dataFormTemp" :model="columnTemp" label-position="right" label-width="70px">
            <el-form-item label="栏目名" prop="name">
              <el-input v-model="columnTemp.name" />
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model.number="columnTemp.sort" />
            </el-form-item>
            <el-form-item label="显示在导航" prop="isShow">
              <el-switch style="display: block" v-model="columnTemp.isShow" active-color="#13ce66" inactive-color="#ff4949"
                active-text="显示" inactive-text="隐藏">
              </el-switch>
            </el-form-item>
            <hr />
            <el-form-item label="内容模型" prop="description">
              <el-select v-model="columnTemp.model" placeholder="请选择">
                <el-option v-for="item in modelList" :key="item._id" :label="item.name" :value="item._id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上级分类" prop="description">
              <el-input v-model="columnTemp.description" />
            </el-form-item>
            <el-form-item label="目录" prop="path">
              <el-input v-model="columnTemp.path" />
            </el-form-item>
            <el-form-item label="每页条数" prop="mixed">
              <el-input v-model="columnTemp.mixed.pageSize" />
            </el-form-item>
            <el-form-item label="布局模版" prop="view">
              <el-input v-model="columnTemp.views.layout" />
            </el-form-item>
            <el-form-item label="栏目页模版" prop="view">
              <el-input v-model="columnTemp.views.column" />
            </el-form-item>
            <el-form-item label="栏目页模版" prop="view">
              <el-input v-model="columnTemp.views.content" />
            </el-form-item>
            <hr />
            <el-form-item label="频道标题" prop="title">
              <el-input v-model="columnTemp.title" />
            </el-form-item>
            <el-form-item label="频道关键词" prop="key">
              <el-input v-model="columnTemp.keywords" />
            </el-form-item>
            <el-form-item label="频道描述" prop="description">
              <el-input v-model="columnTemp.description" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="单页" name="page">
          <el-form ref="dataFormPage" :model="pageTemp" label-position="right" label-width="70px">
            <el-form-item label="单页名" prop="name">
              <el-input v-model="pageTemp.name" />
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model.number="pageTemp.sort" />
            </el-form-item>
            <el-form-item label="显示在导航" prop="isShow">
              <el-switch style="display: block" v-model="pageTemp.isShow" active-color="#13ce66" inactive-color="#ff4949"
                active-text="显示" inactive-text="隐藏">
              </el-switch>
            </el-form-item>
            <el-form-item label="后台可编辑" prop="mixed">
              <el-switch style="display: block" v-model="pageTemp.mixed.isEdit" active-color="#13ce66" inactive-color="#ff4949"
                active-text="显示" inactive-text="隐藏">
              </el-switch>
            </el-form-item>
            <hr />
            <el-form-item label="上级分类" prop="description">
              <el-input v-model="pageTemp.description" />
            </el-form-item>
            <el-form-item label="目录" prop="path">
              <el-input v-model="pageTemp.path" />
            </el-form-item>
            <el-form-item label="布局模版" prop="views">
              <el-input v-model="pageTemp.views.layout" />
            </el-form-item>
            <el-form-item label="单页页模版" prop="views">
              <el-input v-model="pageTemp.views.page" />
            </el-form-item>
            <hr />
            <el-form-item label="频道标题" prop="title">
              <el-input v-model="pageTemp.title" />
            </el-form-item>
            <el-form-item label="频道关键词" prop="key">
              <el-input v-model="pageTemp.keywords" />
            </el-form-item>
            <el-form-item label="频道描述" prop="description">
              <el-input v-model="pageTemp.description" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- <el-tab-pane label="链接">
          <el-form ref="dataForm" :model="userTemp" label-position="right" label-width="70px">
            <el-form-item label="链接名" prop="name">
              <el-input v-model="userTemp.name" />
            </el-form-item>
            <el-form-item label="排序" prop="description">
              <el-input v-model="userTemp.description" />
            </el-form-item>
            <el-form-item label="显示在导航" prop="name">
              <el-switch style="display: block" v-model="userTemp.description" active-color="#13ce66" inactive-color="#ff4949"
                active-text="显示" inactive-text="隐藏">
              </el-switch>
            </el-form-item>
            <hr />
            <el-form-item label="上级分类" prop="description">
              <el-input v-model="userTemp.description" />
            </el-form-item>
            <el-form-item label="网址" prop="description">
              <el-input v-model="userTemp.description" />
            </el-form-item>
          </el-form>
        </el-tab-pane> -->
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?addCategories():updateRole()">{{ $t('table.confirm')
          }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getRoles,
    addRoles,
    updateRoleOne,
    deleteRoleOne
  } from '@/api/role'
  import {
    getAuthorities
  } from '@/api/authorities'
  import {
    getModels
  } from '@/api/model'
  import {
    getCategories,
    addCategories
  } from '@/api/categories'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'ComplexTable',
    components: {
      Pagination
    },
    directives: {
      waves
    },
    data() {
      return {
        authorList: null,
        roleList: null,
        categoryList: null,
        modelList: null,
        categoryType: {
          column: '栏目',
          page: '页面',
          channel: '频道',
          link: '链接'
        },
        activeTemp: 'channel',
        // 频道模板
        channelTemp: {
          type: "channel",
          name: 3,
          isShow: true,
          sort: 3,
          path: "/3sdfa",
          model: '',
          views: {
            layout: 'layout-default',
            channel: 'channel-default'
          },
          title: "",
          keywords: "asdf",
          description: "asfd"
        },
        // 栏目模版
        columnTemp: {
          isShow: true,
          keywords: "234",
          mixed: {
            pageSize: 15
          },
          model: "5c148dfd487977a1329a1dc3",
          name: "2324234",
          path: "/slots/234",
          sort: 0,
          type: "column",
          views: {
            layout: 'layout-default',
            column: "column-default",
            content: 'content-default'
          },
          title: "",
          keywords: "asdf",
          description: "asfd"
        },
        // 页面模版
        pageTemp: {
          isShow: true,
          keywords: "",
          mixed: {
            isEdit: true,
          },
          name: "pages",
          path: "/vip/promo",
          sort: 3,
          type: "page",
          views: {
            layout: 'layout-default',
            page: "page-default",
          },
          title: "",
          keywords: "asdf",
          description: "asfd"
        },
        linkTemp: {

        },
        total: 0,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        userTemp: {
          name: '',
          description: '',
          authorities: []
        },
        listLoading: true,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },

      }
    },
    created() {
      // this.getList()
      this.getCategories()
    },
    methods: {
      // 查询数据分类列表
      getCategories() {
        this.listLoading = true
        getCategories().then(res => {
          this.categoryList = res.data
          this.listLoading = false
        }).catch(err => {
          this.listLoading = false
        })
      },
      // 获取模型
      getModels() {
        getModels().then(res => {
          this.modelList = res.data;
        }).catch(err => {

        })
      },
      // 新建数据分类
      addCategories() {
        let postData = null
        if (this.activeTemp == 'channel') {
          postData = this.channelTemp
        } else if (this.activeTemp == 'column') {
          postData = this.columnTemp
        } else if (this.activeTemp == 'page') {
          postData = this.pageTemp
        } else {
          return
        }
        addCategories(postData).then(res => {
          this.getCategories()
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        }).catch(err => {

        })
      },
      getAuthorities() {
        getAuthorities().then(res => {
          this.authorList = res.data
        }).catch(err => {

        })
      },
      // // 查询权限列表
      // getRoles(){
      //   getRoles().then(res=>{
      //     this.roleList=res.data
      //   }).catch(err=>{

      //   })
      // },
      // addRoles
      createRole() {
        addRoles(this.userTemp).then(res => {
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
          this.getRoles()
        }).catch(err => {
          console.log(err)
        })
      },
      resetTemp() {
        this.userTemp = {
          name: '',
          description: '',
          authorities: []
        }
      },
      // 点击创建按钮
      handleCreate() {
        // this.getAuthorities()
        // this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        // this.$nextTick(() => {
        // this.$refs['dataForm'].clearValidate()
        // })
      },


      //
      // createData() {
      //   this.$refs['dataForm'].validate((valid) => {
      //     if (valid) {
      //       this.userTemp.id = parseInt(Math.random() * 100) + 1024 // mock a id
      //       this.userTemp.author = 'vue-element-admin'
      //       createArticle(this.userTemp).then(() => {
      //         this.list.unshift(this.userTemp)
      //         this.dialogFormVisible = false
      //         this.$notify({
      //           title: '成功',
      //           message: '创建成功',
      //           type: 'success',
      //           duration: 2000
      //         })
      //       })
      //     }
      //   })
      // },
      // 点击更新按钮
      handleUpdate(row) {
        this.getAuthorities()
        this.userTemp = Object.assign({}, row) // copy obj
        // this.userTemp.role=row.role._id
        // this.userTemp.timestamp = new Date(this.userTemp.timestamp)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      // g更新操作
      updateRole() {
        updateRoleOne(this.userTemp).then(res => {
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
          this.getRoles()
        }).catch(err => {

        })
      },
      // 删除事件
      handleDelete(data) {
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRoleOne(data).then(res => {
            this.getRoles()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
        }).catch((err) => {
          console.log(err)
        });

      }
    },
    watch:{
      activeTemp(val){
        if(val=='column'){
          this.getModels()
        }
      }
    }
  }

</script>
