<template>
  <div class="customer-center">
    <div class="container">
      <div class="row">
        <header class="image-circle">
          <img class="thumbnail" src="./img/User-Avatar.png">
          <h1>{{name}}</h1>
        </header>
        <el-menu
          class="entry-nav"
          mode="horizontal"
          background-color="#fff"
          text-color="#333"
          active-text-color="#409EFF"
        >
          <!-- <el-menu-item index="1">我的工单</el-menu-item> -->
          <el-menu-item index="1">
            <router-link :to="{name:'UserProjects'}">网站列表</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link :to="{name:'UserSetting'}">个人中心</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link :to="{name:'UserMessage'}">站内信</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link :to="{name:'Userrequirement'}">需求列表</router-link>
          </el-menu-item>
          <el-button icon="el-icon-error" class="btn-logout" type="danger" @click="logout">登出</el-button>
        </el-menu>
        <section class="main">
          <router-view></router-view>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        this.$router.push({
          name: "login"
        });
        // location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      });
    }
  },
  computed: {
    ...mapGetters(["name", "avatar"])
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.customer-center {
  background: url(./img/login-bg.jpg) center center no-repeat/cover;
  min-height: 100%;

  .container {
    max-width: 1100px;
    margin: 0 auto;
    padding-top: 120px;
  }

  .row {
    border: 1px solid #b4daef;
  }

  header {
    padding-top: 1px;
    min-height: 150px;
    background: url(./img/head-bg.jpg) bottom center no-repeat;
    text-align: center;
    color: #fff;
    // background-size: cover;
    border-bottom: solid 1px #fff;
    .thumbnail {
      height: 120px;
      width: 120px;
      margin-top: -60px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 0;
      padding: 2px;
      background-color: #fff;
      border: 1px solid #ddd;
      padding: 2px;
      border-radius: 20em;
    }
  }

  .entry-nav {
    .el-menu-item {
      padding: 0;
    }

    a {
      display: block;
      width: 100%;
      height: 100%;
      padding: 0 20px;
    }
  }

  .btn-logout {
    float: right;
    margin-top: 16px;
    margin-right: 10px;
  }

  .main {
    // background: rgba(255,255,255,0.9);
    background: #f7f8fb;
  }
}
</style>
