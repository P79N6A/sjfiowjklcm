<template>
  <div class="install-container">
    <div class="logo"><img src="./imgs/logo.png"></div>
    <el-card class="box-card" v-if="step==1" shadow="hover">
      <div slot="header" class="clearfix">
        <span>安装许可协议</span>
      </div>
      <div class="text">
        <p>
          感谢您选择 ITGOCMS 产品。希望我们的努力能为您提供一个高效快速和强大的自定义网站解决方案。
          ITGOCMS 全称为 ITGOCMS 内容管理系统。 ITGOCMS 内容管理系统的官方网站为 <a href="https://www.itgo88.com"
            target="_blank">https://www.itgo88.com</a>，是 ITGOCMS 产品的开发商。
        </p>
        <h3>有限担保和免责声明</h3>
        <p>
          本软件及所附带的文件是作为不提供任何明确的或隐含的赔偿或担保的形式提供的。
          用户出于自愿而使用本软件，您必须了解使用本软件的风险，在尚未购买产品技术服务之前，我们不承诺提供任何形式的技术支持、使用担保，也不承担任何因使用本软件而产生问题的相关责任。
          ITGO 不对使用本软件构建的网站中的文章或信息承担责任。 有关 ITGOCMS 最终用户授权协议、商业授权与技术服务的详细内容，均由 ITGOCMS
          官方网站独家提供。ITGO 拥有在不事先通知的情况下，修改授权协议和服务价目表的权力，修改后的协议或价目表对自改变之日起的新授权用户生效。
        </p>
        <p>
          电子文本形式的授权协议如同双方书面签署的协议一样，具有完全的和等同的法律效力。您一旦开始安装
          ITGOCMS，即被视为完全理解并接受本协议的各项条款，在享有上述条款授予的权力的同时，受到相关的约束和限制。协议许可范围以外的行为，将直接违反本授权协议并构成侵权，我们有权随时终止授权，责令停止损害，并保留追究相关责任的权力。
        </p>
      </div>
      <div class="footer" style="">
        <el-button type="primary" @click="step=2">下一步</el-button>
      </div>
    </el-card>
    <el-card class="box-card" v-if="step==2" shadow="hover">
      <div slot="header" class="clearfix">
        <span>MongoDB 数据库配置</span>
      </div>
      <el-form ref="form" :model="dbData" label-width="80px" size="mini">
        <el-form-item label="* 数据库主机：">
          <el-input v-model="dbData.host"></el-input>
        </el-form-item>
        <el-form-item label="* 数据库端口：">
          <el-input v-model="dbData.port"></el-input>
        </el-form-item>
        <el-form-item label="* 数据库名：">
          <el-input v-model="dbData.db"></el-input>
        </el-form-item>
        <el-form-item label="* 数据库用户名：">
          <el-input v-model="dbData.user"></el-input>
        </el-form-item>
        <el-form-item label="*  数据库密码：">
          <el-input v-model="dbData.pass"></el-input>
        </el-form-item>
      </el-form>
      <div class="footer" style="">
        <el-button type="primary" @click="step=1">上一步</el-button>
        <el-button type="primary" @click="hadleTry">连接数据库</el-button>
      </div>
    </el-card>
    <el-card class="box-card" v-if="step==3" shadow="hover">
      <div slot="header" class="clearfix">
        <span>初始化设置</span>
      </div>
      <el-form ref="form" :model="siteData" label-width="80px" size="mini">
        <el-form-item label="* Email：">
          <el-input v-model="siteData.email"></el-input>
        </el-form-item>
        <el-form-item label="* 昵称：">
          <el-input v-model="siteData.nickname"></el-input>
        </el-form-item>
        <el-form-item label="* 密码：">
          <el-input v-model="siteData.password"></el-input>
        </el-form-item>
        <el-form-item label="* 确认密码：">
          <el-input v-model="siteData.password2"></el-input>
        </el-form-item>
      </el-form>
      <div class="footer" style="">
        <el-button type="primary" @click="step=2">上一步</el-button>
        <el-button type="primary" @click="handleInstall">安装</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {
    checkInstall,
    postInstall,
    tryInstall
  } from '@/api/install'
  export default {
    data() {
      return {
        step: 1,
        dbData:{
          db: "nodercms",
          host: "localhost",
          pass: "aa123456",
          port: 27017,
          user: "nodercms",
        },
        siteData:{
          database: "nodercms",
          databaseHost: "localhost",
          databasePassword: "aa123456",
          databasePort: 27017,
          databaseUser: "nodercms",

          email: "safasf@gmail.com",
          nickname: "aslkfakljf",
          password: "aa123456",
          password2:""
        }
      }
    },
    created() {
      this.checkInstall()
    },
    methods: {
      checkInstall() {
        checkInstall().then(res => {
          console.log(res)
          if(res.data.hasInstall){
          this.$notify({
            title: "警告",
            message: "不可以重复安装",
            type: "warning",
            duration: 2000
          });
          this.$router.push({path: '/login'})

          }

        }).catch(err => {
          console.log(err)
        })
      },
      hadleTry(){
        tryInstall(this.dbData).then(res=>{
          this.step=3;
        }).catch(err=>{
          console.log(err)
          this.$notify({
            title: "错误",
            message: "数据库连接失败",
            type: "error",
            duration: 2000
          });
        })
      },
      handleInstall(){
        if(!this.siteData.password||this.siteData.password!=this.siteData.password2){
          this.$notify({
            title: "警告",
            message: "两次密码不一致",
            type: "warning",
            duration: 2000
          });
        }else{
          this.siteData.database=this.dbData.db;
          this.siteData.databaseHost=this.dbData.host;
          this.siteData.databasePassword=this.dbData.pass;
          this.siteData.databasePort=this.dbData.port;
          this.siteData.databaseUser=this.dbData.user;
          postInstall(this.siteData).then(res=>{
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
          this.$router.push({path: '/login'})
          }).catch(err=>{
            console.log(err);
          })
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
  .install-container {
    min-height: 100vh;
    background: url(~@/assets/bg.jpg) center center #000/cover;
  }

  .logo {
    text-align: center;
    padding: 20px 0;
  }

  .box-card {
    width: 600px;
    margin: 0 auto;

    .text {
      p {
        text-indent: 2em;
        margin-bottom: 10px;
        line-height: 1.5;
      }
    }

    .footer {
      text-align: right;
      padding: 20px 0;
    }
  }

</style>
