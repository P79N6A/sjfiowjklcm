<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="roleList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      >
      <el-table-column :label="$t('table.id')" type="index" align="center" width="50">
      </el-table-column>
      <el-table-column label="角色" prop="name">
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
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
    <!-- 编辑弹窗 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="500px">
      <el-form ref="dataForm" :rules="rules" :model="userTemp" label-position="right" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="角色" prop="name">
          <el-input v-model="userTemp.name"/>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="userTemp.description"/>
        </el-form-item>
      </el-form>
      <el-table
        :data="authorList"
        style="width: 100%">
        <el-table-column
          prop="description"
          label="名称"
          align="center"
          >
        </el-table-column>
      <!-- 权限配置 -->
      <el-table-column label="权限" center class-name="small-padding fixed-width" align="center">
        <template slot-scope="scope">
          <el-checkbox-group v-model="userTemp.authorities">
            <el-checkbox-button :label="item.code" v-for="(item,i) in scope.row.authorities" :key="i">{{item.description}}</el-checkbox-button>
          </el-checkbox-group>
        </template>
      </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createRole():updateRole()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {getRoles, addRoles, updateRoleOne, deleteRoleOne} from '@/api/role'
import {getAuthorities} from '@/api/authorities'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      authorList:null,
      roleList:null,
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
        authorities:[]
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
    this.getRoles()
  },
  methods: {
    // 查询用户列表
    getRoles(){
      this.listLoading = true
      getRoles().then(res=>{
        this.roleList=res.data
        this.listLoading = false
      }).catch(err=>{
        this.listLoading = false
      })
    },
    getAuthorities(){
      getAuthorities().then(res=>{
        this.authorList=res.data
      }).catch(err=>{

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
    createRole(){
      addRoles(this.userTemp).then(res=>{
        this.dialogFormVisible=false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
        this.getRoles()
      }).catch(err=>{
        console.log(err)
      })
    },
    resetTemp() {
      this.userTemp = {
        name: '',
        description: '',
        authorities:[]
      }
    },
    // 点击创建按钮
    handleCreate() {
      this.getAuthorities()
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
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
    updateRole(){
      updateRoleOne(this.userTemp).then(res=>{
        this.dialogFormVisible=false
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
        this.getRoles()
      }).catch(err=>{

      })
    },
    // 删除事件
    handleDelete(data) {
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRoleOne(data).then(res=>{
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
  }
}
</script>
