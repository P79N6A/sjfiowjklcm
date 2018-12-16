<template>
  <div class="app-container">

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->

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
        <el-form-item label="确认密码" prop="password">
          <el-input v-model="userTemp.password"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateAccount">{{ $t('table.confirm') }}</el-button>
        </el-form-item>
      </el-form>

  </div>
</template>

<script>
import {getUsers, addUsers, updateUserOne, deleteUserOne} from '@/api/user'
import {getRoles} from '@/api/role'
import {updateAccount,getAccount} from '@/api/account'
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
        update: 'Edit',
        create: 'Create'
      },

    }
  },
  created() {
    // this.getList()
    this.getAccount()
  },
  methods: {
    // 查询用户列表
    getAccount(){
      this.listLoading = true
      getAccount().then(res=>{
        this.userTemp=res.data
      }).catch(err=>{
      })
    },
    updateAccount(){
      updateAccount(this.userTemp).then(res=>{
            if(this.userTemp.password){
              // 有修改密码
              this.$notify({
                title: '成功',
                message: '修改资料成功，将重新登陆系统',
                type: 'success',
                duration: 1500
              })
              // 重新登陆
              this.$store.dispatch('LogOut').then(() => {
                const $this=this
                window.setTimeout(function(){
                  $this.$router.push({ path: '/login' })
                  // location.reload()// In order to re-instantiate the vue-router object to avoid bugs
                },1000)
              })
              }else{
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
              }
      }).catch(err=>{

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
