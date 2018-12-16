<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="userList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      >
      <el-table-column :label="$t('table.id')" type="index" align="center" width="65">
      </el-table-column>
      <el-table-column label="用户昵称" width="100px" align="center" prop="nickname">
      </el-table-column>
      <el-table-column label="邮箱地址" min-width="150px" prop="email">
      </el-table-column>
      <el-table-column label="用户类型" prop="type">
      </el-table-column>
      <el-table-column label="权限角色" min-width="150px" prop="role.name">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.role.name }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="500px">
      <el-form ref="dataForm" :rules="rules" :model="userTemp" label-position="right" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="userTemp.email"/>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="userTemp.nickname"/>
        </el-form-item>
        <el-form-item label="登陆密码" prop="password">
          <el-input v-model="userTemp.password"/>
        </el-form-item>

        <el-form-item label="权限角色">
          <el-select v-model="userTemp.role" class="filter-item" placeholder="请选择" suffix>
            <el-option v-for="item in roleList" :key="item._id" :label="item.name" :value="item._id"/>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createUsers():updateUsers()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {getUsers, addUsers, updateUserOne, deleteUserOne} from '@/api/user'
import {getRoles} from '@/api/role'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      userList:null,
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
        email: '',
        nickname: '',
        password: '',
        role: '',
      },
      listLoading: true,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '更新用户',
        create: '创建用户'
      },

    }
  },
  created() {
    // this.getList()
    this.getUsers()
  },
  methods: {
    // 查询用户列表
    getUsers(){
      this.listLoading = true
      getUsers().then(res=>{
        this.userList=res.data
        this.listLoading = false
      }).catch(err=>{
        this.listLoading = false
      })
    },
    // 查询权限列表
    getRoles(){
      getRoles().then(res=>{
        this.roleList=res.data
      }).catch(err=>{

      })
    },
    // addUsers
    createUsers(){
      addUsers(this.userTemp).then(res=>{
        this.dialogFormVisible=false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
        this.getUsers()
      }).catch(err=>{
        console.log(err)
      })
    },
    resetTemp() {
      this.userTemp = {
        email: '',
        nickname: '',
        password: '',
        role: '',
      }
    },
    // 点击创建按钮
    handleCreate() {
      this.getRoles()
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
      this.getRoles()
      this.userTemp = Object.assign({}, row) // copy obj
      this.userTemp.role=row.role._id
      // this.userTemp.timestamp = new Date(this.userTemp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // g更新操作
    updateUsers(){
      updateUserOne(this.userTemp).then(res=>{
        this.dialogFormVisible=false
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
        this.getUsers()
      }).catch(err=>{

      })
    },
    // 删除事件
    handleDelete(data) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUserOne(data).then(res=>{
            this.getUsers()
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
