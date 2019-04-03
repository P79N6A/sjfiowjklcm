<template>
  <div class="agent-page">
    <!-- <banner></banner> -->
    <div class="agentTop">
      <div class="wp">
        <!-- <span></span> -->
      </div>
    </div>
    <div class="agentContent">
      <top-menus>
        <!-- 代理菜单 -->
      </top-menus>
      <div class="agentCenter">
        <ol class="ol-account">
          <li>账户名：
            <span>{{userData.loginname}}</span>
          </li>
          <li>老虎机佣金余额：
            <span>{{userData.slotAccount}}</span>
          </li>
          <li>其他佣金余额：
            <span>{{userData.liveAccount}}</span>
          </li>
        </ol>
        <router-view>
          <!-- 路由内容区域 -->
        </router-view>
      </div>
    </div>
    <!-- <div class="user-top">
      <info></info>
      <top-menus></top-menus>
    </div>
    <div class="user-content content">
      <div class="agent-u-c-shows">
        <router-view></router-view>
      </div>
    </div>-->
  </div>
</template>
<script>
// 代理个人信息
import info from "./components/info"; // 代理信息
import { mapGetters, mapActions } from "vuex";
// 代理操作菜单
import topMenus from "./components/top-menus"; // 代理菜单
import banner from "./components/banner/"; //个人中心banner
export default {
  name: "userMaster",
  data() {
    return {
      myData: []
    };
  },
  computed: {
    ...mapGetters(["userData", "isAgent", "unread"])
  },
  components: {
    info,
    topMenus,
    banner
  }
};
</script>
<style lang="scss">
.agent-page {
  width: 100%;
  overflow: hidden;
  position: relative;
  font-size: 15px;

  .agentTop {
    height: 40px;
    margin-top: 35px;
    background-color: #fff;
    border-top: solid 6px #4db7f4;

    .wp {
      width: 1200px;
      margin: 0 auto;
      position: relative;

      span {
        width: 258px;
        height: 40px;
        display: inline-block;
        background: url("./images/agent-account.jpg") no-repeat 0 0;
        position: absolute;
        top: 0;
        left: 40%;
      }
    }
  }

  .agentContent {
    width: 1000px;
    margin: 30px auto 0;
    padding-bottom: 80px;
    overflow: hidden;

    .agentCenter {
      .ol-account {
        width: 94%;
        margin: 30px 0 0 30px;
        overflow: hidden;

        li {
          float: left;
          margin: 20px 0 0 10px;

          span {
            color: #cc0000;
            font-weight: 600;
          }
        }
      }

      width: 780px;
      float: right;
      border: 1px solid #ddd;
      box-shadow: 1px 6px 6px rgba(0, 0, 0, 0.3);
      min-height: 700px;
      padding-bottom: 40px;
      background: #fff;
    }
  }
  .el-form-item {
    .el-input-group {
      width: 360px !important;
    }
    .el-input {
      width: 360px !important;
    }
    .el-input__inner {
      width: 360px !important;
    }
  }
}
</style>
