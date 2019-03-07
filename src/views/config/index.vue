<template>
  <div class="config-container">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="七牛云配置"  name="qiniuInfo">
        <el-form label-position="left" label-width="80px" :model="qiniuInfo" v-if="qiniuInfo">
          <el-form-item>
            <el-button type="warning" @click="refreshQn" icon="el-icon-setting">更新七牛</el-button>
          </el-form-item>
          <el-form-item label="accessKey">
            <el-input v-model="qiniuInfo.value.accessKey" placeholder="请输入七牛accessKey"></el-input>
          </el-form-item>
          <el-form-item label="secretKey">
            <el-input v-model="qiniuInfo.value.secretKey" placeholder="请输入七牛secretKey"></el-input>
          </el-form-item>
          <el-form-item label="bucket">
            <el-input v-model="qiniuInfo.value.bucket" placeholder="请输入七牛bucket"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveConfig(qiniuInfo)" icon="el-icon-setting">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="网站配置" name="cdnInfo">
        <el-form label-position="left" label-width="100px" :model="cdnInfo" v-if="cdnInfo">
          <el-form-item label="资源域名">
            <el-input v-model="cdnInfo.value.cdnurl" placeholder="请输入静态资源域名"></el-input>
          </el-form-item>
          <el-form-item label="备用资源域名">
            <el-input v-model="cdnInfo.value.cdnurlBackup" placeholder="请输入备用静态资源域名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveConfig(cdnInfo)" icon="el-icon-setting">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {
    refresh
  } from "@/api/qiniu";
  import {
    getConfigOne,
    saveConfig
  } from "@/api/config";
  import {
    mapGetters
  } from "vuex";

  export default {
    data() {
      return {
        activeName:'',
        qiniuInfo: {
          name:'qiniuInfo',
          value:{
            'accessKey':'',
            'secretKey':'',
            'bucket':''
          }
        },
        cdnInfo: {
          name:'cdnInfo',
          value:{
            'cdnurl':'',
            'cdnurlBackup':''
          }
        }
      };
    },

    created() {

    },
    computed: {
      ...mapGetters(["cdnurl"])
    },
    methods: {
      handleClick(){
        getConfigOne({name:this.activeName}).then(res=>{
          switch(this.activeName)
          {
          case 'qiniuInfo':
            Object.assign(this.qiniuInfo,res.data)
            // 执行代码块 1
            break;
          case 'cdnInfo':
            // 执行代码块 2
            Object.assign(this.cdnInfo,res.data)
            break;
          default:
            
          }
        }).catch(err=>{

        })
      },
      // 保存配置
      saveConfig(data){
        saveConfig(data).then(res=>{
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
        }).catch(err=>{

        })
      },
      // 更新七牛云
      refreshQn() {
        refresh({
          type: "test-type"
        }).then(res => {
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
        }).catch(err => {

        })
      }
    }
  };

</script>

<style lang="scss" scoped>
  .siteSet-container {
    padding: 20px;

    .site-btns {
      text-align: right;
      margin-top: 10px;
    }

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
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

    .favicon {
      height: 90px;
      display: block;
    }

    .logo {
      width: auto;
      height: 150px;
      display: block;
    }
  }

</style>
