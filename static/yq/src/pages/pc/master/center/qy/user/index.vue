<template>
  <div id="content_bg">
    <div class="content">
      <div class="content cfx">
        <div id="ui-content" class="ui-row">
          <div id="ui-submenu" class="ui-col">
            <!--左侧头部-->
            <info>
              <!-- 用户信息模块 -->
            </info>

            <!--左侧tab-->
            <user-menus>
              <!-- 左边的菜单内容 -->
            </user-menus>
          </div>

          <div id="ui-maincontent" class="ui-col">
            <div class="wrapper">
              <router-view>
                <!-- 路由内容区域 -->
              </router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import info from "./components/info"; // 用户信息栏目
import userMenus from "./components/user-menus"; // 用户菜单
export default {
  name: "userMaster",
  data() {
    return {
      myData: []
    };
  },
  components: {
    info,
    userMenus
  },
  mounted() {
    console.log(this.$route);
  }
};
</script>
<style lang="scss">
#content_bg {
  max-width: 1920px;
  min-width: 1200px;
  overflow: hidden;
  position: relative;
  background: #f1f1f1;
  .content {
    padding: 30px 0;
    #ui-content {
      position: relative;
    }
    #ui-submenu {
      float: left;
      width: 24%;
      min-height: 500px;
      color: #333;
      overflow: hidden;
      background: #f1f1f1;
    }
    #ui-maincontent {
      float: right;
      position: relative;
      overflow: hidden;
      width: 75%;
      background: #fff;
    }
  }
  .user-tip {
    margin: 10px auto;
    padding: 20px;
    border: 1px solid #f5e9e5;
    border-radius: 3px;
    background: #fffaf1;
    .red {
      color: red;
    }
  }
  .el-input-group__append {
    background: #4db7f4 !important;
    border: none !important;
    span {
      color: #fff !important;
    }
    i {
      color: #fff !important;
    }
  }
  .u-c-box .el-input__inner {
    border: 1px solid #dcdcdc !important;
    background-color: #fff !important;
    color: #333 !important;
    .el-input__icon {
      color: #4db7f4 !important;
    }
  }
  .el-input {
    &.readonly {
      .el-input__inner {
        background: #eee !important;
      }
    }
  }
  .el-input__prefix,
  .el-input__suffix {
    display: flex;
    justify-items: center;
    align-items: center;
    i {
      width: 25px;
      color: #4db7f4;
    }
  }
  .u-c-box .el-input__inner.readonly {
    background: #ccc !important;
    .el-input__icon {
      color: #a3a3a3;
    }
    & + .el-input__prefix,
    & + .el-input__suffix {
      i {
        color: #a3a3a3;
      }
    }
  }

  .el-table th {
    background: #4db7f4;
    color: #fff;
  }
  .u-c-box .el-form-item__label {
    color: #333 !important;
  }
}
</style>
